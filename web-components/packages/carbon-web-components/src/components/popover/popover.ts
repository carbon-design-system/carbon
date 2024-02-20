/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit/directives/class-map.js';
import { LitElement, html } from 'lit';
import { property, customElement, query } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import { floatingUIPosition } from '../../globals/internal/floating-ui';
import styles from './popover.scss';
import CDSPopoverContent from './popover-content';

/**
 * Popover.
 *
 * @element cds-popover
 */
@customElement(`${prefix}-popover`)
class CDSPopover extends LitElement {
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
   * Handles `slotchange` event.
   */
  protected _handleSlotChange({ target }: Event) {
    if (this.tabTip) {
      const component = (target as HTMLSlotElement)
        .assignedNodes()
        .filter(
          (node) =>
            node.nodeType !== Node.TEXT_NODE || node!.textContent!.trim()
        );
      (component[0] as HTMLElement).classList.add(
        `${prefix}--popover--tab-tip__button`
      );
    }
    this.requestUpdate();
  }

  updated(changedProperties) {
    const { selectorPopoverContent } = this.constructor as typeof CDSPopover;
    ['open', 'align', 'autoalign', 'caret', 'dropShadow', 'tabTip'].forEach(
      (name) => {
        if (changedProperties.has(name)) {
          const { [name as keyof CDSPopover]: value } = this;
          if (this.querySelector(selectorPopoverContent) as CDSPopoverContent) {
            (this.querySelector(selectorPopoverContent) as CDSPopoverContent)[
              name
            ] = value;
          }
        }
      }
    );

    if (this.autoalign) {
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
        floatingUIPosition({
          button,
          tooltip,
          arrowElement,
          caret: this.caret,
          alignment: this.align,
        });
      }
    }
  }

  render() {
    const {
      dropShadow,
      highContrast,
      open,
      tabTip,
      _handleSlotChange: handleSlotChange,
    } = this;
    if (tabTip) {
      this.caret = tabTip ? false : true;
    }
    this.align = this.align ? this.align : tabTip ? 'bottom-left' : 'bottom';

    const classes = classMap({
      [`${prefix}--popover-container`]: true,
      [`${prefix}--popover--caret`]: this.caret,
      [`${prefix}--popover--drop-shadow`]: dropShadow,
      [`${prefix}--popover--high-contrast`]: highContrast,
      [`${prefix}--popover--open`]: open,
      [`${prefix}--popover--${this.align}`]: true,
      [`${prefix}--popover--tab-tip`]: tabTip,
    });
    return html`
    <span class="${classes}">
      <slot @slotchange="${handleSlotChange}"></slot>
      <slot name="content"><slot>
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

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default CDSPopover;
