import React from 'react';
import { connect } from 'react-redux';
import ReactJson from 'react-json-view'
import './Output.css';

class Output extends React.Component {

  render() {
    return (
      <div className="output">
        <ReactJson src={this.props.commands} />
      </div>
    )
  }
}

const mapState = (state) => ({
  commands: state.commands,
})

export default connect(mapState)(Output);
