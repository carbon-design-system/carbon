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

import CheckmarkOutline16 from '@carbon/icons/es/checkmark--outline/16';
import CircleDash16 from '@carbon/icons/es/circle-dash/16';
import Incomplete16 from '@carbon/icons/es/incomplete/16';
import Warning16 from '@carbon/icons/es/warning/16';
import '@carbon/web-components/es/components/icon/index.js';

import { Kinds } from './checklist.types';

import { prefix } from '../../globals/settings';
import { classMap } from 'lit/directives/class-map.js';
import styles from './checklist.scss?lit';

const blockClass = `${prefix}--checklist__icon`;

/**
 * @element c4p-checklist-icon
 * Represents checklist item status with different icons (unchecked, checked, indeterminate, error).
 */
@customElement(`${prefix}-checklist-icon`)
class CDSChecklistIcon extends LitElement {
  /**
   * The icon to be displayed.
   * Values can be 'unchecked', 'indeterminate', 'checked', 'error', 'disabled'

   */
  @property({ type: String, attribute: 'kind' })
  kind = Kinds.unchecked;

  render() {
    const icon: any =
      this.kind === Kinds.checked
        ? CheckmarkOutline16
        : this.kind === Kinds.indeterminate
          ? Incomplete16
          : this.kind === Kinds.error
            ? Warning16
            : CircleDash16;

    const classes = classMap({
      [`${blockClass}`]: true,
      [`${blockClass}--${this.kind}`]: true,
    });

    return html` <span class="${classes}">
      <cds-icon .icon=${icon} size="16" ariaLabel=${this.kind}></cds-icon>
    </span>`;
  }

  static styles = styles;
}

export default CDSChecklistIcon;
