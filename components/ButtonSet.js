import React from 'react';
import classNames from 'classnames';
import '@console/bluemix-components/consumables/scss/base-elements/buttons/button--sets.scss';


class ButtonSet extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string,
  }

  render() {
    const {
      children,
      className,
      ...other,
    } = this.props;

    const buttonSetClasses = classNames(className, {
      'bx--sets-of-buttons': true,
    });

    return (
      <div {...other} className={buttonSetClasses}>
        {children}
      </div>
    );
  }
}

export default ButtonSet;
