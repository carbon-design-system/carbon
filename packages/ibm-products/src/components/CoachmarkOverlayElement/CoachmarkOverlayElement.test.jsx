/**
 * Copyright IBM Corp. 2023, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render, screen, act } from '@testing-library/react'; // https://testing-library.com/docs/react-testing-library/intro
import userEvent from '@testing-library/user-event';
import { pkg } from '../../settings';
import uuidv4 from '../../global/js/utils/uuidv4';
import {
  previewCandidate__Coachmark as Coachmark,
  previewCandidate__CoachmarkBeacon as CoachmarkBeacon,
  previewCandidate__CoachmarkOverlayElements as CoachmarkOverlayElements,
} from '..';
import { CoachmarkOverlayElement } from '.';
import { BEACON_KIND } from '../Coachmark/utils/enums';

const blockClass = `${pkg.prefix}--coachmark-overlay-element`;
const componentName = CoachmarkOverlayElement.displayName;

// values to use
const dataTestId = uuidv4();
const className = `class-${uuidv4()}`;

const renderCoachmarkWithOverlayElement = ({ ...rest } = {}) =>
  render(
    <Coachmark
      theme={'dark'}
      align={'bottom'}
      positionTune={{ x: 0, y: 0 }}
      closeIconDescription="Close"
      target={
        <CoachmarkBeacon label="Show information" kind={BEACON_KIND.DEFAULT} />
      }
    >
      <CoachmarkOverlayElements closeButtonLabel="Done">
        <CoachmarkOverlayElement {...rest} />
      </CoachmarkOverlayElements>
    </Coachmark>
  );

describe(componentName, () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });
  it('renders a component CoachmarkOverlayElement', async () => {
    const user = userEvent.setup();
    renderCoachmarkWithOverlayElement({
      title: 'Test title',
      description: 'This is a test description.',
      'data-testid': dataTestId,
    });
    const beaconOrButton = screen.getByRole('button', {
      name: 'Show information',
    });
    await act(() => user.click(beaconOrButton));
    expect(screen.getByTestId(dataTestId)).toHaveClass(blockClass);
  });

  it('has no accessibility violations', async () => {
    const user = userEvent.setup();
    const { container } = renderCoachmarkWithOverlayElement({
      title: 'Test title',
      description: 'This is a test description.',
    });
    const beaconOrButton = screen.getByRole('button', {
      name: 'Show information',
    });
    await act(() => user.click(beaconOrButton));
    await expect(container).toBeAccessible(componentName);
    await expect(container).toHaveNoAxeViolations();
  });

  it('applies className to the containing node', async () => {
    const user = userEvent.setup();
    renderCoachmarkWithOverlayElement({
      title: 'Test title',
      description: 'This is a test description.',
      'data-testid': dataTestId,
      className,
    });
    const beaconOrButton = screen.getByRole('button', {
      name: 'Show information',
    });
    await act(() => user.click(beaconOrButton));
    expect(screen.getByTestId(dataTestId)).toHaveClass(className);
  });

  it('adds additional props to the containing node', async () => {
    const user = userEvent.setup();
    const tmpTestID = `coachmarkOverlayElement-${uuidv4()}`;
    renderCoachmarkWithOverlayElement({
      title: 'Test title',
      description: 'This is a test description.',
      'data-testid': tmpTestID,
    });
    const beaconOrButton = screen.getByRole('button', {
      name: 'Show information',
    });
    await act(() => user.click(beaconOrButton));
    screen.getByTestId(tmpTestID);
  });

  it('forwards a ref to an appropriate node', async () => {
    const user = userEvent.setup();
    const ref = React.createRef();
    renderCoachmarkWithOverlayElement({
      title: 'Test title',
      description: 'This is a test description.',
      ref,
    });
    const beaconOrButton = screen.getByRole('button', {
      name: 'Show information',
    });
    await act(() => user.click(beaconOrButton));
    expect(ref.current).toHaveClass(blockClass);
  });

  it('adds the Devtools attribute to the containing node', async () => {
    const user = userEvent.setup();
    renderCoachmarkWithOverlayElement({
      title: 'Test title',
      description: 'This is a test description.',
      'data-testid': dataTestId,
    });
    const beaconOrButton = screen.getByRole('button', {
      name: 'Show information',
    });
    await act(() => user.click(beaconOrButton));
    expect(screen.getByTestId(dataTestId)).toHaveDevtoolsAttribute(
      componentName
    );
  });
});
