/**
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { act, render, screen } from '@testing-library/react'; // https://testing-library.com/docs/react-testing-library/intro

import { pkg, carbon } from '../../settings';
import { waitForPosition } from '../../global/js/utils/wait_for_position';
import uuidv4 from '../../global/js/utils/uuidv4';
import { SearchBar } from '.';

import userEvent from '@testing-library/user-event';
const { click, type } = userEvent;

const blockClass = `${pkg.prefix}--search-bar`;
const componentName = SearchBar.displayName;
const dataTestId = uuidv4();
const mockOnSubmit = jest.fn();
const mockOnChange = jest.fn();
const value = 'carbon';

const defaultProps = {
  clearButtonLabelText: 'Clear',
  placeholderText: 'Search...',
  submitLabel: 'Search',
  labelText: 'Search label',
  onChange: mockOnChange,
  onSubmit: mockOnSubmit,
};

const scopes = [
  {
    id: '2',
    text: 'Scope 2',
  },
  {
    id: '1',
    text: 'Scope 1',
  },
  {
    id: '3',
    text: 'Scope 3',
  },
];

const scopesDefaultProps = {
  ...defaultProps,
  scopes,
  scopesTypeLabel: 'Scopes',
};

const renderComponent = (props = defaultProps) => {
  return render(<SearchBar {...props} />);
};

describe(componentName, () => {
  it('renders with default props', async () => {
    renderComponent();

    const searchBox = screen.getByRole('searchbox');
    const submitButton = screen.getByText(defaultProps.submitLabel);

    expect(searchBox).toBeInTheDocument();
    expect(searchBox.value).toBe('');
    expect(searchBox.placeholder).toBe(defaultProps.placeholderText);
    expect(submitButton).toHaveTextContent(defaultProps.submitLabel);
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it('has initial value, it enables submit button, and click clear button to clear input field', async () => {
    renderComponent({ ...defaultProps, value });

    const searchBox = screen.getByDisplayValue(value);
    const submitButton = screen.getByText(defaultProps.submitLabel);
    const clearButton = screen.getByTitle(defaultProps.clearButtonLabelText);

    expect(clearButton).toBeInTheDocument();
    expect(searchBox).toBeInTheDocument();
    expect(submitButton).toBeEnabled();

    await act(async () => {
      await click(submitButton);
    });

    expect(mockOnSubmit).toHaveBeenCalled();
    expect(mockOnSubmit).toHaveBeenCalledWith({
      value,
    });

    await act(async () => {
      await click(clearButton);
    });

    expect(searchBox.value).toBe('');
    expect(submitButton).toBeDisabled();
    expect(clearButton).toHaveClass(`${carbon.prefix}--search-close--hidden`);
  });

  it('type search text, that enables submit button, and click submit button, then clear text field', async () => {
    renderComponent({ ...defaultProps });

    const searchBox = screen.getByRole('searchbox');
    const submitButton = screen.getByText(defaultProps.submitLabel);
    const clearButton = screen.getByTitle(defaultProps.clearButtonLabelText);

    expect(submitButton).toBeDisabled();

    await act(async () => {
      await type(searchBox, value);
    });

    expect(searchBox.value).toBe(value);
    expect(submitButton).toBeEnabled();
    expect(clearButton).toBeInTheDocument();

    await act(async () => {
      await click(submitButton);
    });

    expect(mockOnSubmit).toHaveBeenCalled();

    await act(async () => {
      await click(clearButton);
    });

    expect(searchBox.value).toBe('');
    expect(submitButton).toBeDisabled();
    expect(clearButton).toHaveClass(`${carbon.prefix}--search-close--hidden`);
  });

  it('renders with scopes multi-select dropdown, open and close it', async () => {
    renderComponent({
      ...scopesDefaultProps,
    });

    const scopesListBox = screen.getByRole('combobox');
    const scopesListBoxLabel = screen.getByText(
      scopesDefaultProps.scopesTypeLabel
    );

    expect(scopesListBox).toBeInTheDocument();
    expect(scopesListBoxLabel).toBeInTheDocument();

    await act(async () => {
      await click(scopesListBox);
    });

    expect(scopesListBox).toHaveAttribute('aria-expanded', 'true');
    expect(scopesListBox).toHaveAttribute('aria-haspopup', 'listbox');

    // Get listbox after opening the dropdown
    const listEl = screen.getByRole('listbox');
    expect(listEl.children).toHaveLength(scopes.length);

    await act(async () => {
      await click(scopesListBox);
    });

    expect(scopesListBox).toHaveAttribute('aria-expanded', 'false');
    // After closing, the listbox should not be in the document or should be empty
    const closedListEl = screen.queryByRole('listbox');
    if (closedListEl) {
      expect(closedListEl.children).toHaveLength(0);
    }
  });

  it('renders with selected scopes', async () => {
    renderComponent({ ...scopesDefaultProps });
    await waitForPosition();
  });

  it.skip('select scope, type text, and calls submit with an expected object', async () => {
    renderComponent({
      ...scopesDefaultProps,
    });

    const scopesListBox = screen.getByRole('combobox');
    const searchBox = screen.getByRole('searchbox');
    const submitButton = screen.getByText(defaultProps.submitLabel);

    await act(async () => {
      await type(searchBox, value);
    });

    expect(mockOnChange).toHaveBeenCalled();
    expect(searchBox.value).toBe(value);

    await act(async () => {
      await click(scopesListBox);
    });

    const listItems = screen.getAllByRole('option');

    for (const item of listItems) {
      await act(async () => {
        await click(item);
      });

      expect(item).toHaveAttribute('aria-selected', 'true');
      expect(mockOnChange).toHaveBeenCalled();
    }

    expect(mockOnChange).toHaveBeenCalledWith(
      expect.objectContaining({
        value,
        selectedScopes: scopes,
      })
    );

    await act(async () => {
      await click(submitButton);
    });

    expect(mockOnSubmit).toHaveBeenCalled();
    expect(mockOnSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        value,
        selectedScopes: scopes,
      })
    );
  });

  it('renders with selected scopes', async () => {
    renderComponent({
      ...scopesDefaultProps,
      selectedScopes: scopes,
      value,
    });

    const submitButton = screen.getByText(defaultProps.submitLabel);

    expect(submitButton).toBeEnabled();

    await act(async () => {
      await click(submitButton);
    });

    expect(mockOnSubmit).toHaveBeenCalled();
    expect(mockOnSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        value,
        selectedScopes: scopes,
      })
    );
  });

  it.skip('check custom sorting is working', async () => {
    renderComponent({
      ...scopesDefaultProps,
      value,
      sortItems: (items) =>
        items.sort((prev, next) => parseInt(next.id) - parseInt(prev.id)),
    });

    const _scopes = scopes.sort(
      (prev, next) => parseInt(next.id) - parseInt(prev.id)
    );
    const scopesListBox = screen.getByRole('combobox');
    const submitButton = screen.getByText(defaultProps.submitLabel);

    await act(async () => {
      await click(scopesListBox);
    });

    const listItems = screen.getAllByRole('option');

    for (const item of listItems) {
      await act(async () => {
        await click(item);
      });

      expect(mockOnChange).toHaveBeenCalled();
    }

    expect(submitButton).toBeEnabled();

    await act(async () => {
      await click(submitButton);
    });

    expect(mockOnSubmit).toHaveBeenCalled();

    expect(mockOnSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        value,
        selectedScopes: _scopes,
      })
    );
  });

  it('has no accessibility violations', async () => {
    const { container } = renderComponent();

    expect(container).toBeAccessible(componentName);
    expect(container).toHaveNoAxeViolations();
  });

  it('applies className to the containing node', async () => {
    const className = 'search-bar-main';
    renderComponent({ ...defaultProps, className });

    const form = document.getElementsByClassName(className)?.[0];
    expect(form).toHaveClass(className);
  });

  it('adds additional props to the containing node', async () => {
    renderComponent({
      ...defaultProps,
      ['data-testid']: dataTestId,
    });

    screen.getByTestId(dataTestId);
  });

  it('forwards a ref to an appropriate node', async () => {
    const ref = React.createRef();

    renderComponent({ ...defaultProps, ref });

    expect(ref.current).toHaveClass(blockClass);
  });

  it('adds the Devtools attribute to the containing node', async () => {
    renderComponent({
      ...defaultProps,
      ['data-testid']: dataTestId,
    });

    expect(screen.getByTestId(dataTestId)).toHaveDevtoolsAttribute(
      componentName
    );
  });
});
