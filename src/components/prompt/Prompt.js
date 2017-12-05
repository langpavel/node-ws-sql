import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import TextareaAutosize from 'react-textarea-autosize';
import AceEditor from './AceEditor';
import sendCommand from '../../redux/actions/sendCommand';
import './Prompt.css';

class Prompt extends React.Component {

  static propTypes = {
    connectionWord: PropTypes.string,
  }

  handleChange = (e) => {
    console.log(e);
  }

  setRef = (editor) => {
    if (this.editor !== editor) {
      this.editor = editor;
      // input.onkeypress = (e) => {
      //   if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      //     this.send();
      //   }
      // }
    }
  }

  send = (e) => {
    if (e) e.preventDefault();
    this.props.sendCommand(this.editor.getValue());
    this.editor.setValue('');
    this.editor.focus();
  }

  render() {
    const { connectionWord, sendCommand } = this.props;
    return (
      <form className={`Prompt PromptInState${connectionWord}`} onSubmit={this.send}>
        <AceEditor
          ref={this.setRef}
          autoFocus
          className="PromptEditor"
          defaultValue="\connect"
          onExecute={sendCommand}
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
  sendCommand,
});

export default connect(mapState, mapDispatch)(Prompt);
