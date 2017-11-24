const fs = require('fs');
const path = require('path');


function isMatch(module, cmd) {
  if (typeof cmd !== 'string') throw new Error('Command (2nd arg) must be a string');
  if (module.startsWith && !cmd.startsWith(module.startsWith)) return false;
  if (typeof module.test === 'function') return module.test(cmd);
  if (module.test instanceof RegExp) return module.test.exec(cmd);
  throw new Error('Unhandled state in command.isMatch');
}


// Load all modules in commands directory.
// This is DANGEROUS but powerfull
// BTW if somebody can create file in arbitrary path
// THEN you have more serious trouble than this :-)
function loadCommands(dir) {
  const commands = fs
    // read all files in directory
    .readdirSync(dir)
    // only files ending ".js"
    .filter(name => name !== 'index.js' && /\.js$/.test(name))
    .map(name => {
      const moduleName = name.slice(0, -3);
      const resolved = path.resolve(dir, moduleName);
      console.info(`Loading module ${name} in ${resolved}.js`);
      return resolved;
    }) // remove last three characters
    .reduce((modules, name) => {
      try {
        const module = require(name);

        // if module decide itself as disabled, skip 
        if (module.disabled) {
          console.info(`DISABLED: '${name}'`);
          return modules;
        }

        if (!module.startsWith || !module.test) {
          throw new Error('module does not export `startsWith` or `test`');
        }

        if (module.startsWith && module.test) {
          const match = isMatch(module, module.startsWith);
          if (!match) {
            throw new Error('`module.startsWith` is not accepted by `module.test`');
          }
          if (!match instanceof Array) {
            throw new Error('`module.test` should return Array with first string in as longest match. See RegExp.prototype.exec()');
          }
          if (match[0] !== module.startsWith) {
            throw new Error('`module.test` should return array with first string matching `module.startsWith` when called as `module.test(module.startsWith)`');
          }
          if (module.test instanceof RegExp) {
            if (!/^\/\^.*\$\/[gi]*$/.test(module.test.toString())) {
              throw new Error('RegExp `module.test` must starts with "/^" sequence and ends with "$/". Allowed flags are g, i');
            }
          }
        }
        modules.push(module);
      } catch(err) {
        console.error(`Cannot load module ${name}:`, err.message);
        throw err;
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
  return commands;
}

const commands = loadCommands(__dirname);
console.info(`Commands (${commands.length}) loaded`);

async function execute(send, msg, session) {
  if (!msg.cmd) {
    return false;
  }
  const command = commands
    .reduce((previousMatch, module) => {
      const match = isMatch(module, msg.cmd);
      if (!match) return previousMatch;
      const possibleResult = {
        module,
        match,
      };
      return (
        !previousMatch ||
        possibleResult.match[0].length > previousMatch.match[0].length
      ) ? possibleResult : previousMatch;
    }, null);
  if (!command) return false;
  return command.module.action(send, msg, command.match, session);
}

exports.commands = commands;
exports.isMatch = isMatch;
exports.execute = execute;
