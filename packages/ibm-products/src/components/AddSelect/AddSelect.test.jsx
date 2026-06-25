//
// Copyright IBM Corp. 2022, 2023
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

import { render, screen } from '@testing-library/react';
import React, { act } from 'react';
import { waitForPosition } from '../../global/js/utils/wait_for_position';
import { AddSelect } from './AddSelect';
import { pkg } from '../../settings';
import userEvent from '@testing-library/user-event';

const componentName = AddSelect.displayName;
const defaultProps = {
  closeIconDescription: 'test icon description',
  description: 'test description',
  globalFiltersLabel: 'filters',
  globalSearchLabel: 'global search label',
  items: {
    entries: [
      {
        id: 'test-entry-1',
        title: 'test entry 1 title',
        value: 'test-entry-1',
      },
    ],
  },
  itemsLabel: 'test items label',
  multi: false,
  noResultsDescription: 'no results body',
  noResultsTitle: 'no results title',
  onClose: () => {},
  onCloseButtonText: 'close button text',
  onSubmit: () => {},
  onSubmitButtonText: 'submit button text',
  open: true,
  title: 'test title',
};

const initialDefaultPortalTargetBody = pkg.isFeatureEnabled(
  'default-portal-target-body',
  true
);

describe(componentName, () => {
  beforeEach(() => {
    pkg.feature['default-portal-target-body'] = false;
  });

  afterEach(() => {
    pkg.feature['default-portal-target-body'] = initialDefaultPortalTargetBody;
  });

  it('has no accessibility violations', async () => {
    render(<AddSelect {...defaultProps} />);
    const AddSelectElement = document.querySelector(
      `.${pkg.prefix}--add-select`
    );
    await expect(AddSelectElement).toBeAccessible(componentName);
    await expect(AddSelectElement).toHaveNoAxeViolations();
  });

  it('renders single without hierarchy', async () => {
    render(<AddSelect {...defaultProps} />);
    expect(screen.getByText('test entry 1 title')).toBeVisible();
  });

  it('renders single with hierarchy', async () => {
    const newProps = {
      ...defaultProps,
      items: {
        entries: [
          {
            id: 'test-entry-1',
            title: 'test entry 1 title',
            value: 'test-entry-1',
            children: {
              entries: [
                {
                  id: 'test-entry-1-1',
                  title: 'test entry 1-1 title',
                  value: 'test-entry-1-1',
                },
              ],
            },
          },
        ],
      },
      navIconDescription: 'view children',
    };
    render(<AddSelect {...newProps} />);
    expect(screen.getByText('test entry 1 title')).toBeVisible();
    expect(screen.getByText('view children')).toBeInTheDocument();
  });

  it('renders with global filters', async () => {
    const newProps = {
      ...defaultProps,
      noSelectionTitle: 'no selection title',
      multi: true,
      columnInputPlaceholder: 'find',
      navIconDescription: 'view children',
      globalFilters: [
        {
          id: 'fileType',
          label: 'File type',
        },
      ],
      globalFiltersIconDescription: 'filter icon description',
      globalFiltersPlaceholderText: 'Choose an option',
      globalFiltersPrimaryButtonText: 'Apply',
      globalFiltersSecondaryButtonText: 'Reset',
      items: {
        entries: [
          {
            id: 'test-entry-1',
            title: 'test entry 1 title',
            value: 'test-entry-1',
            fileType: 'test',
            children: {
              entries: [
                {
                  id: 'test-entry-1-1',
                  title: 'test entry 1-1 title',
                  value: 'test-entry-1-1',
                  fileType: 'test',
                },
              ],
            },
          },
        ],
      },
    };
    render(<AddSelect {...newProps} />);
    expect(
      screen.getByLabelText('filter icon description')
    ).toBeInTheDocument();
  });

  it('renders with modifiers', async () => {
    const newProps = {
      ...defaultProps,
      noSelectionTitle: 'no selection title',
      multi: true,
      items: {
        modifiers: {
          id: 'role',
          label: 'Role',
          title: 'Role',
          options: ['editor'],
        },
        entries: [
          {
            id: 'test-entry-1',
            title: 'test entry 1 title',
            value: 'test-entry-1',
            role: 'editor',
          },
        ],
      },
    };
    render(<AddSelect {...newProps} />);
    await waitForPosition();
    expect(screen.getByTitle('editor')).toBeInTheDocument();
  });

  it('renders with modifiers with multi select', async () => {
    const newProps = {
      ...defaultProps,
      noSelectionTitle: 'no selection title',
      multi: true,
      items: {
        modifiers: {
          id: 'role',
          label: 'Role',
          title: 'Role',
          options: ['editor', 'viewer', 'admin'],
          multiSelect: true,
        },
        entries: [
          {
            id: 'test-entry-1',
            title: 'test entry 1 title',
            value: 'test-entry-1',
            role: ['editor', 'admin'],
          },
        ],
      },
    };
    render(<AddSelect {...newProps} />);
    await waitForPosition();
    const combobox = screen.getByRole('combobox');
    expect(combobox).toBeInTheDocument();

    const checkbox = screen
      .getAllByRole('img')
      ?.find(
        (el) =>
          el?.getAttribute('aria-labelledby') === 'control-label-test-entry-1'
      );

    await act(() => userEvent.click(checkbox));
    expect(combobox.getAttribute('aria-disabled')).toBe(null);
    await act(() => userEvent.click(combobox));
    expect(combobox.getAttribute('aria-expanded')).toBe('true');
    await waitForPosition();
    const listbox = screen.getByRole('listbox');
    expect(listbox?.children?.length).toBe(3);
    const li_1 = listbox?.children?.[0];
    const li_2 = listbox?.children?.[1];
    const li_3 = listbox?.children?.[2];

    expect(li_1?.getAttribute('aria-label')).toBe('admin');
    expect(li_2?.getAttribute('aria-label')).toBe('editor');
    expect(li_3?.getAttribute('aria-label')).toBe('viewer');
    expect(li_1?.getAttribute('aria-selected')).toBe('true');
    expect(li_2?.getAttribute('aria-selected')).toBe('true');
    expect(li_3?.getAttribute('aria-selected')).toBe('false');
  });

  it('applies className to the containing node', async () => {
    render(<AddSelect {...defaultProps} className="test-class" />);
    const tearsheetElement = screen.getByRole('dialog');
    expect(tearsheetElement.parentElement).toHaveClass('test-class');
  });

  it('adds additional properties to the containing node', async () => {
    render(<AddSelect {...defaultProps} data-testid="test-id" />);
    screen.getByTestId('test-id');
  });

  it('forwards a ref to an appropriate node', async () => {
    const ref = React.createRef();
    render(<AddSelect {...defaultProps} ref={ref} />);
    expect(ref.current).not.toBeNull();
  });
});
