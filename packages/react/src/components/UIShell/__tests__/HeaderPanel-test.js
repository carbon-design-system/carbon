/**
 * Copyright IBM Corp. 2022, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import Header from '../Header';
import HeaderGlobalAction from '../HeaderGlobalAction';
import HeaderGlobalBar from '../HeaderGlobalBar';
import { PrefixContext } from '../../../internal/usePrefix';
import HeaderPanel from '../HeaderPanel';
import Switcher from '../Switcher';
import SwitcherItem from '../SwitcherItem';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('HeaderPanel', () => {
  describe('renders as expected - Component API', () => {
    it('should spread extra props onto outermost element', () => {
      const { container } = render(
        <HeaderPanel aria-label="aria-label" data-testid="test-id" />
      );

      expect(container.firstChild).toHaveAttribute('data-testid', 'test-id');
    });

    it('should respect aria-label prop', () => {
      const { container } = render(<HeaderPanel aria-label="test-aria" />);

      expect(container.firstChild).toHaveAttribute('aria-label', 'test-aria');
    });

    it('should respect aria-labelledby prop', () => {
      const { container } = render(
        <HeaderPanel aria-labelledby="test-aria-labelledby" />
      );

      expect(container.firstChild).toHaveAttribute(
        'aria-labelledby',
        'test-aria-labelledby'
      );
    });

    it('should support a custom `className` prop on the outermost element', () => {
      const { container } = render(
        <HeaderPanel aria-label="test-aria" className="custom-class" />
      );

      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should respect expanded prop', () => {
      const { container } = render(
        <HeaderPanel aria-label="test-aria" expanded />
      );

      expect(container.firstChild).toHaveClass('cds--header-panel--expanded');
    });

    it('should render children as expected', () => {
      render(
        <HeaderPanel aria-label="test-aria">
          <div className="child">Test</div>
          <div className="child">Test</div>
        </HeaderPanel>
      );

      const childrenArray = screen.getAllByText('Test');
      expect(childrenArray.length).toEqual(2);
    });

    it('should call `onHeaderPanelFocus` callback, when defined', async () => {
      const onHeaderPanelFocus = jest.fn();
      render(
        <HeaderPanel onHeaderPanelFocus={onHeaderPanelFocus} expanded>
          <button type="button">Test</button>
        </HeaderPanel>
      );

      screen.getByRole('button', { name: 'Test' }).focus();
      await userEvent.keyboard('{Escape}');

      expect(onHeaderPanelFocus).toHaveBeenCalled();
    });

    it('should not error when `onHeaderPanelFocus` is not defined', async () => {
      render(
        <HeaderPanel>
          <button type="button">Test</button>
        </HeaderPanel>
      );

      await expect(async () => {
        screen.getByRole('button', { name: 'Test' }).focus();
        await userEvent.keyboard('{Escape}');
      }).not.toThrow();
    });

    it('should handle click', async () => {
      const onClick = jest.fn();

      render(
        <HeaderPanel
          aria-label="test-aria"
          expanded
          href="#"
          onHeaderPanelFocus={onClick}>
          <Switcher aria-label="Switcher Container">
            <SwitcherItem aria-label="Link 1" href="#">
              Link 1
            </SwitcherItem>
          </Switcher>
        </HeaderPanel>
      );

      await userEvent.click(document.body);

      expect(onClick).toHaveBeenCalled();
    });

    it('should handle onKeyDown', async () => {
      const onKeyDown = jest.fn();

      render(
        <HeaderPanel
          expanded
          href="#"
          onHeaderPanelFocus={onKeyDown}
          data-testid="header-panel">
          <button type="button">Test</button>
        </HeaderPanel>
      );

      screen.getByRole('button', { name: 'Test' }).focus();

      await userEvent.keyboard('{Escape}');
      expect(onKeyDown).toHaveBeenCalled();
    });

    it('should handle onBlur', async () => {
      const onBlur = jest.fn();

      render(
        <HeaderPanel href="#" expanded onHeaderPanelFocus={onBlur}>
          <div>Panel Content</div>
        </HeaderPanel>
      );

      const panel = screen.getByText('Panel Content').parentElement;
      fireEvent.blur(panel, {
        relatedTarget: null,
      });

      expect(onBlur).toHaveBeenCalled();
    });
  });

  it('should call `onHeaderPanelFocus` when child is a `Switcher` component and a click occurs outside the header panel', async () => {
    const onHeaderPanelFocus = jest.fn();
    render(
      <HeaderPanel expanded href="#" onHeaderPanelFocus={onHeaderPanelFocus}>
        <Switcher aria-label="Switcher Container">
          <SwitcherItem aria-label="Link 1" href="#">
            Link 1
          </SwitcherItem>
        </Switcher>
      </HeaderPanel>
    );

    await userEvent.click(document.body);

    expect(onHeaderPanelFocus).toHaveBeenCalled();
  });

  it('should not call `onHeaderPanelFocus` when child is not a `Switcher` component', async () => {
    const onHeaderPanelFocus = jest.fn();
    render(
      <HeaderPanel expanded href="#" onHeaderPanelFocus={onHeaderPanelFocus}>
        <div>Not a Switcher</div>
      </HeaderPanel>
    );

    await userEvent.click(document.body);

    expect(onHeaderPanelFocus).not.toHaveBeenCalled();
  });
});

describe('HeaderPanel Switcher focus boundary', () => {
  function Fixture({ prefix = 'cds', addFocusListeners = true }) {
    const [expanded, setExpanded] = useState(true);
    return (
      <PrefixContext.Provider value={prefix}>
        <Header aria-label="Example header">
          <a href="#brand">Brand</a>
          <HeaderGlobalBar>
            <HeaderGlobalAction aria-label="Search">
              <span />
            </HeaderGlobalAction>
            <HeaderGlobalAction aria-label="Notifications">
              <span />
            </HeaderGlobalAction>
            <HeaderGlobalAction aria-label="Switcher" aria-expanded={expanded}>
              <span />
            </HeaderGlobalAction>
          </HeaderGlobalBar>
          <HeaderPanel
            aria-label="Panel"
            expanded={expanded}
            addFocusListeners={addFocusListeners}
            onHeaderPanelFocus={() => setExpanded(false)}>
            <Switcher aria-label="Applications" expanded={expanded}>
              <SwitcherItem href="#one">One</SwitcherItem>
              <SwitcherItem href="#two">Two</SwitcherItem>
            </Switcher>
          </HeaderPanel>
        </Header>
        <Header aria-label="Other header">
          <HeaderGlobalAction aria-label="Other action">
            <span />
          </HeaderGlobalAction>
        </Header>
      </PrefixContext.Provider>
    );
  }

  it.each(['cds', 'custom'])(
    'keeps the panel open while reverse tabbing through %s header actions',
    async (prefix) => {
      render(<Fixture prefix={prefix} />);
      screen.getByRole('link', { name: 'One' }).focus();

      for (const name of ['Switcher', 'Notifications', 'Search']) {
        await userEvent.tab({ shift: true });
        expect(screen.getByRole('button', { name })).toHaveFocus();
        expect(screen.getByLabelText('Panel')).toHaveClass(
          `${prefix}--header-panel--expanded`
        );
      }

      await userEvent.tab({ shift: true });
      expect(screen.getByRole('link', { name: 'Brand' })).toHaveFocus();
      expect(screen.getByLabelText('Panel')).not.toHaveClass(
        `${prefix}--header-panel--expanded`
      );
    }
  );

  it('keeps the panel open when returning from an action to its links', async () => {
    render(<Fixture />);
    screen.getByRole('link', { name: 'One' }).focus();
    await userEvent.tab({ shift: true });
    await userEvent.tab();
    expect(screen.getByRole('link', { name: 'One' })).toHaveFocus();
    expect(screen.getByLabelText('Panel')).toHaveClass(
      'cds--header-panel--expanded'
    );
  });

  it('closes when tabbing from the panel into a different header', async () => {
    render(<Fixture />);
    screen.getByRole('link', { name: 'Two' }).focus();
    await userEvent.tab();
    expect(screen.getByRole('button', { name: 'Other action' })).toHaveFocus();
    expect(screen.getByLabelText('Panel')).not.toHaveClass(
      'cds--header-panel--expanded'
    );
  });

  it('closes when an action loses focus without a related target', async () => {
    render(<Fixture />);
    screen.getByRole('link', { name: 'One' }).focus();
    await userEvent.tab({ shift: true });
    expect(screen.getByLabelText('Panel')).toHaveClass(
      'cds--header-panel--expanded'
    );
    fireEvent.blur(screen.getByRole('button', { name: 'Switcher' }), {
      relatedTarget: null,
    });
    expect(screen.getByLabelText('Panel')).not.toHaveClass(
      'cds--header-panel--expanded'
    );
  });

  it('respects addFocusListeners=false when focus leaves the header actions', async () => {
    render(<Fixture addFocusListeners={false} />);
    screen.getByRole('button', { name: 'Search' }).focus();
    await userEvent.tab({ shift: true });
    expect(screen.getByLabelText('Panel')).toHaveClass(
      'cds--header-panel--expanded'
    );
  });

  it('still closes on Escape after returning to the panel', async () => {
    render(<Fixture />);
    screen.getByRole('link', { name: 'One' }).focus();
    await userEvent.tab({ shift: true });
    await userEvent.tab();
    expect(screen.getByLabelText('Panel')).toHaveClass(
      'cds--header-panel--expanded'
    );
    await userEvent.keyboard('{Escape}');
    expect(screen.getByLabelText('Panel')).not.toHaveClass(
      'cds--header-panel--expanded'
    );
  });
});
