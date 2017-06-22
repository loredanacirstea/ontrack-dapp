let OnTrack = {
  abi: '[{"constant":false,"inputs":[],"name":"confirm","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"completed","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"requestFunds","outputs":[],"payable":false,"type":"function"},{"inputs":[{"name":"wait","type":"uint256"},{"name":"prov","type":"address"},{"name":"med","type":"address"}],"payable":true,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"deadline","type":"uint256"},{"indexed":false,"name":"svalue","type":"uint256"},{"indexed":false,"name":"observer","type":"address"},{"indexed":false,"name":"client","type":"address"},{"indexed":false,"name":"provider","type":"address"}],"name":"contractedE","type":"event"},{"anonymous":false,"inputs":[],"name":"completedE","type":"event"},{"anonymous":false,"inputs":[],"name":"confirmedE","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"c","type":"bool"}],"name":"observedE","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"time","type":"uint256"}],"name":"timeLeftE","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"svalue","type":"uint256"},{"indexed":false,"name":"to","type":"address"}],"name":"providerPayedE","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"fvalue","type":"uint256"},{"indexed":false,"name":"to","type":"address"}],"name":"clientPayedE","type":"event"}]',
  data: '0x6060604052600060055560405160608061081b833981016040528080519060200190919080519060200190919080519060200190919050505b3460018190555082420160008190555033600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507f79dfdcfb9336fcc1e0899ff3551e380a0f0ac09f40965d38f070d1c5af5e371d600054600154600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16604051808681526020018581526020018473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019550505050505060405180910390a15b5050505b6105b7806102646000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680637022b58e146100515780639d9a7fe914610063578063b026ba5714610075575bfe5b341561005957fe5b610061610087565b005b341561006b57fe5b610073610127565b005b341561007d57fe5b61008561020a565b005b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156100e45760006000fd5b60026005819055507fc4f61c67fd50e3acf82fd35a8d5f57266cee772a1cf56c51c12d695d395c5c8e60405180905060405180910390a161012361024b565b5b5b565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156101845760006000fd5b6000544211156101945760006000fd5b60016005819055507f37586a3488f39b084468d71682b5873ddb66abf8ce6d009b015af3b2e72bdd8660405180905060405180910390a17ff7bd676d5bd57c49923ec39178c1896daaa98654cf3d786a056000ad8a18800042600054036040518082815260200191505060405180910390a15b5b565b60005442108061021c57506002600554115b156102275760006000fd5b6001600554141561023f5761023a610474565b610248565b61024761024b565b5b5b565b6001543073ffffffffffffffffffffffffffffffffffffffff163110156102725760006000fd5b6002600554141561037557600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc6001549081150290604051809050600060405180830381858888f1935050505015156102e157fe5b7f3b7837e818648409599c8832815644f78e699dbf92416707df49f52e84621b50600154600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16604051808381526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a1610469565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc6001549081150290604051809050600060405180830381858888f1935050505015156103d957fe5b7f012295c94410b02446bf54bf1794f3818abdcf750b23cc637cceee3764b7f64b600154600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16604051808381526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a15b60046005819055505b565b6000600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163060405180807f6e6f7469667900000000000000000000000000000000000000000000000000008152506020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060006040518083038160008661646e5a03f19150509050801561053b576002600581905550610544565b60036005819055505b7f0951fa29f3a3654b577fd899b7f5a8f54898f6d6444df1f329ee244dd740b40681604051808215151515815260200191505060405180910390a161058761024b565b5b505600a165627a7a72305820dc3caba89bf6c17b7976d57bcae49bb11d0334c4e5a4616f539cd9accac14a210029',
  gas: '3700000'
};

OnTrack.code = `
pragma solidity ^0.4.0;

contract OnTrack {
    uint deadline;
    uint value;
    address provider;
    address client;
    address observer;
    uint status = 0;  //0, 1, 2, 3, 4 : pending, completed, fulfilled, observed, payed

    // Events used for logging and tracking the process
    event contractedE(uint deadline, uint svalue, address observer, address client, address provider);
    event completedE();
    event confirmedE();
    event observedE(bool c);
    event timeLeftE(uint time);
    event providerPayedE(uint svalue, address to);
    event clientPayedE(uint fvalue, address to);

    function OnTrack(uint wait, address prov, address med) payable {
        value = msg.value; // wei
        deadline = now + wait; // seconds
        client = msg.sender;
        provider = prov;
        observer = med;
        contractedE(deadline, value, observer, client, provider);
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

    // Calling the observer for a response
    function observe() internal {
        bool fulfilled = observer.call('notify', this);

        // Observer returned true -> project fulfilled
        if(fulfilled) status = 2;
        else status = 3;

        observedE(fulfilled);

        // Handle payment
        payup();
    }

    function requestFunds() {

        // Throw requests made before deadline or already settled contracts
        if(now < deadline || status > 2)
            throw;

         // Observe if deadline passed and project not fulfilled
        if(status == 1)
            observe();
        else
            payup();
    }

    // Handle payment - only called in a finalized state
    function payup() internal {
        if(this.balance < value) throw;

        if(status == 2) {

            // Project has been fulfilled and confirmed
            // either by the Client or by the Observer
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
