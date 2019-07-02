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

function ContentSwitcher({
  children,
  className: customClassName,
  onChange,
  selectedIndex: controlledSelectedIndex = 0,
  ...rest
}) {
  const switchRefs = [];
  const className = cx(`${prefix}--content-switcher`, customClassName);
  const [selectedIndex, setSelectedIndex] = useState(controlledSelectedIndex);

  useEffect(() => {
    setSelectedIndex(selectedIndex => {
      if (selectedIndex !== controlledSelectedIndex) {
        return controlledSelectedIndex;
      }
      return selectedIndex;
    });
  }, [controlledSelectedIndex]);

  useEffect(() => {
    const ref = switchRefs[selectedIndex];
    if (ref && document.activeElement !== ref.current) {
      ref.focus && ref.focus();
      onChange(selectedIndex);
    }
  }, [selectedIndex]);

  function handleItemRef(index) {
    return ref => {
      switchRefs[index] = ref;
    };
  }

  function onClick(index) {
    if (selectedIndex !== index) {
      setSelectedIndex(index);
    }
  }

  function onKeyDown(event, index) {
    if (matches(data, [keys.ArrowRight, keys.ArrowLeft])) {
      const nextIndex = getNextIndex(
        event.key || event.which,
        selectedIndex,
        children.length
      );
      console.log(nextIndex);
      setSelectedIndex(nextIndex);
    }
  }

  return (
    <div className={className} {...rest}>
      {Children.map(children, (child, index) =>
        cloneElement(child, {
          index,
          onClick: composeEventHandlers([onClick, child.props.onClick]),
          onKeyDown: onKeyDown,
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
