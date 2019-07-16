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
  const [shouldFocus, setShouldFocus] = useState(false);

  if (controlledSelectedIndex !== prevControlledIndex) {
    setSelectedIndex(controlledSelectedIndex);
    setPrevControlledIndex(controlledSelectedIndex);
    setShouldFocus(false);
  }

  // Always keep track of the latest `onChange` prop to use in our focus effect
  // handler
  useEffect(() => {
    savedOnChange.current = onChange;
  }, [onChange]);

  // If our selectedIndex has changed from an event handler, meaning that
  // `shouldFocus` is set to true, then call the saved `onChange` handler if it
  // exists
  useEffect(() => {
    if (shouldFocus && savedOnChange.current) {
      savedOnChange.current(selectedIndex);
    }
  }, [shouldFocus, selectedIndex]);

  // We have a couple of scenarios we want to keep track of when managing focus:
  // 1) Don't focus the ref at the selectedIndex if its the first render, focus
  //    should only come from a user action
  // 2) Don't focus if selectedIndex has changed because of a change in props
  // 3) Trigger focus if triggered by click or key down. Both of these handlers
  //    should set `shouldFocus` to true
  useEffect(() => {
    if (!shouldFocus) {
      return;
    }

    const ref = switchRefs[selectedIndex];
    if (ref && document.activeElement !== ref) {
      ref.focus && ref.focus();
    }
  }, [shouldFocus, switchRefs, selectedIndex]);

  function handleItemRef(index) {
    return ref => {
      switchRefs[index] = ref;
    };
  }

  function onClick(event, index) {
    if (selectedIndex !== index) {
      setSelectedIndex(index);
      if (shouldFocus !== true) {
        setShouldFocus(true);
      }
    }
  }

  function onKeyDown(event) {
    if (matches(event, [keys.ArrowRight, keys.ArrowLeft])) {
      setSelectedIndex(getNextIndex(event, selectedIndex, children.length));
      if (shouldFocus !== true) {
        setShouldFocus(true);
      }
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
