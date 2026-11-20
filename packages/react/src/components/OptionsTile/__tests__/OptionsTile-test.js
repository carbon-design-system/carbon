/**
 * Copyright IBM Corp. 2021, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { OptionsTile } from '../OptionsTile';

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
const blockClass = `${prefix}--options-tile`;
const componentName = OptionsTile.displayName;

const title = 'Test title';
const children = 'hello, world';
const className = 'test-class';
const dataTestId = 'options-tile-test';

// Common props used across tests
const props = {
  title,
  'data-testid': dataTestId,
  children,
};

const summaryText = 'English | Locale: English';
const lockedText = 'locked explanation';

// The summary renders right after the title heading.
const getSummary = () => screen.getByRole('heading').nextSibling;

describe(componentName, () => {
  // jsdom does not implement the Web Animations API.
  beforeAll(() => {
    HTMLDivElement.prototype.animate = jest.fn(() => ({}));
  });

  afterAll(() => {
    delete HTMLDivElement.prototype.animate;
  });

  it('renders a component OptionsTile', () => {
    render(<OptionsTile {...props} />);
    expect(screen.getByTestId(dataTestId)).toHaveClass(blockClass);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <main>
        <OptionsTile {...props} />
      </main>
    );
    expect(container).toHaveNoAxeViolations();
  });

  it('renders children', () => {
    render(<OptionsTile {...props} />);
    screen.getByText(children);
  });

  it('applies className to the containing node', () => {
    render(<OptionsTile {...props} className={className} />);
    expect(screen.getByTestId(dataTestId)).toHaveClass(className);
  });

  it('forwards a ref to an appropriate node', () => {
    const ref = React.createRef();
    render(<OptionsTile {...props} ref={ref} />);
    expect(ref.current).toHaveClass(blockClass);
  });

  it('adds the devtools attribute to the containing node', () => {
    render(<OptionsTile {...props} />);
    expect(screen.getByTestId(dataTestId)).toHaveAttribute(
      'data-component-name',
      componentName
    );
  });

  it('renders a summary if provided', () => {
    render(<OptionsTile {...props} summary={summaryText} />);
    expect(getSummary().textContent).toBe(summaryText);
  });

  it('renders a toggle if props.enabled is set', () => {
    render(<OptionsTile {...props} enabled />);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
  });

  it('renders props.actionRenderer content in place of the toggle', () => {
    const actionRenderer = jest.fn(({ titleId }) => (
      <button type="button" aria-describedby={titleId}>
        Action
      </button>
    ));
    render(
      <OptionsTile
        {...props}
        titleId="action-title"
        size="xl"
        enabled
        actionRenderer={actionRenderer}
      />
    );

    expect(actionRenderer).toHaveBeenCalledWith({
      size: 'xl',
      titleId: 'action-title',
    });
    expect(screen.getByTestId('options-tile-action')).toContainElement(
      screen.getByRole('button', { name: 'Action' })
    );
    expect(screen.queryByRole('switch')).toBeNull();
  });

  it('falls back to the toggle when props.actionRenderer returns nothing', () => {
    render(<OptionsTile {...props} enabled actionRenderer={() => null} />);

    expect(screen.getByTestId('options-tile-action')).toContainElement(
      screen.getByRole('switch')
    );
  });

  it('renders props.actionRenderer content in the static variant', () => {
    render(
      <OptionsTile
        title="Static with action"
        actionRenderer={() => <span>Static action</span>}
      />
    );

    expect(screen.getByTestId('options-tile-action')).toHaveTextContent(
      'Static action'
    );
  });

  it('does not toggle the tile when the action is clicked', () => {
    const onChange = jest.fn();
    render(
      <OptionsTile
        {...props}
        onChange={onChange}
        actionRenderer={() => <button type="button">Action</button>}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Action' }));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('renders as static variant if no children are provided', () => {
    render(<OptionsTile title="Static variant" />);
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('renders a toggle in the static variant when props.enabled is set', () => {
    render(<OptionsTile title="Static with toggle" enabled />);

    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
  });

  it('renders invalid state when passed', () => {
    const invalidText = 'invalid explanation';

    // also pass props.warn and props.locked to verify props.invalid has the highest priority
    render(
      <OptionsTile {...props} invalid invalidText={invalidText} warn locked />
    );

    const summary = getSummary();

    expect(summary.textContent).toBe(invalidText);
    expect(summary).toHaveClass(`${blockClass}__summary--invalid`);
  });

  it('renders warning state when passed', () => {
    const warnText = 'warning explanation';

    // also pass props.locked to verify props.warn has the higher priority
    render(<OptionsTile {...props} warn warnText={warnText} locked />);

    const summary = getSummary();

    expect(summary.textContent).toBe(warnText);
    expect(summary).toHaveClass(`${blockClass}__summary--warn`);
  });

  it('renders locked state when passed', () => {
    render(
      <OptionsTile
        {...props}
        summary={summaryText}
        locked
        lockedText={lockedText}
      />
    );

    const summary = getSummary();

    // In the expandable variant, summary is preserved; lockedText is shown in
    // the expanded content area.
    expect(summary.textContent).toBe(summaryText);
    expect(summary).toHaveClass(`${blockClass}__summary--locked`);
  });

  it('renders lockedText in static variant when both summary and lockedText are set', () => {
    render(
      <OptionsTile
        title="Static locked"
        summary={summaryText}
        locked
        lockedText={lockedText}
      />
    );

    const summary = getSummary();

    // In the static variant lockedText always replaces the summary
    expect(summary.textContent).toBe(lockedText);
    expect(summary).toHaveClass(`${blockClass}__summary--locked`);
  });

  it('renders lockedText when locked and no summary is set', () => {
    render(<OptionsTile {...props} locked lockedText={lockedText} />);

    const summary = getSummary();

    expect(summary.textContent).toBe(lockedText);
  });

  it('shows the summary when the tile is collapsed regardless of enabled state', () => {
    render(<OptionsTile {...props} summary={summaryText} enabled={false} />);

    const summary = getSummary();
    expect(summary.textContent).toBe(summaryText);
    // Summary should NOT be hidden when tile is collapsed, even when enabled=false
    expect(summary.getAttribute('aria-hidden')).not.toBe('true');
  });

  it('hides the summary when the tile is open (expanded)', () => {
    render(<OptionsTile {...props} summary={summaryText} />);

    // Initially collapsed – summary is visible
    const summary = getSummary();
    expect(summary.getAttribute('aria-hidden')).not.toBe('true');

    // Expand the tile
    fireEvent.click(screen.getByRole('button'));
    // Summary should now be hidden
    expect(summary.getAttribute('aria-hidden')).toBe('true');
  });

  it('can be controlled by setting props.open', async () => {
    const onChange = jest.fn();
    const { rerender } = render(
      <OptionsTile {...props} open={false} onChange={onChange} />
    );
    const button = screen.getByRole('button');

    expect(button).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(button);
    expect(onChange).toHaveBeenLastCalledWith(true);

    rerender(<OptionsTile {...props} open={true} onChange={onChange} />);
    expect(button).toHaveAttribute('aria-expanded', 'true');
    fireEvent.click(button);
    await waitFor(() => expect(onChange).toHaveBeenLastCalledWith(false));
  });

  it('supports "lg" size', () => {
    render(<OptionsTile {...props} size="lg" />);
    expect(screen.getByTestId(dataTestId)).toHaveClass(`${blockClass}--lg`);
  });

  it('uses props.titleId as the title id and as the aria-labelledby attribute of the toggle', () => {
    const titleId = 'custom-title-id';

    render(<OptionsTile {...props} titleId={titleId} enabled />);

    expect(screen.getByRole('heading').id).toBe(titleId);
    expect(screen.getByRole('switch').getAttribute('aria-labelledby')).toBe(
      titleId
    );
  });

  it('expands and collapses when the chevron button is clicked', async () => {
    render(<OptionsTile {...props} />);
    const button = screen.getByRole('button', { name: title });
    const content = screen.getByTestId('options-tile-content');

    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveAttribute('aria-controls', content.id);
    expect(content).not.toBeVisible();

    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(content).toBeVisible();

    fireEvent.click(button);
    await waitFor(() => {
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });
    expect(content).not.toBeVisible();
  });

  it('does not expand when the header outside the chevron button is clicked', () => {
    const onChange = jest.fn();
    render(<OptionsTile {...props} onChange={onChange} />);

    fireEvent.click(screen.getByTestId('options-tile-header'));
    fireEvent.click(screen.getByRole('heading'));

    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-expanded',
      'false'
    );
  });

  it('emits onToggle when the toggle is clicked', () => {
    const onToggle = jest.fn();
    render(<OptionsTile {...props} enabled onToggle={onToggle} />);

    expect(onToggle).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('switch'));
    expect(onToggle).toHaveBeenCalled();
  });

  it('calls the onChange prop when the tile is opened or closed', async () => {
    const onChange = jest.fn();
    render(<OptionsTile onChange={onChange} {...props} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onChange).toHaveBeenLastCalledWith(true);
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => expect(onChange).toHaveBeenLastCalledWith(false));
  });

  it('throws if props.title contains interactive children', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<OptionsTile {...props} title={<button>Button</button>} />);
    }).toThrow();

    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});
