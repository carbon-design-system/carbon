/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import ChevronDown16 from '@carbon/icons/lib/chevron--down/16';
import { prefix } from '../../globals/settings';
import HostListener from '../../globals/decorators/host-listener';
import FocusMixin from '../../globals/mixins/focus';
import HostListenerMixin from '../../globals/mixins/host-listener';
import { TILE_COLOR_SCHEME } from './defs';
import styles from './tile.scss?lit';
import { classMap } from 'lit/directives/class-map.js';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

/**
 * Expandable tile.
 *
 * @element cds-expandable-tile
 * @fires cds-expandable-tile-beingtoggled
 *   The custom event fired before the expanded state is changed upon a user gesture.
 *   Cancellation of this event stops changing the user-initiated change in expanded state.
 * @fires cds-expandable-tile-toggled - The custom event fired after a the expanded state is changed upon a user gesture.
 */
@customElement(`${prefix}-expandable-tile`)
class CDSExpandableTile extends HostListenerMixin(FocusMixin(LitElement)) {
  /**
   * The computed height of the below-the-fold content.
   */
  private _belowTheContentHeight = 0;

  /**
   * `true` if there is an AI Label.
   */
  protected _hasAILabel = false;

  /**
   * Handles `slotchange` event.
   */
  protected _handleSlotChange({ target }: Event) {
    const hasContent = (target as HTMLSlotElement)
      .assignedNodes()
      .filter((elem) =>
        (elem as HTMLElement).matches !== undefined
          ? (elem as HTMLElement).matches(
              (this.constructor as typeof CDSExpandableTile)?.aiLabelItem
            ) ||
            // remove reference of slug in v12
            (elem as HTMLElement).matches(
              (this.constructor as typeof CDSExpandableTile)?.slugItem
            )
          : false
      );

    if (hasContent.length > 0) {
      this._hasAILabel = Boolean(hasContent);
      (hasContent[0] as HTMLElement).setAttribute('size', 'xs');
    }
    this.requestUpdate();
  }

  /**
   * Handles `slotchange` event on the below-the-fold content.
   *
   * @param event The event.
   */
  private _handleSlotChangeBelowTheFoldContent(event: Event) {
    this._belowTheContentHeight = (event.target as HTMLSlotElement)
      .assignedNodes()
      .reduce(
        (acc, item) => acc + ((item as HTMLElement).offsetHeight ?? 0),
        0
      );

    if (!this._belowTheContentHeight) {
      const element = getComputedStyle(
        this.querySelector('cds-tile-below-the-fold-content') as any
      );
      this._belowTheContentHeight = parseInt(element.height, 10);
    }
    this.requestUpdate();
  }

  private _handleExpand() {
    const expanded = !this.expanded;
    this.focus();
    const init = {
      bubbles: true,
      composed: true,
      detail: {
        expanded,
      },
    };
    const constructor = this.constructor as typeof CDSExpandableTile;
    const beforeChangeEvent = new CustomEvent(constructor.eventBeforeToggle, {
      ...init,
      cancelable: true,
    });
    if (this.dispatchEvent(beforeChangeEvent)) {
      this.expanded = expanded;
      const afterChangeEvent = new CustomEvent(constructor.eventToggle, init);
      this.dispatchEvent(afterChangeEvent);
    }
  }

  @HostListener('click')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleClick = () => {
    if (!this.withInteractive) {
      this._handleExpand();
    }
  };

  /**
   * The color scheme.
   */
  @property({ attribute: 'color-scheme', reflect: true })
  colorScheme = TILE_COLOR_SCHEME.REGULAR;

  /**
   * `true` to expand this expandable tile.
   */
  @property({ type: Boolean, reflect: true })
  expanded = false;

  /**
   * Specify if the `ExpandableTile` component should be rendered with rounded corners.
   * Only valid when `ai-label` prop is present
   */
  @property({ type: Boolean, attribute: 'has-rounded-corners' })
  hasRoundedCorners = false;

  /**
   * `true` to expand this expandable tile.
   */
  @property({ type: Boolean, reflect: true, attribute: 'with-interactive' })
  withInteractive = false;

  updated() {
    if (this._hasAILabel) {
      this.setAttribute('ai-label', '');
    } else {
      this.removeAttribute('ai-label');
    }
  }

  render() {
    const {
      expanded,
      withInteractive,
      _belowTheContentHeight: belowTheContentHeight,
      _handleSlotChangeBelowTheFoldContent: handleSlotChangeBelowTheFoldContent,
    } = this;

    const classes = classMap({
      [`${prefix}--tile__chevron`]: true,
      [`${prefix}--tile__chevron--interactive`]: withInteractive,
    });
    return html`
      <button
        class="${classes}"
        aria-labelledby="above-the-fold-content"
        aria-controls="below-the-fold-content"
        tabindex="0"
        @click="${withInteractive ? this._handleExpand : ''}"
        aria-expanded="${String(Boolean(expanded))}">
        ${ChevronDown16({
          id: 'icon',
        })}
      </button>
      <slot name="ai-label" @slotchange="${this._handleSlotChange}"></slot>
      <slot name="slug" @slotchange="${this._handleSlotChange}"></slot>
      <div id="content" class="${prefix}--tile-content">
        <div><slot name="above-the-fold-content"></slot></div>
        <div
          class="${prefix}-ce--expandable-tile--below-the-fold-content"
          style="${ifDefined(
            !expanded ? undefined : `max-height: ${belowTheContentHeight}px`
          )}">
          <slot @slotchange="${handleSlotChangeBelowTheFoldContent}"></slot>
        </div>
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
   * The name of the custom event fired before the expanded state is changed upon a user gesture.
   * Cancellation of this event stops changing the user-initiated change in expanded state.
   */
  static get eventBeforeToggle() {
    return `${prefix}-expandable-tile-beingtoggled`;
  }

  /**
   * The name of the custom event fired after a the expanded state is changed upon a user gesture.
   */
  static get eventToggle() {
    return `${prefix}-expandable-tile-toggled`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom Vite loader
}

export default CDSExpandableTile;
