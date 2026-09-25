/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import '../components/EmptyState';

// Use ?url to get the asset URL (not the inline SVG Lit template the vite-lit-loader
// plugin produces for bare .svg imports).
import noDataSrc from '../assets/no-data.svg?url';
import notFoundSrc from '../assets/not-found.svg?url';
import unauthorizedSrc from '../assets/unauthorized.svg?url';
import errorSrc from '../assets/error.svg?url';
import notificationSrc from '../assets/notification.svg?url';

export type IllustrationKey =
  | 'No data'
  | 'Not found'
  | 'Unauthorized'
  | 'Error'
  | 'Notification';

const illustrationMap: Record<IllustrationKey, string> = {
  'No data': noDataSrc,
  'Not found': notFoundSrc,
  Unauthorized: unauthorizedSrc,
  Error: errorSrc,
  Notification: notificationSrc,
};

/**
 * `cds-empty-state-isometric`
 *
 * Preview component — wraps `cds-empty-state` with an isometric SVG illustration.
 *
 * @element cds-empty-state-isometric
 */
@customElement('cds-empty-state-isometric')
export class CDSEmptyStateIsometric extends LitElement {
  /** Illustration key to display. @default 'No data' */
  @property({ attribute: 'illustration-key' })
  illustrationKey: IllustrationKey = 'No data';

  /** Size variant. @default 'md' */
  @property({ reflect: true })
  size: 'md' | 'sm' = 'md';

  /** Main heading. */
  @property()
  heading = 'Get started by adding an asset';

  /** Subtitle. */
  @property()
  subtitle =
    'Unlock product insights by adding assets from your system or cloud environment.';

  /** Action button label. */
  @property({ attribute: 'action-text' })
  actionText = 'Add asset';

  /** Link label. */
  @property({ attribute: 'link-text' })
  linkText = 'Learn more';

  /** Link href. */
  @property({ attribute: 'link-href' })
  linkHref = 'https://carbondesignsystem.com/patterns/empty-states-pattern/';

  protected createRenderRoot() {
    return this;
  }

  render() {
    const src = illustrationMap[this.illustrationKey] ?? illustrationMap['No data'];
    return html`
      <cds-empty-state
        illustration-src="${src}"
        illustration-description="${this.illustrationKey} illustration"
        size="${this.size}"
        heading="${this.heading}"
        subtitle="${this.subtitle}"
        action-text="${this.actionText}"
        action-kind="tertiary"
        link-text="${this.linkText}"
        link-href="${this.linkHref}">
      </cds-empty-state>
    `;
  }
}

export default CDSEmptyStateIsometric;
