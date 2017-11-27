const defaultState = {
  // list of every atomic.
  // every item can be deleted, hidden or pinned
  list: [],
  // tables keyed by cid from ^list^
  tables: {},
  // table which is currently received from socket
  currentTable: null,
}

export default function outputReducer(state = defaultState, action) {
  const { type, payload } = action;
  switch (type) {
    // sent command
    case 'COMMAND':
    // text response, like notice but artificial
    case 'WS_*':
    // SQL_NOTICE
    case 'WS_N':
    // SQL_NOTIFICATION
    case 'WS_A':
    // ERROR
    case 'WS_E': {
      const { list, pendingTable } = state;
      return {
        list: [
          ...list,
          payload,
        ],
        pendingTable,
      };
    }
    case 'WS_Z': {
      const { list, pendingTable } = state;
      return {
        list: [
          ...list,
          { separator: payload.s},
        ],
        pendingTable,
      };
    }

    // SQL_ROW_DESCRIPTION
    case 'WS_T': {
      const { list } = state;
      const pendingTable = payload;
      console.log(pendingTable);
      return {
        list,
        pendingTable,
      };
    }
    // SQL_RESPONSE
    case 'WS_D':
    // SQL_COMMAND_COMPLETE
    case 'WS_C': {
      
    }

    default:
      return state;
  }
}