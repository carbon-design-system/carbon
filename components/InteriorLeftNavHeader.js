import React, { PropTypes } from 'react';
import Link from './Link';
import Icon from './Icon';
import classnames from 'classnames';
import '@console/bluemix-components/consumables/scss/components/inline-left-nav/inline-left-nav.scss';

const propTypes = {
  previousPageText: PropTypes.string,
  previousPageHref: PropTypes.string,
  iconDescription: PropTypes.string,
  className: PropTypes.string,
};

const defaultProps = {
  previousPageHref: '#',
  iconDescription: 'go to previous page',
};

const InteriorLeftNavHeader = ({ previousPageText, previousPageHref, iconDescription, className, ...other }) => {
  const classNames = classnames(
    'bx--inline-left-nav__header',
    className
  );
  return (
    <div className={classNames} {...other}>
      <Link
        href={previousPageHref}
        className="bx--inline-left-nav__header--link"
      >
        <Icon
          name="arrow--left"
          description={iconDescription}
          className="bx--inline-left-nav__icon"
        />
        {previousPageText}
      </Link>
    </div>
  );
};

InteriorLeftNavHeader.propTypes = propTypes;
InteriorLeftNavHeader.defaultProps = defaultProps;

export default InteriorLeftNavHeader;
