/**
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { css } from 'lit';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import HostListener from '../../globals/decorators/host-listener';
import HostListenerMixin from '../../globals/mixins/host-listener';
import CDSPopover from '../popover/popover';
import '../popover/popover-content';
import styles from './tooltip.scss?lit';
import CDSTooltipContent from './tooltip-content';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

/**
 * Trigger button of tooltip.
 *
 * @element cds-tooltip
 */
@customElement(`${prefix}-tooltip`)
class CDSTooltip extends HostListenerMixin(CDSPopover) {
  /**
   * Specify how the trigger should align with the tooltip
   */
  @property({ reflect: true, type: String })
  align = 'top';

  /**
   * Specify whether a auto align functionality should be applied
   */
  @property({ type: Boolean, reflect: true })
  autoalign = false;

  /**
   * `true` if this tooltip is in a data table row
   */
  @property({ type: Boolean, reflect: true, attribute: 'data-table' })
  dataTable = false;

  /**
   * Specify whether the tooltip should be closed when clicked
   */
  @property({ reflect: true, type: Boolean })
  closeOnActivation = false;

  /**
   * Specify whether the tooltip should be open when it first renders
   */
  @property({ reflect: true, type: Boolean })
  defaultOpen = false;

  /**
   * Specify the duration in milliseconds to delay before displaying the tooltip
   */
  @property({ attribute: 'enter-delay-ms', type: Number })
  enterDelayMs = 100;

  /**
   * Specify the duration in milliseconds to delay before hiding the tooltip
   */
  @property({ attribute: 'leave-delay-ms', type: Number })
  leaveDelayMs = 300;

  /**
   * Only open tooltip on keyboard interactions, this is used for interactive tags
   * (ie. operational-tag, selectable-tag)
   */
  @property({ attribute: 'keyboard-only', type: Boolean })
  keyboardOnly = false;

  /**
   * Specify the size of the tooltip
   */
  @property({ reflect: true })
  size = false;

  /**
   * Specify the timeout reference for the tooltip
   */
  @property({ reflect: true })
  timeoutId = 0;

  /**
   * Specify whether the tooltip should be open when it first renders
   */
  @property({ reflect: true, attribute: 'toolbar-action', type: Boolean })
  toolbarAction = false;

  /**
   * Track if last interaction was a keyboard interaction
   */
  private lastInteractionWasKeyboard = false;

  /**
   * Handles opening of tooltip
   */
  private _showTooltip = async () => {
    window.clearTimeout(this.timeoutId);
    this.timeoutId = window.setTimeout(async () => {
      this.open = true;
      const { open, updateComplete } = this;
      if (open) {
        await updateComplete;
        const { selectorTooltipContent } = this
          .constructor as typeof CDSTooltip;
        (this.querySelector(selectorTooltipContent) as HTMLElement)?.focus();
      }
    }, this.enterDelayMs);
  };

  /**
   * Handles `mouseover` event on this element.
   */
  private _handleHover = (event) => {
    if (this.keyboardOnly) {
      if (event instanceof FocusEvent && this.lastInteractionWasKeyboard) {
        this._showTooltip();
      }
    } else {
      this._showTooltip();
    }
  };

  /**
   * Handles `mouseleave` event on this element.
   */
  private _handleHoverOut = async () => {
    window.clearTimeout(this.timeoutId);
    this.timeoutId = window.setTimeout(async () => {
      const { open } = this;
      if (open) {
        this.open = false;
      }
    }, this.leaveDelayMs);
  };

  /**
   * Handles `click` event on this element.
   */
  @HostListener('click')
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleClick = async () => {
    this.lastInteractionWasKeyboard = false;
    if (this.closeOnActivation) {
      this._handleHoverOut();
    }
  };

  /**
   * Handles `keydown` event on this element.
   */
  @HostListener('keydown')
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleKeydown = async (event) => {
    // needed for interactive tags for when the tag is focused from tabbing into it
    // tooltip is expected to open only from keyboard interaction
    if (event.key === 'Tab') {
      this.lastInteractionWasKeyboard = true;
    }
    if (event.key === ' ' || event.key === 'Enter' || event.key === 'Escape') {
      this.lastInteractionWasKeyboard = true;
      if (this.closeOnActivation) {
        this._handleHoverOut();
      }
    }
  };

  /**
   * Handles `slotchange` event.
   */
  protected _handleSlotChange({ target }: Event) {
    const component = (target as HTMLSlotElement).assignedNodes().filter(
      (node) => node.nodeType !== Node.TEXT_NODE || node!.textContent!.trim() // eslint-disable-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
    );
    if (!component[0]) {
      return;
    }

    (component[0] as HTMLElement).addEventListener('focus', this._handleHover);
    (component[0] as HTMLElement).addEventListener(
      'focusout',
      this._handleHoverOut
    );

    if (!this.keyboardOnly) {
      (component[0] as HTMLElement).addEventListener(
        'mouseover',
        this._handleHover
      );
      (component[0] as HTMLElement).addEventListener(
        'mouseleave',
        this._handleHoverOut
      );
    }
    this.requestUpdate();
  }

  connectedCallback() {
    if (!this.hasAttribute('highContrast')) {
      this.setAttribute('highContrast', '');
    }
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
    }
    window.addEventListener('keydown', this._handleKeydown, true);
    super.connectedCallback();
  }

  disconnectedCallback() {
    window.removeEventListener('keydown', this._handleKeydown, true);
    super.disconnectedCallback();
  }

  updated(changedProperties) {
    const { selectorTooltipContent } = this.constructor as typeof CDSTooltip;
    const toolTipContent = this.querySelector(selectorTooltipContent);

    if (changedProperties.has('defaultOpen')) {
      this.open = this.defaultOpen;
    }

    if (changedProperties.has('open')) {
      // eslint-disable-next-line  @typescript-eslint/no-unused-expressions -- https://github.com/carbon-design-system/carbon/issues/20452
      this.open
        ? toolTipContent?.setAttribute('open', '')
        : toolTipContent?.removeAttribute('open');
    }

    ['align', 'caret', 'autoalign', 'dropShadow'].forEach((name) => {
      if (changedProperties.has(name)) {
        const { [name as keyof CDSTooltip]: value } = this;
        (toolTipContent as CDSTooltipContent)[name] = value;
      }
    });

    if (this.hasAttribute('highcontrast')) {
      toolTipContent?.setAttribute('highcontrast', '');
    }

    this.shadowRoot
      ?.querySelector(`.${prefix}--popover-container`)
      ?.classList.add(`${prefix}--tooltip`);

    super.updated(changedProperties);
  }

  /**
   * A selector that will return the CDSTooltipContent.
   */
  static get selectorTooltipContent() {
    return `${prefix}-tooltip-content`;
  }

  static get styles() {
    return css`
      ${super.styles}${styles}
    `;
  }
}

export default CDSTooltip;
