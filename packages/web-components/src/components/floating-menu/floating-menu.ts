/**
 * Copyright IBM Corp. 2019, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement } from 'lit';
import HostListener from '../../globals/decorators/host-listener';
import FocusMixin from '../../globals/mixins/focus';
import HostListenerMixin from '../../globals/mixins/host-listener';
import Handle from '../../globals/internal/handle';
import {
  FLOATING_MENU_DIRECTION,
  FLOATING_MENU_POSITION_DIRECTION,
} from './defs';
import CDSFloatingMenuTrigger from './floating-menu-trigger';
import { prefix } from '../../globals/settings';

export { FLOATING_MENU_DIRECTION, FLOATING_MENU_POSITION_DIRECTION };

export interface Offset {
  top: number;
  left: number;
}

export type MenuDirection = FLOATING_MENU_DIRECTION;

export type MenuOffset =
  | Offset
  | ((
      menuBody: HTMLElement,
      menuDirection: MenuDirection,
      trigger?: HTMLElement | null,
      flipped?: boolean
    ) => Offset);

/**
 * Calculates the offset for the floating menu.
 *
 * @param menuBody - The menu body element.
 * @param menuDirection - The floating menu direction.
 * @param trigger - The trigger element.
 * @param flipped - Whether the menu is flipped.
 * @returns The adjustment of the floating menu position.
 */
export const getMenuOffset = (
  menuBody: HTMLElement,
  menuDirection: MenuDirection,
  trigger?: HTMLElement,
  flipped?: boolean
): Offset => {
  const { offsetWidth: menuWidth } = menuBody;

  switch (menuDirection) {
    case FLOATING_MENU_DIRECTION.TOP:
    case FLOATING_MENU_DIRECTION.BOTTOM: {
      const triggerWidth = !trigger ? 0 : trigger.offsetWidth;
      return {
        left: (!flipped ? 1 : -1) * (menuWidth / 2 - triggerWidth / 2),
        top: 0,
      };
    }
    default:
      return { left: 0, top: 0 };
  }
};

/**
 * Position of floating menu, or trigger button of floating menu.
 */
export interface FloatingMenuPosition {
  /**
   * The LTR/RTL direction used for positioning floating menu.
   */
  direction: FLOATING_MENU_POSITION_DIRECTION;

  /**
   * The start position (Left position for LTR, right position for RTL).
   */
  start: number;

  /**
   * The top position.
   */
  top: number;
}

/**
 * Observes resize of the given element with the given resize observer.
 *
 * @param observer The resize observer.
 * @param elem The element to observe the resize.
 */
const observeResize = (observer: ResizeObserver, elem: Element) => {
  observer.observe(elem);
  return {
    release() {
      observer.unobserve(elem);
      return null;
    },
  } as Handle;
};

/**
 * @param elem The starting element.
 * @param selector The CSS selector.
 * @returns {Element}
 *   The closest ancestor node of the given element that matches the given selector, crossing Shadow DOM boundary.
 */
const closestComposed = (elem: Element, selector: string) => {
  const found = elem.closest(selector);
  if (found) {
    return found;
  }
  const { host } = elem.getRootNode() as ShadowRoot;
  if (host) {
    return closestComposed(host, selector);
  }
  return null;
};

/**
 * Floating menu.
 */
abstract class CDSFloatingMenu extends HostListenerMixin(
  FocusMixin(LitElement)
) {
  /**
   * The handle for observing resize of the element containing the trigger button.
   */
  private _hObserveResizeParent: Handle | null = null;

  /**
   * The handle for observing resize of the floating menu container.
   */
  private _hObserveResizeContainer: Handle | null = null;

  @HostListener('focusout')
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleBlur = ({ relatedTarget }: FocusEvent) => {
    if (!this.contains(relatedTarget as Node)) {
      const { parent } = this;
      if (parent && parent !== relatedTarget) {
        parent.open = false;
        HTMLElement.prototype.focus.call(this.parent); // SVGElement in IE11 does not have `.focus()` method
      }
    }
  };

  @HostListener('click')
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _click = () => {
    const { parent } = this;
    if (parent) {
      parent.open = false;
    }
  };

  @HostListener('keydown')
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Tab') {
      if (event.shiftKey) {
        const { parent } = this;
        if (parent) {
          parent.open = false;
        }
      }
    }
  };

  /**
   * The DOM element, typically a custom element in this library, launching this floating menu.
   */
  protected parent: CDSFloatingMenuTrigger | null = null;

  /**
   * The menu direction.
   */
  abstract direction: FLOATING_MENU_DIRECTION;

  /**
   * `true` if the menu should be open.
   */
  abstract open: boolean;

  /**
   * `true` if the menu alignment should be flipped.
   */
  abstract flipped: boolean;

  /**
   * Gets the menu offset configuration (object or function).
   * Subclasses override this to specify custom offset configs.
   *
   * @returns The menu offset configuration, or undefined for no offset.
   */
  protected getOffsetConfig(): MenuOffset | undefined {
    return undefined;
  }

  /**
   * Resolves the final menu offset by evaluating the offset configuration.
   * Handles both static offset objects and dynamic offset functions.
   *
   * @returns The resolved offset with left and top values.
   */
  protected resolveOffset(): Offset {
    const config = this.getOffsetConfig();

    if (!config) {
      return { left: 0, top: 0 };
    }

    if (typeof config === 'function') {
      const trigger = this.parent as HTMLElement;
      return config(this, this.direction, trigger, this.flipped);
    }

    return config;
  }

  /**
   * The DOM element to put this menu into.
   */
  get container() {
    return (
      closestComposed(
        this,
        (this.constructor as typeof CDSFloatingMenu).selectorContainer
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      ) || this.ownerDocument!.body
    );
  }

  /**
   * The position of this floating menu.
   */
  get position(): FloatingMenuPosition {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
    const { triggerPosition } = this.parent!;
    if (!triggerPosition) {
      throw new TypeError('Missing information of trigger button position.');
    }

    const { container } = this;
    const {
      left: refLeft = 0,
      top: refTop = 0,
      right: refRight = 0,
      bottom: refBottom = 0,
    } = triggerPosition;
    const { width, height } = this.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const containerComputedStyle =
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      container.ownerDocument!.defaultView!.getComputedStyle(container);
    const containerPosition =
      containerComputedStyle.getPropertyValue('position');
    const positionDirection = containerComputedStyle.getPropertyValue(
      'direction'
    ) as FLOATING_MENU_POSITION_DIRECTION;

    const scrollX = globalThis.scrollX ?? 0;
    const scrollY = globalThis.scrollY ?? 0;
    const effectiveScrollX = containerPosition !== 'static' ? 0 : scrollX;
    const effectiveScrollY = containerPosition !== 'static' ? 0 : scrollY;

    const relativeDiff = {
      top: containerPosition !== 'static' ? containerRect.top : 0,
      left: containerPosition !== 'static' ? containerRect.left : 0,
    };

    const refCenterHorizontal = (refLeft + refRight) / 2;
    const refCenterVertical = (refTop + refBottom) / 2;

    const offset = this.resolveOffset();
    const { top = 0, left = 0 } = offset;

    const { direction } = this;
    if (Object.values(FLOATING_MENU_DIRECTION).indexOf(direction) < 0) {
      throw new Error(`Wrong menu position direction: ${direction}`);
    }

    const positions: Record<MenuDirection, () => Offset> = {
      [FLOATING_MENU_DIRECTION.LEFT]: () => ({
        left: refLeft - width + effectiveScrollX - left - relativeDiff.left,
        top:
          refCenterVertical -
          height / 2 +
          effectiveScrollY +
          top -
          9 -
          relativeDiff.top,
      }),
      [FLOATING_MENU_DIRECTION.TOP]: () => ({
        left:
          refCenterHorizontal -
          width / 2 +
          effectiveScrollX +
          left -
          relativeDiff.left,
        top: refTop - height + effectiveScrollY - top - relativeDiff.top,
      }),
      [FLOATING_MENU_DIRECTION.RIGHT]: () => ({
        left: refRight + effectiveScrollX + left - relativeDiff.left,
        top:
          refCenterVertical -
          height / 2 +
          effectiveScrollY +
          top +
          3 -
          relativeDiff.top,
      }),
      [FLOATING_MENU_DIRECTION.BOTTOM]: () => ({
        left:
          refCenterHorizontal -
          width / 2 +
          effectiveScrollX +
          left -
          relativeDiff.left,
        top: refBottom + effectiveScrollY + top - relativeDiff.top,
      }),
    };

    const { left: calculatedLeft, top: calculatedTop } = positions[direction]();

    return {
      direction: positionDirection,
      start: calculatedLeft,
      top: calculatedTop,
    };
  }

  disconnectedCallback() {
    if (this._hObserveResizeContainer) {
      this._hObserveResizeContainer = this._hObserveResizeContainer.release();
    }
    if (this._hObserveResizeParent) {
      this._hObserveResizeParent = this._hObserveResizeParent.release();
    }
  }

  updated(changedProperties) {
    const { container, open, parent } = this;
    if (
      (changedProperties.has('flipped') ||
        changedProperties.has('direction') ||
        changedProperties.has('open')) &&
      open
    ) {
      if (!parent) {
        this.parent = this.parentElement as CDSFloatingMenuTrigger;
        container.appendChild(this);
      }
      // Note: `this.position` cannot be referenced until `this.parent` is set
      const { start, top } = this.position;
      this.style.left = `${start}px`;
      this.style.right = 'auto';
      this.style.top = `${top}px`;
    }
    if (changedProperties.has('open')) {
      if (this._hObserveResizeContainer) {
        this._hObserveResizeContainer = this._hObserveResizeContainer.release();
      }
      if (this._hObserveResizeParent) {
        this._hObserveResizeParent = this._hObserveResizeParent.release();
      }
      if (open) {
        const { parentElement } = this.parent ?? {};
        this._hObserveResizeContainer = observeResize(
          this._resizeObserver,
          container
        );
        if (parentElement) {
          this._hObserveResizeParent = observeResize(
            this._resizeObserver,
            parentElement
          );
        }
      }
    }
  }

  /**
   * A constant indicating that this class is a floating menu.
   */
  static FLOATING_MENU = true;

  /**
   * The CSS selector to find the element to put this floating menu in.
   */
  static get selectorContainer() {
    return `[data-floating-menu-container],${prefix}-modal`;
  }
  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };
}

export default CDSFloatingMenu;
