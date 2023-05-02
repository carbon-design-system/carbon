/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { type PropsWithChildren } from 'react';

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

const HeadingContext = React.createContext<HeadingLevel>(1);

interface SectionProps {
  as?:
    | keyof JSX.IntrinsicElements
    | React.FunctionComponent
    | React.ComponentClass;
  level: HeadingLevel;
}

export function Section({
  as: BaseComponent = 'section',
  level: levelOverride,
  children,
  ...rest
}: PropsWithChildren<SectionProps>) {
  const parentLevel = React.useContext(HeadingContext);
  const level = levelOverride === undefined ? parentLevel + 1 : levelOverride;

  return (
    <HeadingContext.Provider value={Math.min(level, 6) as HeadingLevel}>
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

interface HeadingProps {
  className?: string;
}

export function Heading(props: PropsWithChildren<HeadingProps>) {
  const HeadingIntrinsic = `h${React.useContext(HeadingContext)}` as const;
  return <HeadingIntrinsic {...props} />;
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
