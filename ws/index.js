const WebSocket = require('faye-websocket');
const pg = require('pg');

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
    ws.state = Object.create(null);
    ws.state.sid = null; // persistent session, connections will not be lost
    ws.state.db = null; // database connection

    ws.json = (json) => ws.send(JSON.stringify(json));
    ws.error = (error) => {
      err(error);
      ws.json({error});
    };

    ws.on('message', (event) => {
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

      if (message.cmd && message.cmd.startsWith('\\')) {
        // special commands
      }

      info(`[${message.cid}]`, message);
    });

    ws.on('close', (event) => {
      info('close', event);
      ws = null;
    });
  }
}

exports.upgradeHandler = upgradeHandler;
