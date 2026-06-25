/**
 * Copyright IBM Corp. 2023, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, act } from '@testing-library/react'; // https://testing-library.com/docs/react-testing-library/intro

import { pkg } from '../../settings';
import uuidv4 from '../../global/js/utils/uuidv4';
import {
  previewCandidate__CoachmarkOverlayElement as CoachmarkOverlayElement,
  previewCandidate__CoachmarkOverlayElements as CoachmarkOverlayElements,
} from '..';
import { CoachmarkFixed } from '.';

const blockClass = `${pkg.prefix}--coachmark-fixed`;
const taglineClass = `${pkg.prefix}--coachmark-tagline`;
const taglineCTAClass = `${taglineClass}__cta`;
const componentName = CoachmarkFixed.displayName;

// values to use
const dataTestId = uuidv4();
const overlayElementsDataTestId = `oes-${uuidv4()}`;
const overlayElement1DataTestId = `oe1-${uuidv4()}`;
const overlayElement2DataTestId = `oe2-${uuidv4()}`;
const className = `class-${uuidv4()}`;

const renderCoachmarkFixed = ({ ...rest } = {}) =>
  render(
    <div id="FixedContainer">
      <CoachmarkFixed {...rest}>
        <CoachmarkOverlayElements
          data-testid={overlayElementsDataTestId}
          aria-label="Coachmark Overlay Element container"
          closeButtonLabel="Done"
          nextButtonText="Next"
          previousButtonLabel="Back"
        >
          <CoachmarkOverlayElement
            data-testid={overlayElement1DataTestId}
            aria-label="Element 1"
            title="Hello World"
            description="Link opens in new tab."
          />
          <CoachmarkOverlayElement
            data-testid={overlayElement2DataTestId}
            aria-label="Element 2"
            title="Hello World 2"
            description="Link opens on this page."
          />
        </CoachmarkOverlayElements>
      </CoachmarkFixed>
    </div>
  );

describe(componentName, () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });
  it('renders a component CoachmarkFixed', () => {
    renderCoachmarkFixed({
      tagline: 'TaglineText',
      onClose: () => console.log('CLOSE'),
      'data-testid': dataTestId,
    });
    expect(screen.getByTestId(dataTestId)).toHaveClass(blockClass);
  });

  it('has no accessibility violations', async () => {
    const { container } = renderCoachmarkFixed({
      tagline: 'TaglineText',
      onClose: () => console.log('CLOSE'),
      'data-testid': dataTestId,
    });
    await expect(container).toBeAccessible(componentName);
    await expect(container).toHaveNoAxeViolations();
  });

  it(`renders children`, async () => {
    const user = userEvent.setup();
    const { container } = renderCoachmarkFixed({
      tagline: 'TaglineText',
      portalTarget: '#FixedContainer',
      onClose: () => console.log('CLOSE'),
      'data-testid': dataTestId,
      closeIconDescription: 'Close',
    });
    expect(container.querySelector(`.${taglineCTAClass}`)).not.toBeNull();
    await act(() => user.click(container.querySelector(`.${taglineCTAClass}`)));

    const fixedRoot = screen.getByTestId(dataTestId);
    const overlayElements = screen.getByTestId(overlayElementsDataTestId);
    const overlayElement1 = screen.getByTestId(overlayElement1DataTestId);
    const overlayElement2 = screen.getByTestId(overlayElement2DataTestId);

    expect(fixedRoot).not.toBeNull();
    expect(overlayElements).not.toBeNull();
    expect(overlayElement1).not.toBeNull();
    expect(overlayElement2).not.toBeNull();
  });

  it('applies className to the containing node', () => {
    renderCoachmarkFixed({
      className,
      tagline: 'TaglineText',
      onClose: () => console.log('CLOSE'),
      'data-testid': dataTestId,
    });
    expect(screen.getByTestId(dataTestId)).toHaveClass(className);
  });

  it('adds additional props to the containing node', () => {
    const tmpTestID = `coachmarkFixed-${uuidv4()}`;
    renderCoachmarkFixed({
      className,
      tagline: 'TaglineText',
      onClose: () => console.log('CLOSE'),
      'data-testid': tmpTestID,
    });
    screen.getByTestId(tmpTestID);
  });

  it('forwards a ref to an appropriate node', () => {
    const ref = React.createRef();
    renderCoachmarkFixed({
      className,
      tagline: 'TaglineText',
      onClose: () => console.log('CLOSE'),
      'data-testid': dataTestId,
      ref,
    });
    expect(ref.current).toHaveClass(blockClass);
  });

  it('adds the Devtools attribute to the containing node', () => {
    renderCoachmarkFixed({
      className,
      tagline: 'TaglineText',
      onClose: () => console.log('CLOSE'),
      'data-testid': dataTestId,
    });

    expect(screen.getByTestId(dataTestId)).toHaveDevtoolsAttribute(
      componentName
    );
  });
});
