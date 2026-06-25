/**
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { ForwardedRef } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { getDevtoolsProps } from '../../../global/js/utils/devtools';
import { pkg } from '../../../settings';
import pconsole from '../../../global/js/utils/pconsole';
import { InlineEditProvider } from './addons/InlineEdit/InlineEditContext';
import { DatagridContent } from './DatagridContent';
import { FilterProvider } from './addons/Filtering/FilterProvider';
import { DataGridState, DatagridRow } from '../types';

const blockClass = `${pkg.prefix}--datagrid`;
const componentName = 'Datagrid';

export interface DatagridProps {
  /**
   * Specify a label to be read by screen readers on the container node
   * 'aria-label' of the TableToolbar component.
   */
  ariaToolbarLabel?: string;
  /**
   * The data grid state, much of it being supplied by the useDatagrid hook
   */
  datagridState: DataGridState;
}

/**
 * The `Datagrid` component is an extension of Carbon's DataTable component. At the most basic level, the `Datagrid` component takes in columns and rows and renders a data table. There is a set of data table extensions which this component provides support for, these can be found [here](https://pages.github.ibm.com/carbon/ibm-products/components/datagrid/overview/). This component is data driven and allows you to choose what pieces will be included based on the hooks/plugins that are provided.
 * @deprecated
 */
export const Datagrid = React.forwardRef(
  (
    { datagridState, ariaToolbarLabel, ...rest }: DatagridProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    if (!datagridState) {
      pconsole.warn(
        'Datagrid was not passed datagridState which is required to render this component.'
      );
      return;
    }

    const {
      withVirtualScroll,
      DatagridPagination,
      isFetching,
      tableId,
      filterProps,
      className,
      state,
    } = datagridState;

    const rows = ((DatagridPagination && datagridState.page) ||
      datagridState.rows) as DatagridRow[];

    const props = {
      datagridState,
      ariaToolbarLabel,
    };

    return (
      <FilterProvider
        filters={state?.filters}
        filterProps={filterProps}
        tableId={tableId}
      >
        <InlineEditProvider>
          <div
            {...rest}
            id={tableId}
            ref={ref}
            className={cx(
              className,
              blockClass,
              withVirtualScroll
                ? `${blockClass}__datagridWrap`
                : `${blockClass}__datagridWrap-simple`,
              !isFetching && rows.length === 0
                ? `${blockClass}__empty-state`
                : ''
            )}
            {...getDevtoolsProps(componentName)}
          >
            {filterProps?.variation === 'panel' ? (
              <div
                className={`${blockClass}__datagridWithPanel ${blockClass}__displayFlex`}
              >
                <DatagridContent {...props} />
              </div>
            ) : (
              <DatagridContent {...props} />
            )}
          </div>
        </InlineEditProvider>
      </FilterProvider>
    );
  }
);

/**@ts-ignore*/
Datagrid.deprecated = {
  level: 'warn',
  details: `For more information, please refer to the migration docs https://github.com/carbon-design-system/tanstack-carbon`,
};

// Return a placeholder if not released and not enabled by feature flag

// The display name of the component, used by React. Note that displayName
// is used in preference to relying on function.name.
Datagrid.displayName = componentName;

Datagrid.propTypes = {
  /**
   * Specify a label to be read by screen readers on the container node
   * 'aria-label' of the TableToolbar component.
   */
  ariaToolbarLabel: PropTypes.string,
  /**
   * The data grid state, much of it being supplied by the useDatagrid hook
   */
  /**@ts-ignore */
  datagridState: PropTypes.object.isRequired,
};
