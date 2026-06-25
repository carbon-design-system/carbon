/**
 * Copyright IBM Corp. 2021, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as carbonMotion from '@carbon/motion';

import {
  ChevronDown,
  Locked,
  WarningAltFilled,
  WarningFilled,
} from '@carbon/react/icons';
import { Heading, Layer, Section, Toggle } from '@carbon/react';
import React, { MouseEvent, ReactNode, useRef, useState } from 'react';
import { CarbonIconType } from '@carbon/icons-react/lib/CarbonIcon';
import { useNoInteractiveChildren } from '@carbon/utilities-react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { getDevtoolsProps } from '../../global/js/utils/devtools';
import { pkg } from '../../settings';
import {
  useControllableState,
  usePrefersReducedMotion,
} from '../../global/js/hooks';
import uuidv4 from '../../global/js/utils/uuidv4';

const blockClass = `${pkg.prefix}--options-tile`;
const componentName = 'OptionsTile';

export interface OptionsTileProps {
  /**
   * Provide content to render as expandable OptionsTile. If no children
   * are present, the OptionsTile will render as its variant.
   */
  children?: ReactNode;

  /**
   * Provide an optional class to be applied to the containing node.
   */
  className?: string;

  /**
   * Whether the toggle is enabled or disabled. If nothing is passed,
   * no toggle will be rendered.
   */
  enabled?: boolean;

  /**
   * Whether the OptionsTile is in invalid validation state.
   */
  invalid?: boolean;

  /**
   * Provide a text explaining why the OptionsTile is in invalid state.
   */
  invalidText?: string;

  /**
   * Whether the OptionsTile is in locked validation state.
   */
  locked?: boolean;

  /**
   * Provide a text explaining why the OptionsTile is in locked state.
   */
  lockedText?: string;

  /**
   * A handler for managing the controlled state of open prop. If not passed the open prop will not be honored and an uncontrolled state will be used.
   */
  onChange?: (value: boolean) => void;

  /**
   * Provide a function which will be called each time the user
   * interacts with the toggle.
   */
  onToggle?: (value: boolean) => void;

  /**
   * For controlled usage of the tile open state. This prop only works when an onChange prop is also passed, otherwise an uncontrolled state is used.
   */
  open?: boolean;

  /**
   * Define the size of the OptionsTile.
   */
  size?: 'lg' | 'xl';

  /**
   * Optionally provide a text summarizing the current state of the content.
   */
  summary?: string;

  /**
   * Provide the title for this OptionsTile. Must not contain any interactive elements.
   */
  title: ReactNode;

  /**
   * Optionally provide an id which should be used for the title.
   */
  titleId?: string;

  /**
   * Whether the OptionsTile is in warning validation state.
   */
  warn?: boolean;

  /**
   * Provide a text explaining why the OptionsTile is in warning state.
   */
  warnText?: string;
}

// Default values for props
const defaults = {
  size: 'lg' as const,
};

export const OptionsTile = React.forwardRef<HTMLDivElement, OptionsTileProps>(
  (props, ref) => {
    const {
      children,
      className,
      enabled,
      invalid,
      invalidText,
      locked,
      lockedText,
      onChange,
      onToggle,
      open: userOpen,
      size = defaults.size,
      summary,
      title,
      titleId: userDefinedTitleId,
      warn,
      warnText,
      ...rest
    } = props;
    const [closing, setClosing] = useState(false);
    const [open, setOpen] = useControllableState(userOpen ?? false, onChange);

    const detailsRef = useRef<HTMLDetailsElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);

    useNoInteractiveChildren(headingRef);

    const titleId = userDefinedTitleId ?? `${uuidv4()}-title`;
    const isExpandable = children !== undefined;
    const isWarn = !invalid && warn;
    const isLocked = !invalid && !isWarn && locked;
    const shouldReduceMotion = usePrefersReducedMotion();

    const expand = () => {
      if (detailsRef.current && contentRef.current && !shouldReduceMotion) {
        setOpen(true);

        detailsRef.current.open = true;
        const { paddingTop, paddingBottom, height } = getComputedStyle(
          contentRef.current
        );

        contentRef.current.animate(
          [
            {
              paddingTop: 0,
              paddingBottom: 0,
              height: 0,
              opacity: 0,
              overflow: 'hidden',
            },
            {
              paddingTop,
              paddingBottom,
              height,
              opacity: 1,
              overflow: 'hidden',
            },
          ],
          {
            duration: Number(carbonMotion.moderate01.replace('ms', '')),
            easing: carbonMotion.easings.entrance.productive,
          }
        );
      } else {
        setOpen(true);
      }
    };

    const collapse = () => {
      if (contentRef.current && !shouldReduceMotion) {
        setClosing(true);

        const { paddingTop, paddingBottom, height } = getComputedStyle(
          contentRef.current
        );

        const animationDuration = Number(
          carbonMotion.moderate01.replace('ms', '')
        );

        const animation = contentRef.current.animate(
          [
            {
              paddingTop,
              paddingBottom,
              height,
              opacity: 1,
            },
            {
              paddingTop: 0,
              paddingBottom: 0,
              height: 0,
              opacity: 0,
            },
          ],
          {
            duration: animationDuration,
            easing: carbonMotion.easings.entrance.productive,
          }
        );

        const callback = () => {
          setOpen(false);
          setClosing(false);
        };

        setTimeout(() => {
          callback();
        }, animationDuration * 0.9);
        animation.oncancel = callback;
      } else {
        setOpen(false);
      }
    };

    const handleSummaryClick = (evt: React.MouseEvent<HTMLElement>) => {
      // Check if the click originated from the toggle button
      const target = evt.target as HTMLElement;
      const toggleContainer = target.closest(
        `.${blockClass}__toggle-container`
      );

      // If click is on toggle button, don't handle expand/collapse
      if (toggleContainer) {
        evt.preventDefault();
        evt.stopPropagation();
        return;
      }

      // Prevent default details toggle behavior
      evt.preventDefault();

      if (open) {
        collapse();
      } else {
        expand();
      }
    };

    const renderTitle = () => {
      let Icon: CarbonIconType | null = null;
      let text = summary;

      if (invalid) {
        Icon = WarningFilled;
        text = invalidText;
      } else if (warn) {
        Icon = WarningAltFilled;
        text = warnText;
      } else if (locked) {
        Icon = Locked;
        if (!text) {
          text = lockedText;
        }
      }

      const hasValidationState = invalid || warn || locked;
      const summaryHidden = !hasValidationState && enabled === false;
      const summaryClasses = cx(`${blockClass}__summary`, {
        [`${blockClass}__summary--closing`]: closing,
        [`${blockClass}__summary--open`]: open,
        [`${blockClass}__summary--invalid`]: invalid,
        [`${blockClass}__summary--warn`]: warn,
        [`${blockClass}__summary--locked`]: locked,
        [`${blockClass}__summary--hidden`]: summaryHidden,
      });

      return (
        <div className={`${blockClass}__heading`}>
          <Heading
            ref={headingRef}
            id={titleId}
            className={`${blockClass}__title`}
          >
            {title}
          </Heading>
          {text && (
            <span className={summaryClasses} aria-hidden={summaryHidden}>
              {Icon && <Icon size={16} />}
              <span className={`${blockClass}__summary-text`}>{text}</span>
            </span>
          )}
        </div>
      );
    };

    return (
      <Section
        {...rest}
        className={cx(blockClass, className, `${blockClass}--${size}`, {
          [`${blockClass}--closing`]: closing,
        })}
        ref={ref}
        {...getDevtoolsProps(componentName)}
      >
        {isExpandable ? (
          <details
            className={`${blockClass}__details`}
            open={open}
            ref={detailsRef}
          >
            <summary
              className={cx(`${blockClass}__header`, {
                [`${blockClass}__header--has-toggle`]: enabled !== undefined,
              })}
              onClick={handleSummaryClick}
              data-testid="options-tile-header"
            >
              {enabled !== undefined && (
                // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                <div
                  className={`${blockClass}__toggle-container`}
                  data-testid="options-tile-toggle-container"
                  onMouseDown={(evt) => {
                    evt.preventDefault();
                  }}
                >
                  <Toggle
                    id={`${titleId}-toggle`}
                    className={`${blockClass}__toggle`}
                    toggled={enabled}
                    aria-labelledby={titleId}
                    hideLabel
                    onToggle={onToggle}
                    size="sm"
                    disabled={isLocked}
                  />
                </div>
              )}
              <ChevronDown
                size={16}
                className={cx(`${blockClass}__chevron`, {
                  [`${blockClass}__chevron--open`]: open,
                  [`${blockClass}__chevron--closing`]: closing,
                })}
              />
              {renderTitle()}
            </summary>
            <div
              className={`${blockClass}__content`}
              ref={contentRef}
              data-testid="options-tile-content"
            >
              <Layer>
                {isLocked && (
                  <p className={`${blockClass}__locked-text`}>
                    <Locked size={16} />
                    {lockedText}
                  </p>
                )}
                {children}
              </Layer>
            </div>
          </details>
        ) : (
          <div className={`${blockClass}__static-content`}>{renderTitle()}</div>
        )}
      </Section>
    );
  }
);

// Return a placeholder if not released and not enabled by feature flag

// The display name of the component, used by React. Note that displayName
// is used in preference to relying on function.name.
OptionsTile.displayName = componentName;

// The types and DocGen commentary for the component props,
// in alphabetical order (for consistency).
// See https://www.npmjs.com/package/prop-types#usage.
OptionsTile.propTypes = {
  /**
   * Provide content to render as expandable OptionsTile. If no children
   * are present, the OptionsTile will render as its variant.
   */
  children: PropTypes.node,

  /**
   * Provide an optional class to be applied to the containing node.
   */
  className: PropTypes.string,

  /**
   * Whether the toggle is enabled or disabled. If nothing is passed,
   * no toggle will be rendered.
   */
  enabled: PropTypes.bool,

  /**
   * Whether the OptionsTile is in invalid validation state.
   */
  invalid: PropTypes.bool,

  /**
   * Provide a text explaining why the OptionsTile is in invalid state.
   */
  invalidText: PropTypes.string,

  /**
   * Whether the OptionsTile is in locked validation state.
   */
  locked: PropTypes.bool,

  /**
   * Provide a text explaining why the OptionsTile is in locked state.
   */
  lockedText: PropTypes.string,

  /**
   * A handler for managing the controlled state of open prop. If not passed the open prop will not be honored and an uncontrolled state will be used.
   */
  onChange: PropTypes.func,

  /**
   * Provide a function which will be called each time the user
   * interacts with the toggle.
   */
  onToggle: PropTypes.func,

  /**
   * For controlled usage of the tile open state. This prop only works when an onChange prop is also passed, otherwise an uncontrolled state is used.
   */
  open: PropTypes.bool,

  /**
   * Define the size of the OptionsTile.
   */
  size: PropTypes.oneOf(['lg', 'xl']),

  /**
   * Optionally provide a text summarizing the current state of the content.
   */
  summary: PropTypes.string,

  /**
   * Provide the title for this OptionsTile. Must not contain any interactive elements.
   */
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,

  /**
   * Optionally provide an id which should be used for the title.
   */
  titleId: PropTypes.string,

  /**
   * Whether the OptionsTile is in warning validation state.
   */
  warn: PropTypes.bool,

  /**
   * Provide a text explaining why the OptionsTile is in warning state.
   */
  warnText: PropTypes.string,
};
