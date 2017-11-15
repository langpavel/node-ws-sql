const pg = require('pg');

async function executeSql(send, msg, session) {
  if (!session.pg) return send({ error: 'No active connection' });
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
      t,
      cmdType: result.command,
      fields: result.fields,
      rows: result.rows,
      rowCount: result.rowCount,
      oid: result.oid !== null ? result.oid : undefined,
    });
  } catch (error) {
    console.info(`[${cid}] error`, error);
    send({ error });
  }
}

module.exports = executeSql;
