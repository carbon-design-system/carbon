/**
 * Copyright IBM Corp. 2024, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Other standard imports.
import PropTypes from 'prop-types';
// Import portions of React that are needed.
import React, { useEffect } from 'react';
import cx from 'classnames';
import { SelectableTag } from '@carbon/react';
import { Checkmark } from '@carbon/react/icons';
import { pkg } from '../../../../settings';
import { disableButtonConfigType } from '../../context';
import './_interstitial-screen-view-module.scss';

// Carbon and package components we use.
/* TODO: @import(s) of carbon components and other package components. */

// The block part of our conventional BEM class names (blockClass__E--M).
const blockClass = `${pkg.prefix}--interstitial-screen-view-module`;
const componentName = 'InterstitialScreenViewModule';

// NOTE: the component SCSS is not imported here: it is rolled up separately.

// Default values can be included here and then assigned to the prop params,
// e.g. prop = defaults.prop,
// This gathers default values together neatly and ensures non-primitive
// values are initialized early to avoid react making unnecessary re-renders.
// Note that default values are not required for props that are 'required',
// nor for props where the component can apply undefined values reasonably.
// Default values should be provided when the component needs to make a choice
// or assumption when a prop is not supplied.

export interface InterstitialScreenViewModuleProps {
  /**
   * Provide an optional class to be applied to the containing node.
   */
  className?: string;
  /**
   * The description of this component.
   */
  description: string;
  /**
   * The title of this component.
   */
  title: string;
  /**
   *
   * @param value This is callback to disable any action button dynamically
   * @returns void
   */
  disableActionButton?: (value: disableButtonConfigType) => void;
}
/**
 * View module to help in building interstitial screen views.
 */
export const InterstitialScreenViewModule = React.forwardRef<
  HTMLElement,
  InterstitialScreenViewModuleProps
>(
  (
    {
      // The component props, in alphabetical order (for consistency).

      className,
      title,
      description,
      disableActionButton,
      // Collect any other property values passed in.
      ...rest
    }: InterstitialScreenViewModuleProps,
    ref
  ) => {
    useEffect(() => {
      disableActionButton?.({
        start: true,
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleOnChange = (selected) => {
      disableActionButton?.({ start: !selected });
    };
    return (
      <section
        {
          // Pass through any other property values as HTML attributes.
          ...rest
        }
        className={cx(
          blockClass, // Apply the block class to the main HTML element
          className // Apply any supplied class names to the main HTML element.
        )}
        ref={ref}
      >
        <h1 className={`${blockClass}--heading`}>{title}</h1>
        <p className={`${blockClass}--body`}>{description}</p>

        {disableActionButton && (
          <SelectableTag
            renderIcon={Checkmark}
            text="Enable Get Started"
            className={`${blockClass}--enableTag`}
            onChange={handleOnChange}
          />
        )}
      </section>
    );
  }
);

// The display name of the component, used by React. Note that displayName
// is used in preference to relying on function.name.
InterstitialScreenViewModule.displayName = componentName;

// The types and DocGen commentary for the component props,
// in alphabetical order (for consistency).
// See https://www.npmjs.com/package/prop-types#usage.
InterstitialScreenViewModule.propTypes = {
  /**
   * Provide an optional class to be applied to the containing node.
   */
  className: PropTypes.string,
  /**
   * The description of this component.
   */
  description: PropTypes.string.isRequired,
  /**
   * This is callback to disable any action button dynamically
   */
  disableActionButton: PropTypes.func,
  /**
   * The title of this component.
   */
  title: PropTypes.string.isRequired,
};
