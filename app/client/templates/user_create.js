AutoForm.hooks({
  insertUserForm: {
    before: function() {
      console.log('before');
    },
    after: function() {
      console.log('after');
    },
    onSubmit: function (insertDoc, updateDoc, currentDoc) {
      console.log('onSubmit');
      console.log(insertDoc);
      if (insertDoc) {
        this.done();
      } else {
        this.done(new Error("Submission failed"));
      }
      return false;
    },
    onError: function(formType, error) {
      console.log('onError');
      console.log(error);

    },
    onSuccess: function(formType, result) {
      console.log('success');
    },
    beginSubmit: function() {
      console.log('beginSubmit');
    },
    endSubmit: function() {
      console.log('endSubmit');      
    }
  }
});