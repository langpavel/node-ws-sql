const fs = require('fs');

// test start of command, fastest filter
exports.startsWith = '\\?';

// test full regexp, slower filter
exports.test = /^\\\?$/;

// group -- Group name in English, default to "others"
exports.group = 'General';

// description -- single line
exports.description = 'Show help';

// markdown, verbose info
exports.help = `
## Usage:
\`\\? <command or query>\`
`;


const md = fs.readFileSync(`${__dirname}/questionmark.md`, 'utf-8');

// can do action, returning result -- next state
exports.action = (send) => {
  send({ md });
  return true;
};
