/**
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit/directives/class-map.js';
import { LitElement, html, svg } from 'lit';
import { property, query } from 'lit/decorators.js';
import Checkbox16 from '@carbon/icons/lib/checkbox/16.js';
import CheckboxCheckedFilled16 from '@carbon/icons/lib/checkbox--checked--filled/16.js';
import { prefix } from '../../globals/settings';
import FocusMixin from '../../globals/mixins/focus';
import HostListenerMixin from '../../globals/mixins/host-listener';
import { TILE_COLOR_SCHEME } from './defs';
import styles from './tile.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

/**
 * Multi-selectable tile.
 *
 * @element cds-selectable-tile
 * @fires cds-selectable-tile-changed - The custom event fired after this selectable tile changes its selected state.
 */
@customElement(`${prefix}-selectable-tile`)
class CDSSelectableTile extends HostListenerMixin(FocusMixin(LitElement)) {
  @query('input')
  protected _inputNode!: HTMLInputElement;

  /**
   * The `type` attribute of the `<input>`.
   */
  protected _inputType = 'checkbox';

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
              (this.constructor as typeof CDSSelectableTile)?.aiLabelItem
            ) ||
            // remove reference of slug in v12
            (elem as HTMLElement).matches(
              (this.constructor as typeof CDSSelectableTile)?.slugItem
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
   * Handles `change` event on the `<input>` in the shadow DOM.
   */
  protected _handleChange() {
    this.selected = this._inputNode.checked;

    const selected = this.selected;
    const { eventChange } = this.constructor as typeof CDSSelectableTile;
    this.dispatchEvent(
      new CustomEvent(eventChange, {
        bubbles: true,
        composed: true,
        detail: {
          selected,
        },
      })
    );
  }

  /**
   * Handles the rendering of the icon.
   */
  protected _renderIcon() {
    const { selected, checkmarkLabel } = this;

    return html` ${selected
      ? CheckboxCheckedFilled16({
          children: !checkmarkLabel
            ? undefined
            : svg`<title>${checkmarkLabel}</title>`,
        })
      : Checkbox16({
          children: !checkmarkLabel
            ? undefined
            : svg`<title>${checkmarkLabel}</title>`,
        })}`;
  }

  /**
   * Listener function for click interaction.
   *
   */
  private _handleClick = () => {
    this.selected = !this.selected; // Toggle selection
    const { eventChange } = this.constructor as typeof CDSSelectableTile;
    this.dispatchEvent(
      new CustomEvent(eventChange, {
        bubbles: true,
        composed: true,
        detail: {
          selected: this.selected,
        },
      })
    );
  };

  /**
   * Listener function for keyboard interaction.
   *
   * @param event to get the key pressed
   */
  protected _handleKeydown = (event: KeyboardEvent) => {
    const { key } = event;
    if (
      (key === ' ' || key === 'Enter') &&
      !(event.target as HTMLElement)?.matches(
        (this.constructor as typeof CDSSelectableTile).aiLabelItem
      ) &&
      !(event.target as HTMLElement)?.matches(
        (this.constructor as typeof CDSSelectableTile).slugItem
      )
    ) {
      this.selected = !this.selected;
    }
  };

  /**
   * The a11y text for the checkmark icon of the selected state.
   */
  @property({ attribute: 'checkmark-label' })
  checkmarkLabel!: string;

  /**
   * The color scheme.
   */
  @property({ attribute: 'color-scheme', reflect: true })
  colorScheme = TILE_COLOR_SCHEME.REGULAR;

  /**
   * `true` if the seletable tile should be disabled.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Specify if the `SeletableTile` component should be rendered with rounded corners.
   * Only valid when `ai-label` prop is present
   */
  @property({ type: Boolean, attribute: 'has-rounded-corners' })
  hasRoundedCorners = false;

  /**
   * @deprecated
   *
   * The form name.
   */
  @property()
  name!: string;

  /**
   * `true` to show the selected state.
   */
  @property({ type: Boolean, reflect: true })
  selected = false;

  /**
   * @deprecated
   *
   * The form value.
   */
  @property()
  value!: string;

  updated() {
    if (this._hasAILabel) {
      this.setAttribute('ai-label', '');
    } else {
      this.removeAttribute('ai-label');
    }
  }

  render() {
    const {
      colorScheme,
      disabled,
      hasRoundedCorners,
      name,
      selected,
      value,
      _handleChange: handleChange,
      _hasAILabel: hasAILabel,
    } = this;
    const classes = classMap({
      [`${prefix}--tile`]: true,
      [`${prefix}--tile--disabled`]: disabled,
      [`${prefix}--tile--selectable`]: true,
      [`${prefix}--tile--is-selected`]: selected,
      [`${prefix}--tile--${colorScheme}`]: colorScheme,
      [`${prefix}--tile--slug-rounded`]: hasAILabel && hasRoundedCorners,
    });
    return html`
      <div
        class=${classes}
        role="checkbox"
        aria-checked=${selected}
        @change=${handleChange}
        tabindex=${!disabled ? 0 : undefined}
        name=${name}
        value=${value}
        @click=${!disabled ? this._handleClick : undefined}
        @keydown=${this._handleKeydown}>
        <span
          class="${prefix}--tile__checkmark ${prefix}--tile__checkmark--persistent">
          ${this._renderIcon()}
        </span>
        <label class="${prefix}--tile-content">
          <slot></slot>
        </label>
        <slot name="decorator"></slot>
        <slot name="ai-label" @slotchange="${this._handleSlotChange}"></slot>
        <slot name="slug" @slotchange="${this._handleSlotChange}"></slot>
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
   * The name of the custom event fired after this selectable tile changes its selected state.
   */
  static get eventChange() {
    return `${prefix}-selectable-tile-changed`;
  }

  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  static styles = styles;
}

export default CDSSelectableTile;
