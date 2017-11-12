const WebSocket = require('faye-websocket');
const commands = require('./commands');
const sqlCommand = require('./sqlCommand');

function info(msg, ...rest) {
  console.info(`${new Date().toISOString()} ${msg}`, ...rest);
}

function err(msg, ...rest) {
  console.error(`${new Date().toISOString()} ${msg}`, ...rest);
}

// parse incomming message in form: [cid]cmd
const reCmd = /^(?:\[([^\]]+)\])?\s*(\S+)/;

const upgradeHandler = (req, socket, head) => {
  if (WebSocket.isWebSocket(req)) {
    info('Upgrade WebSocket', req.method, req.url);
    let ws = new WebSocket(req, socket, head);
    let session = Object.create(null);
    session.sid = null; // persistent session, connections will not be lost
    session.pg = null; // database connection

    ws.json = (json) => {
      const str = JSON.stringify(json);
      info(`Sending ${str.length}`);
      return ws.send(str);
    }
    ws.error = (error) => {
      err(error);
      ws.json({error});
    };

    ws.on('message', async (event) => {
      const raw = event.data;
      info('Received', raw);

      // accept only strings
      if (typeof raw !== 'string') {
        return ws.error('Invalid input');
      }

      // return empty JSON on empty input
      if (!raw.length) {
        return ws.json({});
      }
      let message = null;

      // accept JSON input
      if (raw.startsWith('{')) {
        try {
          message = JSON.parse(raw);
        } catch(error) {
          return ws.error('Invalid JSON input');
        }
      } else {
        const [, cid, cmd] = reCmd.exec(raw);
        message = {
          cid,
          cmd,
          text: cid ? raw.slice(cid.length + 2) : raw, // strip initial '[clientId]'
        }
      }

      // send response with clientId
      const send = data => {
        if (typeof data === 'string') {
          ws.json({
            cid: message.cid,
            text: data,
          });
        } else {
          ws.json({
            ...data,
            cid: message.cid,
          });
        }
      }

      try {
        const processed = await commands.execute(send, message, session, ws);
        if (processed) {
          return;
        } else if (processed === false) {
          info(`[${message.cid}] going to execute SQL`);
          await sqlCommand(send, message, session);
        }
      } catch (error) {
        send({error});
      }
    });

    ws.on('close', (e) => {
      ws = null;
      session = null;
      info('WebSocket closed');
    });
  }
}

exports.upgradeHandler = upgradeHandler;
