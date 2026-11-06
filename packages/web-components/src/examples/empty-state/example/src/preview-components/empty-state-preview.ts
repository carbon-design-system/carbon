/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import '../components/empty-state';
import {
  getEmptyStateProps,
  type ActionType,
  type SubtitleType,
} from './empty-state-args';

/**
 * `empty-state-preview`
 *
 * Preview component — wraps `empty-state` for the base stories.
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

  protected createRenderRoot() {
    return this;
  }

  render() {
    const derived = getEmptyStateProps(this);
    return html`
      <empty-state
        illustration-src="${this.illustrationSrc}"
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
      </empty-state>
    `;
  }
}

export default EmptyStatePreview;
