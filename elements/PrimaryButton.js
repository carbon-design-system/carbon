import React from 'react';
import classNames from 'classnames';
import InternalButton from '../internal/InternalButton';
import '@console/bluemix-components/consumables/scss/base-elements/buttons/button--primary.scss';

class PrimaryButton extends React.Component {

  static propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    href: React.PropTypes.string,
    tabIndex: React.PropTypes.number,
    type: React.PropTypes.string
  }

  static defaultProps = {
    className: 'bx--btn',
    tabIndex: 0
  }

  render() {

    const buttonClasses = classNames({
      'bx--btn': true,
      [this.props.className]: this.props.className
    })

    return (
      <InternalButton {...this.props} className={buttonClasses} />
    )
  }
}

export default PrimaryButton;
