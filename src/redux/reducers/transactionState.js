const defaultState = {
  connected: false,
  state: '?',
};

export default function transactionStateReducer(state = {}, action) {
  const { type, payload } = action;
  if (!(payload && payload.cid)) return state;
  return {
    ...state,
    [payload.cid]: !state[payload.cid] ? [payload] : [...state[payload.cid], payload],
  };
}
