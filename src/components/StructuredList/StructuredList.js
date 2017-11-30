import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import uid from '../../tools/uniqueId';

export class StructuredListWrapper extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    border: PropTypes.bool,
    selection: PropTypes.bool,
  };

  static defaultProps = {
    border: false,
    selection: false,
  };

  render() {
    const { children, selection, className, border, ...other } = this.props;

    const classes = classNames('bx--structured-list', className, {
      'bx--structured-list--border': border,
      'bx--structured-list--selection': selection,
    });

    return (
      <section className={classes} {...other}>
        {children}
      </section>
    );
  }
}

export class StructuredListHead extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  };

  render() {
    const { children, className, ...other } = this.props;

    const classes = classNames('bx--structured-list-thead', className);
    return (
      <div className={classes} {...other}>
        {children}
      </div>
    );
  }
}

export class StructuredListInput extends Component {
  static propTypes = {
    className: PropTypes.string,
    id: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string,
    title: PropTypes.string,
    defaultChecked: PropTypes.bool,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    onChange: () => {},
    value: 'value',
    title: 'title',
  };

  componentWillMount() {
    this.uid = this.props.id || uid();
  }

  render() {
    const { className, value, name, title, ...other } = this.props;
    const classes = classNames('bx--structured-list-input', className);
    return (
      <input
        {...other}
        type="radio"
        tabIndex={-1}
        id={this.uid}
        className={classes}
        value={value}
        name={name}
        title={title}
      />
    );
  }
}

export class StructuredListRow extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    head: PropTypes.bool,
    label: PropTypes.bool,
    htmlFor: PropTypes.string,
    tabIndex: PropTypes.number,
    onKeyDown: PropTypes.func,
  };

  static defaultProps = {
    htmlFor: 'unique id',
    head: false,
    label: false,
    tabIndex: 0,
    onKeyDown: () => {},
  };

  render() {
    const {
      onKeyDown,
      tabIndex,
      htmlFor,
      children,
      className,
      head,
      label,
      ...other
    } = this.props;

    const classes = classNames('bx--structured-list-row', className, {
      'bx--structured-list-row--header-row': head,
    });

    return label ? (
      <label
        {...other}
        tabIndex={tabIndex}
        className={classes}
        htmlFor={htmlFor}
        onKeyDown={onKeyDown}
        role="presentation">
        {children}
      </label>
    ) : (
      <div {...other} className={classes}>
        {children}
      </div>
    );
  }
}

export class StructuredListBody extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    head: PropTypes.bool,
    onKeyDown: PropTypes.func,
  };

  static defaultProps = {
    onKeyDown: () => {},
  };

  state = {
    labelRows: null,
    rowSelected: 0,
  };

  render() {
    const { children, className, ...other } = this.props;
    const classes = classNames('bx--structured-list-tbody', className);
    return (
      <div className={classes} {...other}>
        {children}
      </div>
    );
  }
}

export class StructuredListCell extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    head: PropTypes.bool,
    noWrap: PropTypes.bool,
  };

  static defaultProps = {
    head: false,
    noWrap: false,
  };

  render() {
    const { children, className, head, noWrap, ...other } = this.props;

    const classes = classNames(className, {
      'bx--structured-list-th': head,
      'bx--structured-list-td': !head,
      'bx--structured-list-content--nowrap': noWrap,
    });

    return (
      <div className={classes} {...other}>
        {children}
      </div>
    );
  }
}
