//
// Copyright IBM Corp. 2022, 2022
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { AddSelectBreadcrumbs } from './AddSelectBreadcrumbs';
import { pkg, carbon } from '../../settings';

const componentName = AddSelectBreadcrumbs.name;
const defaultProps = {
  path: [
    {
      id: 'default',
      title: 'default',
    },
  ],
  onClick: () => {},
};

describe(componentName, () => {
  const { ResizeObserver } = window;

  beforeEach(() => {
    window.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));
  });

  afterEach(() => {
    jest.restoreAllMocks();
    window.ResizeObserver = ResizeObserver;
  });

  it('has no accessibility violations', async () => {
    render(<AddSelectBreadcrumbs {...defaultProps} />);
    const AddSelectElement = document.querySelector(
      `.${pkg.prefix}--add-select__breadcrumbs`
    );
    await expect(AddSelectElement).toBeAccessible(componentName);
    await expect(AddSelectElement).toHaveNoAxeViolations();
  });

  it('renders', async () => {
    render(<AddSelectBreadcrumbs {...defaultProps} />);
  });

  it('handles click', async () => {
    const onClick = jest.fn();
    const newProps = {
      ...defaultProps,
      onClick,
    };
    render(<AddSelectBreadcrumbs {...newProps} />);
    fireEvent.click(screen.queryByText('default'));
    expect(onClick).toBeCalled();
  });

  it('displays multiple breadcrumbs', async () => {
    const newProps = {
      ...defaultProps,
      path: [
        {
          id: 'default',
          title: 'default',
        },
        {
          id: 'level2',
          title: 'level 2',
        },
      ],
    };
    render(<AddSelectBreadcrumbs {...newProps} />);
    expect(screen.getByText('default')).toBeVisible();
    expect(screen.getByText('level 2')).toBeVisible();
    expect(
      document.querySelectorAll(`.${carbon.prefix}--breadcrumb-item`).length
    ).toEqual(2);
    expect(
      document.querySelectorAll(`.${carbon.prefix}--breadcrumb-item--current`)
        .length
    ).toEqual(1);
  });
});
