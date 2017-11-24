// test start of command, fastest filter
exports.startsWith = '\\q';

// test full regexp, slower filter
exports.test = /^\\q(uit)?$/;

// group -- Group name in English, default to "others"
exports.group = 'General';

// description -- single line
exports.description = 'Close WebSocket connection';

// markdown, verbose info
// exports.help: String;

// can do action, returning result -- next state
exports.action = (send, message, match, session) => {
  session.close();
  return true;
}
