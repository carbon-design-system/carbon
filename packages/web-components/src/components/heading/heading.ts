/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, LitElement } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import styles from './heading.scss?lit';
import { HeadingLevel } from './defs';
import { prefix } from '../../globals/settings';

@customElement(`${prefix}-section`)
class CDSSection extends LitElement {
  @property({ type: Number }) level?: HeadingLevel;
  private _currentLevel: HeadingLevel = 1;

  private getParentLevel(): HeadingLevel {
    const parentSection = this.parentElement?.closest(
      `${prefix}-section`
    ) as CDSSection;
    return parentSection ? parentSection.getCurrentLevel() : 1;
  }

  connectedCallback() {
    super.connectedCallback();
    const parentLevel = this.getParentLevel();
    this._currentLevel =
      this.level ?? (Math.min(parentLevel + 1, 6) as HeadingLevel);
  }

  getCurrentLevel(): HeadingLevel {
    return this._currentLevel;
  }

  render() {
    return html`<slot></slot>`;
  }
}

/**
 * The heading component
 *
 * @element cds-heading
 */
@customElement(`${prefix}-heading`)
class CDSHeading extends LitElement {
  private level: HeadingLevel = 1;

  connectedCallback() {
    super.connectedCallback();
    const section = this.closest(`${prefix}-section`) as CDSSection;
    this.level = section ? section.getCurrentLevel() : 1;
  }

  render() {
    const headingElement = `
      <h${this.level}>
        <slot></slot>
      </h${this.level}>
    `;

    return html`${unsafeHTML(headingElement)}`;
  }

  static styles = styles;
}

export default CDSHeading;
