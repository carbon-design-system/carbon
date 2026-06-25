/**
 * Copyright IBM Corp. 2024, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { act, createRef } from 'react';
import { render, screen, waitFor } from '@testing-library/react'; // https://testing-library.com/docs/react-testing-library/intro
import { pkg, carbon } from '../../../../settings';
import uuidv4 from '../../../../global/js/utils/uuidv4';

import { Coachmark } from '.';
import { Button } from '@carbon/react';
import { CoachmarkBeacon } from './CoachmarkBeacon';
import userEvent from '@testing-library/user-event';
import { Crossroads } from '@carbon/react/icons';

const blockClass = `${pkg.prefix}--coachmark__next`;
const componentName = Coachmark.displayName;

const className = `class-${uuidv4()}`;
const dataTestId = uuidv4();

const renderCoachmark = ({ ...rest } = {}) =>
  render(
    <Coachmark {...rest}>
      <CoachmarkBeacon
        id="CoachmarkBtn"
        label="Show information"
      ></CoachmarkBeacon>
      <Coachmark.Content aria-label="Coachmark content">
        <Coachmark.ContentHeader
          closeIconDescription="Close"
          dragIconDescription="Drag"
        ></Coachmark.ContentHeader>
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

const renderCoachmarkFloating = ({ ...rest } = {}) =>
  render(
    <Coachmark {...rest}>
      <Button
        id="CoachmarkBtn"
        kind="tertiary"
        size="md"
        label="Show information"
        renderIcon={Crossroads}
      >
        Show information
      </Button>
      <Coachmark.Content aria-label="Coachmark content">
        <Coachmark.ContentHeader
          closeIconDescription="Close"
          dragIconDescription="Drag"
          dragAriaLabel="Coachmark is being dragged"
        ></Coachmark.ContentHeader>
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
  });
  it('renders a component Coachmark', () => {
    renderCoachmark({ 'data-testid': dataTestId });
    expect(screen.getByTestId(dataTestId)).toHaveClass(blockClass);
  });

  it('applies className to the containing node', () => {
    renderCoachmark({
      className,
      'data-testid': dataTestId,
    });
    expect(screen.getByTestId(dataTestId)).toHaveClass(className);
  });

  it('adds additional props to the containing node', () => {
    renderCoachmark({
      'data-testid': dataTestId,
    });
    expect(screen.getByTestId(dataTestId)).toBeTruthy();
  });

  it('forwards a ref to an appropriate node', () => {
    const ref = createRef();
    renderCoachmark({ ref });
    expect(ref.current).toHaveClass(blockClass);
  });

  it('has no accessibility violations', async () => {
    const { container } = renderCoachmark();
    await expect(container).toBeAccessible(componentName);
    await expect(container).toHaveNoAxeViolations();
  });

  it('adds the Devtools attribute to the containing node', () => {
    renderCoachmark({
      'data-testid': dataTestId,
    });
    expect(screen.getByTestId(dataTestId)).toHaveDevtoolsAttribute(
      componentName
    );
  });

  it('Check coachmark can be open by default', () => {
    renderCoachmark({
      'data-testid': dataTestId,
      open: true,
    });
    expect(isCoachmarkVisible()).toBeTruthy();
  });

  it('renders the closeIconDescription text ', async () => {
    renderCoachmark({ open: true });
    const closeIconDescription = 'Close';
    const tooltip = screen.getByText(closeIconDescription);
    expect(tooltip).toBeInTheDocument();
  });

  it('calls the onClose prop when close is clicked', async () => {
    const onCloseMock = jest.fn();
    renderCoachmark({ open: true, onClose: onCloseMock });
    const closeIconDescription = 'Close';
    const tooltip = screen.getByText(closeIconDescription);
    expect(tooltip).toBeInTheDocument();
    const closeButton = screen.getByRole('button', {
      name: closeIconDescription,
    });
    expect(closeButton).toBeInTheDocument();
    await act(() => userEvent.click(closeButton));
    expect(onCloseMock).toHaveBeenCalled();
  });

  it('changes the beacon position while using position prop ', async () => {
    renderCoachmark({
      'data-testid': dataTestId,
      open: true,
      position: { x: 151, y: 155 },
    });
    const element = screen.getByTestId(dataTestId);
    expect(element).toBeTruthy();
    await waitFor(() => {
      expect(element.style.transform).toBe('translate(151px, 155px)');
    });
  });

  it('renders the Drag Icon and DragIconDescription in floating variant', async () => {
    renderCoachmarkFloating({
      'data-testid': dataTestId,
      open: true,
      floating: true,
    });
    expect(isCoachmarkVisible()).toBeTruthy();
    const dragIconDescription = 'Drag';
    const dragTooltip = screen.getByText(dragIconDescription);
    expect(dragTooltip).toBeInTheDocument();
    const dragButton = screen.getByRole('button', {
      name: dragIconDescription,
    });
    expect(dragButton).toBeInTheDocument();
  });

  it('handles Escape key press to close coachmark', async () => {
    const onCloseMock = jest.fn();
    renderCoachmark({
      'data-testid': dataTestId,
      open: true,
      onClose: onCloseMock,
    });
    expect(isCoachmarkVisible()).toBeTruthy();

    // Simulate Escape key press
    const event = new KeyboardEvent('keydown', {
      key: 'Escape',
      bubbles: true,
      cancelable: true,
    });

    await act(async () => {
      document.dispatchEvent(event);
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(onCloseMock).toHaveBeenCalled();
  });

  it('handles selectorPrimaryFocus prop', async () => {
    renderCoachmark({
      'data-testid': dataTestId,
      open: true,
      selectorPrimaryFocus: '#DoneBtn',
    });

    await waitFor(() => {
      const focusedElement = document.querySelector('#DoneBtn');
      expect(focusedElement).toHaveFocus();
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

    // Click outside should not close when floating
    await act(() => userEvent.click(document.body));

    // onClose should not be called for outside clicks when floating
    expect(onCloseMock).not.toHaveBeenCalled();
  });

  it('renders with align prop and applies correct popover class', () => {
    renderCoachmark({
      'data-testid': dataTestId,
      open: true,
      align: 'right',
    });
    expect(isCoachmarkVisible()).toBeTruthy();
    const popoverContainer = document.querySelector('.cds--popover-container');
    expect(popoverContainer).toHaveClass('cds--popover--right');
  });

  it('renders with highContrast prop set to false and does not apply high-contrast class', () => {
    renderCoachmark({
      'data-testid': dataTestId,
      open: true,
      highContrast: false,
    });
    expect(isCoachmarkVisible()).toBeTruthy();
    const popoverContainer = document.querySelector('.cds--popover-container');
    expect(popoverContainer).not.toHaveClass('cds--popover--high-contrast');
  });

  it('renders with dropShadow prop and applies drop-shadow class', () => {
    renderCoachmark({
      'data-testid': dataTestId,
      open: true,
      dropShadow: true,
    });
    expect(isCoachmarkVisible()).toBeTruthy();
    const popoverContainer = document.querySelector('.cds--popover-container');
    expect(popoverContainer).toHaveClass('cds--popover--drop-shadow');
  });

  it('renders with caret prop set to true and applies caret class', () => {
    renderCoachmark({
      'data-testid': dataTestId,
      open: true,
      caret: true,
    });
    expect(isCoachmarkVisible()).toBeTruthy();
    const popoverContainer = document.querySelector('.cds--popover-container');
    expect(popoverContainer).toHaveClass('cds--popover--caret');
  });

  it('applies floating class when floating prop is true', () => {
    renderCoachmarkFloating({
      'data-testid': dataTestId,
      open: true,
      floating: true,
    });
    const coachmark = screen.getByTestId(dataTestId);
    expect(coachmark).toHaveClass(`${blockClass}--floating`);
  });

  it('applies buttonProps to CoachmarkBeacon button element', () => {
    const onClickMock = jest.fn();
    render(
      <Coachmark data-testid={dataTestId} open={false}>
        <CoachmarkBeacon
          id="CoachmarkBtn"
          label="Show information"
          buttonProps={{
            onClick: onClickMock,
            'data-custom': 'test-value',
            tabIndex: 0,
          }}
        ></CoachmarkBeacon>
        <Coachmark.Content aria-label="Coachmark content">
          <Coachmark.ContentHeader
            closeIconDescription="Close"
            dragIconDescription="Drag"
          ></Coachmark.ContentHeader>
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

  it('supports keyboard drag functionality with arrow keys', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Coachmark data-testid={dataTestId} open={true} floating={true}>
        <Button
          id="CoachmarkBtn"
          kind="tertiary"
          size="md"
          label="Show information"
          renderIcon={Crossroads}
        >
          Show information
        </Button>
        <Coachmark.Content>
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

    await waitFor(() => {
      expect(isCoachmarkVisible()).toBeTruthy();
    });

    const dragButton = screen.getByLabelText('Drag');
    // Find the popover content element that gets transformed
    const popoverContent = container.querySelector(
      `.${carbon.prefix}--popover-content`
    );
    expect(popoverContent).toBeInTheDocument();

    // Focus on drag button and activate drag mode with Enter
    await act(async () => {
      dragButton.focus();
      await user.keyboard('{Enter}');
    });

    // Press ArrowRight to move 8px to the right
    await act(async () => {
      await user.keyboard('{ArrowRight}');
    });

    // Check if transform has been applied (moved 8px to the right)
    await waitFor(() => {
      const currentTransform = popoverContent.parentElement.style.transform;
      expect(currentTransform).toContain('translate');
      expect(currentTransform).toContain('8px');
    });
  });
});
