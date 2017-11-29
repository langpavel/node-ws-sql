import React from 'react';
import { connect } from 'react-redux';
import OutputListItem from './OutputListItem';

class OutputList extends React.Component {

  render() {
    return (
      <div className="OutputList">
        {this.props.outputList.map((thing) => <div key={thing.luid}>{JSON.stringify(thing, null, 2)}</div>)}
      </div>
    );
  }
}

const mapState = (state) => ({
  outputList: state.output.list,
});

export default connect(mapState)(OutputList);
