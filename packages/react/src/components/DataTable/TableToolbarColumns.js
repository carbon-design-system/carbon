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

const TableToolbarColumns = React.forwardRef(({
  columns,
  initialSelected,
  translateWithId: t,
  onChange: onChangeProp,
  handleMenuItemFocus,
}, ref) => {
  const [selected, setSelected] = useState(initialSelected);

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
    <>
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
    </>
  );
});

TableToolbarColumns.propTypes = {
  /**
   * Provide an array of columns
   */
  columns: PropTypes.array.isRequired,
  /**
   * Optional array of initially selected columns
   */
  initialSelected: PropTypes.array,
  /**
   * Provide an optional hook that is called each time the selection is updated
   */
  onChange: PropTypes.func,
  /**
   * Provide custom text for the component for each translation id
   */
  translateWithId: PropTypes.func.isRequired,
};

TableToolbarColumns.defaultProps = {
  translateWithId,
};

export default TableToolbarColumns;
