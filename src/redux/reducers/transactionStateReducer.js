const defaultState = {
  connected: false,
  inQuery: false,
  inTransaction: false,
  
  // I: PQTRANS_IDLE
  // T: PQTRANS_INTRANS
  // E: PQTRANS_INERROR
  // ?: PQTRANS_UNKNOWN
  // A: autocommit mode -- artificial
  state: '?',
};

export default function transactionStateReducer(state = defaultState, action) {
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
      // should be better
      if (state.inQuery && type.startsWith('WS_')) {
        return {
          ...state,
          inQuery: false,
        };
      }
      return state;
  }
}
