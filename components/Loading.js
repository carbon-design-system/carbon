import React from 'react';
import classNames from 'classnames';

class Loading extends React.Component {
  static propTypes = {
    active: React.PropTypes.bool,
    className: React.PropTypes.string,
    withOverlay: React.PropTypes.bool,
    small: React.PropTypes.bool,
  };

  static defaultProps = {
    active: true,
    withOverlay: true,
    small: false,
  };

  render() {
    const {
      active,
      className,
      withOverlay,
      small,
      ...other
    } = this.props;

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

    return withOverlay
      ? <div className="bx--loading-overlay">
          {loading}
        </div>
      : loading;
  }
}

export default Loading;
