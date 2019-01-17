/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { settings } from 'carbon-components';
import Search from '../Search';
import setupGetInstanceId from './tools/instanceId';

const { prefix } = settings;

const getInstanceId = setupGetInstanceId();
const translationKeys = {
  'carbon.table.toolbar.search.label': 'Filter table',
  'carbon.table.toolbar.search.placeholder': 'Search',
};

const translateWithId = id => {
  return translationKeys[id];
};

const TableToolbarSearch = ({
  className,
  searchContainerClass,
  onChange,
  translateWithId: t,
  placeHolderText,
  labelText,
  id = `data-table-search-${getInstanceId()}`,
  ...rest
}) => {
  const searchContainerClasses = cx(
    searchContainerClass,
    `${prefix}--toolbar-search-container`
  );
  return (
    <div className={searchContainerClasses}>
      <Search
        light
        className={className}
        {...rest}
        small
        id={id}
        labelText={labelText || t('carbon.table.toolbar.search.label')}
        placeHolderText={
          placeHolderText || t('carbon.table.toolbar.search.placeholder')
        }
        onChange={onChange}
      />
    </div>
  );
};

TableToolbarSearch.propTypes = {
  children: PropTypes.node,

  /**
   * Provide an optional class name for the search container
   */
  className: PropTypes.string,

  /**
   * Provide an optional id for the search container
   */
  id: PropTypes.string,

  /**
   * Provide an optional className for the overal container of the Search
   */
  searchContainerClasses: PropTypes.string,

  /**
   * Provide an optional hook that is called each time the input is updated
   */
  onChange: PropTypes.func,

  /**
   * Provide an optional placeholder text for the Search component
   */
  placeHolderText: PropTypes.string,

  /**
   * Provide an optional label text for the Search component icon
   */
  labelText: PropTypes.string,

  /**
   * Provide custom text for the component for each translation id
   */
  translateWithId: PropTypes.func.isRequired,
};

TableToolbarSearch.defaultProps = {
  translateWithId,
};

export default TableToolbarSearch;
