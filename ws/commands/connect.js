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

  client.on('notice', (notice) => {
    send({
      T: constants.SQL_NOTICE,
      text: notice,
    });
  });

  client.on('notification', (notification) => {
    send({
      T: constants.SQL_NOTIFICATION,
      ...notification
    });
  });

  await client.connect();

  client.connection.on('readyForQuery', msg => {
    send({
      T: constants.SQL_READY_FOR_QUERY,
      ready: msg.status
    });
  });

  // client.connection.on('message', msg => {
  //   console.info('>>>', msg);
  // });

  if (session.pg) {
    send("Your previous connection will be disconnected");
    session.pg.end().then(() => {
      console.info('Connection released');
    }).catch(err => null);
    session.pg = null;
  } else {
    session.on('close', () => {
      if (session.pg) {
        session.pg.end().then(() => {
          console.info('Connection released');
        }).catch(err => null);
      }
    });
  }

  session.pg = client;
  send("Connected");
};
