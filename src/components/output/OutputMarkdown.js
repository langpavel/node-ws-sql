import React from 'react';
import PropTypes from 'prop-types';
// https://github.com/alexkuz/markdown-react-js
import MDReactComponent from 'markdown-react-js';

const TAGS = {
  html: 'div',
};

export default class OutputMarkdown extends React.PureComponent {
  static propTypes = {
    md: PropTypes.string.isRequired,
  };

  render() {
    return (
      <MDReactComponent
        className="OutputMarkdown md"
        text={this.props.md}
        tags={TAGS}
      />
    );
  }
}
