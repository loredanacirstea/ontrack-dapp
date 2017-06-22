let FalseObserver = {
  abi:  [{"constant":false,"inputs":[{"name":"mediated_contract","type":"address"}],"name":"notify","outputs":[{"name":"completed","type":"bool"}],"payable":false,"type":"function"}],
  address: "0xb2329af26602a2902132259881ab55cfb3f6aa2e",
  data: '6060604052341561000c57fe5b5b60f78061001b6000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680635fb9cf2014603a575bfe5b3415604157fe5b606b600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506085565b604051808215151515815260200191505060405180910390f35b60003373ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614151560c15760006000fd5b600090505b9190505600a165627a7a723058203c49bff94da6fe388791c24405eb70789fa95c03c4bd3a32ddb4e5e8f6d2b9cd0029',
  gas: '3700000'
};

FalseObserver.code = `
pragma solidity ^0.4.0;

contract FalseObserver {

    function notify(address mediated_contract) returns (bool completed) {
        if(mediated_contract != msg.sender)
            throw;

        return false;
    }
}
`;


export default FalseObserver;
