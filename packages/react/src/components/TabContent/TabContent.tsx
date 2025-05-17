/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { type HTMLAttributes, type ReactNode } from 'react';
import classNames from 'classnames';
import { usePrefix } from '../../internal/usePrefix';

export interface TabContentProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Pass in content to render inside the TabContent
   */
  children?: ReactNode;

  /**
   * Provide a className for the tab content container
   */
  className?: string;

  /**
   * Specify whether the TabContent is selected
   */
  selected?: boolean;
}

export default function TabContent(props) {
  const { className, selected, children, ...other } = props;
  const prefix = usePrefix();
  const tabContentClasses = classNames(`${prefix}--tab-content`, className);
  return (
    <div
      role="tabpanel"
      {...other}
      className={tabContentClasses}
      selected={selected}
      hidden={!selected}>
      {children}
    </div>
  );
}

TabContent.propTypes = {
  /**
   * Pass in content to render inside the TabContent
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
