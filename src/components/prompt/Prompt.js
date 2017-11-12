import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import './Prompt.css';

class Prompt extends React.Component {

  handleChange = (e) => {
    console.log(e);
  }

  setRef = (input) => {
    if (this.input !== input) {
      this.input = input;
      input.onkeypress = (e) => {
        console.log(e);
      }
    }
  }

  handleSubmit = (e) => {
    console.log('SUBMIT!', e);
  }

  render() {
    return (
      <form className="prompt" onSubmit={this.handleSubmit}>
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

export default Prompt;
