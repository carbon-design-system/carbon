/**
 * Copyright IBM Corp. 2023, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

const prefix = 'cds';
const blockClass = `${prefix}--guidebanner`;

import {
  Guidebanner,
  GuidebannerElement,
  GuidebannerElementButton,
  GuidebannerElementLink,
} from '../index';

const componentName = Guidebanner.displayName;

// Mock scrollLeft to prevent side-effects from the scroll hook in jsdom
beforeAll(() => {
  Object.defineProperty(HTMLElement.prototype, 'scrollLeft', {
    configurable: true,
    get() {
      return 0;
    },
    set() {},
  });

  // IntersectionObserver is not in global setup — mock defensively
  window.IntersectionObserver = jest.fn(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }));
});

const className = 'test-class';
const dataTestId = 'guidebanner-test-id';

const defaultProps = {
  title: 'Guidebanner title',
  open: true,
};

const guidebannerElementDefaultProps = {
  description: 'GuidebannerElement description',
};

const renderComponent = (customProps = {}) => {
  return render(
    <Guidebanner {...defaultProps} {...customProps}>
      <GuidebannerElement
        description="GuidebannerElement description"
        button={
          <GuidebannerElementButton type="primary">
            Show Me
          </GuidebannerElementButton>
        }
      />
    </Guidebanner>
  );
};

describe(componentName, () => {
  it('renders a component Guidebanner', () => {
    const { container } = renderComponent();
    const guidebanner = container.getElementsByClassName(blockClass);
    expect(guidebanner.length).toBe(1);
  });

  it('renders children', () => {
    renderComponent();
    screen.getByText(guidebannerElementDefaultProps.description);
  });

  it('applies className to the containing node', () => {
    const { container } = renderComponent({ className });
    const guidebanner = container.getElementsByClassName(blockClass)[0];
    expect(guidebanner).toHaveClass(className);
  });

  it('adds additional props to the containing node', () => {
    renderComponent({ 'data-testid': dataTestId });
    screen.getByTestId(dataTestId);
  });

  it('forwards a ref to an appropriate node', async () => {
    const ref = React.createRef();
    renderComponent({ ref });
    await waitFor(() => expect(ref.current).toHaveClass(blockClass), {
      timeout: 10,
    });
    expect(ref.current).toHaveClass(blockClass);
  });

  it('adds the Devtools attribute to the containing node', () => {
    renderComponent({ 'data-testid': dataTestId });
    expect(screen.getByTestId(dataTestId)).toHaveAttribute(
      'data-component-name',
      componentName
    );
  });

  it('renders the icon in the CTA button', () => {
    renderComponent();
    const button = screen.getByRole('button', { name: /show me/i });
    expect(button).toBeInTheDocument();
    const svgIcon = button.querySelector('svg');
    expect(svgIcon).toBeInTheDocument();
    expect(svgIcon).toHaveAttribute('width', '16');
    expect(svgIcon).toHaveAttribute('height', '16');
  });

  it('renders default ghost button variant if type is not passed for GuidebannerElementButton', () => {
    render(
      <Guidebanner title="test title">
        <GuidebannerElement
          title="test title"
          description="test description"
          button={<GuidebannerElementButton>Show Me</GuidebannerElementButton>}
        />
      </Guidebanner>
    );
    const button = screen.getByRole('button', { name: /show me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(`${blockClass}__element-button`);
    expect(button).toHaveClass(`${prefix}--btn--ghost`);
  });

  it('returns link for GuidebannerElementLink', () => {
    render(
      <Guidebanner title="test title">
        <GuidebannerElement
          title="test title"
          description="test description"
          button={<GuidebannerElementLink>Learn more</GuidebannerElementLink>}
        />
      </Guidebanner>
    );
    const link = screen.getByRole('link', { name: /learn more/i });
    expect(link).toBeInTheDocument();
  });

  it('expands/collapses the guidebanner', () => {
    renderComponent({ collapsible: true });

    const toggleButton = screen.getByRole('button', { name: /read less/i });
    expect(toggleButton).toHaveClass(`${blockClass}__toggle-button`);

    // starts expanded (open: true is in defaultProps)
    expect(toggleButton).toHaveAttribute('aria-expanded', 'true');

    // Collapses on click
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveTextContent('Read more');
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');

    // Expands back on second click
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveTextContent('Read less');
    expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
  });

  it('renders the close button and triggers the onClose callback when provided', () => {
    const onCloseMock = jest.fn();
    renderComponent({ onClose: onCloseMock });

    const closeButton = screen.getByRole('button', { name: /close/i });
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
