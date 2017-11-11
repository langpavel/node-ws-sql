const fs = require('fs');
const path = require('path');

const commands = [];



// Load all modules in commands directory.
// This is DANGEROUS but powerfull
// BTW if somebody can create file in arbitrary path
// THEN you have more serious trouble than this :-)
function loadCommands(dir) {
  const commands = fs
    .readdirSync(dir) // read files in current directory
    .filter(name => /\.js$/.test(name)) // only files ending ".js"
    .map(name => {
      const moduleName = name.slice(0, -3);
      const resolved = path.resolve(dir, moduleName);
      console.info(`Loading module ${name} in ${resolved}.js`);
      return resolved;
    }) // remove last three characters
    .map(require)
    .map(module => {
      const descPart = module.description ? module.description : '';
      const grpPart = module.group || '';
      const startWithPart = module.startWith || '';
      const regexPart = module.test && module.test.toString() || '';
      console.info(`${startWithPart}\t${regexPart}\t${grpPart}\t${descPart}`);
      return module;
    });
  commands.push(...commands);
}

loadCommands(`${__dirname}/commands`);

exports.commands = commands;

