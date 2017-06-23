# OnTrack - Dapp

## Solidity Contracts




```uml



[OnTrack |
	deadline: uint
	value: uint
	client: address
	provider: address
	observer: address
	status: uint (0,1,2,3,4
		; ----- = pending, completed, fulfilled, observed, payed)
	|
	OnTrack(seconds, provider, observer)
	completed() - onlyProvider
	confirm() - onlyClient
	requestFunds()
	|
	observe() - internal
	payup() - internal
	|
	events
	----------
	contractedE
	completedE
	confirmedE
	observedE
	providerPayedE
	clientPayedE

]

[<abstract>Observer]

[OnTrack]->[Observer]
[Observer]<:-[AlwaysTrueO
	|
	notify(address) -> bool
]
[Observer]<:-[AlwaysFalseO
	|
	notify(address) -> bool
]
[Observer]<:-[PseudoRandomO
	|
	notify(address) -> bool
]
[Observer]<:-[HumanO
	|
	notify(address) -> bool
]

```

### Contract Sequence



```sequence

Client -> OnTrack: create \n (provider, observer, ETH value)
OnTrack -> Provider: create role
OnTrack -> Observer: create role
Provider -> OnTrack: completed
Note over OnTrack,Provider : <= deadline
Client -> OnTrack: confirmed
OnTrack -> Provider: payup
Note right of Provider: END

Note over OnTrack: if \n NOT confirmed \n \n AND \n now > deadline
Provider -> OnTrack: requestFunds
OnTrack -> Observer: notify
Note right of Observer: checks \n if project \n fulfilled or not

Observer -> OnTrack: status \n TRUE
OnTrack -> Provider: payup
Note right of Provider: END

Observer -> OnTrack: status \n FALSE
OnTrack -> Client: payup
Note left of Client: END


Note over OnTrack: if \n NOT completed \n AND \n now > deadline
Client -> OnTrack: requestFunds
OnTrack -> Observer: notify
Note right of Observer: checks \n if project \n fulfilled or not
Observer -> OnTrack: status \n TRUE
OnTrack -> Provider: payup
Note right of Provider: END

Observer -> OnTrack: status \n FALSE
OnTrack -> Client: payup
Note left of Client: END



```

### Contract Flow




```uml

[OnTrack Contract Algorithm |
  [<start>start]->[<state>OnTrack created]
  [<state>OnTrack created]->[<state>Client ETH sent to OnTrack]
  [<state>Client ETH sent to OnTrack]->[<state>status = 0]
  [<state>status = 0]->[<choice> <= deadline ?]

  [<choice> <= deadline ?]->1[<choice>Provider ; declares project ; completed?]
  [<choice> <= deadline ?]->0[<choice>P/C ; requestFunds; ?]

  [<choice>Provider ; declares project ; completed]->1[<state>status = 1]
  [<choice>Provider ; declares project ; completed]->0[<choice>P/C ; requestFunds; ?]

  [<state>status = 1]->[<choice>Client ; confirms contract ; fulfillment?]

  [<choice>Client ; confirms contract ; fulfillment?]->1[<state>status = 2]
  [<choice>Client ; confirms contract ; fulfillment?]->0[<choice>P/C ; requestFunds; ?]
  [<state>status = 2]->[<choice>Payup ; based on ; status]

  [<choice>P/C ; requestFunds; ?]->1[<choice>status?]
  [<choice>P/C ; requestFunds; ?]->0[<state>OnTrack keeps ETH]

  [<choice>status?]->1[<state>Observer notified]
  [<choice>status?]->0,2[<choice>Payup ; based on ; status]
  [<choice>status?]->3,4[<end>end]


  [<state>OnTrack keeps ETH]->[<choice>P/C ; requestFunds; ?]

  [<state>Observer notified]->[<choice>Observer ; declares contract ; fulfilled?]

  [<choice>Observer ; declares contract ; fulfilled?]->1[<state>status = 2]
  [<choice>Observer ; declares contract ; fulfilled?]->0[<state>status = 3]

  [<state>status = 3]->[<choice>Payup ; based on ; status]

  [<choice>Payup ; based on ; status]->status = 2[<state>Provider receives funds]
  [<choice>Payup ; based on ; status]-> other[<state>Client receives funds]



  [<state>Client receives funds]->[<state>status = 4]
  [<state>Provider receives funds]->[<state>status = 4]

  [<state>status = 4]->[<end>end]
]
```
