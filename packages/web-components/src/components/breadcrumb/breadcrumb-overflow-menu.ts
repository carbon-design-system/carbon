/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { prefix } from '../../globals/settings';
import OverflowMenuHorizontal16 from '@carbon/icons/lib/overflow-menu--horizontal/16.js';
import CDSOverflowMenu from '../overflow-menu/overflow-menu';
import styles from './breadcrumb.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

/**
 * Overflow menu in breadcrumb.
 *
 * @element cds-breadcrumb-overflow-menu
 */
@customElement(`${prefix}-breadcrumb-overflow-menu`)
class CDSBreadcrumbOverflowMenu extends CDSOverflowMenu {
  render() {
    return html`
      <slot name="icon">
        ${OverflowMenuHorizontal16({
          class: `${prefix}--overflow-menu__icon`,
        })}
      </slot>
    `;
  }

  static styles = styles;
}

export default CDSBreadcrumbOverflowMenu;
