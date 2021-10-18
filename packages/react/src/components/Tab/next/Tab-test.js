import React from 'react';
import { default as Tab } from './Tab';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Tab', () => {
  it('adds extra classes that are passed via className', async () => {
    render(
      <Tab
        className="custom-class"
        label="Tab 1"
        onClick={() => {}}
        onKeyDown={() => {}}
        selected={false}>
        <p>Content for first tab goes here.</p>
      </Tab>
    );

    await expect(
      screen.getByRole('presentation').classList.contains('custom-class')
    ).toBe(true);
  });

  it('sets tabIndex on <button> if one is passed via props', async () => {
    render(
      <Tab
        label="Tab 1"
        // eslint-disable-next-line jsx-a11y/tabindex-no-positive
        tabIndex={2}
        onClick={() => {}}
        onKeyDown={() => {}}
        selected={false}>
        <p>Content for first tab goes here.</p>
      </Tab>
    );

    await expect(screen.getByRole('tab').tabIndex).toEqual(2);
  });

  it('renders <li> with [role="presentation"]', async () => {
    render(
      <Tab
        className="custom-class"
        label="Tab 1"
        onClick={() => {}}
        onKeyDown={() => {}}
        selected={false}>
        <p>Content for first tab goes here.</p>
      </Tab>
    );

    await expect(screen.getByRole('presentation')).toBeTruthy();
  });

  it('renders <button> with tabindex set to 0 by default', async () => {
    render(
      <Tab
        label="Tab 1"
        onClick={() => {}}
        onKeyDown={() => {}}
        selected={false}>
        <p>Content for first tab goes here.</p>
      </Tab>
    );

    await expect(screen.getByRole('tab').tabIndex).toEqual(0);
  });

  it('renders <button> with tabindex set to -1 if disabled', async () => {
    render(
      <Tab
        label="Tab 1"
        onClick={() => {}}
        onKeyDown={() => {}}
        selected={false}
        disabled>
        <p>Content for first tab goes here.</p>
      </Tab>
    );

    await expect(screen.getByRole('tab').tabIndex).toEqual(-1);
  });

  it('uses label to set children on <button> when passed via props', async () => {
    render(
      <Tab
        label="Tab 1"
        onClick={() => {}}
        onKeyDown={() => {}}
        selected={false}>
        <p>Content for first tab goes here.</p>
      </Tab>
    );

    await expect(screen.getByRole('tab').textContent).toBe('Tab 1');
  });

  it('has aria-disabled that matches disabled', async () => {
    render(
      <Tab
        label="Tab 1"
        onClick={() => {}}
        onKeyDown={() => {}}
        selected={false}
        disabled>
        <p>Content for first tab goes here.</p>
      </Tab>
    );

    await expect(screen.getByRole('tab')).toHaveAttribute('aria-disabled');
  });
});

describe('Click events', () => {
  it('invokes handleTabClick from handleTabClick prop', async () => {
    const handleTabClick = jest.fn();
    render(
      <Tab
        label="Tab 1"
        handleTabClick={handleTabClick}
        onClick={() => {}}
        onKeyDown={() => {}}
        selected={false}>
        <p>Content for first tab goes here.</p>
      </Tab>
    );

    const button = screen.getByRole('tab');
    userEvent.click(button);
    await expect(handleTabClick).toHaveBeenCalled();
  });

  it('invokes onClick when a function is passed to onClick prop', async () => {
    const onClick = jest.fn();

    render(
      <Tab
        label="Tab 1"
        onClick={onClick}
        onKeyDown={() => {}}
        selected={false}>
        <p>Content for first tab goes here.</p>
      </Tab>
    );

    const button = screen.getByRole('tab');
    userEvent.click(button);
    await expect(onClick).toHaveBeenCalled();
  });

  it('does not invoke click handler if tab is disabled', async () => {
    const onClick = jest.fn();

    render(
      <Tab
        label="Tab 1"
        onClick={onClick}
        onKeyDown={() => {}}
        selected={false}
        disabled>
        <p>Content for first tab goes here.</p>
      </Tab>
    );

    const button = screen.getByRole('tab');
    userEvent.click(button);
    await expect(onClick).not.toHaveBeenCalled();
  });
});

describe('Keyboard events', () => {
  it('invokes onKeyDown from onKeyDown prop', async () => {
    const onKeyDown = jest.fn();
    render(
      <Tab label="Tab 1" onClick={() => {}} onKeyDown={onKeyDown} selected>
        <p>Content for first tab goes here.</p>
      </Tab>
    );

    const button = screen.getByRole('tab');
    userEvent.type(button, '[ArrowLeft]');

    await expect(onKeyDown).toHaveBeenCalled();
  });

  it('invokes handleTabKeyDown from handleTabKeyDown prop', async () => {
    const handleTabKeyDown = jest.fn();
    render(
      <Tab
        label="Tab 1"
        onClick={() => {}}
        onKeyDown={() => {}}
        handleTabKeyDown={handleTabKeyDown}
        selected>
        <p>Content for first tab goes here.</p>
      </Tab>
    );

    const button = screen.getByRole('tab');
    userEvent.type(button, '[ArrowRight]');

    await expect(handleTabKeyDown).toHaveBeenCalled();
  });
});
