/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { useState, useRef } from 'react';
import classNames from 'classnames';
import { settings } from 'carbon-components';
import { selectorTabbable } from '../../internal/keyboard/navigation';
import useIsomorphicEffect from '../../internal/useIsomorphicEffect';

const { prefix } = settings;

/**
 * Determine if the node within the provided ref contains content that is tabbable.
 */
function useTabbableContent(ref) {
  const [hasTabbableContent, setHasTabbableContent] = useState(false);

  useIsomorphicEffect(() => {
    if (ref.current) {
      setHasTabbableContent(ref.current.querySelector(selectorTabbable));
    }
  });

  return hasTabbableContent;
}

const TabContent = (props) => {
  const { className, selected, children, ...other } = props;
  const tabContentClasses = classNames(`${prefix}--tab-content`, {
    [className]: className,
  });
  const ref = useRef(null);
  const hasTabbableContent = useTabbableContent(ref);
  return (
    <div
      role="tabpanel"
      {...other}
      className={tabContentClasses}
      selected={selected}
      hidden={!selected}
      ref={ref}
      tabIndex={hasTabbableContent ? undefined : 0}>
      {children}
    </div>
  );
};

TabContent.propTypes = {
  /**
   * Pass in content to render inside of the TabContent
   */
  children: PropTypes.node,

  /**
   * Provide a className for the tab content container
   */
  className: PropTypes.string,

  /**
   * Specify whether the TabContent is selected
   */
  selected: PropTypes.bool,
};

TabContent.defaultProps = {
  selected: false,
};

export default TabContent;
