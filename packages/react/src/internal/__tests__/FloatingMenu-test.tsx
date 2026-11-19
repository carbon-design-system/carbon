/**
 * Copyright IBM Corp. 2026
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
import React, { Profiler, type ComponentProps } from 'react';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { enabled } from '@carbon/feature-flags';
import { FloatingMenu } from '../FloatingMenu';
import type { MenuOffset, Offset } from '../FloatingMenu';
import { OptimizedResize } from '../OptimizedResize';
import { warning } from '../warning';
import { wrapFocus, wrapFocusWithoutSentinels } from '../wrapFocus';

jest.mock('@carbon/feature-flags', () => ({
  enabled: jest.fn(),
}));

jest.mock('../warning', () => ({
  warning: jest.fn(),
}));

jest.mock('../wrapFocus', () => ({
  wrapFocus: jest.fn(),
  wrapFocusWithoutSentinels: jest.fn(),
}));

const mockedEnabled = jest.mocked(enabled);
const mockedWarning = jest.mocked(warning);
const mockedWrapFocus = jest.mocked(wrapFocus);
const mockedWrapFocusWithoutSentinels = jest.mocked(wrapFocusWithoutSentinels);

const defaultMenuChildren = (
  <div data-testid="menu">
    <button type="button">Menu item</button>
  </div>
);
const defaultMenuOffset = { top: 5, left: 7 };

const createRect = (
  values?: Partial<
    Pick<DOMRect, 'left' | 'top' | 'right' | 'bottom' | 'width' | 'height'>
  >
) => ({
  x: values?.left ?? 0,
  y: values?.top ?? 0,
  width: values?.width ?? 0,
  height: values?.height ?? 0,
  top: values?.top ?? 0,
  left: values?.left ?? 0,
  right: values?.right ?? (values?.left ?? 0) + (values?.width ?? 0),
  bottom: values?.bottom ?? (values?.top ?? 0) + (values?.height ?? 0),
  toJSON: () => {},
});

const removeByTestId = (testId: string) => {
  document
    .querySelectorAll(`[data-testid="${testId}"]`)
    .forEach((node) => node.parentNode?.removeChild(node));
};

const renderFloatingMenu = (
  options?: Partial<Omit<ComponentProps<typeof FloatingMenu>, 'triggerRef'>>
) => {
  const { children, ...props } = options ?? {};
  const resolvedChildren = children ?? defaultMenuChildren;
  const trigger = document.createElement('button');

  trigger.setAttribute('data-testid', 'trigger');
  document.body.appendChild(trigger);

  return render(
    <FloatingMenu triggerRef={{ current: trigger }} {...props}>
      {resolvedChildren}
    </FloatingMenu>
  );
};

describe('FloatingMenu', () => {
  let triggerRect: ReturnType<typeof createRect>;
  let targetRect: ReturnType<typeof createRect>;
  let menuRects: ReturnType<typeof createRect>[];

  beforeEach(() => {
    mockedEnabled.mockReturnValue(false);
    mockedWarning.mockClear();
    mockedWrapFocus.mockClear();
    mockedWrapFocusWithoutSentinels.mockClear();

    triggerRect = createRect({
      left: 10,
      top: 20,
      right: 30,
      bottom: 60,
      width: 20,
      height: 40,
    });
    targetRect = createRect({
      left: 0,
      top: 0,
      right: 1000,
      bottom: 800,
      width: 1000,
      height: 800,
    });
    menuRects = [createRect({ width: 100, height: 50 })];

    jest
      .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
      .mockImplementation(function getRect(this: HTMLElement) {
        const testId = this.getAttribute('data-testid');

        switch (testId) {
          case 'trigger':
            return triggerRect;
          case 'menu':
            if (menuRects.length > 1) {
              const rect = menuRects[0];

              menuRects.shift();

              return rect;
            }
            return menuRects[0];
          case 'portal-target':
            return targetRect;
          default:
            break;
        }
        if (this === document.body) {
          return createRect({ width: 1000, height: 800 });
        }

        return createRect();
      });
  });

  afterEach(() => {
    jest.restoreAllMocks();
    removeByTestId('trigger');
    removeByTestId('portal-target');
    removeByTestId('outside');
  });

  it('should position the menu below the trigger by default', async () => {
    renderFloatingMenu({
      menuOffset: defaultMenuOffset,
    });

    const menu = screen.getByTestId('menu');

    await waitFor(() => {
      expect(menu.style.left).toBe('-23px');
      expect(menu.style.top).toBe('65px');
    });

    expect(menu.style.position).toBe('absolute');
    expect(screen.getAllByText('Focus sentinel')).toHaveLength(2);
  });

  it.each([
    ['left', 'left', '-97px', '11px'],
    ['top', 'top', '-23px', '-35px'],
    ['right', 'right', '37px', '23px'],
  ] as const)(
    'should position the menu in the %s direction',
    async (_label, menuDirection, expectedLeft, expectedTop) => {
      renderFloatingMenu({
        menuDirection,
        menuOffset: defaultMenuOffset,
      });

      const menu = screen.getByTestId('menu');

      await waitFor(() => {
        expect(menu.style.left).toBe(expectedLeft);
        expect(menu.style.top).toBe(expectedTop);
      });
    }
  );

  it('should call `updateOrientation` and account for non-static target offsets', async () => {
    triggerRect = createRect({
      left: 250,
      top: 300,
      right: 290,
      bottom: 340,
      width: 40,
      height: 40,
    });
    targetRect = createRect({
      left: 200,
      top: 100,
      right: 900,
      bottom: 700,
      width: 700,
      height: 600,
    });

    const updateOrientation = jest.fn();
    const portalTarget = document.createElement('div');

    portalTarget.setAttribute('data-testid', 'portal-target');
    portalTarget.style.position = 'relative';
    document.body.appendChild(portalTarget);

    renderFloatingMenu({
      menuOffset: defaultMenuOffset,
      target: () => portalTarget,
      updateOrientation,
    });

    const menu = screen.getByTestId('menu');

    await waitFor(() => {
      expect(updateOrientation).toHaveBeenCalled();
      expect(menu.style.left).toBe('27px');
      expect(menu.style.top).toBe('245px');
    });
  });

  it('should support function `menuOffset` values', async () => {
    const menuOffset = jest.fn<Exclude<MenuOffset, Offset>>(
      () => defaultMenuOffset
    );

    renderFloatingMenu({
      flipped: true,
      menuOffset,
    });

    const menu = screen.getByTestId('menu');
    const trigger = screen.getByTestId('trigger');

    await waitFor(() => {
      expect(menu.style.left).toBe('-23px');
      expect(menu.style.top).toBe('65px');
    });

    expect(menuOffset.mock.calls).toContainEqual([
      menu,
      'bottom',
      trigger,
      true,
    ]);
  });

  it('should focus `selectorPrimaryFocus` when provided', async () => {
    renderFloatingMenu({
      selectorPrimaryFocus: '[data-testid="primary-focus"]',
      children: (
        <div data-testid="menu">
          <button type="button">First item</button>
          <button type="button" data-testid="primary-focus">
            Primary focus
          </button>
        </div>
      ),
    });

    await waitFor(() => {
      expect(screen.getByTestId('primary-focus')).toHaveFocus();
    });
  });

  it('should warn when the menu body node is unavailable during placement', async () => {
    const ChildWithoutRef = () => <div data-testid="menu" />;

    renderFloatingMenu({
      children: <ChildWithoutRef />,
    });

    await waitFor(() => {
      expect(warning).toHaveBeenCalledWith(
        false,
        expect.stringContaining(
          'The DOM node for menu body for calculating its position is not available'
        )
      );
    });
  });

  it('should call external `menuRef` with the menu element and null on unmount', async () => {
    const menuRef = jest.fn();

    const { unmount } = renderFloatingMenu({
      menuRef,
    });

    const menu = screen.getByTestId('menu');

    await waitFor(() => {
      expect(menuRef).toHaveBeenCalledWith(menu);
    });

    unmount();
    expect(menuRef).toHaveBeenLastCalledWith(null);
  });

  it('should not detach and reattach the menu ref after initial placement', async () => {
    const menuRef = jest.fn();

    renderFloatingMenu({
      menuRef,
      menuOffset: defaultMenuOffset,
    });

    const menu = screen.getByTestId('menu');

    await waitFor(() => {
      expect(menu.style.left).toBe('-23px');
      expect(menu.style.top).toBe('65px');
    });

    expect(menuRef).toHaveBeenCalledTimes(1);
    expect(menuRef).toHaveBeenCalledWith(menu);
  });

  it('should focus the menu body and call `onPlace` when no focusable child exists', async () => {
    const onPlace = jest.fn();

    renderFloatingMenu({
      children: <div data-testid="menu" tabIndex={-1} />,
      onPlace,
    });

    const menu = screen.getByTestId('menu');

    await waitFor(() => {
      expect(onPlace).toHaveBeenCalledWith(menu);
    });

    expect(menu).toHaveFocus();
    expect(warning).toHaveBeenCalledWith(
      true,
      expect.stringContaining(
        'Floating Menus must have at least a programmatically focusable child'
      )
    );
  });

  it('should call `wrapFocus` when `focusTrap` is enabled and focus leaves menu', async () => {
    renderFloatingMenu({
      focusTrap: true,
    });

    const menu = screen.getByTestId('menu');
    const menuButton = screen.getByRole('button', { name: 'Menu item' });
    const outsideButton = document.createElement('button');

    outsideButton.setAttribute('data-testid', 'outside');
    document.body.appendChild(outsideButton);
    fireEvent.blur(menuButton, { relatedTarget: outsideButton });

    await waitFor(() => {
      expect(wrapFocus).toHaveBeenCalledWith(
        expect.objectContaining({
          bodyNode: menu,
          currentActiveNode: outsideButton,
          oldActiveNode: menuButton,
          prefix: 'cds',
        })
      );
    });
  });

  it('should call `wrapFocusWithoutSentinels` on Tab when focus wrap flag is enabled', async () => {
    mockedEnabled.mockReturnValue(true);

    renderFloatingMenu();

    const menu = screen.getByTestId('menu');
    const { parentElement: wrapper } = menu;

    if (!wrapper) {
      throw new Error('Expected the floating menu wrapper to be rendered.');
    }

    expect(screen.queryByText('Focus sentinel')).not.toBeInTheDocument();

    fireEvent.keyDown(wrapper, { key: 'Tab' });

    await waitFor(() => {
      expect(wrapFocusWithoutSentinels).toHaveBeenCalledWith(
        expect.objectContaining({
          containerNode: menu,
          currentActiveNode: wrapper,
        })
      );
    });
  });

  it('should register a resize handler and remove it on unmount', () => {
    const remove = jest.fn();

    jest.spyOn(OptimizedResize, 'add').mockImplementation(() => ({ remove }));

    const { unmount } = renderFloatingMenu();

    expect(OptimizedResize.add).toHaveBeenCalled();

    unmount();
    expect(remove).toHaveBeenCalled();
  });

  it('should recalculate position when menu size changes during placement', async () => {
    menuRects = [
      createRect({ width: 100, height: 50 }),
      createRect({ width: 120, height: 50 }),
      createRect({ width: 120, height: 50 }),
    ];

    renderFloatingMenu();

    const menu = screen.getByTestId('menu');

    await waitFor(() => {
      expect(menu.style.left).toBe('-40px');
      expect(menu.style.top).toBe('60px');
    });
  });

  it('should not commit again when repeated resizes keep the same updated menu position', async () => {
    const remove = jest.fn();
    const onRender = jest.fn();
    const trigger = document.createElement('button');
    const triggerRef = { current: trigger };
    const target = () => document.body;
    let resizeCallback: Parameters<typeof OptimizedResize.add>[0] | undefined;

    trigger.setAttribute('data-testid', 'trigger');
    document.body.appendChild(trigger);

    jest.spyOn(OptimizedResize, 'add').mockImplementation((callback) => {
      resizeCallback = callback;
      return { remove };
    });

    render(
      <Profiler id="floating-menu" onRender={onRender}>
        <FloatingMenu
          triggerRef={triggerRef}
          menuOffset={defaultMenuOffset}
          target={target}>
          {defaultMenuChildren}
        </FloatingMenu>
      </Profiler>
    );

    await waitFor(() => {
      expect(screen.getByTestId('menu').style.left).toBe('-23px');
      expect(screen.getByTestId('menu').style.top).toBe('65px');
    });

    const callback = resizeCallback;

    if (!callback) {
      throw new Error('Expected a resize callback to be registered.');
    }

    triggerRect = createRect({
      left: 50,
      top: 20,
      right: 70,
      bottom: 60,
      width: 20,
      height: 40,
    });

    act(() => {
      callback();
    });

    await waitFor(() => {
      expect(screen.getByTestId('menu').style.left).toBe('17px');
      expect(screen.getByTestId('menu').style.top).toBe('65px');
    });

    const commitCountAfterPositionChange = onRender.mock.calls.length;

    act(() => {
      callback();
    });

    expect(onRender).toHaveBeenCalledTimes(commitCountAfterPositionChange);
  });
});
