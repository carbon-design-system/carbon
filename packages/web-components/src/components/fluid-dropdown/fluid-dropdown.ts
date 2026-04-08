/**
 * Copyright IBM Corp.2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { prefix } from '../../globals/settings';
import { html } from 'lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import CDSDropdown from '../dropdown/dropdown';
import styles from './fluid-dropdown.scss?lit';
import { property } from 'lit/decorators.js';

/**
 * Fluid dropdown.
 *
 * @element cds-fluid-dropdown
 */
@customElement(`${prefix}-fluid-dropdown`)
class CDSFluidDropdown extends CDSDropdown {
  // Specify if the FluidDropdown should render its menu items in condensed mode
  @property({ type: Boolean, reflect: true, attribute: 'is-condensed' })
  isCondensed = false;
  connectedCallback() {
    this.setAttribute('isFluid', 'true');
    super.connectedCallback();
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    if (
      changedProperties.has('invalid') ||
      changedProperties.has('disabled') ||
      changedProperties.has('readOnly') ||
      changedProperties.has('warn')
    ) {
      this.requestUpdate();
    }
  }

  render() {
    return html`${super.render()}`;
  }

  static styles = [CDSDropdown.styles, styles];
}

export default CDSFluidDropdown;
