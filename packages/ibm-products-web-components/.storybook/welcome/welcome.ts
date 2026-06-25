/**
 * @license
 *
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { query } from 'lit/decorators/query.js';
import '@carbon/web-components/es/components/tag/index.js';
import '@carbon/web-components/es/components/link/index.js';
import '@aarsteinmedia/dotlottie-player/light';
import type DotLottiePlayer from '@aarsteinmedia/dotlottie-player';
import welcomeStyles from './welcome.scss?lit';
import animation from './welcome-lottie.json';
import PackageInfo from '../../package.json';

@customElement('c4p-welcome')
export class CDSWelcome extends LitElement {
  static styles = welcomeStyles;

  @query('dotlottie-player')
  _player!: DotLottiePlayer;

  firstUpdated() {
    this._player.addEventListener('rendered', async () => {
      // Despite the docs saying "Load animation by URL or JSON object" the typing is string
      // https://github.com/aarsteinmedia/dotlottie-player?tab=readme-ov-file#methods
      // @ts-ignore
      await this._player.load(animation);
    });
  }

  render() {
    return html`
      <div class="welcome__container--outer">
        <div class="welcome__container--inner">
          <div class="welcome__col--left">
            <hgroup class="welcome__header">
              <h2 class="welcome__heading">
                Carbon for
                <br />
                IBM Products Web Components
              </h2>
              <h4 class="welcome__subtitle">v${PackageInfo.version}</h4>
              <cds-tag size="md" type="purple" class="welcome__tag--xl">
                Carbon 11
              </cds-tag>
            </hgroup>
            <div class="welcome__links">
              <cds-link
                href="https://pages.github.ibm.com/carbon/ibm-products/"
                class="welcome__link"
                size="lg"
              >
                Website (IBMers only)
              </cds-link>
              <cds-link
                href="https://carbon-for-ibm-products.netlify.app/?path=/story/overview-welcome--overview"
                class="welcome__link"
                size="lg"
              >
                React Storybook
              </cds-link>
              <cds-link
                href="https://github.com/carbon-design-system/ibm-products"
                class="welcome__link"
                size="lg"
              >
                GitHub repo
              </cds-link>
              <cds-link
                href="https://github.com/carbon-design-system/ibm-products/wiki/Carbon-for-IBM-Products-Releases"
                class="welcome__link"
                size="lg"
              >
                Release schedule
              </cds-link>
              <cds-link
                href="https://github.com/carbon-design-system/ibm-products?tab=security-ov-file"
                class="welcome__link"
                size="lg"
              >
                Security policy
              </cds-link>
              <cds-link
                href="https://pages.github.ibm.com/carbon/ibm-products/developing/get-started/"
                class="welcome__link"
                size="lg"
              >
                Get started
              </cds-link>
            </div>
          </div>
          <div class="welcome__col--right">
            <div class="welcome__animation">
              <dotlottie-player autoplay loop></dotlottie-player>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
