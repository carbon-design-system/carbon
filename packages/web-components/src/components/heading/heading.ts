import { html, LitElement } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import styles from './heading.scss?lit';
import { HeadingLevel } from './defs';

@customElement('cds-section')
class CDSSection extends LitElement {
  @property({ type: Number }) level?: HeadingLevel;
  private _currentLevel: HeadingLevel = 1;

  private getParentLevel(): HeadingLevel {
    const parentSection = this.parentElement?.closest(
      'cds-section'
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

@customElement('cds-heading')
class CDSHeading extends LitElement {
  static styles = styles;
  private level: HeadingLevel = 1;

  connectedCallback() {
    super.connectedCallback();
    const section = this.closest('cds-section') as CDSSection;
    this.level = section ? section.getCurrentLevel() : 1;
  }

  render() {
    switch (this.level) {
      case 1:
        return html`<h1><slot></slot></h1>`;
      case 2:
        return html`<h2><slot></slot></h2>`;
      case 3:
        return html`<h3><slot></slot></h3>`;
      case 4:
        return html`<h4><slot></slot></h4>`;
      case 5:
        return html`<h5><slot></slot></h5>`;
      case 6:
        return html`<h6><slot></slot></h6>`;
      default:
        return html`<h1><slot></slot></h1>`;
    }
  }
}

export default CDSHeading;
