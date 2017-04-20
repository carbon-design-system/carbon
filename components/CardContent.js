import React from 'react';
import classNames from 'classnames';
import Icon from './Icon';

const propTypes = {
  children: React.PropTypes.node,
  cardIcon: React.PropTypes.string,
  cardTitle: React.PropTypes.string,
  cardLink: React.PropTypes.node,
  cardInfo: React.PropTypes.array,
  className: React.PropTypes.string,
};

const defaultProps = {
  cardIcon: 'app-services',
};

const CardContent = ({ className, children, cardIcon, cardTitle, cardLink, cardInfo, ...other }) => {
  const cardContentClasses = classNames({
    'bx--card__card-overview': true,
    [className]: className,
  });

  const cardLinkContent = (cardLink)
  ? cardLink.map((link, key) =>
    <a key={key} href={link} className="bx--about__title--link">{link}</a>
    )
  : '';

  const cardInfoContent = (cardInfo)
  ? cardInfo.map((info, key) =>
    <h4 key={key} className="bx--about__title--additional-info">{info}</h4>
    )
  : '';

  const cardLinkContentArray = Object.keys(cardLinkContent);
  const cardInfoContentArray = Object.keys(cardInfoContent);

  return (
    <div {...other} className={cardContentClasses}>
    {children}
      <div className="bx--card-overview__about">
        <div className="bx--about__icon">
          <Icon className="bx--about__icon--img" name={cardIcon} description="About" />
        </div>
        <div className="bx--about__title">
          <p id="card-app-title" className="bx--about__title--name">{cardTitle}</p>
          {cardLinkContentArray.map((info, key) =>
            cardLinkContent[key])
          }
          {cardInfoContentArray.map((info, key) =>
            cardInfoContent[key])
          }
        </div>
      </div>
    </div>
  );
};

CardContent.propTypes = propTypes;
CardContent.defaultProps = defaultProps;

export default CardContent;
