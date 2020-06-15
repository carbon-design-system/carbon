/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import {
  CaretRight16,
  CaretLeft16,
  OverflowMenuHorizontal16,
} from '@carbon/icons-react';
import { settings } from 'carbon-components';
import Button from '../Button';

const { prefix } = settings;

const getCuts = (totalItems, itemsShown, page) => {
  const itemsThatFit = itemsShown >= 4 ? itemsShown : 4;

  if (itemsThatFit >= totalItems) {
    return {
      front: 0,
      back: 0,
    };
  }

  let reservedSpots = 4; // first + overflow + overflow + last

  // remove reserveration for first item when only 4 items can be displayed
  if (itemsThatFit < 5) reservedSpots -= 1;
  // remove one overflow reservation when current page would hide it
  if (page < 2 || page > totalItems - 3) reservedSpots -= 1;

  const shownItems = itemsThatFit - reservedSpots;
  const hiddenItems = totalItems - shownItems - (itemsThatFit < 5 ? 1 : 2);

  let frontHidden = Math.floor(hiddenItems / 2);
  let backHidden = Math.ceil(hiddenItems / 2);

  if (itemsThatFit > 4) {
    if (page <= frontHidden) {
      // if current page would be in the front overflow
      let newFrontHidden = frontHidden - (frontHidden - page) - 1;
      newFrontHidden = newFrontHidden >= 0 ? newFrontHidden : 0;
      const delta = frontHidden - newFrontHidden;

      frontHidden -= delta;
      backHidden += delta;
    } else if (page >= totalItems - backHidden - 1) {
      // if the current page would be in the back overflow
      let newBackHidden = totalItems - 2 - page;
      newBackHidden = newBackHidden >= 0 ? newBackHidden : 0;
      const delta = backHidden - newBackHidden;

      frontHidden += delta;
      backHidden -= delta;
    }
  } else {
    frontHidden = page > 1 ? page : 0;
    frontHidden = frontHidden <= totalItems - 3 ? frontHidden : totalItems - 3;

    backHidden = page < totalItems - 2 ? totalItems - page - 2 : 0;
    backHidden = backHidden <= totalItems - 3 ? backHidden : totalItems - 3;
  }

  return {
    front: frontHidden,
    back: backHidden,
  };
};

const DirectionButton = ({ direction, label, disabled, onClick }) => {
  const icon = direction === 'forward' ? CaretRight16 : CaretLeft16;

  return (
    <li className={`${prefix}--pagination-nav__list-item`}>
      <Button
        disabled={disabled}
        renderIcon={icon}
        kind="ghost"
        hasIconOnly
        iconDescription={label}
        tooltipAlignment="center"
        tooltipPosition="bottom"
        onClick={onClick}
      />
    </li>
  );
};

const PaginationItem = ({ page, itemLabel, isActive, onClick }) => {
  return (
    <li key={`item-${page}`} className={`${prefix}--pagination-nav__list-item`}>
      <button
        className={classnames(`${prefix}--pagination-nav__page`, {
          [`${prefix}--pagination-nav__page--active`]: isActive,
        })}
        onClick={onClick}>
        <span className={`${prefix}--pagination-nav__accessibility-label`}>
          {itemLabel}
        </span>
        {page}
      </button>
    </li>
  );
};

const PaginationOverflow = ({ fromIndex, count, itemLabel, onSelect }) => {
  if (count > 1) {
    return (
      <li className={`${prefix}--pagination-nav__list-item`}>
        <div className={`${prefix}--pagination-nav__select`}>
          {/* eslint-disable-next-line jsx-a11y/no-onchange */}
          <select
            className={`${prefix}--pagination-nav__page ${prefix}--pagination-nav__page--select`}
            aria-label={`Select ${itemLabel} number`}
            onChange={e => {
              const index = Number(e.target.value);
              onSelect(index);
            }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <option value="" hidden />
            {[...Array(count)].map((e, i) => (
              <option
                value={(fromIndex + i).toString()}
                key={`overflow-${fromIndex + i}`}>
                {fromIndex + i + 1}
              </option>
            ))}
          </select>
          <div className={`${prefix}--pagination-nav__select-icon-wrapper`}>
            <OverflowMenuHorizontal16
              className={`${prefix}--pagination-nav__select-icon`}
            />
          </div>
        </div>
      </li>
    );
  }

  if (count === 1) {
    return (
      <PaginationItem
        page={fromIndex + 1}
        itemLabel={itemLabel}
        onClick={() => {
          onSelect(fromIndex);
        }}
      />
    );
  }

  return <></>;
};

export default function PaginationNav({
  className,
  backwardText = 'Previous',
  forwardText = 'Next',
  itemLabel = 'Page',
  onChange,
  totalItems,
  itemsShown = 10,
  page = 0,
  loop = false,
  ...rest
}) {
  const [currentPage, setCurrentPage] = useState(page);
  const [cuts, setCuts] = useState({ front: 0, back: 0 });

  function jumpToItem(index) {
    if (index >= 0 && index < totalItems) {
      setCurrentPage(index);
      onChange(index);
    }
  }

  function jumpToNext() {
    const nextIndex = currentPage + 1;

    if (nextIndex >= totalItems) {
      if (loop) {
        jumpToItem(0);
      }
    } else {
      jumpToItem(nextIndex);
    }
  }

  function jumpToPrevious() {
    const previousIndex = currentPage - 1;

    if (previousIndex < 0) {
      if (loop) {
        jumpToItem(totalItems - 1);
      }
    } else {
      jumpToItem(previousIndex);
    }
  }

  useEffect(() => {
    setCuts(getCuts(totalItems, itemsShown, currentPage));
  }, [currentPage, itemsShown, totalItems]);

  const classNames = classnames(`${prefix}--pagination-nav`, className);

  const backwardButtonDisabled = !loop && currentPage === 0;
  const forwardButtonDisabled = !loop && currentPage === totalItems - 1;

  const startOffset = itemsShown < 5 && page > 1 ? 0 : 1;

  return (
    <nav className={classNames} {...rest} aria-label="pagination">
      <ul className={`${prefix}--pagination-nav__list`}>
        <DirectionButton
          direction="backward"
          label={backwardText}
          disabled={backwardButtonDisabled}
          onClick={jumpToPrevious}
        />

        {// render first item if at least 5 items can be displayed
        // or the current page is first or second item
        (itemsShown >= 5 || currentPage <= 1) && (
          <PaginationItem
            page="1"
            itemLabel={itemLabel}
            isActive={currentPage === 0}
            onClick={() => {
              jumpToItem(0);
            }}
          />
        )}

        {/* render first overflow */}
        <PaginationOverflow
          fromIndex={startOffset}
          count={cuts.front}
          onSelect={jumpToItem}
        />

        {// render items between overflows
        [...Array(totalItems)]
          .map((e, i) => i)
          .slice(startOffset + cuts.front, (1 + cuts.back) * -1)
          .map(item => (
            <PaginationItem
              page={item + 1}
              itemLabel={itemLabel}
              isActive={currentPage === item}
              onClick={() => {
                jumpToItem(item);
              }}
            />
          ))}

        {/* render second overflow */}
        <PaginationOverflow
          fromIndex={totalItems - cuts.back - 1}
          count={cuts.back}
          onSelect={jumpToItem}
        />

        {// render last item unless there is only one in total
        totalItems > 1 && (
          <PaginationItem
            page={totalItems}
            itemLabel={itemLabel}
            isActive={currentPage === totalItems - 1}
            onClick={() => {
              jumpToItem(totalItems - 1);
            }}
          />
        )}

        <DirectionButton
          direction="forward"
          label={forwardText}
          disabled={forwardButtonDisabled}
          onClick={jumpToNext}
        />
      </ul>
    </nav>
  );
}

PaginationNav.propTypes = {
  /**
   * Additional CSS class names.
   */
  className: PropTypes.string,

  /**
   * The description for the backward icon.
   */
  backwardText: PropTypes.string,

  /**
   * The description for the forward icon.
   */
  forwardText: PropTypes.string,

  /**
   * The label that appears before the page number in browser tooltips and screen readers.
   */
  itemLabel: PropTypes.string,

  /**
   * The callback function called when the current page changes.
   */
  onChange: PropTypes.func,

  /**
   * The total number of items.
   */
  totalItems: PropTypes.number,

  /**
   * The number of items to be shown.
   */
  itemsShown: PropTypes.number,

  /**
   * The current page.
   */
  page: PropTypes.number,

  /**
   * Whether user should be able to loop through the items when reaching first / last.
   */
  loop: PropTypes.bool,
};
