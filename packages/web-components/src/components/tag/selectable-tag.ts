/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import FocusMixin from '../../globals/mixins/focus';
import HostListener from '../../globals/decorators/host-listener';
import HostListenerMixin from '../../globals/mixins/host-listener';
import { TAG_SIZE, TAG_TYPE } from './defs';
import './tag';
import '../tooltip/index';
import styles from './tag.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

export { TAG_SIZE, TAG_TYPE };

/**
 * Selectable tag.
 *
 * @element cds-selectable-tag
 *
 * @fires cds-selectable-tag-beforeselected - The custom event fired as the element is being selected
 * @fires cds-selectable-tag-selected - The custom event fired after the element has been selected
 */
@customElement(`${prefix}-selectable-tag`)
class CDSSelectableTag extends HostListenerMixin(FocusMixin(LitElement)) {
  /**
   * Custom events to be triggered
   * @param event Event object
   */
  protected triggerEvents = (event) => {
    if (this.disabled) {
      event.stopPropagation();
    } else {
      const init = {
        bubbles: true,
        cancelable: true,
        composed: true,
        detail: {
          triggeredBy: event.target,
        },
      };
      if (
        this.dispatchEvent(
          new CustomEvent(
            (this.constructor as typeof CDSSelectableTag).eventBeforeSelected,
            init
          )
        )
      ) {
        this.selected = !this.selected;
        this.dispatchEvent(
          new CustomEvent(
            (this.constructor as typeof CDSSelectableTag).eventSelected,
            init
          )
        );
      }
    }
  };

  /**
   * Handles `click` event on this element.
   *
   * @param event The event.
   */
  @HostListener('shadowRoot:click')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleClick = (event: MouseEvent) => {
    this.triggerEvents(event);
  };

  @HostListener('shadowRoot:keydown')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      this.triggerEvents(event);
    }
  };

  /**
   * `true` if the tag should be disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Specify the state of the selectable tag.
   */
  @property({ type: Boolean, reflect: true })
  selected = false;

  /**
   * The size of the tag.
   */
  @property({ type: String, reflect: true })
  size = TAG_SIZE.MEDIUM;

  /**
   * Provide text to be rendered inside of a the tag.
   */
  @property({ type: String, reflect: true })
  text = '';

  /**
   * true if the tag text has ellipsis applied
   */
  @state()
  protected _hasEllipsisApplied = false;

  async updated() {
    await this.updateComplete;

    const textContainer = this.shadowRoot
      ?.querySelector(`${prefix}-tag`)
      ?.shadowRoot?.querySelector(`.${prefix}--tag__label`);
    if (!textContainer) return;

    const hasEllipsis = textContainer.scrollWidth > textContainer.clientWidth;

    this._hasEllipsisApplied = hasEllipsis;
  }

  render() {
    const {
      disabled,
      selected,
      size,
      text,
      _hasEllipsisApplied: hasEllipsisApplied,
    } = this;

    return html` ${hasEllipsisApplied
      ? html` <cds-tooltip align="bottom" keyboard-only leave-delay-ms=${0}>
          <cds-tag
            ?aria-pressed="${selected}"
            size="${size}"
            ?disabled="${disabled}">
            <slot name="icon" slot="icon"></slot>
            ${text}
            <slot name="decorator" slot="decorator"></slot>
            <slot name="ai-label" slot="ai-label"></slot>
            <slot name="slug" slot="slug"></slot>
          </cds-tag>
          <cds-tooltip-content id="content"> ${text} </cds-tooltip-content>
        </cds-tooltip>`
      : html`
          <cds-tag
            ?aria-pressed="${selected}"
            size="${size}"
            ?disabled="${disabled}">
            <slot name="icon" slot="icon"></slot>
            ${text}
            <slot name="decorator" slot="decorator"></slot>
            <slot name="ai-label" slot="ai-label"></slot>
            <slot name="slug" slot="slug"></slot>
          </cds-tag>
        `}`;
  }

  /**
   * The name of the custom event before this tag is selected.
   */
  static get eventBeforeSelected() {
    return `${prefix}-selectable-tag-beingselected`;
  }

  /**
   * The name of the custom event fired after this tag is selected.
   */
  static get eventSelected() {
    return `${prefix}-selectable-tag-selected`;
  }

  static styles = styles;
}

export default CDSSelectableTag;
