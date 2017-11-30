import React from 'react';
import ReactJson from 'react-json-view'

export default class UnknownOutput extends React.PureComponent {

  render() {
    return (
      <div className="UnknownOutput">
        <ReactJson
          theme="monokai"
          src={this.props}
          name={this.props.render || 'UnknownOutput'}
          collapseStringsAfterLength={120}
          displayDataTypes={false}
          collapsed
        />
      </div>
    )
  }
}
