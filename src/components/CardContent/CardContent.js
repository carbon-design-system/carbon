import warning from 'warning';
import PropTypes from 'prop-types';
import React, { isValidElement } from 'react';
import classNames from 'classnames';
import Icon from '../Icon';

const CardContent = ({
  className,
  children,
  cardIcon,
  cardTitle,
  cardLink,
  cardInfo,
  iconDescription,
  ...other
}) => {
  const cardContentClasses = classNames({
    'bx--card__card-overview': true,
    [className]: className,
  });

  const cardLinkContent = cardLink
    ? cardLink.map((link, key) => (
        <a key={key} href={link} className="bx--about__title--link">
          {link}
        </a>
      ))
    : '';

  const cardInfoContent = cardInfo
    ? cardInfo.map((info, key) => (
        <h4 key={key} className="bx--about__title--additional-info">
          {info}
        </h4>
      ))
    : '';

  const cardLinkContentArray = Object.keys(cardLinkContent);
  const cardInfoContentArray = Object.keys(cardInfoContent);

  warning(
    !isValidElement(cardIcon) ||
      iconDescription === CardContent.defaultProps.iconDescription,
    "Specified a custom icon while the icon description is provided.\nIt'll be ignored as an icon description is only used for carbon-icons sprite."
  );

  return (
    <div {...other} className={cardContentClasses}>
      {children}
      <div className="bx--card-overview__about">
        {cardIcon && (
          <div className="bx--about__icon">
            {isValidElement(cardIcon) ? (
              cardIcon
            ) : (
              <Icon
                className="bx--about__icon--img"
                name={cardIcon}
                description={iconDescription}
              />
            )}
          </div>
        )}
        <div className="bx--about__title">
          <p id="card-app-title" className="bx--about__title--name">
            {cardTitle}
          </p>
          {cardLinkContentArray.map((info, key) => cardLinkContent[key])}
          {cardInfoContentArray.map((info, key) => cardInfoContent[key])}
        </div>
      </div>
    </div>
  );
};

CardContent.propTypes = {
  /**
   * The child nodes.
   */
  children: PropTypes.node,

  /**
   * The name of icon sprite, or icon itself.
   */
  cardIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),

  /**
   * The title of the card.
   */
  cardTitle: PropTypes.string,

  /**
   * A link to put in the card.
   */
  cardLink: PropTypes.node,

  /**
   * Additional info to put in the card.
   */
  cardInfo: PropTypes.array,

  /**
   * The CSS class names.
   */
  className: PropTypes.string,

  /**
   * The description of the icon.
   */
  iconDescription: PropTypes.string,
};

CardContent.defaultProps = {
  iconDescription: 'card icon',
  cardIcon: 'app-services',
  cardTitle: 'card title',
};

export default CardContent;
