/**
 * @license
 *
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';
import { stackManager, StackStepSize } from './stack-signal';

/**
 * Tearsheet Stack wrapper component - Enables stacking behavior for child tearsheets.
 *
 * This component provides a context for tearsheet stacking, similar to React's StackProvider.
 * Wrap multiple tearsheets with this component to enable stacking behavior.
 *
 * @element c4p-tearsheet-stack
 * @slot - Default slot for tearsheet children
 */
@customElement(`${prefix}-tearsheet-stack`)
class CDSTearsheetStack extends LitElement {
  /**
   * Defines the step size for stacking offset.
   * - 'sm': 0.5rem buffer
   * - 'md': 0.75rem buffer
   * - 'lg': 1rem buffer (default)
   */
  @property({ type: String, attribute: 'stack-step-size' })
  stackStepSize: StackStepSize = 'lg';

  /**
   * Internal flag to track if this stack is active
   */
  private _isActive: boolean = false;

  connectedCallback(): void {
    super.connectedCallback();

    // Set the stack step size in the stack manager
    stackManager.setStackStepSize(this.stackStepSize);

    // Mark this stack as active
    this._isActive = true;

    // Notify child tearsheets that stacking is enabled
    this.dispatchEvent(
      new CustomEvent(`${prefix}-tearsheet-stack-connected`, {
        bubbles: true,
        composed: true,
        detail: { stackStepSize: this.stackStepSize },
      })
    );
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();

    // Reset the stack manager when wrapper is removed
    if (this._isActive) {
      stackManager.reset();
      this._isActive = false;
    }
  }

  updated(changedProperties: Map<string, any>): void {
    super.updated(changedProperties);

    // Update stack step size if it changes
    if (changedProperties.has('stackStepSize')) {
      stackManager.setStackStepSize(this.stackStepSize);

      // Notify children of the change
      this.dispatchEvent(
        new CustomEvent(`${prefix}-tearsheet-stack-step-size-changed`, {
          bubbles: true,
          composed: true,
          detail: { stackStepSize: this.stackStepSize },
        })
      );
    }
  }

  render() {
    // Simple passthrough wrapper - just renders children
    return html`<slot></slot>`;
  }

  /**
   * No styles needed - this is a logical wrapper only
   */
  static styles = [];
}

export default CDSTearsheetStack;
