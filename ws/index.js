const WebSocket = require('faye-websocket');
const deflate = require('permessage-deflate');
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
    let ws = new WebSocket(req, socket, head, [], {
      extensions: [deflate]
    });
    let session = Object.create(null);
    session.sid = null; // persistent session, connections will not be lost
    session.pg = null; // database connection
    
    session.send = (json) => {
      const str = JSON.stringify(json);
      const cid = json.cid ? `[${json.cid}] ` : '';
      const sendResult = ws.send(str);
      if (str.length <= 220)
        info(`${cid}>> ${str}`, sendResult);
      else
        info(`${cid}>>>> Sent ${str.length} chars`, sendResult);
      return sendResult;
    }

    ws.error = (error) => {
      err(error);
      session.send({error});
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
        return session.send({});
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
          session.send({
            cid: message.cid,
            text: data,
          });
        } else {
          session.send({
            cid: message.cid,
            ...data,
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
      session.send = Function.prototype; // same as (() => undefined);
      session = null;
      ws = null;
      info('WebSocket closed');
    });
  }
}

exports.upgradeHandler = upgradeHandler;
