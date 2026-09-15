/**
 * Copyright IBM Corp. 2024, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';

import { Coachmark } from '../../index';
import { CoachmarkTagline } from '../index';
import Button from '../../../Button';

const prefix = 'cds';
const blockClass = `${prefix}--coachmark-tagline`;
const componentName = CoachmarkTagline.displayName;

const childDataTestId = 'coachmark-tagline-test';
const className = 'test-class-tagline';

const renderCoachmarkWithTagline = ({ ...rest } = {}) =>
  render(
    <Coachmark>
      <CoachmarkTagline
        title="Why are there two types of severity scores?"
        closeIconDescription="Close"
        buttonProps={{ id: 'CoachmarkTagline' }}
        data-testid={childDataTestId}
        {...rest}
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

  it('renders a component CoachmarkTagline', () => {
    renderCoachmarkWithTagline();
    expect(screen.getByTestId(childDataTestId)).toHaveClass(blockClass);
  });

  it('has no accessibility violations', async () => {
    const { container } = renderCoachmarkWithTagline();
    await expect(container).toHaveNoAxeViolations();
  });

  it('applies className to the containing node', () => {
    renderCoachmarkWithTagline({ className });
    expect(screen.getByTestId(childDataTestId)).toHaveClass(className);
  });

  it('renders a button with the title as label', () => {
    const testingLabel = 'custom-tagline-title';
    renderCoachmarkWithTagline({ title: testingLabel });
    expect(
      screen.getByRole('button', { name: testingLabel })
    ).toBeInTheDocument();
  });

  it('forwards a ref to the containing node', () => {
    const testRef = React.createRef();
    renderCoachmarkWithTagline({ ref: testRef });
    expect(testRef.current).toHaveClass(blockClass);
  });

  it('adds the data-component-name attribute to the containing node', () => {
    renderCoachmarkWithTagline();
    expect(screen.getByTestId(childDataTestId)).toHaveAttribute(
      'data-component-name',
      componentName
    );
  });
});
