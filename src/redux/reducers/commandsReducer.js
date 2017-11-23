export default function commandsReducer(state = {}, action) {
  const { type, payload } = action;
  if (type === 'COMMAND' || !(payload && payload.cid)) return state;
  const { cid, ...slimPayload } = payload;
  return {
    ...state,
    [cid]: !state[cid] ? [slimPayload] : [...state[cid], slimPayload],
  };
}
