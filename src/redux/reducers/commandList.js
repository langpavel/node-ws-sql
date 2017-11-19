// simply add each command to list, keep some stats

export default function commandListReducer(state = [], action) {
  const { type, payload } = action;
  switch (type) {
    case 'COMMAND':
      return [
        ...state,
        { ...payload },
      ];
      break;

    default:
      return state;
  }
}