export default function commandsReducer(state = {list: []}, action) {
  const { type, payload } = action;
  switch (type) {
    case 'COMMAND':
      return {
        ...state,
        list: [
          ...state.list,
          payload.cid,
        ],
        [payload.cid]: payload,
        responses: [],
      }
      break;

    default:
      return state;
  }
}