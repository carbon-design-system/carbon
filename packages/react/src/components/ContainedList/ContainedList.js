/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { LayoutConstraint } from '../Layout';
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
  size,
}) {
  const labelId = `${useId('contained-list')}-header`;
  const prefix = usePrefix();

  const classes = classNames(
    `${prefix}--contained-list`,
    {
      [`${prefix}--contained-list--inset-rulers`]: isInset,
      [`${prefix}--contained-list--${size}`]: size, // TODO: V12 - Remove this class
      [`${prefix}--layout--size-${size}`]: size,
    },
    `${prefix}--contained-list--${kind}`,
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
        <LayoutConstraint
          size={{ min: 'sm', max: 'xl' }}
          className={`${prefix}--contained-list__action`}>
          {action}
        </LayoutConstraint>
      </div>
      {children && (
        /**
         * Webkit removes implicit "list" semantics when "list-style-type: none" is set.
         * Explicitly setting the "list" role ensures assistive technology in webkit
         * browsers correctly announce the semantics.
         *
         * Ref https://bugs.webkit.org/show_bug.cgi?id=170179#c1
         */
        // eslint-disable-next-line jsx-a11y/no-redundant-roles
        <ul role="list" aria-labelledby={labelId}>
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
