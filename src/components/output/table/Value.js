import React from 'react';
import PropTypes from 'prop-types';

import './Value.css';

export default function Value({ Container='span', className='', value, column, ...rest }) {
  if (value === null) {
    return <Container {...rest} className={`${className} Value null`} />;
  }
  return <Container {...rest} className={className}>{value}</Container>;
}

Value.propTypes = {
  Container: PropTypes.PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  className: PropTypes.string,
  value: PropTypes.any,
  column: PropTypes.shape({
    name: PropTypes.string,               // "horse_id",
    tableID: PropTypes.number,            // 17144,
    columnID: PropTypes.number,           // 1,
    dataTypeID: PropTypes.number,         // 23,
    dataTypeSize: PropTypes.number,       // 4,
    dataTypeModifier: PropTypes.number,   // -1,
  }),
};
