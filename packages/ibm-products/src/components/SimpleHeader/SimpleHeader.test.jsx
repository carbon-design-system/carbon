/**
 * Copyright IBM Corp. 2023, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { SimpleHeader } from './SimpleHeader';
import { pkg } from '../../settings';

const componentName = SimpleHeader.displayName;
const blockClass = `${pkg.prefix}--simple-header`;

describe(componentName, () => {
  const renderComponent = (args) => render(<SimpleHeader {...args} />);

  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('renders the header title without breadcrumbs', async () => {
    renderComponent({ title: 'Page title' });

    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByRole('heading')).toHaveTextContent('Page title');

    expect(
      screen.queryByRole('navigation', { name: 'Breadcrumb' })
    ).not.toBeInTheDocument();
  });

  it('renders the header breadcrumbs without title', async () => {
    renderComponent({
      breadcrumbs: [
        { key: '0', href: '/', label: 'Home page' },
        { key: '1', href: '/', label: 'Application name' },
      ],
      overflowAriaLabel: 'overflow menu',
    });

    expect(
      screen.getByRole('navigation', { name: 'Breadcrumb' })
    ).toBeInTheDocument();

    // The BreadcrumbWithOverflow renders another link in the DOM for the back button
    // which is set to display:none and therefore the expectation is to have a length of 3
    expect(screen.getAllByRole('link')).toHaveLength(3);
    expect(screen.getByRole('link', { name: 'Home page' })).toBeVisible();

    // The BreadcrumbWithOverflow renders two breadcrumb lists, one to be displayed if
    // the container fits and another one for the overflow menu when the container doesn't fit the items
    expect(
      screen.getAllByRole('link', { name: 'Application name' })
    ).toHaveLength(2);

    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  it('renders the header title and breadcrumbs', async () => {
    renderComponent({
      title: 'Page title',
      breadcrumbs: [
        { key: '0', href: '/', label: 'Home page' },
        { key: '1', href: '/', label: 'Application name' },
      ],
    });

    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByRole('heading')).toHaveTextContent('Page title');

    expect(
      screen.getByRole('navigation', { name: 'Breadcrumb' })
    ).toBeInTheDocument();

    // The BreadcrumbWithOverflow renders another link in the DOM for the back button
    // which is set to display:none and therefore the expectation is to have a length of 3
    expect(screen.getAllByRole('link')).toHaveLength(3);

    expect(screen.getByRole('link', { name: 'Home page' })).toBeInTheDocument();

    // The BreadcrumbWithOverflow renders two breadcrumb lists, one to be displayed if
    // the container fits and another one for the overflow menu when the container doesn't fit the items
    expect(
      screen.getAllByRole('link', { name: 'Application name' })
    ).toHaveLength(2);
  });

  it('adds the provided className in addition to the default one', async () => {
    const { container } = renderComponent({
      title: 'Page title',
      breadcrumbs: [
        { key: '0', href: '/', label: 'Home page' },
        { key: '1', href: '/', label: 'Application name' },
      ],
      className: 'custom-classname',
    });

    expect(container.querySelector('header')).toHaveClass(`${blockClass}`);
    expect(container.querySelector('header')).toHaveClass('custom-classname');
  });

  it('renders the overflow breadcrumb list if the provided maxVisible is less than the number of breadcrumb items', async () => {
    renderComponent({
      title: 'Page title',
      maxVisible: 1,
      breadcrumbs: [
        { key: '0', href: '/', label: 'Home page' },
        { key: '1', href: '/', label: 'Application name' },
      ],
      overflowAriaLabel: 'test overflow aria label',
    });

    expect(
      screen.getByRole('button', { name: 'test overflow aria label' })
    ).toBeInTheDocument();
  });

  it("doesn't render the overflow breadcrumb list if the provided maxVisible is higher or equal to the number of breadcrumb items", async () => {
    renderComponent({
      title: 'Page title',
      maxVisible: 2,
      breadcrumbs: [
        { key: '0', href: '/', label: 'Home page' },
        { key: '1', href: '/', label: 'Application name' },
      ],
      overflowAriaLabel: 'test overflow aria label',
    });

    expect(
      screen.queryByRole('button', { name: 'test overflow aria label' })
    ).not.toBeInTheDocument();
  });

  it('throws an error if no title or breadcrumbs is provided', async () => {
    renderComponent();

    expect(console.error).toHaveBeenCalled();
    expect(console.error.mock.calls[0][0]).toContain(
      'Warning: You have tried using a SimpleHeader component without specifying a title or breadcrumbs props'
    );
  });
});
