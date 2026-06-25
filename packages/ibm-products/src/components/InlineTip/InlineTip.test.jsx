/**
 * Copyright IBM Corp. 2023, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { setupJestCanvasMock } from 'jest-canvas-mock';
import userEvent from '@testing-library/user-event';

import { pkg } from '../../settings';
import uuidv4 from '../../global/js/utils/uuidv4';

import { InlineTip, InlineTipButton, InlineTipLink } from '.';
import InlineTipImage from './storybook_assets/inline-tip-image.png';

const blockClass = `${pkg.prefix}--inline-tip`;
const componentName = InlineTip.displayName;

// values to use
const title = `title (${uuidv4()})`;
const children = `hello, world (${uuidv4()})`;
const buttonLabel = `Click me (${uuidv4()})`;
const tertiaryButtonLabel = `Show me (${uuidv4()})`;
const linkLabel = `Learn more (${uuidv4()})`;
const readMoreLabel = `Read more (${uuidv4()})`;
const readLessLabel = `Read less (${uuidv4()})`;
const className = `class-${uuidv4()}`;
const dataTestId = uuidv4();

describe(componentName, () => {
  it('renders a component InlineTip', () => {
    render(<InlineTip title={title}>{children}</InlineTip>);
    expect(screen.getByRole('complementary')).toHaveClass(blockClass);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <InlineTip title={title}>{children}</InlineTip>
    );
    await expect(container).toBeAccessible(componentName);
    await expect(container).toHaveNoAxeViolations();
  });

  it(`renders children`, () => {
    render(<InlineTip title={title}>{children}</InlineTip>);
    screen.getByText(children);
  });

  it(`renders ghost button`, () => {
    render(
      <InlineTip
        title={title}
        action={
          <InlineTipButton onClick={() => {}}>{buttonLabel}</InlineTipButton>
        }
      >
        {children}
      </InlineTip>
    );
    screen.getByText(buttonLabel);
  });

  it(`renders link`, () => {
    render(
      <InlineTip
        title={title}
        action={
          <InlineTipLink href="https://www.ibm.com" target="_blank">
            {linkLabel}
          </InlineTipLink>
        }
      >
        {children}
      </InlineTip>
    );
    screen.getByText(linkLabel);
  });

  it(`renders icon button with 'x' icon`, () => {
    render(
      <InlineTip title={title} onClose={() => {}}>
        {children}
      </InlineTip>
    );
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });

  it(`renders tertiary button with 'crossroads' icon`, () => {
    render(
      <InlineTip title={title} tertiaryButtonLabel={tertiaryButtonLabel}>
        {children}
      </InlineTip>
    );
    screen.getByText(tertiaryButtonLabel);
  });

  it(`renders collapsible, collapsed`, () => {
    render(
      <InlineTip
        title={title}
        collapsible
        expandButtonLabel={readMoreLabel}
        tertiaryButtonLabel={readLessLabel}
      >
        {children}
      </InlineTip>
    );
    screen.getByText(readMoreLabel);
  });

  it(`renders collapsible, expanded`, () => {
    render(
      <InlineTip
        title={title}
        collapsible
        expandButtonLabel={readMoreLabel}
        tertiaryButtonLabel={readLessLabel}
      >
        {children}
      </InlineTip>
    );
    const { click } = userEvent;
    click(screen.getByRole('button', { name: readMoreLabel }));
    expect(screen.getByText(readLessLabel)).toBeInTheDocument();
  });

  it(`renders an image`, () => {
    render(
      <InlineTip
        title={title}
        renderMedia={() => <img alt="img" src={InlineTipImage} />}
      >
        {children}
      </InlineTip>
    );
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it(`renders in the narrow format`, () => {
    render(
      <InlineTip title={title} narrow>
        {children}
      </InlineTip>
    );
    expect(screen.getByRole('complementary')).toHaveClass(blockClass);
  });

  it('applies className to the containing node', () => {
    render(
      <InlineTip title={title} className={className}>
        {children}
      </InlineTip>
    );
    expect(screen.getByRole('complementary')).toHaveClass(className);
  });

  it('adds additional props to the containing node', () => {
    render(
      <InlineTip title={title} data-testid={dataTestId}>
        {children}
      </InlineTip>
    );
    screen.getByTestId(dataTestId);
  });

  it('forwards a ref to an appropriate node', () => {
    const ref = React.createRef();
    render(
      <InlineTip title={title} ref={ref}>
        {children}
      </InlineTip>
    );
    expect(ref.current).toHaveClass(blockClass);
  });

  it('adds the Devtools attribute to the containing node', () => {
    render(
      <InlineTip title={title} data-testid={dataTestId}>
        {children}
      </InlineTip>
    );

    expect(screen.getByTestId(dataTestId)).toHaveDevtoolsAttribute(
      componentName
    );
  });
});
