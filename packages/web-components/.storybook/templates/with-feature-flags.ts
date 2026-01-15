/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { iconLoader } from '../../src/globals/internal/icon-loader';
import Chemistry16 from '@carbon/icons/es/chemistry/16.js';
import { prefix } from '../../src/globals/settings';
import '../../src/components/layer/index.js';
import styles from './with-feature-flags.scss?lit';
import { linkTo } from '@storybook/addon-links';

/**
 * Storybook template feature flags component, strictly for presentation purposes
 *
 * @element sb-template-feature-flags
 * @slot The elements contained within the component.
 */
@customElement(`sb-template-feature-flags`)
class CDSFeatureFlags extends LitElement {
  render() {
    return html`
      <div class="${prefix}--annotation__label">
        ${iconLoader(Chemistry16)}
        <span>
          This story is rendered with

          <a @click=${linkTo('Introduction/Feature Flags')}>
            all available feature flags</a
          >
          enabled
        </span>
      </div>
      <div class="${prefix}--annotation__content">
        <slot></slot>
      </div>
    `;
  }

  static styles = styles;
}

export default CDSFeatureFlags;
