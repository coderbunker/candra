import 'arpTable.js';

RouterApi = new Restivus({
    apiPath: 'routerapi/',
    version: 'v1'
});

RouterApi.addRoute(
    'arp/:name', {
        authRequired: false,
        prettyJson: true,
        defaultHeaders: { 'Content-Type': 'application/json' }
    }, {
        post() {
            var request = this.request;
            var key, arpTable, headers = request.headers;
            var router = _.findWhere(App.routers, { name: this.urlParams.name });

            var key = headers.authorization.substring('Bearer '.length);

            if (!router) {
                return {
                    statusCode: 404,
                    body: {
                        success: false,
                        message: 'this router does not exist in configuration'
                    }
                };
            }

            if (!headers.authorization) {
                return {
                    statusCode: 401,
                    body: {
                        success: false,
                        message: 'authorization token missing'
                    }
                };
            }


            if (key !== router.key) {
                return {
                    statusCode: 401,
                    body: {
                        success: false,
                        message: 'wrong authorization key'
                    }
                };
            }

            if (!request.body.arpTable) {
                return {
                    statusCode: 400,
                    body: {
                        success: false,
                        message: 'invalid request, missing arpTable'
                    }
                };
            }

            APICalls.upsert({ api: 'arp' }, {
                $set: {
                    api: 'arp',
                    time: new Date(),
                    clientIP: request.headers['x-forwarded-for']
                }
            });

            entries.forEach((entry) => {
                associateEntry(entry);
            });

            clearExpiredEntries(entries);

            return { success: true, message: 'successfully retrieved data' };

        }
    }
);

SpaceApi = new Restivus({
    apiPath: 'spaceapi/',
    version: 'v1'
});

SpaceApi.addRoute(
    'status', {
        authRequired: false,
        prettyJson: true
    }, {
        get() {
            this.response.setHeader('Content-Type', 'application/json');
            this.response.end(Meteor.settings.public.spaceapi);
        }
    }
);
