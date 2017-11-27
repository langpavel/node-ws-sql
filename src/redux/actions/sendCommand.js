// import wsClient from '../../wsClient';

export default function sendCommand(cmd) {
  return (dispatch, getState) => {
    dispatch({
      type: 'NEW_CID'
    });
    const state = getState();
    const cid = state.clientId.toString(36);

    dispatch({
      type: 'COMMAND',
      payload: {
        cid,
        cmd
      }
    });
    window.psql.send(`[${cid}]${cmd}`);
  };
}
