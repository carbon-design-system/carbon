import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Search from '../Search';
import setupGetInstanceId from './tools/instanceId';

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
        light
        className={className}
        {...rest}
        small
        id={id}
        labelText={t('carbon.table.toolbar.search.label')}
        placeHolderText={t('carbon.table.toolbar.search.placeholder')}
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
   * Provide custom text for the component for each translation id
   */
  translateWithId: PropTypes.func.isRequired,
};

TableToolbarSearch.defaultProps = {
  translateWithId,
};

export default TableToolbarSearch;
