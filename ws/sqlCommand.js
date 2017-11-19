const pg = require('pg');
const constants = require('./constants')

async function executeSql(send, msg, session) {
  if (!session.pg) return send(constants.ERROR, { message: 'No active connection' });
  try {
    const client = session.pg;
    const { cid, cmd, ...queryConfig } = msg;
    queryConfig.rowMode = 'array';

    console.info(`[${cid}] Query config`, queryConfig);

    // console.dir(query);

    const ts = Date.now();
    const start = process.hrtime();
    const result = await client.query(queryConfig);
    const t = process.hrtime(start);

    t.unshift(ts);
    send({
      T: constants.SQL_RESPONSE,
      t,
      cmdType: result.command,
      fields: result.fields,
      rows: result.rows,
      rowCount: result.rowCount,
      oid: result.oid !== null ? result.oid : undefined,
    });
  } catch (error) {
    send(error);
  }
}

module.exports = executeSql;
