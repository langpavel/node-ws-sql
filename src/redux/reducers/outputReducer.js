const defaultState = {
  // list of every atomic.
  // every item can be deleted, hidden or pinned
  list: [],
  // tables keyed by cid from ^list^
  tables: {},
  // string reference to table which is currently received from socket
  currentTable: null,
  // last *WORK* started at.. timestamp! (Date.now())
  ts: null,
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
      if (payload.s === 'W') {
        const ts = payload.t;
        return {
          ...state,
          ts,
        };
      }
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
      const { list, tables, currentTable } = state;
      if (currentTable !== null) {
        console.error('currentTable expected to be bull in reduce, found this:', currentTable);
      }

      const tableId = meta.luid;

      const newTable = {
        luid: meta.luid,
        timing1: payload.t,
        columns: payload.f,
        loading: true,
        rowCount: 0,
        bytes: null,
        rows: [],
      }

      return {
        ...state,
        list: [
          ...list,
          { table: tableId },
        ],
        tables: {
          ...tables,
          [tableId]: newTable,
        },
        currentTable: tableId,
      };
    }

    case 'WS_D': {
      // MUTABLE and this is not a bug
      // this reducer case is special...
      // you really don't want re-render whole table
      // just because of *ONLY* appended rows..
      // everything will be fixed after SQL_COMMAND_COMPLETE :-)
      const { r } = payload;
      const { currentTable, tables } = state;
      const table = tables[currentTable];
      if (!currentTable || !table) {
        console.error('Hey, what I can do with this rows? I don\'t know context!', r);
      }
      // this is the evil :-)
      // state is in fact untouched
      table.rows.push(...payload.r);
      return state;
    }

    // SQL_COMMAND_COMPLETE
    case 'WS_C': {

      const { currentTable, tables } = state;
      const table = tables[currentTable];
      if (!currentTable || !table) {
        console.error('I should cose table, but no table is opened? WTF!?');
      }

      const finishedTable = {
        ...table,
        timing2: payload.t,
        loading: false,
        bytes: payload.b,
        rowCount: payload.r,
        text: payload.c,
      };

      return {
        ...state,
        tables: {
          ...tables,
          [table.luid]: finishedTable,
        },
        currentTable: null,
      };
    }

    default:
      return state;
  }
}