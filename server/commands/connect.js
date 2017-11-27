const assert = require('assert');
const pg = require('pg');
const constants = require('../constants');

// test start of command, fastest filter
exports.startsWith = '\\c';

// test full regexp, slower filter, returns the longest match
// result will be forwarded to action
exports.test = /^\\c(?:onnect)?$/;

// group -- Group name in English, default to "Others"
exports.group = 'Connection';

// description -- single line
exports.description = 'Connect to database';

// markdown, verbose info
exports.help = '\c[onnect] <Connection String>';

// can do action, returning result -- next state
// if action return false, SQL command will be executed instead
exports.action = async (send, message, match, session) => {
  const connectionString = message.text.match(/^\s*\\c(?:onnect)?\s*(.*)\s*$/)[1] || process.env.WS_SQL_DEFAULT;
  const client = connectionString ? new pg.Client({ connectionString }) : new pg.Client();

  client.on('notice', (notice) => send({
    T: constants.SQL_NOTICE,
    cid: session.currentCid || undefined,
    message: notice.message,
    severity: notice.severity,
    code: notice.code,
    detail: notice.detail,
    hint: notice.hint,
    position: notice.position,
    internalPosition: notice.internalPosition,
    internalQuery: notice.internalQuery,
    where: notice.where,
    schema: notice.schema,
    table: notice.table,
    column: notice.column,
    dataType: notice.dataType,
    constraint: notice.constraint,
    file: notice.file,
    line: notice.line,
    routine: notice.routine,
  }));

  client.on('notification', (notification) => send({
    T: constants.SQL_NOTIFICATION,
    cid: undefined,
    ...notification,
  }));

  const con = client.connection;
  assert(con, 'connection is not available before connect');

  con.on('parameterStatus', msg => send({
    T: constants.SQL_PARAMETER_STATUS,
    n: msg.parameterName,
    v: msg.parameterValue,
  }));

  con.on('readyForQuery', msg => {
    send({
      T: constants.SQL_READY_FOR_QUERY,
      cid: undefined,
      s: msg.status,
    });  
    session.currentCid = null;
  });  

  send("Connecting...");

  await client.connect();

  if (session.pg) {
    session.pg.end().then(() => {
      send('Your previous connection was released');
    }).catch(err => null);
    session.pg = null;
  } else {
    session.on('close', () => {
      if (session.pg) {
        session.pg.end().then(() => {
          send('Connection released');
        }).catch(err => null);
      }
    });
  }

  session.pg = client;
  return true;
};
