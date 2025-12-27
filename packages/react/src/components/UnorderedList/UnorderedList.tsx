/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { type ComponentProps, useEffect, useRef } from 'react';
import classnames from 'classnames';
import { usePrefix } from '../../internal/usePrefix';
import { warning } from '../../internal/warning';

export type UnorderedListMarkerType =
  | 'disc'
  | 'circle'
  | 'square'
  | 'hyphen'
  | 'custom';

export interface UnorderedListProps extends ComponentProps<'ul'> {
  nested?: boolean | undefined;
  isExpressive?: boolean | undefined;
  type?: UnorderedListMarkerType | undefined;
  customMarker?: string | undefined;
}

export default function UnorderedList({
  className,
  nested = false,
  isExpressive = false,
  type,
  customMarker,
  style,
  ...other
}: UnorderedListProps) {
  const prefix = usePrefix();
  const hasWarnedRef = useRef(false);

  // Determine marker type: use provided type, or default based on nesting
  const markerType: UnorderedListMarkerType | undefined =
    type || (nested ? 'square' : 'hyphen');

  // Show deprecation warning for nested lists without explicit type
  useEffect(() => {
    if (
      nested &&
      !type &&
      !hasWarnedRef.current &&
      process.env.NODE_ENV !== 'production'
    ) {
      warning(
        false,
        'Nested unordered lists without an explicit `type` prop will default to ' +
          'square markers. This behavior is deprecated. Please explicitly set ' +
          '`type="square"` (or another marker type) for nested lists. ' +
          "In the next major release, nested lists will inherit the parent list's marker type."
      );
      hasWarnedRef.current = true;
    }
  }, [nested, type]);

  // Build class names
  const classNames = classnames(`${prefix}--list--unordered`, className, {
    [`${prefix}--list--nested`]: nested,
    [`${prefix}--list--expressive`]: isExpressive,
    [`${prefix}--list--marker-${markerType}`]: markerType,
  });

  // Build styles for custom marker
  const customStyles: React.CSSProperties = {
    ...style,
    ...(markerType === 'custom' && customMarker
      ? {
          [`--${prefix}--list--marker-content`]: `'${customMarker}'`,
        }
      : {}),
  };

  return <ul className={classNames} style={customStyles} {...other} />;
}

UnorderedList.propTypes = {
  /**
   * Specify a collection of ListItem's to be rendered in the UnorderedList
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the underlying `<ul>` node
   */
  className: PropTypes.string,

  /**
   * Specify whether this ordered list expressive or not
   */
  isExpressive: PropTypes.bool,

  /**
   * Specify whether the list is nested, or not
   */
  nested: PropTypes.bool,

  /**
   * Specify the marker type for the list items.
   * - `disc`: filled circle (•)
   * - `circle`: hollow circle (○)
   * - `square`: filled square (▪)
   * - `hyphen`: en dash (default for top-level lists) (–)
   * - `custom`: custom marker (requires `customMarker` prop)
   *
   * When not specified:
   * - Top-level lists default to `hyphen`
   * - Nested lists default to `square` (deprecated - will inherit parent type in next major release)
   */
  type: PropTypes.oneOf(['disc', 'circle', 'square', 'hyphen', 'custom']),

  /**
   * Specify a custom marker character/content.
   * Only used when `type="custom"`.
   * The value will be used as the CSS content for the marker.
   */
  customMarker: PropTypes.string,
};
