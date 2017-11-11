const fs = require('fs');
const path = require('path');

const commands = [];


function isMatch(module, cmd) {
  if (typeof cmd !== 'string') throw new Error('Command (2nd arg) must be a string');
  if (module.startsWith && !cmd.startsWith(module.startsWith)) return false;
  if (typeof module.test === 'function') return module.test(cmd);
  if (module.test instanceof RegExp) return module.test.test(cmd);
  throw new Error('Unhandled state in command.isMatch');
}


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
    .reduce((modules, name) => {
      try {
        const module = require(name);
        if (!module.startsWith && !module.test) {
          throw new Error('module does not export `startsWith` nor `test`');
        }

        if (module.startsWith && module.test) {
          if (!isMatch(module, module.startsWith)) {
            throw new Error('`module.startsWith` is not accepted by `module.test`');
          }
        }
        modules.push(module);
      } catch(err) {
        console.error(`Cannot load module ${name}:`, err.message);
      }
      return modules;
    }, [])
    .map(module => {
      const descPart = module.description ? module.description : '';
      const grpPart = module.group || '';
      const startsWithPart = module.startsWith || '';
      const regexPart = module.test && module.test.toString() || '';
      console.info(`${startsWithPart}\t${regexPart}\t${grpPart}\t${descPart}`);
      return module;
    });
  commands.push(...commands);
}

loadCommands(`${__dirname}/commands`);

console.info('Default commands loaded');

exports.commands = commands;

