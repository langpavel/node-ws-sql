import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export default class OutputSeparator extends React.PureComponent {

  static propTypes = {
    transactionState: PropTypes.string,
  };

  render() {
    const { transactionState } = this.props;
    let trClassName;

    if (transactionState) {
      trClassName = (transactionState === '?')
        ? `Separator-transaction-unknown`
        : `Separator-transaction-${transactionState}`;
    }

    return (
      <hr className={cx('OutputSeparator', trClassName)} />
    )
  }
}
