const WebSocket = require('faye-websocket');
// const pg = require('pg');

function log(msg, ...rest) {
  console.info(`${new Date().toISOString()} ${msg}`, ...rest);
}

// parse incomming message in form: [clientId] command
const reCmd = /^(?:\[([^\]]+)\])?\s*(\S+)/;

const upgradeHandler = (req, socket, head) => {
  if (WebSocket.isWebSocket(req)) {
    log('Upgrade WebSocket', req.method, req.url);
    let ws = new WebSocket(req, socket, head);
    let wsState = Object.create(null);
    wsState.lastMessage = null;

    ws.json = (json) => ws.send(JSON.stringify(json));

    ws.on('message', (event) => {
      const raw = event.data;
      log('Received', raw);

      // accept only strings
      if (typeof raw !== 'string') {
        return ws.json({
          error: 'Invalid input',
        });
      }

      // return empty JSON on empty input
      if (!raw.length) {
        return ws.json({});
      }
      let message = null;

      // accept JSON input
      if (raw[0] === '{') {
        try {
          message = JSON.parse(raw);
        } catch(error) {
          return ws.json({
            error: 'Invalid JSON',
          });
        }
      } else {
        const [, cid, cmd] = reCmd.exec(raw);
        message = {
          cid,
          cmd,
          text: cid ? raw.slice(cid.length + 2) : raw, // strip initial '[clientId]'
        }
      }

      log(`[${message.cid}]`, message);
    });

    ws.on('close', (event) => {
      log('close', event);
      ws = null;
      wsState = null;
    });
  }
}

exports.upgradeHandler = upgradeHandler;
