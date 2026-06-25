/**
 * @license
 *
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';

import { prefix } from '../../globals/settings';
import styles from './checklist.scss?lit';
import { Statuses, Kinds } from './checklist.types';
import { classMap } from 'lit/directives/class-map.js';

/**
 * item in c4p-checklist-group
 * @element c4p-checklist-item
 * @slot icon - checklist item icon, usually a status indicator icon
 * @slot content - checklist item title/description
 * @fires c4p-checklist-item-clicked - The custom event which is fired when a user clicks on checklist item with clickable attribute.
 */
@customElement(`${prefix}-checklist-item`)
class CDSChecklistItem extends LitElement {
  /**
   * label of the c4p-checklist-item
   */
  @property()
  label;

  /**
   * status of the c4p-checklist-item
   * Values can be 'not started', 'in progress', 'completed', 'error', 'disabled'
   */
  @property()
  status;

  /** When true, makes the checklist item label clickable */
  @property({ type: Boolean })
  clickable = false;

  private _handleClick(event: Event) {
    const triggeredBy = event.target;
    event.stopPropagation();
    const init = {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: {
        triggeredBy,
      },
    };
    this.dispatchEvent(
      new CustomEvent(
        (this.constructor as typeof CDSChecklistItem).checklistItemClicked,
        init
      )
    );
  }

  private _handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      this._handleClick(event);
    }
  }

  private _mapStatusToKind(status): Kinds {
    switch (status) {
      case Statuses.NotStarted:
        return Kinds.unchecked;
      case Statuses.InProgress:
        return Kinds.indeterminate;
      case Statuses.Completed:
        return Kinds.checked;
      case Statuses.Error:
        return Kinds.error;
      case Statuses.Disabled:
        return Kinds.disabled;
      default:
        return Kinds.error;
    }
  }

  private _updateAttributes() {
    this.setAttribute('role', 'listitem');
    this.classList.add(`${prefix}--checklist__list-item`);
  }

  firstUpdated() {
    this._updateAttributes();
  }

  render() {
    const {
      clickable,
      label,
      status,
      _handleClick: handleClick,
      _handleKeyDown: handleKeyDown,
    } = this;

    const iconKind: string = this._mapStatusToKind(status);

    const classes = classMap({
      [`${prefix}--checklist__label`]: true,
      [`${prefix}--checklist__label--clickable`]: clickable,
      [`${prefix}--checklist__label--disabled`]: status === Statuses.Disabled,
    });

    return html`
      <slot name="icon">
        <c4p-checklist-icon kind="${iconKind}"></c4p-checklist-icon>
      </slot>
      <slot name="content">
        <div
          class="${classes}"
          title=${label}
          role=${clickable ? 'link' : undefined}
          @click=${clickable ? handleClick : undefined}
          @keydown=${clickable ? handleKeyDown : undefined}
          tabindex=${clickable ? 0 : -1}
        >
          ${label}
        </div>
      </slot>
    `;
  }

  /**
   * The custom event which is fired when the checklist item is clicked.
   */
  static get checklistItemClicked() {
    return `${prefix}-checklist-item-clicked`;
  }

  static styles = styles;
}

export default CDSChecklistItem;
