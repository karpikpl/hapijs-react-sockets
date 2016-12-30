'use strict';
const Path = require('path');

exports.register = function (server, options, next) {

   // Serve up all static content in build folder
  server.route({
    method: 'GET',
    path: '/{path*}',
    handler: {
      directory: {
        path: Path.join(__dirname, '../../client/build/'),
        listing: false,
        index: true
      }
    }
  });

    console.log(`serving static content from ${Path.join(__dirname, '../../client/build/')}`);

    next();
};


exports.register.attributes = {
    name: 'web',
    dependencies: 'inert'
};
