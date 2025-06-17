/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CaretDown } from '@carbon/icons-react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  ReactElement,
  type ComponentType,
  type FunctionComponent,
  type MouseEvent,
  type MutableRefObject,
} from 'react';
import { keys, match, matches } from '../../internal/keyboard';
import { useControllableState } from '../../internal/useControllableState';
import { usePrefix } from '../../internal/usePrefix';
import { useId } from '../../internal/useId';
import { useFeatureFlag } from '../FeatureFlags';
import { IconButton } from '../IconButton';

export type TreeNodeProps = {
  /**
   * **Note:** this is controlled by the parent TreeView component, do not set manually.
   * The ID of the active node in the tree
   */
  active?: string | number;
  /**
   * Specify the children of the TreeNode
   */
  children?: React.ReactNode;
  /**
   * Specify an optional className to be applied to the TreeNode
   */
  className?: string;
  /**
   * **[Experimental]** The default expansion state of the node.
   * *This is only supported with the `enable-treeview-controllable` feature flag!*
   */
  defaultIsExpanded?: boolean;
  /**
   * **Note:** this is controlled by the parent TreeView component, do not set manually.
   * TreeNode depth to determine spacing
   */
  depth?: number;
  /**
   * Specify if the TreeNode is disabled
   */
  disabled?: boolean;
  /**
   * Specify the TreeNode's ID. Must be unique in the DOM and is used for props.active, props.selected and aria-owns
   */
  id?: string;
  /**
   * Specify if the TreeNode is expanded (only applicable to parent nodes)
   */
  isExpanded?: boolean;
  /**
   * Rendered label for the TreeNode
   */
  label: React.ReactNode;
  /**
   * Callback function for when the node receives or loses focus
   */
  onNodeFocusEvent?: (event: React.FocusEvent<HTMLElement>) => void;
  /**
   * Callback function for when the node is selected
   */
  onSelect?: (event: React.MouseEvent, node?: TreeNodeProps) => void;
  /**
   * Callback function for when a parent node is expanded or collapsed
   */
  onToggle?: (event: React.MouseEvent, node?: TreeNodeProps) => void;
  /**
   * Callback function for when any node in the tree is selected
   */
  onTreeSelect?: (event: React.MouseEvent, node?: TreeNodeProps) => void;
  /**
   * A component used to render an icon.
   */
  renderIcon?: ComponentType | FunctionComponent;
  /**
   * **Note:** this is controlled by the parent TreeView component, do not set manually.
   * Array containing all selected node IDs in the tree
   */
  selected?: Array<string | number>;
  /**
   * Specify the value of the TreeNode
   */
  value?: string;
  /**
   * Optional: The URL the TreeNode is linking to
   */
  href?: string;
  /**
   *
   * Specify how the trigger should align with the tooltip when text is truncated
   */

  align?:
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'top-start'
    | 'top-end'
    | 'bottom-start'
    | 'bottom-end'
    | 'left-end'
    | 'left-start'
    | 'right-end'
    | 'right-start';

  /**
   * **Experimental**: Will attempt to automatically align the floating
   * element to avoid collisions with the viewport and being clipped by
   * ancestor elements.
   */
  autoAlign?: boolean;
} & Omit<React.LiHTMLAttributes<HTMLElement>, 'onSelect'>;

const extractTextContent = (node: React.ReactNode): string => {
  if (node === null || node === undefined) return '';
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (typeof node === 'boolean') return String(node);

  if (Array.isArray(node)) {
    return node.map(extractTextContent).join('');
  }

  if (React.isValidElement(node)) {
    const element = node as React.ReactElement<{ children?: React.ReactNode }>;
    const children = element.props.children;
    return extractTextContent(children);
  }

  return '';
};

type HTMLElementOrAnchor = HTMLElement | HTMLAnchorElement | null;

const useEllipsisCheck = (
  label: React.ReactNode,
  detailsWrapperRef: React.RefObject<HTMLElementOrAnchor>
) => {
  const [isEllipsisApplied, setIsEllipsisApplied] = useState(false);
  const labelTextRef = useRef<HTMLSpanElement>(null);

  const checkEllipsis = useCallback(() => {
    const element = labelTextRef.current;
    if (!element) {
      setIsEllipsisApplied(false);
      return;
    }
    if (element.offsetWidth === 0) {
      setIsEllipsisApplied(false);
      return;
    }
    const checkElement = detailsWrapperRef.current || element;

    if (checkElement && checkElement.offsetWidth > 0) {
      const isTextTruncated = element.scrollWidth > checkElement.offsetWidth;
      setIsEllipsisApplied(isTextTruncated);
    } else {
      setIsEllipsisApplied(false);
    }
  }, [detailsWrapperRef]);

  useEffect(() => {
    let animationFrameId: number;
    animationFrameId = requestAnimationFrame(checkEllipsis);

    let resizeObserver: ResizeObserver | undefined;
    if (
      typeof window !== 'undefined' &&
      typeof window.ResizeObserver !== 'undefined' &&
      labelTextRef.current
    ) {
      resizeObserver = new window.ResizeObserver(() => {
        requestAnimationFrame(checkEllipsis);
      });
      resizeObserver.observe(labelTextRef.current);

      if (detailsWrapperRef.current) {
        resizeObserver.observe(detailsWrapperRef.current);
      }
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (resizeObserver) {
        if (labelTextRef.current) {
          resizeObserver.unobserve(labelTextRef.current);
        }
        if (detailsWrapperRef.current) {
          resizeObserver.unobserve(detailsWrapperRef.current);
        }
        resizeObserver.disconnect();
      }
    };
  }, [checkEllipsis, detailsWrapperRef]);

  return {
    labelTextRef,
    isEllipsisApplied,
    tooltipText: extractTextContent(label),
  };
};

const TreeNode = React.forwardRef<HTMLElement, TreeNodeProps>(
  (
    {
      active,
      children,
      className,
      depth: propDepth,
      disabled,
      id: nodeId,
      isExpanded,
      defaultIsExpanded,
      label,
      onNodeFocusEvent,
      onSelect: onNodeSelect,
      onToggle,
      onTreeSelect,
      renderIcon: Icon,
      selected: propSelected,
      value,
      href,
      align = 'bottom',
      autoAlign = false,
      ...rest
    },
    forwardedRef
  ) => {
    const depth = propDepth as number;
    const selected = propSelected as (string | number)[];

    const detailsWrapperRef = useRef<HTMLElementOrAnchor>(null);
    const { labelTextRef, isEllipsisApplied, tooltipText } = useEllipsisCheck(
      label,
      detailsWrapperRef
    );

    const enableTreeviewControllable = useFeatureFlag(
      'enable-treeview-controllable'
    );

    const { current: id } = useRef(nodeId || useId());

    const controllableExpandedState = useControllableState({
      value: isExpanded,
      onChange: (newValue: boolean) => {
        onToggle?.(undefined as unknown as MouseEvent, {
          id,
          isExpanded: newValue,
          label,
          value,
        });
      },
      defaultValue: defaultIsExpanded ?? false,
    });
    const uncontrollableExpandedState = useState(isExpanded ?? false);
    const [expanded, setExpanded] = enableTreeviewControllable
      ? controllableExpandedState
      : uncontrollableExpandedState;

    const currentNode = useRef<HTMLElement | null>(null);
    const currentNodeLabel = useRef<HTMLDivElement>(null);
    const prefix = usePrefix();

    const renderLabelText = () => {
      if (isEllipsisApplied && tooltipText) {
        return (
          <IconButton
            label={tooltipText}
            kind="ghost"
            align={align}
            autoAlign={autoAlign}
            className={`${prefix}--tree-node__label__text-button`}
            wrapperClasses={`${prefix}--popover-container`}>
            <span
              ref={labelTextRef}
              className={`${prefix}--tree-node__label__text`}>
              {label}
            </span>
          </IconButton>
        );
      }

      return (
        <span
          ref={labelTextRef}
          className={`${prefix}--tree-node__label__text`}>
          {label}
        </span>
      );
    };

    const setRefs = (element: HTMLElement | null) => {
      currentNode.current = element;
      if (typeof forwardedRef === 'function') {
        forwardedRef(element);
      } else if (forwardedRef) {
        (forwardedRef as MutableRefObject<HTMLElement | null>).current =
          element;
      }
    };

    function enhanceTreeNodes(children: React.ReactNode): React.ReactNode {
      return React.Children.map(children, (node) => {
        if (!React.isValidElement(node)) return node;

        const isTreeNode = node.type === TreeNode;

        if (isTreeNode) {
          return React.cloneElement(node, {
            active,
            depth: depth + 1,
            disabled:
              disabled || (node as ReactElement<TreeNodeProps>).props.disabled,
            onTreeSelect,
            onNodeFocusEvent,
            selected,
            tabIndex: (node as ReactElement<TreeNodeProps>).props.disabled
              ? null
              : -1,
          } as TreeNodeProps);
        }

        const newChildren = enhanceTreeNodes((node.props as any).children);
        return React.cloneElement(node as React.ReactElement<any>, {
          children: newChildren,
        });
      });
    }

    const nodesWithProps = enhanceTreeNodes(children);

    const isActive = active === id;
    const isSelected = selected.includes(id);
    const treeNodeClasses = classNames(className, `${prefix}--tree-node`, {
      [`${prefix}--tree-node--active`]: isActive,
      [`${prefix}--tree-node--disabled`]: disabled,
      [`${prefix}--tree-node--selected`]: isSelected,
      [`${prefix}--tree-node--with-icon`]: Icon,
      [`${prefix}--tree-leaf-node`]: !children,
      [`${prefix}--tree-parent-node`]: children,
    });
    const toggleClasses = classNames(
      `${prefix}--tree-parent-node__toggle-icon`,
      {
        [`${prefix}--tree-parent-node__toggle-icon--expanded`]: expanded,
      }
    );
    function handleToggleClick(event: React.MouseEvent<HTMLSpanElement>) {
      if (disabled) {
        return;
      }

      // Prevent the node from being selected
      event.stopPropagation();
      if (href) {
        event.preventDefault();
      }

      if (!enableTreeviewControllable) {
        onToggle?.(event, { id, isExpanded: !expanded, label, value });
      }
      setExpanded(!expanded);
    }
    function handleClick(event: React.MouseEvent) {
      event.stopPropagation();
      if (!disabled) {
        onTreeSelect?.(event, { id, label, value });
        onNodeSelect?.(event, { id, label, value });
        rest?.onClick?.(event as React.MouseEvent<HTMLElement>);
      }
    }
    function handleKeyDown(event) {
      function getFocusableNode(node) {
        if (node?.classList.contains(`${prefix}--tree-node`)) {
          return node;
        }
        return node?.firstChild;
      }
      if (disabled) {
        return;
      }
      if (matches(event, [keys.ArrowLeft, keys.ArrowRight, keys.Enter])) {
        event.stopPropagation();
      }
      if (match(event, keys.ArrowLeft)) {
        const findParentTreeNode = (node: Element | null): Element | null => {
          if (!node) return null;
          if (node.classList.contains(`${prefix}--tree-parent-node`)) {
            return node;
          }
          if (node.classList.contains(`${prefix}--tree-node-link-parent`)) {
            return node.firstChild as Element | null;
          }
          if (node.classList.contains(`${prefix}--tree`)) {
            return null;
          }
          return findParentTreeNode(node.parentElement);
        };
        if (children && expanded) {
          if (!enableTreeviewControllable) {
            onToggle?.(event, { id, isExpanded: false, label, value });
          }
          setExpanded(false);
        } else {
          /**
           * When focus is on a leaf node or a closed parent node, move focus to
           * its parent node (unless its depth is level 1)
           */
          const parentNode = findParentTreeNode(
            href
              ? (currentNode.current?.parentElement?.parentElement as Element)
              : (currentNode.current?.parentElement as Element)
          );
          if (parentNode instanceof HTMLElement) {
            parentNode.focus();
          }
        }
      }
      if (children && match(event, keys.ArrowRight)) {
        if (expanded) {
          /**
           * When focus is on an expanded parent node, move focus to the first
           * child node
           */
          getFocusableNode(
            href
              ? currentNode.current?.parentElement?.lastChild?.firstChild
              : currentNode.current?.lastChild?.firstChild
          ).focus();
        } else {
          if (!enableTreeviewControllable) {
            onToggle?.(event, { id, isExpanded: true, label, value });
          }
          setExpanded(true);
        }
      }
      if (matches(event, [keys.Enter, keys.Space])) {
        event.preventDefault();
        if (match(event, keys.Enter) && children) {
          // Toggle expansion state for parent nodes
          if (!enableTreeviewControllable) {
            onToggle?.(event, { id, isExpanded: !expanded, label, value });
          }
          setExpanded(!expanded);
        }
        if (href) {
          currentNode.current?.click();
        }
        handleClick(event);
      }
      rest?.onKeyDown?.(event);
    }
    function handleFocusEvent(event) {
      if (event.type === 'blur') {
        rest?.onBlur?.(event);
      }
      if (event.type === 'focus') {
        rest?.onFocus?.(event);
      }
      onNodeFocusEvent?.(event);
    }

    useEffect(() => {
      /**
       * Negative margin shifts node to align with the left side boundary of the
       * tree
       * Dynamically calculate padding to recreate tree node indentation
       * - parent nodes with icon have (depth + 1rem + depth * 0.5) left padding
       * - parent nodes have (depth + 1rem) left padding
       * - leaf nodes have (depth + 2.5rem) left padding without icons (because
       *   of expand icon + spacing)
       * - leaf nodes have (depth + 2rem + depth * 0.5) left padding with icons (because of
       *   reduced spacing between the expand icon and the node icon + label)
       */
      const calcOffset = () => {
        // parent node with icon
        if (children && Icon) {
          return depth + 1 + depth * 0.5;
        }
        // parent node without icon
        if (children) {
          return depth + 1;
        }
        // leaf node with icon
        if (Icon) {
          return depth + 2 + depth * 0.5;
        }
        // leaf node without icon
        return depth + 2.5;
      };

      if (currentNodeLabel.current) {
        currentNodeLabel.current.style.marginInlineStart = `-${calcOffset()}rem`;
        currentNodeLabel.current.style.paddingInlineStart = `${calcOffset()}rem`;
      }

      if (!enableTreeviewControllable) {
        // sync props and state
        setExpanded(isExpanded ?? false);
      }
    }, [
      children,
      depth,
      Icon,
      isExpanded,
      enableTreeviewControllable,
      setExpanded,
    ]);

    const treeNodeProps: React.LiHTMLAttributes<HTMLElement> = {
      ...rest,
      ['aria-current']: !href
        ? isActive || undefined
        : isActive
          ? 'page'
          : undefined,
      ['aria-selected']: !href
        ? disabled
          ? undefined
          : isSelected
        : undefined,
      ['aria-disabled']: disabled,
      ['aria-owns']: children ? `${id}-subtree` : undefined,
      className: treeNodeClasses,
      id,
      onBlur: handleFocusEvent,
      onClick: handleClick,
      onFocus: handleFocusEvent,
      onKeyDown: handleKeyDown,
      role: 'treeitem',
    };

    if (!children) {
      if (href) {
        return (
          <li role="none">
            <a
              {...treeNodeProps}
              ref={setRefs}
              href={!disabled ? href : undefined}>
              <div
                className={`${prefix}--tree-node__label`}
                ref={currentNodeLabel}>
                {/* @ts-ignore - TS cannot be sure `className` exists on Icon props */}
                {Icon && <Icon className={`${prefix}--tree-node__icon`} />}
                {renderLabelText()}
              </div>
            </a>
          </li>
        );
      } else {
        return (
          <li {...treeNodeProps} ref={setRefs}>
            <div
              className={`${prefix}--tree-node__label`}
              ref={currentNodeLabel}>
              {/* @ts-ignore - TS cannot be sure `className` exists on Icon props */}
              {Icon && <Icon className={`${prefix}--tree-node__icon`} />}
              {renderLabelText()}
            </div>
          </li>
        );
      }
    }
    if (href) {
      return (
        <li role="none" className={`${prefix}--tree-node-link-parent`}>
          <a
            {...treeNodeProps}
            aria-expanded={!!expanded}
            ref={setRefs}
            href={!disabled ? href : undefined}>
            <div
              className={`${prefix}--tree-node__label`}
              ref={currentNodeLabel}>
              {/* https://github.com/carbon-design-system/carbon/pull/6008#issuecomment-675738670 */}
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
              <span
                className={`${prefix}--tree-parent-node__toggle`}
                // @ts-ignore
                disabled={disabled}
                onClick={handleToggleClick}>
                <CaretDown className={toggleClasses} />
              </span>
              <span
                className={`${prefix}--tree-node__label__details`}
                ref={detailsWrapperRef}>
                {/* @ts-ignore - TS cannot be sure `className` exists on Icon props */}
                {Icon && <Icon className={`${prefix}--tree-node__icon`} />}
                {renderLabelText()}
              </span>
            </div>
          </a>
          <ul
            id={`${id}-subtree`}
            role="group"
            className={classNames(`${prefix}--tree-node__children`, {
              [`${prefix}--tree-node--hidden`]: !expanded,
            })}>
            {nodesWithProps}
          </ul>
        </li>
      );
    } else {
      return (
        <li {...treeNodeProps} aria-expanded={!!expanded} ref={setRefs}>
          <div className={`${prefix}--tree-node__label`} ref={currentNodeLabel}>
            {/* https://github.com/carbon-design-system/carbon/pull/6008#issuecomment-675738670 */}
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
            <span
              className={`${prefix}--tree-parent-node__toggle`}
              // @ts-ignore
              disabled={disabled}
              onClick={handleToggleClick}>
              <CaretDown className={toggleClasses} />
            </span>
            <span
              className={`${prefix}--tree-node__label__details`}
              ref={detailsWrapperRef}>
              {/* @ts-ignore - TS cannot be sure `className` exists on Icon props */}
              {Icon && <Icon className={`${prefix}--tree-node__icon`} />}
              {renderLabelText()}
            </span>
          </div>
          <ul
            id={`${id}-subtree`}
            role="group"
            className={classNames(`${prefix}--tree-node__children`, {
              [`${prefix}--tree-node--hidden`]: !expanded,
            })}>
            {nodesWithProps}
          </ul>
        </li>
      );
    }
  }
);

TreeNode.propTypes = {
  /**
   * **Note:** this is controlled by the parent TreeView component, do not set manually.
   * The ID of the active node in the tree
   */
  active: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Specify the children of the TreeNode
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the TreeNode
   */
  className: PropTypes.string,

  /**
   * **[Experimental]** The default expansion state of the node.
   * *This is only supported with the `enable-treeview-controllable` feature flag!*
   */
  defaultIsExpanded: PropTypes.bool,

  /**
   * **Note:** this is controlled by the parent TreeView component, do not set manually.
   * TreeNode depth to determine spacing
   */
  depth: PropTypes.number,

  /**
   * Specify if the TreeNode is disabled
   */
  disabled: PropTypes.bool,

  /**
   * Specify the TreeNode's ID. Must be unique in the DOM and is used for props.active, props.selected and aria-owns
   */
  id: PropTypes.string,

  /**
   * Specify if the TreeNode is expanded (only applicable to parent nodes)
   */
  isExpanded: PropTypes.bool,

  /**
   * Rendered label for the TreeNode
   */
  label: PropTypes.node,

  /**
   * Callback function for when the node receives or loses focus
   */
  onNodeFocusEvent: PropTypes.func,

  /**
   * Callback function for when the node is selected
   */
  onSelect: PropTypes.func,

  /**
   * Callback function for when a parent node is expanded or collapsed
   */
  onToggle: PropTypes.func,

  /**
   * Callback function for when any node in the tree is selected
   */
  onTreeSelect: PropTypes.func,

  /**
   * A component used to render an icon.
   */
  // @ts-ignore
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

  /**
   * **Note:** this is controlled by the parent TreeView component, do not set manually.
   * Array containing all selected node IDs in the tree
   */
  // @ts-ignore
  selected: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),

  /**
   * Specify the value of the TreeNode
   */
  value: PropTypes.string,

  /**
   * Optional: The URL the TreeNode is linking to
   */
  href: PropTypes.string,

  /**
   * Specify how the tooltip should align when text is truncated
   */
  align: PropTypes.oneOf([
    'top',
    'bottom',
    'left',
    'right',
    'top-start',
    'top-end',
    'bottom-start',
    'bottom-end',
    'left-end',
    'left-start',
    'right-end',
    'right-start',
  ]),

  /**
   * **Experimental**: Will attempt to automatically align the floating
   * element to avoid collisions with the viewport and being clipped by
   * ancestor elements.
   */
  autoAlign: PropTypes.bool,
};

TreeNode.displayName = 'TreeNode';
export default TreeNode;
