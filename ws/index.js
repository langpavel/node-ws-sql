const WebSocket = require('faye-websocket');
const pg = require('pg');

function log(msg, ...rest) {
  console.info(`${new Date().toISOString()} ${msg}`, ...rest);
}

const upgradeHandler = (req, socket, head) => {
  if (WebSocket.isWebSocket(req)) {
    log('Upgrade WebSocket', req.method, req.url);
    let ws = new WebSocket(req, socket, head);
    let wsState = Object.create(null);
    wsState.lastMessage = null;

    ws.on('message', (event) => {
      log('Received', event.data);
      if (event.data === 'repeat') {
        ws.send(wsState.lastMessage);
      } else {
        wsState.lastMessage = event.data;
        ws.send(event.data);
      }
    });

    ws.on('close', (event) => {
      log('close', event);
      ws = null;
      wsState = null;
    });
  }
}

exports.upgradeHandler = upgradeHandler;
