const constants = require('./constants');

const MAX_ROW_BUFFER_LENGTH = 100;

class CustomQuery {
  // Supporting only simple queries
  constructor(send, text) {
    this.send = send;
    this.text = text;
    this.isPreparedStatement = false;
    this.rowBuffer = [];
    this.serverRows = 0;
    this.serverBytes = 0;
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
    console.log('SQL:', this.text);
    con.query(this.text);
    send({
      T: constants.SQL_READY_FOR_QUERY,
      s: 'W',
    });
  }

  handleRowDescription(msg) {
    this.flushRowBuffer();
    this.serverBytes = msg.length;
    this.serverRows = 0;
    msg.T = constants.SQL_ROW_DESCRIPTION;
    msg.name = undefined;
    this.send(msg);
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
    this.flushRowBuffer();
    let cmd;
    if (msg) cmd = msg.text;
    this.send({
      T: constants.SQL_COMMAND_COMPLETE,
      rows: this.serverRows,
      bytes: this.serverBytes,
      cmd,
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
    this.send('TODO: handlePortalSuspended');
  }

  handleCopyInResponse(con) {
    this.send('TODO: handleCopyInResponse');
  }

  handleCopyData(msg, con) {
    this.send('TODO: handleCopyData');
  }

}

module.exports = CustomQuery;
