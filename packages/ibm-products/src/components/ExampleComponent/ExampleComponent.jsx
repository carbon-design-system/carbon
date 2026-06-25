/**
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Import portions of React that are needed.
import React, { useRef, useEffect, useState } from 'react';

// Other standard imports.
import PropTypes from 'prop-types';
import cx from 'classnames';
import { pkg } from '../../settings';

// Carbon and package components we use.
import { Button, ButtonSet } from '@carbon/react';
import useExample from './useExample';
// The block part of our conventional BEM class names (blockClass__E--M).
const blockClass = `${pkg.prefix}--example-component`;
const componentName = 'ExampleComponent';

// NOTE: the component SCSS is not imported here: it is rolled up separately.

// Default values for props
const defaults = {
  primaryKind: 'primary',
  secondaryKind: 'secondary',
  secondaryIcon: null,
  size: 'lg',
};

/**
 * This is an example component to show relevant conventions and usage.
 */
export let ExampleComponent = React.forwardRef(
  (
    {
      // The component props, in alphabetical order (for consistency).

      borderColor,
      boxedBorder,
      className,
      disabled,
      usesExampleHook,
      onPrimaryClick,
      onSecondaryClick,
      primaryButtonLabel,
      primaryKind = defaults.primaryKind,
      secondaryButtonLabel,
      secondaryKind = defaults.secondaryKind,
      secondaryIcon = defaults.secondaryIcon,
      size = defaults.size,
      style,

      // Collect any other property values passed in.
      ...rest
    },
    ref
  ) => {
    const [thePrimaryButtonLabel, setThePrimaryButtonLabel] =
      useState(primaryButtonLabel);
    const [exampleUse] = useExample(usesExampleHook);

    const modeClass = boxedBorder
      ? `${blockClass}--boxed-set`
      : `${blockClass}--shadow-set`;

    const handlePrimaryClick = (e) => {
      if (onPrimaryClick) {
        onPrimaryClick(e);
      }
    };

    const handleSecondaryClick = (e) => {
      if (onSecondaryClick) {
        onSecondaryClick(e);
      }
    };

    const theSecondaryIcon = useRef(
      secondaryIcon &&
        pkg.checkReportFeatureEnabled('ExampleComponent.secondaryIcon')
        ? secondaryIcon
        : null
    );

    useEffect(() => {
      if (
        usesExampleHook !== undefined &&
        pkg.checkReportFeatureEnabled('ExampleComponent.useExample')
      ) {
        setThePrimaryButtonLabel(
          `${primaryButtonLabel} ${exampleUse.toFixed(1)}s`
        );
      } else {
        setThePrimaryButtonLabel(primaryButtonLabel);
      }
    }, [primaryButtonLabel, usesExampleHook, exampleUse]);

    return (
      <ButtonSet
        {
          // Pass through any other property values as HTML attributes.
          ...rest
        }
        className={cx(
          blockClass, // Apply the block class to the main HTML element
          className, // Apply any supplied class names to the main HTML element.
          `${blockClass}--${size}`,
          modeClass
        )}
        ref={ref}
        role="main"
        style={{
          // Apply any supplied styles to the main HTML element. Note that if
          // the prop is not supplied this contributes nothing to the object.
          ...style,
          /* stylelint-disable-next-line carbon/theme-use */
          [`--${blockClass}--border-color`]: borderColor,
        }}
      >
        <Button
          className={`${blockClass}__secondary-button`}
          kind={secondaryKind}
          onClick={handleSecondaryClick}
          renderIcon={theSecondaryIcon.current}
          {...{ disabled, size }}
        >
          {secondaryButtonLabel}
        </Button>
        <Button
          className={`${blockClass}__primary-button`}
          kind={primaryKind}
          onClick={handlePrimaryClick}
          {...{ disabled, size }}
        >
          {thePrimaryButtonLabel}
        </Button>
      </ButtonSet>
    );
  }
);

// Return a placeholder if not released and not enabled by feature flag.
ExampleComponent = pkg.checkComponentEnabled(ExampleComponent, componentName);

// The display name of the component, used by React. Note that displayName
// is used in preference to relying on function.name.
ExampleComponent.displayName = componentName;

// The types and DocGen commentary for the component props,
// in alphabetical order (for consistency).
// See https://www.npmjs.com/package/prop-types#usage.
ExampleComponent.propTypes = {
  /**
   * What border color (HTML color value) to use.
   */
  borderColor: PropTypes.string,

  /**
   * If true, the border is a box, otherwise it is a shadow.
   */
  boxedBorder: PropTypes.bool,

  /**
   * Provide an optional class to be applied to the containing node.
   */
  className: PropTypes.string,

  /**
   * If true, the buttons are disabled, otherwise they can be used.
   */
  disabled: PropTypes.bool,

  /**
   * An optional primary button click handler.
   */
  onPrimaryClick: PropTypes.func,

  /**
   * An optional secondary button click handler.
   */
  onSecondaryClick: PropTypes.func,

  /**
   * The primary button label.
   */
  primaryButtonLabel: PropTypes.string.isRequired,

  /**
   * The kind of button for the primary button ('primary' or 'danger').
   */
  primaryKind: PropTypes.oneOf(['primary', 'danger']),

  /**
   * The secondary button label.
   */
  secondaryButtonLabel: PropTypes.string.isRequired,

  /**
   * The icon to use for the secondary button.
   */
  secondaryIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

  /**
   * The kind of button for the secondary button ('secondary' or 'tertiary').
   */
  secondaryKind: PropTypes.oneOf(['secondary', 'tertiary']),

  /**
   * The size for the buttons
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', '2xl']),

  /**
   * Optional style settings for the containing node.
   */
  style: PropTypes.object,

  /**
   * Hook example timeout (in seconds) or undefined
   */
  usesExampleHook: PropTypes.number,
};
