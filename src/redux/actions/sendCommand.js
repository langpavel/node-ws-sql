// import wsClient from '../../wsClient';
import createLuid from '../../utils/luid';

export default function sendCommand(cmd) {
  return (dispatch) => {
    const luid = createLuid();
    dispatch({
      type: 'COMMAND',
      payload: {
        cmd
      },
      meta: {
        luid,
      },
    });
    window.psql.send(cmd);
  };
}
