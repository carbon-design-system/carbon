/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Recipe component — copy-and-customize, not a published package export.
 */

import { LitElement, html, nothing, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { literal, html as staticHtml } from 'lit/static-html.js';

import '@carbon/web-components/es/components/button/index.js';
import '@carbon/web-components/es/components/link/index.js';

const blockClass = 'cds--empty-state';

const HEADING_TAGS = {
  h1: literal`h1`,
  h2: literal`h2`,
  h3: literal`h3`,
  h4: literal`h4`,
  h5: literal`h5`,
  h6: literal`h6`,
};

/**
 * `empty-state`
 *
 * Recipe component — copy-and-customize, not a published export.
 *
 * @element empty-state
 * @fires empty-state-action-click - Fired when the action button is clicked.
 * @fires empty-state-secondary-action-click - Fired when the secondary action button is clicked.
 */
@customElement('empty-state')
export class EmptyState extends LitElement {
  /** Size variant — controls illustration dimensions. @default 'md' */
  @property({ reflect: true })
  size: 'md' | 'sm' = 'md';

  /** Custom illustration node, e.g. an inline pictogram (overrides illustration-src). */
  @property({ attribute: false })
  illustration?: TemplateResult;

  /** URL/src for an `<img>` illustration. */
  @property({ attribute: 'illustration-src' })
  illustrationSrc = '';

  /** Alt text for the illustration image. Falls back to `heading`. */
  @property({ attribute: 'illustration-description' })
  illustrationDescription = '';

  /** Main heading text (required). */
  @property()
  heading = '';

  /**
   * Heading element used for the title (`h1`–`h6`). Use `h1` when the empty
   * state fills the page and there is no higher heading.
   * @default 'h3'
   */
  @property({ attribute: 'heading-as' })
  headingAs: keyof typeof HEADING_TAGS = 'h3';

  /** Body copy shown below the heading. */
  @property()
  subtitle = '';

  /**
   * Custom subtitle content (e.g. a tooltip). Overrides `subtitle` when set.
   */
  @property({ attribute: false })
  subtitleContent?: TemplateResult;

  /** Label for the CTA button. */
  @property({ attribute: 'action-text' })
  actionText = '';

  /** Button kind for the action button. @default 'tertiary' */
  @property({ attribute: 'action-kind' })
  actionKind = 'tertiary';

  /** Icon rendered inside the action button (e.g. from `iconLoader`). */
  @property({ attribute: false })
  actionIcon?: TemplateResult | null;

  /** Label for the secondary button. */
  @property({ attribute: 'secondary-action-text' })
  secondaryActionText = '';

  /** Button kind for the secondary button. @default 'ghost' */
  @property({ attribute: 'secondary-action-kind' })
  secondaryActionKind = 'ghost';

  /** Custom content rendered at the end of the content container. */
  @property({ attribute: false })
  content?: TemplateResult;

  /** Label for the inline link. */
  @property({ attribute: 'link-text' })
  linkText = '';

  /** href for the inline link. */
  @property({ attribute: 'link-href' })
  linkHref = '';

  /** target for the inline link. */
  @property({ attribute: 'link-target' })
  linkTarget = '';

  private _handleActionClick() {
    this.dispatchEvent(
      new CustomEvent('empty-state-action-click', {
        bubbles: true,
        composed: true,
      })
    );
  }

  private _handleSecondaryActionClick() {
    this.dispatchEvent(
      new CustomEvent('empty-state-secondary-action-click', {
        bubbles: true,
        composed: true,
      })
    );
  }

  // No Shadow DOM — styles from the example stylesheet must reach the rendered
  // HTML directly.
  protected createRenderRoot() {
    return this;
  }

  render() {
    const {
      size,
      illustration,
      illustrationSrc,
      illustrationDescription,
      heading,
      headingAs,
      subtitle,
      subtitleContent,
      actionText,
      actionKind,
      actionIcon,
      secondaryActionText,
      secondaryActionKind,
      linkText,
      linkHref,
      linkTarget,
      content,
    } = this;

    const headingTag = HEADING_TAGS[headingAs] ?? HEADING_TAGS.h3;
    const subtitleBody = subtitleContent ?? subtitle;

    return html`
      <div class="${blockClass} ${blockClass}--${size}">
        ${illustration ??
        (illustrationSrc
          ? html`<img
              src="${illustrationSrc}"
              alt="${illustrationDescription || heading}"
              class="${blockClass}__illustration--${size}"
            />`
          : nothing)}

        <div class="${blockClass}__content">
          ${staticHtml`<${headingTag}
            class="${blockClass}__heading ${blockClass}__heading--${size}">
            ${heading}
          </${headingTag}>`}

          ${subtitleBody
            ? html`<div
                class="${blockClass}__subtitle${size === 'sm'
                  ? ` ${blockClass}__subtitle--sm`
                  : ''}">
                ${subtitleBody}
              </div>`
            : nothing}

          ${actionText || secondaryActionText
            ? html`<div class="${blockClass}__actions">
                ${actionText
                  ? html`<cds-button
                      class="${blockClass}__action"
                      kind="${actionKind}"
                      size="sm"
                      @click="${this._handleActionClick}">
                      ${actionText} ${actionIcon ?? nothing}
                    </cds-button>`
                  : nothing}
                ${secondaryActionText
                  ? html`<cds-button
                      class="${blockClass}__action"
                      kind="${secondaryActionKind}"
                      size="sm"
                      @click="${this._handleSecondaryActionClick}">
                      ${secondaryActionText}
                    </cds-button>`
                  : nothing}
              </div>`
            : nothing}
          ${linkText && linkHref
            ? html`<cds-link
                class="${blockClass}__link"
                href="${linkHref}"
                target="${ifDefined(linkTarget || undefined)}">
                ${linkText}
              </cds-link>`
            : nothing}
          ${content ?? nothing}
        </div>
      </div>
    `;
  }
}

export default EmptyState;
