/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { prefix } from '../../globals/settings';
import Close20 from '@carbon/icons/es/close/20.js';
import { iconLoader } from '../../globals/internal/icon-loader';
import { ifDefined } from 'lit/directives/if-defined.js';
import styles from './dialog.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import CDSModalCloseButton from '../modal/modal-close-button';

/**
 * Dialog close button.
 *
 * @element cds-dialog-close-button
 * @csspart button The button.
 * @csspart close-icon The close icon.
 */
@customElement(`${prefix}-dialog-close-button`)
class CDSDialogCloseButton extends CDSModalCloseButton {
  render() {
    const { closeButtonLabel } = this;
    return html`
      <cds-icon-button
        part="button"
        align="left"
        enter-delay-ms=""
        aria-label="${ifDefined(closeButtonLabel)}"
        kind="ghost"
        size="lg"
        leave-delay-ms="">
        ${iconLoader(Close20, {
          slot: 'icon',
          part: 'close-icon',
          class: `${prefix}--dialog-close__icon`,
        })}
        <span slot="tooltip-content">${closeButtonLabel}</span>
      </cds-icon-button>
    `;
  }

  static styles = styles;
}

export default CDSDialogCloseButton;
