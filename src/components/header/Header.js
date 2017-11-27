import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Logo from '../Logo';

export class Header extends Component {
  static propTypes = {
    // connected: PropTypes.bool,
    // inQuery: PropTypes.bool,
    // inTransaction: PropTypes.bool,
    state: PropTypes.string.isRequired,
    conParams: PropTypes.object.isRequired,
  }

  render() {
    const { state } = this.props;
    return (
      <header className="App-header">
        <Logo className="App-logo" status={state} size={48} />
        <h1 className="App-title">psql {state}</h1>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  state: state.connectionState.state,
  conParams: state.connectionParams,
});

export default connect(mapStateToProps)(Header);
