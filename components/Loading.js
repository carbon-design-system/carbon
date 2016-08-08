import React from 'react';
import classNames from 'classnames';
import '@console/bluemix-components/consumables/scss/components/loading/loading.scss';

class Loading extends React.Component {

  static propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    onBlur: React.PropTypes.func,
    onClick: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onKeyDown: React.PropTypes.func,
    onKeyUp: React.PropTypes.func,
    onMouseDown: React.PropTypes.func,
    onMouseEnter: React.PropTypes.func,
    onMouseLeave: React.PropTypes.func,
    onMouseUp: React.PropTypes.func,
    handleClick: React.PropTypes.func,
  }

  render() {
    const {
      ...other,
    } = this.props;

    const loadingClasses = classNames({
      'bx--loading': true,
      [this.props.className]: this.props.className,
    });

    const loading = (
      <div {...other} data-loading className={loadingClasses}>
        <svg className="bx--loading__svg" viewBox="-75 -75 150 150">
          <circle cx="0" cy="0" r="37.5" />
        </svg>
      </div>
    );

    return loading;
  }
}

export default Loading;
