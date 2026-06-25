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
import { CoachmarkBeacon } from '.';
import { BEACON_KIND } from '../Coachmark/utils/enums';

const blockClass = `${pkg.prefix}--coachmark-beacon`;
const componentName = CoachmarkBeacon.displayName;

// values to use
const childDataTestId = `beacon-${uuidv4()}`;
const className = `class-${uuidv4()}`;

const renderCoachmarkWithBeacon = ({ ...rest } = {}) =>
  render(
    <Coachmark
      theme={'dark'}
      align={'bottom'}
      positionTune={{ x: 0, y: 0 }}
      target={
        <CoachmarkBeacon
          data-testid={childDataTestId}
          kind={BEACON_KIND.DEFAULT}
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
  it('renders a component CoachmarkBeacon', () => {
    renderCoachmarkWithBeacon({ label: 'Show information' });
    expect(screen.getByTestId(childDataTestId)).toHaveClass(blockClass);
  });

  it('has no accessibility violations', async () => {
    const { container } = renderCoachmarkWithBeacon({
      label: 'Show information',
    });
    await expect(container).toBeAccessible(componentName);
    await expect(container).toHaveNoAxeViolations();
  });

  it('applies className to the containing node', () => {
    renderCoachmarkWithBeacon({ className, label: 'Show information' });
    expect(screen.getByTestId(childDataTestId)).toHaveClass(className);
  });

  it('adds additional props to the containing node', () => {
    const testingLabel = `testing-labels-${uuidv4()}`;
    renderCoachmarkWithBeacon({
      label: testingLabel,
    });
    screen.getAllByLabelText(testingLabel)[1];
  });

  it('forwards a ref to an appropriate node', () => {
    const testRef = React.createRef();
    renderCoachmarkWithBeacon({ ref: testRef, label: 'Show information' });
    expect(testRef.current).toHaveClass(blockClass);
  });

  it('adds the Devtools attribute to the containing node', () => {
    renderCoachmarkWithBeacon({ label: 'Show information' });

    expect(screen.getByTestId(childDataTestId)).toHaveDevtoolsAttribute(
      componentName
    );
  });
});
