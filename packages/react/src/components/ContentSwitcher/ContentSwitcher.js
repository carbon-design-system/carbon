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
  const isMounted = useRef(false);
  const savedOnChange = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(controlledSelectedIndex);
  const [prevControlledIndex, setPrevControlledIndex] = useState(
    controlledSelectedIndex
  );

  if (controlledSelectedIndex !== prevControlledIndex) {
    setSelectedIndex(controlledSelectedIndex);
    setPrevControlledIndex(controlledSelectedIndex);
  }

  // Always keep track of the latest `onChange` prop to use in our focus effect
  // handler
  useEffect(() => {
    savedOnChange.current = onChange;
  }, [onChange]);

  // Only fire this effect after the first render, otherwise we end up
  // autofocusing the selected index when this component is rendered
  useEffect(() => {
    if (!isMounted.current) {
      return;
    }

    const ref = switchRefs[selectedIndex];
    if (ref && document.activeElement !== ref.current) {
      ref.focus && ref.focus();
      if (savedOnChange.current) {
        savedOnChange.current(selectedIndex);
      }
    }
  }, [switchRefs, selectedIndex]);

  // Set our `isMounted` flag to true when our effects are run during the first
  // render
  useEffect(() => {
    isMounted.current = true;
  }, []);

  function handleItemRef(index) {
    return ref => {
      switchRefs[index] = ref;
    };
  }

  function onClick(event, index) {
    if (selectedIndex !== index) {
      setSelectedIndex(index);
    }
  }

  function onKeyDown(event) {
    if (matches(event, [keys.ArrowRight, keys.ArrowLeft])) {
      setSelectedIndex(getNextIndex(event, selectedIndex, children.length));
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
