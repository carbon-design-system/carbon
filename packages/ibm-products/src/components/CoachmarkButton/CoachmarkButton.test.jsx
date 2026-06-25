/**
 * Copyright IBM Corp. 2023, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render, screen } from '@testing-library/react'; // https://testing-library.com/docs/react-testing-library/intro

import { pkg } from '../../settings';
import uuidv4 from '../../global/js/utils/uuidv4';
import {
  previewCandidate__Coachmark as Coachmark,
  previewCandidate__CoachmarkOverlayElement as CoachmarkOverlayElement,
  previewCandidate__CoachmarkOverlayElements as CoachmarkOverlayElements,
} from '..';
import { CoachmarkButton } from '.';

const blockClass = `${pkg.prefix}--coachmark-button`;
const componentName = CoachmarkButton.displayName;

// values to use
const buttonChildren = `hello, world (${uuidv4()})`;
const childDataTestId = `button-${uuidv4()}`;
const className = `class-${uuidv4()}`;

const renderCoachmarkWithButton = ({ ...rest } = {}) =>
  render(
    <Coachmark
      theme={'dark'}
      align={'bottom'}
      positionTune={{ x: 0, y: 0 }}
      target={
        <CoachmarkButton
          data-testid={childDataTestId}
          kind="tertiary"
          label="Show information"
          size="md"
          {...rest}
        />
      }
    >
      <CoachmarkOverlayElements closeButtonLabel="Done">
        <CoachmarkOverlayElement
          title="Hello World"
          description="this is a description test"
        />
      </CoachmarkOverlayElements>
    </Coachmark>
  );

describe(componentName, () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  it('renders a component CoachmarkButton', () => {
    renderCoachmarkWithButton({ children: buttonChildren });
    expect(screen.getByTestId(childDataTestId)).toHaveClass(blockClass);
  });

  it('has no accessibility violations', async () => {
    const { container } = renderCoachmarkWithButton({
      children: buttonChildren,
    });
    await expect(container).toBeAccessible(componentName);
    await expect(container).toHaveNoAxeViolations();
  });

  it('applies className to the containing node', () => {
    renderCoachmarkWithButton({ className, children: buttonChildren });
    expect(screen.getByTestId(childDataTestId)).toHaveClass(className);
  });

  it('adds additional props to the containing node', () => {
    const tmpTestID = `buttonTesting-${uuidv4()}`;
    renderCoachmarkWithButton({
      'data-testid': tmpTestID,
      children: buttonChildren,
    });
    screen.getByTestId(tmpTestID);
  });

  it('forwards a ref to an appropriate node', () => {
    const testRef = React.createRef();
    renderCoachmarkWithButton({ ref: testRef, children: buttonChildren });
    expect(testRef.current).toHaveClass(blockClass);
  });

  it('adds the Devtools attribute to the containing node', () => {
    renderCoachmarkWithButton({ children: buttonChildren });
    expect(screen.getByTestId(childDataTestId)).toHaveDevtoolsAttribute(
      componentName
    );
  });
});
