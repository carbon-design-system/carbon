/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useContext, useEffect, useRef, useState } from 'react';

import { Search } from '@carbon/react';

import { Checkmark } from '@carbon/react/icons';

import PropTypes from 'prop-types';
import { ConditionBuilderContext } from '../../ConditionBuilderContext/ConditionBuilderProvider';
import { useTranslations } from '../../utils/useTranslations';
import {
  ConditionGroup,
  option,
  Property,
  statementConfig,
} from '../../ConditionBuilder.types';
import { blockClass, onKeyDownHandlerForSearch } from '../../utils/util';

interface ItemOptionProps {
  conditionState: {
    label?: string;
    value?: string;
  };
  config: { options?: option[] | statementConfig[] | Property[] } & {
    isStatement?: boolean;
  };
  onChange: (value: string, e: Event) => void;
  closePopover?: () => void;
  group?: ConditionGroup;
}
export const ItemOption = ({
  conditionState = {},
  config = {},
  onChange,
  closePopover,
  group,
}: ItemOptionProps) => {
  const { popOverSearchThreshold } = useContext(ConditionBuilderContext);
  const contentRef = useRef<HTMLDivElement>(null);
  const [propertyText, clearSearchText] = useTranslations([
    'propertyText',
    'clearSearchText',
  ]);
  const { conditionBuilderRef } = useContext(ConditionBuilderContext);
  const allOptions = config?.options;
  const [searchValue, setSearchValue] = useState('');

  const selection = conditionState.value;

  const filteredItems = searchValue
    ? allOptions?.filter((opt) =>
        opt.label?.toLowerCase().includes(searchValue.toLowerCase())
      )
    : allOptions;

  useEffect(() => {
    //this will focus the first input field in the popover

    if (contentRef.current) {
      const firstFocusableElement = contentRef.current?.querySelector(
        'input, button,li'
      ) as HTMLInputElement;

      if (firstFocusableElement) {
        firstFocusableElement.focus();
      }
    }
  }, [allOptions]);

  const onClickHandler = (evt, option) => {
    if (!evt.currentTarget.hasAttribute('aria-disabled')) {
      onChange(option.id, evt);
    }
  };

  const onSearchChangeHandler = (evt) => {
    const { value } = evt.target;
    setSearchValue(value);
  };

  const getAriaLabel = () => {
    return conditionState.label ? conditionState.label : propertyText;
  };

  const getStatementContent = (option) => {
    return (
      <div className={`${blockClass}__statement_wrapper`}>
        <div>
          {option.label} ({option.connector})
        </div>
        <div>{option.secondaryLabel}</div>
      </div>
    );
  };

  if (!allOptions) {
    return;
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
            onKeyDown={(evt: React.KeyboardEvent<HTMLInputElement>) => {
              onKeyDownHandlerForSearch(evt, conditionBuilderRef, closePopover);
            }}
          />
        </div>
      ) : null}

      <ul aria-label={getAriaLabel()} role="listbox">
        {filteredItems?.map((option) => {
          const isSelected = selection === option.id;
          const Icon = (option as option).icon;
          const disabled = (option as Property)?.getIsDisabled?.({
            conditionState,
            group,
          });
          const hidden = (option as Property)?.getIsHidden?.({
            conditionState,
            group,
          });

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
              onClick={(evt) => onClickHandler(evt, option)}
              {...(disabled ? { 'aria-disabled': 'true' } : {})}
              {...(hidden ? { 'aria-hidden': 'true' } : {})}
            >
              <div className={`${blockClass}__item-option__option-content`}>
                <span className={`${blockClass}__item-option__option-label`}>
                  {Icon && <Icon />}
                  <span
                    className={`${blockClass}__item-option__option-label-text`}
                    title={option.label}
                  >
                    {config?.isStatement
                      ? getStatementContent(option)
                      : option.label}
                  </span>
                </span>
                {isSelected && (
                  <Checkmark className={`${blockClass}__checkmark`} />
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

ItemOption.propTypes = {
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
