/**
 * Copyright IBM Corp. 2022, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { LayoutConstraint } from '../Layout';
import { isComponentElement } from '../../internal';
import { useId } from '../../internal/useId';
import { usePrefix } from '../../internal/usePrefix';
import ContainedListItem from './ContainedListItem';
import ExpandableSearch from '../ExpandableSearch';
import { Search } from '../Search';

const variants = ['on-page', 'disclosed'] as const;

export type Variants = (typeof variants)[number];

const isSearchComponent = (node: ReactNode) =>
  isComponentElement(node, Search) ||
  isComponentElement(node, ExpandableSearch);

export interface ContainedListProps {
  /**
   * A slot for a possible interactive element to render.
   */
  action?: ReactNode;

  /**
   * A collection of ContainedListItems to be rendered in the ContainedList
   */
  children?: ReactNode;

  /**
   * Additional CSS class names.
   */
  className?: string;

  /**
   * Specify whether the dividing lines in between list items should be inset.
   */
  isInset?: boolean;

  /**
   * The kind of ContainedList you want to display
   */
  kind?: Variants;

  /**
   * A label describing the contained list.
   */
  label?: string | ReactNode;

  /**
   * Specify the size of the contained list.
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const filterChildren = (children: ReactNode) => {
  if (Array.isArray(children)) {
    return children.filter((child) => !isSearchComponent(child));
  }

  if (children && !isSearchComponent(children)) {
    return children;
  }

  return null;
};

const ContainedList = ({
  action,
  children,
  className,
  isInset,
  kind = variants[0],
  label,
  size,
  ...rest
}: ContainedListProps) => {
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
  const isActionSearch = isSearchComponent(action);

  return (
    <div className={classes} {...rest}>
      {label && (
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
      )}
      {children && (
        /**
         * Webkit removes implicit "list" semantics when "list-style-type: none" is set.
         * Explicitly setting the "list" role ensures assistive technology in webkit
         * browsers correctly announce the semantics.
         *
         * Ref https://bugs.webkit.org/show_bug.cgi?id=170179#c1
         */
        // eslint-disable-next-line jsx-a11y/no-redundant-roles
        <ul role="list" aria-labelledby={label ? labelId : undefined}>
          {isActionSearch ? filteredChildren : children}
        </ul>
      )}
    </div>
  );
};

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
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),

  /**
   * Specify the size of the contained list.
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
};

Object.assign(ContainedList, { ContainedListItem });

export default ContainedList;
