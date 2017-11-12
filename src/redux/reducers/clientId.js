export default function commandsReducer(state = 0, action) {
  const { type, payload } = action;
  switch (type) {
    case 'NEW_CID':
      return state + 1;
    default:
      return state;
  }
}