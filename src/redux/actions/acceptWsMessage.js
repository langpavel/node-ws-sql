import luid from '../../utils/luid';

export default function acceptWsMessage(payload) {
  return (dispatch, getState) => {
    if (payload.T) {
      dispatch({
        type: `WS_${payload.T}`,
        payload,
        meta: {
          luid: luid(),
        }
      });
    } else {
      console.error('acceptWsMessage expect `T` property');
    }
  };
}
