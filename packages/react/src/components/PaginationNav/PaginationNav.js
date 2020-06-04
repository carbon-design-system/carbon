/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classnames from 'classnames';
import {
  CaretRight16,
  CaretLeft16,
  OverflowMenuHorizontal16,
} from '@carbon/icons-react';
import { settings } from 'carbon-components';
import Button from '../Button';

const { prefix } = settings;

const getCuts = (totalItems, itemsThatFit, page) => {
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

export default class PaginationNav extends Component {
  constructor(props) {
    super(props);
    const { page } = this.props;

    this.state = {
      page,
      cuts: {
        front: 0,
        back: 0,
      },
      prevPage: page,
    };

    this.jumpToItem = this.jumpToItem.bind(this);
    this.jumpToNext = this.jumpToNext.bind(this);
    this.jumpToPrevious = this.jumpToPrevious.bind(this);
  }

  static propTypes = {
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

  static defaultProps = {
    backwardText: 'Previous',
    forwardText: 'Next',
    page: 0,
    itemLabel: 'Page',
    itemsShown: 10,
    loop: false,
  };

  static getDerivedStateFromProps({ page, totalItems, itemsShown }, state) {
    const { page: currentPage, prevPage } = state;

    const itemsThatFit = itemsShown >= 4 ? itemsShown : 4;
    const pageChanged = page !== prevPage;
    const cuts = getCuts(totalItems, itemsThatFit, currentPage);

    return !pageChanged
      ? {
          cuts,
        }
      : {
          page: (pageChanged && page) || currentPage,
          prevPage: page,
          cuts,
        };
  }

  jumpToItem(index) {
    const { totalItems } = this.props;

    if (index >= 0 && index < totalItems) {
      this.setState({
        page: index,
      });

      this.props.onChange(index);
    }
  }

  jumpToNext() {
    const { totalItems, loop } = this.props;
    const { page } = this.state;

    const nextIndex = page + 1;

    if (nextIndex >= totalItems) {
      if (loop) {
        this.jumpToItem(0);
      }
    } else {
      this.jumpToItem(nextIndex);
    }
  }

  jumpToPrevious() {
    const { totalItems, loop } = this.props;
    const { page } = this.state;

    const previousIndex = page - 1;

    if (previousIndex < 0) {
      if (loop) {
        this.jumpToItem(totalItems - 1);
      }
    } else {
      this.jumpToItem(previousIndex);
    }
  }

  renderDirectionButton(direction) {
    const { loop, totalItems, backwardText, forwardText } = this.props;
    const { page } = this.state;

    const disabled =
      !loop &&
      ((direction === 'forward' && page === totalItems - 1) ||
        (direction === 'backward' && page === 0));
    const label = direction === 'forward' ? forwardText : backwardText;
    const icon = direction === 'forward' ? CaretRight16 : CaretLeft16;
    const onClick =
      direction === 'forward' ? this.jumpToNext : this.jumpToPrevious;

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

  renderPreviousButton() {
    return this.renderDirectionButton('backward');
  }

  renderNextButton() {
    return this.renderDirectionButton('forward');
  }

  renderItem(index) {
    const { itemLabel } = this.props;
    const { page } = this.state;

    const isActive = page === index;

    return (
      <li
        key={`item-${index}`}
        className={`${prefix}--pagination-nav__list-item`}>
        <button
          className={classnames(`${prefix}--pagination-nav__page`, {
            [`${prefix}--pagination-nav__page--active`]: isActive,
          })}
          onClick={() => {
            this.jumpToItem(index);
          }}>
          <span className={`${prefix}--pagination-nav__accessibility-label`}>
            {itemLabel}
          </span>
          {index + 1}
        </button>
      </li>
    );
  }

  renderOverflow(fromIndex, count) {
    const { itemLabel } = this.props;

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
                this.jumpToItem(index);
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
      return this.renderItem(fromIndex);
    }

    return <></>;
  }

  render() {
    const {
      className,
      totalItems,
      itemsShown,
      itemLabel, // eslint-disable-line no-unused-vars
      backwardText, // eslint-disable-line no-unused-vars
      forwardText, // eslint-disable-line no-unused-vars
      onChange, // eslint-disable-line no-unused-vars
      ...other
    } = this.props;

    const { page, cuts } = this.state;

    const classNames = classnames(`${prefix}--pagination-nav`, className);

    // if less than 5 items can be shown, the first overflow
    // should appear at index 0, not 1 as usual
    const startOffset = itemsShown < 5 && page > 1 ? 0 : 1;

    return (
      <nav className={classNames} {...other} aria-label="pagination" key={page}>
        <ul className={`${prefix}--pagination-nav__list`}>
          {this.renderPreviousButton()}

          {// render first item if at least 5 items can be displayed
          // or the current page is first or second item
          (itemsShown >= 5 || page <= 1) && this.renderItem(0)}

          {// render first overflow
          this.renderOverflow(startOffset, cuts.front)}

          {// render items between overflows
          [...Array(totalItems)]
            .map((e, i) => i)
            .slice(startOffset + cuts.front, (1 + cuts.back) * -1)
            .map(item => this.renderItem(item))}

          {// render second overflow
          this.renderOverflow(totalItems - cuts.back - 1, cuts.back)}

          {// render last item unless there is only one in total
          totalItems > 1 && this.renderItem(totalItems - 1)}

          {this.renderNextButton()}
        </ul>
      </nav>
    );
  }
}
