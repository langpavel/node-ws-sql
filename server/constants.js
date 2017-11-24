// if in doubt, consult https://github.com/brianc/node-postgres/blob/master/lib/connection.js
exports.SQL_PARAMETER_STATUS = 'S'; // run-time parameter status report
exports.SQL_ROW_DESCRIPTION = 'T';
exports.SQL_RESPONSE = 'D';
exports.SQL_COMMAND_COMPLETE = 'C';
exports.SQL_READY_FOR_QUERY = 'Z';
exports.SQL_NOTICE = 'N';
exports.SQL_NOTIFICATION = 'A';
exports.TEXT = '*';
exports.ERROR = 'E';

// Other PGSQL v3 protocol messages from backend
// exports.SQL_BIND_COMPLETE = '2';              // Bind-complete indicator
// exports.SQL_CLOSE_COMPLETE = '3';             // Close-complete indicator
// exports.SQL_EMPTY_QUERY = 'I';                // response to an empty query string. (This substitutes for CommandComplete.)
// exports.SQL_FUNCTION_CALL = 'V';              // function call result
// exports.SQL_NEGOTIATE_PROTOCOL_VERSION = 'v'; // protocol version negotiation message
// exports.SQL_NO_DATA = 'n';                    // no-data indicator
// exports.SQL_PARAMETER_DESCRIPTION = 't';      // parameter description
// exports.SQL_PARSE_COMPLETE = '1';             // Parse-complete indicator
// exports.SQL_PORTAL_SUSPENDED = 's';           // portal-suspended indicator. Note this only appears if an Execute message's row-count limit was reached
// exports.SQL_COPY_DATA = 'd';                  // COPY data
// exports.SQL_COPY_DONE = 'c';                  // COPY-complete indicator
// exports.SQL_COPY_IN = 'G';                    // Start Copy In response. The frontend must now send copy-in data (if not prepared to do so, send a CopyFail message)
// exports.SQL_COPY_OUT = 'H';                   // Start Copy Out response. This message will be followed by copy-out data
// exports.SQL_COPY_BOTH = 'W';                  // Start Copy Both response. This message is used only for Streaming Replication
