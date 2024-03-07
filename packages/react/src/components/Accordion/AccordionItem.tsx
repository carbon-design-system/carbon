/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ChevronRight } from '@carbon/icons-react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React, {
  AnimationEventHandler,
  AriaAttributes,
  KeyboardEvent,
  MouseEventHandler,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  useContext,
  useState,
} from 'react';
import { Text } from '../Text';
import { match, keys } from '../../internal/keyboard';
import { useId } from '../../internal/useId';
import deprecate from '../../prop-types/deprecate';
import { usePrefix } from '../../internal/usePrefix';
import { AccordionContext } from './AccordionProvider';

interface AccordionItemProps {
  /**
   * Specify an optional className to be
   * applied to the container node.
   */
  className?: string;

  /**
   * Specify whether an individual `AccordionItem` should
   * be disabled (overrides the parent accordion state). If undefined,
   * this value will be managed by the parent Accordion.
   */
  disabled?: boolean;

  /**
   * The handler of the massaged `click` event.
   */
  onClick?: MouseEventHandler<HTMLLIElement>;

  /**
   * The handler of the massaged `click` event on
   * the heading.
   */
  onHeadingClick?: ({
    isOpen,
    event,
  }: {
    isOpen: boolean;
    event: Parameters<MouseEventHandler<HTMLButtonElement>>[0];
  }) => void;

  /**
   * `true` to open the expand.
   */
  open?: boolean;

  /**
   * @deprecated This prop has been deprecated and will be
   * removed in the next major release of Carbon. Use the
   * `renderToggle` prop instead.
   */
  renderExpando?: (
    props: PropsWithChildren<AccordionToggleProps>
  ) => ReactElement;

  /**
   * The callback function to render the expand button.
   * Can be a React component class.
   */
  renderToggle?: (
    props: PropsWithChildren<AccordionToggleProps>
  ) => ReactElement;

  /**
   * The accordion title.
   */
  title?: ReactNode;

  /**
   * The callback function to run on the `onAnimationEnd`
   * event for the list item.
   */
  handleAnimationEnd?: AnimationEventHandler<HTMLElement>;
}

interface AccordionToggleProps {
  'aria-controls'?: AriaAttributes['aria-controls'];
  'aria-expanded'?: AriaAttributes['aria-expanded'];
  className?: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onKeyDown?: (event: KeyboardEvent<HTMLButtonElement>) => void;
  type?: 'button';
}

const defaultRenderToggle = (props: AccordionToggleProps) => (
  <button type="button" {...props} />
);

function AccordionItem({
  children,
  className: customClassName = '',
  open = false,
  onHeadingClick,
  renderExpando = defaultRenderToggle, // remove renderExpando in next major release
  renderToggle,
  title = 'title',
  disabled: controlledDisabled,
  handleAnimationEnd,
  ...rest
}: PropsWithChildren<AccordionItemProps>) {
  const [isOpen, setIsOpen] = useState(open);
  const [prevIsOpen, setPrevIsOpen] = useState(open);
  const accordionState = useContext(AccordionContext);

  const disabledIsControlled = typeof controlledDisabled === 'boolean';
  const disabled = disabledIsControlled
    ? controlledDisabled
    : accordionState.disabled;

  const id = useId('accordion-item');
  const prefix = usePrefix();
  const className = cx({
    [`${prefix}--accordion__item`]: true,
    [`${prefix}--accordion__item--active`]: isOpen && !disabled,
    [`${prefix}--accordion__item--disabled`]: disabled,
    [customClassName]: !!customClassName,
  });

  const Toggle = renderToggle || renderExpando; // remove renderExpando in next major release

  const content = React.useCallback(
    (node: HTMLDivElement) => {
      if (!node) {
        return;
      }
      if (isOpen) {
        // accordion closes
        node.style.maxBlockSize = '';
      }
    },
    [isOpen]
  );

  if (open !== prevIsOpen) {
    setIsOpen(open);
    setPrevIsOpen(open);
  }

  // When the AccordionItem heading is clicked, toggle the open state of the
  // panel
  function onClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const nextValue = !isOpen;
    setIsOpen(nextValue);
    if (onHeadingClick) {
      // TODO: normalize signature, potentially:
      // onHeadingClick :: (event: Event, state: { isOpen: Boolean }) => any
      onHeadingClick({ isOpen: nextValue, event });
    }
  }

  // If the AccordionItem is open, and the user hits the ESC key, then close it
  function onKeyDown(event) {
    if (isOpen && match(event, keys.Escape)) {
      setIsOpen(false);
    }
  }

  function onAnimationEnd(event) {
    if (handleAnimationEnd) {
      handleAnimationEnd(event);
    }
  }

  return (
    <li className={className} {...rest}>
      <Toggle
        disabled={disabled}
        aria-controls={id}
        aria-expanded={isOpen}
        className={`${prefix}--accordion__heading`}
        onClick={onClick}
        onKeyDown={onKeyDown}
        type="button">
        <ChevronRight className={`${prefix}--accordion__arrow`} />
        <Text as="div" className={`${prefix}--accordion__title`}>
          {title}
        </Text>
      </Toggle>
      <div
        ref={content}
        className={`${prefix}--accordion__wrapper`}
        onTransitionEnd={onAnimationEnd}>
        <div id={id} className={`${prefix}--accordion__content`}>
          {children}
        </div>
      </div>
    </li>
  );
}

AccordionItem.propTypes = {
  /**
   * Provide the contents of your AccordionItem
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the container node
   */
  className: PropTypes.string,

  /**
   * Specify whether an individual AccordionItem should be disabled
   */
  disabled: PropTypes.bool,

  /**
   * The handler of the massaged `click` event.
   */
  onClick: PropTypes.func,

  /**
   * The handler of the massaged `click` event on the heading.
   */
  onHeadingClick: PropTypes.func,

  /**
   * `true` to open the expand.
   */
  open: PropTypes.bool,

  /**
   * The callback function to render the expand button.
   * Can be a React component class.
   */
  renderExpando: deprecate(
    PropTypes.func,
    'The `renderExpando` prop has been deprecated and will be removed in the next major release of Carbon. Use the `renderToggle` prop instead.'
  ),

  /**
   * The callback function to render the expand button.
   * Can be a React component class.
   */
  renderToggle: PropTypes.func,

  /**
   * The accordion title.
   */
  title: PropTypes.node,
};

export default AccordionItem;
