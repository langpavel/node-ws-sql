import React from 'react';
import { connect } from 'react-redux';
import UnknownOutput from './UnknownOutput';
import CommandOutput from './CommandOutput';
import OutputCommandComplete from './OutputCommandComplete';
import OutputTable from './table/OutputTable';
import OutputText from './OutputText';
import OutputMarkdown from './OutputMarkdown';
import OutputError from './OutputError';
import OutputSeparator from './OutputSeparator';

import './Output.css';

// For each item match rendered
const renderers = {
  command: CommandOutput,
  commandComplete: OutputCommandComplete,
  table: OutputTable,
  text: OutputText,
  md: OutputMarkdown,
  notice: OutputError,
  error: OutputError,
  separator: OutputSeparator,
};

class Output extends React.Component {
  render() {
    return (
      <div className="Output">
        {this.props.outputList.map((item) => {
          const Renderer = renderers[item.render] || UnknownOutput;
          return <Renderer key={item.luid} {...item} />;
        })}
      </div>
    );
  }
}

const mapState = (state) => ({
  outputList: state.output.list,
});

export default connect(mapState)(Output);
