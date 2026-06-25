//
// Copyright IBM Corp. 2020, 2025
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

import {
  Button,
  Column,
  FlexGrid,
  Row,
  Tag,
  Tooltip,
  usePrefix,
  ButtonProps,
  PopoverAlignment,
} from '@carbon/react';
import { TagProps } from '@carbon/react/lib/components/Tag/Tag';
import React, {
  ForwardedRef,
  JSX,
  MutableRefObject,
  PropsWithChildren,
  ReactNode,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import { TagSet } from '../TagSet/TagSet';
import { baseFontSize, spacing } from '@carbon/layout';
import {
  blockClass,
  utilCheckUpdateVerticalSpace,
  utilGetBreadcrumbItemForTitle,
  utilSetCollapsed,
} from './PageHeaderUtils';
import {
  deprecateProp,
  prepareProps,
} from '../../global/js/utils/props-helper';
import {
  useIsomorphicEffect,
  useNearestScroll,
  useWindowResize,
} from '../../global/js/hooks';

import { ActionBar } from '../ActionBar/';
import { BreadcrumbWithOverflow } from '../BreadcrumbWithOverflow';
import { ButtonSetWithOverflow } from '../ButtonSetWithOverflow';
import { ChevronUp } from '@carbon/react/icons';
import { PageHeaderTitle } from './PageHeaderTitle';
import PropTypes from 'prop-types';
import { breakpoints } from '@carbon/layout';
import cx from 'classnames';
import { getDevtoolsProps } from '../../global/js/utils/devtools';
import { pkg } from '../../settings';
import { useResizeObserver } from '../../global/js/hooks/useResizeObserver';

const componentName = 'PageHeader';

// Default values for props
const defaults = {
  fullWidthGrid: false,
  narrowGrid: false,
  breadcrumbOverflowTooltipAlign: 'right',
};

interface ActionBarItem extends ButtonProps<'button'> {
  iconDescription: string;
  onClick: () => void;
  renderIcon: React.ElementType;
}

type Size = 'xl';

type ActionBarOverflowAriaLabelProps =
  | {
      /**
       * Specifies the action bar items which are the final items in the row top of the PageHeader.
       * Each item is specified as an object with the properties of a Carbon Button in icon only form.
       * Button kind, size, tooltipPosition, tooltipAlignment and type are ignored.
       */
      actionBarItems: ActionBarItem[];
      /**
       * When there is insufficient space for all actionBarItems to be displayed this
       * aria label is used for the action bar overflow menu
       *
       * NOTE: This prop is required if actionBarItems are supplied
       */
      actionBarOverflowAriaLabel: string;
    }
  | {
      actionBarItems?: never;
      actionBarOverflowAriaLabel?: string;
    };

type BreadcrumbLabelProps =
  | {
      label?: string;
      title?: string;
    }
  | {
      /**
       * Pass in content that will be inside of the BreadcrumbItem
       */
      label:
        | ReactNode
        | JSX.Element
        | (() => JSX.Element)
        | JSX.Element[]
        | ReactNode[];
      /**
       * A text version of the `label` for display, required if `label` is not a string.
       */
      title: string;
    };

interface BreadcrumbBase {
  /**
   * Optional string representing the link location for the BreadcrumbItem
   */
  href?: string;

  /**
   * Provide if this breadcrumb item represents the current page
   */
  isCurrentPage?: boolean;

  /**
   * Key required to render array efficiently
   */
  key: string;
}

type Breadcrumb = BreadcrumbBase & BreadcrumbLabelProps;

type BreadcrumbProps =
  | {
      /**
       * Specifies the breadcrumb components to be shown in the breadcrumb area of
       * the page header. Each item is specified as an object with optional fields
       * 'label' to supply the breadcrumb label, 'href' to supply the link location,
       * and 'isCurrentPage' to specify whether this breadcrumb component represents
       * the current page. Each item should also include a unique 'key' field to
       * enable efficient rendering, and if the label is not a string then a 'title'
       * field is required to provide a text alternative for display. Any other
       * fields in the object will be passed through to the breadcrumb element as
       * HTML attributes.
       */
      breadcrumbs: Breadcrumb[];
      /**
       * If the user supplies breadcrumbs then this property is required.
       * It is used in an overflow menu when there is insufficient space to display all breadcrumbs inline.
       */
      breadcrumbOverflowAriaLabel: string;
    }
  | {
      breadcrumbs?: never;
      breadcrumbOverflowAriaLabel?: string;
    };

type CollapseHeaderProps =
  | {
      hasCollapseHeaderToggle?: false;
      withoutBackground?: boolean;
      collapseHeaderIconDescription?: string;
      expandHeaderIconDescription?: string;
    }
  | {
      /**
       * Adds a button as the last element of the bottom row which collapses and expands the header.
       *
       * NOTE: The header is collapsed by setting the scroll position to hide part of the header.
       * Collapsing has no effect if there is insufficient content to scroll.
       */
      hasCollapseHeaderToggle: true;
      /**
       * Specifies if the PageHeader should appear without a background color, and defaults to the preferred `false` (a background color is shown).
       * Note that when `true` some parts of the header still gain a background if and when they stick to the top of the PageHeader on scroll.
       */
      withoutBackground?: false;
      /**
       * If `hasCollapseHeaderToggle` is set and `withoutBackground` is unset/falsy then assistive text is
       * required for both the expend and collapse states of the button component used.
       */
      collapseHeaderIconDescription: string;
      expandHeaderIconDescription: string;
    };

interface PageAction {
  content: ReactNode;
  minWidth: number;
  maxWidth: number;
}

type PageActionProps =
  | {
      /**
       * Specifies the primary page actions which are placed at the same level in the page as the title.
       *
       * Either a set of actions, each specified as an object with the properties of a Carbon Button plus:
       *
       * - label: node
       *
       * Or a single object
       *
       * - content: content to be rendered. NOTE: must be capable of restricting itself to the space provided. This 2.5rem height ($spacing-08)
       * and the width not used by action bar items when scrolled into toolbar.
       * - minWidth: smallest number of pixel width the content would like. NOTE: This is not guaranteed and may be less on small viewports.
       * - maxWidth: maximum number of pixels the content will grow to
       * Carbon Button API https://react.carbondesignsystem.com/?path=/docs/components-button--default#component-api
       */
      pageActions: ButtonProps<React.ElementType>[] | PageAction;
      /**
       * When there is insufficient space to display all of hte page actions inline a dropdown button menu is shown,
       * containing the page actions. This label is used as the display content of the dropdown button menu.
       *
       * NOTE: This prop is required if pageActions are supplied
       */
      pageActionsOverflowLabel: ReactNode;
    }
  | {
      pageActions?: never;
      pageActionsOverflowLabel?: ReactNode;
    };

interface Tag extends TagProps<React.ElementType> {
  label: string;
}

interface TitleIcon {
  // Update docgen if changed
  text: string;
  icon?: object | (() => void);
  loading?: boolean;

  // inline edit version properties
  editableLabel?: string;
  id?: string;
  onCancel?: () => void;
  onChange?: () => void;
  onSave?: () => void;
  cancelDescription?: string;
  editDescription?: string;
  saveDescription?: string;
  tooltipAlignment?:
    | 'top'
    | 'top-left'
    | 'top-right'
    | 'bottom'
    | 'bottom-left'
    | 'bottom-right'
    | 'left'
    | 'right';
  // Update docgen if changed
}

interface TitleContent {
  content: ReactNode;
  breadcrumbContent?: ReactNode;
  asText: string;
}

interface PageHeaderBaseProps extends PropsWithChildren {
  /**
   * class name applied to the action bar overflow options
   */
  actionBarMenuOptionsClass?: string;
  /**
   * When tags are supplied there may not be sufficient space to display all of the tags. This results in an overflow
   * menu being shown. If in the overflow menu there is still insufficient space this label is used in a dialog showing
   * all tags.
   *
   * **Note: Required if more than 10 tags**
   */
  allTagsModalSearchLabel?: string;
  /**
   * When tags are supplied there may not be sufficient space to display all of the tags. This results in an overflow
   * menu being shown. If in the overflow menu there is still insufficient space this placeholder is used in a dialog
   * showing all tags.
   *
   * **Note: Required if more than 10 tags**
   */
  allTagsModalSearchPlaceholderText?: string;
  /**
   * When tags are supplied there may not be sufficient space to display all of the tags. This results in an overflow
   * menu being shown. If in the overflow menu there is still insufficient space this title is used in a dialog showing
   * all tags.
   *
   * **Note: Required if more than 10 tags**
   */
  allTagsModalTitle?: string;
  /**
   * align breadcrumb overflow tooltip
   */
  breadcrumbOverflowTooltipAlign?: PopoverAlignment;
  /**
   * Label for the Breadcrumb component
   */
  breadcrumbLabel?: string;
  /**
   * Specifies class(es) to be applied to the top-level PageHeader node.
   * Optional.
   */
  className?: string;
  /**
   * The header can as a whole be collapsed, expanded or somewhere in between.
   * This setting controls the initial value, but also takes effect on change
   *
   * NOTE: The header is collapsed by setting the scroll position to hide part of the header.
   * Collapsing has no effect if there is insufficient content to scroll.
   */
  collapseHeader?: boolean;
  /**
   * The title row typically starts below the breadcrumb row. This option
   * preCollapses it into the breadcrumb row.
   */
  collapseTitle?: boolean;
  /**
   * Standard keeps the breadcrumb on the page. This option allows the breadcrumb
   * to scroll off
   */
  enableBreadcrumbScroll?: boolean;
  /**
   * The PageHeader is hosted in a Carbon grid, this value is passed through to the Carbon grid fullWidth prop.
   * 'xl' is used to override the grid width setting. Can be used with narrowGrid: true to get the largest size.
   */
  fullWidthGrid?: boolean | Size;

  /**
   * The PageHeader is hosted in a Carbon grid, this value is passed through to the Carbon grid narrow prop
   */
  narrowGrid?: boolean;
  /**
   * Content for the navigation area in the PageHeader. Should
   * be a React element that is normally a Carbon Tabs component. Optional.
   */
  navigation?: ReactNode;
  // Supports Tabs
  /**
   * class name applied to the page actions overflow options
   */
  pageActionsMenuOptionsClass?: string;

  /**
   * When tags are supplied there may not be sufficient space to display all of the tags. This results in an overflow
   * menu being shown. If in the overflow menu there is still insufficient space this label is used to offer a
   * "View all tags" option.
   *
   * **Note: Required if more than 10 tags**
   */
  showAllTagsLabel?: string;
  /**
   * Sitting just below the title is this optional subtitle that provides additional context to
   * identify the current page.
   */
  subtitle?: ReactNode;
  /**
   * An array of tags to be shown as the final content in the PageHeader.
   *
   * Each tag is specified as an object with the following properties
   * **label**\* (required) to supply the tag content, and properties of the the Carbon Tag component,
   * such as **type**, **disabled**, **ref**, **className** , and any other Tag props.
   *
   * NOTE: **filter** is not supported. Any remaining fields in the object will be passed through to the HTML element
   * as HTML attributes.
   *
   * See https://react.carbondesignsystem.com/?path=/docs/components-tag--default
   */
  tags?: Tag[];
  /**
   * An optional page title supplied as a string or object with the following attributes: text, icon, loading
   *
   * Can be supplied either as:
   * - String
   * - Object containing
   *    - text: title string
   *    - icon: optional icon
   *    - loading: boolean shows loading indicator if true
   *    - onChange: function to process the live value (React change === HTML Input)
   *    - onSave: function to process a confirmed change
   *    - editableLabel: label for edit required if onChange supplied
   *    - cancelDescription: label for edit cancel button
   *    - saveDescription: label for edit save button
   *    - tooltipAlignment: position for tooltip displayed for large titles. Default to "bottom"
   * - Object containing user defined contents. These must fit within the area defined for the title in both main part of the header and the breadcrumb.
   *    - content: title or name of current location shown in main part of page header
   *    - breadcrumbContent: version of content used in the breadcrumb on scroll. If not supplied
   *    - asText: String based representation of the title
   */
  title: string | TitleIcon | TitleContent;
  // Deprecated props
  /**
   * @deprecated Property replaced by `enableBreadcrumbScroll
   */
  disableBreadcrumbScroll?: boolean;
  /**
   * @deprecated Property replaced by `withoutBackground`
   */
  hasBackgroundAlways?: boolean;
}

export type PageHeaderProps = PageHeaderBaseProps &
  PageActionProps &
  CollapseHeaderProps &
  BreadcrumbProps &
  ActionBarOverflowAriaLabelProps;

interface Metrics {
  headerOffset?: number;
  headerTopValue?: number;
  titleRowSpaceAbove?: number;
  pageActionsSpaceAbove?: number;
  breadcrumbRowSpaceBelow?: number;
  headerHeight?: number;
  headerWidth?: number;
  breadcrumbTitleHeight?: number;
  breadcrumbRowWidth?: number;
  breadcrumbRowHeight?: number;
  navigationRowHeight?: number;
}

interface HTMLElementStyled extends HTMLElement {
  style: CSSStyleDeclaration;
}

export const PageHeader = React.forwardRef(
  (
    {
      // The component props, in alphabetical order (for consistency).

      actionBarItems,
      actionBarMenuOptionsClass,
      actionBarOverflowAriaLabel,
      allTagsModalSearchLabel,
      allTagsModalSearchPlaceholderText,
      allTagsModalTitle,
      hasBackgroundAlways: deprecated_hasBackgroundAlways,
      breadcrumbOverflowAriaLabel,
      breadcrumbLabel,
      breadcrumbs,
      children,
      className,
      collapseHeader,
      collapseHeaderIconDescription,
      collapseTitle,
      disableBreadcrumbScroll: deprecated_disableBreadcrumbScroll,
      enableBreadcrumbScroll,
      expandHeaderIconDescription,
      fullWidthGrid = defaults.fullWidthGrid,
      hasCollapseHeaderToggle,
      narrowGrid = defaults.narrowGrid,
      navigation,
      pageActions,
      pageActionsOverflowLabel,
      pageActionsMenuOptionsClass,
      showAllTagsLabel,
      subtitle,
      tags,
      title,
      withoutBackground,
      breadcrumbOverflowTooltipAlign = defaults.breadcrumbOverflowTooltipAlign as PopoverAlignment,

      // Collect any other property values passed in.
      ...rest
    }: PageHeaderProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    // handle deprecated props - START
    // if withoutBackground is nullish check deprecated_hasBackgroundAlways and default false
    withoutBackground ??= !(deprecated_hasBackgroundAlways ?? true);
    // prefer enabled if nullish check deprecated_disableBreadcrumbScroll and default false
    enableBreadcrumbScroll ??= !(deprecated_disableBreadcrumbScroll ?? true);
    // handle deprecated props - END

    const [metrics, setMetrics] = useState<Metrics>({});
    const [pageHeaderStyles, setPageHeaderStyles] = useState({
      ...(rest as any)?.style,
    });

    // refs
    const localHeaderRef = useRef<HTMLDivElement | null>(null);
    const headerRef = (ref ||
      localHeaderRef) as MutableRefObject<HTMLElementStyled>;
    const sizingContainerRef: RefObject<HTMLDivElement | null> = useRef(null);
    const offsetTopMeasuringRef = useRef(null);
    const overflowMenuRef = useRef<HTMLDivElement>(null);

    // state based on props only
    const hasActionBar = actionBarItems && actionBarItems.length > 0;
    const hasBreadcrumbRow = !!breadcrumbs || !!actionBarItems;

    if (tags && tags?.length > 10) {
      if (!allTagsModalSearchLabel) {
        throw new Error("allTagsModalSearchLabel' is required.");
      }
      if (!allTagsModalSearchPlaceholderText) {
        throw new Error("'allTagsModalSearchPlaceholderText' is required.");
      }
      if (!allTagsModalTitle) {
        throw new Error("'allTagsModalTitle' is required.");
      }
      if (!showAllTagsLabel) {
        throw new Error("'showAllTagsLabel' is required.");
      }
    }

    // utility functions
    const checkUpdateVerticalSpace = function () {
      return utilCheckUpdateVerticalSpace(
        headerRef,
        offsetTopMeasuringRef,
        navigation,
        enableBreadcrumbScroll,
        hasActionBar || false,
        widthIsNarrow,
        setMetrics as () => void
      );
    };

    // NOTE: The buffer is used to add space between the bottom of the header and the last content
    // Not pre-collapsed and (subtitle or children)
    const lastRowBufferActive =
      ((title || pageActions) && !collapseTitle) || subtitle || children;

    // state based on scroll/resize based effects
    const [pageActionsInBreadcrumbRow, setPageActionsInBreadcrumbRow] =
      useState(false);
    const [scrollYValue, setScrollYValue] = useState(0);
    const [hasCollapseButton, setHasCollapseButton] = useState(false);
    const [spaceForCollapseButton, setSpaceForCollapseButton] = useState(false);
    const [actionBarMaxWidth, setActionBarMaxWidth] = useState(0);
    const [actionBarMinWidth, setActionBarMinWidth] = useState(0);
    const [pageActionInBreadcrumbMaxWidth, setPageActionInBreadcrumbMaxWidth] =
      useState(0);
    const [pageActionInBreadcrumbMinWidth, setPageActionInBreadcrumbMinWidth] =
      useState(0);
    const [actionBarColumnWidth, setActionBarColumnWidth] = useState(0);
    const [fullyCollapsed, setFullyCollapsed] = useState(false);
    const [widthIsNarrow, setWidthIsNarrow] = useState(false);

    const prefix = usePrefix();

    // handlers
    const handleActionBarWidthChange = ({ minWidth, maxWidth }) => {
      if (minWidth !== actionBarMinWidth || maxWidth !== actionBarMaxWidth) {
        let overflowMenuWidth = 0;

        const overflowMenu = overflowMenuRef?.current?.querySelector(
          `.${prefix}--overflow-menu`
        );

        if (overflowMenu) {
          overflowMenuWidth = (overflowMenu as HTMLDivElement).offsetWidth;
        }

        /* don't know how to test resize */
        /* istanbul ignore next */
        setActionBarMaxWidth(maxWidth + overflowMenuWidth);
        /* don't know how to test resize */
        /* istanbul ignore next */
        setActionBarMinWidth(minWidth);
      }
    };

    const handlePageActionWidthChange = ({ minWidth, maxWidth }) => {
      /* don't know how to test resize */
      /* istanbul ignore next */
      setPageActionInBreadcrumbMaxWidth(maxWidth);
      /* don't know how to test resize */
      /* istanbul ignore next */
      setPageActionInBreadcrumbMinWidth(minWidth);
    };

    /* istanbul ignore next */
    const handleResizeActionBarColumn = ({ width }) => {
      /* don't know how to test resize */
      /* istanbul ignore next */
      setActionBarColumnWidth(width);
    };

    /* istanbul ignore next */
    const handleResize = () => {
      // receives width and height parameters if needed
      /* don't know how to test resize */
      /* istanbul ignore next */
      checkUpdateVerticalSpace();
    };

    const handleCollapseToggle = () => {
      utilSetCollapsed(
        !fullyCollapsed,
        headerRef,
        metrics?.headerOffset,
        metrics?.headerTopValue
      );
    };

    // use effects
    useEffect(() => {
      /* istanbul ignore else */
      if ((pageActions as PageAction)?.content) {
        const { minWidth, maxWidth } = pageActions as PageAction;
        handlePageActionWidthChange({ minWidth, maxWidth });
      }
    }, [pageActions]);

    useEffect(() => {
      // Determine the location of the pageAction buttons
      setPageActionsInBreadcrumbRow(
        collapseTitle ||
          (hasActionBar &&
            !!metrics?.titleRowSpaceAbove &&
            scrollYValue > metrics?.titleRowSpaceAbove) ||
          (widthIsNarrow &&
            !!metrics?.pageActionsSpaceAbove &&
            scrollYValue > metrics?.pageActionsSpaceAbove)
      );
    }, [
      hasActionBar,
      metrics.breadcrumbRowSpaceBelow,
      metrics.titleRowSpaceAbove,
      metrics.pageActionsSpaceAbove,
      collapseTitle,
      scrollYValue,
      widthIsNarrow,
    ]);

    useEffect(() => {
      // Assesses the size of the action bar and page action area and their required
      // space before setting their sizes
      //
      let newActionBarWidth = 'initial';
      let newPageActionInBreadcrumbWidth = 'initial';

      /* don't know how to test resize */
      /* istanbul ignore if */
      if (actionBarColumnWidth > 0) {
        if (
          pageActionInBreadcrumbMaxWidth > 0 &&
          actionBarColumnWidth >
            actionBarMaxWidth + pageActionInBreadcrumbMaxWidth
        ) {
          newPageActionInBreadcrumbWidth = `${pageActionInBreadcrumbMaxWidth}px`;
        } else if (pageActionInBreadcrumbMinWidth > 0) {
          newPageActionInBreadcrumbWidth = `${pageActionInBreadcrumbMinWidth}px`;
        }

        if (
          actionBarMaxWidth > 0 &&
          actionBarColumnWidth >
            pageActionInBreadcrumbMinWidth + actionBarMaxWidth
        ) {
          newActionBarWidth = `${actionBarMaxWidth}px`;
        } else {
          if (actionBarMinWidth > 0) {
            newActionBarWidth = `${
              actionBarColumnWidth - pageActionInBreadcrumbMinWidth
            }px`;
          }
        }
      }

      setPageHeaderStyles((prev) => ({
        ...prev,
        [`--${blockClass}--max-action-bar-width-px`]: newActionBarWidth,
        [`--${blockClass}--button-set-in-breadcrumb-width-px`]: `${newPageActionInBreadcrumbWidth}`,
      }));
    }, [
      actionBarColumnWidth,
      actionBarMaxWidth,
      actionBarMinWidth,
      pageActionInBreadcrumbMaxWidth,
      pageActionInBreadcrumbMinWidth,
      headerRef,
    ]);

    useEffect(() => {
      // Updates custom CSS props used to manage scroll behavior
      /* istanbul ignore next */
      setPageHeaderStyles((prev) => ({
        ...prev,
        [`--${blockClass}--height-px`]: `${metrics.headerHeight}px`,
        [`--${blockClass}--width-px`]: `${metrics.headerWidth}px`,
        [`--${blockClass}--header-top`]: `${
          (metrics?.headerTopValue || 0) + (metrics?.headerOffset || 0)
        }px`,
        [`--${blockClass}--breadcrumb-title-visibility`]:
          scrollYValue > 0 ? 'visible' : 'hidden',
        [`--${blockClass}--scroll`]: `${scrollYValue}`,
        [`--${blockClass}--breadcrumb-title-top`]: `${
          metrics.breadcrumbTitleHeight &&
          metrics.titleRowSpaceAbove &&
          Math.max(
            0,
            metrics.breadcrumbTitleHeight +
              metrics.titleRowSpaceAbove -
              scrollYValue
          )
        }px`,
        [`--${blockClass}--breadcrumb-title-opacity`]: `${Math.min(
          1,
          Math.max(
            0,
            (scrollYValue - (metrics.titleRowSpaceAbove || 0)) /
              (metrics.breadcrumbTitleHeight || 1) // don't want to divide by zero
          )
        )}`,
        [`--${blockClass}--breadcrumb-row-width-px`]: `${metrics?.breadcrumbRowWidth}px`,
      }));
    }, [
      headerRef,
      enableBreadcrumbScroll,
      metrics,
      metrics.breadcrumbRowHeight,
      metrics.breadcrumbRowSpaceBelow,
      metrics.breadcrumbTitleHeight,
      metrics.breadcrumbRowWidth,
      metrics.headerHeight,
      metrics.headerWidth,
      metrics.headerOffset,
      metrics.headerTopValue,
      metrics.navigationRowHeight,
      navigation,
      scrollYValue,
      tags,
    ]);

    useNearestScroll(
      headerRef,
      // on scroll or various layout changes check updates if needed
      // istanbul ignore next
      ({ current }) => {
        setPageHeaderStyles((prev) => ({
          ...prev,
          [`--${blockClass}--breadcrumb-top`]: `${metrics.headerOffset}px`,
        }));

        const fullyCollapsed =
          current.scrollY + metrics.headerTopValue + metrics.headerOffset >= 0;
        setFullyCollapsed(fullyCollapsed);

        // set offset for tagset tooltip
        /* istanbul ignore next */
        const tagsetTooltipOffset =
          fullyCollapsed &&
          metrics?.headerHeight &&
          metrics?.headerTopValue &&
          metrics?.headerOffset
            ? metrics.headerHeight +
              metrics.headerTopValue +
              metrics.headerOffset
            : (metrics.headerHeight || 0) + (metrics.headerOffset || 0);

        /* istanbul ignore next */
        document.documentElement.style.setProperty(
          `--${blockClass}--tagset-tooltip-position`,
          fullyCollapsed ? 'fixed' : 'absolute'
        );

        document.documentElement.style.setProperty(
          `--${blockClass}--tagset-tooltip-offset`,
          `${tagsetTooltipOffset}px`
        );

        setScrollYValue(current.scrollY);
      },
      [
        metrics.headerHeight,
        metrics.headerTopValue,
        metrics.headerOffset,
        enableBreadcrumbScroll,
      ]
    );

    useWindowResize(
      ({ current }) => {
        // on window resize and other updates some values may have changed
        checkUpdateVerticalSpace();
        setWidthIsNarrow(
          current.innerWidth / 16 < parseInt(breakpoints.md.width)
        ); // small (below medium) media query
      },
      [
        actionBarItems,
        children,
        breadcrumbs,
        enableBreadcrumbScroll,
        navigation,
        pageActions,
        subtitle,
        tags,
        title,
      ]
    );

    useEffect(() => {
      checkUpdateVerticalSpace();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fullWidthGrid, narrowGrid]);

    useEffect(() => {
      // Determines the appropriate header background opacity based on the header config/height/scroll and the withoutBackground setting
      let result = withoutBackground ? 0 : 1;

      if (
        !result &&
        metrics?.headerHeight &&
        metrics.headerHeight > 0 &&
        (breadcrumbs || actionBarItems || tags || navigation)
      ) {
        const startAddingAt =
          parseFloat(`${spacing[9]}`) * parseInt(`${baseFontSize}`);
        const scrollRemaining = metrics.headerHeight - scrollYValue;

        /* don't know how to test resize */
        /* istanbul ignore if */
        if (scrollRemaining < startAddingAt) {
          const distanceAddingOver =
            startAddingAt - (metrics?.breadcrumbRowHeight || 0);
          result = Math.min(
            1,
            (startAddingAt - scrollRemaining) / distanceAddingOver
          );
        }
      }
      setPageHeaderStyles((prev) => ({
        ...prev,
        [`--${blockClass}--background-opacity`]: result,
      }));
    }, [
      actionBarItems,
      withoutBackground,
      breadcrumbs,
      headerRef,
      metrics.breadcrumbRowHeight,
      metrics.headerHeight,
      navigation,
      scrollYValue,
      hasCollapseHeaderToggle,
      tags,
    ]);

    useEffect(() => {
      // only has toggle if requested and withoutBackground is unset/falsy
      setHasCollapseButton(
        (hasCollapseHeaderToggle && !withoutBackground) || false
      );
    }, [withoutBackground, hasCollapseHeaderToggle]);

    useEffect(() => {
      // Determine if space is needed in the breadcrumb for a collapse button
      if (hasCollapseButton && !(navigation || tags) && metrics?.headerHeight) {
        setSpaceForCollapseButton(true);
      } else {
        setSpaceForCollapseButton(false);
      }
    }, [hasCollapseButton, navigation, tags, metrics.headerHeight]);

    const nextToTabsCheck = () => {
      /* istanbul ignore next */
      return (
        enableBreadcrumbScroll &&
        !actionBarItems &&
        metrics.headerTopValue &&
        scrollYValue + metrics.headerTopValue >= 0
      );
    };

    useEffect(() => {
      if (collapseHeader === true) {
        utilSetCollapsed(
          collapseHeader,
          headerRef,
          metrics.headerOffset,
          metrics.headerTopValue
        );
      }
    }, [
      collapseHeader,
      metrics.headerOffset,
      metrics.headerTopValue,
      headerRef,
    ]);

    useResizeObserver(
      sizingContainerRef as RefObject<HTMLDivElement>,
      handleResizeActionBarColumn
    );
    useResizeObserver(headerRef, handleResize);

    // Determine what form of title to display in the breadcrumb
    const breadcrumbItemForTitle = utilGetBreadcrumbItemForTitle(
      blockClass,
      collapseTitle,
      title
    );

    const getBreadcrumbs = () => {
      if (breadcrumbs && breadcrumbItemForTitle) {
        return breadcrumbs.concat(breadcrumbItemForTitle as Breadcrumb);
      } else {
        if (breadcrumbItemForTitle) {
          return [breadcrumbItemForTitle];
        } else {
          return breadcrumbs;
        }
      }
    };

    const displayedBreadcrumbs = getBreadcrumbs();

    useIsomorphicEffect(() => {
      Object.keys(pageHeaderStyles).forEach((key) => {
        // check if style is a css var
        if (key.startsWith('--')) {
          headerRef.current.style.setProperty(key, pageHeaderStyles[key]);
        } else {
          headerRef.current.style[key] = pageHeaderStyles[key];
        }
      });
    }, [headerRef, pageHeaderStyles]);

    return (
      <>
        <div
          className={`${blockClass}--offset-top-measuring-element`}
          ref={offsetTopMeasuringRef}
        />
        <section
          {...rest}
          className={cx([
            blockClass,
            `${blockClass}--no-margins-below-row`,
            className,
            {
              [`${blockClass}--has-navigation`]: navigation || tags,
              [`${blockClass}--has-navigation-tags-only`]: !navigation && tags,
              [`${blockClass}--without-background`]: withoutBackground,
            },
          ])}
          ref={headerRef}
          {...getDevtoolsProps(componentName)}
        >
          <FlexGrid
            fullWidth={fullWidthGrid === true || fullWidthGrid === 'xl'}
            narrow={narrowGrid}
            className={cx({
              [`${blockClass}--width--xl`]: fullWidthGrid === 'xl',
            })}
          >
            <div className={`${blockClass}__non-navigation-row-content`}>
              {hasBreadcrumbRow ? (
                <Row
                  className={cx(`${blockClass}__breadcrumb-row`, {
                    [`${blockClass}__breadcrumb-row--next-to-tabs`]:
                      nextToTabsCheck(),
                    [`${blockClass}__breadcrumb-row--has-breadcrumbs`]:
                      breadcrumbs || breadcrumbItemForTitle,
                    [`${blockClass}__breadcrumb-row--has-action-bar`]:
                      hasActionBar || widthIsNarrow,
                    [`${blockClass}__has-page-actions-without-action-bar`]:
                      !hasActionBar && !widthIsNarrow && pageActions,
                    [`${blockClass}__has-page-actions-with-title-collapsed`]:
                      collapseTitle && pageActions,
                  })}
                >
                  <div className={`${blockClass}__breadcrumb-row--container`}>
                    <Column
                      className={cx(`${blockClass}__breadcrumb-column`, {
                        [`${blockClass}__breadcrumb-column--background`]:
                          !!breadcrumbs || hasActionBar || widthIsNarrow,
                      })}
                    >
                      {/* keeps actionBar right even if empty */}

                      {(breadcrumbs || breadcrumbItemForTitle) && (
                        <BreadcrumbWithOverflow
                          className={`${blockClass}__breadcrumb`}
                          noTrailingSlash={!!title}
                          overflowAriaLabel={breadcrumbOverflowAriaLabel}
                          breadcrumbs={displayedBreadcrumbs}
                          overflowTooltipAlign={breadcrumbOverflowTooltipAlign}
                          maxVisible={undefined}
                          label={breadcrumbLabel}
                        />
                      )}
                    </Column>
                    <Column
                      className={cx([
                        `${blockClass}__action-bar-column ${blockClass}__action-bar-column--background`,
                        {
                          [`${blockClass}__action-bar-column--has-page-actions`]:
                            pageActions,
                          [`${blockClass}__action-bar-column--influenced-by-collapse-button`]:
                            spaceForCollapseButton,
                        },
                      ])}
                    >
                      <div
                        className={`${blockClass}__action-bar-column-content`}
                        ref={sizingContainerRef}
                      >
                        {hasActionBar ? (
                          // Investigate the responsive behavior or this and the title also fix the ActionBar Item and PageAction story css
                          <>
                            {thePageActions(true, pageActionsInBreadcrumbRow)}
                            <ActionBar
                              {...({
                                actions: actionBarItems,
                                className: `${blockClass}__action-bar`,
                                menuOptionsClass: `${cx(
                                  actionBarMenuOptionsClass,
                                  `${blockClass}__action-bar-menu-options`
                                )}`,
                                onWidthChange: handleActionBarWidthChange,
                                overflowAriaLabel: actionBarOverflowAriaLabel,
                                overflowMenuRef,
                                rightAlign: true,
                              } as any)}
                            />
                          </>
                        ) : (
                          (widthIsNarrow || pageActions) &&
                          thePageActions(true, pageActionsInBreadcrumbRow)
                        )}
                      </div>
                    </Column>
                  </div>
                </Row>
              ) : null}

              {!collapseTitle && (title || pageActions) ? (
                <Row
                  className={cx(`${blockClass}__title-row`, {
                    [`${blockClass}__title-row--no-breadcrumb-row`]:
                      !hasBreadcrumbRow,
                    [`${blockClass}__title-row--under-action-bar`]:
                      hasActionBar || widthIsNarrow,
                    [`${blockClass}__title-row--has-page-actions`]:
                      !!pageActions,
                    [`${blockClass}__title-row--sticky`]:
                      !!pageActions && !actionBarItems && hasBreadcrumbRow,
                  })}
                >
                  <Column className={`${blockClass}__title-column`}>
                    {/* keeps page actions right even if empty */}
                    {title ? (
                      <PageHeaderTitle
                        blockClass={blockClass}
                        hasBreadcrumbRow={hasBreadcrumbRow}
                        title={title}
                      />
                    ) : null}
                  </Column>
                  {thePageActions(false, pageActionsInBreadcrumbRow)}
                </Row>
              ) : null}

              {subtitle && (
                <Row className={`${blockClass}__subtitle-row`}>
                  <Column className={`${blockClass}__subtitle`}>
                    <span className={`${blockClass}__subtitle-text`}>
                      {subtitle}
                    </span>
                  </Column>
                </Row>
              )}

              {children ? (
                <Row className={`${blockClass}__available-row`}>
                  <Column className={`${blockClass}__available-column`}>
                    {children}
                  </Column>
                </Row>
              ) : null}

              {/* Last row margin-below causes problems for scroll behavior when it sticks the header.
            This buffer is used in CSS instead to add vertical space after the last row
            */}
              {(breadcrumbs ||
                actionBarItems ||
                title ||
                pageActions ||
                children ||
                subtitle) && (
                <div
                  className={cx([
                    `${blockClass}__last-row-buffer`,
                    {
                      [`${blockClass}__last-row-buffer--active`]:
                        lastRowBufferActive,
                    },
                  ])}
                ></div>
              )}

              {
                // this navigation row scrolls under the breadcrumb if there is one
                tags && !navigation ? (
                  <Row
                    className={cx(`${blockClass}__navigation-row`, {
                      [`${blockClass}__navigation-row--has-tags`]: tags,
                    })}
                  >
                    <Column
                      className={cx(`${blockClass}__navigation-tags`, {
                        [`${blockClass}__navigation-tags--tags-only`]:
                          !navigation,
                      })}
                    >
                      <TagSet
                        overflowAlign="bottom-right"
                        {...{
                          allTagsModalSearchLabel,
                          allTagsModalSearchPlaceholderText,
                          allTagsModalTitle,
                          tags,
                          overflowClassName: `${blockClass}__navigation-tags-overflow`,
                        }}
                        showAllTagsLabel={showAllTagsLabel || ''}
                      />
                    </Column>
                  </Row>
                ) : null
              }
            </div>

            {
              // this navigation pushes the breadcrumb off or settles underneath it depending on enableBreadcrumbScroll
              navigation ? (
                <Row
                  className={cx(`${blockClass}__navigation-row`, {
                    [`${blockClass}__navigation-row--spacing-above-06`]:
                      !!navigation,
                    [`${blockClass}__navigation-row--has-tags`]: tags,
                  })}
                >
                  <Column className={`${blockClass}__navigation-tabs`}>
                    {navigation}
                  </Column>
                  {tags ? (
                    <Column
                      className={cx(`${blockClass}__navigation-tags`, {
                        [`${blockClass}__navigation-tags--tags-only`]:
                          !navigation,
                      })}
                    >
                      <TagSet
                        overflowAlign="bottom-right"
                        {...{
                          allTagsModalSearchLabel,
                          allTagsModalSearchPlaceholderText,
                          allTagsModalTitle,
                          showAllTagsLabel: showAllTagsLabel || '',
                          tags,
                          overflowClassName: `${blockClass}__navigation-tags-overflow`,
                        }}
                      />
                    </Column>
                  ) : null}
                </Row>
              ) : null
            }
          </FlexGrid>
          {hasCollapseButton ? (
            <div
              className={cx(`${blockClass}__collapse-expand-toggle`, {
                [`${blockClass}__collapse-expand-toggle--collapsed`]:
                  fullyCollapsed,
              })}
            >
              <Button
                hasIconOnly={true}
                iconDescription={
                  /* istanbul ignore next */
                  fullyCollapsed
                    ? expandHeaderIconDescription
                    : collapseHeaderIconDescription
                }
                kind="ghost"
                onClick={handleCollapseToggle}
                renderIcon={(props) => <ChevronUp size={16} {...props} />}
                size="md"
                tooltipPosition="bottom"
                tooltipAlignment="end"
                type="button"
              />
            </div>
          ) : null}
        </section>
      </>
    );

    function thePageActions(isBreadcrumbRow, inBreadcrumbRow) {
      if (pageActions) {
        const Tag = isBreadcrumbRow ? 'div' : Column;
        // Only report size change of version action bar is rendered as part of the breadcrumb row.
        // and when there is an actionBar
        const handleWidthChange =
          isBreadcrumbRow && hasBreadcrumbRow
            ? handlePageActionWidthChange
            : () => {};
        return (
          <Tag
            className={cx(`${blockClass}__page-actions`, {
              [`${blockClass}__page-actions--in-breadcrumb`]: inBreadcrumbRow,
            })}
          >
            <div className={cx(`${blockClass}__page-actions-content`)}>
              {(pageActions as PageAction)?.content ?? (
                <ButtonSetWithOverflow
                  className={`${blockClass}__button-set-with-overflow`}
                  menuOptionsClass={cx(
                    pageActionsMenuOptionsClass,
                    `${blockClass}__button-set-menu-options`
                  )}
                  onWidthChange={handleWidthChange}
                  buttons={pageActions as ButtonProps<React.ElementType>[]}
                  buttonSetOverflowLabel={
                    pageActionsOverflowLabel as NonNullable<ReactNode>
                  }
                  rightAlign={!widthIsNarrow}
                />
              )}
            </div>
          </Tag>
        );
      }
    }
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

export const deprecatedProps = {
  /**
   * **Deprecated**
   * see property `enableBreadcrumbScroll`
   */
  disableBreadcrumbScroll: deprecateProp(
    PropTypes.bool,
    'Property replaced by `enableBreadcrumbScroll`'
  ),
  /**
   * **Deprecated** see property `withoutBackground`
   */
  hasBackgroundAlways: deprecateProp(
    PropTypes.bool,
    'Property replaced by `withoutBackground`'
  ),
};

/**@ts-ignore */
PageHeader.tagTypes = tagTypes;

PageHeader.propTypes = {
  /**
   * Specifies the action bar items which are the final items in the row top of the PageHeader.
   * Each item is specified as an object with the properties of a Carbon Button in icon only form.
   * Button kind, size, tooltipPosition, tooltipAlignment and type are ignored.
   */
  /**@ts-ignore */
  actionBarItems: PropTypes.arrayOf(
    PropTypes.shape({
      /**@ts-ignore*/
      ...prepareProps(Button.propTypes, [
        'kind',
        'size',
        'tooltipPosition',
        'tooltipAlignment',
      ]),
      iconDescription: PropTypes.string.isRequired,
      /**@ts-ignore*/
      onClick: Button.propTypes.onClick,
      /**@ts-ignore*/
      renderIcon: Button.propTypes.renderIcon.isRequired,
    })
  ),
  /**
   * class name applied to the action bar overflow options
   */
  actionBarMenuOptionsClass: PropTypes.string,
  /**
   * When there is insufficient space for all actionBarItems to be displayed this
   * aria label is used for the action bar overflow menu
   *
   * NOTE: This prop is required if actionBarItems are supplied
   */
  /**@ts-ignore */
  actionBarOverflowAriaLabel: PropTypes.string,
  /**
   * When tags are supplied there may not be sufficient space to display all of the tags. This results in an overflow
   * menu being shown. If in the overflow menu there is still insufficient space this label is used in a dialog showing
   * all tags.
   *
   * **Note: Required if more than 10 tags**
   */
  allTagsModalSearchLabel: PropTypes.string,
  /**
   * When tags are supplied there may not be sufficient space to display all of the tags. This results in an overflow
   * menu being shown. If in the overflow menu there is still insufficient space this placeholder is used in a dialog
   * showing all tags.
   *
   * **Note: Required if more than 10 tags**
   */
  allTagsModalSearchPlaceholderText: PropTypes.string,
  /**
   * When tags are supplied there may not be sufficient space to display all of the tags. This results in an overflow
   * menu being shown. If in the overflow menu there is still insufficient space this title is used in a dialog showing
   * all tags.
   *
   * **Note: Required if more than 10 tags**
   */
  allTagsModalTitle: PropTypes.string,
  /**
   * If the user supplies breadcrumbs then this property is required.
   * It is used in an overflow menu when there is insufficient space to display all breadcrumbs inline.
   */
  /**@ts-ignore */
  breadcrumbOverflowAriaLabel: PropTypes.string,
  /**
   * align breadcrumb overflow tooltip
   */
  breadcrumbOverflowTooltipAlign: Tooltip.propTypes.align,
  /**
   * Specifies the breadcrumb components to be shown in the breadcrumb area of
   * the page header. Each item is specified as an object with optional fields
   * 'label' to supply the breadcrumb label, 'href' to supply the link location,
   * and 'isCurrentPage' to specify whether this breadcrumb component represents
   * the current page. Each item should also include a unique 'key' field to
   * enable efficient rendering, and if the label is not a string then a 'title'
   * field is required to provide a text alternative for display. Any other
   * fields in the object will be passed through to the breadcrumb element as
   * HTML attributes.
   */
  /**@ts-ignore */
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * Optional string representing the link location for the BreadcrumbItem
       */
      href: PropTypes.string,

      /**
       * Provide if this breadcrumb item represents the current page
       */
      isCurrentPage: PropTypes.bool,

      /**
       * Key required to render array efficiently
       */
      key: PropTypes.string.isRequired,

      /**
       * Pass in content that will be inside of the BreadcrumbItem
       */
      label: PropTypes.node,

      /**
       * A text version of the `label` for display, required if `label` is not a string.
       */
      /**@ts-ignore */
      title: PropTypes.string,
    })
  ),
  /**
   * A zone for placing high-level, client content above the page tabs.
   * Accepts arbitrary renderable content as a React node. Optional.
   */
  children: PropTypes.node,
  /**
   * Specifies class(es) to be applied to the top-level PageHeader node.
   * Optional.
   */
  className: PropTypes.string,
  /**
   * The header can as a whole be collapsed, expanded or somewhere in between.
   * This setting controls the initial value, but also takes effect on change
   *
   * NOTE: The header is collapsed by setting the scroll position to hide part of the header.
   * Collapsing has no effect if there is insufficient content to scroll.
   */
  collapseHeader: PropTypes.bool,
  /**
   * If `hasCollapseHeaderToggle` is set and `withoutBackground` is unset/falsy then assistive text is
   * required for both the expend and collapse states of the button component used.
   */
  /**@ts-ignore */
  collapseHeaderIconDescription: PropTypes.string,
  /**
   * The title row typically starts below the breadcrumb row. This option
   * preCollapses it into the breadcrumb row.
   */
  collapseTitle: PropTypes.bool,
  /**
   * Standard keeps the breadcrumb on the page. This option allows the breadcrumb
   * to scroll off
   */
  enableBreadcrumbScroll: PropTypes.bool,
  /**
   * If `hasCollapseHeaderToggle` is set and `withoutBackground` is unset/falsy then assistive text is
   * required for both the expend and collapse states of the button component used.
   */
  /**@ts-ignore */
  expandHeaderIconDescription: PropTypes.string,
  /**
   * The PageHeader is hosted in a Carbon grid, this value is passed through to the Carbon grid fullWidth prop.
   * 'xl' is used to override the grid width setting. Can be used with narrowGrid: true to get the largest size.
   */
  /**@ts-ignore */
  fullWidthGrid: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['xl'])]),
  /**
   * Adds a button as the last element of the bottom row which collapses and expands the header.
   *
   * NOTE: The header is collapsed by setting the scroll position to hide part of the header.
   * Collapsing has no effect if there is insufficient content to scroll.
   */
  /**@ts-ignore */
  hasCollapseHeaderToggle: PropTypes.bool,
  /**
   * The PageHeader is hosted in a Carbon grid, this value is passed through to the Carbon grid narrow prop
   */
  narrowGrid: PropTypes.bool,
  /**
   * Content for the navigation area in the PageHeader. Should
   * be a React element that is normally a Carbon Tabs component. Optional.
   */
  navigation: PropTypes.element,
  // Supports Tabs
  /**
   * Specifies the primary page actions which are placed at the same level in the page as the title.
   *
   * Either a set of actions, each specified as an object with the properties of a Carbon Button plus:
   *
   * - label: node
   *
   * Or a single object
   *
   * - content: content to be rendered. NOTE: must be capable of restricting itself to the space provided. This 2.5rem height ($spacing-08)
   * and the width not used by action bar items when scrolled into toolbar.
   * - minWidth: smallest number of pixel width the content would like. NOTE: This is not guaranteed and may be less on small viewports.
   * - maxWidth: maximum number of pixels the content will grow to
   * Carbon Button API https://react.carbondesignsystem.com/?path=/docs/components-button--default#component-api
   */
  /**@ts-ignore */
  pageActions: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        /**@ts-ignore*/
        ...Button.propTypes,
        key: PropTypes.string.isRequired,
        /**@ts-ignore*/
        kind: Button.propTypes.kind,
        label: PropTypes.node,
        onClick: PropTypes.func,
      })
    ),
    PropTypes.shape({
      /**
       * minWidth should not be more than 180
       * The content is expected to adjust itself to fit in
       */
      content: PropTypes.node.isRequired,
      minWidth: PropTypes.number.isRequired,
      maxWidth: PropTypes.number.isRequired,
    }),
  ]),
  /**
   * class name applied to the page actions overflow options
   */
  pageActionsMenuOptionsClass: PropTypes.string,
  /**
   * When there is insufficient space to display all of hte page actions inline a dropdown button menu is shown,
   * containing the page actions. This label is used as the display content of the dropdown button menu.
   *
   * NOTE: This prop is required if pageActions are supplied
   */
  /**@ts-ignore */
  pageActionsOverflowLabel: PropTypes.node,
  /**
   * When tags are supplied there may not be sufficient space to display all of the tags. This results in an overflow
   * menu being shown. If in the overflow menu there is still insufficient space this label is used to offer a
   * "View all tags" option.
   *
   * **Note: Required if more than 10 tags**
   */
  showAllTagsLabel: PropTypes.string,
  /**
   * Sitting just below the title is this optional subtitle that provides additional context to
   * identify the current page.
   */
  subtitle: PropTypes.node,
  /**
   * An array of tags to be shown as the final content in the PageHeader.
   *
   * Each tag is specified as an object with the following properties
   * **label**\* (required) to supply the tag content, and properties of the the Carbon Tag component,
   * such as **type**, **disabled**, **ref**, **className** , and any other Tag props.
   *
   * NOTE: **filter** is not supported. Any remaining fields in the object will be passed through to the HTML element
   * as HTML attributes.
   *
   * See https://react.carbondesignsystem.com/?path=/docs/components-tag--default
   */
  /**@ts-ignore */
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      ...prepareProps(Tag.propTypes, 'filter'),
      label: PropTypes.string.isRequired,
      // we duplicate this prop to improve the DocGen
      type: PropTypes.oneOf(tagTypes),
    })
  ),

  /**
   * An optional page title supplied as a string or object with the following attributes: text, icon, loading
   *
   * Can be supplied either as:
   * - String
   * - Object containing
   *    - text: title string
   *    - shortTitle: alternative title for exceptionally long titles
   *    - icon: optional icon
   *    - loading: boolean shows loading indicator if true
   *    - onChange: function to process the live value (React change === HTML Input)
   *    - onSave: function to process a confirmed change
   *    - editableLabel: label for edit required if onChange supplied
   *    - cancelDescription: label for edit cancel button
   *    - saveDescription: label for edit save button
   *    - tooltipAlignment: position for tooltip displayed for large titles. Default to "bottom".
   * - Object containing user defined contents. These must fit within the area defined for the title in both main part of the header and the breadcrumb.
   *    - content: title or name of current location shown in main part of page header
   *    - breadcrumbContent: version of content used in the breadcrumb on scroll. If not supplied
   *    - asText: String based representation of the title
   */
  /**@ts-ignore */
  title: PropTypes.oneOfType([
    PropTypes.shape({
      // Update docgen if changed
      text: PropTypes.string.isRequired,
      shortTitle: PropTypes.string,
      icon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
      loading: PropTypes.bool,

      // inline edit version properties
      editableLabel: PropTypes.string,
      id: PropTypes.string,
      onCancel: PropTypes.func,
      onChange: PropTypes.func,
      onSave: PropTypes.func,
      cancelDescription: PropTypes.string,
      editDescription: PropTypes.string,
      saveDescription: PropTypes.string,
      tooltipAlignment: PropTypes.oneOf([
        'top',
        'top-left',
        'top-right',
        'bottom',
        'bottom-left',
        'bottom-right',
        'left',
        'right',
      ]),
      // Update docgen if changed
    }),
    PropTypes.string,
    PropTypes.shape({
      content: PropTypes.node.isRequired,
      breadcrumbContent: PropTypes.node,
      asText: PropTypes.string.isRequired,
    }),
  ]),

  /**
   * Specifies if the PageHeader should appear without a background color, and defaults to the preferred `false` (a background color is shown).
   * Note that when `true` some parts of the header still gain a background if and when they stick to the top of the PageHeader on scroll.
   */
  /**@ts-ignore */
  withoutBackground: PropTypes.bool,
  ...deprecatedProps,
};

PageHeader.displayName = componentName;
