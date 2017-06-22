import { Observers } from '/imports/api/observer/observers.js';

if(Observers.find().count() == 0) {
  Observers.insert({
    name: 'Always False',
    abi:  '[{"constant":false,"inputs":[{"name":"mediated_contract","type":"address"}],"name":"notify","outputs":[{"name":"completed","type":"bool"}],"payable":false,"type":"function"}]',
    address: "0xb2329af26602a2902132259881ab55cfb3f6aa2e",
    data: '6060604052341561000c57fe5b5b60f78061001b6000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680635fb9cf2014603a575bfe5b3415604157fe5b606b600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506085565b604051808215151515815260200191505060405180910390f35b60003373ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614151560c15760006000fd5b600090505b9190505600a165627a7a723058203c49bff94da6fe388791c24405eb70789fa95c03c4bd3a32ddb4e5e8f6d2b9cd0029',
    gas: '3700000',
    networkId: '3'
  });
  Observers.insert({
    name: 'Always True',
    abi:  '[{"constant":false,"inputs":[{"name":"mediated_contract","type":"address"}],"name":"notify","outputs":[{"name":"completed","type":"bool"}],"payable":false,"type":"function"}]',
    address: "0xf384a3de0a6fd5610300e7d12355e51fed35477c",
    data: '6060604052341561000c57fe5b5b60f78061001b6000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680635fb9cf2014603a575bfe5b3415604157fe5b606b600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506085565b604051808215151515815260200191505060405180910390f35b60003373ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614151560c15760006000fd5b600190505b9190505600a165627a7a72305820a95085a01021ec546d503978fdaffa1cdeae7ffd2f6bd4b8d6739b5e562319e60029',
    gas: '3700000',
    networkId: '3'
  });
  Observers.insert({
    name: 'Pseudo Random',
    abi:  '[{"constant":false,"inputs":[{"name":"mediated_contract","type":"address"}],"name":"notify","outputs":[{"name":"completed","type":"bool"}],"payable":false,"type":"function"}]',
    address: "0x485698a367eddd6b82f227cc066c99ab93b50574",
    data: '6060604052341561000c57fe5b5b6101168061001c6000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680635fb9cf2014603a575bfe5b3415604157fe5b606b600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506085565b604051808215151515815260200191505060405180910390f35b60003373ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614151560c15760006000fd5b600060024281151560ce57fe5b06141560dc576001905060e5565b6000905060e5565b5b9190505600a165627a7a72305820268904b8020645216304dd3f78137552a7fbffbd80254d99f2cd64e6a44d28a00029',
    gas: '3700000',
    networkId: '3'
  });
}
