import React, { PropTypes } from 'react';
import Icon from '../elements/Icon';
import '@console/bluemix-components/consumables/scss/components/detail-page-header/detail-page-header--no-tabs.scss';
import '@console/bluemix-components/consumables/scss/components/detail-page-header/detail-page-header--with-tabs.scss';

const propTypes = {
  breadcrumbTitle: PropTypes.string,
  children: PropTypes.node,
  onBackLinkClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

const defaultProps = {
  breadcrumbTitle: 'back',
};

const DetailPageHeader = ({
  breadcrumbTitle,
  children,
  onBackLinkClick,
  title,
  ...other,
}) => {
  const hasChildren = React.Children.count(children) > 0;

  if (hasChildren) {
    return (
      <header
        {...other}
        className="bx--detail-page-header--with-tabs"
      >
        <div className="bx--detail-page-header--with-tabs__container">
          <div className="bx--detail-page-header--with-tabs__breadcrumb">
            <a href="#" className="bx--detail-page-header--with-tabs__link-wrapper" onClick={onBackLinkClick}>
              <Icon description={breadcrumbTitle} name="back" className="bx--detail-page-header--with-tabs__arrow" />
              <p className="bx--detail-page-header--with-tabs__breadcrumb-title">{breadcrumbTitle}</p>
            </a>
          </div>
          <div className="bx--detail-page-header--with-tabs__info">
            <p className="bx--detail-page-header--with-tabs__info-title">{title}</p>
          </div>
        </div>
        <div className="bx--detail-page-header--with-tabs__tabs-container">{children}</div>
      </header>
    );
  }

  return (
    <header
      {...other}
      className="bx--detail-page-header--no-tabs"
    >
      <a href="#" className="bx--detail-page-header--no-tabs__link-wrapper" onClick={onBackLinkClick}>
        <Icon description={breadcrumbTitle} name="back" className="bx--detail-page-header--no-tabs__arrow" />
        <p className="bx--detail-page-header--no-tabs__link-text">{breadcrumbTitle}</p>
      </a>
      <p className="bx--detail-page-header--no-tabs__info-title">{title}</p>
    </header>
  );
};

DetailPageHeader.propTypes = propTypes;
DetailPageHeader.defaultProps = defaultProps;

export default DetailPageHeader;
