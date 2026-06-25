/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { pkg } from '../../../settings';

export const blockClass = `${pkg.prefix}--condition-builder`;
export const NON_HIERARCHICAL_VARIANT = 'Non-Hierarchical';
export const HIERARCHICAL_VARIANT = 'Hierarchical';

export const focusThisField = (evt, conditionBuilderRef) => {
  if (evt) {
    const target = evt.target;
    const itemRow = evt.target.closest('[role="row"]');
    const buttonName = evt.target
      .closest('[role="gridcell"]')
      ?.querySelector('button').dataset.name;
    setTimeout(() => {
      const selector = itemRow.querySelector(
        `button[data-name="${buttonName}"]`
      );

      manageTabIndexAndFocus(selector, conditionBuilderRef);
      if (document.contains(target)) {
        evt.target
          .closest('[role="gridcell"]')
          ?.querySelector('button')
          ?.click();
        evt.target
          .closest('[role="gridcell"]')
          ?.querySelector('button')
          ?.focus();
      }
    }, 0);
  }
};
export const focusThisItem = (currentElement, conditionBuilderRef) => {
  setTimeout(() => {
    manageTabIndexAndFocus(currentElement, conditionBuilderRef);
  }, 0);
};
export const traverseClockwise = (
  eachElem,
  index,
  allElements,
  rotate,
  trapFocus,
  conditionBuilderRef
) => {
  if (eachElem == document.activeElement) {
    if (index !== allElements.length - 1) {
      focusThisItem(allElements[index + 1], conditionBuilderRef);
    } else {
      focusThisItem(
        allElements[rotate ? 0 : allElements.length - 1],
        conditionBuilderRef
      );
    }
  } else if (
    Array.from(allElements).indexOf(document.activeElement) == -1 &&
    trapFocus
  ) {
    focusThisItem(allElements[0], conditionBuilderRef);
  }
};
export const traverseReverse = (
  eachElem,
  index,
  allElements,
  rotate,
  trapFocus,
  conditionBuilderRef
) => {
  if (eachElem == document.activeElement) {
    if (index !== 0) {
      focusThisItem(allElements[index - 1], conditionBuilderRef);
    } else {
      focusThisItem(
        allElements[rotate ? allElements.length - 1 : 0],
        conditionBuilderRef
      );
    }
  } else if (
    Array.from(allElements).indexOf(document.activeElement) == -1 &&
    trapFocus
  ) {
    focusThisItem(allElements[allElements.length - 1], conditionBuilderRef);
  }
};

export const checkForHoldingKey = (evt, key) => {
  // possible key inputs: altKey,ctrlKey,metaKey,shiftKey
  if (key === 'cmd') {
    return evt.metaKey || evt.ctrlKey;
  }
  return evt[key];
};

export const checkIsValid = (item) => {
  return item && item !== 'INVALID';
};

export const manageTabIndexAndFocus = (currentElement, conditionBuilderRef) => {
  const contentContainer =
    currentElement?.closest(`.${blockClass}__content-container`) ??
    currentElement?.closest(`.${blockClass}__actions-container`);
  contentContainer &&
    Array.from(contentContainer.querySelectorAll('[tabindex="0"]')).map(
      (element) => element?.setAttribute('tabindex', '-1')
    );

  currentElement?.setAttribute('tabindex', '0');
  conditionBuilderRef.current
    ?.querySelector(`.${blockClass}__statement-button`)
    ?.setAttribute('tabindex', '1');
  currentElement?.focus();
};

export const getValue = (type, value, config) => {
  if (config?.valueFormatter && ['custom'].includes(type)) {
    return config.valueFormatter(value);
  } else if (type === 'option') {
    if (value && typeof value !== 'string') {
      const selectedValues = Array.isArray(value) ? value : [value];
      return selectedValues.map((option) => option.label).join(', ');
    }

    return value;
  } else {
    return value;
  }
};

//check if the operator is configured as multiSelect in the input configuration or operator is on of
export const checkForMultiSelectOperator = (condition, config) => {
  return (
    condition?.operator === 'oneOf' ||
    config?.operators?.find(
      (operator) =>
        condition?.operator === operator.id && operator.isMultiSelect
    )
  );
};
//this will close the popover on escape key on search box
export const onKeyDownHandlerForSearch = (
  evt,
  conditionBuilderRef,
  closePopover
) => {
  if (!evt.currentTarget.value && evt.key === 'Escape') {
    focusThisField(evt, conditionBuilderRef);
    closePopover?.();
  }
};
