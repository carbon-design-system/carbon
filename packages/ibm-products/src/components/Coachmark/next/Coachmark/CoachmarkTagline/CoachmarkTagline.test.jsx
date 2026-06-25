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
import { CoachmarkTagline } from '.';
import { Button } from '@carbon/react';

const blockClass = `${pkg.prefix}--coachmark-tagline`;
const componentName = CoachmarkTagline.displayName;

// values to use
const childDataTestId = `CoachmarkTagline-${uuidv4()}`;
const className = `class-${uuidv4()}`;

const renderCoachmarkWithTagline = ({ ...rest } = {}) =>
  render(
    <Coachmark>
      <CoachmarkTagline
        title="Why are there two types of severity scores?"
        closeIconDescription="Close"
        buttonProps={{ id: 'CoachmarkTagline' }}
        data-testid={childDataTestId}
        {...rest}
      ></CoachmarkTagline>
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
  it('renders a component CoachmarkTagline', () => {
    renderCoachmarkWithTagline();
    expect(screen.getByTestId(childDataTestId)).toHaveClass(blockClass);
  });

  it('has no accessibility violations', async () => {
    const { container } = renderCoachmarkWithTagline();
    await expect(container).toBeAccessible(componentName);
    await expect(container).toHaveNoAxeViolations();
  });

  it('applies className to the containing node', () => {
    renderCoachmarkWithTagline({ className });
    expect(screen.getByTestId(childDataTestId)).toHaveClass(className);
  });

  it('adds additional props to the containing node', () => {
    const testingLabel = `testing-labels-${uuidv4()}`;
    renderCoachmarkWithTagline({
      title: testingLabel,
    });
    expect(
      screen.getByRole('button', { name: testingLabel })
    ).toBeInTheDocument();
  });

  it('forwards a ref to an appropriate node', () => {
    const testRef = React.createRef();
    renderCoachmarkWithTagline({ ref: testRef });
    expect(testRef.current).toHaveClass(blockClass);
  });

  it('adds the Devtools attribute to the containing node', () => {
    renderCoachmarkWithTagline();
    expect(screen.getByTestId(childDataTestId)).toHaveDevtoolsAttribute(
      componentName
    );
  });
});
