import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from './Button';
import Icon from './Icon';
if (!process.env.EXCLUDE_SASS) {
  import('carbon-components/consumables/scss/components/card/card.scss');
}

const propTypes = {
  children: PropTypes.node,
  cardIcon: PropTypes.string,
  cardTitle: PropTypes.string,
  cardLink: PropTypes.node,
  cardInfo: PropTypes.array,
  className: PropTypes.string,
  fullSize: PropTypes.bool,
  amount: PropTypes.string,
  desc: PropTypes.string,
  buttonText: PropTypes.string,
};

const defaultProps = {
  cardIcon: 'app-services',
  fullSize: false,
};

const CardContent = ({ className, children, cardIcon, cardTitle, cardLink, cardInfo, fullSize, desc,
                       amount, buttonText, ...other }) => {
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
    <div {...other} className={cardContentClasses}>
      <p className="bx--overview__description">
        <span className="bx--overview__main-number">{amount}</span>
        <br />
        {desc}
      </p>
      <Button kind="secondary" className="bx--overview__details-button">{buttonText}</Button>
    </div>
    )
  : (
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

  return cardContent;
};

CardContent.propTypes = propTypes;
CardContent.defaultProps = defaultProps;

export default CardContent;
