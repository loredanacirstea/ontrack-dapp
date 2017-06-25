let OnTrack = {
  abi: '[{"constant":false,"inputs":[],"name":"confirm","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"completed","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"requestFunds","outputs":[],"payable":false,"type":"function"},{"inputs":[{"name":"time","type":"uint256"},{"name":"prov","type":"address"},{"name":"obs","type":"address"}],"payable":true,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"deadline","type":"uint256"},{"indexed":false,"name":"value","type":"uint256"},{"indexed":false,"name":"observer","type":"address"},{"indexed":false,"name":"client","type":"address"},{"indexed":false,"name":"provider","type":"address"}],"name":"eContractCreated","type":"event"},{"anonymous":false,"inputs":[],"name":"eProviderCompleted","type":"event"},{"anonymous":false,"inputs":[],"name":"eClientConfirmed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"fulfilled","type":"bool"}],"name":"eObserved","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"value","type":"uint256"},{"indexed":false,"name":"to","type":"address"}],"name":"eProviderWasPayed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"value","type":"uint256"},{"indexed":false,"name":"to","type":"address"}],"name":"eClientWasPayed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"message","type":"string"}],"name":"eLog","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"now","type":"uint256"},{"indexed":false,"name":"deadline","type":"uint256"},{"indexed":false,"name":"diff","type":"uint256"}],"name":"eTime","type":"event"}]',
  data: '0x606060405260006005556040516060806109f0833981016040528080519060200190919080519060200190919080519060200190919050505b3460018190555033600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506103e88381151561008d57fe5b0460008190555081600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507f4e9629cddb276087f8b87ecbdbbcd738ec1afeb6d84359ef310414d0424cef65600054600154600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16604051808681526020018581526020018473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019550505050505060405180910390a15b5050505b6107818061026f6000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680637022b58e146100515780639d9a7fe914610063578063b026ba5714610075575bfe5b341561005957fe5b610061610087565b005b341561006b57fe5b610073610174565b005b341561007d57fe5b610085610269565b005b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156100e45760006000fd5b7f7c23b53b571be7704b4807b01f426b979099a92104824f4e5f0945dc43e06b5d42600054600054420360405180848152602001838152602001828152602001935050505060405180910390a160026005819055507f2e47f3e822a504ca44d78e244bac602d5e84684924017ca705b4a46b6e79b67e60405180905060405180910390a16101706103ad565b5b5b565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156101d15760006000fd5b7f7c23b53b571be7704b4807b01f426b979099a92104824f4e5f0945dc43e06b5d42600054600054420360405180848152602001838152602001828152602001935050505060405180910390a160005442111561022e5760006000fd5b60016005819055507f5c2668794695f5862b6e258a468041b6e474451b4a8030c4836bda365783cebf60405180905060405180910390a15b5b565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614806103125750600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b151561031e5760006000fd5b7f7c23b53b571be7704b4807b01f426b979099a92104824f4e5f0945dc43e06b5d42600054600054420360405180848152602001838152602001828152602001935050505060405180910390a160005442108061037d57506002600554115b156103885760006000fd5b600160055414156103a05761039b61063e565b6103a9565b6103a86103ad565b5b5b5b565b6001543073ffffffffffffffffffffffffffffffffffffffff1631101561043c577f10b9f321f761a982eb9059c30a051ea975e1579faf5bc03e793c11bf1aa6f38960405180806020018281038252601f8152602001807f70617975702074726965643b2062616c616e636520697320746f6f206c6f770081525060200191505060405180910390a160006000fd5b6002600554141561053f57600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc6001549081150290604051809050600060405180830381858888f1935050505015156104ab57fe5b7fc732c53f4a7a8fe3131a873ea71d71fb290fb02edfdb75ba9021010ec6641d7d600154600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16604051808381526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a1610633565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc6001549081150290604051809050600060405180830381858888f1935050505015156105a357fe5b7f31dbfe2739a8df51b63c0938c6d4452f8218cdff9ceb96756954829464f9e8fb600154600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16604051808381526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a15b60046005819055505b565b6000600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163060405180807f6e6f7469667900000000000000000000000000000000000000000000000000008152506020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060006040518083038160008661646e5a03f19150509050801561070557600260058190555061070e565b60036005819055505b7ffb24b1744b722febcc485515194ae7c054fe70fd6a82b8dc30a4af797431d2db81604051808215151515815260200191505060405180910390a16107516103ad565b5b505600a165627a7a723058206106279ece0f130ca7d2806cb29018d89558309b7c5f0ed289402f999aca3d450029',
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
    event eContractCreated(uint deadline, uint value, address observer, address client, address provider);
    event eProviderCompleted();
    event eClientConfirmed();
    event eObserved(bool fulfilled);
    event eProviderWasPayed(uint value, address to);
    event eClientWasPayed(uint value, address to);
    event eLog(string message);
    event eTime(uint now, uint deadline, uint diff);

    function OnTrack(uint time, address prov, address obs) payable {
        value = msg.value; // wei
        client = msg.sender;
        deadline = time / 1000; // time is in ms; we convert to s
        provider = prov;
        observer = obs;
        eContractCreated(deadline, value, observer, client, provider);
    }

    modifier onlyProvider() {
        require(msg.sender == provider);
        _;
    }

    modifier onlyClient() {
        require(msg.sender == client);
        _;
    }

    modifier onlyMembers() {
        require(msg.sender == client ||
            msg.sender == provider
        );
        _;
    }

    // Provider announces project completion
    function completed() onlyProvider {
        eTime(now, deadline, now-deadline);

        if(now > deadline) {
            throw;
        }
        status = 1;
        eProviderCompleted();
    }

    // Client confirms project completion
    function confirm() onlyClient {
        eTime(now, deadline, now-deadline);

        status = 2;
        eClientConfirmed();
        payup();
    }

    // Calling the observer for a response
    function observe() internal {
        bool fulfilled = observer.call('notify', this);

        // Observer returned true -> project fulfilled
        if(fulfilled) status = 2;
        else status = 3;

        eObserved(fulfilled);

        // Handle payment
        payup();
    }

    function requestFunds() onlyMembers{
        // Throw requests made before deadline or already settled contracts
        eTime(now, deadline, now-deadline);
        if(now < deadline || status > 2) {
            throw;
        }

         // Observe if deadline passed and project not fulfilled
        if(status == 1)
            observe();
        else
            payup();
    }

    // Handle payment - only called in a finalized state
    function payup() internal {
        if(this.balance < value) {
            eLog('payup tried; balance is too low');
            throw;
        }

        if(status == 2) {

            // Project has been fulfilled and confirmed
            // either by the Client or by the Observer
            provider.transfer(value);
            //selfdestruct(provider);
            eProviderWasPayed(value, provider);
        }
        else {

            // Project not fulfilled, deadline has passed
            // Client receives eth back
            client.transfer(value);
            //selfdestruct(client);
            eClientWasPayed(value, client);
        }
        status = 4;
    }
}
`;


export default OnTrack;
