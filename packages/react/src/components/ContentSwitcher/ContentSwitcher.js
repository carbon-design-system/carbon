/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, {
  Children,
  cloneElement,
  useEffect,
  useRef,
  useState,
} from 'react';
import cx from 'classnames';
import { settings } from 'carbon-components';
import { composeEventHandlers } from '../../tools/events';
import { getNextIndex, matches, keys } from '../../internal/keyboard';

const { prefix } = settings;

function useFocusableList(length, initialIndex = 0) {
  const refs = Array.from({ length });

  const [selectedIndex, setSelectedIndex] = useState(initialIndex);
  const [prevControlledIndex, setPrevControlledIndex] = useState(null);
  const [focusIndex, setFocusIndex] = useState(null);

  // https://reactjs.org/docs/hooks-faq.html#how-do-i-implement-getderivedstatefromprops
  if (initialIndex !== prevControlledIndex) {
    setSelectedIndex(controlledSelectedIndex);
    setPrevControlledIndex(controlledSelectedIndex);
  }

  useEffect(() => {
    if (focusIndex === null) {
      return;
    }

    const ref = switchRefs[focusIndex];
    if (ref && document.activeElement !== ref.current) {
      ref.focus && ref.focus();
      if (savedOnChange.current) {
        savedOnChange.current(focusIndex);
      }
    }
  }, [refs, focusIndex]);

  function setIndex(index) {
    setSelectedIndex(index);
    setFocusIndex(index);
  }

  function handleItemRef(index) {
    return ref => {
      switchRefs[index] = ref;
    };
  }

  function setIndex(index) {
    setSelectedIndex(index);
    setFocusIndex(index);
  }

  function onClick(event, index) {
    if (selectedIndex !== index) {
      setIndex(index);
    }
  }

  function onKeyDown(event) {
    if (matches(event, [keys.ArrowRight, keys.ArrowLeft])) {
      setIndex(getNextIndex(event, selectedIndex, length));
    }
  }

  function onFocus(event, index) {
    if (focusIndex !== index) {
      setFocusIndex(index);
    }
  }

  return {
    onClick,
    onKeyDown,
    onFocus,
    ref: handleItemRef,
  };
}

function ContentSwitcher({
  children,
  className: customClassName,
  onChange,
  selectedIndex: controlledSelectedIndex = 0,
  ...rest
}) {
  const savedOnChange = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(controlledSelectedIndex);
  const [prevControlledIndex, setPrevControlledIndex] = useState(null);
  const [focusIndex, setFocusIndex] = useState(null);

  const switchRefs = [];
  const className = cx(`${prefix}--content-switcher`, customClassName);

  // https://reactjs.org/docs/hooks-faq.html#how-do-i-implement-getderivedstatefromprops
  if (controlledSelectedIndex !== prevControlledIndex) {
    setSelectedIndex(controlledSelectedIndex);
    setPrevControlledIndex(controlledSelectedIndex);
  }

  // Always keep track of the latest `onChange` prop to use in our focus effect
  // handler
  useEffect(() => {
    savedOnChange.current = onChange;
  }, [onChange]);

  useEffect(() => {
    if (focusIndex === null) {
      return;
    }

    const ref = switchRefs[focusIndex];
    if (ref && document.activeElement !== ref.current) {
      ref.focus && ref.focus();
      if (savedOnChange.current) {
        savedOnChange.current(focusIndex);
      }
    }
  }, [switchRefs, focusIndex]);

  function handleItemRef(index) {
    return ref => {
      switchRefs[index] = ref;
    };
  }

  function setIndex(index) {
    setSelectedIndex(index);
    setFocusIndex(index);
  }

  function onClick(event, index) {
    if (selectedIndex !== index) {
      setIndex(index);
    }
  }

  function onKeyDown(event) {
    if (matches(event, [keys.ArrowRight, keys.ArrowLeft])) {
      setIndex(getNextIndex(event, selectedIndex, children.length));
    }
  }

  function onFocus(event, index) {
    if (focusIndex !== index) {
      setFocusIndex(index);
    }
  }

  return (
    <div className={className} {...rest}>
      {Children.map(children, (child, index) =>
        cloneElement(child, {
          index,
          onClick: composeEventHandlers([onClick, child.props.onClick]),
          onFocus: composeEventHandlers([onFocus, child.props.onFocus]),
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
