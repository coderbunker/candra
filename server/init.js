function oauthConfig(service, clientId, secret) {
   ServiceConfiguration.configurations.upsert(
    { service: service },
    {
      $set: {
        clientId: clientId,
        loginStyle: "popup",
        secret: secret,
      }
    }
  ); 
}

function initOrgs() {
  var directory = Meteor.http.call("GET", "http://spaceapi.net/directory.json?api=0.13");
  var urls = Object.keys(directory.data).map(function(k) { 
    var data = {
      space: k,
      url: directory.data[k]
    };
    var job = new Job(Candra.Collections.Jobs, 'fetchSpaceApi', data);
    // console.log(data);
    job.save();
  });
}

fetchSpaceApi = function(job, cb) {
  console.log('fetchSpaceApi called');
  try {
    var result = Candra.Collections.Orgs.findOne({space: job.data.space});
    if(!result) {
      var url = job.data.url;
      console.log('fetching ' + url);
      result = Meteor.http.call("GET", url);
      Candra.Collections.Orgs.upsert({space: result.data.space}, result.data);
    }
    job.done(result);
  } catch(e) {
    console.log(e);
    job.fail(e);
  }
  cb();
}

Meteor.startup(function() {
  var config = getCurrentConfiguration();

  if(config.github) {
    oauthConfig('github', config.github.clientId, config.github.secret);
  }

  if(config.github) {
    oauthConfig('google', config.google.clientId, config.google.secret);
  }

  // Normal Meteor publish call, the server always
  // controls what each client can see
  Meteor.publish('allJobs', function () {
    return Candra.Collections.Jobs.find({});
  });

  // Start the myJobs queue running
  Candra.Collections.Jobs.startJobServer(function(err, result) {
    if(err) console.log(err);
    if(result) console.log(result);
  });

  var queueConfig = {
    concurrency: 4,
    payload: 1,
    pollInterval: 5000,
    prefetch: 1
  };

  // create worker to process jobs
  queue = Job.processJobs('fetchSpaceApi', queueConfig, fetchSpaceApi);

  // schedule fetching jobs
  initOrgs();
});


