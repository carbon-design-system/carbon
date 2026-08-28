/**
 * Copyright IBM Corp. 2024, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  RefObject,
  createElement,
  forwardRef,
  useCallback,
  useRef,
  useState,
} from 'react';
import { Tag, DismissibleTag } from '../Tag';
import { TagOverflowModal } from './TagOverflowModal';
import { TagOverflowPopover } from './TagOverflowPopover';
import cx from 'classnames';
import { usePrefix } from '../../internal/usePrefix';
import useOverflowItems from '../../internal/useOverflowItems';

export interface TagOverflowItem {
  className?: string;
  /**
   * @deprecated The `filter` prop is no longer going to be used. To use DismissibleTags, pass in an onClose function.
   */
  filter?: boolean;
  id: string;
  label: string;
  onClose: () => void;
  tagType?:
    | 'red'
    | 'magenta'
    | 'purple'
    | 'blue'
    | 'cyan'
    | 'teal'
    | 'green'
    | 'gray'
    | 'cool-gray'
    | 'warm-gray'
    | 'high-contrast'
    | 'outline';
  type?: string;
}

export interface TagOverflowProps {
  align?: 'start' | 'center' | 'end';
  allTagsModalAriaLabel?: string;
  allTagsModalSearchLabel?: string;
  allTagsModalSearchPlaceholderText?: string;
  allTagsModalTarget?: HTMLElement;
  allTagsModalTitle?: string;
  autoAlign?: boolean;
  className?: string;
  /**
   * @deprecated The `containingElementRef` prop is no longer going to be used in favor of the forwarded ref.
   */
  containingElementRef?: RefObject<HTMLDivElement>;
  /**
   * Disable the portal and render the modal inline. Useful for tests and
   * contexts where you need to inherit React context from parent components.
   *
   * @default true
   */
  disablePortal?: boolean;
  items: TagOverflowItem[];
  maxVisible?: number;
  /**
   * @deprecated The `measurementOffset` prop is no longer going to be used. This value will now be calculated automatically.
   */
  measurementOffset?: number;
  /**
   * @deprecated The `multiline` prop is no longer going to be used. This component should only be used when you need to hide overflowing items.
   */
  multiline?: boolean;
  onOverflowTagChange?: (value: {
    hiddenItems?: TagOverflowItem[];
    minWidth?: number;
    maxWidth?: number;
  }) => void;
  overflowAlign?:
    | 'top'
    | 'top-left'
    | 'top-right'
    | 'bottom'
    | 'bottom-left'
    | 'bottom-right'
    | 'left'
    | 'left-bottom'
    | 'left-top'
    | 'right'
    | 'right-bottom'
    | 'right-top';
  overflowClassName?: string;
  overflowType?: 'default' | 'tag';
  showAllTagsLabel?: string;
  tagComponent?: string;
}

const componentName = 'TagOverflow';
const allTagsModalSearchThreshold = 10;

export const TagOverflow = forwardRef<HTMLDivElement, TagOverflowProps>(
  (props, ref) => {
    const prefix = usePrefix();
    const blockClass = `${prefix}--tag-overflow`;
    const {
      align = 'start',
      allTagsModalAriaLabel,
      allTagsModalSearchLabel,
      allTagsModalSearchPlaceholderText,
      allTagsModalTarget,
      allTagsModalTitle,
      autoAlign,
      className,
      disablePortal,
      items,
      maxVisible,
      onOverflowTagChange,
      overflowAlign = 'bottom',
      overflowClassName,
      overflowType = 'default',
      showAllTagsLabel,
      tagComponent,
      ...rest
    } = props;
    const containerRef = useRef<HTMLDivElement>(null);
    const offsetRef = useRef<HTMLDivElement>(null);
    const [showAllModalOpen, setShowAllModalOpen] = useState<boolean>(false);
    const [popoverOpen, setPopoverOpen] = useState<boolean>(false);

    const {
      visibleItems,
      hiddenItems: overflowItems,
      itemRefHandler,
    } = useOverflowItems(
      items,
      containerRef,
      offsetRef,
      maxVisible,
      onOverflowTagChange
    );

    const handleShowAllClick = () => {
      setShowAllModalOpen(true);
    };

    const handleModalClose = () => {
      setShowAllModalOpen(false);
    };

    const getCustomComponent = (
      item: TagOverflowItem,
      tagComponent: string
    ) => {
      const { className, ...other } = item;
      return createElement(tagComponent, {
        ...other,
        className: cx(`${blockClass}__item`, className),
      });
    };

    const handleTagOnClose = useCallback(
      (onClose, index) => {
        onClose?.();
        if (index <= visibleItems?.length - 1) {
          setPopoverOpen(false);
        }
      },
      [visibleItems]
    );

    return (
      <div
        {...rest}
        className={cx(blockClass, className)}
        data-component-name={componentName}
        ref={ref}>
        <div
          className={cx(
            `${blockClass}__visible-tags`,
            `${blockClass}--align-${align}`
          )}
          ref={containerRef}>
          {visibleItems.map((item, index) => {
            const { id, label, tagType, onClose, filter, ...other } = item;
            return (
              <div
                className={`${blockClass}__tag-container`}
                ref={(node) => {
                  itemRefHandler(id, node);
                }}
                key={id}>
                {tagComponent ? (
                  getCustomComponent(item, tagComponent)
                ) : typeof onClose === 'function' || filter ? (
                  <DismissibleTag
                    {...other}
                    className={`${blockClass}__item--tag`}
                    type={tagType}
                    onClose={() => handleTagOnClose(onClose, index)}
                    text={label}
                  />
                ) : (
                  <Tag
                    {...other}
                    className={`${blockClass}__item--tag`}
                    type={tagType}>
                    {label}
                  </Tag>
                )}
              </div>
            );
          })}
          {overflowItems.length > 0 && (
            <div className={`${blockClass}__indicator`} ref={offsetRef}>
              <TagOverflowPopover
                allTagsModalSearchThreshold={allTagsModalSearchThreshold}
                className={overflowClassName}
                onShowAllClick={handleShowAllClick}
                overflowTags={overflowItems}
                overflowAlign={overflowAlign}
                overflowType={overflowType}
                showAllTagsLabel={showAllTagsLabel}
                key="tag-overflow-popover"
                ref={offsetRef}
                popoverOpen={popoverOpen}
                setPopoverOpen={setPopoverOpen}
                autoAlign={autoAlign}
              />
              <TagOverflowModal
                allTags={items}
                open={showAllModalOpen}
                title={allTagsModalTitle}
                modalAriaLabel={allTagsModalAriaLabel}
                onClose={handleModalClose}
                overflowType={overflowType}
                searchLabel={allTagsModalSearchLabel}
                searchPlaceholder={allTagsModalSearchPlaceholderText}
                portalTarget={allTagsModalTarget}
                disablePortal={disablePortal}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
);

TagOverflow.displayName = componentName;
