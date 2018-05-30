import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import Icon from '../Icon';
import warning from 'warning';

let didWarnAboutDeprecation = false;

const CardActionItem = ({
  className,
  id,
  ariaLabel,
  iconName,
  description,
  ...other
}) => {
  if (__DEV__) {
    warning(
      didWarnAboutDeprecation,
      'Accessing the `CardActionItem` component from the ' +
        '`carbon-components-react` package is deprecated. Use the ' +
        '`carbon-addons-cloud-react` package instead.'
    );
    didWarnAboutDeprecation = true;
  }
  const cardActionItemClasses = classNames({
    'bx--app-actions__button': true,
    [className]: className,
  });

  return (
    <button
      {...other}
      className={cardActionItemClasses}
      id={id}
      aria-label={ariaLabel}>
      <Icon
        className="bx--app-actions__button--icon"
        name={iconName}
        description={description}
      />
    </button>
  );
};

CardActionItem.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  ariaLabel: PropTypes.string,
  iconName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

CardActionItem.defaultProps = {
  ariaLabel: '',
  description: 'card action',
};

export default CardActionItem;
