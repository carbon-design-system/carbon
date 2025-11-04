/**
 * Copyright IBM Corp. 2019, 2025
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
import FloatingUIContoller from '../../globals/controllers/floating-controller';
import { POPOVER_BACKGROUND_TOKEN } from './defs';
import type { Boundary, Rect } from '@floating-ui/dom';

/**
 * Popover.
 *
 * @element cds-popover
 */
@customElement(`${prefix}-popover`)
class CDSPopover extends HostListenerMixin(LitElement) {
  /**
   * Create popover controller instance
   */
  private popoverController = new FloatingUIContoller(this);

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

  @HostListener('focusout')
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
  // @ts-ignore
  private _handleFocusOut(event: Event) {
    const relatedTarget = (event as FocusEvent).relatedTarget as Node | null;
    if (!this.contains(relatedTarget)) {
      this.open = false;
    }
  }

  private _handleOutsideClick(event: Event) {
    const target = event.target as Node | null;
    const composedTarget = event.composedPath?.()[0] as Node | null;

    if (
      this.open &&
      target &&
      !this.contains(target) &&
      !this.contains(composedTarget)
    ) {
      this.open = false;
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

  static styles = styles;
}

export default CDSPopover;
