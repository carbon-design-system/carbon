/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import '../components/empty-state';
import customIllustration from '../assets/custom-illustration.svg?url';
import {
  getEmptyStateProps,
  type ActionType,
  type SubtitleType,
} from './empty-state-args';

/**
 * `empty-state-preview`
 *
 * Preview component — wraps `empty-state` for the Default story. Accepts the
 * base args plus seven boolean variant flags. Each flag independently activates
 * its own props — multiple flags can be `true` at the same time:
 *
 * | Attribute                    | What it activates                       |
 * |------------------------------|-----------------------------------------|
 * | `with-tooltip-in-subtitle`   | Subtitle with an inline tooltip         |
 * | `with-custom-illustration`   | Custom SVG illustration                 |
 * | `with-action`                | Text action button                      |
 * | `with-action-icon-button`    | Icon action button                      |
 * | `with-secondary-action`      | Primary + secondary action buttons      |
 * | `with-link`                  | Documentation link                      |
 * | `with-action-and-link`       | Icon action button + documentation link |
 *
 * All flags default to `false`.
 *
 * @element empty-state-preview
 */
@customElement('empty-state-preview')
export class EmptyStatePreview extends LitElement {
  /** Custom illustration URL (overrides the default of none). */
  @property({ attribute: 'illustration-src' })
  illustrationSrc = '';

  /** Heading element (`h1`–`h6`). @default 'h3' */
  @property({ attribute: 'heading-as' })
  headingAs: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' = 'h3';

  /** Size variant. @default 'md' */
  @property({ reflect: true })
  size: 'md' | 'sm' = 'md';

  /** Heading. */
  @property()
  heading = 'Start by adding data assets';

  /** Plain-text subtitle (ignored when `subtitle-type` is set). */
  @property()
  subtitle = '';

  /** Rich subtitle variant: `default` or `withTooltip`. */
  @property({ attribute: 'subtitle-type' })
  subtitleType?: SubtitleType;

  /** Alt text for the illustration. */
  @property({ attribute: 'illustration-description' })
  illustrationDescription = '';

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

  /** Show subtitle with an inline tooltip. */
  @property({ type: Boolean, attribute: 'with-tooltip-in-subtitle' })
  withTooltipInSubtitle = false;

  /** Render with a custom SVG illustration. */
  @property({ type: Boolean, attribute: 'with-custom-illustration' })
  withCustomIllustration = false;

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
    const illustrationSrc = this.withCustomIllustration
      ? customIllustration
      : this.illustrationSrc;
    const illustrationDescription = this.withCustomIllustration
      ? 'Test alt text'
      : this.illustrationDescription;
    const showLink = this.withLink || this.withActionAndLink;

    const derived = getEmptyStateProps({
      subtitleType: this.withTooltipInSubtitle
        ? 'withTooltip'
        : this.subtitleType,
      actionType,
      secondaryAction: this.secondaryAction || this.withSecondaryAction,
      linkText: showLink ? 'View documentation' : this.linkText,
      linkTarget: this.withLink ? '_blank' : this.linkTarget,
    });

    return html`
      <empty-state
        illustration-src="${illustrationSrc}"
        heading-as="${this.headingAs}"
        size="${this.size}"
        heading="${this.heading}"
        subtitle="${this.subtitle}"
        .subtitleContent="${derived.subtitleContent}"
        illustration-description="${illustrationDescription}"
        action-text="${derived.actionText}"
        .actionIcon="${derived.actionIcon}"
        secondary-action-text="${derived.secondaryActionText}"
        link-text="${derived.linkText}"
        link-href="${derived.linkHref}"
        link-target="${derived.linkTarget}">
      </empty-state>
    `;
  }
}

export default EmptyStatePreview;
