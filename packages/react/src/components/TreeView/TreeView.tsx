/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState, useMemo, type JSX } from 'react';
import { keys, match, matches } from '../../internal/keyboard';
import { useControllableState } from '../../internal/useControllableState';
import { usePrefix } from '../../internal/usePrefix';
import { useId } from '../../internal/useId';
import { useFeatureFlag } from '../FeatureFlags';
import TreeNode, { type TreeNodeProps } from './TreeNode';
import { TreeContext, DepthContext } from './TreeContext';

type UncontrolledOnSelect = (
  event: React.MouseEvent | React.KeyboardEvent,
  payload: Parameters<NonNullable<TreeNodeProps['onSelect']>>[1] & {
    activeNodeId?: TreeViewProps['active'];
  }
) => void;

type ControlledOnSelect = (selected: TreeViewProps['selected']) => void;

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
  onActivate?: (active: TreeViewProps['active']) => void;
  /**
   * Callback function that is called when any node is selected
   */
  onSelect?: UncontrolledOnSelect | ControlledOnSelect;
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
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

  // eslint-disable-next-line  react-hooks/rules-of-hooks -- https://github.com/carbon-design-system/carbon/issues/20452
  const { current: treeId } = useRef(rest.id || useId());
  const prefix = usePrefix();
  const treeClasses = classNames(className, `${prefix}--tree`, {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
    // @ts-ignore - will always be false according to prop types

    [`${prefix}--tree--${size}`]: size !== 'default',
  });
  const treeRootRef = useRef<HTMLUListElement>(null);
  const treeWalker = useRef<TreeWalker | null>(null);

  const controllableSelectionState = useControllableState({
    value: preselected,
    onChange: onSelect as ControlledOnSelect,
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

  // eslint-disable-next-line  react-hooks/exhaustive-deps -- https://github.com/carbon-design-system/carbon/issues/20452
  function handleTreeSelect(
    event,
    node: Parameters<NonNullable<TreeNodeProps['onTreeSelect']>>[1]
  ) {
    const nodeId = node.id;
    if (nodeId) {
      if (multiselect && (event.metaKey || event.ctrlKey)) {
        if (!selected.includes(nodeId)) {
          setSelected(selected.concat(nodeId));
        } else {
          setSelected(selected.filter((selectedId) => selectedId !== nodeId));
        }

        if (!enableTreeviewControllable) {
          (onSelect as UncontrolledOnSelect)?.(event, node);
        }
      } else {
        setSelected([nodeId]);
        setActive(nodeId);

        if (!enableTreeviewControllable) {
          (onSelect as UncontrolledOnSelect)?.(event, {
            activeNodeId: nodeId,
            ...node,
          });
        }
      }
    }
  }

  // The logic inside this function is now handled by TreeNode consuming context.
  // This function is kept to manage focus between nodes, which is a TreeView-level concern.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- https://github.com/carbon-design-system/carbon/issues/20452
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

  // Set the first non-disabled node to be tabbable
  useEffect(() => {
    const firstNode = treeRootRef.current?.querySelector(
      `.${prefix}--tree-node:not(.${prefix}--tree-node--disabled)`
    );
    if (firstNode instanceof HTMLElement) {
      firstNode.tabIndex = 0;
    }
  }, [children, prefix]);

  function handleKeyDown(event) {
    event.stopPropagation();
    if (matches(event, [keys.ArrowUp, keys.ArrowDown, keys.Home, keys.End])) {
      event.preventDefault();
    }

    if (!treeWalker.current) {
      return;
    }

    treeWalker.current.currentNode = event.target as Node;
    let nextFocusNode: Node | null = null;

    if (match(event, keys.ArrowUp)) {
      nextFocusNode = treeWalker.current.previousNode();
    }
    if (match(event, keys.ArrowDown)) {
      nextFocusNode = treeWalker.current.nextNode();
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
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
          nodeIds.push((treeWalker.current.currentNode as Element).id);
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
            nodeIds.push((nextFocusNode as Element).id);
          }
        }
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
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
            nodeIds.push((treeWalker.current.currentNode as Element).id);
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
    if (treeRootRef.current && !treeWalker.current) {
      treeWalker.current = document.createTreeWalker(
        treeRootRef.current,
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
    }
  }, [prefix]);

  const labelId = `${treeId}__label`;
  const TreeLabel = () =>
    !hideLabel ? (
      <label id={labelId} className={`${prefix}--label`}>
        {label}
      </label>
    ) : null;

  const treeContextValue = useMemo(
    () => ({
      active,
      multiselect,
      onActivate: setActive,
      onTreeSelect: handleTreeSelect,
      selected,
      size,
    }),
    [active, multiselect, setActive, handleTreeSelect, selected, size]
  );

  return (
    <>
      <TreeLabel />
      <TreeContext.Provider value={treeContextValue}>
        <DepthContext.Provider value={0}>
          <ul
            {...rest}
            aria-label={hideLabel ? label : undefined}
            aria-labelledby={!hideLabel ? labelId : undefined}
            aria-multiselectable={multiselect || undefined}
            className={treeClasses}
            onKeyDown={handleKeyDown}
            ref={treeRootRef}
            role="tree">
            {children}
          </ul>
        </DepthContext.Provider>
      </TreeContext.Provider>
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
