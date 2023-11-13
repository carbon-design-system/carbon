/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { usePrefix } from '../../internal/usePrefix';
import { PolymorphicProps } from '../../types/common';

interface ColumnHangBaseProps {
  /**
   * Pass in content that will be rendered within the `ColumnHang`
   */
  children?: React.ReactNode;

  /**
   * Specify a custom className to be applied to the `ColumnHang`
   */
  className?: string;
}

export type ColumnHangProps<T extends React.ElementType> = PolymorphicProps<
  T,
  ColumnHangBaseProps
>;

export interface ColumnHangComponent {
  <T extends React.ElementType>(
    props: ColumnHangProps<T>,
    context?: any
  ): React.ReactElement<any, any> | null;
}

/**
 * Helper component for rendering content that hangs on the column. Useful when
 * trying to align content across different gutter modes
 */
function ColumnHang<T extends React.ElementType>({
  as: BaseComponent = 'div' as T,
  className: customClassName,
  children,
  ...rest
}: ColumnHangProps<T>) {
  const prefix = usePrefix();
  const className = cx(customClassName, `${prefix}--grid-column-hang`);
  // cast as any to let TypeScript allow passing in attributes to base component
  const BaseComponentAsAny: any = BaseComponent;
  return (
    <BaseComponentAsAny {...rest} className={className}>
      {children}
    </BaseComponentAsAny>
  );
}

ColumnHang.propTypes = {
  /**
   * Provide a custom element to render instead of the default <div>
   */
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),

  /**
   * Pass in content that will be rendered within the `Grid`
   */
  children: PropTypes.node,

  /**
   * Specify a custom className to be applied to the `Grid`
   */
  className: PropTypes.string,
};

const ColumnHangComponent = ColumnHang as ColumnHangComponent;

export { ColumnHangComponent as ColumnHang };
