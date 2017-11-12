import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { connect } from 'react-redux';
import sendCommand from '../../redux/actions/sendCommand';
import './Prompt.css';

class Prompt extends React.Component {

  handleChange = (e) => {
    console.log(e);
  }

  setRef = (input) => {
    if (this.input !== input) {
      this.input = input;
      input.onkeypress = (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
          this.send();
        }
      }
    }
  }

  send = (e) => {
    if (e) e.preventDefault();
    this.props.sendCommand(this.input.value);
    this.input.value = '';
  }

  render() {
    return (
      <form className="prompt" onSubmit={this.send}>
        <TextareaAutosize
          defaultValue="\connect"
          inputRef={this.setRef}
          minRows={3}
          maxRows={40}
          useCacheForDOMMeasurements
        />
        <button className="execButton">Execute</button>
      </form>
    )
  }
}

const mapState = (state) => ({

});
const mapDispatch = ({
  sendCommand
})

export default connect(mapState, mapDispatch)(Prompt);
