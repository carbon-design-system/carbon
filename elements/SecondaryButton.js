import React from 'react';
import classNames from 'classnames';
import InternalButton from '../internal/InternalButton';
import '@console/bluemix-components/consumables/scss/base-elements/buttons/button--secondary.scss';

class SecondaryButton extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string,
  }

  render() {
    const buttonClasses = classNames({
      'bx--btn--secondary': true,
      [this.props.className]: this.props.className,
    });

    return (
      <InternalButton {...this.props} className={buttonClasses} />
    );
  }
}

export default SecondaryButton;
