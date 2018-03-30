import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Search from '../Search';
import setupGetInstanceId from './tools/instanceId';

const getInstanceId = setupGetInstanceId();

const TableToolbarSearch = ({
  className,
  searchContainerClass,
  onChange,
  id = `data-table-search-${getInstanceId()}`,
  ...rest
}) => {
  const searchContainerClasses = cx(
    searchContainerClass,
    'bx--toolbar-search-container'
  );
  return (
    <div className={searchContainerClasses}>
      <Search
        className={className}
        {...rest}
        small
        id={id}
        labelText="Filter table"
        placeHolderText="Search"
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
  searchContainerClasses: PropTypes.string,

  /**
   * Provide an optional hook that is called each time the input is updated
   */
  onChange: PropTypes.func,
};

export default TableToolbarSearch;
