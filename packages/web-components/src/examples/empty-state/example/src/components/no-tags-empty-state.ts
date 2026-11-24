/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Recipe component — copy-and-customize, not a published package export.
 */

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { iconLoader } from '@carbon/web-components/es/globals/internal/icon-loader.js';
import Add20 from '@carbon/icons/es/add/20.js';

import './empty-state';
import noTagsLight from '../assets/no-tags-light.svg?url';
import noTagsDark from '../assets/no-tags-dark.svg?url';

/**
 * Pre-wired EmptyState for no-tags scenarios.
 *
 * Set `illustration-theme="dark"` when using a dark Carbon theme (g90/g100).
 * Boolean attributes activate variant features:
 * - `with-action`              — text action button
 * - `with-action-icon-button`  — icon action button
 * - `with-secondary-action`    — primary + secondary action buttons
 * - `with-link`                — documentation link
 * - `with-action-and-link`     — icon button + documentation link
 *
 * @element no-tags-empty-state
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

  /** Action button kind. @default 'tertiary' */
  @property({ attribute: 'action-kind' })
  actionKind = 'tertiary';

  /** Secondary action button kind. @default 'ghost' */
  @property({ attribute: 'secondary-action-kind' })
  secondaryActionKind = 'ghost';

  /** Link href. @default 'https://www.carbondesignsystem.com' */
  @property({ attribute: 'link-href' })
  linkHref = 'https://www.carbondesignsystem.com';

  /** Link target. */
  @property({ attribute: 'link-target' })
  linkTarget = '';

  /** Show a text action button. */
  @property({ type: Boolean, attribute: 'with-action' })
  withAction = false;

  /** Show an icon action button. */
  @property({ type: Boolean, attribute: 'with-action-icon-button' })
  withActionIconButton = false;

  /** Show primary and secondary action buttons. */
  @property({ type: Boolean, attribute: 'with-secondary-action' })
  withSecondaryAction = false;

  /** Show a documentation link. */
  @property({ type: Boolean, attribute: 'with-link' })
  withLink = false;

  /** Show an icon action button combined with a documentation link. */
  @property({ type: Boolean, attribute: 'with-action-and-link' })
  withActionAndLink = false;

  protected createRenderRoot() {
    return this;
  }

  render() {
    const resolvedActionType =
      this.withActionAndLink || this.withActionIconButton
        ? 'icon'
        : this.withSecondaryAction || this.withAction
          ? 'text'
          : 'none';

    const actionText = resolvedActionType !== 'none' ? 'Create new' : '';
    const actionIcon =
      resolvedActionType === 'icon'
        ? html`${iconLoader(Add20, { slot: 'icon' })}`
        : null;
    const secondaryActionText = this.withSecondaryAction ? 'Learn more' : '';
    const linkText =
      this.withActionAndLink || this.withLink ? 'View documentation' : '';
    const linkHref = linkText ? this.linkHref : '';
    const linkTarget = this.withLink ? '_blank' : this.linkTarget;

    return html`
      <empty-state
        illustration-src="${this.illustrationTheme === 'dark'
          ? noTagsDark
          : noTagsLight}"
        illustration-description="${this.illustrationDescription}"
        size="${this.size}"
        heading="${this.heading}"
        heading-as="${this.headingAs}"
        subtitle="${this.subtitle}"
        action-text="${actionText}"
        action-kind="${this.actionKind}"
        .actionIcon="${actionIcon}"
        secondary-action-text="${secondaryActionText}"
        secondary-action-kind="${this.secondaryActionKind}"
        link-text="${linkText}"
        link-href="${linkHref}"
        link-target="${linkTarget}">
      </empty-state>
    `;
  }
}
