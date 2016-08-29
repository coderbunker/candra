App.Schemas.UserProfile = new SimpleSchema({
  name: {
    type: String,
    optional: true
  },
  title: {
    type: String,
    optional: true
  },
  bio: {
    type: String,
    optional: true
  },
  image_url: {
    type: String,
    optional: true
  },
  email: {
    type: String,
    optional: true
  },
  address: {
    type: String,
    optional: true
  },
  phone: {
    type: String,
    optional: true
  },
  zip: {
    type: String,
    optional: true
  },
  wechat: {
    type: String,
    optional: true
  },
  qq: {
    type: String,
    optional: true
  },
  devices: {
    type: new SimpleSchema({
      name: {
        type: String,
        optional: true
      },
      MAC: {
        type: String,
        optional: true
      }
    }),
    optional: true
  }
});

App.Schemas.User = new SimpleSchema({
  username: {
    type: String,
    // For accounts-password, either emails or username is required, but not both. It is OK to make this
    // optional here because the accounts-password package does its own validation.
    // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
    optional: true
  },
  emails: {
    type: Array,
    // For accounts-password, either emails or username is required, but not both. It is OK to make this
    // optional here because the accounts-password package does its own validation.
    // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
    optional: true
  },
  "emails.$": {
    type: Object
  },
  "emails.$.address": {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },
  "emails.$.verified": {
    type: Boolean
  },
  createdAt: {
    type: Date,
    // https://github.com/aldeed/meteor-autoform/issues/955
    autoValue: function() {
      if (this.isInsert) {
        return new Date;
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date};
      } else {
        this.unset();
      }
    }
  },
  profile: {
    type: App.Schemas.UserProfile,
    optional: true
  },
  // Make sure this services field is in your schema if you're using any of the accounts packages
  services: {
    type: Object,
    optional: true,
    blackbox: true
  },
  // In order to avoid an 'Exception in setInterval callback' from Meteor
  heartbeat: {
    type: Date,
    optional: true
  }
});

Meteor.users.attachSchema(App.Schemas.User);
