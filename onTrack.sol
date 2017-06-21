pragma solidity ^0.4.0;
contract OnTrack {
    uint deadline;
    uint value;
    address provider;
    address client;
    address mediator;
    uint status;  // 0, 1, 2 : pending, completed, confirmed

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
        if(fulfilled) {
            status = 2;
        }
        mediatedE(fulfilled);

        // Handle payment
        payup();
    }

    function requestFunds() {

        if(msg.sender == client) {

            // Client requests funds -> handle payment
            payup();
        }
        else if(msg.sender == provider) {
            timeLeftE(deadline-now);

            // Throw if project already completed or request made before deadline
            if(status != 1 || now < deadline)
                throw;

            // Client has not confirmed -> notify the Mediator
		    mediate();
        }
    }

    // Handle payment
    function payup() internal {
        if(this.balance < value) throw;

        if(status == 2) {

            // Project has been fulfilled and confirmed
            // either by the Client or by the Mediator
            provider.transfer(value);
            providerPayedE(value, provider);
        }
        else if(now > deadline) {

            // Project not fulfilled, deadline has passed
            // Client receives eth back
            client.transfer(value);
            clientPayedE(value, client);
        }
        else throw;
    }
}

contract Mediator {

    function notify(address mediated_contract) returns (bool completed) {
        if(mediated_contract != msg.sender)
            throw;

        // Do something with mediated_contract;
        // Fake automated answer;
        // true = contract fulfilled
        // false = client gets money back
        if(now % 2 == 0) return true;
        else return false;
    }
}
