//
// Copyright IBM Corp. 2024, 2024
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

import React, { useRef, forwardRef, Ref } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {
  Link,
  Tag,
  Popover,
  PopoverContent,
  PopoverAlignment,
  DismissibleTag,
  OperationalTag,
} from '@carbon/react';
import { useClickOutside } from '../../global/js/hooks';
import { pkg } from '../../settings';
import { TagOverflowItem } from './TagOverflow';

export interface Props {
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
const blockClass = `${pkg.prefix}--tag-overflow-popover`;

export const TagOverflowPopover = forwardRef(
  (props: Props, ref: Ref<HTMLDivElement>) => {
    const {
      allTagsModalSearchThreshold,
      autoAlign,
      className,
      onShowAllClick,
      overflowAlign,
      overflowTags,
      overflowType,
      showAllTagsLabel,
      popoverOpen,
      setPopoverOpen,
      ...rest
    } = props;
    const localRef = useRef<HTMLDivElement>(null);
    const overflowTagContent = useRef<HTMLDivElement>(null);

    useClickOutside(ref || localRef, () => {
      if (popoverOpen) {
        setPopoverOpen?.(false);
      }
    });

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
        {
          // Pass through any other property values as HTML attributes.
          ...rest
        }
        aria-hidden={overflowTags?.length === 0}
        className={cx(blockClass, {
          [`${blockClass}--hidden`]: overflowTags?.length === 0,
        })}
        ref={ref || localRef}
      >
        <Popover
          align={overflowAlign}
          autoAlign={autoAlign}
          className={cx(className, `${blockClass}__el`)}
          dropShadow
          highContrast
          onKeyDown={handleEscKeyPress}
          open={popoverOpen || false}
        >
          <OperationalTag
            onClick={() => setPopoverOpen?.(!popoverOpen)}
            className={cx(`${blockClass}__trigger`)}
            text={`+${overflowTags.length}`}
            aria-expanded={popoverOpen}
            aria-controls={`${pkg.prefix}-overflow-content`}
          />
          <PopoverContent
            id={`${pkg.prefix}-overflow-content`}
            aria-hidden={!popoverOpen}
          >
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
                          key={id}
                        >
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
                  role="button"
                >
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

TagOverflowPopover.propTypes = {
  /**
   * count of overflowTags over which a modal is offered
   */
  allTagsModalSearchThreshold: PropTypes.number,
  /**
   * Will auto-align the popover on first render if it is not visible. This prop is currently experimental and is subject to future changes.
   */
  autoAlign: PropTypes.bool,
  /**
   * className
   */
  className: PropTypes.string,
  /**
   * function to execute on clicking show all
   */
  onShowAllClick: PropTypes.func.isRequired,
  /**
   * overflowAlign from the standard tooltip
   */
  overflowAlign: PropTypes.oneOf([
    'top',
    'top-left',
    'top-right',
    'bottom',
    'bottom-left',
    'bottom-right',
    'left',
    'left-bottom',
    'left-top',
    'right',
    'right-bottom',
    'right-top',
  ]),
  /**
   * tags shown in overflow
   */
  //@ts-ignore
  overflowTags: PropTypes.arrayOf(PropTypes.object).isRequired,
  /**
   * Type of rendering displayed inside of the tag overflow component
   */
  overflowType: PropTypes.oneOf(['default', 'tag']),
  /**
   * Open state of the popover
   */
  popoverOpen: PropTypes.bool,
  /**
   * Setter function for the popoverOpen state value
   */
  setPopoverOpen: PropTypes.func,
  /**
   * label for the overflow show all tags link
   */
  showAllTagsLabel: PropTypes.string,
};
