/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { settings } from 'carbon-components';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React, {
  Children,
  cloneElement,
  useEffect,
  useRef,
  useState,
} from 'react';
import { composeEventHandlers } from '../../tools/events';
import { getNextIndex, matches, keys } from '../../internal/keyboard';

const { prefix } = settings;

function ContentSwitcher({
  children,
  className: customClassName,
  onChange,
  selectedIndex: controlledSelectedIndex = 0,
  ...rest
}) {
  const switchRefs = [];
  const className = cx(`${prefix}--content-switcher`, customClassName);
  const savedOnChange = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(controlledSelectedIndex);
  const [prevControlledIndex, setPrevControlledIndex] = useState(
    controlledSelectedIndex
  );
  const focus = useRef(false);
  // const [shouldFocus, setShouldFocus] = useState(false);
  // const [isFocusLocked, setIsFocusLocked] = useState(true);

  if (controlledSelectedIndex !== prevControlledIndex) {
    setSelectedIndex(controlledSelectedIndex);
    setPrevControlledIndex(controlledSelectedIndex);
    focus.current = false;
    // setShouldFocus(false);
    // setIsFocusLocked(true);
  }

  // Always keep track of the latest `onChange` prop to use in our focus effect
  // handler
  useEffect(() => {
    savedOnChange.current = onChange;
  }, [onChange]);

  useEffect(() => {
    if (savedOnChange.current) {
      savedOnChange.current(selectedIndex);
    }
  }, [selectedIndex]);

  // 1) Don't focus if "first render"
  // 2) Don't focus if selected index has changed because of props
  // 3) Do focus if triggered by click or key down
  useEffect(() => {
    if (!focus.current) {
      return;
    }

    const ref = switchRefs[selectedIndex];
    if (ref && document.activeElement !== ref) {
      ref.focus && ref.focus();
    }
  }, [switchRefs, selectedIndex]);

  useEffect(() => {
    focus.current = true;
  }, [controlledSelectedIndex]);

  function handleItemRef(index) {
    return ref => {
      switchRefs[index] = ref;
    };
  }

  function onClick(event, index) {
    if (selectedIndex !== index) {
      setSelectedIndex(index);
      // setIsFocusLocked(false);
    }
  }

  function onKeyDown(event) {
    if (matches(event, [keys.ArrowRight, keys.ArrowLeft])) {
      setSelectedIndex(getNextIndex(event, selectedIndex, children.length));
      // setIsFocusLocked(false);
    }
  }

  return (
    <div className={className} {...rest}>
      {Children.map(children, (child, index) =>
        cloneElement(child, {
          index,
          onClick: composeEventHandlers([onClick, child.props.onClick]),
          onKeyDown: composeEventHandlers([onKeyDown, child.props.onKeyDown]),
          selected: index === selectedIndex,
          ref: handleItemRef(index),
        })
      )}
    </div>
  );
}

ContentSwitcher.propTypes = {
  /**
   * Pass in Switch components to be rendered in the ContentSwitcher
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be added to the container node
   */
  className: PropTypes.string,

  /**
   * Specify an `onChange` handler that is called whenever the ContentSwitcher
   * changes which item is selected
   */
  onChange: PropTypes.func.isRequired,

  /**
   * Specify a selected index for the initially selected content
   */
  selectedIndex: PropTypes.number,
};

export default ContentSwitcher;
