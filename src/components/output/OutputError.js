import React from 'react';
import PropTypes from 'prop-types';
import getErrorDescription from '../../lib/pg-error-codes';

import './OutputError.css';

// used for Error and Notice
export default class OutputError extends React.PureComponent {
  static propTypes = {
    luid: PropTypes.string,
    render: PropTypes.string,
    message: PropTypes.string.isRequired,
    severity: PropTypes.string,
    code: PropTypes.string,
    position: PropTypes.string,
    file: PropTypes.string,
    line: PropTypes.string,
    routine: PropTypes.string,
  };

  render() {
    const {
      render,
      message,
      severity,
      code,
      position,
      file,
      line,
      routine,
    } = this.props;
    const { errorClass, conditionName } = getErrorDescription(code);
    return (
      <div className={`OutputError OutputError-render-${render} OutputError-severity-${severity}`}>
        <span className="code" title={`${conditionName} (${errorClass})`}>{severity} {code}</span>
        {' '}
        <span className="message">{message}</span>
        {' '}
        <span className="error-source">
          {routine}
          {' in '}
          {file}
          {' at line '}
          {line}
        </span>
      </div>
    )
  }
}
