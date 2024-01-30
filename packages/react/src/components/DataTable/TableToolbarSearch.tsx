/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React, {
  ChangeEvent,
  useMemo,
  useRef,
  useState,
  useEffect,
  FocusEvent,
  ReactNode,
  RefObject,
} from 'react';
import Search from '../Search';
import setupGetInstanceId from './tools/instanceId';
import { usePrefix } from '../../internal/usePrefix';
import { noopFn } from '../../internal/noopFn';

const getInstanceId = setupGetInstanceId();
const translationKeys = {
  'carbon.table.toolbar.search.label': 'Filter table',
  'carbon.table.toolbar.search.placeholder': 'Filter table',
};

const translateWithId = (id: string): string => {
  return translationKeys[id];
};

export interface TableToolbarSearchProps {
  children?: ReactNode;

  /**
   * Provide an optional class name for the search container
   */
  className?: string;

  /**
   * Specifies if the search should initially render in an expanded state
   */
  defaultExpanded?: boolean;

  /**
   * Provide an optional default value for the Search component
   */
  defaultValue?: string;

  /**
   * Specifies if the search should be disabled
   */
  disabled?: boolean;

  /**
   * Specifies if the search should expand
   */
  expanded?: boolean;

  /**
   * Provide an optional id for the search container
   */
  id?: string;

  /**
   * Provide an optional label text for the Search component icon
   */
  labelText?: string;

  /**
   * Provide an optional function to be called when the search input loses focus, this will be
   * passed the event as the first parameter and a function to handle the expanding of the search
   * input as the second
   */
  onBlur?: (
    event: FocusEvent<HTMLInputElement>,
    handleExpand: (event: FocusEvent<HTMLInputElement>, value: boolean) => void
  ) => void;

  /**
   * Provide an optional hook that is called each time the input is updated
   */
  onChange?: (
    event: '' | ChangeEvent<HTMLInputElement>,
    value?: string
  ) => void;

  /**
   * Optional callback called when the search value is cleared.
   */
  onClear?: () => void;

  /**
   * Provide an optional hook that is called each time the input is expanded
   */
  onExpand?: (event: FocusEvent<HTMLInputElement>, value: boolean) => void;

  /**
   * Provide an optional function to be called when the search input gains focus, this will be
   * passed the event as the first parameter and a function to handle the expanding of the search
   * input as the second.
   */
  onFocus?: (
    event: FocusEvent<HTMLInputElement>,
    handleExpand: (event: FocusEvent<HTMLInputElement>, value: boolean) => void
  ) => void;

  /**
   * Whether the search should be allowed to expand
   */
  persistent?: boolean;

  /**
   * Provide an optional placeholder text for the Search component
   */
  placeholder?: string;

  /**
   * Provide an optional className for the overall container of the Search
   */
  searchContainerClass?: string;

  /**
   * Specify the size of the Search
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Optional prop to specify the tabIndex of the <Search> (in expanded state) or the container (in collapsed state)
   */
  tabIndex?: number | string;
  /**
   * Provide custom text for the component for each translation id
   */
  translateWithId?: (id: string) => string;
}

const TableToolbarSearch = ({
  className,
  searchContainerClass,
  onChange: onChangeProp,
  onClear = noopFn,
  translateWithId: t = translateWithId,
  placeholder,
  labelText,
  expanded: expandedProp,
  defaultExpanded,
  defaultValue,
  disabled,
  onExpand,
  persistent = false,
  id,
  onBlur,
  onFocus,
  size = 'lg',
  tabIndex = '0',
  ...rest
}: TableToolbarSearchProps) => {
  const { current: controlled } = useRef(expandedProp !== undefined);
  const [expandedState, setExpandedState] = useState<
    string | boolean | undefined
  >(defaultExpanded || defaultValue);
  const expanded = controlled ? expandedProp : expandedState;
  const [value, setValue] = useState(defaultValue || '');
  const uniqueId = useMemo(getInstanceId, []);
  const [focusTarget, setFocusTarget] = useState<RefObject<HTMLElement> | null>(
    null
  );
  const prefix = usePrefix();

  useEffect(() => {
    if (focusTarget) {
      focusTarget.current?.querySelector?.('input')?.focus();
      setFocusTarget(null);
    }
  }, [focusTarget]);

  useEffect(
    () => {
      if (defaultValue) {
        onChangeProp?.('', defaultValue);
      }
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const searchClasses = cx(className, {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    [searchContainerClass!]: searchContainerClass,
    [`${prefix}--toolbar-search-container-active`]: expanded,
    [`${prefix}--toolbar-search-container-disabled`]: disabled,
    [`${prefix}--toolbar-search-container-expandable`]: !persistent,
    [`${prefix}--toolbar-search-container-persistent`]: persistent,
  });

  const handleExpand = (
    event: FocusEvent<HTMLInputElement>,
    value = !expanded
  ) => {
    if (!disabled) {
      if (!controlled && !persistent) {
        setExpandedState(value);
      }
      if (onExpand) {
        onExpand(event, value);
      }
    }
  };

  const onChange = (e) => {
    setValue(e.target.value);
    if (onChangeProp) {
      onChangeProp(e);
    }
  };

  const handleOnFocus = (event) => handleExpand(event, true);
  const handleOnBlur = (event) => !value && handleExpand(event, false);

  return (
    <Search
      disabled={disabled}
      className={searchClasses}
      value={value}
      id={typeof id !== 'undefined' ? id : uniqueId.toString()}
      labelText={labelText || t('carbon.table.toolbar.search.label')}
      placeholder={placeholder || t('carbon.table.toolbar.search.placeholder')}
      onChange={onChange}
      onClear={onClear}
      onFocus={
        onFocus ? (event) => onFocus(event, handleExpand) : handleOnFocus
      }
      onBlur={onBlur ? (event) => onBlur(event, handleExpand) : handleOnBlur}
      size={size}
      // HTMLAttributes defines tabIndex as number | undefined but in reality it
      // also accepts a string, so we cast here to convince Typescript this is okay.
      tabIndex={tabIndex as number | undefined}
      {...rest}
    />
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
   * Specifies if the search should be disabled
   */
  disabled: PropTypes.bool,

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
   * Provide an optional function to be called when the search input loses focus, this will be
   * passed the event as the first parameter and a function to handle the expanding of the search
   * input as the second
   */
  onBlur: PropTypes.func,

  /**
   * Provide an optional hook that is called each time the input is updated
   */
  onChange: PropTypes.func,

  /**
   * Optional callback called when the search value is cleared.
   */
  onClear: PropTypes.func,

  /**
   * Provide an optional hook that is called each time the input is expanded
   */
  onExpand: PropTypes.func,

  /**
   * Provide an optional function to be called when the search input gains focus, this will be
   * passed the event as the first parameter and a function to handle the expanding of the search
   * input as the second.
   */
  onFocus: PropTypes.func,

  /**
   * Whether the search should be allowed to expand
   */
  persistent: PropTypes.bool,

  /**
   * Provide an optional placeholder text for the Search component
   */
  placeholder: PropTypes.string,

  /**
   * Provide an optional className for the overall container of the Search
   */
  searchContainerClass: PropTypes.string,

  /**
   * Specify the size of the Search
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),

  /**
   * Optional prop to specify the tabIndex of the <Search> (in expanded state) or the container (in collapsed state)
   */
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * Provide custom text for the component for each translation id
   */
  translateWithId: PropTypes.func,
};

export default TableToolbarSearch;
