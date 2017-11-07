import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Link from '../Link';

export class OrderSummary extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  };

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
    title: PropTypes.string,
  };

  static defaultProps = {
    title: 'Order Summary',
  };

  render() {
    const { children, className, title, ...other } = this.props;
    const classes = classNames('bx--order-header', className);

    return (
      <section className={classes} {...other}>
        <p className="bx--order-header-title">{title}</p>
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
      summaryText,
      summaryPrice,
      summaryDetails,
      ...other
    } = this.props;
    const classes = classNames('bx--order-total-container', className);

    return (
      <section className={classes} {...other}>
        <div className="bx--order-total">
          <p className="bx--order-total-text">{summaryText}</p>
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
      footerText,
      linkText,
      href,
      target,
      rel,
      ...other
    } = this.props;
    const classes = classNames('bx--order-footer', className);

    return (
      <section className={classes} {...other}>
        <p className="bx--order-footer-text">{footerText}</p>
        &nbsp;
        <Link href={href} target={target} rel={rel}>
          {linkText}
        </Link>
      </section>
    );
  }
}
