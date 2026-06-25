/**
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Carbon and package components we use.
import { Button, MultiSelect, Search } from '@carbon/react';
// Import portions of React that are needed.
import React, {
  PropsWithChildren,
  ReactNode,
  useEffect,
  useState,
} from 'react';

// Other standard imports.
import PropTypes from 'prop-types';
import cx from 'classnames';
import { getDevtoolsProps } from '../../global/js/utils/devtools';
import { pkg } from '../../settings';

// The block part of our conventional BEM class names (blockClass__E--M).
const blockClass = `${pkg.prefix}--search-bar`;
const componentName = 'SearchBar';

// NOTE: the component SCSS is not imported here: it is rolled up separately.

// Default values for props
const defaults = {
  onSubmit: () => {},
  onChange: () => {},
  scopes: [],
  selectedScopes: [],
  hideScopesLabel: true,
};

type Scopes = string[] | object[];

export interface SearchBarProps extends PropsWithChildren {
  /** @type {string} Optional additional class name. */
  className?: string;

  /** @type {string} The label text for the search text input. */
  clearButtonLabelText: string;

  /**
   * Whether or not the scopes MultiSelect label is visually hidden.
   */
  hideScopesLabel?: boolean;

  /** @type {string} The label text for the search text input. */
  labelText: string;

  /** @type {Function} Function handler for when the user changes their query search. */
  onChange?: (event: any) => void;

  /** @type {Function} Function handler for when the user submits a search. */
  onSubmit?: (event: any) => void;

  /** @type {string} Placeholder text to be displayed in the search input. */
  placeholderText: string;

  /** @type {Function} Function to get the text for each scope to display in dropdown. */
  scopeToString?: (item: string | object) => string;

  /** @type {Array<any>} Array of allowed search scopes. */
  scopes?: Scopes;

  /** @type {string} The name text for the search scope type. */

  scopesTypeLabel?: NonNullable<ReactNode>;

  /** @type {Array<any> Array of initially selected search scopes. */
  selectedScopes?: Scopes;

  /**
   * Optional custom sorting algorithm for an array of scope items.
   * By default, scope items are sorted in ascending alphabetical order,
   * with "selected" items moved to the start of the scope items array.
   */
  sortItems?: (items: readonly unknown[]) => unknown[];

  /** @type {string} The label text for the search submit button. */
  submitLabel: string;

  /**
   * Provide accessible label text for the scopes MultiSelect.
   */
  titleText?: string;

  /** @type {func} Callback function for translating MultiSelect's child ListBoxMenuIcon SVG title. */
  translateWithId?: (
    messageId: 'close.menu' | 'open.menu' | 'clear.all' | 'clear.selection'
  ) => string;

  /** @type {string} Search query value. */
  value?: string;
  /**
   * Search bar with input field and search button
   */
}

export const SearchBar = React.forwardRef<HTMLFormElement, SearchBarProps>(
  (
    {
      // The component props, in alphabetical order (for consistency).
      className,
      clearButtonLabelText,
      hideScopesLabel = defaults.hideScopesLabel,
      labelText,
      onChange = defaults.onChange,
      onSubmit = defaults.onSubmit,
      placeholderText,
      scopes = [],
      scopesTypeLabel,
      scopeToString,
      selectedScopes = [],
      sortItems,
      submitLabel,
      translateWithId,
      value,
      // Collect any other property values passed in.
      ...rest
    }: SearchBarProps,
    ref
  ) => {
    const [text, setText] = useState(value || '');
    const [_selectedScopes, setSelectedScopes] = useState(selectedScopes || []);
    const [isInputDirty, setIsInputDirty] = useState(false);

    useEffect(() => {
      if (!text || !text.length) {
        setIsInputDirty(false);
      } else {
        setIsInputDirty(true);
      }
    }, [text]);
    /**
     * Handler for form submit that calls onSubmit prop.
     * @param {Event} event Submit event generated.
     */
    const handleSubmit = (event: any) => {
      event.preventDefault();
      const eventObject: { value: string; selectedScopes?: Scopes } = {
        value: text,
      };
      if (scopes.length > 0) {
        eventObject.selectedScopes = _selectedScopes;
      }

      onSubmit(eventObject);
    };

    /**
     * Handler for when scope selection changes that calls onChangeProp.
     * @param {{selectedItems: Array<any>}} {selectedItems} Object containing array of selected items.
     */
    const handleSearchScopeChange = ({
      selectedItems,
    }: {
      selectedItems: Scopes[];
    }) => {
      setSelectedScopes(selectedItems);

      onChange({
        selectedScopes: selectedItems,
        value: text,
      });
    };

    /**
     * Handler for search input changes that calls onChange prop.
     * @param {KeyboardEvent} event Event object from input change.
     */
    const handleInputChange = (event: any) => {
      const { value } = event.target;
      const eventObject: { value: string; selectedScopes?: Scopes } = { value };
      if (scopes.length > 0) {
        eventObject.selectedScopes = selectedScopes;
      }

      setText(value);
      onChange(eventObject);
    };

    const multiSelectProps = {
      initialSelectedItems: selectedScopes,
      items: scopes,
      itemToString: scopeToString,
      label: scopesTypeLabel as NonNullable<ReactNode>,
      sortItems,
      translateWithId,
    };

    return (
      <form
        {...rest}
        ref={ref}
        {...getDevtoolsProps(componentName)}
        className={cx(blockClass, className, {
          [`${blockClass}--hide-scopes-label`]: hideScopesLabel,
        })}
        onSubmit={handleSubmit}
      >
        {scopes?.length ? (
          <MultiSelect
            {...multiSelectProps}
            id={`${blockClass}__multi-select`}
            className={`${blockClass}__scopes`}
            onChange={handleSearchScopeChange}
            size="lg"
          />
        ) : null}
        <Search
          className={`${blockClass}__input`}
          closeButtonLabelText={clearButtonLabelText}
          labelText={labelText}
          {...{ name: 'search-input' }}
          onChange={handleInputChange}
          placeholder={placeholderText}
          value={text}
          size="lg"
        />
        <Button
          name="search-submit"
          kind="primary"
          type="submit"
          className={`${blockClass}__submit`}
          disabled={!isInputDirty}
        >
          {submitLabel}
        </Button>
      </form>
    );
  }
);

// Return a placeholder if not released and not enabled by feature flag

// The display name of the component, used by React. Note that displayName
// is used in preference to relying on function.name.
SearchBar.displayName = componentName;

const conditionalScopePropValidator = (
  props,
  propName,
  componentName,
  ...rest
) => {
  if (props.scopes && props.scopes.length > 0 && !props[propName]) {
    return new Error(
      `Required \`${propName}\` when \`scopes\` prop type is supplied to \`${componentName}\`. Validation failed.`
    );
  }
  /**@ts-ignore */
  return PropTypes.string(props, propName, componentName, ...rest);
};

export const deprecatedProps = {
  /**
   * **Deprecated**
   *
   * Provide accessible label text for the scopes MultiSelect.
   */
  titleText: PropTypes.string,
};

// The types and DocGen commentary for the component props,
// in alphabetical order (for consistency).
// See https://www.npmjs.com/package/prop-types#usage.
SearchBar.propTypes = {
  /** @type {string} Optional additional class name. */
  className: PropTypes.string,

  /** @type {string} The label text for the search text input. */
  clearButtonLabelText: PropTypes.string.isRequired,

  /**
   * Whether or not the scopes MultiSelect label is visually hidden.
   */
  hideScopesLabel: PropTypes.bool,

  /** @type {string} The label text for the search text input. */
  labelText: PropTypes.string.isRequired,

  /** @type {Function} Function handler for when the user changes their query search. */
  onChange: PropTypes.func,

  /** @type {Function} Function handler for when the user submits a search. */
  onSubmit: PropTypes.func,

  /** @type {string} Placeholder text to be displayed in the search input. */
  placeholderText: PropTypes.string.isRequired,

  /** @type {Function} Function to get the text for each scope to display in dropdown. */
  scopeToString: PropTypes.func,

  /** @type {Array<any>} Array of allowed search scopes. */
  /**@ts-ignore */
  scopes: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.object])
  ),

  /** @type {string} The name text for the search scope type. */
  scopesTypeLabel: conditionalScopePropValidator,

  /** @type {Array<any> Array of initially selected search scopes. */
  /**@ts-ignore */
  selectedScopes: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.object])
  ),

  /**
   * Optional custom sorting algorithm for an array of scope items.
   * By default, scope items are sorted in ascending alphabetical order,
   * with "selected" items moved to the start of the scope items array.
   */
  sortItems: PropTypes.func,

  /** @type {string} The label text for the search submit button. */
  submitLabel: PropTypes.string.isRequired,

  /** @type {func} Callback function for translating MultiSelect's child ListBoxMenuIcon SVG title. */
  translateWithId: PropTypes.func,

  /** @type {string} Search query value. */
  value: PropTypes.string,

  ...deprecatedProps,
};
