import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './Logo.css';

class Logo extends React.PureComponent {

  static propTypes = {
    size: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    status: PropTypes.string,
  }

  static defaultProps = {
    status: 'Unknown',
  };

  render() {
    const { status, arrowColor, arrowStroke, size, width, height, ...svgRestProps } = this.props;
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"
        width={width || size || 48}
        height={height || size || 48}
        {...svgRestProps}
        className={cx('Logo', svgRestProps.className, status && `Logo-${status}`)}
      >
        <g className="Logo-slony">
          <path className="Logo-slony-ears" d="M67.6 2.5c-15 0-19.5 8.7-19 8.5 0 0-6.6-7.2-28.2-7.2C11 3.8 1.4 8 2 25.8c.5 7 10.4 54 22.2 40 4.3-5.3 8.2-9.4 8.2-9.4l43.6 1C88 40 93.5 24 88 12.4c-5.4-9-13.5-10-20.4-10z" />
          <g className="Logo-slony-head">
            <path d="M65 60.6c.3 2.6 11.8 3.6 15.8 1.6 5-2.2 8-6.2 3-5.2-11.2 2.3-14-3.2-14-3.2-4.2-2.2-4.7 6.8-4.7 6.8z" />
            <path d="M44.5 1.5c-21.8-.4-21 26.8-21 26.8L36 57l6.2 3.6c-.3 11 0 22.2 1 25 1.2 2.6 3.5 8 11.5 6.2 6.7-1.4 9-4.2 10.2-10.3l2-19.8s1.4-10.7.5-13C66.2 45.4 49 20.3 72.3 24c1-.2-6-22.2-27.8-22.5z" />
            <path d="M36 58c-3 3.3-2 4-8.2 5-6 1.4-2.5 3.6 0 4.2 2.7.7 9.3 1.7 13.8-4.5 1.4-2 0-5-2-5.7-.8-.4-2-1-3.5 1z" />
            <path d="M36 57.8c-.4-2 .5-4.4 1.6-7 1.5-4.3 5-8.5 2.2-21.7-2-9-16.4-2-16.4 0s.6 7-.4 13c-1 8 6 15 13 15" />
            <path className="Logo-slony-eyes" d="M32.5 28.2c0 .4.8 1.7 2 1.8 1 .2 2-.8 2.2-1.2 0-.5-.8-1-2-1.2-1.2-.2-2.2 0-2.2.5zM66 27c-1.3 0-2.2 1-2 1 0 1 1 1.8 2.4 1.4 1.4-.6 1.8-1 1.6-1.3 0-1-1-1-2-1z" />
            <path d="M72.3 24c.2 3.7-.7 6-1 10 0 5.5 1 13-3.4 19.3" />
          </g>
        </g>
        {status ? <path className="Logo-arrow" d="M76.7 37L66 47.8l30 29.8-30 29.8L76.8 118 117 77.4z" /> : null }
      </svg>
    );
  }
}

export default Logo;
