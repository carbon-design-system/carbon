/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { Document } from '@carbon/icons-react';
import TreeView, { TreeNode } from './';

describe('TreeView', () => {
  it('should render tree with two nodes', () => {
    render(
      <TreeView label="Tree View">
        <TreeNode label="Node 1" />
        <TreeNode label="Node 2" />
      </TreeView>
    );

    expect(screen.getByLabelText('Tree View')).toBeInTheDocument();
    expect(screen.getByText('Node 1')).toBeInTheDocument();
    expect(screen.getByText('Node 2')).toBeInTheDocument();
  });

  it('should render tree with nested node', () => {
    render(
      <TreeView label="Tree View">
        <TreeNode isExpanded={true} data-testid="Node 1" label="Node 1">
          <TreeNode data-testid="Node 2" label="Node 2" />
        </TreeNode>
      </TreeView>
    );

    const nodeParent = screen.getByTestId('Node 1');
    const nodeChild = screen.getByTestId('Node 2');

    expect(screen.getByLabelText('Tree View')).toBeInTheDocument();
    expect(nodeParent).toHaveClass('cds--tree-parent-node');
    expect(nodeChild).toHaveClass('cds--tree-leaf-node');
    expect(within(nodeParent).getByText('Node 1')).toBeInTheDocument();
    expect(within(nodeChild).getByText('Node 2')).toBeInTheDocument();
  });

  it('should render tree with expanded node', () => {
    render(
      <TreeView label="Tree View">
        <TreeNode data-testid="Node 1" label="Node 1" isExpanded={true}>
          <TreeNode data-testid="Node 2" label="Node 2" />
        </TreeNode>
      </TreeView>
    );

    const nodeParent = screen.getByTestId('Node 1');
    const nodeChild = nodeParent?.querySelector('div > span');

    expect(screen.getByLabelText('Tree View')).toBeInTheDocument();
    expect(nodeChild).toHaveClass('cds--tree-parent-node__toggle');
    expect(within(nodeParent).getByText('Node 1')).toBeInTheDocument();
    expect(within(nodeParent).getByText('Node 2')).toBeInTheDocument();
  });

  it('should render tree with disabled nodes', () => {
    render(
      <TreeView label="Tree View">
        <TreeNode label="Node 1" data-testid="Node 1" />
        <TreeNode
          data-testid="Node 2"
          label="Node 2"
          disabled={true}
          isExpanded={true}>
          <TreeNode isExpanded={true} data-testid="Node 3" label="Node 3" />
        </TreeNode>
      </TreeView>
    );

    const nodeParent = screen.getByTestId('Node 1');
    const nodeChild = screen.getByTestId('Node 2');

    expect(screen.getByLabelText('Tree View')).toBeInTheDocument();
    expect(nodeChild).toHaveClass('cds--tree-node--disabled');
    expect(within(nodeParent).getByText('Node 1')).toBeInTheDocument();
    expect(within(nodeChild).getByText('Node 2')).toBeInTheDocument();
    expect(within(nodeChild).getByText('Node 3')).toBeInTheDocument();
  });

  it('should render tree with icons', () => {
    render(
      <TreeView label="Tree View">
        <TreeNode renderIcon={Document} data-testid="Node 1" label="Node 1" />
      </TreeView>
    );

    expect(screen.getByLabelText('Tree View')).toBeInTheDocument();
    expect(screen.getByTestId('Node 1')).toHaveClass(
      'cds--tree-node--with-icon'
    );
  });

  it('should render tree with no label', () => {
    render(
      <TreeView id="Node Tree" label="Tree View" hideLabel>
        <TreeNode
          id="Node 1"
          renderIcon={Document}
          data-testid="Node 1"
          label="Node 1"
        />
      </TreeView>
    );

    expect(
      screen.queryByText('Tree View', { selector: 'label' })
    ).not.toBeInTheDocument();
  });

  it('should render tree with pre-selected node', () => {
    render(
      <TreeView label="Tree View" selected={['Node 1']}>
        <TreeNode id="Node 1" data-testid="Node 1" label="Node 1" />
      </TreeView>
    );

    expect(screen.getByLabelText('Tree View')).toBeInTheDocument();
    expect(screen.getByRole('treeitem', { name: 'Node 1' })).toHaveClass(
      'cds--tree-node--selected'
    );
  });

  it('should render tree and click on node', () => {
    const onSelectSpy = jest.fn();

    render(
      <TreeView label="Tree View">
        <TreeNode
          onSelect={onSelectSpy}
          id="Node 1"
          data-testid="Node 1"
          label="Node 1"
        />
      </TreeView>
    );

    fireEvent.click(screen.getByTestId('Node 1'));

    expect(screen.getByLabelText('Tree View')).toBeInTheDocument();
    expect(onSelectSpy).toHaveBeenCalled();
  });
});
