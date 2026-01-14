/**
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { adoptStyles, html } from 'lit';
import { prefix } from '../../globals/settings';
import CDSOverflowMenu from '../overflow-menu/overflow-menu';
import OverflowMenuHorizontal16 from '@carbon/icons/es/overflow-menu--horizontal/16.js';
import { iconLoader } from '../../globals/internal/icon-loader';

import overflowMenuStyles from '../overflow-menu/overflow-menu.scss?lit';
import styles from './breadcrumb.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

/**
 * Overflow menu in breadcrumb.
 *
 * @deprecated use `cds-overflow-menu` instead with the `breadcrumb` property
 *
 * @element cds-breadcrumb-overflow-menu
 */
@customElement(`${prefix}-breadcrumb-overflow-menu`)
class CDSBreadcrumbOverflowMenu extends CDSOverflowMenu {
  connectedCallback() {
    super.connectedCallback();

    adoptStyles(this.renderRoot as ShadowRoot, [overflowMenuStyles, styles]);
  }

  render() {
    return html`
      <slot name="icon">
        ${iconLoader(OverflowMenuHorizontal16, {
          class: `${prefix}--overflow-menu__icon`,
          slot: 'icon',
        })}
      </slot>
    `;
  }
}

export default CDSBreadcrumbOverflowMenu;
