/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement, html } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import OverflowMenuHorizontal16 from '@carbon/icons/lib/overflow-menu--horizontal/16';
import BXOverflowMenu from '../overflow-menu/overflow-menu';
import styles from './breadcrumb.scss';

const { prefix } = settings;

/**
 * Overflow menu in breadcrumb.
 *
 * @element bx-breadcrumb-overflow-menu
 */
@customElement(`${prefix}-breadcrumb-overflow-menu`)
class BXBreadcrumbOverflowMenu extends BXOverflowMenu {
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

export default BXBreadcrumbOverflowMenu;
