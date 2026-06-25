/**
 * @license
 *
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit/directives/class-map.js';
import { html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import { ref } from 'lit/directives/ref.js';
import { prefix, carbonPrefix } from '../../globals/settings';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element';
import styles from './action-set.scss?lit';
import pconsole from '../../globals/internal/pconsole';
import CDSButton from '@carbon/web-components/es/components/button/button.js';
import '@carbon/web-components/es/components/button/index.js';

const blockClass = `${prefix}--action-set`;

// Type definitions
export const ButtonSizes = ['sm', 'md', 'lg', 'xl', '2xl'] as const;
export type ButtonSize = (typeof ButtonSizes)[number];

export type ButtonKind =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'danger'
  | 'ghost'
  | 'danger--ghost';

/**
 * Action button configuration that extends CDSButton properties.
 * Includes all standard button attributes plus custom action-specific properties.
 */
export interface ActionButton extends Partial<Omit<CDSButton, 'kind'>> {
  // Action-specific properties (override CDSButton types where needed)
  kind?: ButtonKind;
  label?: string;
  loading?: boolean;
  onClick?: (event: Event) => void;

  // Allow any other HTML attributes or custom properties
  [key: string]: any;
}

const defaultKind: ButtonKind = 'primary';

/**
 * Determines if buttons should be stacked based on size and number of actions
 */
const willStack = (size: ButtonSize, numberOfActions: number): boolean =>
  size === 'sm' || (size === 'md' && numberOfActions > 2);

/**
 * Returns the order priority for a button kind
 * Lower numbers appear first (or last when stacking)
 */
const buttonOrder = (kind: ButtonKind): number =>
  ({
    ghost: 1,
    'danger--ghost': 2,
    tertiary: 3,
    danger: 5,
    primary: 6,
  })[kind] ?? 4;

/**
 * Sorts actions based on button kind and stacking mode
 * When not stacking: ghost first, primary last
 * When stacking: primary first, ghost last
 */
const sortActions = (
  actions: ActionButton[],
  stacking: boolean
): ActionButton[] => {
  const sortedActions = [...actions];
  sortedActions.sort(
    (action1, action2) =>
      (buttonOrder(action1.kind || defaultKind) -
        buttonOrder(action2.kind || defaultKind)) *
      (stacking ? -1 : 1)
  );
  return sortedActions;
};

/**
 * Validates action set configuration and returns problems
 */
const validateActionSet = (
  actions: ActionButton[],
  size: ButtonSize
): string[] => {
  if (!actions || actions.length === 0) {
    return [];
  }

  const problems: string[] = [];
  const stacking = willStack(size, actions.length);

  const countActions = (kind: ButtonKind): number =>
    actions.filter((action) => (action.kind || defaultKind) === kind).length;

  const primaryActions = countActions('primary');
  const secondaryActions = countActions('secondary');
  const tertiaryActions = countActions('tertiary');
  const dangerActions = countActions('danger');
  const ghostActions = countActions('ghost') + countActions('danger--ghost');

  if (stacking && actions.length > 3) {
    problems.push(
      'you cannot have more than three actions in this size of ActionSet'
    );
  }

  if (actions.length > 4) {
    problems.push('you cannot have more than four actions in an ActionSet');
  }

  if (primaryActions > 1) {
    problems.push(
      "you cannot have more than one 'primary' action in an ActionSet"
    );
  }

  if (ghostActions > 1) {
    problems.push(
      "you cannot have more than one 'ghost' action in an ActionSet"
    );
  }

  if (stacking && actions.length > 1 && ghostActions > 0) {
    problems.push(
      "you cannot have a 'ghost' button in conjunction with other action types in this size of ActionSet"
    );
  }

  if (
    actions.length >
    primaryActions +
      secondaryActions +
      tertiaryActions +
      dangerActions +
      ghostActions
  ) {
    problems.push(
      "you can only have 'primary', 'danger', 'secondary', 'tertiary', 'ghost' and 'danger--ghost' buttons in an ActionSet"
    );
  }

  return problems;
};

/**
 * Action Set component - A specialized button set with validation and ordering logic.
 * Extends Carbon's button-set with additional features for action buttons.
 *
 * @element c4p-action-set
 * @slot - Slot for cds-button elements (used when actions prop is not provided)
 */
@customElement(`${prefix}-action-set`)
export class CDSActionSet extends LitElement {
  /**
   * Number of slotted buttons (computed internally).
   */
  @state()
  private _slottedButtonCount = 0;

  /**
   * Computed property: `true` if the buttons are currently stacked.
   * This is derived from size, disableStacking, and button count.
   */
  get stacked(): boolean {
    const buttonCount = this.actions?.length || this._slottedButtonCount;
    return this.disableStacking ? false : willStack(this.size, buttonCount);
  }

  /**
   * The size of buttons to use for the actions.
   */
  @property({ attribute: 'button-size' })
  buttonSize?: ButtonSize;

  /**
   * The size of the action set. Different button arrangements are used at
   * different sizes, to make best use of the available space.
   */
  @property()
  size: ButtonSize = 'md';

  /**
   * When true, prevents automatic stacking of buttons even when size would
   * normally trigger stacking (e.g., 'sm' size or 'md' with 3+ actions).
   * Buttons will remain in a horizontal layout.
   */
  @property({ type: Boolean, attribute: 'disable-stacking' })
  disableStacking: boolean = false;

  /**
   * Array of action button configurations. When provided, buttons will be
   * rendered internally instead of using slotted content.
   */
  @property({ type: Array })
  actions: ActionButton[] = [];

  static styles = styles;

  /**
   * Applies common button styling (size, classes, expressive attribute)
   * @private
   */
  private _applyButtonStyles(button: HTMLElement, kind?: ButtonKind) {
    if (this.buttonSize) {
      button.setAttribute('size', this.buttonSize);
    }

    button.classList.add(`${blockClass}__action-button`);

    if (kind === 'ghost' || kind === 'danger--ghost') {
      button.classList.add(`${blockClass}__action-button--ghost`);
    }

    button.setAttribute('is-expressive', 'true');
  }

  /**
   * Processes actions: validates, determines stacking, and sorts
   * @private
   */
  private _processActions(actions: ActionButton[]): {
    sortedActions: ActionButton[];
    stacking: boolean;
    problems: string[];
  } {
    const problems = validateActionSet(actions, this.size);
    const stacking = this.disableStacking
      ? false
      : willStack(this.size, actions.length);
    const sortedActions = sortActions(actions, stacking);

    if (problems.length > 0) {
      pconsole.warn(
        `Invalid actions in ActionSet: ${problems.join(', and ')}.`
      );
    }

    return { sortedActions, stacking, problems };
  }

  /**
   * Handler for @slotchange, processes and orders buttons based on ActionSet logic
   *
   * @private
   */
  protected _handleSlotChange(event: Event) {
    const childItems = (event.target as HTMLSlotElement)
      .assignedNodes()
      .filter((elem) =>
        (elem as HTMLElement).matches !== undefined
          ? (elem as HTMLElement).matches(`${carbonPrefix}-button`)
          : false
      ) as HTMLElement[];

    if (childItems.length === 0) {
      return;
    }

    // Extract button properties to create ActionButton objects
    const actions: ActionButton[] = childItems.map((button) => {
      const kind = button.getAttribute('kind') as ButtonKind;
      const disabled = button.hasAttribute('disabled');
      const label = button.textContent?.trim() || '';

      return {
        kind: kind || 'primary',
        disabled,
        label,
      };
    });

    // Process actions (validate, sort, determine stacking)
    const { sortedActions } = this._processActions(actions);

    // Update state
    this._slottedButtonCount = childItems.length;

    // Reorder and style the buttons
    this._reorderButtons(childItems, sortedActions);

    // Dispatch update event
    const update = new CustomEvent(`${prefix}-action-set-update`, {
      bubbles: true,
      cancelable: true,
      composed: true,
    });

    this.dispatchEvent(update);
  }

  /**
   * Reorders the button elements in the DOM based on the sorted actions
   * and applies appropriate styling
   *
   * @private
   */
  private _reorderButtons(
    buttons: HTMLElement[],
    sortedActions: ActionButton[]
  ) {
    // Create a map of button labels to elements for quick lookup
    const buttonMap = new Map<string, HTMLElement>();
    buttons.forEach((button) => {
      const label = button.textContent?.trim() || '';
      buttonMap.set(label, button);
    });
    // Apply styling to buttons based on sorted order
    sortedActions.forEach((action) => {
      const button = buttonMap.get(action.label || '');
      if (button) {
        this._applyButtonStyles(button, action.kind);
      }
    });
  }

  /**
   * When a button within the action-set is focused, hide the margin on both sides
   * of the focused button, by applying the appropriate styles to its sibling
   *
   * @private
   */
  private _hideSiblingMargin = () => {
    let items: HTMLElement[] = [];

    // Check if we have slotted content
    const slot = this.shadowRoot?.querySelector('slot');
    if (slot) {
      items = slot
        .assignedElements()
        .filter(
          (el) => el.tagName.toLowerCase() === `${carbonPrefix}-button`
        ) as HTMLElement[];
    }

    // If no slotted content, check for directly rendered buttons in shadow DOM
    if (items.length === 0 && this.shadowRoot) {
      items = Array.from(
        this.shadowRoot.querySelectorAll(`${carbonPrefix}-button`)
      ) as HTMLElement[];
    }

    if (items.length === 0) {
      return;
    }

    const focusedIndex = items.findIndex((el) => el.matches(':focus-within'));

    items.forEach((el, idx) => {
      const shouldHide =
        focusedIndex >= 0 && (idx === focusedIndex || idx === focusedIndex + 1);
      el.toggleAttribute('hide-margin', shouldHide);
    });
  };

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('focusin', this._hideSiblingMargin);
    this.addEventListener('focusout', this._hideSiblingMargin);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('focusin', this._hideSiblingMargin);
    this.removeEventListener('focusout', this._hideSiblingMargin);
  }

  /**
   * Renders buttons from the actions prop
   * @private
   */
  private _renderActionsFromProp() {
    if (!this.actions || this.actions.length === 0) {
      return null;
    }

    // Process actions (validate, sort)
    const { sortedActions } = this._processActions(this.actions);

    return sortedActions.map((action) => {
      const {
        kind = 'primary',
        label = '',
        disabled = false,
        loading = false,
        onClick,
        class: customClass,
        ...rest
      } = action;

      // Merge custom class with action-set classes
      const buttonClasses = classMap({
        [`${blockClass}__action-button`]: true,
        [`${blockClass}__action-button--ghost`]:
          kind === 'ghost' || kind === 'danger--ghost',
        ...(customClass ? { [customClass]: true } : {}),
      });

      // Create a ref callback to apply rest properties (excluding class which is handled above)
      const buttonRef = (el: Element | undefined) => {
        if (el && rest) {
          Object.entries(rest).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
              if (typeof value === 'boolean') {
                if (value) {
                  el.setAttribute(key, '');
                } else {
                  el.removeAttribute(key);
                }
              } else {
                el.setAttribute(key, String(value));
              }
            }
          });
        }
      };

      return html`
        <cds-button
          ${ref(buttonRef)}
          class="${buttonClasses}"
          kind="${kind}"
          size="${this.buttonSize}"
          ?disabled="${disabled || loading}"
          is-expressive="true"
          @click="${typeof onClick === 'function' ? onClick : () => {}}"
        >
          ${label}
        </cds-button>
      `;
    });
  }

  render() {
    const { actions, _slottedButtonCount, stacked } = this;
    const buttonCount = actions?.length || _slottedButtonCount;

    const defaultClasses = {
      [blockClass]: true,
      [`${blockClass}--row-single`]: !stacked && buttonCount === 1,
      [`${blockClass}--row-double`]: !stacked && buttonCount === 2,
      [`${blockClass}--row-triple`]: !stacked && buttonCount === 3,
      [`${blockClass}--row-quadruple`]: !stacked && buttonCount >= 4,
      [`${blockClass}--stacking`]: stacked,
      [`${blockClass}--${this.size}`]: true,
    };

    // If actions prop is provided, render buttons directly without cds-button-set
    // to avoid button-set's automatic kind assignment
    if (actions && actions.length > 0) {
      const buttonSetClasses = classMap({
        ...defaultClasses,
        [`${carbonPrefix}--btn-set--stacked`]: stacked,
        [`${carbonPrefix}--btn-set`]: true,
      });

      return html`<div
        class="${buttonSetClasses}"
        part="action-set"
        role="list"
      >
        ${this._renderActionsFromProp()}
      </div>`;
    }

    const classes = classMap({
      ...defaultClasses,
      [`${carbonPrefix}--btn-set--stacked`]: stacked,
      [`${carbonPrefix}--btn-set`]: true,
    });
    return html`<div class="${classes}" part="action-set" role="list">
      <slot @slotchange="${this._handleSlotChange}"></slot>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'c4p-action-set': CDSActionSet;
  }
}

export default CDSActionSet;
