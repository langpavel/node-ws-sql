import React from 'react';
import PropTypes from 'prop-types';
import { FormattedNumber } from 'react-intl';

import './OutputCommandComplete.css';

export default class OutputCommandComplete extends React.PureComponent {

  static propTypes = {
    text: PropTypes.string.isRequired,
    timing: PropTypes.arrayOf(PropTypes.number),
    bytes: PropTypes.number,
    rowCount: PropTypes.number,
  };

  render() {
    const { text, bytes, rowCount } = this.props;
    return (
      <div className="OutputCommandComplete">
        <span className="text">{text}</span>
        {bytes ? (
          <span className="extra">
            {' ('}
            <FormattedNumber value={bytes}>
              {value => <span className="RawBytes" title="Raw bytes sent by SQL server (table descriptor (T) + rows (D) messages)">{value} bytes</span>}
            </FormattedNumber>
            <FormattedNumber value={rowCount}>
              {value => <span className="RawBytes" title="Count of row (D) messages"> in {value} row(s)</span>}
            </FormattedNumber>
            {')'}
          </span>
        ) : null}
      </div>
    );
  }
}
