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
    detail: PropTypes.string,
    hint: PropTypes.string,
    severity: PropTypes.string,
    code: PropTypes.string,
    position: PropTypes.string,
    where: PropTypes.string,
    file: PropTypes.string,
    line: PropTypes.string,
    routine: PropTypes.string,
  };
  
  render() {
    const {
      T, luid,
      render,
      message,
      severity,
      code,
      file,
      line,
      routine,
      ...other,
    } = this.props;
    const { errorClass, conditionName } = getErrorDescription(code);
    return (
      <div className={`OutputError OutputError-render-${render} OutputError-severity-${severity}`}>
        <span className="code" title={`${conditionName} (${errorClass})`}>{severity}: {code}:</span>
        {' '}
        <span className="message">{message}</span>
        {Object.keys(other).map(key => <div key={key} className={key}>{key.toUpperCase()}: {other[key]}</div>)}
        <span className="error-source">
          {routine}
          {', '}
          {file}
          {':'}
          {line}
        </span>
      </div>
    )
  }
}
