/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import ListBox from '../';

function translateWithId(id) {
  if (id === 'clear.all') {
    return 'test-clear-all';
  }

  if (id === 'clear.selection') {
    return 'test-clear-selection';
  }

  throw new Error(`Unknown message id: ${id}`);
}

describe('ListBoxSelection', () => {
  it('should render a clear button if no `selectionCount` is provided', () => {
    render(
      <ListBox.Selection
        clearSelection={jest.fn()}
        translateWithId={translateWithId}
      />
    );
    expect(screen.getByLabelText('test-clear-selection')).toBeInTheDocument();
  });

  it('should render a clear all button if `selectionCount` is provided', () => {
    render(
      <ListBox.Selection
        selectionCount={10}
        clearSelection={jest.fn()}
        translateWithId={translateWithId}
      />
    );
    expect(screen.getByLabelText('test-clear-all')).toBeInTheDocument();
  });

  it('should call `clearSelection` when the clear button is clicked', () => {
    const clearSelection = jest.fn();
    render(
      <ListBox.Selection
        clearSelection={clearSelection}
        translateWithId={translateWithId}
      />
    );
    userEvent.click(screen.getByLabelText('test-clear-selection'));
    expect(clearSelection).toHaveBeenCalled();
  });

  it('should not call `clearSelection` when the clear button is disabled', () => {
    const clearSelection = jest.fn();
    render(
      <ListBox.Selection
        disabled
        clearSelection={clearSelection}
        translateWithId={translateWithId}
      />
    );
    userEvent.click(screen.getByLabelText('test-clear-selection'));
    expect(clearSelection).not.toHaveBeenCalled();
  });

  it('should call `onClearSelection` when the clear button is clicked', () => {
    const onClearSelection = jest.fn();
    render(
      <ListBox.Selection
        clearSelection={jest.fn()}
        onClearSelection={onClearSelection}
        translateWithId={translateWithId}
      />
    );
    userEvent.click(screen.getByLabelText('test-clear-selection'));
    expect(onClearSelection).toHaveBeenCalled();
  });

  it('should not call `onClearSelection` when the clear button is disabled', () => {
    const onClearSelection = jest.fn();
    render(
      <ListBox.Selection
        disabled
        clearSelection={jest.fn()}
        onClearSelection={onClearSelection}
        translateWithId={translateWithId}
      />
    );
    userEvent.click(screen.getByLabelText('test-clear-selection'));
    expect(onClearSelection).not.toHaveBeenCalled();
  });

  it('should call `clearSelection` when the clear all button is clicked', () => {
    const clearSelection = jest.fn();
    render(
      <ListBox.Selection
        selectionCount={10}
        clearSelection={clearSelection}
        translateWithId={translateWithId}
      />
    );
    userEvent.click(screen.getByLabelText('test-clear-all'));
    expect(clearSelection).toHaveBeenCalled();
  });

  it('should not call `clearSelection` when the clear all button is disabled', () => {
    const clearSelection = jest.fn();
    render(
      <ListBox.Selection
        disabled
        selectionCount={10}
        clearSelection={clearSelection}
        translateWithId={translateWithId}
      />
    );
    userEvent.click(screen.getByLabelText('test-clear-all'));
    expect(clearSelection).not.toHaveBeenCalled();
  });

  it('should call `onClearSelection` when the clear all button is clicked', () => {
    const onClearSelection = jest.fn();
    render(
      <ListBox.Selection
        selectionCount={10}
        clearSelection={jest.fn()}
        onClearSelection={onClearSelection}
        translateWithId={translateWithId}
      />
    );
    userEvent.click(screen.getByLabelText('test-clear-all'));
    expect(onClearSelection).toHaveBeenCalled();
  });

  it('should not call `onClearSelection` when the clear all button is disabled', () => {
    const onClearSelection = jest.fn();
    render(
      <ListBox.Selection
        disabled
        selectionCount={10}
        clearSelection={jest.fn()}
        onClearSelection={onClearSelection}
        translateWithId={translateWithId}
      />
    );
    userEvent.click(screen.getByLabelText('test-clear-all'));
    expect(onClearSelection).not.toHaveBeenCalled();
  });
});
