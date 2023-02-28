/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Search as SearchIcon, Close } from '@carbon/icons-react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { useContext, useRef, useState } from 'react';
import { focus } from '../../internal/focus';
import { keys, match } from '../../internal/keyboard';
import { useId } from '../../internal/useId';
import { usePrefix } from '../../internal/usePrefix';
import { composeEventHandlers } from '../../tools/events';
import { useMergedRefs } from '../../internal/useMergedRefs';
import deprecate from '../../prop-types/deprecate';
import { FormContext } from '../FluidForm';

const Search = React.forwardRef(function Search(
  {
    autoComplete = 'off',
    className,
    closeButtonLabelText = 'Clear search input',
    defaultValue,
    disabled,
    id,
    labelText,
    light,
    onChange = () => {},
    onClear = () => {},
    onKeyDown,
    onExpand,
    placeholder = '',
    renderIcon,
    role = 'searchbox',
    size = 'md',
    type = 'text',
    value,
    ...rest
  },
  forwardRef
) {
  const prefix = usePrefix();
  const { isFluid } = useContext(FormContext);
  const inputRef = useRef(null);
  const ref = useMergedRefs([forwardRef, inputRef]);
  const inputId = useId('search-input');
  const uniqueId = id || inputId;
  const searchId = `${uniqueId}-search`;
  const [hasContent, setHasContent] = useState(value || defaultValue || false);
  const [prevValue, setPrevValue] = useState(value);
  const searchClasses = cx({
    [`${prefix}--search`]: true,
    [`${prefix}--search--sm`]: size === 'sm',
    [`${prefix}--search--md`]: size === 'md',
    [`${prefix}--search--lg`]: size === 'lg',
    [`${prefix}--search--light`]: light,
    [`${prefix}--search--disabled`]: disabled,
    [`${prefix}--search--fluid`]: isFluid,
    [className]: className,
  });
  const clearClasses = cx({
    [`${prefix}--search-close`]: true,
    [`${prefix}--search-close--hidden`]: !hasContent,
  });

  if (value !== prevValue) {
    setHasContent(!!value);
    setPrevValue(value);
  }

  function clearInput() {
    if (!value) {
      inputRef.current.value = '';
    }

    const inputTarget = Object.assign({}, inputRef.current, { value: '' });
    const clearedEvt = { target: inputTarget, type: 'change' };

    onChange(clearedEvt);
    onClear();
    setHasContent(false);
    focus(inputRef);
  }

  function handleChange(event) {
    setHasContent(event.target.value !== '');
  }

  function handleKeyDown(event) {
    if (match(event, keys.Escape)) {
      event.stopPropagation();
      clearInput(event);
    }
  }

  return (
    <div role="search" aria-labelledby={searchId} className={searchClasses}>
      {/* the magnifier is used in ExpandableSearch as a click target to expand,
      however, it does not need a keyboard event bc the input element gets focus on keyboard nav and expands that way*/}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
      <div
        role={onExpand ? 'button' : null}
        className={`${prefix}--search-magnifier`}
        onClick={onExpand}>
        <CustomSearchIcon icon={renderIcon} />
      </div>
      <label id={searchId} htmlFor={uniqueId} className={`${prefix}--label`}>
        {labelText}
      </label>
      <input
        {...rest}
        autoComplete={autoComplete}
        className={`${prefix}--search-input`}
        defaultValue={defaultValue}
        disabled={disabled}
        role={role}
        ref={ref}
        id={uniqueId}
        onChange={composeEventHandlers([onChange, handleChange])}
        onKeyDown={composeEventHandlers([onKeyDown, handleKeyDown])}
        placeholder={placeholder}
        type={type}
        value={value}
      />
      <button
        aria-label={closeButtonLabelText}
        className={clearClasses}
        disabled={disabled}
        onClick={clearInput}
        title={closeButtonLabelText}
        type="button">
        <Close />
      </button>
    </div>
  );
});

Search.displayName = 'Search';
Search.propTypes = {
  /**
   * Specify an optional value for the `autocomplete` property on the underlying
   * `<input>`, defaults to "off"
   */
  autoComplete: PropTypes.string,

  /**
   * Specify an optional className to be applied to the container node
   */
  className: PropTypes.string,

  /**
   * Specify a label to be read by screen readers on the "close" button
   */
  closeButtonLabelText: PropTypes.string,

  /**
   * Optionally provide the default value of the `<input>`
   */
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Specify whether the `<input>` should be disabled
   */
  disabled: PropTypes.bool,

  /**
   * Specify a custom `id` for the input
   */
  id: PropTypes.string,

  /**
   * Provide the label text for the Search icon
   */
  labelText: PropTypes.node.isRequired,

  /**
   * Specify light version or default version of this control
   */
  light: deprecate(
    PropTypes.bool,
    'The `light` prop for `Search` is no longer needed and has ' +
      'been deprecated in v11 in favor of the new `Layer` component. It will be moved in the next major release.'
  ),

  /**
   * Optional callback called when the search value changes.
   */
  onChange: PropTypes.func,

  /**
   * Optional callback called when the search value is cleared.
   */
  onClear: PropTypes.func,

  /**
   * Optional callback called when the magnifier icon is clicked in ExpandableSearch.
   */
  onExpand: PropTypes.func,

  /**
   * Provide a handler that is invoked on the key down event for the input
   */
  onKeyDown: PropTypes.func,

  /**
   * Provide an optional placeholder text for the Search.
   * Note: if the label and placeholder differ,
   * VoiceOver on Mac will read both
   */
  placeholder: PropTypes.string,

  /**
   * Rendered icon for the Search.
   * Can be a React component class
   */
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

  /**
   * Specify the role for the underlying `<input>`, defaults to `searchbox`
   */
  role: PropTypes.string,

  /**
   * Specify the size of the Search
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /**
   * Optional prop to specify the type of the `<input>`
   */
  type: PropTypes.string,

  /**
   * Specify the value of the `<input>`
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

function CustomSearchIcon({ icon: Icon }) {
  const prefix = usePrefix();

  if (Icon) {
    return <Icon className={`${prefix}--search-magnifier-icon`} />;
  }

  return <SearchIcon className={`${prefix}--search-magnifier-icon`} />;
}

CustomSearchIcon.propTypes = {
  /**
   * Rendered icon for the Search. Can be a React component class
   */
  icon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

export default Search;
