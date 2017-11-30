import React from 'react';
import PropTypes from 'prop-types';

export default class OutputText extends React.PureComponent {
  static propTypes = {
    text: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div className="OutputText">{this.props.text}</div>
    )
  }
}
