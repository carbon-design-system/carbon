/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { PolymorphicProps } from '../../types/common';

interface GridBaseProps {
  /**
   * Pass in content that will be rendered within the `Grid`
   */
  children?: React.ReactNode;

  /**
   * Specify a custom className to be applied to the `Grid`
   */
  className?: string;

  /**
   * Collapse the gutter to 1px. Useful for fluid layouts.
   * Rows have 1px of margin between them to match gutter.
   */
  condensed?: boolean;

  /**
   * Remove the default max width that the grid has set
   */
  fullWidth?: boolean;

  /**
   * Container hangs 16px into the gutter. Useful for
   * typographic alignment with and without containers.
   */
  narrow?: boolean;
}

export type GridProps<T extends React.ElementType> = PolymorphicProps<
  T,
  GridBaseProps
>;

export interface GridComponent {
  <T extends React.ElementType>(
    props: GridProps<T>,
    context?: any
  ): React.ReactElement<any, any> | null;
}
