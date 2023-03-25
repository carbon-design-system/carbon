/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Search as SearchIcon, Close } from '@carbon/icons-react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { useContext, useRef, useState, HTMLAttributes } from 'react';
import { focus } from '../../internal/focus';
import { keys, match } from '../../internal/keyboard';
import { useId } from '../../internal/useId';
import { usePrefix } from '../../internal/usePrefix';
import { composeEventHandlers } from '../../tools/events';
import { useMergedRefs } from '../../internal/useMergedRefs';
import deprecate from '../../prop-types/deprecate';
import { FormContext } from '../FluidForm';

export interface SearchProps
  extends Omit<HTMLAttributes<HTMLInputElement>, 'onChange' | 'onKeyDown'> {
  /**
   * Specify an optional value for the `autocomplete` property on `<input>`
   * @default "off"
   */
  autoComplete?: string;

  /**
   * Specify an optional className to be applied to the container node
   */
  className?: string;

  /**
   * Specify a label to be read by screen readers on the "close" button
   * @default "Clear search input"
   */
  closeButtonLabelText?: string;

  /**
   * Optionally provide the default value of the `<input>`
   */
  defaultValue?: string | number;

  /**
   * Specify whether the `<input>` should be disabled
   */
  disabled?: boolean;

  /**
   * Specify a custom `id` for the input
   */
  id?: string;

  /**
   * Provide the label text for the Search icon
   */
  labelText: React.ReactNode;

  /**
   * Specify light version or default version of this control
   * @deprecated
   * The `light` prop for `Search` is no longer needed and has
   * been deprecated in v11 in favor of the new `Layer` component.
   * It will be moved in the next major release.
   */
  light?: boolean;

  /**
   * Optional callback called when the search value changes.
   */
  onChange?: (e?: Partial<React.ChangeEventHandler<HTMLInputElement>>) => void;

  /**
   * Optional callback called when the search value is cleared.
   */
  onClear?: () => void;

  /**
   * Optional callback called when the magnifier icon is clicked in ExpandableSearch.
   */
  onExpand?: () => void;

  /**
   * Provide a handler that is invoked on the key down event for the input
   */
  onKeyDown?: (
    e?: Partial<React.KeyboardEventHandler<HTMLInputElement>>
  ) => void;

  /**
   * Provide an optional placeholder text for the Search.
   * Note: if the label and placeholder differ,
   * VoiceOver on Mac will read both
   * @default "Search"
   */
  placeholder?: string;

  /**
   * Rendered icon for the Search.
   * Can be a React component class
   */
  renderIcon?: React.ReactElement | undefined;

  /**
   * Specify the role for the underlying `<input>`
   * @default "searchbox"
   */
  role?: string;

  /**
   * Specify the size of the Search
   * @default "md"
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Optional prop to specify the type of the `<input>`
   * @default "text"
   */
  type?: string;

  /**
   * Specify the value of the `<input>`
   */
  value?: string | number;
}

const Search: React.ForwardRefExoticComponent<SearchProps> = React.forwardRef(
  function Search(
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
      placeholder = 'Search',
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
    const inputRef = useRef<HTMLInputElement>(null);
    const ref = useMergedRefs([forwardRef, inputRef]);
    const inputId = useId('search-input');
    const uniqueId = id || inputId;
    const searchId = `${uniqueId}-search`;
    const [hasContent, setHasContent] = useState(
      value || defaultValue || false
    );
    const [prevValue, setPrevValue] = useState(value);
    const searchClasses = cx({
      [`${prefix}--search`]: true,
      [`${prefix}--search--sm`]: size === 'sm',
      [`${prefix}--search--md`]: size === 'md',
      [`${prefix}--search--lg`]: size === 'lg',
      [`${prefix}--search--light`]: light,
      [`${prefix}--search--disabled`]: disabled,
      [`${prefix}--search--fluid`]: isFluid,
      [className + '']: className,
    });
    const clearClasses = cx({
      [`${prefix}--search-close`]: true,
      [`${prefix}--search-close--hidden`]: !hasContent,
    });

    if (value !== prevValue) {
      setHasContent(!!value);
      setPrevValue(value);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function clearInput(e?: React.MouseEvent | React.KeyboardEvent) {
      if (!value && inputRef.current) {
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
      <div role="search" aria-label={placeholder} className={searchClasses}>
        {/* the magnifier is used in ExpandableSearch as a click target to expand,
      however, it does not need a keyboard event bc the input element gets focus on keyboard nav and expands that way*/}
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
        <div
          aria-labelledby={uniqueId}
          role={onExpand ? 'button' : undefined}
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
          ref={ref as React.LegacyRef<HTMLInputElement>}
          id={uniqueId}
          onChange={composeEventHandlers([onChange, handleChange]) as any}
          onKeyDown={
            composeEventHandlers([onKeyDown as any, handleKeyDown]) as any
          }
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
  }
);

Search.displayName = 'Search';
Search.propTypes = {
  /**
   * Specify an optional value for the `autocomplete` property on `<input>`
   * @default "off"
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
   * @default "Search"
   */
  placeholder: PropTypes.string,

  /**
   * Rendered icon for the Search.
   * Can be a React component class
   */
  renderIcon: PropTypes.element,

  /**
   * Specify the role for the underlying `<input>`
   * @default "searchbox"
   */
  role: PropTypes.string,

  /**
   * Specify the size of the Search
   * @default "md"
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),

  /**
   * Optional prop to specify the type of the `<input>`
   * @default "text"
   */
  type: PropTypes.string,

  /**
   * Specify the value of the `<input>`
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

function CustomSearchIcon({ icon }) {
  const prefix = usePrefix();

  if (icon) {
    return React.cloneElement(icon, {
      className: `${prefix}--search-magnifier-icon`,
    });
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
