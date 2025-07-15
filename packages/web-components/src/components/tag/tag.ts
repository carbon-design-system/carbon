/**
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import Close16 from '@carbon/icons/lib/close/16.js';
import { prefix } from '../../globals/settings';
import FocusMixin from '../../globals/mixins/focus';
import HostListener from '../../globals/decorators/host-listener';
import HostListenerMixin from '../../globals/mixins/host-listener';
import { TAG_SIZE, TAG_TYPE } from './defs';
import styles from './tag.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

export { TAG_SIZE, TAG_TYPE };

/**
 * Tag.
 * @element cds-tag
 * @fires cds-tag-beingclosed - The custom event fired as the element is being closed
 * @fires cds-tag-closed - The custom event fired after the element has been closed
 */
@customElement(`${prefix}-tag`)
class CDSTag extends HostListenerMixin(FocusMixin(LitElement)) {
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
          ? (elem as HTMLElement).matches(
              (this.constructor as typeof CDSTag).aiLabelItem
            ) ||
            // remove reference of slug in v12
            (elem as HTMLElement).matches(
              (this.constructor as typeof CDSTag).slugItem
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
   * Handles `slotchange` event.
   */
  protected _handleIconSlotChange({ target }: Event) {
    const hasIcon = (target as HTMLSlotElement).assignedNodes();

    this.hasCustomIcon = Boolean(hasIcon.length > 0);
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
              (this.constructor as typeof CDSTag).eventBeforeClose,
              init
            )
          )
        ) {
          this.open = false;
          this.dispatchEvent(
            new CustomEvent(
              (this.constructor as typeof CDSTag).eventClose,
              init
            )
          );
        }
      }
    }
  };

  /**
   * Text to show on filter tag "clear" buttons. Corresponds to the attribute with the same name
   *
   * @deprecated The `title` property has been deprecated and will be removed in the next major version. Use cds-dismissible-tag instead.
   */
  @property({ type: String })
  title = 'Clear filter';

  /**
   * `true` if the tag should be disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Determine if is a filter/chip
   *
   * @deprecated The `filter` property has been deprecated and will be removed in the next major version. Use cds-dismissible-tag instead.
   */
  @property({ type: Boolean, reflect: true })
  filter = false;

  /**
   * `true` if there is a custom icon.
   */
  @property({ type: Boolean, attribute: 'has-custom-icon', reflect: true })
  hasCustomIcon = false;

  /**
   * `true` if the tag should be open.
   */
  @property({ type: Boolean, reflect: true })
  open = true;

  /**
   * The size of the tag.
   */
  @property({ reflect: true })
  size = TAG_SIZE.MEDIUM;

  /**
   * The type of the tag.
   */
  @property({ reflect: true })
  type = TAG_TYPE.GRAY;

  /**
   * true if the tag text has ellipsis applied
   */
  @state()
  _hasEllipsisApplied = false;

  updated() {
    const textContainer = this.shadowRoot?.querySelector(
      `.${prefix}--tag__label`
    );
    if (!textContainer || this._hasEllipsisApplied === true) return;

    this._hasEllipsisApplied =
      textContainer.scrollWidth > textContainer.clientWidth;

    const root = this.getRootNode();
    // Check if the root is a shadow root and get its host
    if (root instanceof ShadowRoot) {
      const parent = root.host.tagName.toLowerCase();
      if (
        parent === `${prefix}-selectable-tag` ||
        parent === `${prefix}-operational-tag`
      ) {
        this.setAttribute('role', 'button');
        this.tabIndex = this.disabled ? -1 : 0;
      }
    }
  }

  render() {
    const {
      disabled,
      filter,
      _handleAILabelSlotChange: handleAILabelSlotChange,
      _handleIconSlotChange: handleIconSlotChange,
      size,
      title,
    } = this;

    return html`
      ${size !== TAG_SIZE.SMALL
        ? html`<slot name="icon" @slotchange="${handleIconSlotChange}"></slot>`
        : ''}
      <span class="${prefix}--tag__label">
        <slot></slot>
      </span>
      <slot name="decorator" @slotchange="${handleAILabelSlotChange}"></slot>
      <slot name="ai-label" @slotchange="${handleAILabelSlotChange}"></slot>
      <slot name="slug" @slotchange="${handleAILabelSlotChange}"></slot>
      ${filter
        ? html`
            <button class="${prefix}--tag__close-icon" ?disabled=${disabled}>
              ${Close16({ 'aria-label': title })}
            </button>
          `
        : ``}
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
    return `${prefix}-tag-beingclosed`;
  }

  /**
   * The name of the custom event fired after this tag is closed upon a user gesture.
   */
  static get eventClose() {
    return `${prefix}-tag-closed`;
  }

  static styles = styles;
}

export default CDSTag;
