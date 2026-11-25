/**
 * Copyright IBM Corp. 2024, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';
import '@testing-library/jest-dom/jest-globals';
import React, { createRef, type ComponentProps } from 'react';
import { render, screen } from '@testing-library/react';

import { Coachmark } from '../../index';
import { CoachmarkBeacon } from '../index';
import { BEACON_KIND } from '../CoachmarkBeacon';
import Button from '../../../Button';

const prefix = 'cds';
const blockClass = `${prefix}--coachmark-beacon`;
const componentName = CoachmarkBeacon.displayName ?? 'CoachmarkBeacon';

const childDataTestId = 'coachmark-beacon-test';
const className = 'test-class-beacon';

type CoachmarkBeaconTestProps = Partial<ComponentProps<typeof CoachmarkBeacon>>;

const renderCoachmarkWithBeacon = (props: CoachmarkBeaconTestProps = {}) =>
  render(
    <Coachmark>
      <CoachmarkBeacon
        label="Show information"
        data-testid={childDataTestId}
        {...props}
      />
      <Coachmark.Content aria-label="Coachmark content">
        <Coachmark.ContentHeader closeIconDescription="Close" />
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

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders a component CoachmarkBeacon', () => {
    renderCoachmarkWithBeacon();
    expect(screen.getByTestId(childDataTestId)).toHaveClass(blockClass);
  });

  it('has no accessibility violations', async () => {
    const { container } = renderCoachmarkWithBeacon();
    await expect(container).toHaveNoAxeViolations();
  });

  it('applies className to the containing node', () => {
    renderCoachmarkWithBeacon({ className });
    expect(screen.getByTestId(childDataTestId)).toHaveClass(className);
  });

  it('uses the label as aria-label on the inner button', () => {
    const testingLabel = 'custom-beacon-label';
    renderCoachmarkWithBeacon({ label: testingLabel });
    expect(screen.getByLabelText(testingLabel)).toBeInTheDocument();
  });

  it('forwards a ref to the containing node', () => {
    const testRef = createRef<HTMLDivElement>();
    renderCoachmarkWithBeacon({ ref: testRef });
    expect(testRef.current).toHaveClass(blockClass);
  });

  it('adds the data-component-name attribute to the containing node', () => {
    renderCoachmarkWithBeacon();
    expect(screen.getByTestId(childDataTestId)).toHaveAttribute(
      'data-component-name',
      componentName
    );
  });

  it('applies kind class to the containing node', () => {
    renderCoachmarkWithBeacon({ kind: BEACON_KIND.DEFAULT });
    expect(screen.getByTestId(childDataTestId)).toHaveClass(
      `${blockClass}-default`
    );
  });
});
