/**
 * Copyright IBM Corp.2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { prefix } from '../../globals/settings';
import { html } from 'lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import styles from './fluid-multi-select.scss?lit';
import { classMap } from 'lit/directives/class-map.js';
import CDSMultiSelect from '../multi-select/multi-select';

/**
 * Fluid multi select.
 *
 * @element cds-fluid-select
 */
@customElement(`${prefix}-fluid-multi-select`)
class CDSFluidMultiSelect extends CDSMultiSelect {
  connectedCallback() {
    this.setAttribute('isFluid', 'true');
    super.connectedCallback();
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    if (
      changedProperties.has('invalid') ||
      changedProperties.has('disabled') ||
      changedProperties.has('readonly') ||
      changedProperties.has('warn')
    ) {
      this.requestUpdate();
    }
  }

  render() {
    const wrapperClasses = classMap({
      [`${prefix}--multi-select__wrapper`]: true,
      [`${prefix}--list-box__wrapper`]: true,
      [`${prefix}--list-box__wrapper--fluid`]: true,
      [`${prefix}--list-box__wrapper--fluid--invalid`]: this.invalid,
      [`${prefix}--select--disabled`]: this.disabled,
      // [`${prefix}--select--readonly`]: this.readonly,
    });
    return html`<div class="${wrapperClasses}">${super.render()}</div>`;
  }

  static styles = [CDSMultiSelect.styles, styles];
}

export default CDSFluidMultiSelect;
