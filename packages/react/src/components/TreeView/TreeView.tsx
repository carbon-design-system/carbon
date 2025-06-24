/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, {
  useEffect,
  useRef,
  useState,
  type JSX,
  type SyntheticEvent,
} from 'react';
import { keys, match, matches } from '../../internal/keyboard';
import { useControllableState } from '../../internal/useControllableState';
import { usePrefix } from '../../internal/usePrefix';
import { useId } from '../../internal/useId';
import { useFeatureFlag } from '../FeatureFlags';
import TreeNode, { TreeNodeProps } from './TreeNode';

export type TreeViewProps = {
  /**
   * Mark the active node in the tree, represented by its ID
   */
  active?: string | number;
  /**
   * Specify the children of the TreeView
   */
  children?: React.ReactNode;
  /**
   * Specify an optional className to be applied to the TreeView
   */
  className?: string;
  /**
   * Specify whether or not the label should be hidden
   */
  hideLabel?: boolean;
  /**
   * Provide the label text that will be read by a screen reader
   */
  label: string;
  /**
   * **[Experimental]** Specify the selection mode of the tree.
   * If `multiselect` is `false` then only one node can be selected at a time
   */
  multiselect?: boolean;
  /**
   * **[Experimental]** Callback function that is called when any node is activated.
   * *This is only supported with the `enable-treeview-controllable` feature flag!*
   */
  onActivate?: (activated?: string | number) => void;
  /**
   * Callback function that is called when any node is selected
   */
  onSelect?: (
    event: React.SyntheticEvent<HTMLUListElement>,
    payload?: Partial<TreeNodeProps> & {
      activeNodeId?: string | number;
    }
  ) => void;
  /**
   * Array representing all selected node IDs in the tree
   */
  selected?: Array<string | number>;
  /**
   * Specify the size of the tree from a list of available sizes.
   */
  size?: 'xs' | 'sm';
} & Omit<React.HTMLAttributes<HTMLUListElement>, 'onSelect'>;

type TreeViewComponent = {
  (props: TreeViewProps): JSX.Element;
  propTypes?: any;
  TreeNode: typeof TreeNode;
};

const TreeView: TreeViewComponent = ({
  active: prespecifiedActive,
  children,
  className,
  hideLabel = false,
  label,
  multiselect = false,
  onActivate,
  onSelect,
  selected: preselected,
  size = 'sm',
  ...rest
}: TreeViewProps) => {
  const enableTreeviewControllable = useFeatureFlag(
    'enable-treeview-controllable'
  );

  const { current: treeId } = useRef(rest.id || useId());
  const prefix = usePrefix();
  const treeClasses = classNames(className, `${prefix}--tree`, {
    // @ts-ignore - will always be false according to prop types
    [`${prefix}--tree--${size}`]: size !== 'default',
  });
  const treeRootRef = useRef<HTMLUListElement>(null);
  const treeWalker = useRef<TreeWalker>(
    treeRootRef?.current as unknown as TreeWalker
  );

  const controllableSelectionState = useControllableState({
    value: preselected,
    onChange: (newSelected) => {
      onSelect?.(undefined as unknown as SyntheticEvent<HTMLUListElement>, {
        activeNodeId: newSelected[0],
      });
    },
    defaultValue: [],
  });
  const uncontrollableSelectionState = useState(preselected ?? []);
  const [selected, setSelected] = enableTreeviewControllable
    ? controllableSelectionState
    : uncontrollableSelectionState;

  const controllableActiveState = useControllableState({
    value: prespecifiedActive,
    onChange: onActivate,
    defaultValue: undefined,
  });
  const uncontrollableActiveState = useState(prespecifiedActive);
  const [active, setActive] = enableTreeviewControllable
    ? controllableActiveState
    : uncontrollableActiveState;

  function resetNodeTabIndices() {
    Array.prototype.forEach.call(
      treeRootRef?.current?.querySelectorAll('[tabIndex="0"]') ?? [],
      (item) => {
        item.tabIndex = -1;
      }
    );
  }

  function handleTreeSelect(event, node = {}) {
    const nodeId = (node as any).id;
    if (multiselect && (event.metaKey || event.ctrlKey)) {
      if (!selected.includes(nodeId)) {
        setSelected(selected.concat(nodeId));
      } else {
        setSelected(selected.filter((selectedId) => selectedId !== nodeId));
      }

      if (!enableTreeviewControllable) {
        onSelect?.(event, node);
      }
    } else {
      setSelected([nodeId]);
      setActive(nodeId);

      if (!enableTreeviewControllable) {
        onSelect?.(event, { activeNodeId: nodeId, ...node });
      }
    }
  }

  function handleFocusEvent(event) {
    if (event.type === 'blur') {
      const { relatedTarget: currentFocusedNode, target: prevFocusedNode } =
        event;

      if (treeRootRef?.current?.contains(currentFocusedNode)) {
        prevFocusedNode.tabIndex = -1;
      }
    }
    if (event.type === 'focus') {
      resetNodeTabIndices();
      const { relatedTarget: prevFocusedNode, target: currentFocusedNode } =
        event;

      if (treeRootRef?.current?.contains(prevFocusedNode)) {
        prevFocusedNode.tabIndex = -1;
      }
      currentFocusedNode.tabIndex = 0;
    }
  }

  let focusTarget = false;
  function enhanceTreeNodes(children: React.ReactNode): React.ReactNode {
    return React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) return child;

      const isTreeNode = child.type === TreeNode;

      if (isTreeNode) {
        const node = child as React.ReactElement<TreeNodeProps>;

        const sharedNodeProps: Partial<TreeNodeProps> = {
          active,
          depth: 0,
          onNodeFocusEvent: handleFocusEvent,
          onTreeSelect: handleTreeSelect,
          selected,
          tabIndex: node.props.disabled ? undefined : -1,
        };

        if (!focusTarget && !node.props.disabled) {
          sharedNodeProps.tabIndex = 0;
          focusTarget = true;
        }

        return React.cloneElement(child, sharedNodeProps);
      }

      const newChildren = enhanceTreeNodes((child.props as any).children);
      return React.cloneElement(child as React.ReactElement<any>, {
        children: newChildren,
      });
    });
  }

  const nodesWithProps = enhanceTreeNodes(children);

  function handleKeyDown(event) {
    event.stopPropagation();
    if (matches(event, [keys.ArrowUp, keys.ArrowDown, keys.Home, keys.End])) {
      event.preventDefault();
    }

    if (!treeWalker.current) {
      return;
    }

    treeWalker.current.currentNode = event.target;
    let nextFocusNode: Node | null = null;

    if (match(event, keys.ArrowUp)) {
      nextFocusNode = treeWalker.current.previousNode();
    }
    if (match(event, keys.ArrowDown)) {
      nextFocusNode = treeWalker.current.nextNode();
    }
    // @ts-ignore - `matches` doesn't like the object syntax without missing properties
    if (matches(event, [keys.Home, keys.End, { code: 'KeyA' }])) {
      const nodeIds: string[] = [];

      if (matches(event, [keys.Home, keys.End])) {
        if (
          multiselect &&
          event.shiftKey &&
          event.ctrlKey &&
          treeWalker.current.currentNode instanceof Element &&
          !treeWalker.current.currentNode.getAttribute('aria-disabled') &&
          !treeWalker.current.currentNode.classList.contains(
            `${prefix}--tree-node--hidden`
          )
        ) {
          nodeIds.push(treeWalker.current.currentNode?.id);
        }
        while (
          match(event, keys.Home)
            ? treeWalker.current.previousNode()
            : treeWalker.current.nextNode()
        ) {
          nextFocusNode = treeWalker.current.currentNode;
          if (
            multiselect &&
            event.shiftKey &&
            event.ctrlKey &&
            nextFocusNode instanceof Element &&
            !nextFocusNode.getAttribute('aria-disabled') &&
            !nextFocusNode.classList.contains(`${prefix}--tree-node--hidden`)
          ) {
            nodeIds.push(nextFocusNode?.id);
          }
        }
      }
      // @ts-ignore - `matches` doesn't like the object syntax without missing properties
      if (match(event, { code: 'KeyA' }) && event.ctrlKey) {
        treeWalker.current.currentNode = treeWalker.current.root;

        while (treeWalker.current.nextNode()) {
          if (
            treeWalker.current.currentNode instanceof Element &&
            !treeWalker.current.currentNode.getAttribute('aria-disabled') &&
            !treeWalker.current.currentNode.classList.contains(
              `${prefix}--tree-node--hidden`
            )
          ) {
            nodeIds.push(treeWalker.current.currentNode?.id);
          }
        }
      }
      setSelected(selected.concat(nodeIds));
    }
    if (nextFocusNode && nextFocusNode !== event.target) {
      resetNodeTabIndices();
      if (nextFocusNode instanceof HTMLElement) {
        nextFocusNode.tabIndex = 0;
        nextFocusNode.focus();
      }
    }
    rest?.onKeyDown?.(event);
  }

  useEffect(() => {
    treeWalker.current =
      treeWalker.current ??
      document.createTreeWalker(
        treeRootRef?.current as unknown as Node,
        NodeFilter.SHOW_ELEMENT,
        {
          acceptNode: function (node) {
            if (!(node instanceof Element)) {
              return NodeFilter.FILTER_SKIP;
            }
            if (
              node.classList.contains(`${prefix}--tree-node--disabled`) ||
              node.classList.contains(`${prefix}--tree-node--hidden`)
            ) {
              return NodeFilter.FILTER_REJECT;
            }
            if (node.matches(`.${prefix}--tree-node`)) {
              return NodeFilter.FILTER_ACCEPT;
            }
            return NodeFilter.FILTER_SKIP;
          },
        }
      );
  }, [prefix]);

  const useActiveAndSelectedOnMount = () =>
    useEffect(() => {
      if (!enableTreeviewControllable) {
        if (preselected?.length) {
          setSelected(preselected);
        }
        if (prespecifiedActive) {
          setActive(prespecifiedActive);
        }
      }
    }, []);

  useActiveAndSelectedOnMount();

  const labelId = `${treeId}__label`;
  const TreeLabel = () =>
    !hideLabel ? (
      <label id={labelId} className={`${prefix}--label`}>
        {label}
      </label>
    ) : null;

  return (
    <>
      <TreeLabel />
      <ul
        {...rest}
        aria-label={hideLabel ? label : undefined}
        aria-labelledby={!hideLabel ? labelId : undefined}
        aria-multiselectable={multiselect || undefined}
        className={treeClasses}
        onKeyDown={handleKeyDown}
        ref={treeRootRef as unknown as React.RefObject<HTMLUListElement | null>}
        role="tree">
        {nodesWithProps}
      </ul>
    </>
  );
};

TreeView.propTypes = {
  /**
   * Mark the active node in the tree, represented by its ID
   */
  active: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Specify the children of the TreeView
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the TreeView
   */
  className: PropTypes.string,

  /**
   * Specify whether or not the label should be hidden
   */
  hideLabel: PropTypes.bool,

  /**
   * Provide the label text that will be read by a screen reader
   */
  label: PropTypes.string.isRequired,

  /**
   * **[Experimental]** Specify the selection mode of the tree.
   * If `multiselect` is `false` then only one node can be selected at a time
   */
  multiselect: PropTypes.bool,

  /**
   * **[Experimental]** Callback function that is called when any node is activated.
   * *This is only supported with the `enable-treeview-controllable` feature flag!*
   */
  onActivate: PropTypes.func,

  /**
   * Callback function that is called when any node is selected
   */
  onSelect: PropTypes.func,

  /**
   * Array representing all selected node IDs in the tree
   */
  selected: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),

  /**
   * Specify the size of the tree from a list of available sizes.
   */
  size: PropTypes.oneOf(['xs', 'sm']),
};

TreeView.TreeNode = TreeNode;
export default TreeView;
