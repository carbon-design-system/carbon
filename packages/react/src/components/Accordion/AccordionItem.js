/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ChevronRight16 } from '@carbon/icons-react';
import { settings } from 'carbon-components';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { match, keys } from '../../internal/keyboard';
import { useId } from '../../internal/useId';
import deprecate from '../../prop-types/deprecate.js';

const { prefix } = settings;
const defaultRenderExpando = ({ testId, ...props }) => (
  <button type="button" data-testid={testId} {...props} />
);

function AccordionItem({
  children,
  className: customClassName,
  disabled,
  iconDescription, // eslint-disable-line
  open = false,
  onHeadingClick,
  renderExpando: Expando = defaultRenderExpando,
  testId = 'accordionItem',
  title = 'title',
  ...rest
}) {
  const [isOpen, setIsOpen] = useState(open);
  const [prevIsOpen, setPrevIsOpen] = useState(open);
  const [animation, setAnimation] = useState('');
  const id = useId('accordion-item');
  const className = cx({
    [`${prefix}--accordion__item`]: true,
    [`${prefix}--accordion__item--active`]: isOpen,
    [`${prefix}--accordion__item--${animation}`]: animation,
    [`${prefix}--accordion__item--disabled`]: disabled,
    [customClassName]: !!customClassName,
  });

  if (open !== prevIsOpen) {
    setAnimation(isOpen ? 'collapsing' : 'expanding');
    setIsOpen(open);
    setPrevIsOpen(open);
  }

  // When the AccordionItem heading is clicked, toggle the open state of the
  // panel
  function onClick(event) {
    const nextValue = !isOpen;
    setAnimation(isOpen ? 'collapsing' : 'expanding');
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

  function handleAnimationEnd(event) {
    if (rest.handleAnimationEnd) {
      rest.handleAnimationEnd(event);
    }
    setAnimation('');
  }

  return (
    <li
      className={className}
      data-testid={testId}
      {...rest}
      onAnimationEnd={handleAnimationEnd}>
      <Expando
        disabled={disabled}
        aria-controls={id}
        aria-expanded={isOpen}
        className={`${prefix}--accordion__heading`}
        onClick={onClick}
        onKeyDown={onKeyDown}
        type="button"
        testId={`${testId}-expando`}>
        <ChevronRight16 className={`${prefix}--accordion__arrow`} />
        <div className={`${prefix}--accordion__title`}>{title}</div>
      </Expando>
      <div
        id={id}
        className={`${prefix}--accordion__content`}
        data-testid={`${testId}-content`}>
        {children}
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
   * The description of the expando icon.
   */
  iconDescription: deprecate(
    PropTypes.string,
    'The `iconDescription` prop has been deprecated as it is no longer ' +
      'required. Feel free to remove this prop from <AccordionItem>. This ' +
      'prop will be removed in the next major release of ' +
      '`carbon-components-react`'
  ),

  /**
   * The handler of the massaged `click` event.
   */
  onClick: PropTypes.func,

  /**
   * The handler of the massaged `click` event on the heading.
   */
  onHeadingClick: PropTypes.func,

  /**
   * `true` to open the expando.
   */
  open: PropTypes.bool,

  /**
   * The callback function to render the expando button.
   * Can be a React component class.
   */
  renderExpando: PropTypes.func,

  /**
   * Id that can be used for testing. Will be added as data-testid attribute to the li element.
   */
  testId: PropTypes.string,

  /**
   * The accordion title.
   */
  title: PropTypes.node,
};

export default AccordionItem;
