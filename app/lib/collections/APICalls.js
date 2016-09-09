App.Collections.APICalls = new Mongo.Collection('lastapicall');

var APICallSchemaObject = {

  api: {
    type: String,
    label: "API name",
    allowedValues: ['arp'],
    optional: false
  },
  time: {
    type: Date,
    label: "API called at date",
    optional: false
  },
  clientIP: {
    type: String,
    label: "Client IP",
    optional: true
  },
  success: {
    type: Boolean,
    label: "Success status",
    optional: true
  }
};

App.Schemas.APICall = new SimpleSchema(APICallSchemaObject);
App.Collections.APICalls.attachSchema(App.Schemas.APICall);