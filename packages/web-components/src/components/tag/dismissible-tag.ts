/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { property, query } from 'lit/decorators.js';
import Close16 from '@carbon/icons/lib/close/16.js';
import { prefix } from '../../globals/settings';
import FocusMixin from '../../globals/mixins/focus';
import HostListener from '../../globals/decorators/host-listener';
import HostListenerMixin from '../../globals/mixins/host-listener';
import { TAG_SIZE, TAG_TYPE } from './defs';
import CDSTag from '../tag/tag';
import '../tooltip/index';
import styles from './tag.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

export { TAG_SIZE, TAG_TYPE };

/**
 * Tag.
 *
 * @fires cds-dismissible-tag-beingclosed - The custom event fired as the element is being closed
 * @fires cds-dismissible-tag-closed - The custom event fired after the element has been closed
 */
@customElement(`${prefix}-dismissible-tag`)
class CDSDismissibleTag extends HostListenerMixin(FocusMixin(CDSTag)) {
  @query('button')
  protected _buttonNode!: HTMLButtonElement;

  /**
   * Handles `slotchange` event.
   */
  protected _handleAILabelSlotChange({ target }: Event) {
    const hasContent = (target as HTMLSlotElement)
      .assignedNodes()
      .filter((elem) =>
        (elem as HTMLElement).matches !== undefined
          ? // remove reference of slug in v12
            (elem as HTMLElement).matches(
              (this.constructor as typeof CDSDismissibleTag).aiLabelItem
            ) ||
            // remove reference of slug in v12
            (elem as HTMLElement).matches(
              (this.constructor as typeof CDSDismissibleTag).slugItem
            )
          : false
      );
    if (hasContent.length > 0) {
      (hasContent[0] as HTMLElement).setAttribute('tag', `${this.type}`);
      (hasContent[0] as HTMLElement).setAttribute('size', 'sm');
      (hasContent[0] as HTMLElement).setAttribute('kind', 'inline');
    }
    this.requestUpdate();
  }

  /**
   * Handles `click` event on this element.
   *
   * @param event The event.
   */
  @HostListener('shadowRoot:click')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  protected _handleClick = (event: MouseEvent) => {
    if (event.composedPath().indexOf(this._buttonNode!) >= 0) {
      if (this.disabled) {
        event.stopPropagation();
      } else if (this.open) {
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
              (this.constructor as typeof CDSDismissibleTag).eventBeforeClose,
              init
            )
          )
        ) {
          this.open = false;
          this.dispatchEvent(
            new CustomEvent(
              (this.constructor as typeof CDSDismissibleTag).eventClose,
              init
            )
          );
        }
      }
    }
  };

  /**
   * Text to show on tag "close" buttons
   */
  @property({ type: String, reflect: true })
  title = 'Dismiss';

  /**
   * `true` if the tag should be disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * `true` if the tag should be open.
   */
  @property({ type: Boolean, reflect: true })
  open = true;

  /**
   * The size of the tag.
   */
  @property({ type: String, reflect: true })
  size = TAG_SIZE.MEDIUM;

  /**
   * Provide a custom `title` to be inserted in the tag.
   */
  @property({ type: String, attribute: 'tag-title', reflect: true })
  tagTitle = '';

  /**
   * Provide text to be rendered inside of a the tag.
   */
  @property({ type: String, reflect: true })
  text = '';

  /**
   * The type of the tag.
   */
  @property({ reflect: true })
  type = TAG_TYPE.GRAY;

  render() {
    const {
      disabled,
      _handleAILabelSlotChange: handleAILabelSlotChange,
      _handleIconSlotChange: handleIconSlotChange,
      _hasEllipsisApplied: hasEllipsisApplied,
      tagTitle,
      text,
      title,
    } = this;

    const dismissLabel = `Dismiss "${text}"`;

    return html`
      <slot name="icon" @slotchange="${handleIconSlotChange}"></slot>
      <div class="${prefix}--interactive--tag-children">
        <span
          title="${tagTitle ? tagTitle : text}"
          class="${prefix}--tag__label">
          ${text}
        </span>
        <slot name="decorator" @slotchange="${handleAILabelSlotChange}"></slot>
        <slot name="ai-label" @slotchange="${handleAILabelSlotChange}"></slot>
        <slot name="slug" @slotchange="${handleAILabelSlotChange}"></slot>
        <cds-tooltip align="bottom" enter-delay-ms=${0}>
          <button
            class="sb-tooltip-trigger"
            role="button"
            aria-labelledby="content"
            class="${prefix}--tag__close-icon"
            ?disabled=${disabled}>
            ${Close16()}
          </button>
          <cds-tooltip-content id="content">
            ${hasEllipsisApplied ? dismissLabel : title}
          </cds-tooltip-content>
        </cds-tooltip>
      </div>
    `;
  }

  /**
   * A selector that will return the slug item.
   *
   * remove in v12
   */
  static get slugItem() {
    return `${prefix}-slug`;
  }

  /**
   * A selector that will return the AI Label item.
   */
  static get aiLabelItem() {
    return `${prefix}-ai-label`;
  }

  /**
   * The name of the custom event fired before this tag is being closed upon a user gesture.
   * Cancellation of this event stops the user-initiated action of closing this tag.
   */
  static get eventBeforeClose() {
    return `${prefix}-dismissible-tag-beingclosed`;
  }

  /**
   * The name of the custom event fired after this tag is closed upon a user gesture.
   */
  static get eventClose() {
    return `${prefix}-dismissible-tag-closed`;
  }

  static styles = styles;
}

export default CDSDismissibleTag;
