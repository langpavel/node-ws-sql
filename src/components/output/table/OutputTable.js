import React from 'react';
import PropTypes from 'prop-types';
import Value from './Value';

import './OutputTable.css';

export default class OutputTable extends React.Component {
  static propTypes = {
    luid: PropTypes.string.isRequired,
    columns: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      tableID: PropTypes.number,
      columnID: PropTypes.number,
      dataTypeID: PropTypes.number,
      dataTypeSize: PropTypes.number,
      dataTypeModifier: PropTypes.number,
      // format: PropTypes.string,
    })),
    rows: PropTypes.array, // all rows
    rowsView: PropTypes.array, // slice of rendered rows
    rowCount: PropTypes.number, // count of all rows, default rows.length
    // properties driving view
    offset: PropTypes.number,
    maxRows: PropTypes.number,
  };

  static defaultProps = {
    offset: 0,
    maxRows: 20,
  };

  constructor(props) {
    super(props);
    const {
      offset,
      maxRows,
    } = props;
    this.state = {
      offset,
      maxRows,
    };
  }

  // Like every component, remember...
  shouldComponentUpdate() {
    return true;
  }

  handleCellClick = (e, rowIndex, colIndex) => {
    console.log(`Cell click: ${rowIndex}:${colIndex}`);
  }

  handleWheel = (e) => {
    // Wheel + modifiers are passed to browser
    // Shift+wheel scrolls horizontaly (native, at least on my Linux)
    if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
    if (e.deltaY === 0) return;

    e.preventDefault();

    const wheelStepProp = `wheelStepSize${e.deltaMode}`;
    const distance = Math.abs(e.deltaY);
    let wheelStepSize = this[wheelStepProp];
    if (!wheelStepSize || (wheelStepSize > distance)) {
      wheelStepSize = distance;
      this[wheelStepProp] = wheelStepSize;
    }
    const wheelMoves = Math.round(e.deltaY / wheelStepSize);
    this.setState(state => ({ offset: state.offset + wheelMoves }));
    console.log('Wheeeel', wheelMoves);
  }

  render() {
    const { columns, rowsView, rows } = this.props;
    const { offset, maxRows } = this.state;
    const renderedRows = rowsView || rows.slice(offset, offset + maxRows);

    const renderHeaderCell = (column, ih) => (<th key={ih}>{column.name}</th>);

    let prevRow;
    const renderDataRow = (row, rowIndex) => {
      const renderDataCell = (col, colIndex) => {
        const value = row[colIndex];
        const joinUp = prevRow && (prevRow[colIndex] === value);
        return (
          <Value
            Container="td"
            key={colIndex}
            column={col}
            value={value}
            className={joinUp ? 'join-up' : ''}
            onClick={(e) => this.handleCellClick(e, rowIndex + offset, colIndex)}
            onWheel={this.handleWheel}
          />);
      };
      const result = (
        <tr key={rowIndex + offset}>
          {columns.map(renderDataCell)}
        </tr>
      );
      prevRow = row;
      return result;
    };

    return (
      <div className="OutputTableContainer">
        <table className="OutputTable">
          <thead>
            <tr>
              {columns.map(renderHeaderCell)}
            </tr>
          </thead>
          <tbody onClick={this.handleClick}>
            {renderedRows.map(renderDataRow)}
          </tbody>
        </table>
      </div>
    );
  }
}

// {
//   "render": "table",
//   "luid": "g.e50hzt",
//   "timing1": [
//     0,
//     2732643
//   ],
//   "columns": [
//     {
//       "name": "horse_id",
//       "tableID": 17144,
//       "columnID": 1,
//       "dataTypeID": 23,
//       "dataTypeSize": 4,
//       "dataTypeModifier": -1,
//       "format": "text"
//     },
//   ],
//   "loading": false,
//   "rowCount": 1,
//   "bytes": 127,
//   "rows": [
//     [
//       "281718",
//       "1982",
//       "Stars Lad"
//     ]
//   ],
//   "timing2": [
//     0,
//     2923906
//   ],
//   "text": "SELECT 1"
// }