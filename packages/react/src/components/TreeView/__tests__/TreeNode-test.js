/**
 * Copyright IBM Corp. 2024, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TreeNode from '../TreeNode';
import { keys } from '../../../internal/keyboard';
import { ArrowDown } from '@carbon/icons-react';
import { TreeContext, DepthContext } from '../TreeContext';

/**
 * New: Test helper to render a component with the necessary context providers.
 * This is crucial for testing TreeNode in isolation now that it relies on context.
 * @param {React.ReactElement} ui The component to render.
 * @param {object} options - Configuration options.
 * @param {object} options.providerProps - Props to pass to the TreeContext.Provider.
 * @param {number} options.depth - The depth value for the DepthContext.Provider.
 * @param {object} options.renderOptions - Other options for React Testing Library's render.
 * @returns The result of the render call.
 */
const renderWithProviders = (
  ui,
  { providerProps = {}, depth = 0, ...renderOptions } = {}
) => {
  return render(
    <TreeContext.Provider value={providerProps}>
      <DepthContext.Provider value={depth}>{ui}</DepthContext.Provider>
    </TreeContext.Provider>,
    renderOptions
  );
};

describe('TreeNode Component', () => {
  // This test remains unchanged as it doesn't depend on context
  it('should handle forwarded refs correctly when forwardRef is a function', () => {
    const mockRef = jest.fn();
    renderWithProviders(<TreeNode id="node1" label="Node 1" ref={mockRef} />);
    const treeNodeElement = screen.getByRole('treeitem');
    expect(treeNodeElement).toBeInTheDocument();
    expect(mockRef).toHaveBeenCalledWith(treeNodeElement);
  });

  // This test remains unchanged as it doesn't depend on context
  it('should correctly set the ref when forwardedRef is a mutable ref object', () => {
    const mockRef = { current: null };
    renderWithProviders(<TreeNode id="node1" label="Node 1" ref={mockRef} />);
    expect(mockRef.current).not.toBeNull();
    expect(mockRef.current?.tagName).toBe('LI');
  });

  // UPDATED: This test now uses renderWithProviders to supply context
  it('should apply correct attributes based on context', () => {
    const providerProps = {
      active: 'child1',
      selected: ['child1'],
    };
    const { getByText } = renderWithProviders(
      <TreeNode id="parent" label="Parent Node">
        <TreeNode id="child1" label="Child Node 1" />
        <TreeNode id="child2" label="Child Node 2" disabled={true} />
      </TreeNode>,
      { providerProps, depth: 0 }
    );

    const child1 = getByText('Child Node 1').closest('li');
    const child2 = getByText('Child Node 2').closest('li');

    expect(child1).toHaveAttribute('id', 'child1');
    expect(child1).toHaveAttribute('aria-selected', 'true'); // Verified via context
    expect(child1).toHaveAttribute('tabindex', '-1');

    expect(child2).toHaveAttribute('id', 'child2');
    expect(child2).toHaveAttribute('aria-disabled', 'true');
    expect(child2).not.toHaveAttribute('tabindex');
  });

  // UPDATED: This test now uses renderWithProviders to supply depth
  it('calculates the correct offset for parent node with icon', () => {
    const depth = 1;
    const { getByText } = renderWithProviders(
      <TreeNode id="parent" label="Parent Node" renderIcon={ArrowDown}>
        <TreeNode id="child1" label="Child Node 1" />
      </TreeNode>,
      { depth }
    );
    const treeNode = getByText('Parent Node');
    expect(treeNode).toBeInTheDocument();

    // The component's internal calculation should use the provided depth
    const offset = depth + 1 + depth * 0.5;
    expect(treeNode.parentElement).toHaveStyle({
      marginInlineStart: `-${offset}rem`,
      paddingInlineStart: `${offset}rem`,
    });
  });

  it('calculates the correct offset for leaf node with icon', () => {
    const depth = 1;
    const { getByText } = renderWithProviders(
      <TreeNode id="parent" label="Parent Node" renderIcon={ArrowDown} />,
      { depth }
    );

    // Get the element that actually has the style applied to it.
    // getByText returns the inner span, but the style is on its parent div.
    const styledNodeContainer = getByText('Parent Node').parentElement;
    expect(styledNodeContainer).toBeInTheDocument();

    const offset = depth + 2 + depth * 0.5;

    // Assert against the correct element
    expect(styledNodeContainer).toHaveStyle({
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
  // UPDATED: This test now uses renderWithProviders to supply onTreeSelect
  it('should call onTreeSelect, onNodeSelect, and rest.onClick when not disabled', () => {
    const onTreeSelect = jest.fn();
    const onNodeSelect = jest.fn();
    const onClick = jest.fn();

    const providerProps = { onTreeSelect };

    renderWithProviders(
      <TreeNode
        id="node-1"
        label="Test Node"
        onSelect={onNodeSelect}
        onClick={onClick}
        data-testid="clickable-node"
      />,
      { providerProps }
    );

    const clickableNode = screen.getByTestId('clickable-node');
    fireEvent.click(clickableNode);

    expect(onTreeSelect).toHaveBeenCalledWith(expect.any(Object), {
      id: expect.any(String), // ID is generated, so check for type
      label: 'Test Node',
      value: undefined,
    });
    expect(onNodeSelect).toHaveBeenCalled();
    expect(onClick).toHaveBeenCalled();
  });

  // This test remains unchanged
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

// This test remains unchanged
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

// These keyboard tests remain largely unchanged
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

  it('should collapse the node when ArrowLeft is pressed on an expanded node', () => {
    const onToggle = jest.fn();
    const { getByText } = renderWithProviders(
      <TreeNode
        id="parent-node"
        label="Parent Node"
        isExpanded={true}
        onToggle={onToggle}
        value={'test'}>
        <TreeNode id="child1" label="Child Node 1" />
      </TreeNode>
    );

    const treeNode = getByText('Parent Node').closest('li');
    fireEvent.keyDown(treeNode, { key: 'ArrowLeft' });

    expect(onToggle).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ isExpanded: false })
    );
  });

  it('should expand the node when ArrowRight is pressed on a collapsed node', () => {
    const onToggle = jest.fn();
    const { getByText } = renderWithProviders(
      <TreeNode
        id="parent-node"
        label="Parent Node"
        isExpanded={false}
        onToggle={onToggle}
        value={'test'}>
        <TreeNode id="child1" label="Child Node 1" />
      </TreeNode>
    );

    const treeNode = getByText('Parent Node').closest('li');
    fireEvent.keyDown(treeNode, { key: 'ArrowRight' });

    expect(onToggle).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ isExpanded: true })
    );
  });

  it('should move focus to first child when ArrowRight is pressed on an expanded node', () => {
    const { getByText } = renderWithProviders(
      <TreeNode id="parent-node" label="Parent Node" isExpanded={true}>
        <TreeNode id="child1" label="Child Node 1" />
        <TreeNode id="child2" label="Child Node 2" />
      </TreeNode>
    );
    const treeNode = getByText('Parent Node').closest('li');
    const firstChildNode = getByText('Child Node 1').closest('li');
    fireEvent.keyDown(treeNode, { key: 'ArrowRight' });
    expect(firstChildNode).toHaveFocus();
  });
});

// UPDATED: These tests are simplified to only check for onFocus/onBlur
// as onNodeFocusEvent is no longer a prop.
describe('TreeNode - handleFocusEvent', () => {
  it('should call onFocus when event type is "focus"', () => {
    const onFocusMock = jest.fn();
    const { getByRole } = renderWithProviders(
      <TreeNode id="tree-node" label="Tree Node" onFocus={onFocusMock} />
    );

    const node = getByRole('treeitem');
    fireEvent.focus(node);

    expect(onFocusMock).toHaveBeenCalledTimes(1);
    expect(onFocusMock).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'focus' })
    );
  });

  it('should call onBlur when event type is "blur"', () => {
    const onBlurMock = jest.fn();
    const { getByRole } = renderWithProviders(
      <TreeNode id="tree-node" label="Tree Node" onBlur={onBlurMock} />
    );

    const node = getByRole('treeitem');
    fireEvent.blur(node);

    expect(onBlurMock).toHaveBeenCalledTimes(1);
    expect(onBlurMock).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'blur' })
    );
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

