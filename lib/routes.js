Router.route('/', {

    name: 'home',
    template: 'home'

});

Router.route('/router/arp/:routerId', function () {

    var request = this.request;
    var response = this.response;

    var headers = request.headers;
    console.log(request);
    console.log(this.params);

    response.end(JSON.stringify({success: true, message:'successfully retrieved data'}));

}, {where: 'server'});