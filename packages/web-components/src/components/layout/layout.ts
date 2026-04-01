/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import styles from './layout.scss?lit';

export const LAYOUT_SIZES = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;
export const LAYOUT_DENSITIES = ['condensed', 'normal'] as const;

export type LayoutSize = (typeof LAYOUT_SIZES)[number];
export type LayoutDensity = (typeof LAYOUT_DENSITIES)[number];

/**
 * `<cds-layout>` sets a layout context (size and/or density) for all
 * descendant Carbon components.
 *
 * @element cds-layout
 */
@customElement(`${prefix}-layout`)
class CDSLayout extends LitElement {
  static styles = styles;

  /**
   * Size context for all descendant components.
   */
  @property({ reflect: true })
  size?: LayoutSize;

  /**
   * Density context for all descendant components.
   */
  @property({ reflect: true })
  density?: LayoutDensity;

  render() {
    return html`<slot></slot>`;
  }
}

export { CDSLayout };
export default CDSLayout;
