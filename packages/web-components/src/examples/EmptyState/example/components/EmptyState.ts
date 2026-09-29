/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Recipe component — copy-and-customize, not a published package export.
 */

import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

// In a standalone project, replace these with:
//   import '@carbon/web-components/es/components/button/index.js';
//   import '@carbon/web-components/es/components/link/index.js';
import '../../../../components/button/index';
import '../../../../components/link/index';

const blockClass = 'cds--empty-state';

/**
 * `cds-empty-state`
 *
 * Recipe component — copy-and-customize, not a published export.
 *
 * @element cds-empty-state
 * @fires cds-empty-state-action-click - Fired when the action button is clicked.
 * @slot illustration - Optional custom illustration node (overrides illustration-src).
 */
@customElement('cds-empty-state')
export class CDSEmptyStateRecipe extends LitElement {
  /** Size variant — controls illustration dimensions. @default 'md' */
  @property({ reflect: true })
  size: 'md' | 'sm' = 'md';

  /** URL/src for an `<img>` illustration. */
  @property({ attribute: 'illustration-src' })
  illustrationSrc = '';

  /** Alt text for the illustration image. */
  @property({ attribute: 'illustration-description' })
  illustrationDescription = '';

  /** Main heading text (required). */
  @property()
  heading = '';

  /** Body copy shown below the heading. */
  @property()
  subtitle = '';

  /** Label for the tertiary CTA button. */
  @property({ attribute: 'action-text' })
  actionText = '';

  /** Button kind for the action button. @default 'tertiary' */
  @property({ attribute: 'action-kind' })
  actionKind = 'tertiary';

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
      new CustomEvent('cds-empty-state-action-click', {
        bubbles: true,
        composed: true,
      })
    );
  }

  // No Shadow DOM — renders into the light DOM so that styles from the
  // host application (_empty-state.scss) apply directly.
  protected createRenderRoot() {
    return this;
  }

  render() {
    const {
      size,
      illustrationSrc,
      illustrationDescription,
      heading,
      subtitle,
      actionText,
      actionKind,
      linkText,
      linkHref,
      linkTarget,
    } = this;

    return html`
      <div class="${blockClass} ${blockClass}--${size}">
        <slot name="illustration">
          ${illustrationSrc
            ? html`<img
                src="${illustrationSrc}"
                alt="${illustrationDescription || heading}"
                class="${blockClass}__illustration--${size}"
              />`
            : nothing}
        </slot>

        <div class="${blockClass}__content">
          <p class="${blockClass}__heading ${blockClass}__heading--${size}">
            ${heading}
          </p>

          ${subtitle
            ? html`<p
                class="${blockClass}__subtitle${size === 'sm' ? ` ${blockClass}__subtitle--sm` : ''}">
                ${subtitle}
              </p>`
            : nothing}

          ${actionText
            ? html`<cds-button
                class="${blockClass}__action"
                kind="${actionKind}"
                size="sm"
                @click="${this._handleActionClick}">
                ${actionText}
              </cds-button>`
            : nothing}

          ${linkText && linkHref
            ? html`<cds-link
                class="${blockClass}__link"
                href="${linkHref}"
                target="${ifDefined(linkTarget || undefined)}">
                ${linkText}
              </cds-link>`
            : nothing}
        </div>
      </div>
    `;
  }
}

export default CDSEmptyStateRecipe;
