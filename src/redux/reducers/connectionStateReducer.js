const defaultState = {
  connected: false,
  inQuery: false,
  inTransaction: false,
  
  // I: PQTRANS_IDLE — Server is awaiting new query in autocommit mode
  // T: PQTRANS_INTRANS — Server is awaiting new query in transaction block
  // E: PQTRANS_INERROR — Server is in aborted transaction due to an error
  // ?: PQTRANS_UNKNOWN — Unknown server condition, like an error
  // W: WORK (artificial) — Server is processing query
  state: '?',
};

export default function connectionStateReducer(state = defaultState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'WS_Z': {
      const readyState = payload.ready;
      return {
        connected: readyState !== '?',
        inQuery: false,
        inTransaction: readyState === 'T' || readyState === 'E',
        state: readyState,
      };
    }
    case 'COMMAND': {
      return {
        ...state,
        inQuery: true,
      };
    }
    default:
      return state;
  }
}
