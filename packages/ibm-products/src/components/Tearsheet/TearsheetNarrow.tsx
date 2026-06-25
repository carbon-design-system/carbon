/**
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Carbon and package components we use.
import { Button } from '@carbon/react';
import {
  TearsheetShell,
  tearsheetShellWideProps as blocked,
} from './TearsheetShell';
// Import portions of React that are needed.
import React, {
  ForwardedRef,
  PropsWithChildren,
  ReactNode,
  RefObject,
} from 'react';
import { allPropTypes, prepareProps } from '../../global/js/utils/props-helper';

// Other standard imports.
import PropTypes from 'prop-types';
import { getDevtoolsProps } from '../../global/js/utils/devtools';
import { pkg } from '../../settings';
import { portalType } from './TearsheetShell';
import { TearsheetAction } from './Tearsheet';

export interface TearsheetNarrowProps extends PropsWithChildren {
  /**
   * The navigation actions to be shown as buttons in the action area at the
   * bottom of the tearsheet. Each action is specified as an object with
   * optional fields: 'label' to supply the button label, 'kind' to select the
   * button kind (must be 'primary', 'secondary' or 'ghost'), 'loading' to
   * display a loading indicator, and 'onClick' to receive notifications when
   * the button is clicked. Additional fields in the object will be passed to
   * the Button component, and these can include 'disabled', 'ref', 'className',
   * and any other Button props. Any other fields in the object will be passed
   * through to the button element as HTML attributes.
   *
   * See https://react.carbondesignsystem.com/?path=/docs/components-button--default#component-api
   */
  actions?: TearsheetAction[];

  /**
   * The aria-label for the tearsheet, which is optional.
   * if it is not passed, the title will be used as the aria-label.
   */
  ariaLabel?: string;

  /**
   * An optional class or classes to be added to the outermost element.
   */
  className?: string;

  /**
   * The accessibility title for the close icon (if shown).
   *
   */
  closeIconDescription?: string;

  /**
   * A description of the flow, displayed in the header area of the tearsheet.
   */
  description?: ReactNode;

  /**
   * Enable a close icon ('x') in the header area of the tearsheet. By default,
   * a tearsheet does not display a close icon, but one should be enabled if
   * the tearsheet is read-only or has no navigation actions (sometimes called
   * a "passive tearsheet").
   */
  hasCloseIcon?: boolean;

  /**
   * A label for the tearsheet, displayed in the header area of the tearsheet
   * to maintain context for the tearsheet (e.g. as the title changes from page
   * to page of a multi-page task).
   */
  label?: ReactNode;

  /**
   * Provide a ref to return focus to once the tearsheet is closed.
   */
  launcherButtonRef?: RefObject<any>;

  /**
   * An optional handler that is called when the user closes the tearsheet (by
   * clicking the close button, if enabled, or clicking outside, if enabled).
   * Returning `false` here prevents the modal from closing.
   */
  onClose?: () => boolean | void;

  /**
   * Specifies whether the tearsheet is currently open.
   */
  open?: boolean;

  /**
   * The DOM element that the tearsheet should be rendered within. Defaults to document.body.
   */
  portalTarget?: HTMLElement;

  /**
   * Specify a CSS selector that matches the DOM element that should be
   * focused when the Modal opens.
   */
  selectorPrimaryFocus?: string;

  /**
   * Specify the CSS selectors that match the floating menus.
   *
   * See https://react.carbondesignsystem.com/?path=/docs/components-composedmodal--overview#focus-management
   */
  selectorsFloatingMenus?: string[];

  /**
   * The main title of the tearsheet, displayed in the header area.
   */
  title?: ReactNode;

  /**
   * **Deprecated**
   *
   * The position of the top of tearsheet in the viewport. The 'normal'
   * position is a short distance down from the top of the
   * viewport, leaving room at the top for a global header bar to show through
   * from below. The 'lower' position (the default) provides a little extra room at the top
   * to allow an action bar navigation or breadcrumbs to also show through.
   */
  verticalPosition?: 'normal' | 'lower';
}

const componentName = 'TearsheetNarrow';

// NOTE: the component SCSS is not imported here: it is rolled up separately.

// Default values for props
const defaults = {
  verticalPosition: 'lower' as const,
};

/**
 * A narrow tearsheet is a slimmer variant of the tearsheet, providing a dialog
 * that keeps users in-context and focused by bringing actionable content front
 * and center while revealing more of the UI behind it.
 *
 * A narrow tearsheet comprises 3 zones: a heading area including a title, the
 * main content area, and a set of action buttons.
 */

export const TearsheetNarrow = React.forwardRef(
  (
    {
      verticalPosition = defaults.verticalPosition,
      ...rest
    }: TearsheetNarrowProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => (
    <TearsheetShell
      {...{
        ...getDevtoolsProps(componentName),
        ...prepareProps(rest, blocked),
        verticalPosition,
        ref,
        size: 'narrow',
      }}
    />
  )
);

// Return a placeholder if not released and not enabled by feature flag

// The display name of the component, used by React. Note that displayName
// is used in preference to relying on function.name.
TearsheetNarrow.displayName = componentName;

export const deprecatedProps = {
  /**
   * **Deprecated**
   *
   * The position of the top of tearsheet in the viewport. The 'normal'
   * position is a short distance down from the top of the
   * viewport, leaving room at the top for a global header bar to show through
   * from below. The 'lower' position (the default) provides a little extra room at the top
   * to allow an action bar navigation or breadcrumbs to also show through.
   */
  verticalPosition: PropTypes.oneOf(['normal', 'lower']),
};

// The types and DocGen commentary for the component props,
// in alphabetical order (for consistency).
// See https://www.npmjs.com/package/prop-types#usage.

// Note that the descriptions here should be kept in sync with those for the
// corresponding props for Tearsheet and TearsheetShell components.
TearsheetNarrow.propTypes = {
  /**
   * The navigation actions to be shown as buttons in the action area at the
   * bottom of the tearsheet. Each action is specified as an object with
   * optional fields: 'label' to supply the button label, 'kind' to select the
   * button kind (must be 'primary', 'secondary' or 'ghost'), 'loading' to
   * display a loading indicator, and 'onClick' to receive notifications when
   * the button is clicked. Additional fields in the object will be passed to
   * the Button component, and these can include 'disabled', 'ref', 'className',
   * and any other Button props. Any other fields in the object will be passed
   * through to the button element as HTML attributes.
   *
   * See https://react.carbondesignsystem.com/?path=/docs/components-button--default#component-api
   */
  actions: allPropTypes([
    PropTypes.arrayOf(
      PropTypes.shape({
        ...Button.propTypes,
        kind: PropTypes.oneOf([
          'ghost',
          'danger--ghost',
          'secondary',
          'danger',
          'primary',
        ]),
        label: PropTypes.string,
        loading: PropTypes.bool,
        // we duplicate this Button prop to improve the DocGen here
        /**@ts-ignore*/
        onClick: Button.propTypes.onClick,
      })
    ),
  ]),

  /**
   * The aria-label for the tearsheet, which is optional.
   * if it is not passed, the title will be used as the aria-label.
   */
  ariaLabel: PropTypes.string,

  /**
   * An optional class or classes to be added to the outermost element.
   */
  className: PropTypes.string,

  /**
   * The accessibility title for the close icon (if shown).
   *
   */
  closeIconDescription: PropTypes.string,
  /**
   * A description of the flow, displayed in the header area of the tearsheet.
   */
  description: PropTypes.node,

  /**
   * Enable a close icon ('x') in the header area of the tearsheet. By default,
   * a tearsheet does not display a close icon, but one should be enabled if
   * the tearsheet is read-only or has no navigation actions (sometimes called
   * a "passive tearsheet").
   */
  hasCloseIcon: PropTypes.bool,

  /**
   * A label for the tearsheet, displayed in the header area of the tearsheet
   * to maintain context for the tearsheet (e.g. as the title changes from page
   * to page of a multi-page task).
   */
  label: PropTypes.node,

  /**
   * An optional handler that is called when the user closes the tearsheet (by
   * clicking the close button, if enabled, or clicking outside, if enabled).
   * Returning `false` here prevents the modal from closing.
   */
  onClose: PropTypes.func,

  /**
   * Specifies whether the tearsheet is currently open.
   */
  open: PropTypes.bool,

  /**
   * The DOM element that the tearsheet should be rendered within. Defaults to document.body.
   */
  /**@ts-ignore */
  portalTarget: portalType,

  /**
   * Specify a CSS selector that matches the DOM element that should be
   * focused when the Modal opens.
   */
  selectorPrimaryFocus: PropTypes.string,

  /**
   * Specify the CSS selectors that match the floating menus.
   *
   * See https://react.carbondesignsystem.com/?path=/docs/components-composedmodal--overview#focus-management
   */
  /**@ts-ignore*/
  selectorsFloatingMenus: PropTypes.arrayOf(PropTypes.string),

  /**
   * The main title of the tearsheet, displayed in the header area.
   */
  title: PropTypes.node,

  ...deprecatedProps,
};
