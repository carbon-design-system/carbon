import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

export default class Loading extends React.Component {
  static propTypes = {
    active: PropTypes.bool,
    className: PropTypes.string,
    withOverlay: PropTypes.bool,
    small: PropTypes.bool,
  };

  static defaultProps = {
    active: true,
    withOverlay: true,
    small: false,
  };

  render() {
    const { active, className, withOverlay, small, ...other } = this.props;

    const loadingClasses = classNames('bx--loading', className, {
      'bx--loading--small': small,
      'bx--loading--stop': !active,
    });

    const loading = (
      <div {...other} className={loadingClasses}>
        <svg className="bx--loading__svg" viewBox="-75 -75 150 150">
          <circle cx="0" cy="0" r="37.5" />
        </svg>
      </div>
    );

    return withOverlay ? (
      <div className="bx--loading-overlay">{loading}</div>
    ) : (
      loading
    );
  }
}
