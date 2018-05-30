import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import warning from 'warning';
import Link from '../Link';

let didWarnAboutDeprecation = false;

export class OrderSummary extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  };

  constructor(props) {
    super(props);
    if (__DEV__) {
      warning(
        didWarnAboutDeprecation,
        'Accessing the `OrderSummary` component from the ' +
          '`carbon-components-react` package is deprecated. Use the ' +
          '`carbon-addons-cloud-react` package instead.'
      );
      didWarnAboutDeprecation = true;
    }
  }

  render() {
    const { children, className, ...other } = this.props;
    const classes = classNames('bx--order-summary', className);

    return (
      <div className={classes} {...other}>
        {children}
      </div>
    );
  }
}

export class OrderSummaryHeader extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    id: PropTypes.string,
    title: PropTypes.string,
  };

  static defaultProps = {
    title: 'Order Summary',
  };

  render() {
    const {
      children,
      className,
      id = (this._sectionId =
        this._sectionId ||
        `order__summary__header__id_${Math.random()
          .toString(36)
          .substr(2)}`),
      title,
      ...other
    } = this.props;
    const classes = classNames('bx--order-header', className);

    return (
      <section className={classes} aria-labelledby={`${id}__title`} {...other}>
        <p className="bx--order-header-title" id={`${id}__title`}>
          {title}
        </p>
        {children}
      </section>
    );
  }
}

export class OrderSummaryList extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  };

  render() {
    const { children, className, ...other } = this.props;
    const classes = classNames('bx--order-list', className);

    return (
      <ul className={classes} {...other}>
        {children}
      </ul>
    );
  }
}

export class OrderSummaryCategory extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    categoryText: PropTypes.string,
  };

  static defaultProps = {
    categoryText: 'Category Label',
  };

  render() {
    const { children, className, categoryText, ...other } = this.props;
    const classes = classNames('bx--order-category', className);

    return (
      <li className={classes} {...other}>
        <p className="bx--order-category-title">{categoryText}</p>
        <ul>{children}</ul>
      </li>
    );
  }
}

export class OrderSummaryListItem extends Component {
  static propTypes = {
    className: PropTypes.string,
    text: PropTypes.string,
    price: PropTypes.string,
  };

  static defaultProps = {
    text: 'Detail 1',
    price: '--',
  };

  render() {
    const { className, text, price, ...other } = this.props;
    const classes = classNames('bx--order-item', className);

    return (
      <li className={classes} {...other}>
        <p className="bx--order-detail">{text}</p>
        <p className="bx--order-price">{price}</p>
      </li>
    );
  }
}

export class OrderSummaryTotal extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    id: PropTypes.string,
    summaryText: PropTypes.string,
    summaryPrice: PropTypes.string,
    summaryDetails: PropTypes.string,
  };

  static defaultProps = {
    summaryText: 'Total due now:',
    summaryPrice: '$0.00',
    summaryDetails: 'estimated',
  };

  render() {
    const {
      children,
      className,
      id = `order__summary__total__id_${Math.random()
        .toString(36)
        .substr(2)}`,
      summaryText,
      summaryPrice,
      summaryDetails,
      ...other
    } = this.props;
    const classes = classNames('bx--order-total-container', className);

    return (
      <section className={classes} aria-labelledby={`${id}__title`} {...other}>
        <div className="bx--order-total">
          <p className="bx--order-total-text" id={`${id}__title`}>
            {summaryText}
          </p>
          <p className="bx--order-total-price">
            {summaryPrice}
            <span>{summaryDetails}</span>
          </p>
        </div>
        {children}
      </section>
    );
  }
}

export class OrderSummaryFooter extends Component {
  static propTypes = {
    className: PropTypes.string,
    id: PropTypes.string,
    linkText: PropTypes.string,
    href: PropTypes.string,
    target: PropTypes.string,
    rel: PropTypes.string,
  };

  static defaultProps = {
    footerText: 'Need Help?',
    linkText: 'Contact Bluemix Sales',
    href: '',
    target: '_blank',
    rel: 'noreferrer noopener',
  };

  render() {
    const {
      className,
      id = (this._sectionId =
        this._sectionId ||
        `order__summary__footer__id_${Math.random()
          .toString(36)
          .substr(2)}`),
      footerText,
      linkText,
      href,
      target,
      rel,
      ...other
    } = this.props;
    const classes = classNames('bx--order-footer', className);

    return (
      <section className={classes} aria-labelledby={`${id}__title`} {...other}>
        <p className="bx--order-footer-text" id={`${id}__title`}>
          {footerText}
        </p>
        &nbsp;
        <Link href={href} target={target} rel={rel}>
          {linkText}
        </Link>
      </section>
    );
  }
}
