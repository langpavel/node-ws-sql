const pg = require('pg');

async function executeSql(send, msg, session) {
  if (!session.pg) return send({error: 'No active connection'});
  try {
    const client = session.pg;
    const { cid, cmd, ...queryConfig } = msg;

    console.info(`[${cid}] Query config`, queryConfig);
    const start = process.hrtime();
    const result = await client.query(queryConfig, msg.values);
    result.duration = process.hrtime(start);

    send(result);
  } catch (error) {
    console.info(`[${cid}] error`, error);
    send({error});
  }
}

module.exports = executeSql;
