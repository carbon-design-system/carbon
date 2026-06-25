// @ts-check
/**
 * Copyright IBM Corp. 2023, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * TODO: Breakdown titles, icons, clickable items into sub-components
 * See
 *   ModifiedTabs (ModifiedTabLabelNew, ModifiedTabLabelWithClose)
 *   PageHeader (PageHeaderTitle, PageHeaderUtils)
 */

// Import portions of React that are needed.
import React from 'react';

// Other standard imports.
import PropTypes from 'prop-types';
import cx from 'classnames';

import { getDevtoolsProps } from '../../global/js/utils/devtools';
import { pkg } from '../../settings';

// Carbon and package components we use.
/* TODO: @import(s) of carbon components and other package components. */
import {
  CheckmarkOutline,
  CircleDash,
  Incomplete,
  Warning,
} from '@carbon/react/icons';
import { Kinds, Themes } from './Checklist.types';

// The block part of our conventional BEM class names (blockClass__E--M).
const blockClass = `${pkg.prefix}--checklist__icon`;
const componentName = 'ChecklistIcon';

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
  theme: Themes.light,
};

/**
 * TODO: A description of the component.
 */
export let ChecklistIcon = React.forwardRef(
  /**
   * @param {{className?: string, kind?: import('./Checklist.types').Kind, theme?: import('./Checklist.types').Theme}} props type description
   */
  ({ className, kind, theme = defaults.theme, ...rest }, ref) => {
    let Icon;

    switch (kind) {
      case 'error':
        Icon = Warning;
        break;
      case 'indeterminate':
        Icon = Incomplete;
        break;
      case 'checked':
        Icon = CheckmarkOutline;
        break;

      default:
        // "unchecked" or "disabled"
        Icon = CircleDash;
        break;
    }

    return (
      <span
        {...rest}
        className={cx(
          blockClass,
          className,
          `${blockClass}--${kind}`,
          `${blockClass}__${theme}`
        )}
        ref={ref}
        {...getDevtoolsProps(componentName)}
      >
        <Icon size={16} />
      </span>
    );
  }
);

// Return a placeholder if not released and not enabled by feature flag
// ChecklistIcon = pkg.checkComponentEnabled(ChecklistIcon, componentName);

// The display name of the component, used by React. Note that displayName
// is used in preference to relying on function.name.
// ChecklistIcon.displayName = componentName;

// The types and DocGen commentary for the component props,
// in alphabetical order (for consistency).
// See https://www.npmjs.com/package/prop-types#usage.
ChecklistIcon.propTypes = {
  /**
   * Provide an optional class to be applied to the containing node.
   */
  className: PropTypes.string,
  /**
   * The icon to be displayed.
   */
  kind: PropTypes.oneOf([
    Kinds.unchecked,
    Kinds.indeterminate,
    Kinds.checked,
    Kinds.disabled,
    Kinds.error,
  ]),
  /**
   * Determines the theme of the component.
   */
  theme: PropTypes.oneOf([Themes.light, Themes.dark]),
};
