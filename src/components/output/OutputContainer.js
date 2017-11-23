import React from 'react';
import { connect } from 'react-redux';
import Command from './Command';
import './OutputContainer.css';

class OutputContainer extends React.Component {

  render() {
    return (
      <div className="OutputContainer">
        {this.props.commandList.map((command) => <Command key={command.cid} {...command} />)}
      </div>
    );
  }
}

const mapState = (state) => ({
  commandList: state.commandList,
});

export default connect(mapState)(OutputContainer);
