const defaultState = {
  // list of every atomic.
  // every item can be deleted, hidden or pinned
  list: [],
  // object containing resultset
  currentCommand: null,
  // object containing resultset
  currentTable: null,
  // last *WORK* started at `Date.now()` from server
  lastCommandTs: null,
};

const reduceToList = (state, item, extra) => ({
  ...state,
  list: [ ...state.list, item ],
  ...extra
});

// look for item by item.luid and replaces it
const mergeInList = (state, item, extra) => {
  const { list } = state;
  const { luid } = item;
  if (!item.luid) throw new Error('You didn\'t provide item.luid');
  const index = list.findIndex(tested => tested.luid === luid);
  if (index < 0) return state;
  const oldItem = list[index];
  return {
    ...state,
    list: [
      ...list.slice(0, index),
      {
        ...oldItem,
        ...item,
      },
      ...list.slice(index + 1),
    ],
    ...extra,
  }  
};

export default function outputReducer(state = defaultState, action) {
  const { type, payload, meta } = action;
  const luid = meta ? meta.luid : undefined;
  switch (type) {
    // sent command
    case 'COMMAND': return reduceToList(state, {
      render: 'command',
      luid,
      ...payload,
    });

    // text response, like notice but artificial
    case 'WS_*': return reduceToList(state, {
      render: 'text',
      luid,
      ...payload,
    });

    // SQL_NOTICE
    case 'WS_N': return reduceToList(state, {
      render: 'notice',
      luid,
      ...payload,
    });

    // SQL_NOTIFICATION
    case 'WS_A': return reduceToList(state, {
      render: 'notification',
      luid,
      ...payload,
    });

    // ERROR
    case 'WS_E': return reduceToList(state, {
      render: 'error',
      luid,
      ...payload,
    });

    case 'WS_Z': {
      // start of processing but no output yet
      if (payload.s === 'W') {
        const lastCommandTs = payload.t;
        return {
          ...state,
          lastCommandTs,
          currentTable: null,
        };
      }

      return reduceToList(state, {
        render: 'separator',
        luid,
        transactionState: payload.s,
      }, {
        currentTable: null,
      })
    }

    // SQL_ROW_DESCRIPTION
    case 'WS_T': {
      const { list, currentTable } = state;
      if (currentTable !== null) {
        console.error('currentTable expected to be null in reduce, found this:', currentTable);
      }
      if (!luid) {
        console.error('`meta.luid` is crucial for \'WS_T\' redux message');
      }

      const newTable = {
        render: 'table',
        luid,
        timing1: payload.t,
        columns: payload.f,
        loading: true,
        rowCount: 0,
        bytes: null,
        rows: [],
      }

      return reduceToList(state, newTable, {
        currentTable: newTable,
      });
    }

    case 'WS_D': {
      // MUTABLE and this is not a bug
      // this reducer case is special...
      // you really don't want re-render whole table
      // just because of *ONLY* appended rows..
      // everything will be fixed after SQL_COMMAND_COMPLETE :-)
      const { r } = payload;
      const { currentTable } = state;
      if (!currentTable) {
        console.error('Hey, what I can do with this rows? I don\'t know context!', r);
        return state;
      }
      currentTable.rowCount += payload.r.length;
      currentTable.rows.push(...payload.r); // MUTABLE but not a bug :-)
      return mergeInList(state, currentTable);
    }

    // SQL_COMMAND_COMPLETE
    case 'WS_C': {
      const { currentTable, tables } = state;
      const commandComplete = {
        render: 'commandComplete',
        luid,
        timing: payload.t,
        text: payload.c,
        bytes: payload.b,
        rowCount: payload.r,
      };

      // some commands, like LISTEN does not returns T/D messages
      // so it is possible that currentTable can be null
      if (currentTable === null) {
        return reduceToList(state, commandComplete, { currentTable: null });
      } else {
        if (!currentTable) {
          console.error('I should cose table, but no table is opened? WTF!?');
        }
  
        const finishedTable = {
          ...currentTable,
          timing2: payload.t,
          loading: false,
          bytes: payload.b,
          rowCount: payload.r,
          text: payload.c,
        };
  
        return reduceToList(state, commandComplete, { currentTable: null });
      }
    }

    default:
      return state;
  }
}