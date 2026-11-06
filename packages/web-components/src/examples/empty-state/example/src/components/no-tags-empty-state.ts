/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Recipe component — copy-and-customize, not a published package export.
 */

import { LitElement, html, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import './empty-state';
import lightSrc from '../assets/no-tags-light.svg?url';
import darkSrc from '../assets/no-tags-dark.svg?url';

/**
 * `no-tags-empty-state`
 *
 * Thin wrapper around `empty-state` with a default illustration and copy.
 * Every `empty-state` property can be set to override the defaults.
 *
 * @element no-tags-empty-state
 * @fires empty-state-action-click - Fired when the action button is clicked.
 * @fires empty-state-secondary-action-click - Fired when the secondary action button is clicked.
 */
@customElement('no-tags-empty-state')
export class NoTagsEmptyState extends LitElement {
  /** Illustration theme. Use `dark` when the app uses a dark theme (g90/g100). */
  @property({ attribute: 'illustration-theme' })
  illustrationTheme: 'light' | 'dark' = 'light';

  /** Alt text for the illustration. Falls back to `heading`. */
  @property({ attribute: 'illustration-description' })
  illustrationDescription = '';

  /** Size variant. @default 'md' */
  @property({ reflect: true })
  size: 'md' | 'sm' = 'md';

  /** Main heading. */
  @property()
  heading = 'Empty state title';

  /** Heading element (`h1`–`h6`). @default 'h3' */
  @property({ attribute: 'heading-as' })
  headingAs: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' = 'h3';

  /** Subtitle. */
  @property()
  subtitle = 'Description text explaining why this section is empty.';

  /** Custom subtitle content. Overrides `subtitle` when set. */
  @property({ attribute: false })
  subtitleContent?: TemplateResult;

  /** Action button label. */
  @property({ attribute: 'action-text' })
  actionText = '';

  /** Action button kind. @default 'tertiary' */
  @property({ attribute: 'action-kind' })
  actionKind = 'tertiary';

  /** Icon rendered inside the action button. */
  @property({ attribute: false })
  actionIcon?: TemplateResult | null;

  /** Secondary button label. */
  @property({ attribute: 'secondary-action-text' })
  secondaryActionText = '';

  /** Link label. */
  @property({ attribute: 'link-text' })
  linkText = '';

  /** Link href. */
  @property({ attribute: 'link-href' })
  linkHref = '';

  /** Link target. */
  @property({ attribute: 'link-target' })
  linkTarget = '';

  protected createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <empty-state
        illustration-src="${this.illustrationTheme === 'dark' ? darkSrc : lightSrc}"
        illustration-description="${this.illustrationDescription}"
        size="${this.size}"
        heading="${this.heading}"
        heading-as="${this.headingAs}"
        subtitle="${this.subtitle}"
        .subtitleContent="${this.subtitleContent}"
        action-text="${this.actionText}"
        action-kind="${this.actionKind}"
        .actionIcon="${this.actionIcon}"
        secondary-action-text="${this.secondaryActionText}"
        link-text="${this.linkText}"
        link-href="${this.linkHref}"
        link-target="${this.linkTarget}">
      </empty-state>
    `;
  }
}

export default NoTagsEmptyState;
