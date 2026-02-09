/**
 * Copyright IBM Corp. 2019, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit/directives/class-map.js';
import { LitElement, html } from 'lit';
import { property, query } from 'lit/decorators.js';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import { prefix } from '../../globals/settings';
import styles from './popover.scss?lit';
import CDSPopoverContent from './popover-content';
import HostListener from '../../globals/decorators/host-listener';
import HostListenerMixin from '../../globals/mixins/host-listener';
import FloatingUIController from '../../globals/controllers/floating-controller';
import { POPOVER_BACKGROUND_TOKEN } from './defs';
import type { Boundary, Rect } from '@floating-ui/dom';

/**
 * Popover.
 *
 * @element cds-popover
 * @fires cds-popover-beingclosed
 * @fires cds-popover-closed
 */
@customElement(`${prefix}-popover`)
class CDSPopover extends HostListenerMixin(LitElement) {
  /**
   * Create popover controller instance
   */
  private popoverController = new FloatingUIController(this);

  /**
   * The `<slot>` element in the shadow DOM.
   */
  @query('slot')
  private _triggerSlotNode!: HTMLSlotElement;

  /**
   * The `<slot>` element in the shadow DOM.
   */
  @query('slot[name="content"]')
  private _contentSlotNode!: HTMLSlotElement;

  /**
   * Specify direction of alignment
   */
  @property({ reflect: true, type: String })
  align = '';

  /**
   * **Experimental:** Provide an offset value for alignment axis. Only takes effect when `autoalign` is enabled.
   */
  @property({ type: Number, reflect: true, attribute: 'alignment-axis-offset' })
  alignmentAxisOffset?: number;

  /**
   * Specify whether a auto align functionality should be applied
   */
  @property({ type: Boolean, reflect: true })
  autoalign = false;

  /**
   * Specify whether a caret should be rendered
   */
  @property({ type: Boolean, reflect: true })
  caret = true;

  /**
   * Specify whether a dropShadow should be rendered
   */
  @property({ type: Boolean, reflect: true })
  dropShadow = true;

  /**
   * Specify whether a border should be rendered on the popover
   */
  @property({ type: Boolean, reflect: true })
  border = false;

  /**
   * Render the component using the high-contrast variant
   */
  @property({ type: Boolean, reflect: true })
  highContrast = false;

  /**
   * Specify whether the component is currently open or closed
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  /**
   * Render the component using the tab tip variant
   */
  @property({ type: Boolean, reflect: true })
  tabTip = false;

  /**
   * Specify the background token to use. Default is 'layer'.
   */
  @property({ reflect: true, type: String })
  backgroundToken = POPOVER_BACKGROUND_TOKEN.LAYER;

  /**
   * Specify a bounding element to be used for autoAlign calculations. The viewport is used by default.
   * Takes one of the following: 'clippingAncestors', '#elementid', '#elementid_1, #elementid_2', 'rect(x, y, width, height)'
   * This prop is currently experimental and is subject to future changes.
   */
  @property({ type: String, reflect: true, attribute: 'autoalign-boundary' })
  autoAlignBoundary?: string;

  // Tracks whether the last mousedown event was inside the popover content
  private _lastClickWasInsidePopoverContent = false;

  /**
   * Handles `slotchange` event.
   */
  protected _handleSlotChange({ target }: Event) {
    if (this.tabTip) {
      const component = (target as HTMLSlotElement)
        .assignedNodes()
        .filter(
          (node) =>
            node.nodeType === Node.ELEMENT_NODE &&
            (node as Element).tagName === 'BUTTON'
        );

      (component[0] as HTMLElement)?.classList.add(
        `${prefix}--popover--tab-tip__button`
      );
    }
    this.requestUpdate();
  }

  // This is from what was shown in the meeting today  https://github.com/carbon-design-system/carbon/pull/20552/changes#r2358833820

  @HostListener('focusout')
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
  // @ts-ignore
  private _handleFocusOut(event: FocusEvent) {
    if (this.contains(event.relatedTarget as Node)) {
      return;
    }

    if (this._deepShadowContains(this, event.relatedTarget)) {
      return;
    }
    // eslint-disable-next-line no-console
    console.log(event);
    this.open = false;
  }
  private _deepShadowContains(root: Node, el: EventTarget | null): boolean {
    if (!(el instanceof Node)) {
      return false;
    }
    if (el === root) {
      return true;
    }

    return this._deepShadowContains(
      root,
      (el as HTMLElement).assignedSlot ||
        el.parentNode ||
        (el.getRootNode() as ShadowRoot).host ||
        null
    );
  }

  //

  /**
   * This entire commented out block is my implementation, this works but idk if it's the best way to do it
   * longevity wise. It uses two additional listeners to add flags that are used to track if the popover should close or not
   *
   */

  //   @HostListener('mousedown')
  // // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
  // // @ts-ignore
  // private _handleMouseDown(event: MouseEvent) {
  //   const path = event.composedPath();
  //   const contentEl = this._contentSlotNode.assignedElements()[0];

  //   if (contentEl && path.includes(contentEl)) {
  //     this._lastClickWasInsidePopoverContent = true;
  //   }
  // }

  // @HostListener('keydown')
  // // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
  // // @ts-ignore
  // private _handleKeyDown(event: KeyboardEvent) {
  //   const path = event.composedPath();
  //   const contentEl = this._contentSlotNode.assignedElements()[0];

  //   // tab key should allow popover to close
  //   if (event.key === 'Tab' && contentEl && path.includes(contentEl)) {
  //     // Clear the activation flag when Tab is pressed
  //     this._lastClickWasInsidePopoverContent = false;
  //     return;
  //   }

  //   // clean this up later and marge the conditions with the top one,
  //   // i dont think theres a need to check for Enter and space this can just be an else
  //   if (event.key === 'Enter' || event.key === ' ') {
  //     if (contentEl && path.includes(contentEl)) {
  //       this._lastClickWasInsidePopoverContent = true;
  //     }
  //   }
  // }

  // @HostListener('focusout')
  // // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
  // // @ts-ignore
  // private _handleFocusOut(event: FocusEvent) {
  //   const relatedTarget = (event as FocusEvent).relatedTarget as Node | null;
  //   const path = event.composedPath();
  //   const triggerEl = this._triggerSlotNode.assignedElements({
  //     flatten: true,
  //   })[0];
  //   console.log(event);
  //   const contentEl = this._contentSlotNode.assignedElements()[0];

  //   // if there was a recent click/keypress inside popover content via flag=true, prevent close
  //   if (this._lastClickWasInsidePopoverContent) {
  //     return;
  //   }

  //   if (
  //     relatedTarget &&
  //     triggerEl &&
  //     (path.includes(triggerEl) ||
  //       triggerEl === relatedTarget ||
  //       triggerEl.contains(relatedTarget))
  //   ) {
  //     return;
  //   }

  //   // check if the focusout event originated from within the popover content
  //   // handles cases where relatedTarget is null
  //   if (contentEl && path.includes(contentEl) && !relatedTarget) {  // i think !relatedTarget can be removed
  //
  //     const activeEl = document.activeElement;
  //     if (
  //       this._lastClickWasInsidePopoverContent &&
  //       activeEl === document.body
  //     ) {
  //       console.log(this._lastClickWasInsidePopoverContent);
  //       return;
  //     }

  //     // if focus is still within popover content, prevent close
  //     if (activeEl && contentEl.contains(activeEl)) {
  //       return;
  //     }
  //   }

  //   if (!this.contains(relatedTarget)) {
  //     const wasOpen = this.open;

  //     // rest the flag when actually closing the popover
  //     this._lastClickWasInsidePopoverContent = false;

  //     if (wasOpen) {
  //       const init = {
  //         bubbles: true,
  //         cancelable: true,
  //         composed: true,
  //         detail: {
  //           triggeredBy: event.target,
  //         },
  //       };

  //       if (
  //         this.dispatchEvent(
  //           new CustomEvent(
  //             (this.constructor as typeof CDSPopover).eventBeforeClose,
  //             init
  //           )
  //         )
  //       ) {
  //         this.open = false;
  //         this.dispatchEvent(
  //           new CustomEvent(
  //             (this.constructor as typeof CDSPopover).eventOnClose,
  //             {
  //               bubbles: true,
  //               composed: true,
  //             }
  //           )
  //         );
  //       }
  //     }
  //   }
  // }

  private _handleOutsideClick(event: Event) {
    const path = event.composedPath();

    if (path.includes(this._triggerSlotNode.assignedElements()[0])) return;

    const popoverContent = this.querySelector(
      (this.constructor as typeof CDSPopover).selectorPopoverContent
    )?.shadowRoot?.querySelector(
      (this.constructor as typeof CDSPopover).selectorPopoverContentClass
    ) as HTMLElement;

    if (path.includes(popoverContent)) return;

    const target = event.target as Node | null;
    const composedTarget = event.composedPath?.()[0] as Node | null;

    if (
      this.open &&
      target &&
      !this.contains(target) &&
      !this.contains(composedTarget)
    ) {
      // rest the flag when actually closing the popover
      this._lastClickWasInsidePopoverContent = false; // this is part of the focusout implementation that relied on flags

      const init = {
        bubbles: true,
        cancelable: true,
        composed: true,
        detail: {
          triggeredBy: target,
        },
      };

      if (
        this.dispatchEvent(
          new CustomEvent(
            (this.constructor as typeof CDSPopover).eventBeforeClose,
            init
          )
        )
      ) {
        this.open = false;
        this.dispatchEvent(
          new CustomEvent(
            (this.constructor as typeof CDSPopover).eventOnClose,
            {
              bubbles: true,
              composed: true,
            }
          )
        );
      }
    }
  }

  constructor() {
    super();
    this._handleOutsideClick = this._handleOutsideClick.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._handleOutsideClick);
  }

  disconnectedCallback() {
    document.removeEventListener('click', this._handleOutsideClick);
  }

  /**
   * This function resolves the string passed in for `autoAlignBoundary` to either:
   * "clippingAncestors"
   * An element (found via #id)
   * An array of elements (found via #id1, #id2, #id3, separated by ",")
   * A rect, input format should be 'rect(x,y,width,height)'
   */
  private _resolveAutoAlignBoundary(): Boundary {
    const raw = (this.autoAlignBoundary ?? '').trim();

    // Default to 'clippingAncestors'
    if (!raw) return 'clippingAncestors';
    if (raw === 'clippingAncestors') return 'clippingAncestors';

    // regex match for: rect(x,y,width,height)
    const rectMatch =
      /^rect\(\s*([-\d.]+)\s*,\s*([-\d.]+)\s*,\s*([-\d.]+)\s*,\s*([-\d.]+)\s*\)$/i.exec(
        raw
      );
    if (rectMatch) {
      const [, x, y, w, h] = rectMatch;
      const rect: Rect = { x: +x, y: +y, width: +w, height: +h };
      return rect;
    }

    // Get element(s)
    const ids = raw
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 1 && s.startsWith('#'))
      .map((s) => s.slice(1).trim())
      .filter(Boolean);

    if (ids.length > 0) {
      const elements: Element[] = [];
      const inputted_ids = new Set<string>();

      for (const id of ids) {
        if (inputted_ids.has(id)) continue;
        inputted_ids.add(id);

        const el = document.getElementById(id);

        if (el) elements.push(el);
      }
      return elements.length === 1 ? elements[0] : elements;
    }

    // default fallback
    return 'clippingAncestors';
  }

  updated(changedProperties) {
    const { selectorPopoverContent } = this.constructor as typeof CDSPopover;
    [
      'open',
      'align',
      'autoalign',
      'caret',
      'dropShadow',
      'border',
      'tabTip',
      'highContrast',
      'backgroundToken',
    ].forEach((name) => {
      if (changedProperties.has(name)) {
        const { [name as keyof CDSPopover]: value } = this;
        if (this.querySelector(selectorPopoverContent) as CDSPopoverContent) {
          (this.querySelector(selectorPopoverContent) as CDSPopoverContent)[
            name
          ] = value;
        }
      }
    });

    if (this.autoalign && this.open) {
      // auto align functionality with @floating-ui/dom library
      const button = this._triggerSlotNode.assignedElements()[0];
      const content = this._contentSlotNode.assignedElements()[0];

      const tooltip = content?.shadowRoot?.querySelector(
        CDSPopover.selectorPopoverContentClass
      );
      const arrowElement = content?.shadowRoot?.querySelector(
        CDSPopover.selectorPopoverCaret
      );

      if (button && tooltip) {
        this.popoverController?.setPlacement({
          trigger: button as HTMLElement,
          target: tooltip as HTMLElement,
          arrowElement:
            this.caret && arrowElement
              ? (arrowElement as HTMLElement)
              : undefined,
          caret: this.caret,
          flipArguments: { fallbackAxisSideDirection: 'start' },
          alignment: this.align,
          open: this.open,
          alignmentAxisOffset: this.alignmentAxisOffset,
          autoAlignBoundary: this._resolveAutoAlignBoundary(),
          isTabTip: this.tabTip,
        });
      }
    }
  }

  render() {
    const {
      dropShadow,
      border,
      highContrast,
      open,
      tabTip,
      _handleSlotChange: handleSlotChange,
    } = this;
    if (tabTip) {
      this.caret = tabTip ? false : true;
    }

    if (!this.autoalign) {
      this.align = this.align ? this.align : tabTip ? 'bottom-start' : 'bottom';
    }

    if (tabTip) {
      const tabTipAlignments = [
        'bottom-start',
        'bottom-end',
        'bottom-left', // remove in v12
        'bottom-right', // remove in v12
      ];

      if (!tabTipAlignments.includes(this.align)) {
        this.align = 'bottom-start';
      }
    }

    const classes = classMap({
      [`${prefix}--popover-container`]: true,
      [`${prefix}--popover--caret`]: this.caret,
      [`${prefix}--popover--drop-shadow`]: dropShadow,
      [`${prefix}--popover--border`]: border,
      [`${prefix}--popover--high-contrast`]: highContrast,
      [`${prefix}--popover--open`]: open,
      [`${prefix}--popover--${this.align}`]: true,
      [`${prefix}--popover--tab-tip`]: tabTip,
      [`${prefix}--popover--background-token__background`]:
        this.backgroundToken === POPOVER_BACKGROUND_TOKEN.BACKGROUND &&
        !highContrast,
    });
    return html`
      <span class="${classes}" part="popover-container">
        <slot @slotchange="${handleSlotChange}"></slot>
        <slot name="content"></slot>
      </span>
    `;
  }

  /**
   * A selector that will return popover content element within
   * CDSPopoverContent's shadowRoot.
   */
  static get selectorPopoverContentClass() {
    return `.${prefix}--popover-content`;
  }

  /**
   * A selector that will return popover caret element within
   * CDSPopoverContent's shadowRoot.
   */
  static get selectorPopoverCaret() {
    return `.${prefix}--popover-caret`;
  }

  /**
   * A selector that will return the CDSPopoverContent.
   */
  static get selectorPopoverContent() {
    return `${prefix}-popover-content`;
  }

  /**
   * The name of the custom event fired before the popover closes via focusout/outsideclick.
   * This event is cancellable.
   */
  static get eventBeforeClose() {
    return `${prefix}-popover-beingclosed`;
  }

  /**
   * The name of the custom event fired when the popover closes via focusout/outsideclick
   */
  static get eventOnClose() {
    return `${prefix}-popover-closed`;
  }

  static styles = styles;
}

export default CDSPopover;
