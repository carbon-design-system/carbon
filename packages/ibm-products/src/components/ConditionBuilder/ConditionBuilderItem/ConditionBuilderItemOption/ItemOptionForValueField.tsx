/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useContext, useEffect, useRef, useState } from 'react';

import { Search, Button } from '@carbon/react';

import {
  Checkmark,
  Checkbox,
  CheckboxCheckedFilled,
} from '@carbon/react/icons';
/**@ts-ignore */
import { SelectSkeleton } from '@carbon/react';

import PropTypes from 'prop-types';
import { ConditionBuilderContext } from '../../ConditionBuilderContext/ConditionBuilderProvider';
import { useTranslations } from '../../utils/useTranslations';
import {
  Condition,
  ConditionBuilderState,
  Option,
  PropertyConfigOption,
} from '../../ConditionBuilder.types';
import {
  blockClass,
  checkForMultiSelectOperator,
  onKeyDownHandlerForSearch,
} from '../../utils/util';

interface ItemOptionForValueFieldProps {
  conditionState: Condition & { label?: string };
  config: PropertyConfigOption['config'];
  onChange: (value: any, e?: Event) => void;
  closePopover?: () => void;
}
export const ItemOptionForValueField = ({
  conditionState = {},
  config = {},
  onChange,
  closePopover,
}: ItemOptionForValueFieldProps) => {
  const multiSelectable = checkForMultiSelectOperator(conditionState, config);

  const { popOverSearchThreshold, getOptions, rootState } = useContext(
    ConditionBuilderContext
  );
  const [propertyText, clearSearchText] = useTranslations([
    'propertyText',
    'clearSearchText',
  ]);
  const { conditionBuilderRef } = useContext(ConditionBuilderContext);
  const contentRef = useRef<HTMLDivElement>(null);

  const [allOptions, setAllOptions] = useState<Option[]>(
    config?.options as Option[]
  );
  const [searchValue, setSearchValue] = useState<string>('');

  const filteredItems = allOptions?.filter((opt) =>
    opt.label.toLowerCase().includes(searchValue.toLowerCase())
  );

  const selection = Array.isArray(conditionState.value)
    ? conditionState.value
    : conditionState.value !== undefined
      ? [conditionState.value]
      : [];

  useEffect(() => {
    //this commented code is kept as intentional. Alternate approach to pass async options instead of getOptions callback.
    // if(rest['data-name'] == 'valueField'){
    //   const fetchData = async () => {
    //     const response = await config.options(conditionState);
    //     if (
    //       response?.length > 0 &&
    //       Object.keys(response[0]).includes('label') &&
    //       Object.keys(response[0]).includes('id')
    //     ) {
    //       setAllOptions(response);
    //       setFilteredItems(response);
    //     }
    //   };

    //   fetchData(); // Call the async method
    // }else{
    //   setAllOptions(config.options);
    //       setFilteredItems(config.options);
    // }

    if (!allOptions && getOptions) {
      const fetchData = async () => {
        const response = await getOptions(
          rootState as ConditionBuilderState,
          conditionState
        );
        if (
          response?.length > 0 &&
          Object.keys(response[0]).includes('label') &&
          Object.keys(response[0]).includes('id')
        ) {
          setAllOptions(response);
        }
      };

      fetchData(); // Call the async method
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    //this will focus the first input field in the popover

    if (contentRef.current) {
      const firstFocusableElement = contentRef.current.querySelector(
        'input, button,li'
      ) as HTMLUListElement | HTMLElement;

      if (firstFocusableElement) {
        firstFocusableElement?.focus();
      }
    }
  }, [allOptions]);

  const handleSelectAll = (evt) => {
    if (evt.currentTarget.dataset.selectedAll == 'false') {
      onChange(undefined);
    } else {
      onChange(allOptions);
    }
  };
  const onSearchChangeHandler = (evt) => {
    const { value } = evt.target;
    setSearchValue(value);
  };

  const onClickHandler = (evt, option, isSelected) => {
    const updatedSelections = selection.filter(
      (item) => item !== 'INVALID'
    ) as Option[];
    if (multiSelectable) {
      if (isSelected) {
        const items = updatedSelections.filter((v) => v.id !== option.id);
        onChange(items.length > 0 ? items : undefined);
      } else {
        onChange([...updatedSelections, option]);
      }
    } else {
      onChange(option, evt);
    }
    if (evt.target instanceof SVGElement) {
      evt.stopPropagation();
      //stop propagate event , since this closes the popover when clicked on checkboxes which are SVGs.
    }
  };

  const getAriaLabel = () => {
    return conditionState.label
      ? conditionState.label
      : conditionState.property
        ? conditionState.property
        : propertyText;
  };

  if (!allOptions) {
    return <SelectSkeleton />;
  }
  return (
    <div className={`${blockClass}__item-option`} ref={contentRef}>
      {allOptions.length > popOverSearchThreshold ? (
        <div className={`${blockClass}__item-option__search`}>
          <Search
            size="sm"
            labelText={clearSearchText}
            closeButtonLabelText={clearSearchText}
            onChange={onSearchChangeHandler}
            onKeyDown={(evt) => {
              onKeyDownHandlerForSearch(evt, conditionBuilderRef, closePopover);
            }}
          />
        </div>
      ) : null}

      {multiSelectable && (
        <div className={`${blockClass}__multiselectSelectionStatusContainer`}>
          <label>
            {selection.length}/{allOptions.length} Selected
          </label>
          <Button
            kind={'ghost'}
            size={'sm'}
            data-selected-all={`${selection.length == 0 ? true : false}`}
            onClick={handleSelectAll}
            className={`${blockClass}__selectAll-button`}
          >
            {selection.length == 0 ? 'Select all' : 'Deselect all'}
          </Button>
        </div>
      )}

      <ul
        aria-label={getAriaLabel()}
        role="listbox"
        data-multi-select={multiSelectable}
      >
        {filteredItems?.map((option) => {
          const isSelected = selection
            .map((option) => (option as Option).id)
            .includes(option.id);
          const Icon = option.icon;

          return (
            <li
              tabIndex={0}
              key={option.id}
              role="option"
              aria-selected={isSelected}
              className={`${blockClass}__item-option__option`}
              onKeyUp={() => {
                return false;
              }}
              onClick={(evt) => onClickHandler(evt, option, isSelected)}
            >
              <div className={`${blockClass}__item-option__option-content`}>
                {multiSelectable ? (
                  <>
                    <span className={`${blockClass}__option-check-box`}>
                      {isSelected ? <CheckboxCheckedFilled /> : <Checkbox />}
                    </span>

                    <span
                      className={`${blockClass}__item-option__option-label`}
                    >
                      <span
                        className={`${blockClass}__item-option__option-label-text`}
                        title={option.label}
                      >
                        {option.label}
                      </span>
                      {Icon && (
                        <span className={`${blockClass}__option-icon`}>
                          <Icon />
                        </span>
                      )}
                    </span>
                  </>
                ) : (
                  <>
                    <span
                      className={`${blockClass}__item-option__option-label`}
                    >
                      {Icon && <Icon />}
                      <span
                        className={`${blockClass}__item-option__option-label-text`}
                        title={option.label}
                      >
                        {option.label}
                      </span>
                    </span>
                    {isSelected && (
                      <Checkmark className={`${blockClass}__checkmark`} />
                    )}
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

ItemOptionForValueField.propTypes = {
  /**
   * current condition object
   */
  conditionState: PropTypes.object,

  /**
   * current config object that this property is part of
   */
  config: PropTypes.object,

  /**
   * callback to update state oin date change
   */
  onChange: PropTypes.func,
};
