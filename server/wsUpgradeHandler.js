const WebSocket = require('faye-websocket');
const deflate = require('permessage-deflate');
const Session = require('./session');
const debugWs = require('debug')('ws-sql:ws');

const upgradeHandler = (req, socket, head) => {
  if (WebSocket.isWebSocket(req)) {
    debugWs('Upgrade WebSocket', req.method, req.url);
    let ws = new WebSocket(req, socket, head, [], {
      extensions: [deflate]
    });
    new Session(ws);
  }
}

module.exports = upgradeHandler;
