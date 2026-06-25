/**
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Import portions of React that are needed.
import React, { PropsWithChildren } from 'react';

// Other standard imports.
import PropTypes from 'prop-types';
import cx from 'classnames';
import { getDevtoolsProps } from '../../global/js/utils/devtools';
import { pkg } from '../../settings';

const blockClass = `${pkg.prefix}--delimited-list`;
const componentName = 'DelimitedList';

const defaults = {
  delimiter: ', ',
  items: [],
  truncate: true,
};
export interface DelimitedListProps extends PropsWithChildren {
  /**
   * Provide an optional class to be applied to the containing node.
   */
  className?: string;
  /**
   * The character(s) used to separate the items.
   */
  delimiter?: string;
  /**
   * Array of items to be listed.
   */
  items?: any[];
  /**
   * Toggle the component's ability to truncate or not.
   */
  truncate?: boolean;
}

/**
 * `DelimitedList` converts an array of items into a single line of
 * comma-separated values.
 * @deprecated This component is deprecated and will be removed in the next major version.
 */
export const DelimitedList = React.forwardRef<
  HTMLDivElement,
  DelimitedListProps
>(
  (
    {
      // The component props, in alphabetical order (for consistency).
      className,
      /* add other props for DelimitedList, with default values if needed */
      delimiter = defaults.delimiter,
      items = defaults.items,
      truncate = defaults.truncate,
      // Collect any other property values passed in.
      ...rest
    }: DelimitedListProps,
    ref
  ) => {
    return (
      <div
        {...rest}
        className={cx(blockClass, className, [
          truncate && `${blockClass}-truncate`,
        ])}
        ref={ref}
        {...getDevtoolsProps(componentName)}
      >
        {items.length > 0 ? items.join(delimiter) : '–'}
      </div>
    );
  }
);

/**@ts-ignore*/
DelimitedList.deprecated = {
  level: 'warn',
  details: `${componentName} is deprecated and will be removed in the next major version`,
};

// Return a placeholder if not released and not enabled by feature flag

// The display name of the component, used by React. Note that displayName
// is used in preference to relying on function.name.
DelimitedList.displayName = componentName;

// The types and DocGen commentary for the component props,
// in alphabetical order (for consistency).
// See https://www.npmjs.com/package/prop-types#usage.
DelimitedList.propTypes = {
  /**
   * Provide an optional class to be applied to the containing node.
   */
  className: PropTypes.string,
  /**
   * The character(s) used to separate the items.
   */
  delimiter: PropTypes.string,
  /**
   * Array of items to be listed.
   */
  items: PropTypes.arrayOf(PropTypes.any),
  /**
   * Toggle the component's ability to truncate or not.
   */
  truncate: PropTypes.bool,
};
