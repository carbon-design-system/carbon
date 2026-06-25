/**
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Carbon and package components we use.
import { Button, type ButtonProps } from '@carbon/react';
// Import portions of React that are needed.
import React, {
  ForwardedRef,
  PropsWithChildren,
  ReactNode,
  RefObject,
} from 'react';
import { TearsheetShell } from './TearsheetShell';

// Other standard imports.
import PropTypes from 'prop-types';
import { allPropTypes } from '../../global/js/utils/props-helper';
import { getDevtoolsProps } from '../../global/js/utils/devtools';
import { pkg } from '../../settings';
import { portalType } from './TearsheetShell';

const componentName = 'Tearsheet';

// NOTE: the component SCSS is not imported here: it is rolled up separately.
// The types and DocGen commentary for the component props,
// in alphabetical order (for consistency).
// See https://www.npmjs.com/package/prop-types#usage.

export interface TearsheetAction extends ButtonProps<'button'> {
  label?: string;
  loading?: boolean;
}

// Note that the descriptions here should be kept in sync with those for the
// corresponding props for TearsheetNarrow and TearsheetShell components.
export interface TearsheetProps extends PropsWithChildren {
  /**
   * The navigation actions to be shown as buttons in the action area at the
   * bottom of the tearsheet. Each action is specified as an object with
   * optional fields: 'label' to supply the button label, 'kind' to select the
   * button kind (must be 'primary', 'secondary' or 'ghost'), 'loading' to
   * display a loading indicator, and 'onClick' to receive notifications when
   * the button is clicked. Additional fields in the object will be passed to
   * the Button component, and these can include 'disabled', 'ref', 'className',
   * and any other Button props, except 'size'. Any other fields in the object will
   * be passed through to the button element as HTML attributes.
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
   * (when this prop is omitted, or undefined or null) a tearsheet does not
   * display a close icon if there are navigation actions ("transactional
   * tearsheet") and displays one if there are no navigation actions ("passive
   * tearsheet"), and that behavior can be overridden if required by setting
   * this prop to either true or false.
   */
  hasCloseIcon?: boolean;

  /**
   * The content for the header actions area, displayed alongside the title in
   * the header area of the tearsheet. This is typically a drop-down, or a set
   * of small buttons, or similar. NB the headerActions is only applicable for
   * wide tearsheets.
   */
  headerActions?: ReactNode;

  /**
   * The content for the influencer section of the tearsheet, displayed
   * alongside the main content. This is typically a menu, or filter, or
   * progress indicator, or similar.
   */
  influencer?: ReactNode;

  /**
   * The position of the influencer section, 'left' or 'right'.
   */
  influencerPosition?: 'left' | 'right';

  /**
   * The width of the influencer: 'narrow' (the default) is 256px, and 'wide'
   * is 320px.
   */
  influencerWidth?: 'narrow' | 'wide';

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
   * Navigation content, such as a set of tabs, to be displayed at the bottom
   * of the header area of the tearsheet.
   */
  navigation?: ReactNode;

  /**
   * An optional handler that is called when the user closes the tearsheet (by
   * clicking the close button, if enabled, or clicking outside, if enabled).
   * Returning `false` here prevents the modal from closing.
   */
  onClose?: () => void;

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

  /** @deprecated */
  /**
   * The position of the top of tearsheet in the viewport. The 'normal'
   * position is a short distance down from the top of the
   * viewport, leaving room at the top for a global header bar to show through
   * from below. The 'lower' position (the default) provides a little extra room at the top
   * to allow an action bar navigation or breadcrumbs to also show through.
   */
  verticalPosition?: 'normal' | 'lower';
}

/**
 * A tearsheet is a mostly full-screen type of dialog that keeps users
 * in-context and focused by bringing actionable content front and center while
 * revealing parts of the UI behind it. There is also a narrow variant of the
 * tearsheet.
 *
 * A tearsheet comprises up to 5 zones, allowing for flexibility depending on
 * the content: a heading area including a title, an optional navigation area
 * that sits just below the heading, an optional influencer which is a side
 * panel on either the left or right side, the main content area, and a set of
 * action buttons.
 */
export const Tearsheet = React.forwardRef<HTMLDivElement, TearsheetProps>(
  (props, ref) => {
    const {
      influencerPosition = 'left',
      influencerWidth = 'narrow',
      children,
      ...rest
    } = props;
    return (
      <TearsheetShell
        {...{
          ...getDevtoolsProps(componentName),
          ...rest,
          influencerPosition,
          influencerWidth,
          ref,
          size: 'wide',
        }}
      >
        {children}
      </TearsheetShell>
    );
  }
);

// Return a placeholder if not released and not enabled by feature flag

// The display name of the component, used by React. Note that displayName
// is used in preference to relying on function.name.
Tearsheet.displayName = componentName;

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
// corresponding props for TearsheetNarrow and TearsheetShell components.
Tearsheet.propTypes = {
  /**
   * The navigation actions to be shown as buttons in the action area at the
   * bottom of the tearsheet. Each action is specified as an object with
   * optional fields: 'label' to supply the button label, 'kind' to select the
   * button kind (must be 'primary', 'secondary' or 'ghost'), 'loading' to
   * display a loading indicator, and 'onClick' to receive notifications when
   * the button is clicked. Additional fields in the object will be passed to
   * the Button component, and these can include 'disabled', 'ref', 'className',
   * and any other Button props, except 'size'. Any other fields in the object will
   * be passed through to the button element as HTML attributes.
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
   * (when this prop is omitted, or undefined or null) a tearsheet does not
   * display a close icon if there are navigation actions ("transactional
   * tearsheet") and displays one if there are no navigation actions ("passive
   * tearsheet"), and that behavior can be overridden if required by setting
   * this prop to either true or false.
   */
  hasCloseIcon: PropTypes.bool,

  /**
   * The content for the header actions area, displayed alongside the title in
   * the header area of the tearsheet. This is typically a drop-down, or a set
   * of small buttons, or similar. NB the headerActions is only applicable for
   * wide tearsheets.
   */
  headerActions: PropTypes.element,

  /**
   * The content for the influencer section of the tearsheet, displayed
   * alongside the main content. This is typically a menu, or filter, or
   * progress indicator, or similar.
   */
  influencer: PropTypes.element,

  /**
   * The position of the influencer section, 'left' or 'right'.
   */
  influencerPosition: PropTypes.oneOf(['left', 'right']),

  /**
   * The width of the influencer: 'narrow' (the default) is 256px, and 'wide'
   * is 320px.
   */
  influencerWidth: PropTypes.oneOf(['narrow', 'wide']),

  /**
   * A label for the tearsheet, displayed in the header area of the tearsheet
   * to maintain context for the tearsheet (e.g. as the title changes from page
   * to page of a multi-page task).
   */
  label: PropTypes.node,

  /**
   * Provide a ref to return focus to once the tearsheet is closed.
   */
  launcherButtonRef: PropTypes.any,

  /**
   * Navigation content, such as a set of tabs, to be displayed at the bottom
   * of the header area of the tearsheet.
   */
  navigation: PropTypes.element,

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
