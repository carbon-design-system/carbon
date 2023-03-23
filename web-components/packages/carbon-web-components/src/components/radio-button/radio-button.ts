/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit/directives/class-map.js';
import { LitElement, html } from 'lit';
import { property, customElement, query } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import { ifDefined } from 'lit/directives/if-defined.js';
import HostListener from '../../globals/decorators/host-listener';
import FocusMixin from '../../globals/mixins/focus';
import HostListenerMixin from '../../globals/mixins/host-listener';
import RadioGroupManager, {
  NAVIGATION_DIRECTION,
  ManagedRadioButtonDelegate,
} from '../../globals/internal/radio-group-manager';
import { RADIO_BUTTON_LABEL_POSITION, RADIO_BUTTON_ORIENTATION } from './defs';
import styles from './radio-button.scss';

export { RADIO_BUTTON_LABEL_POSITION };

/**
 * Map of navigation direction by key for horizontal alignment.
 */
const navigationDirectionForKeyHorizontal = {
  ArrowLeft: NAVIGATION_DIRECTION.BACKWARD,
  Left: NAVIGATION_DIRECTION.BACKWARD, // IE
  ArrowRight: NAVIGATION_DIRECTION.FORWARD,
  Right: NAVIGATION_DIRECTION.FORWARD, // IE
};

/**
 * Map of navigation direction by key for vertical alignment.
 */
const navigationDirectionForKeyVertical = {
  ArrowUp: NAVIGATION_DIRECTION.BACKWARD,
  Up: NAVIGATION_DIRECTION.BACKWARD, // IE
  ArrowDown: NAVIGATION_DIRECTION.FORWARD,
  Down: NAVIGATION_DIRECTION.FORWARD, // IE
};

/**
 * The interface for `RadioGroupManager` for radio button.
 */
class RadioButtonDelegate implements ManagedRadioButtonDelegate {
  /**
   * The radio button to target.
   */
  private _radio: HTMLInputElement;

  constructor(radio: HTMLInputElement) {
    this._radio = radio;
  }

  get checked() {
    return this._radio.checked;
  }

  set checked(checked) {
    const { host } = this._radio.getRootNode() as ShadowRoot;
    const { eventChange } = host.constructor as typeof CDSRadioButton; // eslint-disable-line no-use-before-define
    (host as CDSRadioButton).checked = checked;
    this._radio.tabIndex = checked ? 0 : -1;
    host.dispatchEvent(
      new CustomEvent(eventChange, {
        bubbles: true,
        composed: true,
        detail: {
          checked,
        },
      })
    );
  }

  get tabIndex() {
    return this._radio.tabIndex;
  }

  set tabIndex(tabIndex) {
    this._radio.tabIndex = tabIndex;
  }

  get name() {
    return this._radio.name;
  }

  compareDocumentPosition(other: RadioButtonDelegate) {
    return this._radio.compareDocumentPosition(other._radio);
  }

  focus() {
    this._radio.focus();
  }
}

/**
 * Radio button.
 *
 * @element cds-radio-button
 * @fires cds-radio-button-changed - The custom event fired after this radio button changes its checked state.
 */
@customElement(`${prefix}-radio-button`)
class CDSRadioButton extends HostListenerMixin(FocusMixin(LitElement)) {
  /**
   * The radio group manager associated with the radio button.
   */
  private _manager: RadioGroupManager | null = null;

  /**
   * The interface for `RadioGroupManager` for radio button.
   */
  private _radioButtonDelegate!: RadioButtonDelegate;

  /**
   * The hidden radio button.
   */
  @query('#input')
  private _inputNode!: HTMLInputElement;

  /**
   * Handles `click` event on this element.
   */
  @HostListener('click')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleClick = () => {
    const { disabled, _radioButtonDelegate: radioButtonDelegate } = this;
    if (radioButtonDelegate && !disabled && !this.disabledItem) {
      this.checked = true;
      if (this._manager) {
        this._manager.select(radioButtonDelegate, this.readOnly);
      }
    }
  };

  /**
   * Handles `keydown` event on this element.
   */
  @HostListener('keydown')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleKeydown = (event: KeyboardEvent) => {
    const { orientation, _radioButtonDelegate: radioButtonDelegate } = this;
    const manager = this._manager;
    if (radioButtonDelegate && manager) {
      const navigationDirectionForKey =
        orientation === RADIO_BUTTON_ORIENTATION.HORIZONTAL
          ? navigationDirectionForKeyHorizontal
          : navigationDirectionForKeyVertical;
      const navigationDirection = navigationDirectionForKey[event.key];
      if (navigationDirection) {
        manager.select(
          manager.navigate(radioButtonDelegate, navigationDirection),
          this.readOnly
        );
      }
      if (event.key === ' ' || event.key === 'Enter') {
        manager.select(radioButtonDelegate, this.readOnly);
      }
    }
  };

  /**
   * `true` if this radio button should be checked.
   */
  @property({ type: Boolean, reflect: true })
  checked = false;

  /**
   * `true` if the radio button item should be disabled.
   */
  @property({ type: Boolean, reflect: true })
  disabledItem = false;

  /**
   * `true` if the radio button group should be disabled.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * `true` if the label should be hidden.
   */
  @property({ type: Boolean, reflect: true, attribute: 'hide-label' })
  hideLabel = false;

  /**
   * The label position.
   */
  @property({ reflect: true, attribute: 'label-position' })
  labelPosition = RADIO_BUTTON_LABEL_POSITION.RIGHT;

  /**
   * The label text.
   */
  @property({ attribute: 'label-text' })
  labelText = '';

  /**
   * The `name` attribute for the `<input>` for selection.
   */
  @property()
  name!: string;

  /**
   * The orientation to lay out radio buttons.
   */
  @property({ reflect: true })
  orientation = RADIO_BUTTON_ORIENTATION.HORIZONTAL;

  /**
   * `true` if the radio button group should be disabled.
   */
  @property({ type: Boolean, reflect: true })
  readOnly = false;

  /**
   * The `value` attribute for the `<input>` for selection.
   */
  @property()
  value!: string;

  disconnectedCallback() {
    if (this._manager) {
      this._manager.delete(this._radioButtonDelegate);
    }
    super.disconnectedCallback();
  }

  firstUpdated() {
    this._radioButtonDelegate = new RadioButtonDelegate(this._inputNode);
  }

  updated(changedProperties) {
    const {
      _inputNode: inputNode,
      _radioButtonDelegate: radioButtonDelegate,
      name,
    } = this;
    if (changedProperties.has('checked') || changedProperties.has('name')) {
      if (this.readOnly) {
        this.checked = false;
      }
      if (!this._manager) {
        this._manager = RadioGroupManager.get(
          this.getRootNode({ composed: true }) as Document
        );
      }
      const { _manager: manager } = this;
      if (changedProperties.has('name')) {
        manager!.delete(radioButtonDelegate, changedProperties.get('name'));
        if (name) {
          manager!.add(radioButtonDelegate);
        }
      }
      inputNode.setAttribute(
        'tabindex',
        !name || !manager || !manager.shouldBeFocusable(radioButtonDelegate)
          ? '-1'
          : '0'
      );
    }
  }

  render() {
    const {
      checked,
      hideLabel,
      labelText,
      name,
      value,
      disabled,
      disabledItem,
    } = this;
    const innerLabelClasses = classMap({
      [`${prefix}--visually-hidden`]: hideLabel,
    });
    return html`
      <input
        id="input"
        type="radio"
        class="${prefix}--radio-button"
        .checked=${checked}
        ?disabled="${disabledItem || disabled}"
        name=${ifDefined(name)}
        value=${ifDefined(value)} />
      <label for="input" class="${prefix}--radio-button__label">
        <span class="${prefix}--radio-button__appearance"></span>
        <span class="${innerLabelClasses}"><slot>${labelText}</slot></span>
      </label>
    `;
  }

  /**
   * The name of the custom event fired after this radio button changes its checked state.
   */
  static get eventChange() {
    return `${prefix}-radio-button-changed`;
  }

  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };
  static styles = styles;
}

export default CDSRadioButton;
