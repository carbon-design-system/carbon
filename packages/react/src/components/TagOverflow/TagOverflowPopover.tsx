/**
 * Copyright IBM Corp. 2024, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useRef, forwardRef, Ref } from 'react';
import cx from 'classnames';
import { Link } from '../Link';
import { Tag } from '../Tag';
import { DismissibleTag } from '../Tag';
import { Popover, PopoverContent } from '../Popover';
import type { PopoverAlignment } from '../Popover';
import { OperationalTag } from '../Tag';
import { useOutsideClick } from '../../internal/useOutsideClick';
import { usePrefix } from '../../internal/usePrefix';
import { TagOverflowItem } from './TagOverflow';

export interface TagOverflowPopoverProps {
  allTagsModalSearchThreshold?: number;
  autoAlign?: boolean;
  className?: string;
  onShowAllClick: () => void;
  overflowAlign?: PopoverAlignment;
  overflowTags: TagOverflowItem[];
  overflowType?: string;
  popoverOpen?: boolean;
  setPopoverOpen?: (x: boolean) => void;
  showAllTagsLabel?: string;
}

const componentName = 'TagOverflowPopover';

export const TagOverflowPopover = forwardRef(
  (props: TagOverflowPopoverProps, ref: Ref<HTMLDivElement>) => {
    const prefix = usePrefix();
    const blockClass = `${prefix}--tag-overflow-popover`;
    const {
      allTagsModalSearchThreshold,
      autoAlign,
      className,
      onShowAllClick,
      overflowAlign,
      overflowTags,
      overflowType,
      popoverOpen,
      setPopoverOpen,
      showAllTagsLabel,
      ...rest
    } = props;
    const localRef = useRef<HTMLDivElement>(null);
    const overflowTagContent = useRef<HTMLDivElement>(null);

    useOutsideClick(
      (ref as React.RefObject<HTMLDivElement>) || localRef,
      () => {
        if (popoverOpen) {
          setPopoverOpen?.(false);
        }
      }
    );

    const handleShowAllTagsClick = (evt: Event) => {
      evt.stopPropagation();
      evt.preventDefault();
      setPopoverOpen?.(false);
      onShowAllClick?.();
    };

    const handleEscKeyPress = (evt) => {
      const { key } = evt;
      if (key === 'Escape') {
        setPopoverOpen?.(false);
      }
    };

    const getOverflowPopoverItems = () => {
      const thresh = allTagsModalSearchThreshold ?? 0;
      return overflowTags?.filter((_, index) =>
        overflowTags?.length > thresh ? index < thresh : index <= thresh
      );
    };

    const visibleItems = getOverflowPopoverItems();
    const hasItems = visibleItems?.length > 0;

    return (
      <span
        {...rest}
        aria-hidden={overflowTags?.length === 0}
        className={cx(blockClass, {
          [`${blockClass}--hidden`]: overflowTags?.length === 0,
        })}
        ref={(ref as React.RefObject<HTMLSpanElement>) || localRef}>
        <Popover
          align={overflowAlign}
          autoAlign={autoAlign}
          className={cx(className, `${blockClass}__el`)}
          dropShadow
          highContrast
          onKeyDown={handleEscKeyPress}
          open={popoverOpen || false}>
          <OperationalTag
            onClick={() => setPopoverOpen?.(!popoverOpen)}
            className={cx(`${blockClass}__trigger`)}
            text={`+${overflowTags.length}`}
            aria-expanded={popoverOpen}
            aria-controls={`${prefix}-overflow-content`}
          />
          <PopoverContent
            id={`${prefix}-overflow-content`}
            aria-hidden={!popoverOpen}>
            <div ref={overflowTagContent} className={`${blockClass}__content`}>
              <ul className={`${blockClass}__tag-list`}>
                {hasItems &&
                  visibleItems.map(
                    ({ label, id, tagType, filter, onClose, ...other }) => {
                      const typeValue =
                        overflowType === 'tag' ? 'high-contrast' : tagType;
                      const isFilterable =
                        overflowType === 'tag' &&
                        (typeof onClose === 'function' || filter);

                      let tag;
                      if (isFilterable) {
                        tag = (
                          <DismissibleTag
                            {...other}
                            onClose={() => onClose?.()}
                            type={typeValue}
                            text={label}
                          />
                        );
                      } else {
                        tag = (
                          <Tag {...other} type={typeValue}>
                            {label}
                          </Tag>
                        );
                      }

                      return (
                        <li
                          className={cx(`${blockClass}__tag-item`, {
                            [`${blockClass}__tag-item--default`]:
                              overflowType === 'default',
                            [`${blockClass}__tag-item--tag`]:
                              overflowType === 'tag',
                          })}
                          key={id}>
                          {overflowType === 'tag' ? tag : label}
                        </li>
                      );
                    }
                  )}
              </ul>
              {(overflowTags?.length ?? 0) >
                (allTagsModalSearchThreshold ?? 0) && (
                <Link
                  className={`${blockClass}__show-all-tags-link`}
                  href=""
                  onClick={handleShowAllTagsClick}
                  role="button">
                  {showAllTagsLabel}
                </Link>
              )}
            </div>
          </PopoverContent>
        </Popover>
      </span>
    );
  }
);

TagOverflowPopover.displayName = componentName;
