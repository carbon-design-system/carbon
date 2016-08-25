import React from 'react';
import classNames from 'classnames';
import '@console/bluemix-components/consumables/scss/components/card/card.scss';

class Card extends React.Component {

  static propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    tabIndex: React.PropTypes.number,
    onBlur: React.PropTypes.func,
    onClick: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onKeyDown: React.PropTypes.func,
    onKeyUp: React.PropTypes.func,
    onMouseDown: React.PropTypes.func,
    onMouseEnter: React.PropTypes.func,
    onMouseLeave: React.PropTypes.func,
    onMouseUp: React.PropTypes.func,
  }

  static defaultProps = {
    tabIndex: 0,
  }

  constructor(props) { // eslint-disable-line
    super(props);
  }

  render() {
    const {
      children,
      tabIndex,
      ...other,
    } = this.props;

    const cardClasses = classNames({
      'bx--card': true,
      [this.props.className]: this.props.className,
    });

    return (
      <div
        {...other}
        className={cardClasses}
        tabIndex={tabIndex}
      >
        {children}
      </div>
    );
  }
}

export default Card;
