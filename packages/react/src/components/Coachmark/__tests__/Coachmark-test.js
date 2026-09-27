/**
 * Copyright IBM Corp. 2024, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { act, createRef } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Crossroads } from '@carbon/icons-react';

import { Coachmark } from '../index';
import Button from '../../Button';
import { CoachmarkBeacon } from '../CoachmarkBeacon';

const prefix = 'cds';
const blockClass = `${prefix}--coachmark`;
const componentName = Coachmark.displayName;

const renderCoachmark = ({ open, ...rest } = {}) =>
  render(
    <Coachmark open={open} {...rest}>
      <CoachmarkBeacon
        id="CoachmarkBtn"
        label="Show information"
        buttonProps={{ 'aria-expanded': !!open }}
      />
      <Coachmark.Content aria-label="Coachmark content">
        <Coachmark.ContentHeader
          closeIconDescription="Close"
          dragIconDescription="Drag"
        />
        <Coachmark.ContentBody>
          <h2>Hello World</h2>
          <p>this is a description test</p>
          <Button size="sm" id="DoneBtn">
            Done
          </Button>
        </Coachmark.ContentBody>
      </Coachmark.Content>
    </Coachmark>
  );

const renderCoachmarkFloating = ({ open, ...rest } = {}) =>
  render(
    <Coachmark open={open} {...rest}>
      <Button
        id="CoachmarkBtn"
        kind="tertiary"
        size="md"
        renderIcon={Crossroads}
        aria-expanded={!!open}>
        Show information
      </Button>
      <Coachmark.Content aria-label="Coachmark content">
        <Coachmark.ContentHeader
          closeIconDescription="Close"
          dragIconDescription="Drag"
          dragAriaLabel="Coachmark is being dragged"
        />
        <Coachmark.ContentBody>
          <h2>Hello World</h2>
          <p>this is a description test</p>
          <Button size="sm" id="DoneBtn">
            Done
          </Button>
        </Coachmark.ContentBody>
      </Coachmark.Content>
    </Coachmark>
  );

const dataTestId = 'coachmark-test-id';

const isCoachmarkVisible = () => {
  const coachmarkContainer = screen.getByTestId(dataTestId);
  const coachmarkButton = coachmarkContainer.getElementsByTagName('button')[0];
  const ariaExpanded = coachmarkButton.getAttribute('aria-expanded');
  return ariaExpanded === 'true';
};

describe(componentName, () => {
  const originalRAF = global.requestAnimationFrame;

  beforeEach(() => {
    global.requestAnimationFrame = (callback) => setTimeout(callback, 0);
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    global.requestAnimationFrame = originalRAF;
    jest.restoreAllMocks();
  });

  it('renders a component Coachmark', () => {
    const { container } = renderCoachmark({ 'data-testid': dataTestId });
    const coachmarkWrapper = container.querySelector(`.${blockClass}`);
    expect(coachmarkWrapper).toBeInTheDocument();
    expect(coachmarkWrapper).toHaveClass(blockClass);
  });

  it('applies className to the containing node', () => {
    const { container } = renderCoachmark({
      className: 'test-class',
      'data-testid': dataTestId,
    });
    expect(container.querySelector(`.${blockClass}`)).toHaveClass('test-class');
  });

  it('adds additional props to the containing node', () => {
    renderCoachmark({ 'data-testid': dataTestId });
    expect(screen.getByTestId(dataTestId)).toBeTruthy();
  });

  it('forwards a ref to an appropriate node', () => {
    const ref = createRef();
    renderCoachmark({ ref });
    expect(ref.current).toHaveClass(blockClass);
  });

  it('has no accessibility violations', async () => {
    const { container } = renderCoachmark();
    await expect(container).toHaveNoAxeViolations();
  });

  it('adds the data-component-name attribute to the containing node', () => {
    const { container } = renderCoachmark({ 'data-testid': dataTestId });
    const coachmarkWrapper = container.querySelector(`.${blockClass}`);
    expect(coachmarkWrapper).toHaveAttribute(
      'data-component-name',
      componentName
    );
  });

  it('can be open by default', () => {
    renderCoachmark({ 'data-testid': dataTestId, open: true });
    expect(isCoachmarkVisible()).toBeTruthy();
  });

  it('renders the closeIconDescription text', async () => {
    renderCoachmark({ open: true });
    expect(screen.getByText('Close')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    const onCloseMock = jest.fn();
    renderCoachmark({ open: true, onClose: onCloseMock });
    const closeButton = screen.getByRole('button', { name: 'Close' });
    await act(() => userEvent.click(closeButton));
    expect(onCloseMock).toHaveBeenCalled();
  });

  it('applies the position prop as a CSS transform', async () => {
    const { container } = renderCoachmark({
      'data-testid': dataTestId,
      open: true,
      position: { x: 151, y: 155 },
    });
    const coachmarkWrapper = container.querySelector(`.${blockClass}`);
    await waitFor(() => {
      expect(coachmarkWrapper.style.transform).toBe('translate(151px, 155px)');
    });
  });

  it('renders the Drag icon in the floating variant', async () => {
    renderCoachmarkFloating({
      'data-testid': dataTestId,
      open: true,
      floating: true,
    });
    expect(isCoachmarkVisible()).toBeTruthy();
    expect(screen.getByText('Drag')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Drag' })).toBeInTheDocument();
  });

  it('closes on Escape key press and calls onClose', async () => {
    const onCloseMock = jest.fn();
    renderCoachmark({
      'data-testid': dataTestId,
      open: true,
      onClose: onCloseMock,
    });
    expect(isCoachmarkVisible()).toBeTruthy();

    await act(async () => {
      document.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'Escape',
          bubbles: true,
          cancelable: true,
        })
      );
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(onCloseMock).toHaveBeenCalled();
  });

  it('focuses the selectorPrimaryFocus element when open', async () => {
    renderCoachmark({
      'data-testid': dataTestId,
      open: true,
      selectorPrimaryFocus: '#DoneBtn',
    });
    await waitFor(() => {
      expect(document.querySelector('#DoneBtn')).toHaveFocus();
    });
  });

  it('does not close on outside click when floating is enabled', async () => {
    const onCloseMock = jest.fn();
    renderCoachmarkFloating({
      'data-testid': dataTestId,
      open: true,
      floating: true,
      onClose: onCloseMock,
    });
    expect(isCoachmarkVisible()).toBeTruthy();
    await act(() => userEvent.click(document.body));
    expect(onCloseMock).not.toHaveBeenCalled();
  });

  it('applies the correct popover alignment class', () => {
    renderCoachmark({ 'data-testid': dataTestId, open: true, align: 'right' });
    expect(isCoachmarkVisible()).toBeTruthy();
    expect(document.querySelector('.cds--popover-container')).toHaveClass(
      'cds--popover--right'
    );
  });

  it('does not apply high-contrast class when highContrast is false', () => {
    renderCoachmark({
      'data-testid': dataTestId,
      open: true,
      highContrast: false,
    });
    expect(document.querySelector('.cds--popover-container')).not.toHaveClass(
      'cds--popover--high-contrast'
    );
  });

  it('applies drop-shadow class when dropShadow is true', () => {
    renderCoachmark({
      'data-testid': dataTestId,
      open: true,
      dropShadow: true,
    });
    expect(document.querySelector('.cds--popover-container')).toHaveClass(
      'cds--popover--drop-shadow'
    );
  });

  it('applies caret class when caret is true', () => {
    renderCoachmark({ 'data-testid': dataTestId, open: true, caret: true });
    expect(document.querySelector('.cds--popover-container')).toHaveClass(
      'cds--popover--caret'
    );
  });

  it('applies floating class when floating prop is true', () => {
    const { container } = renderCoachmarkFloating({
      'data-testid': dataTestId,
      open: true,
      floating: true,
    });
    expect(container.querySelector(`.${blockClass}`)).toHaveClass(
      `${blockClass}--floating`
    );
  });

  it('passes buttonProps to the CoachmarkBeacon button element', () => {
    const onClickMock = jest.fn();
    render(
      <Coachmark data-testid={dataTestId} open={false}>
        <CoachmarkBeacon
          label="Show information"
          buttonProps={{
            onClick: onClickMock,
            'data-custom': 'test-value',
            tabIndex: 0,
          }}
        />
        <Coachmark.Content aria-label="Coachmark content">
          <Coachmark.ContentHeader closeIconDescription="Close" />
          <Coachmark.ContentBody>
            <h2>Hello World</h2>
          </Coachmark.ContentBody>
        </Coachmark.Content>
      </Coachmark>
    );
    const button = screen.getByRole('button', { name: 'Show information' });
    expect(button).toHaveAttribute('data-custom', 'test-value');
    expect(button).toHaveAttribute('tabindex', '0');
  });

  it('supports keyboard drag with arrow keys in floating variant', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Coachmark data-testid={dataTestId} open={true} floating={true}>
        <Button
          id="CoachmarkBtn"
          kind="tertiary"
          size="md"
          renderIcon={Crossroads}
          aria-expanded={true}>
          Show information
        </Button>
        <Coachmark.Content>
          <Coachmark.ContentHeader
            closeIconDescription="Close"
            dragIconDescription="Drag"
          />
          <Coachmark.ContentBody>
            <h2>Hello World</h2>
            <Button size="sm" id="DoneBtn">
              Done
            </Button>
          </Coachmark.ContentBody>
        </Coachmark.Content>
      </Coachmark>
    );

    await waitFor(() => expect(isCoachmarkVisible()).toBeTruthy());

    const dragButton = screen.getByLabelText('Drag');
    const popoverContent = container.querySelector(
      `.${prefix}--popover-content`
    );
    expect(popoverContent).toBeInTheDocument();

    await act(async () => {
      dragButton.focus();
      await user.keyboard('{Enter}');
    });

    await act(async () => {
      await user.keyboard('{ArrowRight}');
    });

    await waitFor(() => {
      const currentTransform = popoverContent.parentElement.style.transform;
      expect(currentTransform).toContain('translate');
      expect(currentTransform).toContain('8px');
    });
  });
});
