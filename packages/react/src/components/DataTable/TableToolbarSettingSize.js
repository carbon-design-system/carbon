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
  'carbon.table.toolbar.row.height.tall': 'Tall (64px)',
  'carbon.table.toolbar.row.height.normal': 'Normal (48px)',
  'carbon.table.toolbar.row.height.short': 'Short (32px)',
  'carbon.table.toolbar.row.height.compact': 'Compact (24px)',
};
const translateWithId = id => {
  return translationKeys[id];
};

const TableToolbarSettingSize = React.forwardRef(({
  size,
  sizeOptions,
  onChange: onChangeProp,
  handleMenuItemFocus,
  translateWithId: t,
}, ref) => {
  const [selected, setSelected] = useState(size);
  const onChange = (id) => {
    setSelected(id);
    onChangeProp(id);
  };

  return (
    <React.Fragment>
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
         {
            sizeOptions.map(option => (
              <RadioButton
                key={option}
                id={option}
                labelText={t(`carbon.table.toolbar.row.height.${option}`)}
                value={option}
                onKeyDown={handleMenuItemFocus}
                data-table-toolbar-focusable
              />
            ))
         }
         </RadioButtonGroup>
      </TableToolbarOption>          
    </React.Fragment>
  );
});

TableToolbarSettingSize.propTypes = {
  /**
   * Provide initially selected size
   */
  size: PropTypes.string.isRequired,
  /**
   * Provide an array of size options
   */
  sizeOptions: PropTypes.arrayOf(
    PropTypes.oneOf(['compact', 'short', 'normal', 'tall']),
  ).isRequired,
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

TableToolbarSettingSize.defaultProps = {
  sizeOptions: ['compact', 'short', 'normal', 'tall'],
  translateWithId,
};

export default TableToolbarSettingSize;
