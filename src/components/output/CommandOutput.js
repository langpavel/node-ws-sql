import React from 'react';
import PropTypes from 'prop-types';

import './CommandOutput.css';

export default class CommandOutput extends React.PureComponent {

  static propTypes = {
    cmd: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div className="CommandOutput">
        <code>
          <pre>{this.props.cmd}</pre>
        </code>
      </div>
    )
  }
}
