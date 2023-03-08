/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, svg } from 'lit';
import { classMap } from 'lit-html/directives/class-map';
import { ifDefined } from 'lit/directives/if-defined';
import { customElement } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import HostListener from '../../globals/decorators/host-listener';
import HostListenerMixin from '../../globals/mixins/host-listener';
import RadioGroupManager, {
  NAVIGATION_DIRECTION,
} from '../../globals/internal/radio-group-manager';
import SelectableTile from './selectable-tile';
import CheckmarkFilled16 from '@carbon/icons/lib/checkmark--filled/16';

/**
 * Map of navigation direction by key.
 */
const navigationDirectionForKey = {
  ArrowUp: NAVIGATION_DIRECTION.BACKWARD,
  Up: NAVIGATION_DIRECTION.BACKWARD, // IE
  ArrowDown: NAVIGATION_DIRECTION.FORWARD,
  Down: NAVIGATION_DIRECTION.FORWARD, // IE
};

/**
 * Single-selectable tile.
 *
 * @element cds-radio-tile
 */
@customElement(`${prefix}-radio-tile`)
class BXRadioTile extends HostListenerMixin(SelectableTile) {
  /**
   * The radio group manager associated with the radio button.
   */
  private _manager!: RadioGroupManager;

  /**
   * The `type` attribute of the `<input>`.
   */
  protected _inputType = 'radio';

  /**
   * Attaches the radio button to the radio group manager.
   */
  private _attachManager() {
    if (!this._manager) {
      this._manager = RadioGroupManager.get(
        this.getRootNode({ composed: true }) as Document
      );
    }
    const { name, _inputNode: inputNode, _manager: manager } = this;
    if (inputNode && name) {
      manager!.add(inputNode);
    }
  }

  /**
   * Detaches the radio button to the radio group manager.
   */
  private _detachManager() {
    const { _inputNode: inputNode, _manager: manager } = this;
    if (inputNode && manager) {
      manager.delete(inputNode);
    }
  }

  /**
   * Handles `keydown` event on this element.
   */
  @HostListener('keydown')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleKeydown = (event: KeyboardEvent) => {
    const { _inputNode: inputNode } = this;
    const manager = this._manager;
    if (inputNode && manager) {
      const navigationDirection = navigationDirectionForKey[event.key];
      if (navigationDirection) {
        manager.select(manager.navigate(inputNode, navigationDirection));
        event.preventDefault(); // Prevent default (scrolling) behavior
      }
      if (event.key === ' ' || event.key === 'Enter') {
        manager.select(inputNode);
      }
    }
  };

  /**
   * Handles `change` event on the `<input>` in the shadow DOM.
   */
  protected _handleChange() {
    super._handleChange();
    if (this._manager) {
      this._manager.select(this._inputNode);
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this._attachManager();
  }

  disconnectedCallback() {
    this._detachManager();
    super.disconnectedCallback();
  }

  shouldUpdate(changedProperties) {
    if (changedProperties.has('name')) {
      this._detachManager();
    }
    return true;
  }

  updated(changedProperties) {
    if (changedProperties.has('name')) {
      this._attachManager();
    }
  }

  render() {
    const {
      colorScheme,
      checkmarkLabel,
      name,
      selected,
      value,
      _inputType: inputType,
      _handleChange: handleChange,
    } = this;
    const classes = classMap({
      [`${prefix}--tile`]: true,
      [`${prefix}--tile--selectable`]: true,
      [`${prefix}--tile--is-selected`]: selected,
      [`${prefix}--tile--${colorScheme}`]: colorScheme,
    });
    return html`
      <input
        type="${inputType}"
        id="input"
        class="${prefix}--tile-input"
        tabindex="-1"
        name="${ifDefined(name)}"
        value="${ifDefined(value)}"
        .checked=${selected}
        @change=${handleChange} />
      <label for="input" class="${classes}" tabindex="0">
        <div class="${prefix}--tile__checkmark">
          ${CheckmarkFilled16({
            children: !checkmarkLabel
              ? undefined
              : svg`<title>${checkmarkLabel}</title>`,
          })}
        </div>
        <div class="${prefix}--tile-content"><slot></slot></div>
      </label>
    `;
  }
}

export default BXRadioTile;
