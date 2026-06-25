/**
 * Copyright IBM Corp. 2023, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  forwardRef,
  useRef,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import pconsole from '../../global/js/utils/pconsole';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Idea } from '@carbon/react/icons';
import { Button, Tooltip } from '@carbon/react';
import { getDevtoolsProps } from '../../global/js/utils/devtools';
import { pkg /*, carbon */ } from '../../settings';
import { createPortal } from 'react-dom';
import { CoachmarkHeader } from '../Coachmark/CoachmarkHeader';
import { useIsomorphicEffect } from '../../global/js/hooks';
import { ButtonProps } from '@carbon/react';

type TooltipAlignment = 'top' | 'bottom';
interface CoachmarkStackHomeProps {
  /**
   * Optional class name for this component.
   */
  className?: string;
  /**
   * The label for the button that will close the stack
   */
  closeButtonLabel?: string;
  /**
   * The description of the Coachmark.
   */
  description: React.ReactNode;
  /**
   * If the stack home is open.
   */
  isOpen: boolean;

  /**
   * Optional prop to render any media like images or any animated media.
   */
  renderMedia?: (params) => ReactNode;

  /**
   * The labels used to link to the stackable Coachmarks.
   */
  navLinkLabels: string[];
  /**
   * For internal use only by CoachmarkStack and CoachmarkStackHome.
   */
  onClickNavItem: (index: number) => void;
  /**
   * Function to call when the stack closes.
   */
  onClose: () => void;
  /**
   * By default, the CoachmarkStackHome will be appended to the end of `document.body`.
   * The CoachmarkStackHome will remain persistent as the user navigates the app until
   * the user closes the CoachmarkStackHome.
   *
   * Alternatively, the app developer can tightly couple the CoachmarkStackHome to a DOM
   * element or other component by specifying a CSS selector. The CoachmarkStackHome will
   * remain visible as long as that element remains visible or mounted. When the
   * element is hidden or component is unmounted, the CoachmarkStackHome will disappear.
   */
  portalTarget?: string;
  /**
   * The title of the Coachmark.
   */
  title: string;
  /**
   * Label's tooltip position
   */
  tooltipAlign?: TooltipAlignment;
}

// Carbon and package components we use.
/* TODO: @import(s) of carbon components and other package components. */

// The block part of our conventional BEM class names (blockClass__E--M).
const blockClass = `${pkg.prefix}--coachmark-stacked-home`;
const overlayClass = `${pkg.prefix}--coachmark-overlay`;
const componentName = 'CoachmarkStackHome';

/**
 * DO NOT USE. This component is for the exclusive use
 * of other Onboarding components.
 */
export const CoachmarkStackHome = forwardRef<
  HTMLDivElement,
  CoachmarkStackHomeProps
>(
  (
    {
      className,
      description,
      isOpen,
      renderMedia,
      navLinkLabels,
      onClickNavItem,
      onClose,
      portalTarget,
      closeButtonLabel,
      title,
      tooltipAlign,
      ...rest
    },
    ref
  ) => {
    const buttonFocusRef = useRef<ButtonProps<React.ElementType> | null>(null);
    const [linkFocusIndex, setLinkFocusIndex] = useState(0);
    const navItemRefs = useRef<(HTMLLIElement | null)[]>([]);
    const [overflowStates, setOverflowStates] = useState<boolean[]>([]);

    useEffect(() => {
      setTimeout(() => {
        if (isOpen && buttonFocusRef.current) {
          buttonFocusRef.current.focus();
        }
      }, 100);
    }, [isOpen]);

    const portalNode = useRef<Element | null>(null);

    useIsomorphicEffect(() => {
      portalNode.current = portalTarget
        ? (document?.querySelector(portalTarget) ??
          document?.querySelector('body'))
        : document?.querySelector('body');
    }, [portalTarget]);

    if (!navLinkLabels) {
      return pconsole.warn(
        `${componentName} is an Onboarding internal component and is not intended for general use.`
      );
    }

    const itemRefHandler = (index, node) => {
      if (node && navItemRefs.current[index] !== node) {
        const isOverflowing = node.scrollWidth > node.clientWidth;
        navItemRefs.current[index] = node;
        setOverflowStates((prev) => {
          const newState = [...prev];
          newState[index] = isOverflowing;
          return newState;
        });
      }
    };

    function renderNavLink(
      index,
      label,
      ref: React.RefObject<ButtonProps<React.ElementType>> | null = null
    ) {
      const isOverflowing = overflowStates[index] ?? false;

      return (
        <li
          key={index}
          ref={(node) => {
            itemRefHandler(index, node);
          }}
        >
          <Button
            kind="ghost"
            size="sm"
            onClick={() => {
              setLinkFocusIndex(index);
              onClickNavItem(index + 1);
            }}
            ref={ref}
          >
            {isOverflowing ? (
              <Tooltip
                highContrast={false}
                label={label}
                align={tooltipAlign}
                className={`${blockClass}__navLinkLabels-tooltip`}
              >
                <span className={`${blockClass}__navLinkLabels-text`}>
                  {label}
                </span>
              </Tooltip>
            ) : (
              label
            )}
          </Button>
        </li>
      );
    }

    return portalNode?.current
      ? createPortal(
          <div
            {
              // Pass through any other property values as HTML attributes.
              ...rest
            }
            className={cx(blockClass, className)}
            ref={ref}
            {...getDevtoolsProps(componentName)}
          >
            <CoachmarkHeader
              onClose={() => {
                setLinkFocusIndex(0);
                onClose();
              }}
            />
            <div className={`${overlayClass}__body`}>
              <div className={`${overlayClass}-element`}>
                {!renderMedia && (
                  <Idea size={20} className={`${blockClass}__icon-idea`} />
                )}

                {renderMedia && (
                  <div className={`${blockClass}__element-stepped-media`}>
                    {renderMedia({ playStep: 0 })}
                  </div>
                )}

                <div className={`${overlayClass}-element__content`}>
                  {title && (
                    <h2 className={`${overlayClass}-element__title`}>
                      {title}
                    </h2>
                  )}
                  {description && (
                    <p className={`${overlayClass}-element__body`}>
                      {description}
                    </p>
                  )}
                </div>

                <ul className={`${blockClass}__nav-links`}>
                  {navLinkLabels.map((label, index) => {
                    if (index === linkFocusIndex) {
                      return renderNavLink(
                        index,
                        label,
                        buttonFocusRef as React.RefObject<
                          ButtonProps<React.ElementType>
                        >
                      );
                    }
                    return renderNavLink(index, label);
                  })}
                </ul>
                {closeButtonLabel && (
                  <div className={`${overlayClass}__footer`}>
                    <Button
                      size="sm"
                      onClick={() => {
                        setLinkFocusIndex(0);
                        onClose();
                      }}
                    >
                      {closeButtonLabel}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>,
          portalNode?.current
        )
      : null;
  }
);

// The display name of the component, used by React. Note that displayName
// is used in preference to relying on function.name.
CoachmarkStackHome.displayName = componentName;

// The types and DocGen commentary for the component props,
// in alphabetical order (for consistency).
// See https://www.npmjs.com/package/prop-types#usage.
CoachmarkStackHome.propTypes = {
  /**
   * Optional class name for this component.
   */
  className: PropTypes.string,
  /**
   * The label for the button that will close the stack
   */
  closeButtonLabel: PropTypes.string,
  /**
   * The description of the Coachmark.
   */
  description: PropTypes.node.isRequired,
  /**
   * If the stack home is open.
   */
  isOpen: PropTypes.bool.isRequired,

  /**
   * The labels used to link to the stackable Coachmarks.
   */
  navLinkLabels: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  /**
   * For internal use only by CoachmarkStack and CoachmarkStackHome.
   */
  onClickNavItem: PropTypes.func.isRequired,
  /**
   * Function to call when the stack closes.
   */
  onClose: PropTypes.func.isRequired,
  /**
   * By default, the CoachmarkStackHome will be appended to the end of `document.body`.
   * The CoachmarkStackHome will remain persistent as the user navigates the app until
   * the user closes the CoachmarkStackHome.
   *
   * Alternatively, the app developer can tightly couple the CoachmarkStackHome to a DOM
   * element or other component by specifying a CSS selector. The CoachmarkStackHome will
   * remain visible as long as that element remains visible or mounted. When the
   * element is hidden or component is unmounted, the CoachmarkStackHome will disappear.
   */
  portalTarget: PropTypes.string,
  /**
   * Optional prop to render any media like images or animated media.
   */
  renderMedia: PropTypes.func,

  /**
   * The title of the Coachmark.
   */
  title: PropTypes.string.isRequired,
  /**
   * Label's tooltip position
   */
  tooltipAlign: PropTypes.oneOf(['top', 'bottom']),
};
