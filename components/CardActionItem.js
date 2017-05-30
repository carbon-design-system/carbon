import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from './Icon';
if (!process.env.EXCLUDE_SASS) {
  import('carbon-components/consumables/scss/components/card/card.scss');
}

const propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  ariaLabel: PropTypes.string,
  iconName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

const CardActionItem = ({ className, id, ariaLabel, iconName, description, ...other }) => {
  const cardActionItemClasses = classNames({
    'bx--app-actions__button': true,
    [className]: className,
  });

  return (
    <button
      {...other}
      className={cardActionItemClasses}
      id={id}
      aria-label={ariaLabel}
    >
      <Icon
        className="bx--app-actions__button--icon"
        name={iconName}
        description={description}
      />
    </button>
  );
};

CardActionItem.propTypes = propTypes;

export default CardActionItem;
