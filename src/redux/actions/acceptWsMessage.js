// handle response from WebSocket

// up to 6 random characters
const luidBase = Math.random().toString(36).substring(2, 8);
let serie = 0;

export default function acceptWsMessage(payload) {
  return (dispatch, getState) => {
    if (payload.T) {
      dispatch({
        type: `WS_${payload.T}`,
        payload,
        meta: {
          luid: `${luidBase}.${(++serie).toString(36)}`,
        }
      });
    } else {
      console.error('acceptWsMessage expect `T` property');
    }
  };
}
