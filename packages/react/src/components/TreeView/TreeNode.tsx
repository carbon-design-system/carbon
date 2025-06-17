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
  useContext,
  type ComponentType,
  type FunctionComponent,
  type MouseEvent,
  type MutableRefObject,
  type FocusEvent, // Correctly import FocusEvent
} from 'react';
import { keys, match, matches } from '../../internal/keyboard';
import { useControllableState } from '../../internal/useControllableState';
import { usePrefix } from '../../internal/usePrefix';
import { useId } from '../../internal/useId';
import { useFeatureFlag } from '../FeatureFlags';
import { TreeContext, DepthContext } from './TreeContext';

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
  onSelect?: (
    event: React.MouseEvent,
    node?: Omit<TreeNodeProps, 'children'>
  ) => void;
  /**
   * Callback function for when a parent node is expanded or collapsed
   */
  onToggle?: (
    event: React.MouseEvent | React.KeyboardEvent,
    node?: Omit<TreeNodeProps, 'children'>
  ) => void;
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
} & Omit<React.LiHTMLAttributes<HTMLElement>, 'onSelect'>;

const TreeNode = React.forwardRef<HTMLElement, TreeNodeProps>(
  (
    {
      children,
      className,
      disabled,
      id: nodeId,
      isExpanded,
      defaultIsExpanded,
      label,
      onSelect: onNodeSelect,
      onToggle,
      renderIcon: Icon,
      value,
      href,
      // These props are destructured to be ignored, as they are now supplied by context
      active: _active,
      depth: _depth,
      onTreeSelect: _onTreeSelect,
      onNodeFocusEvent: _onNodeFocusEvent,
      selected: _selected,
      ...rest
    },
    forwardedRef
  ) => {
    const treeContext = useContext(TreeContext);
    const depth = useContext(DepthContext);

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

    const setRefs = (element: HTMLElement | null) => {
      currentNode.current = element;
      if (typeof forwardedRef === 'function') {
        forwardedRef(element);
      } else if (forwardedRef) {
        (forwardedRef as MutableRefObject<HTMLElement | null>).current =
          element;
      }
    };

    const isActive = treeContext?.active === id;
    const isSelected = treeContext?.selected?.includes(id) ?? false;

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
        treeContext?.onTreeSelect?.(event, { id, label, value });
        onNodeSelect?.(event, { id, label, value, isExpanded: expanded });
        rest?.onClick?.(event as React.MouseEvent<HTMLElement>);
      }
    }

    function handleKeyDown(event: React.KeyboardEvent<HTMLElement>) {
      function getFocusableNode(node) {
        if (node?.classList.contains(`${prefix}--tree-node`)) {
          return node;
        }
        return node?.firstChild;
      }

      if (disabled) {
        return;
      }

      if (
        matches(event, [
          keys.ArrowLeft,
          keys.ArrowRight,
          keys.Enter,
          keys.Space,
        ])
      ) {
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
          getFocusableNode(
            href
              ? currentNode.current?.parentElement?.lastChild?.firstChild
              : currentNode.current?.lastChild?.firstChild
          )?.focus();
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
          if (!enableTreeviewControllable) {
            onToggle?.(event, { id, isExpanded: !expanded, label, value });
          }
          setExpanded(!expanded);
        }
        if (href) {
          currentNode.current?.click();
        }
        handleClick(event as unknown as MouseEvent);
      }
      rest?.onKeyDown?.(event);
    }

    function handleFocusEvent(event: FocusEvent<HTMLElement>) {
      if (event.type === 'focus') {
        rest?.onFocus?.(event);
      }
      if (event.type === 'blur') {
        rest?.onBlur?.(event);
      }
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

    const tabIndex = disabled ? undefined : (rest.tabIndex ?? -1);

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
      onClick: handleClick,
      onKeyDown: handleKeyDown,
      role: 'treeitem',
      tabIndex,
      // FIX: Wire the focus and blur events back to the element
      onFocus: handleFocusEvent,
      onBlur: handleFocusEvent,
    };

    const nodeContent = (
      <div className={`${prefix}--tree-node__label`} ref={currentNodeLabel}>
        {children && (
          <span
            className={`${prefix}--tree-parent-node__toggle`}
            onClick={handleToggleClick}>
            <CaretDown className={toggleClasses} />
          </span>
        )}

        <span className={`${prefix}--tree-node__label__details`}>
          {/* @ts-ignore - TS cannot be sure `className` exists on Icon props */}
          {Icon && <Icon className={`${prefix}--tree-node__icon`} />}
          {label}
        </span>
      </div>
    );

    if (href) {
      return (
        <li
          role="none"
          className={children ? `${prefix}--tree-node-link-parent` : ''}>
          <a
            {...treeNodeProps}
            aria-expanded={!!expanded}
            ref={setRefs}
            href={!disabled ? href : undefined}>
            {nodeContent}
          </a>
          {children && (
            <ul
              id={`${id}-subtree`}
              role="group"
              className={classNames(`${prefix}--tree-node__children`, {
                [`${prefix}--tree-node--hidden`]: !expanded,
              })}>
              <DepthContext.Provider value={depth + 1}>
                {children}
              </DepthContext.Provider>
            </ul>
          )}
        </li>
      );
    }

    return (
      <li
        {...treeNodeProps}
        aria-expanded={children ? !!expanded : undefined}
        ref={setRefs}>
        {nodeContent}
        {children && (
          <ul
            id={`${id}-subtree`}
            role="group"
            className={classNames(`${prefix}--tree-node__children`, {
              [`${prefix}--tree-node--hidden`]: !expanded,
            })}>
            <DepthContext.Provider value={depth + 1}>
              {children}
            </DepthContext.Provider>
          </ul>
        )}
      </li>
    );
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
};

TreeNode.displayName = 'TreeNode';
export default TreeNode;
