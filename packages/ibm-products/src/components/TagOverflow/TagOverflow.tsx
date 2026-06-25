/**
 * Copyright IBM Corp. 2024, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  ReactNode,
  RefObject,
  createElement,
  forwardRef,
  useCallback,
  useRef,
  useState,
} from 'react';
import { Tag, DismissibleTag } from '@carbon/react';

import PropTypes from 'prop-types';
import { TYPES } from './constants';
import { TagOverflowModal } from './TagOverflowModal';
import { TagOverflowPopover } from './TagOverflowPopover';
import cx from 'classnames';
import { getDevtoolsProps } from '../../global/js/utils/devtools';
import { pkg } from '../../settings';
import { useOverflowItems } from '../../global/js/hooks/useOverflowItems';
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
  allTagsModalTarget?: ReactNode;
  allTagsModalTitle?: string;
  autoAlign?: boolean;
  className?: string;
  /**
   * @deprecated The `containingElementRef` prop is no longer going to be used in favor of the forwarded ref.
   */
  containingElementRef?: RefObject<HTMLDivElement>;
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
  onOverflowTagChange?: (value: {
    hiddenItems?: TagOverflowItem[];
    minWidth?: number;
    maxWidth?: number;
  }) => void;
  showAllTagsLabel?: string;
  tagComponent?: string;
}

const blockClass = `${pkg.prefix}--tag-overflow`;
const componentName = 'TagOverflow';
const allTagsModalSearchThreshold = 10;

export const TagOverflow = forwardRef<HTMLDivElement, TagOverflowProps>(
  (props, ref) => {
    const {
      align = 'start',
      allTagsModalAriaLabel,
      allTagsModalSearchLabel,
      allTagsModalSearchPlaceholderText,
      allTagsModalTarget,
      allTagsModalTitle,
      autoAlign,
      className,
      items,
      maxVisible,
      overflowAlign = 'bottom',
      overflowClassName,
      overflowType = 'default',
      onOverflowTagChange,
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
        {...getDevtoolsProps(componentName)}
        ref={ref}
      >
        <div
          className={cx(
            `${blockClass}__visible-tags`,
            `${blockClass}--align-${align}`
          )}
          ref={containerRef}
        >
          {visibleItems.map((item, index) => {
            const { id, label, tagType, onClose, filter, ...other } = item;
            return (
              <div
                className={`${blockClass}__tag-container`}
                ref={(node) => {
                  itemRefHandler(id, node);
                }}
                key={id}
              >
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
                    type={tagType}
                  >
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
              />
            </div>
          )}
        </div>
      </div>
    );
  }
);

// Return a placeholder if not released and not enabled by feature flag

// The display name of the component, used by React. Note that displayName
// is used in preference to relying on function.name.
TagOverflow.displayName = componentName;

const tagTypes = Object.keys(TYPES);

// The types and DocGen commentary for the component props,
// in alphabetical order (for consistency).
// See https://www.npmjs.com/package/prop-types#usage.
TagOverflow.propTypes = {
  /**
   * align the Tags displayed by the TagSet. Default start.
   */
  align: PropTypes.oneOf(['start', 'center', 'end']),
  /**
   * aria label for all tags modal with hasScrollingContent
   */
  allTagsModalAriaLabel: PropTypes.string,
  /**
   * label text for the show all search. **Note: Required if more than 10 tags**
   */
  allTagsModalSearchLabel: PropTypes.string,
  /**
   * placeholder text for the show all search. **Note: Required if more than 10 tags**
   */
  allTagsModalSearchPlaceholderText: PropTypes.string,
  /**
   * portal target for the all tags modal
   */
  allTagsModalTarget: PropTypes.node,
  /**
   * title for the show all modal. **Note: Required if more than 10 tags**
   */
  allTagsModalTitle: PropTypes.string,
  /**
   * Will auto-align the popover on first render if it is not visible. This prop is currently experimental and is subject to future changes.
   */
  autoAlign: PropTypes.bool,
  /**
   * Provide an optional class to be applied to the containing node.
   */
  className: PropTypes.string,
  /**
   * The items to be shown in the TagOverflow. Each item is specified as an object with properties:
   * **label**\* (required) to supply the content,
   * **id**\* (required) to uniquely identify each item.
   * **tagType** the type value to be passed to the Carbon Tag component.
   * Refer https://react.carbondesignsystem.com/?path=/docs/components-tag--default to see the possible values for tagType
   *
   * If you want to render a custom component, pass it as tagComponent prop and
   * then pass the props required for your custom component as the properties of item object
   */
  //@ts-ignore
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      tagType: PropTypes.oneOf(tagTypes),
    }).isRequired
  ),
  /**
   * maximum visible items
   */
  maxVisible: PropTypes.number,
  /**
   * Specify offset amount for measure available space, only used when `containingElementSelector`
   * is also provided
   */
  measurementOffset: PropTypes.number,
  /**
   * display items in multiple lines
   */
  multiline: PropTypes.bool,
  /**
   * Handler to get overflow tags
   */
  onOverflowTagChange: PropTypes.func,
  /**
   * overflowAlign from the standard tooltip. Default center.
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
   * overflowClassName for the tooltip popup
   */
  overflowClassName: PropTypes.string,
  /**
   * Type of rendering displayed inside of the tag overflow component
   */
  overflowType: PropTypes.oneOf(['default', 'tag']),
  /**
   * label for the overflow show all tags link.
   *
   * **Note:** Required if more than 10 tags
   */
  showAllTagsLabel: PropTypes.string,
  /** Component definition of the items to be rendered inside TagOverflow.
   * If this is not passed, items will be rendered as Tag component
   */
  //@ts-ignore
  tagComponent: PropTypes.elementType,
};
