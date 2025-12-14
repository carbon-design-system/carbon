/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  cloneElement,
  JSXElementConstructor,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type ReactElement,
  type RefObject,
} from 'react';
import * as FeatureFlags from '@carbon/feature-flags';
import ReactDOM from 'react-dom';
import { keys, match } from '../internal/keyboard';
import { OptimizedResize } from './OptimizedResize';
import { selectorFocusable, selectorTabbable } from './keyboard/navigation';
import { PrefixContext } from './usePrefix';
import { warning } from './warning';
import { wrapFocus, wrapFocusWithoutSentinels } from './wrapFocus';

export const DIRECTION_LEFT = 'left';
export const DIRECTION_TOP = 'top';
export const DIRECTION_RIGHT = 'right';
export const DIRECTION_BOTTOM = 'bottom';

interface MenuSize {
  width: number;
  height: number;
}

interface RefPosition {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

export interface Offset {
  top: number;
  left: number;
}

interface Container {
  rect: DOMRect;
  position: string;
}

interface FloatingPosition {
  left: number;
  top: number;
}

export type MenuDirection =
  | typeof DIRECTION_LEFT
  | typeof DIRECTION_TOP
  | typeof DIRECTION_RIGHT
  | typeof DIRECTION_BOTTOM;

export type MenuOffset =
  | Offset
  | ((
      menuBody: HTMLElement,
      menuDirection: MenuDirection,
      triggerEl?: HTMLElement | null,
      flipped?: boolean
    ) => Offset);

interface FloatingMenuProps {
  /**
   * Contents of the floating menu.
   */
  children: ReactElement;

  /**
   * Whether the menu alignment should be flipped.
   */
  flipped?: boolean;

  /**
   * Enable or disable focus trap behavior.
   */
  focusTrap?: boolean;

  /**
   * Where to put the menu relative to the trigger.
   */
  menuDirection?: MenuDirection;

  /**
   * The adjustment of the floating menu's position.
   */
  menuOffset?: MenuOffset;

  /**
   * Callback when the menu body is mounted/unmounted.
   */
  menuRef?: (menuBody: HTMLElement | null) => void;

  /**
   * Callback when the menu body has been placed.
   */
  onPlace?: (menuBody: HTMLElement) => void;

  /**
   * CSS selector for the element to focus when the menu opens.
   */
  selectorPrimaryFocus?: string;

  /**
   * Additional styles to apply to the menu.
   */
  styles?: CSSProperties;

  /**
   * Function returning the element where the floating menu is rendered.
   * @default () => document.body
   */
  target?: () => Element;

  /**
   * The `ref` of the tooltip’s trigger element. It is assumed to be a
   * `RefObject` pointing to an `HTMLElement`.
   */
  triggerRef: RefObject<HTMLElement>;

  /**
   * Optional function to adjust orientation
   */
  updateOrientation?: (params: {
    menuSize: DOMRect;
    refPosition: DOMRect | undefined;
    direction: string;
    offset: Offset;
    scrollX: number;
    scrollY: number;
    container: Container;
  }) => void;
}

/**
 * Computes the floating menu's position based on the menu size, trigger element
 * position, offset, direction, and container.
 */
const getFloatingPosition = ({
  menuSize,
  refPosition,
  offset,
  direction,
  scrollX,
  scrollY,
  container,
}: {
  menuSize: MenuSize;
  refPosition: RefPosition;
  offset: Offset;
  direction: string;
  scrollX: number;
  scrollY: number;
  container: Container;
}): FloatingPosition => {
  const {
    left: refLeft = 0,
    top: refTop = 0,
    right: refRight = 0,
    bottom: refBottom = 0,
  } = refPosition;
  const effectiveScrollX = container.position !== 'static' ? 0 : scrollX;
  const effectiveScrollY = container.position !== 'static' ? 0 : scrollY;
  const relativeDiff = {
    top: container.position !== 'static' ? container.rect.top : 0,
    left: container.position !== 'static' ? container.rect.left : 0,
  };
  const { width, height } = menuSize;
  const { top = 0, left = 0 } = offset;
  const refCenterHorizontal = (refLeft + refRight) / 2;
  const refCenterVertical = (refTop + refBottom) / 2;

  const positions: Record<MenuDirection, () => Offset> = {
    [DIRECTION_LEFT]: () => ({
      left: refLeft - width + effectiveScrollX - left - relativeDiff.left,
      top:
        refCenterVertical -
        height / 2 +
        effectiveScrollY +
        top -
        9 -
        relativeDiff.top,
    }),
    [DIRECTION_TOP]: () => ({
      left:
        refCenterHorizontal -
        width / 2 +
        effectiveScrollX +
        left -
        relativeDiff.left,
      top: refTop - height + effectiveScrollY - top - relativeDiff.top,
    }),
    [DIRECTION_RIGHT]: () => ({
      left: refRight + effectiveScrollX + left - relativeDiff.left,
      top:
        refCenterVertical -
        height / 2 +
        effectiveScrollY +
        top +
        3 -
        relativeDiff.top,
    }),
    [DIRECTION_BOTTOM]: () => ({
      left:
        refCenterHorizontal -
        width / 2 +
        effectiveScrollX +
        left -
        relativeDiff.left,
      top: refBottom + effectiveScrollY + top - relativeDiff.top,
    }),
  };

  return positions[direction]();
};

export const FloatingMenu = ({
  children,
  flipped,
  focusTrap,
  menuDirection = DIRECTION_BOTTOM,
  menuOffset = { top: 0, left: 0 },
  menuRef: externalMenuRef,
  onPlace,
  selectorPrimaryFocus,
  styles,
  target = () => document.body,
  triggerRef,
  updateOrientation,
}: FloatingMenuProps) => {
  const prefix = useContext(PrefixContext);

  const [floatingPosition, setFloatingPosition] = useState<
    FloatingPosition | undefined
  >(undefined);

  const menuBodyRef = useRef<HTMLElement | null>(null);
  const startSentinelRef = useRef<HTMLSpanElement>(null);
  const endSentinelRef = useRef<HTMLSpanElement>(null);
  const placeInProgressRef = useRef(false);

  const updateMenuPosition = useCallback(
    (isAdjustment?: true) => {
      const menuBody = menuBodyRef.current;

      if (!menuBody) {
        warning(
          !!menuBody,
          'The DOM node for menu body for calculating its position is not available. Skipping...'
        );

        return;
      }

      const triggerEl = triggerRef.current;
      const menuSize = menuBody.getBoundingClientRect();
      const refPosition = triggerEl
        ? triggerEl.getBoundingClientRect()
        : undefined;
      const offsetValue =
        typeof menuOffset === 'function'
          ? menuOffset(menuBody, menuDirection, triggerEl, flipped)
          : menuOffset;

      const scrollX = globalThis.scrollX ?? 0;
      const scrollY = globalThis.scrollY ?? 0;

      if (updateOrientation) {
        updateOrientation({
          menuSize,
          refPosition,
          direction: menuDirection,
          offset: offsetValue,
          scrollX,
          scrollY,
          container: {
            rect: target().getBoundingClientRect(),
            position: getComputedStyle(target()).position,
          },
        });
      }

      // Only set position if the menu has a valid size or if no offset is provided.
      if ((menuSize.width > 0 && menuSize.height > 0) || !offsetValue) {
        const newFloatingPosition = getFloatingPosition({
          menuSize,
          refPosition: refPosition ?? { left: 0, top: 0, right: 0, bottom: 0 },
          offset: offsetValue,
          direction: menuDirection,
          scrollX,
          scrollY,
          container: {
            rect: target().getBoundingClientRect(),
            position: getComputedStyle(target()).position,
          },
        });

        // Only update if the position has actually changed.
        if (
          !floatingPosition ||
          floatingPosition.left !== newFloatingPosition.left ||
          floatingPosition.top !== newFloatingPosition.top
        ) {
          setFloatingPosition(newFloatingPosition);
        }

        // Re-check after setting the position if not already adjusting.
        if (!isAdjustment) {
          const newMenuSize = menuBody.getBoundingClientRect();
          // TODO: Was there a bug in the old code? How could one `DOMRect` be
          // compared to another using `!==`?
          if (
            newMenuSize.width !== menuSize.width ||
            newMenuSize.height !== menuSize.height
          ) {
            updateMenuPosition(true);
          }
        }
      }
    },
    [
      triggerRef,
      menuOffset,
      menuDirection,
      flipped,
      target,
      updateOrientation,
      floatingPosition,
    ]
  );

  const focusMenuContent = (menuBody: HTMLElement) => {
    const primaryFocusNode = selectorPrimaryFocus
      ? menuBody.querySelector<HTMLElement>(selectorPrimaryFocus)
      : null;
    const tabbableNode = menuBody.querySelector<HTMLElement>(selectorTabbable);
    const focusableNode =
      menuBody.querySelector<HTMLElement>(selectorFocusable);
    const focusTarget =
      primaryFocusNode || // User defined focusable node
      tabbableNode || // First sequentially focusable node
      focusableNode || // First programmatic focusable node
      menuBody;

    focusTarget.focus();

    if (focusTarget === menuBody) {
      warning(
        focusableNode === null,
        'Floating Menus must have at least a programmatically focusable child. This can be accomplished by adding tabIndex="-1" to the content element.'
      );
    }
  };

  const handleMenuRef = (node: HTMLElement | null) => {
    menuBodyRef.current = node;
    placeInProgressRef.current = !!node;

    if (externalMenuRef) {
      externalMenuRef(node);
    }

    if (node) {
      updateMenuPosition();
    }
  };

  // When the menu has been placed, focus the content and call onPlace.
  useEffect(() => {
    if (placeInProgressRef.current && floatingPosition && menuBodyRef.current) {
      if (!menuBodyRef.current.contains(document.activeElement)) {
        focusMenuContent(menuBodyRef.current);
      }

      if (typeof onPlace === 'function') {
        onPlace(menuBodyRef.current);
      }

      placeInProgressRef.current = false;
    }
    // eslint-disable-next-line  react-hooks/exhaustive-deps -- https://github.com/carbon-design-system/carbon/issues/20452
  }, [floatingPosition, onPlace]);

  // Attach a resize listener.
  useEffect(() => {
    const resizeHandler = OptimizedResize.add(() => {
      updateMenuPosition();
    });

    return () => {
      resizeHandler.remove();
    };
    // eslint-disable-next-line  react-hooks/exhaustive-deps -- https://github.com/carbon-design-system/carbon/issues/20452
  }, [
    triggerRef,
    menuOffset,
    menuDirection,
    flipped,
    target,
    updateOrientation,
  ]);

  // Update menu position when key props change.
  useEffect(() => {
    updateMenuPosition();
    // eslint-disable-next-line  react-hooks/exhaustive-deps -- https://github.com/carbon-design-system/carbon/issues/20452
  }, [
    menuOffset,
    menuDirection,
    flipped,
    triggerRef,
    target,
    updateOrientation,
  ]);

  /**
   * Clones the child element to add a `ref` and positioning styles.
   */
  const getChildrenWithProps = () => {
    const pos = floatingPosition;
    const positioningStyle: CSSProperties = pos
      ? {
          left: `${pos.left}px`,
          top: `${pos.top}px`,
          right: 'auto',
        }
      : {
          visibility: 'hidden',
          top: '0px',
        };
    const child = children as ReactElement<
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
      any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
      string | JSXElementConstructor<any>
    >;
    return cloneElement(child, {
      ref: handleMenuRef,
      style: {
        ...styles,
        ...positioningStyle,
        position: 'absolute',
        opacity: 1,
      },
    });
  };

  /**
   * Blur handler used when focus trapping is enabled.
   */
  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    const { target, relatedTarget } = event;

    if (
      menuBodyRef.current &&
      startSentinelRef.current &&
      endSentinelRef.current &&
      target instanceof HTMLElement &&
      relatedTarget instanceof HTMLElement
    ) {
      wrapFocus({
        bodyNode: menuBodyRef.current,
        startTrapNode: startSentinelRef.current,
        endTrapNode: endSentinelRef.current,
        currentActiveNode: relatedTarget,
        oldActiveNode: target,
        prefix,
      });
    }
  };

  /**
   * Keydown handler for focus wrapping when experimental focus trap is enabled.
   */
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (
      match(event, keys.Tab) &&
      menuBodyRef.current &&
      event.target instanceof HTMLElement
    ) {
      wrapFocusWithoutSentinels({
        containerNode: menuBodyRef.current,
        currentActiveNode: event.target,
        event,
      });
    }
  };

  const deprecatedFlag = FeatureFlags.enabled(
    'enable-experimental-focus-wrap-without-sentinels'
  );
  const focusTrapWithoutSentinelsFlag = FeatureFlags.enabled(
    'enable-focus-wrap-without-sentinels'
  );
  const focusTrapWithoutSentinels =
    deprecatedFlag || focusTrapWithoutSentinelsFlag;

  if (typeof document !== 'undefined') {
    const portalTarget = target ? target() : document.body;

    return ReactDOM.createPortal(
      // eslint-disable-next-line  jsx-a11y/no-static-element-interactions  -- https://github.com/carbon-design-system/carbon/issues/20452
      <div
        onBlur={
          focusTrap && !focusTrapWithoutSentinels ? handleBlur : undefined
        }
        onKeyDown={focusTrapWithoutSentinels ? handleKeyDown : undefined}>
        {/* Non-translatable: Focus management code makes this `<span>` not actually read by screen readers */}
        {!focusTrapWithoutSentinels && (
          <span
            ref={startSentinelRef}
            tabIndex={0}
            role="link"
            className={`${prefix}--visually-hidden`}>
            Focus sentinel
          </span>
        )}
        {getChildrenWithProps()}
        {/* Non-translatable: Focus management code makes this `<span>` not actually read by screen readers */}
        {!focusTrapWithoutSentinels && (
          <span
            ref={endSentinelRef}
            tabIndex={0}
            role="link"
            className={`${prefix}--visually-hidden`}>
            Focus sentinel
          </span>
        )}
      </div>,
      portalTarget
    );
  }
  return null;
};
