export default function clientIdReducer(state = 0, action) {
  const { type } = action;
  switch (type) {
    case 'NEW_CID':
      return state + 1;
    default:
      return state;
  }
}
