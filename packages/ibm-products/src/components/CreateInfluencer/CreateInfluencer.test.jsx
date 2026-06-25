/**
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { CreateInfluencer } from '.';

import { carbon, pkg } from '../../settings';
const blockClass = `${pkg.prefix}--create-influencer`;

const renderComponent = ({ ...rest } = {}) =>
  render(<CreateInfluencer {...rest} />);

describe(CreateInfluencer.displayName, () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders the CreateInfluencer component', async () => {
    const { container } = renderComponent({
      stepData: [
        {
          title: 'Step 1',
        },
        {
          title: 'Step 2',
        },
      ],
      className: 'some-test-class-name',
      currentStep: 1,
    });
    expect(container.firstChild).toHaveClass(blockClass);
  });
  it('renders nothing inside of the influencer when an intro step is provided', async () => {
    const influencerClass = `${blockClass}__left-nav`;
    const step1Title = 'Step 1 title';
    const step2Title = 'Step 2 title';
    const introTitle = 'Intro title';
    const { container } = renderComponent({
      stepData: [
        {
          introStep: true,
          title: introTitle,
          shouldIncludeStep: true,
        },
        {
          title: step1Title,
          shouldIncludeStep: true,
        },
        {
          title: step2Title,
          shouldIncludeStep: true,
        },
      ],
      className: 'some-test-class-name',
      currentStep: 1,
    });
    const influencerElement = container.querySelector(`.${influencerClass}`);
    expect(influencerElement).toBeEmptyDOMElement();
    // Progress indicator should render after the intro step
    renderComponent({
      stepData: [
        {
          introStep: true,
          title: introTitle,
          shouldIncludeStep: true,
        },
        {
          title: step1Title,
          shouldIncludeStep: true,
        },
        {
          title: step2Title,
          shouldIncludeStep: true,
        },
      ],
      className: 'some-test-class-name',
      currentStep: 2,
    });
    screen.getByText(step1Title);
  });
  it('renders the influencer title if the "title" prop is provided', async () => {
    const { container } = renderComponent({
      stepData: [{ title: 'Step 1' }, { title: 'Step 2' }],
      title: 'Create asset',
      className: 'some-test-class-name',
      currentStep: 1,
    });
    expect(
      container.querySelector(`.${blockClass}__title`)
    ).toBeInTheDocument();
    expect(container.querySelector(`.${blockClass}__title`)).toHaveTextContent(
      'Create asset'
    );
  });
  it("doesn't renders the influencer title if the 'title' prop is not provided", async () => {
    const { container } = renderComponent({
      stepData: [{ title: 'Step 1' }, { title: 'Step 2' }],
      className: 'some-test-class-name',
      currentStep: 1,
    });
    expect(
      container.querySelector(`.${blockClass}__title`)
    ).not.toBeInTheDocument();
  });

  it('renders an error icon if the step invalid prop is set to true', async () => {
    renderComponent({
      stepData: [
        { title: 'Step 1', invalid: true, shouldIncludeStep: true },
        { title: 'Step 2', invalid: false, shouldIncludeStep: true },
        { title: 'Step 3', shouldIncludeStep: true },
      ],
      className: 'some-test-class-name',
      currentStep: 1,
    });

    expect(
      screen
        .getByRole('button', { description: 'Step 1' })
        .querySelector(`.${carbon.prefix}--progress__warning`)
    ).toBeInTheDocument();
    expect(
      screen
        .getByRole('button', { description: 'Step 2' })
        .querySelector(`.${carbon.prefix}--progress__warning`)
    ).not.toBeInTheDocument();
    expect(
      screen
        .getByRole('button', { description: 'Step 3' })
        .querySelector(`.${carbon.prefix}--progress__warning`)
    ).not.toBeInTheDocument();
  });
});
