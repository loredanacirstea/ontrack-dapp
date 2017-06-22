import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Contracts, ContractsSchema } from '../contracts.js';

export const contractsInsert = new ValidatedMethod({
  name: 'contracts.insert',
  validate: ContractsSchema.validator(),
  run(obj) {
    return Contracts.insert(obj);
  }
});
