/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Recipe components — copy-and-customize, not a published package export.
 */

import { LitElement, html, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import './empty-state';
import errorLight from '../assets/error-light.svg?url';
import errorDark from '../assets/error-dark.svg?url';
import noDataLight from '../assets/no-data-light.svg?url';
import noDataDark from '../assets/no-data-dark.svg?url';
import noTagsLight from '../assets/no-tags-light.svg?url';
import noTagsDark from '../assets/no-tags-dark.svg?url';
import notFoundLight from '../assets/not-found-light.svg?url';
import notFoundDark from '../assets/not-found-dark.svg?url';
import notificationLight from '../assets/notification-light.svg?url';
import notificationDark from '../assets/notification-dark.svg?url';
import unauthorizedLight from '../assets/unauthorized-light.svg?url';
import unauthorizedDark from '../assets/unauthorized-dark.svg?url';

/**
 * Shared base for the preset illustration empty states. Each subclass is a
 * thin wrapper around `empty-state` pre-wired with a light/dark illustration
 * pair and default copy. Every `empty-state` property can be set to override
 * the defaults.
 *
 * @fires empty-state-action-click - Fired when the action button is clicked.
 * @fires empty-state-secondary-action-click - Fired when the secondary action button is clicked.
 */
abstract class IllustrationEmptyState extends LitElement {
  /** Illustration used with the light theme. */
  protected abstract readonly lightSrc: string;

  /** Illustration used with the dark theme. */
  protected abstract readonly darkSrc: string;

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
        illustration-src="${this.illustrationTheme === 'dark'
          ? this.darkSrc
          : this.lightSrc}"
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

/** @element error-empty-state */
@customElement('error-empty-state')
export class ErrorEmptyState extends IllustrationEmptyState {
  protected readonly lightSrc = errorLight;
  protected readonly darkSrc = errorDark;
}

/** @element no-data-empty-state */
@customElement('no-data-empty-state')
export class NoDataEmptyState extends IllustrationEmptyState {
  protected readonly lightSrc = noDataLight;
  protected readonly darkSrc = noDataDark;
}

/** @element no-tags-empty-state */
@customElement('no-tags-empty-state')
export class NoTagsEmptyState extends IllustrationEmptyState {
  protected readonly lightSrc = noTagsLight;
  protected readonly darkSrc = noTagsDark;
}

/** @element not-found-empty-state */
@customElement('not-found-empty-state')
export class NotFoundEmptyState extends IllustrationEmptyState {
  protected readonly lightSrc = notFoundLight;
  protected readonly darkSrc = notFoundDark;
}

/** @element notifications-empty-state */
@customElement('notifications-empty-state')
export class NotificationsEmptyState extends IllustrationEmptyState {
  protected readonly lightSrc = notificationLight;
  protected readonly darkSrc = notificationDark;
}

/** @element unauthorized-empty-state */
@customElement('unauthorized-empty-state')
export class UnauthorizedEmptyState extends IllustrationEmptyState {
  protected readonly lightSrc = unauthorizedLight;
  protected readonly darkSrc = unauthorizedDark;
}
