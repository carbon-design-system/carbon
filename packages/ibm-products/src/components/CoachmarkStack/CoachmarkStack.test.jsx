/**
 * Copyright IBM Corp. 2023, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { act } from 'react';
import { render, screen } from '@testing-library/react'; // https://testing-library.com/docs/react-testing-library/intro

import { pkg } from '../../settings';
import uuidv4 from '../../global/js/utils/uuidv4';
import {
  previewCandidate__CoachmarkOverlayElement as CoachmarkOverlayElement,
  previewCandidate__CoachmarkOverlayElements as CoachmarkOverlayElements,
} from '..';
import { CoachmarkStack } from '.';
import userEvent from '@testing-library/user-event';

const blockClass = `${pkg.prefix}--coachmark-stack`;
const overlayBlockClass = `${pkg.prefix}--coachmark-overlay--stack`;
const componentName = CoachmarkStack.displayName;
const dataTestId = uuidv4();
const childDataTestId = `coachmark_${uuidv4()}`;

// values to use
const childrenContent = [
  <CoachmarkOverlayElements closeButtonLabel={'Close 1'} key="1">
    <CoachmarkOverlayElement
      title="Test Element 1"
      description="Description goes here"
    />
  </CoachmarkOverlayElements>,

  <CoachmarkOverlayElements
    data-testid={childDataTestId}
    closeButtonLabel={'Close 2'}
    key="2"
  >
    <CoachmarkOverlayElement
      title="Test Element 1"
      description="Description goes here"
    />
  </CoachmarkOverlayElements>,

  <CoachmarkOverlayElements closeButtonLabel={'Close 3'} key="3">
    <CoachmarkOverlayElement
      title="Test Element 1"
      description="Description goes here"
    />
  </CoachmarkOverlayElements>,
];
const className = `class-${uuidv4()}`;

const renderCoachmarkStack = ({ ...rest } = {}, children = childrenContent) =>
  render(<CoachmarkStack {...rest}>{children}</CoachmarkStack>);

describe(componentName, () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });
  it('renders a component CoachmarkStack', () => {
    renderCoachmarkStack({
      title: 'Coachmark Stack',
      description: 'Coachmark Stack Description',
      navLinkLabels: ['Label 1', 'Label 2', 'Label 3'],
      tagline: 'Test Tagline',
      'data-testid': dataTestId,
      closeIconDescription: 'Close',
    });
    expect(screen.getByTestId(dataTestId)).toHaveClass(overlayBlockClass);
  });

  it('has no accessibility violations', async () => {
    const { container } = renderCoachmarkStack({
      title: 'Coachmark Stack',
      description: 'Coachmark Stack Description',
      navLinkLabels: ['Label 1', 'Label 2', 'Label 3'],
      tagline: 'Test Tagline',
      'data-testid': dataTestId,
      closeIconDescription: 'Close',
    });
    await act(async () => {
      await expect(container).toBeAccessible(componentName);
      await expect(container).toHaveNoAxeViolations();
    });
  });

  it(`adds additional props to the containing node and renders children`, async () => {
    renderCoachmarkStack({
      title: 'Coachmark Stack',
      description: 'Coachmark Stack Description',
      navLinkLabels: ['Label 1', 'Label 2', 'Label 3'],
      tagline: 'Test Tagline',
      'data-testid': dataTestId,
      closeIconDescription: 'Close',
    });
    screen.getByTestId(dataTestId);
    const stackButton = screen.getByRole('button', { name: 'Test Tagline' });
    await act(() => userEvent.click(stackButton));
    screen.getByTestId(childDataTestId);
  });

  it('applies className to the containing node', () => {
    renderCoachmarkStack({
      title: 'Coachmark Stack',
      description: 'Coachmark Stack Description',
      navLinkLabels: ['Label 1', 'Label 2', 'Label 3'],
      tagline: 'Test Tagline',
      'data-testid': dataTestId,
      closeIconDescription: 'Close',
      className,
    });

    expect(screen.getByTestId(dataTestId)).toHaveClass(className);
  });

  it('forwards a ref to an appropriate node', () => {
    const ref = React.createRef();
    renderCoachmarkStack({
      title: 'Coachmark Stack',
      description: 'Coachmark Stack Description',
      navLinkLabels: ['Label 1', 'Label 2', 'Label 3'],
      tagline: 'Test Tagline',
      'data-testid': dataTestId,
      closeIconDescription: 'Close',
      ref,
    });
    expect(ref.current).toHaveClass(blockClass);
  });

  it('adds the Devtools attribute to the containing node', () => {
    renderCoachmarkStack({
      title: 'Coachmark Stack',
      description: 'Coachmark Stack Description',
      navLinkLabels: ['Label 1', 'Label 2', 'Label 3'],
      tagline: 'Test Tagline',
      'data-testid': dataTestId,
      closeIconDescription: 'Close',
    });

    expect(screen.getByTestId(dataTestId)).toHaveDevtoolsAttribute(
      componentName
    );
  });

  it('calls the onClose prop', async () => {
    const onClose = jest.fn();
    renderCoachmarkStack({
      title: 'Coachmark Stack',
      description: 'Coachmark Stack Description',
      navLinkLabels: ['Label 1', 'Label 2', 'Label 3'],
      tagline: 'Test Tagline',
      'data-testid': dataTestId,
      closeIconDescription: 'Close',
      onClose,
    });
    expect(onClose).not.toHaveBeenCalled();

    const coachmarkStackButton = screen.getByRole('button', {
      name: /Test Tagline/,
    });

    await act(() => userEvent.click(coachmarkStackButton));

    const closeButton = screen.getAllByRole('button', {
      name: /Close/,
    })[0];

    await act(() => userEvent.click(closeButton));

    expect(onClose).toHaveBeenCalled();
  });

  it('opens a stacked coachmark', async () => {
    const onClose = jest.fn();
    renderCoachmarkStack({
      title: 'Coachmark Stack',
      description: 'Coachmark Stack Description',
      navLinkLabels: ['Label 1', 'Label 2', 'Label 3'],
      tagline: 'Test Tagline',
      'data-testid': dataTestId,
      closeIconDescription: 'Close',
      onClose,
    });

    // gets the trigger to open the overlay
    const coachmarkStackButton = screen.getByRole('button', {
      name: /Test Tagline/,
    });
    await act(() => userEvent.click(coachmarkStackButton));

    // Gets the label button to open a stacked item
    const labelButton = screen.getByRole('button', {
      name: /Label 1/,
    });
    await act(() => userEvent.click(labelButton));

    // Gets the overlay element
    const coachmarkOverlay = document.querySelector(
      `.${pkg.prefix}--coachmark-overlay`
    );

    // tests to see if the element has the is-stacked class
    expect(coachmarkOverlay).toHaveClass(
      `${pkg.prefix}--coachmark-stack-element--is-stacked`
    );

    // pressing escape should close the stacked item
    await act(() => userEvent.keyboard('{Escape}'));

    expect(coachmarkOverlay).not.toHaveClass(
      `${pkg.prefix}--coachmark-stack-element--is-stacked`
    );

    await act(() => userEvent.keyboard('{Escape}'));
  });
});
