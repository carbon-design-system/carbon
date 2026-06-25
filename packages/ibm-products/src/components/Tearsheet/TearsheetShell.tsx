/**
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Import portions of React that are needed.
import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  ComponentProps,
  PropsWithChildren,
  ReactNode,
  ForwardedRef,
  RefObject,
  cloneElement,
  isValidElement,
  ReactElement,
} from 'react';
import { useResizeObserver } from '../../global/js/hooks/useResizeObserver';

// Other standard imports.
import PropTypes from 'prop-types';
import cx from 'classnames';
import { pkg } from '../../settings';
import pconsole from '../../global/js/utils/pconsole';
import { getNodeTextContent } from '../../global/js/utils/getNodeTextContent';
import { deprecateProp } from '../../global/js/utils/props-helper';

// Carbon and package components we use.
import {
  Button,
  ComposedModal,
  Layer,
  ModalHeader,
  Section,
  useFeatureFlag,
  usePrefix,
  unstable_FeatureFlags as FeatureFlags,
  IconButton,
  AILabel,
} from '@carbon/react';
import { Close } from '@carbon/react/icons';

import { ActionSet } from '../ActionSet';
import { Wrap } from '../../global/js/utils/Wrap';
import { usePortalTarget } from '../../global/js/hooks/usePortalTarget';
import { useIsomorphicEffect, usePreviousValue } from '../../global/js/hooks';
import { useFocus } from '../../global/js/hooks/useFocus';
import { useMergedRefs } from '../../global/js/hooks/useMergedRefs';
import { TearsheetAction } from './Tearsheet';
import { useId } from '../../global/js/utils/useId';
import {
  TearsheetPresence,
  TearsheetPresenceContext,
  useExclusiveTearsheetPresenceContext,
} from './TearsheetPresence';

// The block part of our conventional BEM class names (bc__E--M).
const bc = `${pkg.prefix}--tearsheet`;
const componentName = 'TearsheetShell';

const maxDepth = 3;

interface TearsheetShellProps extends PropsWithChildren {
  actions?: TearsheetAction[];

  ariaLabel?: string;

  /**
   * An optional class or classes to be added to the outermost element.
   */
  className?: string;

  /**
   * The accessibility title for the close icon (if shown).
   *
   * **Note:** This prop is only required if a close icon is shown, i.e. if
   * there are a no navigation actions and/or hasCloseIcon is true.
   */
  closeIconDescription?: string;

  /**
   * Used to track the current step on components which use `StepsContext` and `TearsheetShell`
   */
  currentStep?: number;

  /**
   * Optional prop that allows you to pass any component.
   */
  decorator?: ReactNode;

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
   * To indicate an error occurred in the Tearsheet step
   * Mainly used by CreateTearsheet component to pass error state
   */
  hasError?: boolean;

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
   * progress indicator, or similar. NB the influencer is only applicable for
   * wide tearsheets.
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
   * of the header area of the tearsheet. NB the navigation is only applicable
   * for wide tearsheets.
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
   * Specifies the width of the tearsheet, 'narrow' or 'wide'.
   */
  size: 'narrow' | 'wide';

  /**
   * The main title of the tearsheet, displayed in the header area.
   */
  title?: ReactNode;

  verticalPosition?: 'normal' | 'lower';

  // Deprecated props
  /**
   * @deprecated Property replaced by `decorator`
   */
  slug?: ReactNode;
}

// NOTE: the component SCSS is not imported here: it is rolled up separately.

// Global data structure to communicate the state of tearsheet stacking
// (i.e. when more than one tearsheet is open). Each tearsheet supplies a
// handler to be called whenever the stacking of the tearsheets changes, which
// happens when a tearsheet opens or closes. The 'open' array contains one
// handler per OPEN tearsheet ordered from lowest to highest in visual z-order.
// The 'all' array contains all the handlers for open and closed tearsheets.
// The 'sizes' array contains an array of the sizes for every stacked tearsheet.
// This is so we can opt-out of including the stacking scale effect when there
// are stacked tearsheets with mixed sizes (ie, using wide and narrow together)
type stackTypes = {
  open: Array<{
    (a: number, b: number): void;
  }>;
  all: Array<{
    (a: number, b: number): void;
  }>;
  sizes: Array<string>;
};

const stack: stackTypes = { open: [], all: [], sizes: [] };

// these props are only applicable when size='wide'
export const tearsheetShellWideProps = [
  'headerActions',
  'influencer',
  'influencerPosition',
  'influencerWidth',
  'navigation',
];

export const tearsheetIsPassive = (actions) => !actions || !actions?.length;
export const tearsheetHasCloseIcon = (actions, hasCloseIcon) =>
  hasCloseIcon ?? tearsheetIsPassive(actions);

/**
 * Since the Tearsheet has an H3 heading, any headings inside the Tearsheet should start at H4.
 * This is a helper to do that.
 */
const SectionLevel3 = ({
  children,
  ...rest
}: ComponentProps<typeof Section>) => (
  <Section level={3} {...rest}>
    {children}
  </Section>
);

/**
 *  TearSheetShell is used internally by TearSheet and TearSheetNarrow
 *
 * The component is not public.
 *
 * See the canvas tab for the component API details.
 * */
export const TearsheetShell = React.forwardRef(
  (
    { open, ...props }: TearsheetShellProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const id = useId();

    const enablePresence = useFeatureFlag('enable-presence');
    const hasPresenceContext = Boolean(useContext(TearsheetPresenceContext));
    const hasPresenceOptIn = enablePresence || hasPresenceContext;

    const exclusivePresenceContext = useExclusiveTearsheetPresenceContext(id);

    // if opt in and not exclusive to a presence context, wrap with presence
    if (hasPresenceOptIn && !exclusivePresenceContext) {
      return (
        <TearsheetPresence
          open={open ?? false}
          _presenceId={id}
          // do not auto enable styles for opt-in by feature flag
          _autoEnablePresence={hasPresenceContext}
        >
          <TearsheetShellDialog open ref={ref} {...props} />
        </TearsheetPresence>
      );
    }

    return <TearsheetShellDialog ref={ref} open={open} {...props} />;
  }
);

const TearsheetShellDialog = React.forwardRef(
  (
    {
      // The component props, in alphabetical order (for consistency).
      actions,
      decorator,
      ariaLabel,
      children,
      className,
      closeIconDescription = 'Close',
      currentStep,
      description,
      hasCloseIcon,
      hasError,
      headerActions,
      influencer,
      influencerPosition,
      influencerWidth,
      label,
      navigation,
      onClose,
      open: externalOpen,
      portalTarget: portalTargetIn,
      selectorPrimaryFocus,
      selectorsFloatingMenus = [],
      size,
      slug: deprecated_slug,
      title,
      verticalPosition,
      launcherButtonRef,
      // Collect any other property values passed in.
      ...rest
    }: TearsheetShellProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const carbonPrefix = usePrefix();
    const bcModalHeader = `${carbonPrefix}--modal-header`;
    const renderPortalUse = usePortalTarget(portalTargetIn);
    const localRef = useRef(undefined);
    const resizer = useRef<HTMLDivElement | null>(null);
    const modalBodyRef = useRef(null);
    const modalRef = (ref || localRef) as RefObject<HTMLDivElement>;
    const { width } = useResizeObserver(resizer as RefObject<HTMLDivElement>);
    const { keyDownListener, claimFocus } = useFocus(
      modalRef,
      selectorPrimaryFocus
    );
    const modalRefValue = modalRef.current;
    const wide = size === 'wide';

    const presenceContext = useContext(TearsheetPresenceContext);
    const mergedRefs = useMergedRefs([modalRef, presenceContext?.presenceRef]);
    const enablePresence =
      useFeatureFlag('enable-presence') || presenceContext?.autoEnablePresence;

    // always mark as open when mounted with presence
    const open = externalOpen || enablePresence;
    const prevOpen = usePreviousValue(open);

    // Keep track of the stack depth and our position in it (1-based, 0=closed)
    const [depth, setDepth] = useState(0);
    const [position, setPosition] = useState(0);

    // Keep a record of the previous value of depth.
    const prevDepth = useRef<number | undefined>(undefined);
    useEffect(() => {
      prevDepth.current = depth;
    });

    // A "passive" tearsheet is one with no navigation actions.
    const isPassive = tearsheetIsPassive(actions);
    const effectiveHasCloseIcon = tearsheetHasCloseIcon(actions, hasCloseIcon);

    // Callback that will be called whenever the stacking order changes.
    // position is 1-based with 0 indicating closed.
    function handleStackChange(newDepth: number, newPosition: number) {
      setDepth(newDepth);
      setPosition(newPosition);
    }

    useEffect(() => {
      if (open) {
        claimFocus();
      }
    }, [open, currentStep, effectiveHasCloseIcon, claimFocus]);

    // Focus launcher button on open change for non presence tearsheet
    useEffect(() => {
      if (!enablePresence && prevOpen && !open && launcherButtonRef?.current) {
        setTimeout(() => {
          launcherButtonRef?.current?.focus();
        }, 10);
      }
    }, [enablePresence, open, prevOpen, launcherButtonRef]);

    // Focus launcher button on unmount for presence tearsheet
    useEffect(() => {
      const launcherButton = launcherButtonRef?.current;
      if (!enablePresence || !launcherButton) {
        return;
      }
      return () => {
        setTimeout(() => {
          launcherButton.focus();
        }, 10);
      };
    }, [enablePresence, launcherButtonRef]);

    useEffect(() => {
      requestAnimationFrame(() => {
        if (
          open &&
          depth === position &&
          !modalRef?.current?.contains(document.activeElement)
        ) {
          claimFocus();
        }
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [claimFocus, depth, modalRef, position]);

    useEffect(() => {
      if (hasError && !modalRef?.current?.contains(document.activeElement)) {
        claimFocus();
      }
    }, [claimFocus, hasError, modalRef]);

    useEffect(() => {
      // Other tearsheets should already be notified if this tearsheet is exiting
      const isPresent = open && !presenceContext?.isExiting;

      const notify = () =>
        stack.all.forEach((handler) => {
          handler(
            Math.min(stack.open.length, maxDepth),
            stack.open.indexOf(handler) + 1
          );
        });

      // Register this tearsheet's stack change callback/listener.
      stack.all.push(handleStackChange);
      stack.sizes.push(size);

      // If the tearsheet is mounting with open=true or open is changing from
      // false to true to open it then append its notification callback to
      // the end of the stack array (as its ID), and call all the callbacks
      // to notify all open tearsheets that the stacking has changed.
      if (isPresent) {
        stack.open.push(handleStackChange);
        notify();
      }

      // Cleanup function called whenever the tearsheet unmounts or the open
      // prop changes value (in which case it is called prior to this hook
      // being called again).
      return function cleanup() {
        // Remove the notification callback from the all handlers array.
        stack.all.splice(stack.all.indexOf(handleStackChange), 1);
        stack.sizes.splice(stack.sizes.indexOf(size), 1);

        // Remove the notification callback from the open handlers array, if
        // it's there, and notify all open tearsheets that the stacking has
        // changed (only necessary if this tearsheet was open).
        const openIndex = stack.open.indexOf(handleStackChange);
        if (openIndex >= 0) {
          stack.open.splice(openIndex, 1);
          notify();
        }
      };
    }, [open, presenceContext?.isExiting, size]);

    const areAllSameSizeVariant = () => new Set(stack.sizes).size === 1;

    useIsomorphicEffect(() => {
      const setScaleValues = () => {
        if (!areAllSameSizeVariant()) {
          return {
            [`--${bc}--stacking-scale-factor-single`]: 1,
            [`--${bc}--stacking-scale-factor-double`]: 1,
          };
        }
        return {
          [`--${bc}--stacking-scale-factor-single`]: (width - 32) / width,
          [`--${bc}--stacking-scale-factor-double`]: (width - 64) / width,
        };
      };
      if (modalRef.current) {
        Object.entries(setScaleValues()).map(([key, value]) => {
          modalRef.current.style.setProperty(key, String(value));
        });
      }
    }, [modalRef, width]);

    if (position <= depth) {
      // Include a modal header if and only if one or more of these is given.
      // We can't use a Wrap for the ModalHeader because ComposedModal requires
      // the direct child to be the ModalHeader instance.
      const includeHeader =
        label ||
        title ||
        description ||
        headerActions ||
        navigation ||
        effectiveHasCloseIcon;

      // Include an ActionSet if and only if one or more actions is given.
      const includeActions = actions && actions?.length > 0;

      const areAllSameSizeVariant = () => new Set(stack.sizes).size === 1;

      // Normalize decorator (AILabel is always size `sm`)
      const candidateIsAILabel =
        isValidElement(decorator) && decorator.type === AILabel;
      const normalizedDecorator = candidateIsAILabel
        ? cloneElement(decorator as ReactElement<any>, { size: 'sm' })
        : decorator;

      return renderPortalUse(
        <FeatureFlags enableExperimentalFocusWrapWithoutSentinels>
          <ComposedModal
            {
              // Pass through any other property values.
              ...rest
            }
            aria-label={ariaLabel || getNodeTextContent(title)}
            className={cx(bc, className, {
              [`${bc}--stacked-${position}-of-${depth}`]:
                // Don't apply this on the initial open of a single tearsheet.
                depth > 1 || (depth === 1 && (prevDepth?.current ?? 0) > 1),
              [`${bc}--wide`]: wide,
              [`${bc}--narrow`]: !wide,
              [`${bc}--has-slug`]: deprecated_slug,
              [`${bc}--has-ai-label`]:
                !!decorator && decorator['type']?.displayName === 'AILabel',
              [`${bc}--has-decorator`]:
                !!decorator && decorator['type']?.displayName !== 'AILabel',
              [`${bc}--has-close`]: effectiveHasCloseIcon,
              ['is-visible']: enablePresence,
              [`${bc}--tearsheet-enable-presence`]:
                presenceContext?.autoEnablePresence,
            })}
            containerClassName={cx(`${bc}__container`, {
              [`${bc}__container--lower`]: verticalPosition === 'lower',
              [`${bc}__container--mixed-size-stacking`]:
                !areAllSameSizeVariant(),
            })}
            {...{ onClose, open, selectorPrimaryFocus }}
            onKeyDown={keyDownListener}
            preventCloseOnClickOutside={!isPassive}
            ref={mergedRefs}
            selectorsFloatingMenus={[
              `.${carbonPrefix}--overflow-menu-options`,
              `.${carbonPrefix}--tooltip`,
              '.flatpickr-calendar',
              `.${bc}__container`,
              `.${carbonPrefix}--menu`,
              ...selectorsFloatingMenus,
            ]}
            size="sm"
            data-tearsheet-exiting={presenceContext?.isExiting || undefined}
          >
            {includeHeader && (
              <ModalHeader
                className={cx(`${bc}__header`, {
                  [`${bc}__header--with-close-icon`]: effectiveHasCloseIcon,
                  [`${bc}__header--with-nav`]: navigation,
                })}
                closeClassName={cx(`${bc}__header--no-close-icon`)}
              >
                {/* Render header actions, decorator and close button in correct DOM order for proper focus sequence */}
                {headerActions && (
                  <div className={`${bc}__header-actions`}>{headerActions}</div>
                )}
                {(decorator || deprecated_slug) && (
                  <div className={`${bc}__decorator`}>
                    {normalizedDecorator || deprecated_slug}
                  </div>
                )}
                {effectiveHasCloseIcon && (
                  <div
                    className={`${bc}__close-button ${carbonPrefix}--modal-close-button`}
                  >
                    <IconButton
                      className={`${carbonPrefix}--modal-close`}
                      label={closeIconDescription}
                      onClick={onClose}
                      align="left"
                    >
                      <Close
                        size={20}
                        aria-hidden="true"
                        tabIndex="-1"
                        className={`${carbonPrefix}--modal-close__icon`}
                      />
                    </IconButton>
                  </div>
                )}
                <Wrap
                  className={`${bc}__header-content`}
                  element={wide ? Layer : undefined}
                >
                  <Wrap className={`${bc}__header-fields`}>
                    {/* we create the label and title here instead of passing them
                      as modal header props so we can wrap them in layout divs */}
                    <Wrap className={`${bcModalHeader}__label`}>{label}</Wrap>
                    <Wrap
                      element="h3"
                      className={cx(
                        `${bcModalHeader}__heading`,
                        `${bc}__heading`
                      )}
                    >
                      {title}
                    </Wrap>
                    <Wrap className={`${bc}__header-description`}>
                      {description}
                    </Wrap>
                  </Wrap>
                </Wrap>
                <Wrap className={`${bc}__header-navigation`}>{navigation}</Wrap>
              </ModalHeader>
            )}
            <Wrap
              ref={modalBodyRef}
              className={`${carbonPrefix}--modal-content ${bc}__body`}
            >
              {/* Left influencer */}
              <Wrap
                className={cx({
                  [`${bc}__influencer`]: true,
                  [`${bc}__influencer--wide`]: influencerWidth === 'wide',
                })}
                neverRender={influencerPosition === 'right'}
                element={SectionLevel3}
              >
                <Wrap element={Layer} className={`${bc}__layer`}>
                  {influencer}
                </Wrap>
              </Wrap>
              <Wrap className={`${bc}__right`}>
                {/* Main area */}
                <Wrap className={`${bc}__main`} alwaysRender={includeActions}>
                  <Wrap
                    className={`${bc}__content`}
                    alwaysRender={
                      !!(influencer && influencerPosition === 'right')
                    }
                    element={SectionLevel3}
                  >
                    {wide ? (
                      children
                    ) : (
                      <Wrap element={Layer} className={`${bc}__layer`}>
                        {children}
                      </Wrap>
                    )}
                  </Wrap>
                  {/* Right influencer */}
                  <Wrap
                    className={cx({
                      [`${bc}__influencer`]: true,
                      [`${bc}__influencer--wide`]: influencerWidth === 'wide',
                    })}
                    neverRender={influencerPosition !== 'right'}
                    element={SectionLevel3}
                  >
                    <Wrap element={Layer} className={`${bc}__layer`}>
                      {influencer}
                    </Wrap>
                  </Wrap>
                </Wrap>
                {includeActions && (
                  <Wrap className={`${bc}__button-container`}>
                    <ActionSet
                      actions={actions}
                      buttonSize={wide ? '2xl' : undefined}
                      className={`${bc}__buttons`}
                      size={wide ? '2xl' : 'lg'}
                      aria-hidden={!open}
                    />
                  </Wrap>
                )}
              </Wrap>
            </Wrap>
            <div className={`${bc}__resize-detector`} ref={resizer} />
          </ComposedModal>
        </FeatureFlags>
      );
    } else {
      pconsole.warn('Tearsheet not rendered: maximum stacking depth exceeded.');
      return null;
    }
  }
);

// The display name of the component, used by React. Note that displayName
// is used in preference to relying on function.name.
TearsheetShell.displayName = componentName;

export const portalType =
  typeof Element === 'undefined'
    ? PropTypes.object
    : // eslint-disable-next-line ssr-friendly/no-dom-globals-in-module-scope
      PropTypes.instanceOf(Element);

export const deprecatedProps = {
  /**
   *  @deprecated Property replaced by `decorator`
   */
  slug: deprecateProp(PropTypes.node, 'Property replaced by `decorator`'),

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
// corresponding props for Tearsheet and TearsheetNarrow components.
TearsheetShell.propTypes = {
  /**
   * The actions to be shown as buttons in the action area at the bottom of the
   * tearsheet. Each action is specified as an object with optional fields
   * 'label' to supply the button label, 'kind' to select the button kind (must
   * be 'primary', 'secondary' or 'ghost'), 'loading' to display a loading
   * indicator, and 'onClick' to receive notifications when the button is
   * clicked. Additional fields in the object will be passed to the Button
   * component, and these can include 'disabled', 'ref', 'className', and any
   * other Button props. Any other fields in the object will be passed through
   * to the button element as HTML attributes.
   *
   * See https://react.carbondesignsystem.com/?path=/docs/components-button--default#component-api
   */
  /**@ts-ignore*/
  actions: PropTypes.arrayOf(
    // NB we don't include the validator here, as the component wrapping this
    // one should ensure appropriate validation is done.
    PropTypes.shape({
      /**@ts-ignore*/
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

  /**
   * The main content of the tearsheet.
   */
  children: PropTypes.node,

  /**
   * An optional class or classes to be added to the outermost element.
   */
  className: PropTypes.string,

  /**
   * The accessibility title for the close icon (if shown).
   *
   * **Note:** This prop is only required if a close icon is shown, i.e. if
   * there are a no navigation actions and/or hasCloseIcon is true.
   */
  /**@ts-ignore*/
  closeIconDescription: PropTypes.string,

  /**
   * Optional prop that allows you to pass any component.
   */
  decorator: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),

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
  /**@ts-ignore*/
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
   * progress indicator, or similar. NB the influencer is only applicable for
   * wide tearsheets.
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
  /**@ts-ignore */
  launcherButtonRef: PropTypes.any,

  /**
   * Navigation content, such as a set of tabs, to be displayed at the bottom
   * of the header area of the tearsheet. NB the navigation is only applicable
   * for wide tearsheets.
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
  /**@ts-ignore*/
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
   * Specifies the width of the tearsheet, 'narrow' or 'wide'.
   */
  /**@ts-ignore*/
  size: PropTypes.oneOf(['narrow', 'wide']).isRequired,
  /**
   * The main title of the tearsheet, displayed in the header area.
   */
  title: PropTypes.node,
  ...deprecatedProps,
};
