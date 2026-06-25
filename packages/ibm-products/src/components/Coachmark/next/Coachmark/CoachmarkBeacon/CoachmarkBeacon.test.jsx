/**
 * Copyright IBM Corp. 2024, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render, screen } from '@testing-library/react'; // https://testing-library.com/docs/react-testing-library/intro

import { pkg } from '../../../../../settings';
import uuidv4 from '../../../../../global/js/utils/uuidv4';
import { Coachmark } from '../Coachmark';
import { CoachmarkBeacon } from '.';
import { Button } from '@carbon/react';

const blockClass = `${pkg.prefix}--coachmark-beacon`;
const componentName = CoachmarkBeacon.displayName;

// values to use
const childDataTestId = `beacon-${uuidv4()}`;
const className = `class-${uuidv4()}`;

const renderCoachmarkWithBeacon = ({ ...rest } = {}) =>
  render(
    <Coachmark>
      <CoachmarkBeacon
        id="CoachmarkBtn"
        label="Show information"
        data-testid={childDataTestId}
        {...rest}
      ></CoachmarkBeacon>
      <Coachmark.Content aria-label="Coachmark content">
        <Coachmark.ContentHeader closeIconDescription="Close"></Coachmark.ContentHeader>
        <Coachmark.ContentBody>
          <h2>Hello World</h2>
          <p>this is a description test</p>
          <Button size="sm">Done</Button>
        </Coachmark.ContentBody>
      </Coachmark.Content>
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
    screen.getByLabelText(testingLabel)[1];
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

  it('applies kind class to the containing node', () => {
    renderCoachmarkWithBeacon({
      label: 'Show information',
      kind: 'default',
    });

    expect(screen.getByTestId(childDataTestId)).toHaveClass(
      `${blockClass}-default`
    );
  });
});
