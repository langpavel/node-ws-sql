const defaultState = {};

export default function connectionParamsReducer(state = defaultState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'WS_S': {
      const { n: name, v: value } = payload;
      return {
        ...state,
        [name]: value,
      };
    }
    default:
      return state;
  }
}
