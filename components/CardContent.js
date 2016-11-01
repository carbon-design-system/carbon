import React from 'react';
import classNames from 'classnames';
import SecondaryButton from '../elements/SecondaryButton';
import Icon from '../elements/Icon';
import '@console/bluemix-components/consumables/scss/components/card/card.scss';

const propTypes = {
  children: React.PropTypes.node,
  cardIcon: React.PropTypes.string,
  cardTitle: React.PropTypes.string,
  cardLink: React.PropTypes.node,
  cardInfo: React.PropTypes.array,
  className: React.PropTypes.string,
  fullSize: React.PropTypes.bool,
  amount: React.PropTypes.string,
  desc: React.PropTypes.string,
  buttonText: React.PropTypes.string,
};

const defaultProps = {
  cardIcon: 'default',
  fullSize: false,
};

const CardContent = ({ className, children, cardIcon, cardTitle, cardLink, cardInfo, fullSize, desc, amount, buttonText }) => {
  const cardContentClasses = classNames({
    'bx--card__card-overview': !fullSize,
    'bx--card--quota__overview': fullSize,
    [className]: className,
  });

  const cardLinkContent = (cardLink)
  ? cardLink.map((link, key) =>
    <a key={key} href={link} className="bx--about__title--link">{link}</a>
    )
  : '';

  const cardInfoContent = (cardInfo)
  ? cardInfo.map((info, key) =>
    <p key={key} className="bx--about__title--additional-info">{info}</p>
    )
  : '';

  const cardLinkContentArray = Object.keys(cardLinkContent);
  const cardInfoContentArray = Object.keys(cardInfoContent);

  const cardContent = (fullSize)
  ? (
    <div className={cardContentClasses}>
      <p className="bx--overview__description">
        <span className="bx--overview__main-number">{amount}</span>
        <br />
        {desc}
      </p>
      <SecondaryButton className="bx--overview__details-button">{buttonText}</SecondaryButton>
    </div>
    )
  : (
    <div className={cardContentClasses}>
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

  return cardContent;
};

CardContent.propTypes = propTypes;
CardContent.defaultProps = defaultProps;

export default CardContent;
