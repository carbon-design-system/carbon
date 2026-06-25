//
// Copyright IBM Corp. 2021, 2024
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

import React, { ReactNode, forwardRef } from 'react';

import { Grid } from '@carbon/react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { getDevtoolsProps } from '../../global/js/utils/devtools';
import { pkg } from '../../settings';

const blockClass = `${pkg.prefix}--cascade`;
const componentName = 'Cascade';

export interface CascadeProps {
  children: ReactNode;
  /**
   * Specify an optional className to be applied to
   * the container node.
   */
  className?: string;
  /**
   * Specifies whether or not to wrap the child content in a `<Grid />`.
   * If this is set to true it's important that the children are being wrapped in rows in columns.
   * Check the documentation for additional clarification.
   */
  grid?: boolean;
}

const defaults = {
  grid: false,
};

type EnrichedChildren = {
  children?: ReactNode;
  className?: string;
};

/**

This pattern is intended for use with cards, tiles, or similarly styled
components. Use this patterns in areas that are the primary focus on the page to
help the user along their journey or locate the most important information on
the page. It should not be used on a page if it is the secondary focus of the
page as that will distract the user.

*/
export const Cascade = forwardRef<HTMLDivElement, CascadeProps>(
  (props, ref) => {
    const { children, className, grid = defaults.grid, ...rest } = props;
    const childProps = {
      ...rest,
      className: cx(blockClass, className),
      ref,
      ...getDevtoolsProps(componentName),
    };
    const modifyChildren = (child) => {
      const className = cx(child.props.className, `${blockClass}__element`);
      return React.cloneElement(child, { className });
    };
    const getModifiedChildren = () => {
      return React.Children.map(children, (child) => modifyChildren(child));
    };

    if (grid) {
      let colIdx = 0;
      const gridElm = React.Children.map(children, (row) => {
        if (React.isValidElement<EnrichedChildren>(row)) {
          const cols = React.Children.map(row?.props.children, (col) => {
            if (React.isValidElement<EnrichedChildren>(col)) {
              colIdx = colIdx + 1;
              const colClassnames = cx(
                col.props.className,
                `${blockClass}__col`,
                `${blockClass}__col-${colIdx}`
              );
              return React.cloneElement(col, { className: colClassnames });
            }
          });
          return React.cloneElement(row, {
            children: cols,
          });
        }
        return children;
      });
      return (
        <div {...childProps}>
          <Grid>{gridElm}</Grid>
        </div>
      );
    }

    return <div {...childProps}>{getModifiedChildren()}</div>;
  }
);

Cascade.displayName = componentName;

Cascade.propTypes = {
  /**
   * Main content that is shown.
   */
  children: PropTypes.node,
  /**
   * Optional class name.
   */
  className: PropTypes.string,
  /**
   * Specifies whether or not to wrap the child content in a `<Grid />`.
   * If this is set to true it's important that the children are being wrapped in rows in columns.
   * Check the documentation for additional clarification.
   */
  grid: PropTypes.bool,
};
