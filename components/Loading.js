import React from 'react';
import classNames from 'classnames';
import '@console/bluemix-components/consumables/scss/components/loading/loading.scss';

class Loading extends React.Component {

  static propTypes = {
    active: React.PropTypes.bool,
    className: React.PropTypes.string,
  }

  static defaultProps = {
    active: true,
  }

  state = {
    active: this.props.active,
    isIE: (window.ActiveXObject || 'ActiveXObject' in window),
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.active !== this.props.active) {
      this.setState({ active: nextProps.active });
    }
  }

  render() {
    const {
      className,
      active,
      ...other,
    } = this.props;

    let classToAdd;

    if (this.state.isIE) {
      classToAdd = active ? 'bx--loading--ie' : 'bx--loading--ie bx--loading--stop--ie';
    } else {
      classToAdd = active ? 'bx--loading' : 'bx--loading bx--loading--stop';
    }

    const loadingClasses = classNames(
      classToAdd,
      className
    );

    return (
      <div {...other} className={loadingClasses}>
        <svg className="bx--loading__svg" viewBox="-75 -75 150 150">
          <circle cx="0" cy="0" r="37.5" />
        </svg>
      </div>
    );
  }
}

export default Loading;
