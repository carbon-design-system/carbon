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
  'carbon.table.toolbar.row.height.default': 'Default (48px)',
  'carbon.table.toolbar.row.height.short': 'Short (32px)',
};
const translateWithId = id => {
  return translationKeys[id];
};

const TableToolbarRowHeight = ({
  initialSelected,
  translateWithId: t,
  onChange: onChangeProp,
  handleMenuItemFocus,
}) => {
  const [selected, setSelected] = useState(initialSelected);

  const onChange = (id) => {
    setSelected(id);
    onChangeProp(id);
  };

  return (
    <>
      <TableToolbarTitle title={t('carbon.table.toolbar.row.height.label')} />
      <TableToolbarOption>
        <RadioButtonGroup
           defaultSelected="default"
           labelPosition="right"
           legend="Group Legend"
           name="radio-button-group"
           onChange={onChange}
           orientation="vertical"
           valueSelected={selected}
         >
           <RadioButton
             id='default'
             labelText={t('carbon.table.toolbar.row.height.default')}
             value="default"
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
};

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
