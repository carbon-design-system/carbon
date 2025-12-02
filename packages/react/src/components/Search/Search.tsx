/**
 * Copyright IBM Corp. 2016, 2025
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
  type ChangeEvent,
  type ComponentType,
  type FunctionComponent,
  type HTMLAttributes,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from 'react';
import { keys, match } from '../../internal/keyboard';
import { useId } from '../../internal/useId';
import { usePrefix } from '../../internal/usePrefix';
import { composeEventHandlers } from '../../tools/events';
import { useMergedRefs } from '../../internal/useMergedRefs';
import { deprecate } from '../../prop-types/deprecate';
import { FormContext } from '../FluidForm';
import { noopFn } from '../../internal/noopFn';
import { Tooltip } from '../Tooltip';

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
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;

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
   * A component used to render an icon.
   */
  renderIcon?: ComponentType | FunctionComponent;

  /**
   * @deprecated Specify the role for the underlying `<input>`.
   * No longer needed since `<input type="search">` already provides the correct semantics.
   * This prop will be removed in the next major release of Carbon.
   */
  role?: string;

  /**
   * Specify the size of the Search
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Specify the type of the `<input>`
   */
  type?: string;

  /**
   * Specify the value of the `<input>`
   */
  value?: string | number;
}

const Search = React.forwardRef<HTMLInputElement, SearchProps>(
  (
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
      role,
      size = 'md',
      type = 'search',
      value,
      ...rest
    },
    forwardRef
  ) => {
    const hasPropValue = value || defaultValue ? true : false;
    const prefix = usePrefix();
    const { isFluid } = useContext(FormContext);
    const inputRef = useRef<HTMLInputElement>(null);
    const ref = useMergedRefs([forwardRef, inputRef]);
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

      if (inputRef.current) {
        const inputTarget = Object.assign({}, inputRef.current, { value: '' });
        const syntheticEvent: ChangeEvent<HTMLInputElement> = {
          bubbles: false,
          cancelable: false,
          currentTarget: inputRef.current,
          defaultPrevented: false,
          eventPhase: 0,
          isDefaultPrevented: () => false,
          isPropagationStopped: () => false,
          isTrusted: false,
          nativeEvent: new Event('change'),
          persist: noopFn,
          preventDefault: noopFn,
          stopPropagation: noopFn,
          target: inputTarget,
          timeStamp: 0,
          type: 'change',
        };

        onChange(syntheticEvent);
      }

      onClear();
      setHasContent(false);
      inputRef.current?.focus();
    }

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
      setHasContent(event.target.value !== '');
    }

    function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
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

    const magnifierButton = (
      <div
        aria-labelledby={onExpand ? searchId : undefined}
        role={onExpand ? 'button' : undefined}
        className={`${prefix}--search-magnifier`}
        onClick={onExpand}
        onKeyDown={handleExpandButtonKeyDown}
        tabIndex={onExpand && !isExpanded ? 0 : -1}
        ref={expandButtonRef}
        aria-expanded={
          onExpand && isExpanded
            ? true
            : onExpand && !isExpanded
              ? false
              : undefined
        }
        aria-controls={onExpand ? uniqueId : undefined}>
        <CustomSearchIcon icon={renderIcon} />
      </div>
    );

    // Wrap magnifierButton in a tooltip if it's expandable
    const magnifierWithTooltip =
      onExpand && !isExpanded ? (
        <Tooltip
          className={`${prefix}--search-tooltip ${prefix}--search-magnifier-tooltip`}
          align="top"
          label="Search">
          {magnifierButton}
        </Tooltip>
      ) : (
        magnifierButton
      );

    return (
      <div role="search" aria-label={placeholder} className={searchClasses}>
        {magnifierWithTooltip}
        {/* the magnifier is used in ExpandableSearch as a click target to expand,
      however, it does not need a keyboard event bc the input element gets focus on keyboard nav and expands that way*/}

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
  }
);

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
   * A component used to render an icon.
   */
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

  /**
   * Deprecated, since <input type="search"> already provides correct semantics.
   * Specify the role for the underlying `<input>`, defaults to `searchbox`
   */
  role: deprecate(
    PropTypes.string,
    'The `role` prop has been deprecated since <input type="search"> already provides correct semantics. ' +
      'It will be removed in the next major release of Carbon.'
  ),

  /**
   * Specify the size of the Search
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),

  /**
   * Specify the type of the `<input>`
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
