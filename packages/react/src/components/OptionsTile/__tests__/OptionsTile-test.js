/**
 * Copyright IBM Corp. 2021, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from '@testing-library/react';
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

let originalAnimateFunction;

describe(componentName, () => {
  beforeAll(() => {
    originalAnimateFunction = HTMLDivElement.prototype.animate;

    const obj = {
      onfinish: () => {},
      oncancel: () => {},
    };

    const animationFunction = function () {
      Promise.resolve().then(async () => {
        act(() => obj.onfinish());
      });
      return obj;
    };

    HTMLDivElement.prototype.animate = animationFunction;
  });

  afterAll(() => {
    HTMLDivElement.prototype.animate = originalAnimateFunction;
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

  it('adds additional props to the containing node', () => {
    render(<OptionsTile {...props} />);
    screen.getByTestId(dataTestId);
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
    const summary = 'English | Locale: English';
    render(<OptionsTile {...props} summary={summary} />);
    expect(screen.getByRole('heading').nextSibling.textContent).toBe(summary);
  });

  it('renders a toggle if props.enabled is set', () => {
    render(<OptionsTile {...props} enabled />);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
  });

  it('renders as static variant if no children are provided', () => {
    const { container } = render(<OptionsTile title="Static variant" />);
    expect(container.querySelector('details')).toBeFalsy();
  });

  it('renders invalid state when passed', () => {
    const invalidText = 'invalid explanation';

    // also pass props.warn and props.locked to verify props.invalid has the highest priority
    render(
      <OptionsTile {...props} invalid invalidText={invalidText} warn locked />
    );

    const summary = screen.getByRole('heading').nextSibling;

    expect(summary.textContent).toBe(invalidText);
    expect(summary).toHaveClass(`${blockClass}__summary--invalid`);
  });

  it('renders warning state when passed', () => {
    const warnText = 'warning explanation';

    // also pass props.locked to verify props.warn has the higher priority
    render(<OptionsTile {...props} warn warnText={warnText} locked />);

    const summary = screen.getByRole('heading').nextSibling;

    expect(summary.textContent).toBe(warnText);
    expect(summary).toHaveClass(`${blockClass}__summary--warn`);
  });

  it('renders locked state when passed', () => {
    const summaryText = 'summary of content';
    const lockedText = 'locked explanation';

    render(
      <OptionsTile
        {...props}
        summary={summaryText}
        locked
        lockedText={lockedText}
      />
    );

    const summary = screen.getByRole('heading').nextSibling;

    expect(summary.textContent).toBe(summaryText);
    expect(summary).toHaveClass(`${blockClass}__summary--locked`);
  });

  it('renders lockedText when locked and no summary is set', () => {
    const lockedText = 'locked explanation';

    render(<OptionsTile {...props} locked lockedText={lockedText} />);

    const summary = screen.getByRole('heading').nextSibling;

    expect(summary.textContent).toBe(lockedText);
  });

  it('hides the summary when props.enabled = false', () => {
    const summaryText = 'hidden summary';
    render(<OptionsTile {...props} summary={summaryText} enabled={false} />);

    const summary = screen.getByRole('heading').nextSibling;
    expect(summary.textContent).toBe(summaryText);
    expect(summary.getAttribute('aria-hidden')).toBe('true');
  });

  it('can be controlled by setting props.open', async () => {
    const onChange = jest.fn();
    const { container, rerender } = render(
      <OptionsTile {...props} open={false} onChange={onChange} />
    );
    const summaryEl = container.querySelector('summary');
    const detailsEl = container.querySelector('details');

    expect(detailsEl.open).toBe(false);
    fireEvent.click(summaryEl);
    expect(onChange).toHaveBeenCalled();

    rerender(<OptionsTile {...props} open={true} onChange={onChange} />);
    expect(detailsEl.open).toBe(true);
    fireEvent.click(summaryEl);
    expect(onChange).toHaveBeenCalled();
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

  it('expands and collapses on click', async () => {
    const { container } = render(<OptionsTile {...props} />);

    expect(container.querySelector('details').open).toBe(false);
    fireEvent.click(container.querySelector('summary'));
    expect(container.querySelector('details').open).toBe(true);
    fireEvent.click(container.querySelector('summary'));
    await waitFor(() => {
      expect(container.querySelector('details').open).toBe(false);
    });
  });

  it('expands and collapses with usePrefersReducedMotion', async () => {
    const { container } = render(<OptionsTile {...props} />);
    const summaryEl = container.querySelector('summary');
    const detailsEl = container.querySelector('details');

    fireEvent.click(summaryEl);
    await waitFor(() => {
      expect(detailsEl.open).toBe(true);
    });
    fireEvent.click(summaryEl);
    await waitFor(() => {
      expect(detailsEl.open).toBe(false);
    });
  });

  it('emits onToggle when the toggle is clicked', () => {
    const onToggle = jest.fn();
    render(<OptionsTile {...props} enabled onToggle={onToggle} />);

    expect(onToggle).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('switch'));
    expect(onToggle).toHaveBeenCalled();
  });

  it('calls the onChange prop when the tile is opened or closed', () => {
    const onChange = jest.fn();
    const { container } = render(
      <OptionsTile onChange={onChange} {...props} />
    );
    fireEvent.click(container.querySelector('summary'));
    expect(onChange).toHaveBeenCalled();
    fireEvent.click(container.querySelector('summary'));
    expect(onChange).toHaveBeenCalled();
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
