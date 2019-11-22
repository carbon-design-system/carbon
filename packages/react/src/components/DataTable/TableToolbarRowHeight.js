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
import RadioButtonGroup from '../RadioButtonGroup';
import RadioButton from '../RadioButton';

const translationKeys = {
  'carbon.table.toolbar.row.height.label': 'Row height',
  'carbon.table.toolbar.row.height.normal': 'Default (48px)',
  'carbon.table.toolbar.row.height.short': 'Short (32px)',
};
const translateWithId = id => {
  return translationKeys[id];
};

const TableToolbarRowHeight = React.forwardRef(({
  initialSelected,
  translateWithId: t,
  onChange: onChangeProp,
  handleMenuItemFocus,
}, ref) => {
  const [selected, setSelected] = useState(initialSelected);

  const onChange = (id) => {
    setSelected(id);
    onChangeProp(id);
  };

  return (
    <>
      <TableToolbarTitle ref={ref} title={t('carbon.table.toolbar.row.height.label')} />
      <TableToolbarOption>
        <RadioButtonGroup
           defaultSelected="normal"
           labelPosition="right"
           legend="Row Height"
           name="row-height-radio-button-group"
           onChange={onChange}
           orientation="vertical"
           valueSelected={selected}
         >
           <RadioButton
             id='normal'
             labelText={t('carbon.table.toolbar.row.height.normal')}
             value="normal"
             onKeyDown={handleMenuItemFocus}
             data-table-toolbar-focusable
           />
           <RadioButton
             id='short'
             labelText={t('carbon.table.toolbar.row.height.short')}
             value="short"
             onKeyDown={handleMenuItemFocus}
             data-table-toolbar-focusable
           />
         </RadioButtonGroup>
      </TableToolbarOption>          
    </>
  );
});

TableToolbarRowHeight.propTypes = {
  /**
   * Optional array of initially selected row height
   */
  initialSelected: PropTypes.string,
  /**
   * Provide an optional hook that is called each time the selection is updated
   */
  onChange: PropTypes.func,
  /**
   * Provide custom text for the component for each translation id
   */
  translateWithId: PropTypes.func.isRequired,
};

TableToolbarRowHeight.defaultProps = {
  translateWithId,
};

export default TableToolbarRowHeight;
