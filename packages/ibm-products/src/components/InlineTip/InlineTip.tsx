/**
 * Copyright IBM Corp. 2023, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Button, IconButton } from '@carbon/react';
// Other standard imports.
import { Close, Crossroads, Idea } from '@carbon/react/icons';
// Import portions of React that are needed.
import React, {
  ForwardedRef,
  PropsWithChildren,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import PropTypes from 'prop-types';
import cx from 'classnames';
import { Section, Heading } from '@carbon/react';
import { getComponentText } from './utils';
import { getDevtoolsProps } from '../../global/js/utils/devtools';
import { pkg } from '../../settings';
import uuidv4 from '../../global/js/utils/uuidv4';

// The block part of our conventional BEM class names (blockClass__E--M).
const blockClass = `${pkg.prefix}--inline-tip`;
const componentName = 'InlineTip';

// NOTE: the component SCSS is not imported here: it is rolled up separately.

// Default values for props
const defaults = {
  closeIconDescription: 'Close',
  collapsible: false,
  collapseButtonLabel: 'Read less',
  expandButtonLabel: 'Read more',
  narrow: false,
  withLeftGutter: false,
  onClick: () => {},
  onClose: () => {},
  title: 'Use case-specific heading',
};

export interface InlineTipProps {
  /**
   * Optional "call to action" ghost button or link that can appear
   * directly below the content. This component comes with pre-styled
   * elements available to use: `InlineTipLink` and `InlineTipButton`.
   */
  action?: ReactNode;
  /**
   * Provide the contents of the InlineTip.
   */
  children: ReactNode;
  /**
   * Provide an optional class to be applied to the containing node.
   */
  className?: string;
  /**
   * Tooltip text and aria label for the Close button icon.
   */
  closeIconDescription?: string;
  /**
   * The label for the collapse button.
   * This button is not visible if `media` is specified.
   */
  collapseButtonLabel?: string;
  /**
   * If set to `true`, it will truncate the body text to
   * one line and expose an expand/collapse button toggle.
   *
   * This feature is disabled if `media` is specified.
   */
  collapsible?: boolean;
  /**
   * The label for the expand button.
   * This button is not visible if `media` is specified.
   */
  expandButtonLabel?: string;
  /**
   * Optional prop to render any media like images or any animated media.
   */
  renderMedia?: () => ReactNode;
  /**
   * Set to `true` to arrange the information in a format
   * that is easier to read in a limited space.
   */

  narrow?: boolean;
  /**
   * Function to call when the tertiary button is clicked.
   */
  onClick?: () => void;
  /**
   * Function to call when the InlineTip is closed via the "X" button.
   */
  onClose?: () => void;
  /**
   * Defining the label will show a the tertiary button with the crossroads icon.
   * You will still need to define the `onClose` method to trigger a callback.
   */
  tertiaryButtonLabel?: string;
  /**
   * The title of the InlineTip.
   */
  title: string;
  /**
   * If true, insert 1 rem of "space" on the left of the component.
   * This will allow the component's content to line up with other
   * content on the page under special circumstances.
   *
   * This will only be applied when `narrow` is false.
   */
  withLeftGutter?: boolean;
}

/**
 * Inline tips are messages embedded within other components that
 * provide an ambient way to deliver learning content without
 * distracting the user from their flow.
 */
export const InlineTip = React.forwardRef(
  (
    {
      action,
      children,
      className,
      closeIconDescription = defaults.closeIconDescription,
      collapsible = defaults.collapsible,
      collapseButtonLabel = defaults.collapseButtonLabel,
      expandButtonLabel = defaults.expandButtonLabel,
      renderMedia,
      narrow = defaults.narrow,
      onClick,
      onClose,
      tertiaryButtonLabel,
      title = defaults.title,
      withLeftGutter = defaults.withLeftGutter,
      ...rest
    }: PropsWithChildren<InlineTipProps>,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const [isCollapsed, setIsCollapsed] = useState(collapsible);
    const labelId = useRef(uuidv4()).current;

    const previewText = useMemo(
      () => getComponentText(React.Children.toArray(children)),
      [children]
    );
    let childrenToRender = children;

    if (!renderMedia && collapsible && isCollapsed) {
      childrenToRender = (
        <p className={`${blockClass}__preview-text`}>{previewText}</p>
      );
    }

    // If `collapsible` is changed after initial render...
    useEffect(() => {
      setIsCollapsed(collapsible);
    }, [collapsible]);

    return (
      <Section
        {...rest}
        aria-labelledby={labelId}
        className={cx(
          blockClass,
          className,
          collapsible && `${blockClass}__collapsible`,
          isCollapsed && `${blockClass}__collapsible-collapsed`,
          renderMedia && `${blockClass}__has-media`,
          [narrow ? `${blockClass}__narrow` : `${blockClass}__wide`],
          withLeftGutter && !narrow && `${blockClass}__with-left-gutter`
        )}
        ref={ref}
        role="complementary"
        {...getDevtoolsProps(componentName)}
      >
        <div className={`${blockClass}__close-icon-wrapper`}>
          <IconButton
            className={`${blockClass}__close-icon`}
            kind="ghost"
            label={closeIconDescription}
            onClick={onClose}
            size="lg"
          >
            <Close size={16} />
          </IconButton>
        </div>

        {/* Hide the idea icon if is narrow and showing an image */}
        {((!renderMedia && narrow) || !narrow) && (
          <div className={`${blockClass}__icon-idea`} tabIndex={-1}>
            <Idea size={16} />
          </div>
        )}

        <div className={`${blockClass}__content`}>
          <Heading id={labelId} className={`${blockClass}__title`}>
            {title}
          </Heading>
          <section className={`${blockClass}__body`}>
            {childrenToRender}
            {/* Only show the secondary button when body is showing expanded content */}
            {action && (!collapsible || (collapsible && !isCollapsed)) && (
              <div className={`${blockClass}__secondary-btn`}>{action}</div>
            )}
          </section>

          {(collapsible || tertiaryButtonLabel) && (
            <footer className={`${blockClass}__footer`}>
              {/* Disable the collapsible feature if an image is visible */}
              {collapsible && !renderMedia && (
                <Button
                  className={`${blockClass}__toggle-btn`}
                  kind="ghost"
                  size="md"
                  onClick={() => {
                    setIsCollapsed((prevState) => !prevState);
                  }}
                >
                  {isCollapsed ? expandButtonLabel : collapseButtonLabel}
                </Button>
              )}
              {tertiaryButtonLabel && (
                <Button
                  className={`${blockClass}__close-btn`}
                  size="md"
                  onClick={onClick}
                  kind="tertiary"
                  renderIcon={() => <Crossroads size={16} />}
                >
                  {tertiaryButtonLabel}
                </Button>
              )}
            </footer>
          )}
        </div>
        {renderMedia && (
          <div className={`${blockClass}__media`}>{renderMedia()}</div>
        )}
      </Section>
    );
  }
);

InlineTip.displayName = componentName;

InlineTip.propTypes = {
  /**
   * Optional "call to action" ghost button or link that can appear
   * directly below the content. This component comes with pre-styled
   * elements available to use: `InlineTipLink` and `InlineTipButton`.
   */
  action: PropTypes.node,
  /**
   * Provide the contents of the InlineTip.
   */
  children: PropTypes.node.isRequired,
  /**
   * Provide an optional class to be applied to the containing node.
   */
  className: PropTypes.string,
  /**
   * Tooltip text and aria label for the Close button icon.
   */
  closeIconDescription: PropTypes.string,
  /**
   * The label for the collapse button.
   * This button is not visible if `media` is specified.
   */
  collapseButtonLabel: PropTypes.string,
  /**
   * If set to `true`, it will truncate the body text to
   * one line and expose an expand/collapse button toggle.
   *
   * This feature is disabled if `media` is specified.
   */
  collapsible: PropTypes.bool,
  /**
   * The label for the expand button.
   * This button is not visible if `media` is specified.
   */
  expandButtonLabel: PropTypes.string,

  /**
   * Set to `true` to arrange the information in a format
   * that is easier to read in a limited space.
   */
  narrow: PropTypes.bool,
  /**
   * Function to call when the tertiary button is clicked.
   */
  onClick: PropTypes.func,
  /**
   * Function to call when the InlineTip is closed via the "X" button.
   */
  onClose: PropTypes.func,
  /**
   * Optional prop to render any media like images or animated media.
   */
  renderMedia: PropTypes.func,
  /**
   * Defining the label will show a the tertiary button with the crossroads icon.
   * You will still need to define the `onClose` method to trigger a callback.
   */
  tertiaryButtonLabel: PropTypes.string,
  /**
   * The title of the InlineTip.
   */
  title: PropTypes.string.isRequired,
  /**
   * If true, insert 1 rem of "space" on the left of the component.
   * This will allow the component's content to line up with other
   * content on the page under special circumstances.
   *
   * This will only be applied when `narrow` is false.
   */
  withLeftGutter: PropTypes.bool,
};
