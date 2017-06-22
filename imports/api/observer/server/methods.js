import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Observers, ObserversSchema} from '../observers.js';

export const observersInsert = new ValidatedMethod({
  name: 'observers.insert',
  validate: ObserversSchema.validator(),
  run(obj) {
    return Observers.insert(obj);
  }
});
