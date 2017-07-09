# ontrack-dapp

Decentralized app for creating contracts with a deadline and observer.

Needs [MetaMask](https://metamask.io/) with an enabled account to work. Use it only on a Test Net!

Status: prototype.

## How it works

A contract is created between a client and a provider, with an agreed deadline and an Observer contract address.
The provider can notify the contract that he has finished his work before the deadline.
The client can confirm that the contract is finalized and the provider receives the funds.

If the client and provider do not agree on the contract fulfillment, an Observer is requested when either of them request their funds. The Observer returns true if the contract was fulfilled and false otherwise. Payment proceeds accordingly.

## Video demos

OnTrack - Ethereum Dapp - Part 1 - Smart Contract Code
https://www.youtube.com/watch?v=z_ij2d55ihM

OnTrack - Ethereum Dapp - Part 2 - Smart Contract Testing
https://www.youtube.com/watch?v=X4xqIYFFbDA&t=9s

OnTrack - Ethereum Dapp - Part 3 - Meteor Web App

## Run locally

```
meteor npm install
meteor
```

## Features in plan

- log failed transactions, render a pending notification after doing a command (transaction)
- another type of Observer contract, where the answer is not automatic; the Observer just gets notified that he has to review an OnTrack contract; the app will have notification features
- Observer contract should receive money when needed
- The OnTrack contract should also charge the Provider an amount of ether as a service guarantee, paid back if the contract is finalized
- implement accounts so you can track your own contracts

## Structure

### OnTrack Solidity Contract

#### Class

![Class Diagram](https://rawgit.com/loredanacirstea/ontrack-dapp/master/public/docs/ontrack_class.png)

#### Sequence

![Sequence Diagram](https://rawgit.com/loredanacirstea/ontrack-dapp/master/public/docs/ontrack_sequence.svg)

#### Flow

![Flow Diagram](https://rawgit.com/loredanacirstea/ontrack-dapp/master/public/docs/ontrack_flow.png)



## License
MIT
