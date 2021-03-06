var _ = require('lodash');
var Promise = require('bluebird');

function lift (done) {
  var self = this;
  var senecaConnectionName = _.merge({}, self.config.seneca, (self.config.seneca || {}).client).connection;
  var senecaConnection = self.config.connections[senecaConnectionName];
  if(senecaConnectionName && !senecaConnection) {
    throw new Error('unknown seneca connection:' + senecaConnectionName);
  }

  if(senecaConnection.transport) {
    self.seneca.use(senecaConnection.transport);
  }

  self.seneca.client(senecaConnection.options);
  process.nextTick(done);
}

function lower (done) {
  this.seneca.close(done);
}

module.exports = {
  lift: Promise.promisify(lift),
  lower: Promise.promisify(lower)
};
