// Ignore invalid HTTP certificates for space API
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

App.Seeder = {};
App.Initializer = {};

// User Winston as default logger for better server side code logging
//Logger = Winston;
