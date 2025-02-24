/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CaretDown } from '@carbon/icons-react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, {
  ComponentType,
  FunctionComponent,
  useEffect,
  useRef,
  useState,
  MutableRefObject,
} from 'react';
import { keys, match, matches } from '../../internal/keyboard';
import { useControllableState } from '../../internal/useControllableState';
import { usePrefix } from '../../internal/usePrefix';
import uniqueId from '../../tools/uniqueId';
import { useFeatureFlag } from '../FeatureFlags';

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
   * Specify the TreeNode's ID. Must be unique in the DOM and is used for props.active and props.selected
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
  onNodeFocusEvent?: (event: React.FocusEvent<HTMLLIElement>) => void;
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
   * Optional prop to allow each node to have an associated icon.
   * Can be a React component class
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
} & Omit<React.LiHTMLAttributes<HTMLLIElement>, 'onSelect'>;

const TreeNode = React.forwardRef<HTMLLIElement, TreeNodeProps>(
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
      ...rest
    },
    forwardedRef
  ) => {
    // These are provided by the parent TreeView component
    const depth = propDepth as number;
    const selected = propSelected as (string | number)[];

    const enableTreeviewControllable = useFeatureFlag(
      'enable-treeview-controllable'
    );

    const { current: id } = useRef(nodeId || uniqueId());

    const controllableExpandedState = useControllableState({
      value: isExpanded,
      onChange: onToggle,
      defaultValue: defaultIsExpanded,
    });
    const uncontrollableExpandedState = useState(isExpanded);
    const [expanded, setExpanded] = enableTreeviewControllable
      ? controllableExpandedState
      : uncontrollableExpandedState;

    const currentNode = useRef<HTMLLIElement | null>(null);
    const currentNodeLabel = useRef<HTMLDivElement>(null);
    const prefix = usePrefix();

    const setRefs = (element: HTMLLIElement | null) => {
      currentNode.current = element;
      if (typeof forwardedRef === 'function') {
        forwardedRef(element);
      } else if (forwardedRef) {
        (forwardedRef as MutableRefObject<HTMLLIElement | null>).current =
          element;
      }
    };

    const nodesWithProps = React.Children.map(children, (node) => {
      if (React.isValidElement(node)) {
        return React.cloneElement(node, {
          active,
          depth: depth + 1,
          disabled: disabled || node.props.disabled,
          onTreeSelect,
          selected,
          tabIndex: (!node.props.disabled && -1) || null,
        } as TreeNodeProps);
      }
    });
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
        rest?.onClick?.(event as React.MouseEvent<HTMLLIElement>);
      }
    }
    function handleKeyDown(event) {
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
            currentNode.current?.parentElement || null
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
          (currentNode.current?.lastChild?.firstChild as HTMLElement).focus();
        } else {
          if (!enableTreeviewControllable) {
            onToggle?.(event, { id, isExpanded: true, label, value });
          }
          setExpanded(true);
        }
      }
      if (matches(event, [keys.Enter, keys.Space])) {
        event.preventDefault();
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
        setExpanded(isExpanded);
      }
    }, [
      children,
      depth,
      Icon,
      isExpanded,
      enableTreeviewControllable,
      setExpanded,
    ]);

    const treeNodeProps: React.LiHTMLAttributes<HTMLLIElement> = {
      ...rest,
      ['aria-current']: isActive || undefined,
      ['aria-selected']: disabled ? undefined : isSelected,
      ['aria-disabled']: disabled,
      className: treeNodeClasses,
      id,
      onBlur: handleFocusEvent,
      onClick: handleClick,
      onFocus: handleFocusEvent,
      onKeyDown: handleKeyDown,
      role: 'treeitem',
    };

    if (!children) {
      return (
        <li {...treeNodeProps} ref={setRefs}>
          <div className={`${prefix}--tree-node__label`} ref={currentNodeLabel}>
            {/* @ts-ignore - TS cannot be sure `className` exists on Icon props */}
            {Icon && <Icon className={`${prefix}--tree-node__icon`} />}
            {label}
          </div>
        </li>
      );
    }
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
          <span className={`${prefix}--tree-node__label__details`}>
            {/* @ts-ignore - TS cannot be sure `className` exists on Icon props */}
            {Icon && <Icon className={`${prefix}--tree-node__icon`} />}
            {label}
          </span>
        </div>
        <ul
          role="group"
          className={classNames(`${prefix}--tree-node__children`, {
            [`${prefix}--tree-node--hidden`]: !expanded,
          })}>
          {nodesWithProps}
        </ul>
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
   * Specify the TreeNode's ID. Must be unique in the DOM and is used for props.active and props.selected
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
   * Optional prop to allow each node to have an associated icon.
   * Can be a React component class
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
};

TreeNode.displayName = 'TreeNode';
export default TreeNode;
