/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  blockClass,
  checkForHoldingKey,
  focusThisField,
  focusThisItem,
  HIERARCHICAL_VARIANT,
  manageTabIndexAndFocus,
  traverseClockwise,
  traverseReverse,
} from './util';

export const handleKeyDown = (evt, conditionBuilderRef, variant) => {
  const activeElement = document.activeElement;

  if (
    !activeElement
      .closest(`.${blockClass}__popover`)
      ?.querySelector('[role="dialog"]')
  ) {
    handleKeyPressForMainContent(evt, conditionBuilderRef, variant);
  }
};

export const handleKeyDownForPopover = (
  evt,
  conditionBuilderRef,
  popoverRef,
  closePopover
) => {
  if (excludeKeyPress(evt)) {
    return;
  }
  handleKeyPressForPopover(
    evt,
    popoverRef?.current,
    conditionBuilderRef,
    closePopover
  );
};

//skipping keyboard handling for date and time fields to get take carbon's
const excludeKeyPress = (evt) => {
  return (
    !['Escape'].includes(evt.key) &&
    evt.target.closest(`.${blockClass}__item-date`)
  );
};

const getVisibleOptions = (parentContainer) => {
  return Array.from(parentContainer.querySelectorAll(`[role="option"]`)).filter(
    (el) => !el.hasAttribute('aria-disabled') && !el.hasAttribute('aria-hidden')
  );
};

const handleKeyPressForPopover = (
  evt,
  parentContainer,
  conditionBuilderRef,
  closePopover
) => {
  const key = evt.key;
  const isHoldingShiftKey = checkForHoldingKey(evt, 'shiftKey');
  const isMultiSelect =
    parentContainer.querySelector('ul')?.dataset.multiSelect;
  const isOptionInput =
    parentContainer.querySelectorAll(`[role="option"]`)?.length;
  let allItems = [];

  if (key === 'Escape') {
    //focus the corresponding field in which the popover is triggered from

    closePopover?.();
    focusThisField(evt, conditionBuilderRef);

    evt.preventDefault();
    evt.stopPropagation();
  }

  if (isOptionInput) {
    switch (key) {
      case 'ArrowUp':
        evt.preventDefault();
        //traverse through the popover options, search box, selectAll button
        allItems = getVisibleOptions(parentContainer);
        allItems.forEach((eachElem, index, allElements) => {
          traverseReverse(
            eachElem,
            index,
            allElements,
            null,
            null,
            conditionBuilderRef
          );
        });
        //scroll to top when we reach a the top of the list to make search box visible
        if (
          Array.from(
            evt.target.closest('ul')?.querySelectorAll('li') ?? []
          ).indexOf(evt.target) === 1
        ) {
          parentContainer.querySelector(
            `.${blockClass}__popover-content-wrapper`
          ).scrollTop = 0;
        }

        break;
      case 'ArrowDown':
        evt.preventDefault();
        //traverse through the popover options, search box, selectAll button
        allItems = getVisibleOptions(parentContainer);
        allItems.forEach((eachElem, index, allElements) => {
          traverseClockwise(
            eachElem,
            index,
            allElements,
            null,
            null,
            conditionBuilderRef
          );
        });

        break;

      case 'Tab':
        allItems = [
          ...Array.from(
            parentContainer.querySelectorAll(
              `.${blockClass}__selectAll-button,[role="searchbox"]`
            )
          ),
          getVisibleOptions(parentContainer)?.[0],
        ];

        allItems.forEach((eachElem, index, allElements) => {
          if (isHoldingShiftKey) {
            traverseReverse(
              eachElem,
              index,
              allElements,
              true,
              true,
              conditionBuilderRef
            );
          } else {
            traverseClockwise(
              eachElem,
              index,
              allElements,
              true,
              true,
              conditionBuilderRef
            );
          }
        });
        evt.preventDefault();
        break;

      case ' ':
        if (isMultiSelect === 'true') {
          if (document.activeElement.type !== 'button') {
            //for button , enter key is click which already handled by framework, for other elements trigger click
            document.activeElement?.click();
          }
          evt.preventDefault();
        }

        break;
      case 'Enter':
        if (document.activeElement.type !== 'button') {
          //for button , enter key is click which already handled by framework, else trigger click
          focusThisField(evt, conditionBuilderRef);
          document.activeElement?.click();
        }

        break;
      default:
        break;
    }
  } else {
    if (key === 'Enter' && !isHoldingShiftKey) {
      if (document.activeElement.type !== 'button') {
        //for button , enter key is click which already handled by framework, else trigger click
        closePopover?.();
        focusThisField(evt, conditionBuilderRef);
      }
    }
  }
};

const handleKeyPressForMainContent = (evt, conditionBuilderRef, variant) => {
  switch (evt.key) {
    case 'ArrowRight':
      evt.preventDefault();
      if (variant == HIERARCHICAL_VARIANT) {
        let allCellsInRow = Array.from(
          evt.target
            .closest('[role="row"]')
            ?.querySelectorAll('[role="gridcell"] button')
        );
        if (allCellsInRow.length === 1) {
          evt.target = evt.target.closest('[role="row"]');
          handleRowNavigationHierarchical(evt, conditionBuilderRef, variant);
          //focus next row
        } else if (evt.target.getAttribute('role') == 'row') {
          //when current focus is on a row, then we need to enter inside and focus the first cell of that row

          //focus first cell
          manageTabIndexAndFocus(allCellsInRow[0], conditionBuilderRef);
        } else {
          //finding the next cell to be focussed
          //next cell = current cell index + 1

          let currentItemIndex = allCellsInRow.indexOf(evt.target);
          if (currentItemIndex < allCellsInRow.length - 1) {
            focusThisItem(
              allCellsInRow[currentItemIndex + 1],
              conditionBuilderRef
            );
          }
        }
      } else {
        handleCellNavigation(evt, conditionBuilderRef);
      }
      break;
    case 'ArrowLeft':
      evt.preventDefault();
      if (variant == HIERARCHICAL_VARIANT) {
        if (evt.target.getAttribute('role') !== 'row') {
          //when any cell is focussed, arrow left will select the previous cell or current row

          let allCellsInRow = Array.from(
            evt.target
              .closest('[role="row"]')
              ?.querySelectorAll('[role="gridcell"] button')
          );

          let currentItemIndex = allCellsInRow.indexOf(evt.target);
          if (currentItemIndex > 0) {
            focusThisItem(
              allCellsInRow[currentItemIndex - 1],
              conditionBuilderRef
            );
          } else {
            //focus the row
            let wrapper = evt.target.closest(`[role="row"]`);
            manageTabIndexAndFocus(wrapper, conditionBuilderRef);
          }
        }
      } else {
        handleCellNavigation(evt, conditionBuilderRef);
      }

      break;

    case 'ArrowUp':
    case 'ArrowDown':
      evt.preventDefault();
      if (variant == HIERARCHICAL_VARIANT) {
        handleRowNavigationHierarchical(evt, conditionBuilderRef, variant);
      } else {
        handleRowNavigation(evt, conditionBuilderRef, variant);
      }

      break;

    case 'Enter':
      if (document.activeElement?.querySelectorAll(`button`)?.length === 1) {
        document.activeElement?.querySelectorAll(`button`)[0]?.click();
      }
      break;

    default:
      break;
  }
};
const getRows = (conditionBuilderRef) => {
  return Array.from(
    conditionBuilderRef.current?.querySelectorAll('[role="row"]')
  );
};

const getRowIndex = (element, conditionBuilderRef) => {
  const rows = getRows(conditionBuilderRef);
  return rows.findIndex((row) => row.contains(element));
};
const handleRowNavigation = (evt, conditionBuilderRef, variant) => {
  const rows = getRows(conditionBuilderRef);

  const currentRowIndex = getRowIndex(evt.target, conditionBuilderRef);

  navigateToNextRowCell(
    evt,
    currentRowIndex,
    rows,
    variant,
    conditionBuilderRef
  );
};
const handleRowNavigationHierarchical = (evt, conditionBuilderRef, variant) => {
  const rows = getRows(conditionBuilderRef);
  const currentRowIndex = getRowIndex(evt.target, conditionBuilderRef);
  let nextRowIndex = currentRowIndex;

  if (evt.target.getAttribute('role') == 'row') {
    if (['ArrowDown', 'ArrowRight'].includes(evt.key)) {
      nextRowIndex += 1;
    } else if (evt.key === 'ArrowUp') {
      nextRowIndex -= 1;
    }

    //maintaining selection for first and last rows
    if (nextRowIndex < 0) {
      nextRowIndex = 0;
    } else if (nextRowIndex >= rows.length) {
      nextRowIndex = rows.length - 1;
    }

    if (nextRowIndex !== currentRowIndex) {
      manageTabIndexAndFocus(rows[nextRowIndex], conditionBuilderRef);
    }
  } else {
    navigateToNextRowCell(
      evt,
      currentRowIndex,
      rows,
      variant,
      conditionBuilderRef
    );
  }
};
const navigateToNextRowCell = (
  evt,
  currentRowIndex,
  rows,
  variant,
  conditionBuilderRef
) => {
  //when the current focussed element is a cell of any row, arrow up/down will focus the next row same cell.

  let nextRowIndex = currentRowIndex;
  if (evt.key === 'ArrowUp') {
    nextRowIndex = currentRowIndex == 0 ? currentRowIndex : currentRowIndex - 1;
  }
  if (evt.key === 'ArrowDown') {
    nextRowIndex =
      currentRowIndex === rows.length - 1
        ? rows.length - 1
        : currentRowIndex + 1;
  }

  const nextRow = rows[nextRowIndex];
  const itemName = evt.target.dataset.name;
  if (nextRow?.querySelector(`[data-name="${itemName}"]`)) {
    manageTabIndexAndFocus(
      nextRow?.querySelector(`[data-name="${itemName}"]`),
      conditionBuilderRef
    );
  } else if (variant === HIERARCHICAL_VARIANT) {
    //when the next row is a if statement , then that row is focused. From any cell of last row of an group , arrow down select the next row (if)
    manageTabIndexAndFocus(nextRow, conditionBuilderRef);
  }
};
const handleCellNavigation = (evt, conditionBuilderRef) => {
  conditionBuilderRef.current
    .querySelectorAll(`[role="gridcell"] button`)
    .forEach((eachElem, index, allElements) => {
      if (evt.key === 'ArrowRight') {
        traverseClockwise(
          eachElem,
          index,
          allElements,
          null,
          null,
          conditionBuilderRef
        );
      } else {
        traverseReverse(
          eachElem,
          index,
          allElements,
          null,
          null,
          conditionBuilderRef
        );
      }
    });
};
