/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { type ElementType } from 'react';
import type { PolymorphicProps } from '../../types/common';

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

const HeadingContext = React.createContext<HeadingLevel>(1);

type SectionBaseProps = {
  level?: HeadingLevel;
};

type SectionProps<E extends ElementType> = PolymorphicProps<
  E,
  SectionBaseProps
>;

export function Section<E extends ElementType = 'section'>({
  as: BaseComponent = 'section' as E,
  level: levelOverride,
  ...rest
}: SectionProps<E>) {
  const parentLevel = React.useContext(HeadingContext);
  const level = levelOverride ?? parentLevel + 1;
  const BaseComponentAsAny = BaseComponent as any;

  return (
    <HeadingContext.Provider value={Math.min(level, 6) as HeadingLevel}>
      <BaseComponentAsAny {...rest} />
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

type HeadingProps = JSX.IntrinsicElements[`h${HeadingLevel}`];

export function Heading(props: HeadingProps) {
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
