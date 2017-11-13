const pg = require('pg');

async function executeSql(send, msg, session) {
  if (!session.pg) return send({error: 'No active connection'});
  try {
    const client = session.pg;
    const { cid, cmd, ...queryConfig } = msg;
    queryConfig.rowMode = 'array';

    console.info(`[${cid}] Query config`, queryConfig);
    const ts = Date.now();
    const start = process.hrtime();
    const result = await client.query(queryConfig, msg.values);
    const t = process.hrtime(start);
    t.unshift(ts);
    send({
      t,
      result,
    });
  } catch (error) {
    console.info(`[${cid}] error`, error);
    send({error});
  }
}

module.exports = executeSql;
