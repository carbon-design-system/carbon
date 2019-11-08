/**
 * Copyright IBM Corp. 2016, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { settings } from 'carbon-components';
import MultiSelect from '../MultiSelect';

const { prefix } = settings;

const TableToolbarColumnsMenu = ({
  className,
  headers,
  allHeaders,
  onChange: onChangeProp,
  ...rest
}) => {
  const toolbarActionClasses = cx(
    className,
    `${prefix}--toolbar-columns ${prefix}--multiselect`
  );

  const onChange = evt => {
    if (onChangeProp && evt && Array.isArray(evt.selectedItems)) {
      onChangeProp(evt.selectedItems.map(item => item.id));
    }
  };

  const items = allHeaders.map(header => ({
    id: header.key,
    text: header.header,
  }));

  const initialSelectedItems = headers.map(header => ({
    id: header.key,
    text: header.header,
  }));

  return (
    <MultiSelect
      className={toolbarActionClasses}
      disabled={false}
      initialSelectedItems={initialSelectedItems}
      items={items}
      label="Select Columns"
      itemToString={item => (item ? item.text : '')}
      light={false}
      locale="en"
      open={false}
      selectionFeedback="top-after-reopen"
      title={false}
      type="default"
      onChange={onChange}
      {...rest}
    />
  );
};

TableToolbarColumnsMenu.propTypes = {
  /**
   * Provide an optional class name for the toolbar menu
   */
  className: PropTypes.string,

  /**
   * Provide an array of menu items
   */
  items: PropTypes.array.isRequired,

  /**
   * Optional array of initially selected menu items
   */
  initialSelectedItems: PropTypes.array,
};

export default TableToolbarColumnsMenu;
