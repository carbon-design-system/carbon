/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import '../components/unauthorized-empty-state';
import {
  getEmptyStateProps,
  type ActionType,
  type SubtitleType,
} from './empty-state-args';

/**
 * `unauthorized-empty-state-preview`
 *
 * Preview component — wraps `unauthorized-empty-state` for stories.
 *
 * @element unauthorized-empty-state-preview
 */
@customElement('unauthorized-empty-state-preview')
export class UnauthorizedEmptyStatePreview extends LitElement {
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

  protected createRenderRoot() {
    return this;
  }

  render() {
    const derived = getEmptyStateProps(this);
    return html`
      <unauthorized-empty-state
        illustration-theme="${this.illustrationTheme}"
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
      </unauthorized-empty-state>
    `;
  }
}

export default UnauthorizedEmptyStatePreview;
