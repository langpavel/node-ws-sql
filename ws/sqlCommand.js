const pg = require('pg');

async function executeSql(send, message, session) {
  if (!session.pg) return send({error: 'No active connection'});
}

module.exports = executeSql;
