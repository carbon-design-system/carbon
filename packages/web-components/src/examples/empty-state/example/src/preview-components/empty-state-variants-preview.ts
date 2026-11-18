/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement } from 'lit';
import { html, unsafeStatic } from 'lit/static-html.js';
import { customElement, property } from 'lit/decorators.js';

import '../components/illustration-empty-states';
import {
  getEmptyStateProps,
  type ActionType,
  type SubtitleType,
} from './empty-state-args';

/**
 * Shared base for the preset illustration previews. Wraps the preset element
 * named by `presetTag` and accepts the base args plus six boolean variant
 * flags. Each flag independently activates its own props — multiple flags can
 * be `true` at the same time:
 *
 * | Attribute                      | What it activates                       |
 * |--------------------------------|-----------------------------------------|
 * | `with-dark-mode-illustration`  | Dark mode illustration                  |
 * | `with-action`                  | Text action button                      |
 * | `with-action-icon-button`      | Icon action button                      |
 * | `with-secondary-action`        | Primary + secondary action buttons      |
 * | `with-link`                    | Documentation link                      |
 * | `with-action-and-link`         | Icon action button + documentation link |
 *
 * All flags default to `false`.
 */
abstract class IllustrationEmptyStatePreview extends LitElement {
  /** Tag name of the preset element to render. */
  protected abstract readonly presetTag: string;

  /** Illustration theme. */
  @property({ attribute: 'illustration-theme' })
  illustrationTheme: 'light' | 'dark' = 'light';

  /** Heading element (`h1`–`h6`). @default 'h3' */
  @property({ attribute: 'heading-as' })
  headingAs: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' = 'h3';

  /** Size variant. @default 'md' */
  @property({ reflect: true })
  size: 'md' | 'sm' = 'md';

  /** Heading. */
  @property()
  heading = 'Empty state title';

  /** Plain-text subtitle (ignored when `subtitle-type` is set). */
  @property()
  subtitle = 'Description text explaining why this section is empty.';

  /** Rich subtitle variant: `default` or `withTooltip`. */
  @property({ attribute: 'subtitle-type' })
  subtitleType?: SubtitleType;

  /** Alt text for the illustration. */
  @property({ attribute: 'illustration-description' })
  illustrationDescription = 'Test alt text';

  /** Action button variant: `none`, `text` or `icon`. */
  @property({ attribute: 'action-type' })
  actionType: ActionType = 'none';

  /** Render a secondary action next to the action. */
  @property({ type: Boolean, attribute: 'secondary-action' })
  secondaryAction = false;

  /** Link label. */
  @property({ attribute: 'link-text' })
  linkText = '';

  /** Link target. */
  @property({ attribute: 'link-target' })
  linkTarget = '';

  /** Show the dark mode illustration. */
  @property({ type: Boolean, attribute: 'with-dark-mode-illustration' })
  withDarkModeIllustration = false;

  /** Show a text action button. */
  @property({ type: Boolean, attribute: 'with-action' })
  withAction = false;

  /** Show an icon action button. */
  @property({ type: Boolean, attribute: 'with-action-icon-button' })
  withActionIconButton = false;

  /** Show primary + secondary action buttons. */
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
    const actionType: ActionType =
      this.withActionIconButton || this.withActionAndLink
        ? 'icon'
        : this.withAction || this.withSecondaryAction
          ? 'text'
          : this.actionType;
    const showLink = this.withLink || this.withActionAndLink;

    const derived = getEmptyStateProps({
      subtitleType: this.subtitleType,
      actionType,
      secondaryAction: this.secondaryAction || this.withSecondaryAction,
      linkText: showLink ? 'View documentation' : this.linkText,
      linkTarget: this.linkTarget,
    });

    const tag = unsafeStatic(this.presetTag);
    return html`
      <${tag}
        illustration-theme="${
          this.withDarkModeIllustration ? 'dark' : this.illustrationTheme
        }"
        heading-as="${this.headingAs}"
        size="${this.size}"
        heading="${this.heading}"
        subtitle="${this.subtitle}"
        .subtitleContent="${derived.subtitleContent}"
        illustration-description="${this.illustrationDescription}"
        action-text="${derived.actionText}"
        .actionIcon="${derived.actionIcon}"
        secondary-action-text="${derived.secondaryActionText}"
        link-text="${derived.linkText}"
        link-href="${derived.linkHref}"
        link-target="${derived.linkTarget}">
      </${tag}>
    `;
  }
}

/** @element error-empty-state-preview */
@customElement('error-empty-state-preview')
export class ErrorEmptyStatePreview extends IllustrationEmptyStatePreview {
  protected readonly presetTag = 'error-empty-state';
}

/** @element no-data-empty-state-preview */
@customElement('no-data-empty-state-preview')
export class NoDataEmptyStatePreview extends IllustrationEmptyStatePreview {
  protected readonly presetTag = 'no-data-empty-state';
}

/** @element no-tags-empty-state-preview */
@customElement('no-tags-empty-state-preview')
export class NoTagsEmptyStatePreview extends IllustrationEmptyStatePreview {
  protected readonly presetTag = 'no-tags-empty-state';
}

/** @element not-found-empty-state-preview */
@customElement('not-found-empty-state-preview')
export class NotFoundEmptyStatePreview extends IllustrationEmptyStatePreview {
  protected readonly presetTag = 'not-found-empty-state';
}

/** @element notifications-empty-state-preview */
@customElement('notifications-empty-state-preview')
export class NotificationsEmptyStatePreview extends IllustrationEmptyStatePreview {
  protected readonly presetTag = 'notifications-empty-state';
}

/** @element unauthorized-empty-state-preview */
@customElement('unauthorized-empty-state-preview')
export class UnauthorizedEmptyStatePreview extends IllustrationEmptyStatePreview {
  protected readonly presetTag = 'unauthorized-empty-state';
}
