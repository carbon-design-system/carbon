/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { useState, useEffect, useRef } from 'react';
import classnames from 'classnames';
import {
  CaretRight16,
  CaretLeft16,
  OverflowMenuHorizontal16,
} from '@carbon/icons-react';
import { settings } from 'carbon-components';
import Button from '../Button';

const { prefix } = settings;

const translationIds = {
  'carbon.pagination-nav.next': 'Next',
  'carbon.pagination-nav.previous': 'Previous',
  'carbon.pagination-nav.item': 'Page',
};

function translateWithId(messageId) {
  return translationIds[messageId];
}

// https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state
function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}

function getCuts(page, totalItems, itemsShown, splitPoint = null) {
  const itemsThatFit = itemsShown >= 4 ? itemsShown : 4;

  if (itemsThatFit >= totalItems) {
    return {
      front: 0,
      back: 0,
    };
  }

  const split = splitPoint || Math.ceil(itemsThatFit / 2) - 1;

  let frontHidden = page + 1 - split;
  let backHidden = totalItems - page - (itemsThatFit - split) + 1;

  if (frontHidden <= 1) {
    backHidden -= frontHidden <= 0 ? Math.abs(frontHidden) + 1 : 0;
    frontHidden = 0;
  }

  if (backHidden <= 1) {
    frontHidden -= backHidden <= 0 ? Math.abs(backHidden) + 1 : 0;
    backHidden = 0;
  }

  return {
    front: frontHidden,
    back: backHidden,
  };
}

function DirectionButton({ direction, label, disabled, onClick }) {
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
}

function PaginationItem({
  page,
  isActive,
  onClick,
  translateWithId: t = translateWithId,
}) {
  return (
    <li className={`${prefix}--pagination-nav__list-item`}>
      <button
        className={classnames(`${prefix}--pagination-nav__page`, {
          [`${prefix}--pagination-nav__page--active`]: isActive,
        })}
        onClick={onClick}
        aria-current={isActive ? 'page' : null}>
        <span className={`${prefix}--pagination-nav__accessibility-label`}>
          {t('carbon.pagination-nav.item')}
        </span>
        {page}
      </button>
    </li>
  );
}

function PaginationOverflow({
  fromIndex,
  count,
  onSelect,
  translateWithId: t = translateWithId,
}) {
  if (count > 1) {
    return (
      <li className={`${prefix}--pagination-nav__list-item`}>
        <div className={`${prefix}--pagination-nav__select`}>
          {/* eslint-disable-next-line jsx-a11y/no-onchange */}
          <select
            className={`${prefix}--pagination-nav__page ${prefix}--pagination-nav__page--select`}
            aria-label={`Select ${t('carbon.pagination-nav.item')} number`}
            onChange={(e) => {
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
        translateWithId={t}
        onClick={() => {
          onSelect(fromIndex);
        }}
      />
    );
  }

  return <></>;
}

export default function PaginationNav({
  className,
  onChange = () => {},
  totalItems,
  itemsShown = 10,
  page = 0,
  loop = false,
  translateWithId: t = translateWithId,
  ...rest
}) {
  const [currentPage, setCurrentPage] = useState(page);
  const [cuts, setCuts] = useState(
    getCuts(currentPage, totalItems, itemsShown)
  );
  const prevPage = usePrevious(currentPage);

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

  function pageWouldBeHidden(page) {
    const wouldBeHiddenInFront = page <= cuts.front;
    const wouldBeHiddenInBack = page >= totalItems - cuts.back - 1;

    return wouldBeHiddenInFront || wouldBeHiddenInBack;
  }

  // jump to new page if props.page is updated
  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  // re-calculate cuts if props.totalItems or props.itemsShown change
  useEffect(() => {
    setCuts(getCuts(currentPage, totalItems, itemsShown));
  }, [totalItems, itemsShown]); // eslint-disable-line react-hooks/exhaustive-deps

  // update cuts if necessary whenever currentPage changes
  useEffect(() => {
    if (pageWouldBeHidden(currentPage)) {
      const delta = currentPage - prevPage || 0;

      if (delta > 0) {
        const splitPoint = itemsShown - 3;
        setCuts(getCuts(currentPage, totalItems, itemsShown, splitPoint));
      } else {
        const splitPoint = itemsShown > 4 ? 2 : 1;
        setCuts(getCuts(currentPage, totalItems, itemsShown, splitPoint));
      }
    }
  }, [currentPage]); // eslint-disable-line react-hooks/exhaustive-deps

  const classNames = classnames(`${prefix}--pagination-nav`, className);

  const backwardButtonDisabled = !loop && currentPage === 0;
  const forwardButtonDisabled = !loop && currentPage === totalItems - 1;

  const startOffset = itemsShown < 5 && page > 1 ? 0 : 1;

  return (
    <nav className={classNames} {...rest} aria-label="pagination">
      <ul className={`${prefix}--pagination-nav__list`}>
        <DirectionButton
          direction="backward"
          label={t('carbon.pagination-nav.previous')}
          disabled={backwardButtonDisabled}
          onClick={jumpToPrevious}
        />

        {
          // render first item if at least 5 items can be displayed
          itemsShown >= 5 && (
            <PaginationItem
              page="1"
              translateWithId={t}
              isActive={currentPage === 0}
              onClick={() => {
                jumpToItem(0);
              }}
            />
          )
        }

        {/* render first overflow */}
        <PaginationOverflow
          fromIndex={startOffset}
          count={cuts.front}
          onSelect={jumpToItem}
        />

        {
          // render items between overflows
          [...Array(totalItems)]
            .map((e, i) => i)
            .slice(startOffset + cuts.front, (1 + cuts.back) * -1)
            .map((item) => (
              <PaginationItem
                key={`item-${item}`}
                page={item + 1}
                translateWithId={t}
                isActive={currentPage === item}
                onClick={() => {
                  jumpToItem(item);
                }}
              />
            ))
        }

        {/* render second overflow */}
        <PaginationOverflow
          fromIndex={totalItems - cuts.back - 1}
          count={cuts.back}
          onSelect={jumpToItem}
        />

        {
          // render last item unless there is only one in total
          totalItems > 1 && (
            <PaginationItem
              page={totalItems}
              translateWithId={t}
              isActive={currentPage === totalItems - 1}
              onClick={() => {
                jumpToItem(totalItems - 1);
              }}
            />
          )
        }

        <DirectionButton
          direction="forward"
          label={t('carbon.pagination-nav.next')}
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
