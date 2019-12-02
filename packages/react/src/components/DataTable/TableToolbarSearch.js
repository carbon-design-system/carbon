/**
 * Copyright IBM Corp. 2016, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { useMemo, useRef, useState, useEffect } from 'react';
import { settings } from 'carbon-components';
import Search from '../Search';
import setupGetInstanceId from './tools/instanceId';
import deprecate from '../../prop-types/deprecate';

const { prefix } = settings;
const getInstanceId = setupGetInstanceId();
const translationKeys = {
  'carbon.table.toolbar.search.label': 'Filter table',
  'carbon.table.toolbar.search.placeholder': 'Filter table',
};
const translateWithId = id => {
  return translationKeys[id];
};
const TableToolbarSearch = ({
  className,
  searchContainerClass,
  onChange: onChangeProp,
  translateWithId: t,
  placeHolderText,
  labelText,
  expanded: expandedProp,
  defaultExpanded,
  defaultValue,
  onExpand,
  persistent,
  persistant,
  id,
  ...rest
}) => {
  const { current: controlled } = useRef(expandedProp !== undefined);
  const [expandedState, setExpandedState] = useState(defaultExpanded);
  const expanded = controlled ? expandedProp : expandedState;
  const searchRef = useRef(null);
  const [value, setValue] = useState('');
  const uniqueId = useMemo(getInstanceId, []);

  useEffect(() => {
    if (!controlled && expandedState && searchRef.current) {
      searchRef.current.querySelector('input').focus();
    }
  }, [controlled, expandedState]);

  const searchContainerClasses = cx({
    [searchContainerClass]: searchContainerClass,
    [`${prefix}--toolbar-action`]: true,
    [`${prefix}--toolbar-search-container-active`]: expanded,
    [`${prefix}--toolbar-search-container-expandable`]:
      !persistent || (!persistent && !persistant),
    [`${prefix}--toolbar-search-container-persistent`]:
      persistent || persistant,
  });

  const handleExpand = (event, value = !expanded) => {
    if (!controlled && (!persistent || (!persistent && !persistant))) {
      setExpandedState(value);
    }
    if (onExpand) {
      onExpand(event, value);
    }
  };

  const onChange = e => {
    setValue(e.target.value);
    if (onChangeProp) {
      onChangeProp(e);
    }
  };

  return (
    <div
      tabIndex={expandedState ? '-1' : '0'}
      role="search"
      ref={searchRef}
      onClick={event => handleExpand(event, true)}
      onFocus={event => handleExpand(event, true)}
      onBlur={event => !value && handleExpand(event, false)}
      className={searchContainerClasses}>
      <Search
        size="sm"
        className={className}
        defaultValue={defaultValue}
        value={value}
        id={typeof id !== 'undefined' ? id : uniqueId.toString()}
        aria-hidden={!expanded}
        labelText={labelText || t('carbon.table.toolbar.search.label')}
        placeHolderText={
          placeHolderText || t('carbon.table.toolbar.search.placeholder')
        }
        onChange={onChange}
        {...rest}
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
   * Provide an optional default value for the Search component
   */
  defaultValue: PropTypes.string,

  /**
   * Provide custom text for the component for each translation id
   */
  translateWithId: PropTypes.func.isRequired,

  /**
   * Whether the search should be allowed to expand
   */
  persistent: PropTypes.bool,
  persistant: deprecate(
    PropTypes.bool,
    `\nThe prop \`persistant\` for TableToolbarSearch has been deprecated in favor of \`persistent\`. Please use \`persistent\` instead.`
  ),
};

TableToolbarSearch.defaultProps = {
  translateWithId,
  persistent: false,
};

export default TableToolbarSearch;
