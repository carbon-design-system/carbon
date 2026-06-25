/**
 * Copyright IBM Corp. 2023, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {
  render,
  screen,
  waitFor,
  fireEvent,
  act,
} from '@testing-library/react'; // https://testing-library.com/docs/react-testing-library/intro

import userEvent from '@testing-library/user-event';
import { pkg } from '../../settings';
import uuidv4 from '../../global/js/utils/uuidv4';

import { Coachmark } from '.';
import {
  previewCandidate__CoachmarkBeacon as CoachmarkBeacon,
  previewCandidate__CoachmarkButton as CoachmarkButton,
  previewCandidate__CoachmarkOverlayElement as CoachmarkOverlayElement,
  previewCandidate__CoachmarkOverlayElements as CoachmarkOverlayElements,
} from '..';
import {
  BEACON_KIND,
  COACHMARK_ALIGNMENT,
  COACHMARK_OVERLAY_KIND,
} from './utils/enums';
import { getOffsetTune } from './utils/constants';
import { clamp } from '../../global/js/utils/clamp';
import { Crossroads } from '@carbon/react/icons';
import { CoachmarkDragbar } from './CoachmarkDragbar';
const blockClass = `${pkg.prefix}--coachmark`;
const componentName = Coachmark.displayName;

const className = `class-${uuidv4()}`;
const dataTestId = uuidv4();
const childDataTestId = `child-element-${uuidv4()}`;
const closeLabel = 'Close';

// values to use

const childrenContent = (
  <CoachmarkOverlayElements
    data-testid={childDataTestId}
    closeButtonLabel="Done"
  >
    <CoachmarkOverlayElement
      title="Hello World"
      description="this is a description test"
    />
  </CoachmarkOverlayElements>
);

const renderCoachmark = ({ ...rest } = {}, children = childrenContent) =>
  render(
    <Coachmark
      theme={'dark'}
      align={'bottom'}
      positionTune={{ x: 0, y: 0 }}
      closeIconDescription={closeLabel}
      target={
        <CoachmarkBeacon label="Show information" kind={BEACON_KIND.DEFAULT} />
      }
      {...rest}
    >
      {children}
    </Coachmark>
  );

const renderCoachmarkFloating = (
  { ...rest } = {},
  children = childrenContent
) =>
  render(
    <Coachmark
      theme={'dark'}
      align={'bottom'}
      positionTune={{ x: 0, y: 0 }}
      closeIconDescription={closeLabel}
      overlayKind={'floating'}
      isOpenByDefault={true}
      target={
        <CoachmarkButton
          kind="tertiary"
          size="md"
          label="Show information"
          renderIcon={Crossroads}
        >
          Click Me
        </CoachmarkButton>
      }
      {...rest}
    >
      {children}
    </Coachmark>
  );

const isCoachmarkVisible = () => {
  const coachmarkContainer = screen.getByTestId(dataTestId);
  const coachmarkButton = coachmarkContainer.getElementsByTagName('button')[0];
  const ariaExpanded = coachmarkButton.getAttribute('aria-expanded');
  return ariaExpanded === 'true';
};

describe(componentName, () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });
  it('renders a component Coachmark', () => {
    renderCoachmark({ 'data-testid': dataTestId });
    expect(screen.getByTestId(dataTestId)).toHaveClass(blockClass);
  });

  it('Check coachmark can be open by default', () => {
    renderCoachmark({
      'data-testid': dataTestId,
      isOpenByDefault: true,
    });
    expect(isCoachmarkVisible()).toBeTruthy();
  });

  it('has no accessibility violations', async () => {
    const { container } = renderCoachmark();
    await expect(container).toBeAccessible(componentName);
    await expect(container).toHaveNoAxeViolations();
  });

  it(`renders children`, async () => {
    const user = userEvent.setup();
    renderCoachmark({ children: childrenContent });
    const beaconOrButton = screen.getByRole('button', {
      name: 'Show information',
    });
    await act(() => user.click(beaconOrButton));
    screen.getByTestId(childDataTestId);
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
    screen.getByTestId(dataTestId);
  });

  it('forwards a ref to an appropriate node', () => {
    const ref = React.createRef();
    renderCoachmark({ ref });
    expect(ref.current).toHaveClass(blockClass);
  });

  it('adds the Devtools attribute to the containing node', () => {
    renderCoachmark({
      'data-testid': dataTestId,
    });
    expect(screen.getByTestId(dataTestId)).toHaveDevtoolsAttribute(
      componentName
    );
  });

  it('renders the closeIconDescription text ', async () => {
    const container = renderCoachmarkFloating({ 'data-testid': dataTestId });
    expect(isCoachmarkVisible()).toBeTruthy();
    const btn = screen.getByRole('button', { name: 'Show information' });
    await waitFor(() => userEvent.click(btn));
    const tooltip = container.getByText(closeLabel);

    expect(tooltip).toBeInTheDocument();
  });

  it('calls the onClose prop when close is clicked', async () => {
    const onCloseMock = jest.fn();
    renderCoachmarkFloating({
      'data-testid': dataTestId,
      onClose: onCloseMock,
    });
    const btn = screen.getByRole('button', { name: 'Show information' });
    await waitFor(() => userEvent.click(btn));
    const closeButton = screen.getByRole('button', { name: closeLabel });
    expect(closeButton).toBeInTheDocument();
    await act(() => userEvent.click(closeButton));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('showCloseButton prop works as expected', async () => {
    const a11yKeyboardHandler = jest.fn();

    render(
      <CoachmarkDragbar
        a11yKeyboardHandler={a11yKeyboardHandler}
        showCloseButton={false}
      />
    );

    expect(screen.queryAllByRole('button').length).toBe(1);
  });

  it('calls the onDrag prop', async () => {
    const a11yKeyboardHandler = jest.fn();
    const onDrag = jest.fn();

    render(
      <CoachmarkDragbar
        a11yKeyboardHandler={a11yKeyboardHandler}
        showCloseButton={false}
        onDrag={onDrag}
      />
    );

    const dragbar = screen.getByRole('button');

    await waitFor(() => {
      fireEvent.mouseDown(dragbar, { clientX: 0, clientY: 0 });
      fireEvent.mouseMove(dragbar, { clientX: 100, clientY: 100 });
      fireEvent.mouseUp(dragbar);
    });

    expect(onDrag).toHaveBeenCalled();
  });

  it('renders the theme prop', async () => {
    renderCoachmark({
      'data-testid': dataTestId,
      theme: 'dark',
    });

    await expect(screen.getByTestId(dataTestId)).toHaveClass(
      `${pkg.prefix}--coachmark__dark`
    );
  });

  it('renders the theme prop', async () => {
    renderCoachmark({
      'data-testid': dataTestId,
      theme: 'dark',
    });

    await expect(screen.getByTestId(dataTestId)).toHaveClass(
      `${pkg.prefix}--coachmark__dark`
    );
  });

  it('tests getOffsetTune util', async () => {
    let result;
    const distanceOffset = 24;
    const coachmarkTarget = {
      targetRect: {
        width: 200,
        height: 200,
      },
      align: COACHMARK_ALIGNMENT.TOP,
    };

    // Test case when it is a tooltip
    result = getOffsetTune(coachmarkTarget, COACHMARK_OVERLAY_KIND.TOOLTIP);
    expect(result.left).toBe(0);
    expect(result.top).toBe(0);

    // Test top alignment
    coachmarkTarget.align = COACHMARK_ALIGNMENT.TOP;
    result = getOffsetTune(coachmarkTarget, COACHMARK_OVERLAY_KIND.FLOATING);
    expect(result.left).toBe(100);
    expect(result.top).toBe(0);

    // Test top left alignment
    coachmarkTarget.align = COACHMARK_ALIGNMENT.TOP_LEFT;
    result = getOffsetTune(coachmarkTarget, COACHMARK_OVERLAY_KIND.FLOATING);
    expect(result.left).toBe(distanceOffset);
    expect(result.top).toBe(0);

    // Test top right alignment
    coachmarkTarget.align = COACHMARK_ALIGNMENT.TOP_RIGHT;
    result = getOffsetTune(coachmarkTarget, COACHMARK_OVERLAY_KIND.FLOATING);
    expect(result.left).toBe(200 - distanceOffset);
    expect(result.top).toBe(0);

    // Test bottom alignment
    coachmarkTarget.align = COACHMARK_ALIGNMENT.BOTTOM;
    result = getOffsetTune(coachmarkTarget, COACHMARK_OVERLAY_KIND.FLOATING);
    expect(result.left).toBe(100);
    expect(result.top).toBe(200);

    // Test bottom left alignment
    coachmarkTarget.align = COACHMARK_ALIGNMENT.BOTTOM_LEFT;
    result = getOffsetTune(coachmarkTarget, COACHMARK_OVERLAY_KIND.FLOATING);
    expect(result.left).toBe(distanceOffset);
    expect(result.top).toBe(200);

    // Test bottom right alignment
    coachmarkTarget.align = COACHMARK_ALIGNMENT.BOTTOM_RIGHT;
    result = getOffsetTune(coachmarkTarget, COACHMARK_OVERLAY_KIND.FLOATING);
    expect(result.left).toBe(200 - distanceOffset);
    expect(result.top).toBe(200);

    // Test left alignment
    coachmarkTarget.align = COACHMARK_ALIGNMENT.LEFT;
    result = getOffsetTune(coachmarkTarget, COACHMARK_OVERLAY_KIND.FLOATING);
    expect(result.left).toBe(0);
    expect(result.top).toBe(100);

    // Test left top alignment
    coachmarkTarget.align = COACHMARK_ALIGNMENT.LEFT_TOP;
    result = getOffsetTune(coachmarkTarget, COACHMARK_OVERLAY_KIND.FLOATING);
    expect(result.left).toBe(0);
    expect(result.top).toBe(distanceOffset);

    // Test left bottom alignment
    coachmarkTarget.align = COACHMARK_ALIGNMENT.LEFT_BOTTOM;
    result = getOffsetTune(coachmarkTarget, COACHMARK_OVERLAY_KIND.FLOATING);
    expect(result.left).toBe(0);
    expect(result.top).toBe(200 - distanceOffset);

    // Test right alignment
    coachmarkTarget.align = COACHMARK_ALIGNMENT.RIGHT;
    result = getOffsetTune(coachmarkTarget, COACHMARK_OVERLAY_KIND.FLOATING);
    expect(result.left).toBe(200);
    expect(result.top).toBe(100);

    // Test right top alignment
    coachmarkTarget.align = COACHMARK_ALIGNMENT.RIGHT_TOP;
    result = getOffsetTune(coachmarkTarget, COACHMARK_OVERLAY_KIND.FLOATING);
    expect(result.left).toBe(200);
    expect(result.top).toBe(distanceOffset);

    // Test right bottom alignment
    coachmarkTarget.align = COACHMARK_ALIGNMENT.RIGHT_BOTTOM;
    result = getOffsetTune(coachmarkTarget, COACHMARK_OVERLAY_KIND.FLOATING);
    expect(result.left).toBe(200);
    expect(result.top).toBe(200 - distanceOffset);
  });

  it('tests clamp helper function', () => {
    expect(clamp(20, 50, 100)).toBe(50);
    expect(clamp(50, 10, 40)).toBe(40);
  });
});
