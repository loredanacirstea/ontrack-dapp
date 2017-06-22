import { Mongo } from 'meteor/mongo';
import 'meteor/aldeed:collection2-core';
import SimpleSchema from 'simpl-schema';

const Contracts = new Mongo.Collection("contracts");

let ContractsSchema = new SimpleSchema({
  name: {
      type: String,
      max: 200
  },
  address: {
    type: String
  },
  abi: {
    type: String,
    optional: true
  },
  data: {
    type: String,
    optional: true
  },
  gas: {
    type: String,
    optional: true
  },
  deadline: {
    type: Date,
    optional: true
  },
  client: {
    type: String,
    optional: true
  },
  provider: {
    type: String,
    optional: true
  },
  observer: {
    type: String,
    optional: true
  },
  networkId: {
    type: String,
    optional: true
  },
  transactionHash: {
    type: String,
    optional: true
  },
  createdAt: {
    type: Date,
    optional: true,
    autoValue: function () {
      if (this.isInsert) {
        return new Date();
      }
    }
  },
  updatedAt: {
    type: Date,
    optional: true,
    autoValue: function () {
      if (this.isUpdate) {
        return new Date();
      }
    }
  },
});

Contracts.attachSchema(ContractsSchema);

export { Contracts,  ContractsSchema};
