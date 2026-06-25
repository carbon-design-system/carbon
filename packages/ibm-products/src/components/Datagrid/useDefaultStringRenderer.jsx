/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import cx from 'classnames';
import { pkg } from '../../settings';

const blockClass = `${pkg.prefix}--datagrid`;

const useDefaultStringRenderer = (hooks) => {
  const StringRenderer = (tableProps) => (
    <div
      className={cx(`${blockClass}__defaultStringRenderer`, {
        [`${blockClass}__defaultStringRenderer--multiline`]:
          tableProps.column?.multiLineWrap || tableProps?.multiLineWrapAll,
      })}
    >
      {tableProps.value}
    </div>
  );

  const HeaderRenderer = (header, slug, aiLabel) => {
    return (
      <div
        className={cx(`${blockClass}__defaultStringRenderer`, {
          [`${blockClass}__defaultStringRenderer--slug`]:
            slug && React.isValidElement(slug),
          [`${blockClass}__defaultStringRenderer--ai-label`]:
            aiLabel && React.isValidElement(aiLabel),
        })}
        key={typeof header === 'string' ? header : ''}
      >
        {header}
      </div>
    );
  };

  const visibleColumns = (columns) => {
    const columnsWithDefaultCells = columns.map((column) => ({
      Cell: StringRenderer,
      ...column,
      Header:
        column.HeaderRenderer ||
        HeaderRenderer(column.Header, column.slug, column.aiLabel),
    }));
    return [...columnsWithDefaultCells];
  };
  hooks.visibleColumns.push(visibleColumns);
};

export default useDefaultStringRenderer;
