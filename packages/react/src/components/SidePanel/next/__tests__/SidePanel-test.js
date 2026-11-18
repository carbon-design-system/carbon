/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { SidePanel } from '../SidePanel';

// jsdom does not implement window.matchMedia — mock it for usePrefersReducedMotion
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

const prefix = 'cds';
const blockClass = `${prefix}--side-panel__next`;

describe(SidePanel.displayName, () => {
  const renderSidePanel = (open = true) =>
    render(
      <SidePanel open={open} aria-label="Details">
        <SidePanel.Header>
          <SidePanel.HeaderContent
            label="label"
            title="Title of the side panel"
            description="This is a description"
          />
        </SidePanel.Header>
        <SidePanel.Body>Body content</SidePanel.Body>
        <SidePanel.Footer actions={[{ label: 'Submit', kind: 'primary' }]} />
      </SidePanel>
    );

  it('renders the component', () => {
    render(<SidePanel open className="custom-class" aria-label="Details" />);
    const panel = screen.getByRole('dialog');
    expect(panel).toHaveClass(blockClass);
    expect(panel).toHaveClass('custom-class');
  });

  it('does not render when open is false', () => {
    const { container } = renderSidePanel(false);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders the header content correctly', () => {
    renderSidePanel();

    expect(screen.getByText('label')).toBeInTheDocument();
    expect(screen.getByText('Title of the side panel')).toBeInTheDocument();
    expect(screen.getByText('This is a description')).toBeInTheDocument();
  });

  it('renders body content', () => {
    renderSidePanel();
    expect(screen.getByText('Body content')).toBeInTheDocument();
  });

  it('renders footer buttons correctly', () => {
    renderSidePanel();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('applies aria-label when provided', () => {
    renderSidePanel();
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-label', 'Details');
  });
});
