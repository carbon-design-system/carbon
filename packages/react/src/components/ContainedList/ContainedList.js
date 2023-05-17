/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useId } from '../../internal/useId';
import { usePrefix } from '../../internal/usePrefix';

const variants = ['on-page', 'disclosed'];

function filterChildren(children) {
  if (Array.isArray(children)) {
    return children?.filter(
      (child) =>
        !['Search', 'ExpandableSearch'].includes(child?.type?.displayName)
    );
  }

  if (
    children &&
    !['Search', 'ExpandableSearch'].includes(children?.type?.displayName)
  ) {
    return children;
  }

  return null;
}

function renderChildren(children) {
  if (Array.isArray(children)) {
    children.map((child, index) => {
      if (index === 0 && child.type?.displayName === 'Search') {
        return child;
      }

      return child;
    });
  }

  if (children && children.type?.displayName === 'Search') {
    return children;
  }

  return children;
}

function ContainedList({
  action,
  children,
  className,
  isInset,
  kind = variants[0],
  label,
  size = 'lg',
}) {
  const labelId = `${useId('contained-list')}-header`;
  const prefix = usePrefix();

  const classes = classNames(
    `${prefix}--contained-list`,
    { [`${prefix}--contained-list--inset-rulers`]: isInset },
    `${prefix}--contained-list--${kind}`,
    `${prefix}--contained-list--${size}`,
    className
  );

  const filteredChildren = filterChildren(children);

  const isActionSearch = ['Search', 'ExpandableSearch'].includes(
    action?.type?.displayName
  );

  const renderedChildren = renderChildren(children);

  return (
    <div className={classes}>
      <div className={`${prefix}--contained-list__header`}>
        <div id={labelId} className={`${prefix}--contained-list__label`}>
          {label}
        </div>
        <div className={`${prefix}--contained-list__action`}>{action}</div>
      </div>
      {children && (
        <ul aria-labelledby={labelId}>
          {isActionSearch ? filteredChildren : renderedChildren}
        </ul>
      )}
    </div>
  );
}

ContainedList.propTypes = {
  /**
   * A slot for a possible interactive element to render.
   */
  action: PropTypes.node,

  /**
   * A collection of ContainedListItems to be rendered in the ContainedList
   */
  children: PropTypes.node,

  /**
   * Additional CSS class names.
   */
  className: PropTypes.string,

  /**
   * Specify whether the dividing lines in between list items should be inset.
   */
  isInset: PropTypes.bool,

  /**
   * The kind of ContainedList you want to display
   */
  kind: PropTypes.oneOf(variants),

  /**
   * A label describing the contained list.
   */
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,

  /**
   * Specify the size of the contained list.
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
};

export default ContainedList;
