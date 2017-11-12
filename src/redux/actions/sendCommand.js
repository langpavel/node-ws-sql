export default function sendCommand(cmd) {
  return (store, getState) => {
    console.log('Hey, command', cmd);
  };
}
