/**
 * Copyright IBM Corp. 2021, 2026
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
} from '@carbon/icons-react';
import React, { ReactNode, useRef, useState } from 'react';
import { CarbonIconType } from '@carbon/icons-react/lib/CarbonIcon';
import { Heading, Section } from '../Heading';
import { Layer } from '../Layer';
import Toggle from '../Toggle';
import cx from 'classnames';
import { useControllableState } from '../../internal/useControllableState';
import { useFallbackId } from '../../internal/useId';
import { useNoInteractiveChildren } from '../../internal/useNoInteractiveChildren';
import { usePrefix } from '../../internal/usePrefix';
import { usePrefersReducedMotion } from '../../internal/usePrefersReducedMotion';

const componentName = 'OptionsTile';

export interface OptionsTileActionRendererArgs {
  /**
   * The size of the OptionsTile, so the rendered action can match it.
   */
  size: 'lg' | 'xl';

  /**
   * The id of the OptionsTile title, to label the rendered action with
   * `aria-labelledby`.
   */
  titleId: string;
}

export interface OptionsTileProps {
  /**
   * Render custom content, such as a dropdown, icon buttons or a date picker,
   * at the end of the header. When it returns content, it is rendered in place
   * of the toggle and `enabled` is ignored.
   */
  actionRenderer?: (args: OptionsTileActionRendererArgs) => ReactNode;

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
   * A handler for managing the controlled state of open prop. If not passed
   * the open prop will not be honored and an uncontrolled state will be used.
   */
  onChange?: (value: boolean) => void;

  /**
   * Provide a function which will be called each time the user
   * interacts with the toggle.
   */
  onToggle?: (value: boolean) => void;

  /**
   * For controlled usage of the tile open state. This prop only works when an
   * onChange prop is also passed, otherwise an uncontrolled state is used.
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
   * Provide the title for this OptionsTile. Must not contain any interactive
   * elements.
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

const duration = parseInt(carbonMotion.moderate01, 10);
const easing = carbonMotion.easings.entrance.productive;
const collapsedFrame = {
  paddingTop: 0,
  paddingBottom: 0,
  height: 0,
  opacity: 0,
};

export const OptionsTile = React.forwardRef<HTMLDivElement, OptionsTileProps>(
  (props, ref) => {
    const {
      actionRenderer,
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
      size = 'lg',
      summary,
      title,
      titleId: userDefinedTitleId,
      warn,
      warnText,
      ...rest
    } = props;

    const prefix = usePrefix();
    const blockClass = `${prefix}--options-tile`;

    const [closing, setClosing] = useState(false);
    const [open, setOpen] = useControllableState({
      defaultValue: userOpen ?? false,
      onChange,
      value: onChange ? userOpen : undefined,
    });

    const contentRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);

    useNoInteractiveChildren(headingRef);

    const titleId = useFallbackId(userDefinedTitleId);
    const contentId = `${titleId}-content`;
    const isExpandable = children !== undefined;
    const isLocked = !invalid && !warn && locked;
    const shouldReduceMotion = usePrefersReducedMotion();

    // A custom action replaces the toggle; the toggle renders only when
    // `enabled` is set and `actionRenderer` returns nothing.
    const customAction = actionRenderer?.({ size, titleId });
    const action =
      customAction != null && customAction !== false ? (
        customAction
      ) : enabled !== undefined ? (
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
      ) : null;
    const actionNode = action && (
      <Layer
        className={`${blockClass}__action`}
        data-testid="options-tile-action">
        {action}
      </Layer>
    );

    const expand = () => {
      setOpen(true);
      const content = contentRef.current;
      if (!content || shouldReduceMotion) {
        return;
      }

      // Unhide now so the final size can be measured before React re-renders.
      content.hidden = false;
      const { paddingTop, paddingBottom, height } = getComputedStyle(content);
      content.animate(
        [
          { ...collapsedFrame, overflow: 'hidden' },
          { paddingTop, paddingBottom, height, opacity: 1, overflow: 'hidden' },
        ],
        { duration, easing }
      );
    };

    const collapse = () => {
      const content = contentRef.current;
      if (!content || shouldReduceMotion) {
        setOpen(false);
        return;
      }

      setClosing(true);
      const { paddingTop, paddingBottom, height } = getComputedStyle(content);
      const animation = content.animate(
        [{ paddingTop, paddingBottom, height, opacity: 1 }, collapsedFrame],
        { duration, easing }
      );
      const finish = () => {
        setOpen(false);
        setClosing(false);
      };
      setTimeout(finish, duration * 0.9);
      animation.oncancel = finish;
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
        // The static variant always shows lockedText. The expandable variant
        // keeps the summary and shows lockedText in the content instead.
        if (!isExpandable || !text) {
          text = lockedText;
        }
      }

      // The summary hides while open, unless a validation state is shown.
      const summaryHidden = !(invalid || warn || locked) && open;
      const summaryClasses = cx(`${blockClass}__summary`, {
        [`${blockClass}__summary--open`]: open && !closing,
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
            className={`${blockClass}__title`}>
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
        data-component-name={componentName}>
        {isExpandable ? (
          <div className={`${blockClass}__details`}>
            <div
              className={`${blockClass}__header`}
              data-testid="options-tile-header">
              <button
                type="button"
                className={`${blockClass}__chevron-button`}
                aria-expanded={open}
                aria-controls={contentId}
                aria-labelledby={titleId}
                onClick={open ? collapse : expand}>
                <ChevronDown
                  size={16}
                  className={cx(`${blockClass}__chevron`, {
                    [`${blockClass}__chevron--open`]: open && !closing,
                  })}
                />
              </button>
              {renderTitle()}
              {actionNode}
            </div>
            <div
              className={`${blockClass}__content`}
              id={contentId}
              ref={contentRef}
              hidden={!open}
              data-testid="options-tile-content">
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
          </div>
        ) : (
          <div className={`${blockClass}__static-content`}>
            {renderTitle()}
            {actionNode}
          </div>
        )}
      </Section>
    );
  }
);

OptionsTile.displayName = componentName;
