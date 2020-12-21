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
const translateWithId = (id) => {
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
  tabIndex,
  ...rest
}) => {
  const { current: controlled } = useRef(expandedProp !== undefined);
  const [expandedState, setExpandedState] = useState(
    defaultExpanded || defaultValue
  );
  const expanded = controlled ? expandedProp : expandedState;
  const searchRef = useRef(null);
  const [value, setValue] = useState(defaultValue || '');
  const uniqueId = useMemo(getInstanceId, []);

  const [focusTarget, setFocusTarget] = useState(null);

  useEffect(() => {
    if (focusTarget) {
      focusTarget.current.querySelector('input').focus();
      setFocusTarget(null);
    }
  }, [focusTarget]);

  useEffect(
    () => {
      if (defaultValue) {
        onChangeProp('', defaultValue);
      }
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

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
      if (value && !expanded) {
        setFocusTarget(searchRef);
      }
    }
    if (onExpand) {
      onExpand(event, value);
    }
  };

  const onClick = (e) => {
    handleExpand(e, true);
  };

  const onChange = (e) => {
    setValue(e.target.value);
    if (onChangeProp) {
      onChangeProp(e);
    }
  };

  const searchExpanded = expanded || persistent;

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      tabIndex={searchExpanded ? '-1' : tabIndex}
      ref={searchRef}
      onKeyDown={(event) => onClick(event)}
      onClick={(event) => onClick(event)}
      onFocus={(event) => handleExpand(event, true)}
      onBlur={(event) => !value && handleExpand(event, false)}
      className={searchContainerClasses}>
      <Search
        size="sm"
        tabIndex={searchExpanded ? tabIndex : '-1'}
        className={className}
        value={value}
        id={typeof id !== 'undefined' ? id : uniqueId.toString()}
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
   * Specifies if the search should initially render in an expanded state
   */
  defaultExpanded: PropTypes.bool,

  /**
   * Provide an optional default value for the Search component
   */
  defaultValue: PropTypes.string,

  /**
   * Specifies if the search should expand
   */
  expanded: PropTypes.bool,

  /**
   * Provide an optional id for the search container
   */
  id: PropTypes.string,

  /**
   * Provide an optional label text for the Search component icon
   */
  labelText: PropTypes.string,

  /**
   * Provide an optional hook that is called each time the input is updated
   */
  onChange: PropTypes.func,

  /**
   * Provide an optional hook that is called each time the input is expanded
   */
  onExpand: PropTypes.func,

  persistant: deprecate(
    PropTypes.bool,
    `\nThe prop \`persistant\` for TableToolbarSearch has been deprecated in favor of \`persistent\`. Please use \`persistent\` instead.`
  ),

  /**
   * Whether the search should be allowed to expand
   */
  persistent: PropTypes.bool,

  /**
   * Provide an optional placeholder text for the Search component
   */
  placeHolderText: PropTypes.string,

  /**
   * Provide an optional className for the overal container of the Search
   */
  searchContainerClass: PropTypes.string,

  /**
   * Optional prop to specify the tabIndex of the <Search> (in expanded state) or the container (in collapsed state)
   */
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * Provide custom text for the component for each translation id
   */
  translateWithId: PropTypes.func.isRequired,
};

TableToolbarSearch.defaultProps = {
  tabIndex: '0',
  translateWithId,
  persistent: false,
};

export default TableToolbarSearch;
