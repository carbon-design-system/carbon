/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { classMap } from 'lit/directives/class-map.js';
import { prefix } from '../../globals/settings';
import { EMPTY_STATE_SIZE } from './defs';
import styles from './empty-state.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

export { EMPTY_STATE_SIZE };

/**
 * Empty state.
 *
 * @element cds-empty-state
 * @slot - The content (illustration + copy) rendered inside the empty state.
 */
@customElement(`${prefix}-empty-state`)
class CDSEmptyState extends LitElement {
  /**
   * Optional text label for the action button. When set, a `<cds-button>` is
   * rendered below the subtitle. Use `action-kind` and `action-href` to
   * configure it further.
   */
  @property({ attribute: 'action-text' })
  actionText = '';

  /**
   * Kind of the action button.
   * @default 'tertiary'
   */
  @property({ attribute: 'action-kind' })
  actionKind: 'primary' | 'secondary' | 'tertiary' = 'tertiary';

  /**
   * Href for the action button (renders an anchor-button when set).
   */
  @property({ attribute: 'action-href' })
  actionHref = '';

  /**
   * `src` URL of the illustration image. Mutually exclusive with the
   * `illustration` slot — use one or the other.
   */
  @property({ attribute: 'illustration-src' })
  illustrationSrc = '';

  /**
   * Alt text for the illustration. Falls back to the heading text when omitted.
   */
  @property({ attribute: 'illustration-description' })
  illustrationDescription = '';

  /**
   * Link href. When both `link-href` and `link-text` are set a `<cds-link>` is
   * rendered below the action button.
   */
  @property({ attribute: 'link-href' })
  linkHref = '';

  /**
   * Link label text.
   */
  @property({ attribute: 'link-text' })
  linkText = '';

  /**
   * Size variant — controls illustration dimensions.
   * @default 'md'
   */
  @property({ reflect: true })
  size: EMPTY_STATE_SIZE = EMPTY_STATE_SIZE.MEDIUM;

  /**
   * Subtitle / body copy shown below the heading.
   */
  @property()
  subtitle = '';

  /**
   * Main heading text (required).
   */
  @property()
  heading = '';

  render() {
    const {
      actionHref,
      actionKind,
      actionText,
      heading,
      illustrationDescription,
      illustrationSrc,
      linkHref,
      linkText,
      size,
      subtitle,
    } = this;

    const blockClass = `${prefix}--empty-state`;

    const illustrationClasses = classMap({
      [`${blockClass}__illustration--${size}`]: true,
    });

    return html`
      <div class="${blockClass} ${blockClass}--${size}">
        ${illustrationSrc
          ? html`<img
              src="${illustrationSrc}"
              alt="${ifDefined(
                illustrationDescription || heading || undefined
              )}"
              class="${illustrationClasses}" />`
          : html`<slot name="illustration"></slot>`}

        <div class="${blockClass}__content">
          <p class="${blockClass}__heading ${blockClass}__heading--${size}">
            ${heading}
          </p>

          ${subtitle
            ? html`<p
                class="${blockClass}__subtitle${size === EMPTY_STATE_SIZE.SMALL
                  ? ` ${blockClass}__subtitle--sm`
                  : ''}">
                ${subtitle}
              </p>`
            : ''}
          ${actionText
            ? html`<cds-button
                class="${blockClass}__action"
                kind="${actionKind}"
                size="sm"
                href="${ifDefined(actionHref || undefined)}">
                ${actionText}
              </cds-button>`
            : ''}
          ${linkHref && linkText
            ? html`<cds-link class="${blockClass}__link" href="${linkHref}">
                ${linkText}
              </cds-link>`
            : ''}
        </div>
      </div>
    `;
  }

  static styles = styles;
}

export default CDSEmptyState;
