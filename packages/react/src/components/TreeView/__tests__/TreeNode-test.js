/**
 * Copyright IBM Corp. 2024, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TreeNode from '../TreeNode';
import TreeView from '../TreeView';
import { keys } from '../../../internal/keyboard';
import { ArrowDown } from '@carbon/icons-react';
const prefix = 'cds';

describe('TreeNode Component', () => {
  it('should handle forwarded refs correctly when forwardRef is a function', () => {
    const mockRef = jest.fn();
    const { container } = render(
      <TreeNode
        id="node1"
        label="Node 1"
        selected={[]} // Ensure `selected` is always defined as an empty array
        onSelect={() => {}}
        ref={mockRef}
      />
    );

    const treeNodeElement = container.querySelector('li');
    expect(treeNodeElement).toBeInTheDocument();
    expect(mockRef).toHaveBeenCalledWith(treeNodeElement); // Verify if ref is called
  });

  it('should correctly set the ref when forwardedRef is a mutable ref object', () => {
    const mockRef = { current: null };

    const { container } = render(
      <TreeNode
        id="node1"
        label="Node 1"
        selected={[]}
        onSelect={() => {}}
        ref={mockRef}
      />
    );

    expect(mockRef.current).not.toBeNull();
    expect(mockRef.current?.tagName).toBe('LI');
    expect(container.querySelector('li')).not.toBeNull();
    expect(container.querySelector('li')?.textContent).toBe('Node 1');
  });

  it('should pass the correct props to child TreeNodes', () => {
    const { getByText } = render(
      <TreeNode
        id="parent"
        label="Parent Node"
        depth={1}
        active="child1"
        disabled={false}
        selected={['child1']}
        onTreeSelect={() => {}}>
        <TreeNode id="child1" label="Child Node 1" disabled={false} />
        <TreeNode id="child2" label="Child Node 2" disabled={true} />
      </TreeNode>
    );

    const child1 = getByText('Child Node 1').closest('li');
    const child2 = getByText('Child Node 2').closest('li');

    expect(child1).toHaveAttribute('id', 'child1');
    expect(child1).toHaveAttribute('aria-selected', 'true');
    expect(child1).toHaveAttribute('tabindex', '-1');

    expect(child2).toHaveAttribute('id', 'child2');
    expect(child2).toHaveAttribute('aria-disabled', 'true');
    expect(child2).not.toHaveAttribute('tabindex');
  });

  it('calculates the correct offset for parent node with icon', () => {
    const depth = 1;
    const { container, getByText } = render(
      <TreeNode
        id="parent"
        label="Parent Node"
        depth={depth}
        active="child1"
        disabled={false}
        selected={[]}
        onTreeSelect={() => {}}
        renderIcon={ArrowDown}>
        <TreeNode id="child1" label="Child Node 1" disabled={false} />
        <TreeNode id="child2" label="Child Node 2" disabled={true} />
      </TreeNode>
    );
    const treeNode = getByText('Parent Node');
    expect(treeNode).toBeInTheDocument();

    const offset = depth + 1 + depth * 0.5;
    const nodeLabel = container.querySelector(`.${prefix}--tree-node__label`);
    expect(nodeLabel).toHaveStyle({
      marginInlineStart: `-${offset}rem`,
      paddingInlineStart: `${offset}rem`,
    });
  });

  it('calculates the correct offset for leaf node with icon', () => {
    const depth = 1;
    const { container, getByText } = render(
      <TreeNode
        id="parent"
        label="Parent Node"
        depth={depth}
        active="child1"
        disabled={false}
        selected={[]}
        onTreeSelect={() => {}}
        renderIcon={ArrowDown}
      />
    );
    const treeNode = getByText('Parent Node');
    expect(treeNode).toBeInTheDocument();

    const offset = depth + 2 + depth * 0.5;

    const treeNodeLabel = container.querySelector(
      `.${prefix}--tree-node__label`
    );
    expect(treeNodeLabel).toHaveStyle({
      marginInlineStart: `-${offset}rem`,
      paddingInlineStart: `${offset}rem`,
    });
  });
});

describe('TreeNode - handleToggleClick', () => {
  it('should stop event propagation and toggle expanded state', () => {
    const onToggle = jest.fn();

    render(
      <TreeNode
        id="node-1"
        label="Test Node"
        expanded="false"
        onToggle={onToggle}
        selected={[]}
        onTreeSelect={() => {}}
        data-testid="toggle-node">
        <TreeNode id="child-1" label="Child Node" />
      </TreeNode>
    );

    const toggleButton = screen
      .getByTestId('toggle-node')
      .querySelector('span');
    expect(toggleButton).toBeInTheDocument();
    fireEvent.click(toggleButton);
    expect(onToggle).toHaveBeenCalled();
  });

  it('should do nothing if the node is disabled', () => {
    const onToggle = jest.fn();

    render(
      <TreeNode
        id="node-1"
        label="Test Node"
        expanded="false"
        onToggle={onToggle}
        selected={[]}
        onTreeSelect={() => {}}
        data-testid="toggle-node"
        disabled>
        <TreeNode id="child-1" label="Child Node" />
      </TreeNode>
    );

    const toggleButton = screen
      .getByTestId('toggle-node')
      .querySelector('span');
    expect(toggleButton).toBeInTheDocument();

    fireEvent.click(toggleButton);
    expect(onToggle).not.toHaveBeenCalled();
  });
});

describe('TreeNode - handleClick', () => {
  it('should call onTreeSelect, onNodeSelect, and rest.onClick when the node is not disabled', () => {
    const onTreeSelect = jest.fn();
    const onNodeSelect = jest.fn();
    const onClick = jest.fn();

    render(
      <TreeNode
        id="node-1"
        label="Test Node"
        expanded="false"
        disabled={false}
        onTreeSelect={onTreeSelect}
        onSelect={onNodeSelect}
        onClick={onClick}
        selected={[]}
        data-testid="clickable-node"
      />
    );

    const clickableNode = screen.getByTestId('clickable-node');
    fireEvent.click(clickableNode);
    expect(onTreeSelect).toHaveBeenCalledWith(expect.any(Object), {
      id: 'node-1',
      label: 'Test Node',
      value: undefined, // If the `value` prop is passed, adjust accordingly
    });
    expect(onNodeSelect).toHaveBeenCalledWith(expect.any(Object), {
      id: 'node-1',
      label: 'Test Node',
      value: undefined,
    });
    expect(onClick).toHaveBeenCalled(); // Ensure the rest.onClick handler was triggered
  });

  it('should support specifying the href', () => {
    render(
      <TreeNode
        id="node-1"
        label="Test Node"
        disabled={false}
        href="/test"
        selected={[]}
        data-testid="linked-node"
      />
    );
    expect(screen.getByTestId('linked-node')).toHaveAttribute('href', '/test');
  });
});

it('should support specifying the href for parent nodes', () => {
  const onToggle = jest.fn();

  const { getByText } = render(
    <TreeNode
      id="parent-node"
      label="Parent Node"
      href="/test"
      selected={[]}
      data-testid="parent-linked-node">
      <TreeNode id="child1" label="Child Node 1" disabled={false} />
    </TreeNode>
  );
  expect(screen.getByTestId('parent-linked-node')).toHaveAttribute(
    'href',
    '/test'
  );
});

describe('TreeNode - handleKeyDown', () => {
  const onToggle = jest.fn();
  const onClick = jest.fn();

  it('should do nothing if the node is disabled', () => {
    render(
      <TreeNode
        id="node-1"
        label="Test Node"
        expanded="false"
        disabled={true} // Node is disabled
        onToggle={onToggle}
        onClick={onClick}
        selected={[]}
        data-testid="key-node">
        <TreeNode id="child-1" label="Child Node" />{' '}
      </TreeNode>
    );

    const keyNode = screen.getByTestId('key-node');
    fireEvent.keyDown(keyNode, { key: keys.ArrowLeft });
    expect(onToggle).not.toHaveBeenCalled();
    expect(onClick).not.toHaveBeenCalled();
  });

  it('should find the Parent Element when ArrowLeft is clicked ', () => {
    render(
      <TreeNode
        id="node-1"
        label="Tree Node"
        selected={[]}
        onToggle={onToggle}
        data-testid="key-node"
        children>
        <TreeNode id="child-1" label="Child Node" depth={1} />
      </TreeNode>
    );

    const treeNode = screen.getByText('Tree Node').closest('li');
    const childNode = screen.getByText('Child Node').closest('li');

    expect(treeNode).toBeInTheDocument();
    expect(childNode).toBeInTheDocument();

    fireEvent.keyDown(treeNode, { key: 'ArrowLeft' });

    const parentNode = treeNode?.parentElement;
    expect(parentNode instanceof HTMLElement).toBe(true);
  });

  it('should collapse the node when ArrowLeft is pressed on an expanded node', () => {
    const onToggle = jest.fn();
    const { getByText } = render(
      <TreeNode
        id="parent-node"
        label="Parent Node"
        depth={1}
        selected={[]}
        isExpanded={true}
        onToggle={onToggle}
        value={'test'}>
        <TreeNode id="child1" label="Child Node 1" disabled={false} />
        <TreeNode id="child2" label="Child Node 2" disabled={true} />
      </TreeNode>
    );

    const treeNode = getByText('Parent Node');
    fireEvent.keyDown(treeNode, { key: 'ArrowLeft' });

    // Should collapse the node when expanded
    expect(onToggle).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        id: 'parent-node',
        isExpanded: false,
        label: 'Parent Node',
        value: 'test',
      })
    );
  });

  it('should expand the node when ArrowRight is pressed on a collapsed node', () => {
    const onToggle = jest.fn();

    const { getByText } = render(
      <TreeNode
        id="parent-node"
        label="Parent Node"
        selected={[]}
        isExpanded={false}
        onToggle={onToggle}
        value={'test'}>
        <TreeNode id="child1" label="Child Node 1" disabled={false} />
        <TreeNode id="child2" label="Child Node 2" disabled={true} />
      </TreeNode>
    );

    const treeNode = getByText('Parent Node');
    fireEvent.keyDown(treeNode, { key: 'ArrowRight' });

    // Should expand the node when collapsed
    expect(onToggle).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        id: 'parent-node',
        isExpanded: true,
        label: 'Parent Node',
        value: 'test',
      })
    );
  });

  it('should move focus to first child when ArrowRight is pressed on an expanded node', () => {
    const { getByText } = render(
      <TreeNode
        id="parent-node"
        label="Parent Node"
        selected={[]}
        isExpanded={true}
        onToggle={onToggle}
        value={'test'}>
        <TreeNode id="child1" label="Child Node 1" disabled={false} />
        <TreeNode id="child2" label="Child Node 2" disabled={true} />
      </TreeNode>
    );

    const treeNode = getByText('Parent Node');
    const firstChildNode = getByText('Child Node 1').closest('li');

    fireEvent.keyDown(treeNode, { key: 'ArrowRight' });

    // Focus should move to the first child node
    expect(firstChildNode).toHaveFocus();
  });

  it('should trigger click handler when Enter or Space is pressed', () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <TreeNode
        id="parent-node"
        label="Parent Node"
        selected={[]}
        onClick={handleClick}
      />
    );

    const treeNode = getByText('Parent Node');

    fireEvent.keyDown(treeNode, { key: 'Enter' });
    expect(handleClick).toHaveBeenCalled();

    fireEvent.keyDown(treeNode, { key: 'Space' });
    expect(handleClick).toHaveBeenCalled();
  });
});

describe('TreeNode - handleFocusEvent', () => {
  let onFocusMock, onBlurMock, onNodeFocusEventMock;

  beforeEach(() => {
    // Mock the event handlers
    onFocusMock = jest.fn();
    onBlurMock = jest.fn();
    onNodeFocusEventMock = jest.fn();
  });

  const renderTreeNode = (props = {}) => {
    return render(
      <TreeNode
        id="tree-node"
        label="Tree Node"
        selected={[]}
        {...props}
        onFocus={onFocusMock}
        onBlur={onBlurMock}
        onNodeFocusEvent={onNodeFocusEventMock}
      />
    );
  };

  it('should call onFocus when event type is "focus"', () => {
    const { getByRole } = renderTreeNode();

    const node = getByRole('treeitem');
    fireEvent.focus(node);

    expect(onFocusMock).toHaveBeenCalledTimes(1);
    expect(onFocusMock).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'focus' })
    );
    expect(onNodeFocusEventMock).toHaveBeenCalledTimes(1);
    expect(onNodeFocusEventMock).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'focus' })
    );

    expect(onBlurMock).not.toHaveBeenCalled();
  });

  it('should call onBlur when event type is "blur"', () => {
    const { getByRole } = renderTreeNode();

    const node = getByRole('treeitem');
    fireEvent.blur(node);

    expect(onBlurMock).toHaveBeenCalledTimes(1);
    expect(onBlurMock).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'blur' })
    );
    expect(onNodeFocusEventMock).toHaveBeenCalledTimes(1);
    expect(onNodeFocusEventMock).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'blur' })
    );

    expect(onFocusMock).not.toHaveBeenCalled();
  });
});
describe('Tooltip Text Rendering', () => {
  it('should render array labels as joined text', () => {
    render(
      <TreeNode id="test" label={['Hello', ' ', 'World']} selected={[]} />
    );
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });
  it('should render React element labels with nested content', () => {
    const complexLabel = (
      <span>
        <strong>Bold</strong> and <em>italic</em>
      </span>
    );

    render(<TreeNode id="test" label={complexLabel} selected={[]} />);

    expect(screen.getByText('Bold')).toBeInTheDocument();
    expect(screen.getByText('italic')).toBeInTheDocument();
  });
  it('should render React element labels with nested content', () => {
    const complexLabel = (
      <span>
        <strong>Bold</strong> and <em>italic</em>
      </span>
    );
    render(<TreeNode id="test" label={complexLabel} selected={[]} />);

    expect(screen.getByText('Bold')).toBeInTheDocument();
    expect(screen.getByText('italic')).toBeInTheDocument();
  });

  it('should handle edge cases in text extraction', () => {
    const { container, rerender } = render(
      <TreeNode id="test" label={null} selected={[]} />
    );
    expect(container.querySelector('li')).toBeInTheDocument();
    //with undefined
    rerender(<TreeNode id="test" label={undefined} selected={[]} />);
    expect(container.querySelector('li')).toBeInTheDocument();

    // with empty string
    rerender(<TreeNode id="test" label="" selected={[]} />);
    expect(container.querySelector('li')).toBeInTheDocument();
  });
});

describe('Tooltip Truncation', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should show button wrapper when text overflows', () => {
    Object.defineProperty(HTMLElement.prototype, 'scrollWidth', {
      configurable: true,
      get: () => 300,
    });
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      configurable: true,
      get: () => 150,
    });

    const { container } = render(
      <TreeNode id="test" label="Very long text that overflows" selected={[]} />
    );

    expect(
      container.querySelector('.cds--tree-node__label__text-button')
    ).toBeInTheDocument();
    expect(
      container.querySelector('.cds--popover-container')
    ).toBeInTheDocument();
  });
});

describe('TreeNode - Parent Node Tooltip', () => {
  it('should support tooltip on parent nodes with children', () => {
    Object.defineProperty(HTMLElement.prototype, 'scrollWidth', {
      configurable: true,
      get: () => 250,
    });
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      configurable: true,
      get: () => 150,
    });

    const { container } = render(
      <TreeNode id="parent" label="Long parent label" selected={[]}>
        <TreeNode id="child" label="Child" />
      </TreeNode>
    );

    expect(
      container.querySelector('.cds--tree-node__label__details')
    ).toBeInTheDocument();
    expect(
      container.querySelector('.cds--tree-node__label__text-button')
    ).toBeInTheDocument();
    expect(
      container.querySelector('.cds--tree-parent-node__toggle')
    ).toBeInTheDocument();
  });
});
