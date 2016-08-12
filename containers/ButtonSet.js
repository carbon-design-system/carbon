import React from 'react';
import classNames from 'classnames';
import '@console/bluemix-components/consumables/scss/base-elements/buttons/button--sets.scss';


class ButtonSet extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string,
  }

  render() {
    const buttonSetClasses = classNames({
      'bx--sets-of-buttons': true,
    });

    return (
      <div className={buttonSetClasses}>
        {this.props.children}
      </div>
    );
  }
}

export default ButtonSet;
