let OnTrack = {
  abi:  [{"constant":false,"inputs":[{"name":"mediated_contract","type":"address"}],"name":"notify","outputs":[{"name":"completed","type":"bool"}],"payable":false,"type":"function"}],
  address: "0xb2329af26602a2902132259881ab55cfb3f6aa2e",
  data: '6060604052341561000c57fe5b5b60f78061001b6000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680635fb9cf2014603a575bfe5b3415604157fe5b606b600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506085565b604051808215151515815260200191505060405180910390f35b60003373ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614151560c15760006000fd5b600090505b9190505600a165627a7a723058203c49bff94da6fe388791c24405eb70789fa95c03c4bd3a32ddb4e5e8f6d2b9cd0029',
  gas: '3700000'
};

OnTrack.code = `
pragma solidity ^0.4.0;

contract OnTrack {
    uint deadline;
    uint value;
    address provider;
    address client;
    address mediator;
    uint status = 0;  //0, 1, 2, 3, 4 : pending, completed, fulfilled, mediated, payed

    // Events used for logging and tracking the process
    event contractedE(uint deadline, uint svalue, address mediator, address client, address provider);
    event completedE();
    event confirmedE();
    event mediatedE(bool c);
    event timeLeftE(uint time);
    event providerPayedE(uint svalue, address to);
    event clientPayedE(uint fvalue, address to);

    function OnTrack(uint wait, address prov, address med) payable {
        value = msg.value; // wei
        deadline = now + wait; // seconds
        client = msg.sender;
        provider = prov;
        mediator = med;
        contractedE(deadline, value, mediator, client, provider);
    }

    modifier onlyProvider() {
        require(msg.sender == provider);
        _;
    }

    modifier onlyClient() {
        require(msg.sender == client);
        _;
    }

    // Provider announces project completion
    function completed() onlyProvider {
        if(now > deadline)
            throw;
        status = 1;
        completedE();
        timeLeftE(deadline-now);
    }

    // Client confirms project completion
    function confirm() onlyClient {
        status = 2;
        confirmedE();
        payup();
    }

    // Calling the mediator for a response
    function mediate() internal {
        Mediator med = Mediator(mediator);
        bool fulfilled = med.notify(this);

        // Mediator returned true -> project fulfilled
        if(fulfilled) status = 2;
        else status = 3;

        mediatedE(fulfilled);

        // Handle payment
        payup();
    }

    function requestFunds() {

        // Throw requests made before deadline or already settled contracts
        if(now < deadline || status > 2)
            throw;

         // Mediate if deadline passed and project not fulfilled
        if(status == 1)
            mediate();
        else
            payup();
    }

    // Handle payment - only called in a finalized state
    function payup() internal {
        if(this.balance < value) throw;

        if(status == 2) {

            // Project has been fulfilled and confirmed
            // either by the Client or by the Mediator
            provider.transfer(value);
            providerPayedE(value, provider);
        }
        else {

            // Project not fulfilled, deadline has passed
            // Client receives eth back
            client.transfer(value);
            clientPayedE(value, client);
        }
        status = 4;
    }
}
`;


export default OnTrack;
