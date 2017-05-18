import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
if (!process.env.EXCLUDE_SASS) {
  import('@console/bluemix-components/consumables/scss/base-elements/buttons/button--sets.scss');
}


class ButtonSet extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
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
