import React from 'react';
import PropTypes from 'prop-types';
import TextareaAutosize from 'react-textarea-autosize';
import { connect } from 'react-redux';
import sendCommand from '../../redux/actions/sendCommand';
import './Prompt.css';

class Prompt extends React.Component {

  static propTypes = {
    connectionWord: PropTypes.string.isRequired,
  }

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
    const { connectionWord } = this.props;
    return (
      <form className={`Prompt PromptInState${connectionWord}`} onSubmit={this.send}>
        <TextareaAutosize
          defaultValue="\connect"
          inputRef={this.setRef}
          minRows={3}
          maxRows={40}
          useCacheForDOMMeasurements
        />
        <button className="ExecButton">Execute</button>
      </form>
    )
  }
}

const mapState = (state) => ({
  connectionWord: state.connectionState.kword,
});
const mapDispatch = ({
  sendCommand
})

export default connect(mapState, mapDispatch)(Prompt);
