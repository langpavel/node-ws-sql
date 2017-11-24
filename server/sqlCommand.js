const pg = require('pg');
const constants = require('./constants');
const CustomQuery = require('./CustomQuery');

function executeSql(send, msg, session) {
  if (!session.pg) return send(constants.ERROR, { message: 'No active connection' });
  try {
    const pg = session.pg;
    pg.query(new CustomQuery(send, msg.text));
  } catch (error) {
    send(error);
  }
}

module.exports = executeSql;
