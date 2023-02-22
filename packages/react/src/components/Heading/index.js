/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';

const HeadingContext = React.createContext(1);

function Section({
  as: BaseComponent = 'section',
  level: levelOverride,
  children,
  ...rest
}) {
  const parentLevel = React.useContext(HeadingContext);
  const level =
    typeof levelOverride !== 'undefined' ? levelOverride : parentLevel + 1;

  return (
    <HeadingContext.Provider value={Math.min(level, 6)}>
      <BaseComponent {...rest}>{children}</BaseComponent>
    </HeadingContext.Provider>
  );
}

Section.propTypes = {
  /**
   * Provide an alternative tag or component to use instead of the default
   * <section> element
   */
  as: PropTypes.elementType,

  /**
   * Specify the content that will be placed in the component
   */
  children: PropTypes.node,

  /**
   * Specify a class name for the outermost node of the component
   */
  className: PropTypes.string,

  /**
   * Overrides the level of the section
   */
  level: PropTypes.number,
};

function Heading(props) {
  const level = React.useContext(HeadingContext);
  return React.createElement(`h${level}`, props);
}

Heading.propTypes = {
  /**
   * Specify the content that will be placed in the component
   */
  children: PropTypes.node,

  /**
   * Specify a class name for the outermost node of the component
   */
  className: PropTypes.string,
};

export { Section, Heading };
