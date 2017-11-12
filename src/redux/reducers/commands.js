export default function commandsReducer(state = {}, action) {
  const { type, payload } = action;
  switch (type) {
    case 'COMMAND':

      break;

    default:
      return state;
  }
}