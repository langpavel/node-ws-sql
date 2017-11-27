import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactJson from 'react-json-view'

export default class OutputListItem extends React.Component {

  static propTypes = {
    cid: PropTypes.string.isRequired,
    responses: PropTypes.arrayOf(PropTypes.shape({
      T: PropTypes.string,
    })),
  };

  render() {
    return (
      <div className="CommandOutput">
        <ReactJson
          src={this.props.responses}
          name="Responses"
          collapseStringsAfterLength={120}
          displayDataTypes={false}
          collapsed
        />
      </div>
    )
  }
}

// const mapState = (state, props) => {
//   const cid = props.cid;
//   return {
//     responses: state.commands[cid],
//   };
// };
// 
// export default connect(mapState)(CommandOutput);
