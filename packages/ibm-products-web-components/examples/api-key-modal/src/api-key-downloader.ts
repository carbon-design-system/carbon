/**
 * @license
 *
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import styles from './api-key-modal.scss?lit';

const blockClass = `c4p--apikey-modal`;
@customElement('api-key-downloader')
export class APIKeyDownloader extends LitElement {
  @property({ type: String }) apiKey;
  @property({ type: String }) body;
  @property({ type: String }) fileName;
  @property({ type: String }) fileType: 'txt' | 'json' = 'txt';
  @property({ type: String }) linkText;
  @property({ type: String }) downloadLinkLabel;

  @state() private href: string | null = null;
  @state() private download: string | null = null;

  updated(changedProperties: Map<string, unknown>) {
    if (
      changedProperties.has('apiKey') ||
      changedProperties.has('fileName') ||
      changedProperties.has('fileType')
    ) {
      this.generateLinkProps();
    }
  }

  async generateLinkProps() {
    const data =
      this.fileType === 'txt'
        ? this.apiKey
        : JSON.stringify({ apiKey: this.apiKey });
    const blob = new Blob([data], {
      type: this.fileType === 'txt' ? 'text/plain' : 'application/json',
    });
    this.href = URL.createObjectURL(blob);
    this.download = `${this.fileName}.${this.fileType}`;
  }

  render() {
    return html`
      <style>
        ${styles}
      </style>
      <div class=${`${blockClass}__download-container`}>
        <p class=${`${blockClass}__messaging-text`}>
          ${this.body}
          <a
            href=${this.href || ''}
            download=${this.download || ''}
            class=${`${blockClass}__download-link`}
            aria-label=${this.downloadLinkLabel || this.linkText}
            role="button"
          >
            ${this.downloadLinkLabel || this.linkText}
          </a>
        </p>
      </div>
    `;
  }
  static styles = styles;
}

export default APIKeyDownloader;
