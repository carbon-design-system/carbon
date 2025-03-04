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

@customElement(`${prefix}-heading`)
class CDSHeading extends LitElement {
  static styles = styles;
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
}

export default CDSHeading;
