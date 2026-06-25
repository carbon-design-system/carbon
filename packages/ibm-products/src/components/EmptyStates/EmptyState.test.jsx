/**
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { fireEvent, render, screen, act } from '@testing-library/react';
import React from 'react';

import uuidv4 from '../../global/js/utils/uuidv4';
import { pkg } from '../../settings';
import { expectError, required } from '../../global/js/utils/test-helper';
import { EmptyState } from '.';
import { NoDataEmptyState } from './NoDataEmptyState';
import { ErrorEmptyState } from './ErrorEmptyState';
import { NoTagsEmptyState } from './NoTagsEmptyState';
import { NotFoundEmptyState } from './NotFoundEmptyState';
import { NotificationsEmptyState } from './NotificationsEmptyState';
import { UnauthorizedEmptyState } from './UnauthorizedEmptyState';
import CustomIllustration from './story_assets/empty-state-bright-magnifying-glass.svg';

const dataTestId = uuidv4();
const className = uuidv4();
const blockClass = `${pkg.prefix}--empty-state`;
const { name } = EmptyState;

const defaultProps = {
  title: 'Empty state title',
  subtitle: 'Empty state subtitle',
  illustrationDescription: 'Test alt text',
};

describe(name, () => {
  it('should render empty state header and call the action', async () => {
    const { click } = fireEvent;
    const { fn } = jest;
    const onActionHandler = fn();

    const { getByText } = render(
      <EmptyState
        action={{
          text: 'Create new',
          onClick: onActionHandler,
        }}
        {...defaultProps}
      />
    );

    await act(() => click(getByText('Create new')));
    expect(onActionHandler).toBeCalled();
  });

  it('should render a clickable link and match rendered url to linkUrl prop', async () => {
    render(
      <EmptyState
        link={{
          text: 'View documentation',
          href: 'https://www.carbondesignsystem.com/',
        }}
        {...defaultProps}
      />
    );
    const link = screen.getByRole('link', { name: 'View documentation' });
    expect(link.href).toEqual('https://www.carbondesignsystem.com/');
  });

  it('should render title by passing string', async () => {
    render(<EmptyState {...defaultProps} />);
    screen.getAllByText('Empty state title');
  });

  it('should render title by passing node', async () => {
    render(
      <EmptyState
        title={<span>Custom title</span>}
        subtitle="Empty state subtitle"
      />
    );
    screen.getByText('Custom title');
  });

  it('should render subtitle by passing string', async () => {
    render(<EmptyState {...defaultProps} />);
    screen.getByText('Empty state subtitle');
  });

  it('should render subtitle by passing node', async () => {
    render(
      <EmptyState
        title="Empty state header"
        subtitle={<span>This is the subtitle of the empty state</span>}
      />
    );
    screen.getByText('This is the subtitle of the empty state');
  });

  it('should render a custom illustration', async () => {
    const { container } = render(
      <EmptyState {...defaultProps} illustration={CustomIllustration} />
    );
    const customIllustrationElement = container.querySelector('img');
    expect(customIllustrationElement).toBeTruthy();
    screen.getByAltText(/Test alt text/);
  });

  it('forwards a ref to an appropriate node', async () => {
    const ref = React.createRef();
    render(<EmptyState {...defaultProps} ref={ref} />);
    expect(ref.current.classList.contains(blockClass)).toBeTruthy();
  });

  it('adds the Devtools attribute to the containing node', async () => {
    render(<EmptyState {...defaultProps} data-testid={dataTestId} />);

    expect(screen.getByTestId(dataTestId)).toHaveDevtoolsAttribute(
      EmptyState.displayName
    );
  });

  it('applies className to the containing node', async () => {
    render(<EmptyState {...defaultProps} className={className} />);
    expect(
      screen.getByText(/Empty state title/).parentElement.parentElement
    ).toHaveClass(className);
  });

  it('renders the small size Empty state', async () => {
    render(<EmptyState {...defaultProps} size="sm" />);
    const smallTitleClassName = `${blockClass}__header--small`;
    expect(screen.getByText(/Empty state title/)).toHaveClass(
      smallTitleClassName
    );
  });

  it('adds additional properties to the containing node', async () => {
    const { container } = render(
      <EmptyState {...defaultProps} data-testid={dataTestId} />
    );
    expect(
      container.querySelector(`.${blockClass}[data-testid="${dataTestId}"]`)
    ).toBeInTheDocument();
  });

  it('should render the NoDataEmptyState', async () => {
    const { container, rerender } = render(
      <NoDataEmptyState {...defaultProps} />
    );
    expect(container.querySelector('svg')).toBeTruthy();
    rerender(<NoDataEmptyState {...defaultProps} illustrationTheme="dark" />);
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it("adds the Devtools attribute to the `NoDataEmptyState`'s containing node", async () => {
    render(<NoDataEmptyState {...defaultProps} data-testid={dataTestId} />);

    expect(screen.getByTestId(dataTestId)).toHaveDevtoolsAttribute(
      NoDataEmptyState.displayName
    );
  });

  it('should render the ErrorEmptyState component', async () => {
    const { container, rerender } = render(
      <ErrorEmptyState {...defaultProps} />
    );
    expect(container.querySelector('svg')).toBeTruthy();
    rerender(<ErrorEmptyState {...defaultProps} illustrationTheme="dark" />);
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it("adds the Devtools attribute to the `ErrorEmptyState`'s containing node", async () => {
    render(<ErrorEmptyState {...defaultProps} data-testid={dataTestId} />);

    expect(screen.getByTestId(dataTestId)).toHaveDevtoolsAttribute(
      ErrorEmptyState.displayName
    );
  });

  it('should render the NoTagsEmptyState component', async () => {
    const { container, rerender } = render(
      <NoTagsEmptyState {...defaultProps} />
    );
    expect(container.querySelector('svg')).toBeTruthy();
    rerender(<NoTagsEmptyState {...defaultProps} illustrationTheme="dark" />);
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it("adds the Devtools attribute to the `NoTagsEmptyState`'s containing node", async () => {
    render(<NoTagsEmptyState {...defaultProps} data-testid={dataTestId} />);

    expect(screen.getByTestId(dataTestId)).toHaveDevtoolsAttribute(
      NoTagsEmptyState.displayName
    );
  });

  it('should render the NotFoundEmptyState component', async () => {
    const { container, rerender } = render(
      <NotFoundEmptyState {...defaultProps} />
    );
    expect(container.querySelector('svg')).toBeTruthy();
    rerender(<NotFoundEmptyState {...defaultProps} illustrationTheme="dark" />);
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it("adds the Devtools attribute to the `NotFoundEmptyState`'s containing node", async () => {
    render(<NotFoundEmptyState {...defaultProps} data-testid={dataTestId} />);

    expect(screen.getByTestId(dataTestId)).toHaveDevtoolsAttribute(
      NotFoundEmptyState.displayName
    );
  });

  it('should render the NotificationsEmptyState component', async () => {
    const { container, rerender } = render(
      <NotificationsEmptyState {...defaultProps} />
    );
    expect(container.querySelector('svg')).toBeTruthy();
    rerender(
      <NotificationsEmptyState {...defaultProps} illustrationTheme="dark" />
    );
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it("adds the Devtools attribute to the `NotificationsEmptyState`'s containing node", async () => {
    render(
      <NotificationsEmptyState {...defaultProps} data-testid={dataTestId} />
    );

    expect(screen.getByTestId(dataTestId)).toHaveDevtoolsAttribute(
      NotificationsEmptyState.displayName
    );
  });

  it('should render the UnauthorizedEmptyState component', async () => {
    const { container, rerender } = render(
      <UnauthorizedEmptyState {...defaultProps} />
    );
    expect(container.querySelector('svg')).toBeTruthy();
    rerender(
      <UnauthorizedEmptyState {...defaultProps} illustrationTheme="dark" />
    );
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it("adds the Devtools attribute to the `UnauthorizedEmptyState`'s containing node", async () => {
    render(
      <UnauthorizedEmptyState {...defaultProps} data-testid={dataTestId} />
    );

    expect(screen.getByTestId(dataTestId)).toHaveDevtoolsAttribute(
      UnauthorizedEmptyState.displayName
    );
  });
});
