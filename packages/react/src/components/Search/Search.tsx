/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Search as SearchIcon, Close } from '@carbon/icons-react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React, {
  useContext,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
  type KeyboardEvent,
  type ComponentType,
  type FunctionComponent,
  type MouseEvent,
} from 'react';
import { focus } from '../../internal/focus';
import { keys, match } from '../../internal/keyboard';
import { useId } from '../../internal/useId';
import { usePrefix } from '../../internal/usePrefix';
import { composeEventHandlers } from '../../tools/events';
import { useMergedRefs } from '../../internal/useMergedRefs';
import deprecate from '../../prop-types/deprecate';
import { FormContext } from '../FluidForm';

type InputPropsBase = Omit<HTMLAttributes<HTMLInputElement>, 'onChange'>;
export interface SearchProps extends InputPropsBase {
  /**
   * Specify an optional value for the `autocomplete` property on the underlying
   * `<input>`, defaults to "off"
   */
  autoComplete?: string;

  /**
   * Specify an optional className to be applied to the container node
   */
  className?: string;

  /**
   * Specify a label to be read by screen readers on the "close" button
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
   * Specify whether or not ExpandableSearch should render expanded or not
   */
  isExpanded?: boolean;

  /**
   * Specify a custom `id` for the input
   */
  id?: string;

  /**
   * Provide the label text for the Search icon
   */
  labelText: ReactNode;

  /**
   * Optional callback called when the search value changes.
   */
  onChange?(e: { target: HTMLInputElement; type: 'change' }): void;

  /**
   * Optional callback called when the search value is cleared.
   */
  onClear?(): void;

  /**
   * Optional callback called when the magnifier icon is clicked in ExpandableSearch.
   */
  onExpand?(
    e: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>
  ): void;

  /**
   * Provide an optional placeholder text for the Search.
   * Note: if the label and placeholder differ,
   * VoiceOver on Mac will read both
   */
  placeholder?: string;

  /**
   * Rendered icon for the Search.
   * Can be a React component class
   */
  renderIcon?: ComponentType | FunctionComponent;

  /**
   * Specify the role for the underlying `<input>`, defaults to `searchbox`
   */
  role?: string;

  /**
   * Specify the size of the Search
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Optional prop to specify the type of the `<input>`
   */
  type?: string;

  /**
   * Specify the value of the `<input>`
   */
  value?: string | number;
}

const Search = React.forwardRef<HTMLInputElement, SearchProps>(function Search(
  {
    autoComplete = 'off',
    className,
    closeButtonLabelText = 'Clear search input',
    defaultValue,
    disabled,
    isExpanded = true,
    id,
    labelText,
    // @ts-expect-error: deprecated prop
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
  const hasPropValue = value || defaultValue ? true : false;
  const prefix = usePrefix();
  const { isFluid } = useContext(FormContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const ref = useMergedRefs<HTMLInputElement>([forwardRef, inputRef]);
  const expandButtonRef = useRef<HTMLDivElement>(null);
  const inputId = useId('search-input');
  const uniqueId = id || inputId;
  const searchId = `${uniqueId}-search`;
  const [hasContent, setHasContent] = useState(hasPropValue || false);
  const [prevValue, setPrevValue] = useState(value);
  const searchClasses = cx(
    {
      [`${prefix}--search`]: true,
      [`${prefix}--search--sm`]: size === 'sm',
      [`${prefix}--search--md`]: size === 'md',
      [`${prefix}--search--lg`]: size === 'lg',
      [`${prefix}--search--light`]: light,
      [`${prefix}--search--disabled`]: disabled,
      [`${prefix}--search--fluid`]: isFluid,
    },
    className
  );

  const clearClasses = cx({
    [`${prefix}--search-close`]: true,
    [`${prefix}--search-close--hidden`]: !hasContent || !isExpanded,
  });

  if (value !== prevValue) {
    setHasContent(!!value);
    setPrevValue(value);
  }

  function clearInput() {
    if (!value && inputRef.current) {
      inputRef.current.value = '';
    }

    const inputTarget = Object.assign({}, inputRef.current, { value: '' });
    const clearedEvt = { target: inputTarget, type: 'change' } as const;

    onChange(clearedEvt);
    onClear();
    setHasContent(false);
    focus(inputRef);
  }

  function handleChange(event) {
    setHasContent(event.target.value !== '');
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (match(event, keys.Escape)) {
      event.stopPropagation();
      if (inputRef.current?.value) {
        clearInput();
      }
      // ExpandableSearch closes on escape when isExpanded, focus search activation button
      else if (onExpand && isExpanded) {
        expandButtonRef.current?.focus();
      }
    }
  }

  function handleExpandButtonKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (match(event, keys.Enter) || match(event, keys.Space)) {
      event.stopPropagation();
      if (onExpand) {
        onExpand(event);
      }
    }
  }

  return (
    <div role="search" aria-label={placeholder} className={searchClasses}>
      {/* the magnifier is used in ExpandableSearch as a click target to expand,
      however, it does not need a keyboard event bc the input element gets focus on keyboard nav and expands that way*/}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
      <div
        aria-label="button"
        aria-labelledby={onExpand ? uniqueId : undefined}
        role="button"
        className={`${prefix}--search-magnifier`}
        onClick={onExpand}
        onKeyDown={handleExpandButtonKeyDown}
        tabIndex={onExpand && !isExpanded ? 0 : -1}
        ref={expandButtonRef}
        aria-expanded={onExpand && isExpanded ? true : false}
        aria-controls={onExpand ? uniqueId : undefined}>
        <CustomSearchIcon icon={renderIcon} />
      </div>
      <label id={searchId} htmlFor={uniqueId} className={`${prefix}--label`}>
        {labelText}
      </label>
      <input
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
        tabIndex={onExpand && !isExpanded ? -1 : undefined}
        {...rest}
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
   * Specify whether or not ExpandableSearch should render expanded or not
   */
  isExpanded: PropTypes.bool,

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
  // @ts-expect-error: PropTypes are not expressive enough to cover this case
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
