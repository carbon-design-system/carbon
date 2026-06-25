/**
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Button, OverflowMenu, OverflowMenuItem, Theme } from '@carbon/react';
// Carbon and package components we use.
import { Close, Help } from '@carbon/react/icons';
// Import portions of React that are needed.
import React, {
  ForwardedRef,
  MutableRefObject,
  PropsWithChildren,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

// Other standard imports.
import PropTypes from 'prop-types';
import cx from 'classnames';
import { getDevtoolsProps } from '../../global/js/utils/devtools';
import { pkg } from '../../settings';
import { useWebTerminal } from './hooks';
import { usePrefersReducedMotion } from '../../global/js/hooks';

// The block part of our conventional BEM class names (blockClass__E--M).
const componentName = 'WebTerminal';
const blockClass = `${pkg.prefix}--web-terminal`;

// Default values for props
const defaults = {
  actions: Object.freeze([]),
  documentationLinks: Object.freeze([]),
  documentationLinksIconDescription: 'Show documentation links',
  isInitiallyOpen: false,
  webTerminalAriaLabel: 'Web terminal header',
};

interface Action {
  renderIcon?: React.ElementType;
  onClick: () => void;
  iconDescription: string;
}

export interface WebTerminalProps extends PropsWithChildren {
  /**
   * Provide your own terminal component as children to show up in the web terminal
   */
  children: ReactNode;
  /**
   * An array of actions to be displayed in the web terminal header bar
   */
  actions?: readonly Action[];

  /**
   * Custom classname for additional styling of the web terminal
   */
  className?: string;

  /**
   * Icon description for the close button
   */
  closeIconDescription: string;

  /**
   * Array of objects for each documentation link. Each documentation link uses the prop types of OverflowMenuItems. See more: https://react.carbondesignsystem.com/?path=/docs/components-overflowmenu--default
   */
  documentationLinks?: readonly (typeof OverflowMenuItem)[];

  /**
   * Description for the documentation link overflow menu tooltip
   */
  documentationLinksIconDescription?: string;

  /**
   * Optionally pass if the web terminal should be open by default
   */
  isInitiallyOpen?: boolean;

  /**
   * Specifies aria label for Web terminal
   */
  webTerminalAriaLabel?: string;
}

interface HTMLElementStyled extends HTMLDivElement {
  style: CSSStyleDeclaration;
}

/**
 * The `WebTerminal` is prompted by the user and is persistent until dismissed. The purpose of a web terminal is to provide users with the ability to type commands manually instead of using the GUI.
 */
export const WebTerminal = React.forwardRef(
  (
    {
      // The component props, in alphabetical order (for consistency).

      actions = defaults.actions,
      children,
      className,
      closeIconDescription,
      documentationLinks = defaults.documentationLinks,
      documentationLinksIconDescription = defaults.documentationLinksIconDescription,
      isInitiallyOpen = defaults.isInitiallyOpen,
      webTerminalAriaLabel = defaults.webTerminalAriaLabel,
      // Collect any other property values passed in.
      ...rest
    }: WebTerminalProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const localRef = useRef<HTMLDivElement>(null);
    const webTerminalRef = (ref ??
      localRef) as MutableRefObject<HTMLElementStyled>;

    const { open, closeWebTerminal, openWebTerminal } = useWebTerminal();

    const [shouldRender, setRender] = useState(open);
    const shouldReduceMotion = usePrefersReducedMotion();

    const showDocumentationLinks = useMemo(
      () => documentationLinks.length > 0,
      [documentationLinks]
    );

    useEffect(() => {
      if (open) {
        setRender(true);
      }
    }, [open]);

    /**
      On render, check if user want's the web terminal to be open by default
    */
    useEffect(() => {
      if (isInitiallyOpen) {
        openWebTerminal?.();
      }
    }, []); // eslint-disable-line

    /**
      When the web terminal slide in animation is complete, sets render to false.
    */
    const onAnimationEnd = () => {
      if (!open) {
        setRender(false);
      }
    };

    const handleCloseTerminal = () => {
      /**
        If the user prefers reduced motion, we have to manually set render to false
        because onAnimationEnd will never be called.
      */
      if (shouldReduceMotion) {
        setRender(false);
      }
      closeWebTerminal?.();
    };

    return shouldRender ? (
      <div
        {...{
          // Pass through any other property values as HTML attributes.
          ...rest,
          ...getDevtoolsProps(componentName),
        }}
        ref={webTerminalRef}
        className={cx([
          blockClass,
          className,
          {
            [`${blockClass}--open`]: open,
            [`${blockClass}--closed`]: !open,
          },
        ])}
        onAnimationEnd={onAnimationEnd}
      >
        <header
          aria-label={webTerminalAriaLabel}
          className={`${blockClass}__bar`}
        >
          <div className={`${blockClass}__actions`}>
            {showDocumentationLinks && (
              <OverflowMenu
                renderIcon={(props) => <Help size={16} {...props} />}
                iconDescription={documentationLinksIconDescription}
                aria-label={documentationLinksIconDescription}
                menuOptionsClass={`${blockClass}__documentation-overflow`}
                size="lg"
              >
                {documentationLinks.map(({ ...rest }, i) => (
                  <OverflowMenuItem key={i} {...rest} />
                ))}
              </OverflowMenu>
            )}
            {actions.map(({ renderIcon, onClick, iconDescription }) => (
              <Button
                key={iconDescription}
                hasIconOnly
                renderIcon={renderIcon}
                onClick={onClick}
                iconDescription={iconDescription}
                kind="ghost"
                aria-label={iconDescription}
              />
            ))}
          </div>
          <Button
            hasIconOnly
            renderIcon={(props) => <Close size={16} {...props} />}
            kind="ghost"
            iconDescription={closeIconDescription}
            onClick={handleCloseTerminal}
            onAnimationEnd={(event) => event.stopPropagation()}
          />
        </header>
        <Theme theme="g100">
          <div className={`${blockClass}__body`}>{children}</div>
        </Theme>
      </div>
    ) : null;
  }
);

// Return a placeholder if not released and not enabled by feature flag

// The display name of the component, used by React. Note that displayName
// is used in preference to relying on function.name.
WebTerminal.displayName = componentName;

// The types and DocGen commentary for the component props,
// in alphabetical order (for consistency).
// See https://www.npmjs.com/package/prop-types#usage.
WebTerminal.propTypes = {
  /**
   * An array of actions to be displayed in the web terminal header bar
   */
  /**@ts-ignore */
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      renderIcon: PropTypes.func.isRequired,
      onClick: PropTypes.func.isRequired,
      iconDescription: PropTypes.string.isRequired,
    })
  ),

  /**
   * Provide your own terminal component as children to show up in the web terminal
   */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,

  /**
   * Custom classname for additional styling of the web terminal
   */
  className: PropTypes.string,

  /**
   * Icon description for the close button
   */
  closeIconDescription: PropTypes.string.isRequired,

  /**
   * Array of objects for each documentation link. Each documentation link uses the prop types of OverflowMenuItems. See more: https://react.carbondesignsystem.com/?path=/docs/components-overflowmenu--default
   */
  /**@ts-ignore */
  documentationLinks: PropTypes.arrayOf(
    PropTypes.shape({
      ...OverflowMenuItem.propTypes,
    })
  ),

  /**
   * Description for the documentation link overflow menu tooltip
   */
  documentationLinksIconDescription: PropTypes.string,

  /**
   * Optionally pass if the web terminal should be open by default
   */
  isInitiallyOpen: PropTypes.bool,

  /**
   * Specifies aria label for Web terminal
   */
  webTerminalAriaLabel: PropTypes.string,
};
