/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { settings } from 'carbon-components';
import uid from '../../tools/uniqueId';

const { prefix } = settings;

export class StructuredListWrapper extends Component {
  static propTypes = {
    /**
     * Provide the contents of your StructuredListWrapper
     */
    children: PropTypes.node,

    /**
     * Specify an optional className to be applied to the container node
     */
    className: PropTypes.string,

    /**
     * Specify whether a border should be added to your StructuredListWrapper
     */
    border: PropTypes.bool,

    /**
     * Specify whether your StructuredListWrapper should have selections
     */
    selection: PropTypes.bool,

    /**
     * Specify a label to be read by screen readers on the container node
     */
    ariaLabel: PropTypes.string,
  };

  static defaultProps = {
    border: false,
    selection: false,
    ariaLabel: 'Structured list section',
  };

  render() {
    const {
      children,
      selection,
      className,
      border,
      ariaLabel,
      ...other
    } = this.props;

    const classes = classNames(`${prefix}--structured-list`, className, {
      [`${prefix}--structured-list--border`]: border,
      [`${prefix}--structured-list--selection`]: selection,
    });

    return (
      <section className={classes} {...other} aria-label={ariaLabel}>
        {children}
      </section>
    );
  }
}

export class StructuredListHead extends Component {
  static propTypes = {
    /**
     * Provide the contents of your StructuredListHead
     */
    children: PropTypes.node,

    /**
     * Specify an optional className to be applied to the node
     */
    className: PropTypes.string,
  };

  render() {
    const { children, className, ...other } = this.props;

    const classes = classNames(`${prefix}--structured-list-thead`, className);
    return (
      <div className={classes} {...other}>
        {children}
      </div>
    );
  }
}

export class StructuredListInput extends Component {
  static propTypes = {
    /**
     * Specify an optional className to be applied to the input
     */
    className: PropTypes.string,

    /**
     * Specify a custom `id` for the input
     */
    id: PropTypes.string,

    /**
     * Specify the value of the input
     */
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,

    /**
     * Provide a `name` for the input
     */
    name: PropTypes.string,

    /**
     * Provide a `title` for the input
     */
    title: PropTypes.string,

    /**
     * Specify whether the underlying input should be checked by default
     */
    defaultChecked: PropTypes.bool,

    /**
     * Provide an optional hook that is called each time the input is updated
     */
    onChange: PropTypes.func,
  };

  static defaultProps = {
    onChange: () => {},
    value: 'value',
    title: 'title',
  };

  UNSAFE_componentWillMount() {
    this.uid = this.props.id || uid();
  }

  render() {
    const { className, value, name, title, ...other } = this.props;
    const classes = classNames(`${prefix}--structured-list-input`, className);
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
    /**
     * Provide the contents of your StructuredListRow
     */
    children: PropTypes.node,

    /**
     * Specify an optional className to be applied to the container node
     */
    className: PropTypes.string,

    /**
     * Specify whether your StructuredListRow should be used as a header row
     */
    head: PropTypes.bool,

    /**
     * Specify whether a `<label>` should be used
     */
    label: PropTypes.bool,

    /**
     * Specify the tab index of the container node, if `<label>` is in use
     */
    tabIndex: PropTypes.number,

    /**
     * Provide a handler that is invoked on the key down event for the control,
     * if `<label>` is in use
     */
    onKeyDown: PropTypes.func,
  };

  static defaultProps = {
    head: false,
    label: false,
    tabIndex: 0,
    onKeyDown: () => {},
  };

  render() {
    const {
      onKeyDown,
      tabIndex,
      children,
      className,
      head,
      label,
      ...other
    } = this.props;

    const classes = classNames(`${prefix}--structured-list-row`, className, {
      [`${prefix}--structured-list-row--header-row`]: head,
    });

    return label ? (
      <label
        {...other}
        tabIndex={tabIndex}
        className={classes}
        onKeyDown={onKeyDown}
        role="presentation" // eslint-disable-line jsx-a11y/no-interactive-element-to-noninteractive-role
      >
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
    /**
     * Provide the contents of your StructuredListBody
     */
    children: PropTypes.node,

    /**
     * Specify an optional className to be applied to the container node
     */
    className: PropTypes.string,

    head: PropTypes.bool,

    /**
     * Provide a handler that is invoked on the key down event for the control
     */
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
    const classes = classNames(`${prefix}--structured-list-tbody`, className);
    return (
      <div className={classes} {...other}>
        {children}
      </div>
    );
  }
}

export class StructuredListCell extends Component {
  static propTypes = {
    /**
     * Provide the contents of your StructuredListCell
     */
    children: PropTypes.node,

    /**
     * Specify an optional className to be applied to the container node
     */
    className: PropTypes.string,

    /**
     * Specify whether your StructuredListCell should be used as a header cell
     */
    head: PropTypes.bool,

    /**
     * Specify whether your StructuredListCell should have text wrapping
     */
    noWrap: PropTypes.bool,
  };

  static defaultProps = {
    head: false,
    noWrap: false,
  };

  render() {
    const { children, className, head, noWrap, ...other } = this.props;

    const classes = classNames(className, {
      [`${prefix}--structured-list-th`]: head,
      [`${prefix}--structured-list-td`]: !head,
      [`${prefix}--structured-list-content--nowrap`]: noWrap,
    });

    return (
      <div className={classes} {...other}>
        {children}
      </div>
    );
  }
}
