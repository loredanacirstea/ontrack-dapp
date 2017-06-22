let TrueObserver = {
  abi:  [{"constant":false,"inputs":[{"name":"mediated_contract","type":"address"}],"name":"notify","outputs":[{"name":"completed","type":"bool"}],"payable":false,"type":"function"}],
  address: "0xf384a3de0a6fd5610300e7d12355e51fed35477c",
  data: '6060604052341561000c57fe5b5b60f78061001b6000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680635fb9cf2014603a575bfe5b3415604157fe5b606b600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506085565b604051808215151515815260200191505060405180910390f35b60003373ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614151560c15760006000fd5b600190505b9190505600a165627a7a72305820a95085a01021ec546d503978fdaffa1cdeae7ffd2f6bd4b8d6739b5e562319e60029',
  gas: '3700000'
};

TrueObserver.code = `
pragma solidity ^0.4.0;

contract TrueObserver {

    function notify(address mediated_contract) returns (bool completed) {
        if(mediated_contract != msg.sender)
            throw;

        return true;
    }
}
`;


export default TrueObserver;
