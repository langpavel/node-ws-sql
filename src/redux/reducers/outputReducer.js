const defaultState = {
  // list of every atomic.
  // every item can be deleted, hidden or pinned
  list: [],
  // tables keyed by cid from ^list^
  tables: {},
  // string reference to table which is currently received from socket
  currentTable: null,
  // sent, enqueued statements
  pendingList: [],
};

export default function outputReducer(state = defaultState, action) {
  const { type, payload, meta } = action;
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
      const { list } = state;
      return {
        ...state,
        list: [
          ...list,
          payload,
        ],
      };
    }
    case 'WS_Z': {
      // state of command from client changed against SQL server
      const { list } = state;
      // start of processing but no output yet
      if (payload.s === 'W') return state;
      return {
        ...state,
        list: [
          ...list,
          {
            render: 'separator',
            props: { transactionState: payload.s },
          },
        ],
      };
    }

    // SQL_ROW_DESCRIPTION
    case 'WS_T': {
      const { list, currentTable } = state;
      if (currentTable !== null) {
        console.error('currentTable expected to be bull in reduce, found this:', currentTable);
      }

      const tableId = meta.luid;

      const newTable = {
        luid: meta.luid,
        columns: payload.f,
        rows: 0,
        bytes: 0,
      }

      return {
        ...state,
        currentTable: {
        }
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