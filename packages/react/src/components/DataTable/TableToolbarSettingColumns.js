/**
 * Copyright IBM Corp. 2016, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
  TableToolbarTitle,
  TableToolbarOption,
} from './TableToolbar';
import Checkbox from '../Checkbox';

const translationKeys = {
  'carbon.table.toolbar.columns.label': 'Edit column',
};
const translateWithId = id => {
  return translationKeys[id];
};

const TableToolbarSettingColumns = React.forwardRef(({
  columns,
  selectedColumns,
  onChange: onChangeProp,
  handleMenuItemFocus,
  translateWithId: t,
}, ref) => {
  const [selected, setSelected] = useState(selectedColumns);

  const onChange = (checked, id) => {
    const selectedSet = new Set(selected);
    if (checked) {
      selectedSet.add(id);
    } else {
      selectedSet.delete(id);
    }
    setSelected([...selectedSet]);
    onChangeProp([...selectedSet]);
  };

  return (
    <React.Fragment>
      <TableToolbarTitle ref={ref} title={t('carbon.table.toolbar.columns.label')} />
      {
        columns.map(column => (
          <TableToolbarOption key={column.key}>
            <Checkbox
              id={column.key}
              labelText={column.header}
              defaultChecked={selected.includes(column.key)}
              onChange={onChange}
              onKeyDown={handleMenuItemFocus}
              data-table-toolbar-focusable
            />
          </TableToolbarOption>          
        ))
      }
    </React.Fragment>
  );
});

TableToolbarSettingColumns.propTypes = {
  /**
   * Provide an array of columns
   */
  columns: PropTypes.array.isRequired,
  /**
   * Provide an optional array of initially selected columns
   */
  selectedColumns: PropTypes.array,
  /**
   * Provide an optional hook that is called each time the selection is updated
   */
  onChange: PropTypes.func,
  /**
   * Provide an optional hook that is called each time a key is pressed
   */
  handleMenuItemFocus: PropTypes.func,
  /**
   * Provide custom text for the component for each translation id
   */
  translateWithId: PropTypes.func.isRequired,
};

TableToolbarSettingColumns.defaultProps = {
  columns: [],
  selectedColumns: [],
  translateWithId,
};

export default TableToolbarSettingColumns;
