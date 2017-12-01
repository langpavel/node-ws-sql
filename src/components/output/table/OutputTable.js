import React from 'react';
import PropTypes from 'prop-types';

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
    rows: PropTypes.array,
  };

  // Like every component, remember...
  shouldComponentUpdate() {
    return true;
  }

  render() {
    const { columns, rows } = this.props;
    return (
      <div className="OutputTableContainer">
        <table className="OutputTable">
          <thead>
            <tr>
              {
                columns.map((column, ix) => (
                  <th key={ix}>{column.name}</th>
                ))
              }
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) =>
              <tr key={ri}>
                {row.map((colValue, rci) => (
                  <td key={rci}>{colValue}</td>
                ))}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
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
//     {
//       "name": "born_year",
//       "tableID": 17144,
//       "columnID": 6,
//       "dataTypeID": 21,
//       "dataTypeSize": 2,
//       "dataTypeModifier": -1,
//       "format": "text"
//     },
//     {
//       "name": "horse_name",
//       "tableID": 17144,
//       "columnID": 4,
//       "dataTypeID": 25,
//       "dataTypeSize": -1,
//       "dataTypeModifier": -1,
//       "format": "text"
//     }
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