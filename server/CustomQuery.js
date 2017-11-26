const debugSQL = require('debug')('ws-sql:SQL');
const constants = require('./constants');

const MAX_ROW_BUFFER_LENGTH = 500;

class CustomQuery {
  // Supporting only simple queries
  constructor(send, text) {
    this.send = send;
    this.text = text;
    this.isPreparedStatement = false;
    this.rowBuffer = [];
    this.serverRows = 0;
    this.serverBytes = 0;
    this.timeHrStart = null;
  }

  flushRowBuffer() {
    if (this.rowBuffer.length) {
      this.send({
        T: constants.SQL_RESPONSE,
        r: this.rowBuffer,
      });
      this.rowBuffer = [];
    }
  }

  // Submitable interface
  submit(con) {
    debugSQL(this.text);

    con.query(this.text);
    // to be fair, count time after request was queued to the socket
    const t = Date.now();
    this.timeHrStart = process.hrtime();

    this.send({
      T: constants.SQL_READY_FOR_QUERY,
      t,
      s: 'W',
    });

    // This does not work on simple query
    // this._flushTimeout = setTimeout(() => {
    //   con.flush();
    //   debugSQL('flush send on the wire');
    // }, 200);
  }

  handleRowDescription(msg) {
    const t = process.hrtime(this.timeHrStart);
    this.rowBuffer = [];
    this.serverBytes = msg.length;
    this.serverRows = 0;
    msg.name = undefined;
    this.send({
      T: constants.SQL_ROW_DESCRIPTION,
      t,
      f: msg.fields,
    });

    // if (this._flushTimeout) {
    //   clearTimeout(this._flushTimeout);
    //   this._flushTimeout = null;
    // }
  }

  handleDataRow(msg) {
    this.serverBytes += msg.length;
    this.serverRows++;
    this.rowBuffer.push(msg.fields);
    if (this.rowBuffer.length >= MAX_ROW_BUFFER_LENGTH) {
      this.flushRowBuffer();
    }
  }

  handleCommandComplete(msg, con) {
    const t = process.hrtime(this.timeHrStart);
    this.flushRowBuffer();
    let c;
    if (msg) c = msg.text;
    this.send({
      T: constants.SQL_COMMAND_COMPLETE,
      t,
      c,
      r: this.serverRows,
      b: this.serverBytes,
    });
    if (this.isPreparedStatement) con.sync();
  }

  handleEmptyQuery(con) {
    this.handleCommandComplete(null, con);
  }

  handleReadyForQuery(con) {
    // At this time, we don't have `msg` with status,
    // so we need global handler on connection
  }

  handleError(err, con) {
    this.send(err);
    if (this.isPreparedStatement) con.sync();
  }

  // portals are connected with cursors
  handlePortalSuspended(con) {
    debugSQL('TODO: handlePortalSuspended');
    this.send('TODO: handlePortalSuspended');
  }

  handleCopyInResponse(con) {
    debugSQL('TODO: handleCopyInResponse');
    this.send('TODO: handleCopyInResponse');
  }

  handleCopyData(msg, con) {
    debugSQL('TODO: handleCopyData');
    this.send('TODO: handleCopyData');
  }

}

module.exports = CustomQuery;
