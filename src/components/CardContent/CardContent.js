import PropTypes from 'prop-types';
import React from 'react';
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

  return (
    <div {...other} className={cardContentClasses}>
      {children}
      <div className="bx--card-overview__about">
        <div className="bx--about__icon">
          <Icon
            className="bx--about__icon--img"
            name={cardIcon}
            description={iconDescription}
          />
        </div>
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
  children: PropTypes.node,
  cardIcon: PropTypes.string,
  cardTitle: PropTypes.string,
  cardLink: PropTypes.node,
  cardInfo: PropTypes.array,
  className: PropTypes.string,
  iconDescription: PropTypes.string,
};

CardContent.defaultProps = {
  iconDescription: 'card icon',
  cardIcon: 'app-services',
  cardTitle: 'card title',
};

export default CardContent;
