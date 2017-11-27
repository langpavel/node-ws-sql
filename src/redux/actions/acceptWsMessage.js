// handle response from WebSocket

export default function acceptWsMessage(payload) {
  return (dispatch, getState) => {
    if (payload.T) {
      dispatch({
        type: `WS_${payload.T}`,
        payload,
      });
    } else {
      console.error('acceptWsMessage expect `T` property');
    }
  };
}
