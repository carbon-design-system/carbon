/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { prefix } from '../../globals/settings';
import { html } from 'lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import formStyles from '../form/form.scss?lit';
import checkboxStyles from '../checkbox/checkbox.scss?lit';
import textInputStyles from '../text-input/text-input.scss?lit';
import dropdownStyles from '../dropdown/dropdown.scss?lit';
import styles from './fluid-multi-select.scss?lit';
import { classMap } from 'lit/directives/class-map.js';
import CDSMultiSelect from '../multi-select/multi-select';
import { property } from 'lit/decorators.js';

/**
 * Fluid multi select.
 *
 * @element cds-fluid-multi-select
 */
@customElement(`${prefix}-fluid-multi-select`)
class CDSFluidMultiSelect extends CDSMultiSelect {
  /**
   * Specify if the `FluidMultiSelect` should render its menu items in condensed mode
   */
  @property({ type: Boolean, reflect: true, attribute: 'is-condensed' })
  isCondensed = false;
  connectedCallback() {
    super.connectedCallback();
    this.isFluid = true;
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
    });
    return html`<div class="${wrapperClasses}">${super.render()}</div>`;
  }

  static styles = [
    CDSMultiSelect.styles,
    formStyles,
    checkboxStyles,
    textInputStyles,
    dropdownStyles,
    styles,
  ];
}

export default CDSFluidMultiSelect;
