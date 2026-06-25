/**
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Import portions of React that are needed.
import React from 'react';
// Other standard imports.
import PropTypes from 'prop-types';
import cx from 'classnames';

import { getDevtoolsProps } from '../../global/js/utils/devtools';
import { pkg /*, carbon */ } from '../../settings';
import { DescriptionListSize } from './constants';
// Carbon and package components we use.
import { StructuredListWrapper } from '@carbon/react';

// The block part of our conventional BEM class names (blockClass__E--M).
const blockClass = `${pkg.prefix}--description-list`;
const componentName = 'DescriptionList';

// NOTE: the component SCSS is not imported here: it is rolled up separately.

// Default values can be included here and then assigned to the prop params,
// e.g. prop = defaults.prop,
// This gathers default values together neatly and ensures non-primitive
// values are initialized early to avoid react making unnecessary re-renders.
// Note that default values are not required for props that are 'required',
// nor for props where the component can apply undefined values reasonably.
// Default values should be provided when the component needs to make a choice
// or assumption when a prop is not supplied.

// Default values for props
const defaults = {
  border: false,
  size: DescriptionListSize.Medium,
};

/**
 * Type layouts provide an orderly layout of terms and definitions.
 * @deprecated This component is deprecated
 */
export let DescriptionList = React.forwardRef(
  (
    {
      // The component props, in alphabetical order (for consistency).
      border = defaults.border,
      children /* TODO: remove if not needed. */,
      className,
      size = defaults.size,

      // Collect any other property values passed in.
      ...rest
    },
    ref
  ) => {
    return (
      <div
        {
          // Pass through any other property values as HTML attributes.
          ...rest
        }
        className={cx(
          blockClass, // Apply the block class to the main HTML element
          {
            [`${blockClass}--bordered`]: border,
            [`${blockClass}--${size}`]: size,
          },
          className // Apply any supplied class names to the main HTML element.
        )}
        ref={ref}
        {...getDevtoolsProps(componentName)}
      >
        <StructuredListWrapper role="table" selection={false}>
          {children}
        </StructuredListWrapper>
      </div>
    );
  }
);

DescriptionList.deprecated = {
  level: 'warn',
  details: `This component is deprecated`,
};

// Return a placeholder if not released and not enabled by feature flag
DescriptionList = pkg.checkComponentEnabled(DescriptionList, componentName);

// The display name of the component, used by React. Note that displayName
// is used in preference to relying on function.name.
DescriptionList.displayName = componentName;

// The types and DocGen commentary for the component props,
// in alphabetical order (for consistency).
// See https://www.npmjs.com/package/prop-types#usage.
DescriptionList.propTypes = {
  /** Specify if the type layout has a border */
  border: PropTypes.bool,
  /** Provide the contents of the node */
  children: PropTypes.node,
  /** Provide an optional class to be applied to the containing node */
  className: PropTypes.string,
  /** Specify the size of the type layout, from a list of available sizes */
  size: PropTypes.oneOf(Object.values(DescriptionListSize)),
};
