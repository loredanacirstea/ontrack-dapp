let PseudorandomObserver = {
  abi:  [{"constant":false,"inputs":[{"name":"mediated_contract","type":"address"}],"name":"notify","outputs":[{"name":"completed","type":"bool"}],"payable":false,"type":"function"}],
  address: "0x485698a367eddd6b82f227cc066c99ab93b50574",
  data: '6060604052341561000c57fe5b5b6101168061001c6000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680635fb9cf2014603a575bfe5b3415604157fe5b606b600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506085565b604051808215151515815260200191505060405180910390f35b60003373ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614151560c15760006000fd5b600060024281151560ce57fe5b06141560dc576001905060e5565b6000905060e5565b5b9190505600a165627a7a72305820268904b8020645216304dd3f78137552a7fbffbd80254d99f2cd64e6a44d28a00029',
  gas: '3700000'
};

PseudorandomObserver.code = `
pragma solidity ^0.4.0;

contract PseudorandomObserver {

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
`;


export default PseudorandomObserver;
