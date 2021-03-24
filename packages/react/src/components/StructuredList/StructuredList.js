/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { settings } from 'carbon-components';
import { useFocusWithin } from '../../internal/useFocusWithin';
import { useId } from '../../internal/useId';
import deprecate from '../../prop-types/deprecate';

const { prefix } = settings;

export function StructuredListWrapper(props) {
  const {
    children,
    selection,
    className,
    ariaLabel,
    border: _border,
    ...other
  } = props;
  const classes = classNames(`${prefix}--structured-list`, className, {
    [`${prefix}--structured-list--selection`]: selection,
  });

  return (
    <div role="grid" className={classes} {...other} aria-label={ariaLabel}>
      {children}
    </div>
  );
}

StructuredListWrapper.propTypes = {
  /**
   * Specify a label to be read by screen readers on the container node
   */
  ariaLabel: PropTypes.string,

  /**
   * Specify whether a border should be added to your StructuredListWrapper
   */
  border: deprecate(
    PropTypes.bool,
    `\nThe prop \`border\` will be removed in the next major version of Carbon.`
  ),

  /**
   * Provide the contents of your StructuredListWrapper
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the container node
   */
  className: PropTypes.string,

  /**
   * Specify whether your StructuredListWrapper should have selections
   */
  selection: PropTypes.bool,
};

StructuredListWrapper.defaultProps = {
  selection: false,
  ariaLabel: 'Structured list section',
};

export function StructuredListHead(props) {
  const { children, className, ...other } = props;
  const classes = classNames(`${prefix}--structured-list-thead`, className);

  return (
    <div role="rowgroup" className={classes} {...other}>
      {children}
    </div>
  );
}

StructuredListHead.propTypes = {
  /**
   * Provide the contents of your StructuredListHead
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the node
   */
  className: PropTypes.string,
};

export function StructuredListBody(props) {
  const { children, className, ...other } = props;
  const classes = classNames(`${prefix}--structured-list-tbody`, className);

  return (
    <div className={classes} role="rowgroup" {...other}>
      {children}
    </div>
  );
}

StructuredListBody.propTypes = {
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

StructuredListBody.defaultProps = {
  onKeyDown: () => {},
};

export function StructuredListRow(props) {
  const { onKeyDown, children, className, head, ...other } = props;
  const [hasFocusWithin, setHasFocusWithin] = useFocusWithin();
  const classes = classNames(`${prefix}--structured-list-row`, className, {
    [`${prefix}--structured-list-row--header-row`]: head,
    [`${prefix}--structured-list-row--focused-within`]: hasFocusWithin,
  });

  return head ? (
    <div role="row" {...other} className={classes}>
      {children}
    </div>
  ) : (
    // eslint-disable-next-line jsx-a11y/interactive-supports-focus
    <div
      {...other}
      role="row"
      className={classes}
      onFocus={() => {
        setHasFocusWithin(true);
      }}
      onBlur={() => {
        setHasFocusWithin(false);
      }}
      onKeyDown={onKeyDown}>
      {children}
    </div>
  );
}

StructuredListRow.propTypes = {
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
  label: deprecate(
    PropTypes.bool,
    `\nThe prop \`label\` will be removed in the next major version of Carbon.`
  ),

  /**
   * Provide a handler that is invoked on the key down event for the control,
   */
  onKeyDown: PropTypes.func,
};

StructuredListRow.defaultProps = {
  head: false,
  onKeyDown: () => {},
};

export function StructuredListInput(props) {
  const defaultId = useId('structureListInput');
  const {
    className,
    value,
    name = `structured-list-input-${defaultId}`,
    title,
    id,
    ...other
  } = props;
  const classes = classNames(
    `${prefix}--structured-list-input`,
    `${prefix}--visually-hidden`,
    className
  );

  return (
    <input
      {...other}
      type="radio"
      tabIndex={0}
      id={id || defaultId}
      className={classes}
      value={value}
      name={name}
      title={title}
    />
  );
}

StructuredListInput.propTypes = {
  /**
   * Specify an optional className to be applied to the input
   */
  className: PropTypes.string,

  /**
   * Specify whether the underlying input should be checked by default
   */
  defaultChecked: PropTypes.bool,

  /**
   * Specify a custom `id` for the input
   */
  id: PropTypes.string,

  /**
   * Provide a `name` for the input
   */
  name: PropTypes.string,

  /**
   * Provide an optional hook that is called each time the input is updated
   */
  onChange: PropTypes.func,

  /**
   * Provide a `title` for the input
   */
  title: PropTypes.string,

  /**
   * Specify the value of the input
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

StructuredListInput.defaultProps = {
  onChange: () => {},
  value: 'value',
  title: 'title',
};

export function StructuredListCell(props) {
  const { children, className, head, noWrap, ...other } = props;
  const classes = classNames(className, {
    [`${prefix}--structured-list-th`]: head,
    [`${prefix}--structured-list-td`]: !head,
    [`${prefix}--structured-list-content--nowrap`]: noWrap,
  });

  return head ? (
    <span className={classes} role="columnheader" {...other}>
      {children}
    </span>
  ) : (
    <div className={classes} role="cell" {...other}>
      {children}
    </div>
  );
}

StructuredListCell.propTypes = {
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

StructuredListCell.defaultProps = {
  head: false,
  noWrap: false,
};

export default {
  StructuredListWrapper,
  StructuredListHead,
  StructuredListBody,
  StructuredListRow,
  StructuredListInput,
  StructuredListCell,
};
