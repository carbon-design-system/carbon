//
// Copyright IBM Corp. 2020, 2025
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

import React, {
  JSX,
  PropsWithChildren,
  ReactNode,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import PropTypes from 'prop-types';
import { Tag } from '@carbon/react';
import { TagBaseProps } from '@carbon/type';
import { TagSetModal } from './TagSetModal';
import { TagSetOverflow } from './TagSetOverflow';
import cx from 'classnames';
import { getDevtoolsProps } from '../../global/js/utils/devtools';
import { pkg } from '../../settings';
import { useResizeObserver } from '../../global/js/hooks/useResizeObserver';
import { DismissibleTag } from '@carbon/react';

const componentName = 'TagSet';
const blockClass = `${pkg.prefix}--tag-set`;

const allTagsModalSearchThreshold = 10;

// Default values for props
const defaults = {
  align: 'start',
  measurementOffset: 0,
  overflowAlign: 'bottom',
  overflowType: 'default',
  onOverflowTagChange: () => {},
};

type Align = 'start' | 'center' | 'end';
type OverflowAlign =
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
type OverflowType = 'default' | 'tag';

type TagType = {
  label: string;
  type?: keyof typeof tagTypes;
  /**
   * @deprecated Use the `onClose` function instead to render as a DismissibleTag
   */
  filter?: boolean;
} & TagBaseProps;
export interface TagSetProps extends PropsWithChildren {
  /**
   * align the Tags displayed by the TagSet. Default start.
   */
  align?: Align;
  /**
   * aria label for all tags modal with hasScrollingContent
   */
  allTagsModalAriaLabel?: string;
  /**
   * label text for the show all search.
   */
  allTagsModalSearchLabel?: string;
  /**
   * placeholder text for the show all search.
   */
  allTagsModalSearchPlaceholderText?: string;
  /**
   * portal target for the all tags modal
   */
  allTagsModalTarget?: ReactNode;
  /**
   * title for the show all modal.
   */
  allTagsModalTitle?: string;
  /**
   * className
   */
  className?: string;
  /**
   * Optional ref for custom resize container to measure available space
   * Default will measure the available space of the TagSet container itself.
   */
  containingElementRef?: React.Ref<HTMLElement>;
  /**
   * maximum visible tags
   */
  maxVisible?: number;
  /**
   * Specify offset amount for measure available space, only used when `containingElementSelector`
   * is also provided
   */
  measurementOffset?: number;
  /**
   * display tags in multiple lines
   */
  multiline?: boolean;
  /**
   * An optional click handler that overrides the default functionality of displaying all tags in a modal
   */
  onOverflowClick?: ((overFlowTags: ReactNode[]) => void) | undefined;
  /**
   * Handler to get overflow tags
   */
  onOverflowTagChange?: (value: ReactNode) => void;
  /**
   * overflowAlign from the standard tooltip. Default center.
   */
  overflowAlign?: OverflowAlign;
  /**
   * Will auto-align the popover on first render if it is not visible. This prop is currently experimental and is subject to future changes.
   */
  overflowAutoAlign?: boolean;
  /**
   * overflowClassName for the tooltip popup
   */
  overflowClassName?: string;
  /**
   * Type of rendering displayed inside of the tag overflow component
   */
  overflowType?: OverflowType;
  /**
   * label for the overflow show all tags link.
   */
  showAllTagsLabel?: string;
  /**
   * The tags to be shown in the TagSet. Each tag is specified as an object
   * with properties: **label**\* (required) to supply the tag content, and
   * other properties will be passed to the Carbon Tag component, such as
   * **type**, **disabled**, **ref**, **className** , and any other Tag props.
   *
   * See https://react.carbondesignsystem.com/?path=/docs/components-tag--default
   */
  tags?: TagType[];
}

export const TagSet = React.forwardRef<HTMLDivElement, TagSetProps>(
  (
    {
      // The component props, in alphabetical order (for consistency).

      align = 'start',
      allTagsModalTarget,
      className,
      maxVisible,
      multiline,
      overflowAutoAlign,
      overflowAlign = 'bottom',
      overflowClassName,
      overflowType = 'default',
      allTagsModalAriaLabel,
      allTagsModalTitle = 'All tags',
      allTagsModalSearchLabel = 'Search all tags',
      allTagsModalSearchPlaceholderText = 'Search all tags',
      showAllTagsLabel = 'View all tags',
      onOverflowClick,
      tags,
      containingElementRef,
      measurementOffset = defaults.measurementOffset,
      onOverflowTagChange = defaults.onOverflowTagChange,

      // Collect any other property values passed in.
      ...rest
    }: TagSetProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const [displayCount, setDisplayCount] = useState<number>(3);
    const [displayedTags, setDisplayedTags] = useState<JSX.Element[]>([]);
    const [hiddenSizingTags, setHiddenSizingTags] = useState<JSX.Element[]>([]);
    const [showAllModalOpen, setShowAllModalOpen] = useState(false);
    const localTagSetRef = useRef<HTMLDivElement>(null);
    const tagSetRef = ref || localTagSetRef;
    const sizingContainerRef = useRef<HTMLDivElement>(null);
    const displayedArea = useRef(null);
    const [sizingTags, setSizingTags] = useState<HTMLDivElement[]>([]);
    const overflowTag = useRef<HTMLDivElement>(null);
    const [maxVisibleCount, setMaxVisibleCount] = useState<number>(0);

    const [popoverOpen, setPopoverOpen] = useState(false);

    const handleShowAllClick = () => {
      setShowAllModalOpen(true);
    };

    useEffect(() => {
      const maxCount = maxVisible || tags?.length || 0;
      setMaxVisibleCount(maxCount);
    }, [maxVisible, tags]);

    useEffect(() => {
      const newSizingTags: HTMLDivElement[] = [];
      // create sizing tags
      setHiddenSizingTags(
        tags && tags.length > 0
          ? tags.map(({ label, id, filter, onClose, ...other }, index) => {
              return (
                <div
                  key={index}
                  className={`${blockClass}__sizing-tag`}
                  ref={(el) => {
                    if (el != null) {
                      newSizingTags[index] = el;
                    }
                  }}
                >
                  {typeof onClose === 'function' || filter ? (
                    <DismissibleTag
                      {...other}
                      data-original-id={id}
                      text={label}
                    />
                  ) : (
                    <Tag
                      {...other} // ensure id is not duplicated
                      data-original-id={id}
                    >
                      {label}
                    </Tag>
                  )}
                </div>
              );
            })
          : []
      );
      setSizingTags(newSizingTags);
    }, [tags]);

    const handleTagOnClose = useCallback(
      (onClose, index) => {
        onClose?.();
        if (index <= displayCount - 1) {
          setPopoverOpen(false);
        }
      },
      [displayCount]
    );

    useEffect(() => {
      let size = 'md';
      // create visible and overflow tags
      let newDisplayedTags =
        tags && tags.length > 0
          ? tags.map(({ label, onClose, filter, ...other }, index) => {
              if (index == tags.length - 1 && other.size) {
                size = other.size;
              }

              if (typeof onClose === 'function' || filter) {
                return (
                  <DismissibleTag
                    {...other}
                    key={`displayed-tag-${index}`}
                    onClose={() => handleTagOnClose(onClose, index)}
                    text={label}
                  />
                );
              }

              return (
                <Tag {...other} key={`displayed-tag-${index}`}>
                  {label}
                </Tag>
              );
            })
          : [];

      // separate out tags for the overflow
      const newOverflowTags = newDisplayedTags.splice(
        displayCount,
        newDisplayedTags.length - displayCount
      );

      // add wrapper around displayed tags
      newDisplayedTags = newDisplayedTags.map((tag, index) => (
        <div key={index} className={`${blockClass}__displayed-tag`}>
          {tag}
        </div>
      ));

      newDisplayedTags.push(
        <TagSetOverflow
          allTagsModalSearchThreshold={allTagsModalSearchThreshold}
          overflowAutoAlign={overflowAutoAlign}
          className={overflowClassName}
          onShowAllClick={handleShowAllClick}
          overflowTags={newOverflowTags}
          overflowAlign={overflowAlign}
          overflowType={overflowType}
          showAllTagsLabel={showAllTagsLabel}
          size={size}
          key="displayed-tag-overflow"
          ref={overflowTag}
          popoverOpen={popoverOpen}
          onOverflowClick={onOverflowClick}
          setPopoverOpen={setPopoverOpen}
        />
      );

      onOverflowTagChange?.(newOverflowTags);
      setDisplayedTags(newDisplayedTags);
    }, [
      displayCount,
      overflowAlign,
      overflowClassName,
      overflowType,
      showAllTagsLabel,
      onOverflowClick,
      tags,
      onOverflowTagChange,
      popoverOpen,
      handleTagOnClose,
      overflowAutoAlign,
    ]);

    const checkFullyVisibleTags = useCallback(() => {
      if (multiline) {
        return setDisplayCount(maxVisibleCount);
      }

      // how many will fit?
      let willFit = 0;

      if (sizingTags.length > 0) {
        const optionalContainingElement =
          typeof containingElementRef !== 'function' &&
          containingElementRef?.current;
        const measurementOffsetValue =
          typeof measurementOffset === 'number' ? measurementOffset : 0;
        let spaceAvailable = optionalContainingElement
          ? optionalContainingElement.offsetWidth - measurementOffsetValue
          : tagSetRef?.['current'].offsetWidth;

        for (const i in sizingTags) {
          const tagWidth = sizingTags[i]?.offsetWidth || 0;

          if (spaceAvailable >= tagWidth) {
            spaceAvailable -= tagWidth;
            willFit += 1;
          } else {
            break;
          }
        }

        if (willFit < sizingTags.length && overflowTag.current) {
          while (
            willFit > 0 &&
            spaceAvailable < overflowTag.current.offsetWidth
          ) {
            // Highly unlikely any useful tag is smaller
            willFit -= 1; // remove one tag
            spaceAvailable += sizingTags[willFit].offsetWidth;
          }
        }
      }

      if (willFit < 1) {
        setDisplayCount(0);
      } else {
        setDisplayCount(
          maxVisibleCount ? Math.min(willFit, maxVisibleCount) : willFit
        );
      }
    }, [
      maxVisibleCount,
      multiline,
      sizingTags,
      tagSetRef,
      measurementOffset,
      containingElementRef,
    ]);

    useEffect(() => {
      checkFullyVisibleTags();
    }, [checkFullyVisibleTags, maxVisibleCount, multiline, sizingTags]);

    /* don't know how to test resize */
    /* istanbul ignore next */
    const handleResize = () => {
      /* istanbul ignore next */ // not sure how to test resize
      checkFullyVisibleTags();
    };

    /* don't know how to test resize */
    /* istanbul ignore next */
    const handleSizerTagsResize = () => {
      /* istanbul ignore next */ // not sure how to test resize
      checkFullyVisibleTags();
    };

    const handleModalClose = () => {
      setShowAllModalOpen(false);

      const launcherButton = overflowTag.current?.querySelector('button');
      setTimeout(() => launcherButton?.focus(), 0);
    };

    useResizeObserver(
      sizingContainerRef as RefObject<HTMLDivElement>,
      handleSizerTagsResize
    );

    const resizeOption = containingElementRef
      ? containingElementRef
      : tagSetRef;
    useResizeObserver(resizeOption as RefObject<HTMLElement>, handleResize);

    return (
      <div
        {...rest}
        className={cx([blockClass, className])}
        ref={tagSetRef}
        {...getDevtoolsProps(componentName)}
      >
        <div
          className={cx([
            `${blockClass}__space`,
            `${blockClass}__space--align-${align}`,
          ])}
        >
          <div
            className={`${blockClass}__tag-container ${blockClass}__tag-container--hidden`}
            aria-hidden={true}
            ref={sizingContainerRef}
          >
            {hiddenSizingTags}
          </div>

          <div
            className={cx([
              `${blockClass}__tag-container`,
              multiline && `${blockClass}__tag-container--multiline`,
            ])}
            ref={displayedArea}
          >
            {displayedTags}
          </div>
        </div>
        {!onOverflowClick && (
          <TagSetModal
            allTags={tags}
            open={showAllModalOpen}
            title={allTagsModalTitle}
            onClose={handleModalClose}
            modalAriaLabel={allTagsModalAriaLabel}
            searchLabel={allTagsModalSearchLabel}
            searchPlaceholder={allTagsModalSearchPlaceholderText}
            portalTarget={allTagsModalTarget}
          />
        )}
      </div>
    );
  }
);

// Return a placeholder if not released and not enabled by feature flag

// copied from carbon-components-react/src/components/Tag/Tag.js for DocGen
const TYPES = {
  red: 'Red',
  magenta: 'Magenta',
  purple: 'Purple',
  blue: 'Blue',
  cyan: 'Cyan',
  teal: 'Teal',
  green: 'Green',
  gray: 'Gray',
  'cool-gray': 'Cool-Gray',
  'warm-gray': 'Warm-Gray',
  'high-contrast': 'High-Contrast',
  outline: 'Outline',
};
const tagTypes = Object.keys(TYPES);

TagSet['types'] = tagTypes;

TagSet.propTypes = {
  /**
   * align the Tags displayed by the TagSet. Default start.
   */
  align: PropTypes.oneOf(['start', 'center', 'end']),
  /**
   * aria label for all tags modal with hasScrollingContent
   */
  allTagsModalAriaLabel: PropTypes.string,
  /**
   * label text for the show all search.
   */
  allTagsModalSearchLabel: PropTypes.string,
  /**
   * placeholder text for the show all search.
   */
  allTagsModalSearchPlaceholderText: PropTypes.string,
  /**
   * portal target for the all tags modal
   */
  allTagsModalTarget: PropTypes.node,
  /**
   * title for the show all modal.
   */
  allTagsModalTitle: PropTypes.string,
  /**
   * className
   */
  className: PropTypes.string,
  /**
   * Optional ref for custom resize container to measure available space
   * Default will measure the available space of the TagSet container itself.
   */
  /**@ts-ignore */
  containingElementRef: PropTypes.object,
  /**
   * maximum visible tags
   */
  maxVisible: PropTypes.number,
  /**
   * Specify offset amount for measure available space, only used when `containingElementSelector`
   * is also provided
   */
  measurementOffset: PropTypes.number,
  /**
   * display tags in multiple lines
   */
  multiline: PropTypes.bool,
  /**
   * An optional click handler that overrides the default functionality of displaying all tags in a modal
   */
  onOverflowClick: PropTypes.func,
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
   * Will auto-align the popover on first render if it is not visible. This prop is currently experimental and is subject to future changes.
   */
  overflowAutoAlign: PropTypes.bool,
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
   */
  showAllTagsLabel: PropTypes.string,
  /**
   * The tags to be shown in the TagSet. Each tag is specified as an object
   * with properties: **label**\* (required) to supply the tag content, and
   * other properties will be passed to the Carbon Tag component, such as
   * **type**, **disabled**, **ref**, **className** , and any other Tag props.
   *
   * See https://react.carbondesignsystem.com/?path=/docs/components-tag--default
   */
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      ...Tag.propTypes,
      label: PropTypes.string.isRequired,
      // we duplicate this prop to improve the DocGen
      type: PropTypes.oneOf(tagTypes),
    })
  ),
};

TagSet.displayName = componentName;

export default TagSet;
