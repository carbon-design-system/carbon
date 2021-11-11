/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { useState, useRef, useEffect } from 'react';
import cx from 'classnames';
import { Search16, Close16 } from '@carbon/icons-react';
import { composeEventHandlers } from '../../../tools/events';
import { keys, match } from '../../../internal/keyboard';
import { useId } from '../../../internal/useId';
import deprecate from '../../../prop-types/deprecate';
import { usePrefix } from '../../../internal/usePrefix';

const Search = React.forwardRef(function Search(
  {
    className,
    closeButtonLabelText,
    defaultValue,
    disabled,
    id,
    labelText,
    light,
    onChange,
    onClear,
    onKeyDown,
    placeHolderText,
    placeholder,
    renderIcon,
    size = !small ? 'lg' : 'sm',
    small,
    type,
    value,
    ...rest
  },
  ref
) {
  const prefix = usePrefix();

  const input = useRef(null);
  const magnifier = useRef(null);

  const inputId = useId('search-input');
  const uniqueId = id || inputId;
  const searchId = `${uniqueId}-search`;

  const [hasContent, setHasContent] = useState(value || defaultValue || false);

  const [prevValue, setPrevValue] = useState(value);

  if (value !== prevValue) {
    setHasContent(!!value);
    setPrevValue(value);
  }

  function clearInput(evt) {
    if (!value) {
      input.current.value = '';
      onChange(evt);
    } else {
      const clearedEvt = Object.assign({}, evt.target, {
        target: {
          value: '',
        },
      });
      onChange(clearedEvt);
    }

    onClear();

    setHasContent(false);
  }

  useEffect(() => {
    if (!hasContent) {
      input.current.focus();
    }
  }, [hasContent]);

  function handleChange(evt) {
    setHasContent(evt.target.value !== '');
  }

  function handleKeyDown(evt) {
    if (match(evt, keys.Escape)) {
      clearInput(evt);
    }
  }

  const searchClasses = cx({
    [`${prefix}--search`]: true,
    [`${prefix}--search--sm`]: size === 'sm',
    [`${prefix}--search--md`]: size === 'md',
    [`${prefix}--search--lg`]: size === 'lg',
    [`${prefix}--search--light`]: light,
    [`${prefix}--search--disabled`]: disabled,
    [className]: className,
  });

  const clearClasses = cx({
    [`${prefix}--search-close`]: true,
    [`${prefix}--search-close--hidden`]: !hasContent,
  });

  let customIcon;
  if (renderIcon) {
    customIcon = React.cloneElement(renderIcon, {
      className: `${prefix}--search-magnifier-icon`,
    });
  }

  const searchIcon = renderIcon ? (
    customIcon
  ) : (
    <Search16 className={`${prefix}--search-magnifier-icon`} />
  );

  return (
    <div
      role="search"
      aria-labelledby={searchId}
      className={searchClasses}
      ref={ref}>
      <div className={`${prefix}--search-magnifier`} ref={magnifier}>
        {searchIcon}
      </div>
      <label id={searchId} htmlFor={uniqueId} className={`${prefix}--label`}>
        {labelText}
      </label>
      <input
        role="searchbox"
        autoComplete="off"
        defaultValue={defaultValue}
        value={value}
        {...rest}
        type={type}
        disabled={disabled}
        className={`${prefix}--search-input`}
        id={uniqueId}
        placeholder={placeHolderText || placeholder}
        onChange={composeEventHandlers([onChange, handleChange])}
        onKeyDown={composeEventHandlers([onKeyDown, handleKeyDown])}
        ref={input}
      />
      <button
        className={clearClasses}
        disabled={disabled}
        onClick={clearInput}
        type="button"
        aria-label={closeButtonLabelText}>
        <Close16 />
      </button>
    </div>
  );
});

Search.propTypes = {
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
  light: PropTypes.bool,

  /**
   * Optional callback called when the search value changes.
   */
  onChange: PropTypes.func,

  /**
   * Optional callback called when the search value is cleared.
   */
  onClear: PropTypes.func,

  /**
   * Provide a handler that is invoked on the key down event for the input
   */
  onKeyDown: PropTypes.func,

  /**
   * Deprecated in favor of `placeholder`
   */
  placeHolderText: deprecate(
    PropTypes.string,
    `\nThe prop \`placeHolderText\` for Search has been deprecated in favor of \`placeholder\`. Please use \`placeholder\` instead.`
  ),

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
   * Specify the search size
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),

  /**
   * Specify whether the Search should be a small variant
   */

  /**
   * Specify whether the load was successful
   */
  small: deprecate(
    PropTypes.bool,
    `\nThe prop \`small\` for Search has been deprecated in favor of \`size\`. Please use \`size="sm"\` instead.`
  ),

  /**
   * Optional prop to specify the type of the `<input>`
   */
  type: PropTypes.string,

  /**
   * Specify the value of the `<input>`
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Search.defaultProps = {
  type: 'text',
  placeholder: '',
  closeButtonLabelText: 'Clear search input',
  onChange: () => {},
  onClear: () => {},
};

export default Search;
