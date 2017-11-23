import React from 'react';
import PropTypes from 'prop-types';
import CommandOutput from './CommandOutput';
import './Command.css';

class Command extends React.Component {

  static propTypes = {
    cid: PropTypes.string.isRequired,
    cmd: PropTypes.string.isRequired,
  };

  render() {
    const { cid, cmd } = this.props;
    return (
      <div className="Command">
        <code>{cmd}</code>
        <CommandOutput cid={cid} />
      </div>
    )
  }
}

export default Command;
