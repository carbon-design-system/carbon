/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { LitElement, html } from 'lit';
import { property, query } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import FocusMixin from '../../globals/mixins/focus';
import styles from './link.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

/**
 * Link size.
 */
export const LINK_SIZE = {
  MEDIUM: 'md',
  SMALL: 'sm',
  LARGE: 'lg',
};

// Convert object key in a type
type LINK_SIZE_TYPE = (typeof LINK_SIZE)[keyof typeof LINK_SIZE];

/**
 * Link.
 *
 * @element cds-link
 * @csspart link The link.
 */
@customElement(`${prefix}-link`)
class CDSLink extends FocusMixin(LitElement) {
  /**
   * `true` if there is an icon.
   */
  private _hasIcon = false;

  /**
   * Handles `slotchange` event.
   */
  protected _handleSlotChange({ target }: Event) {
    const { name } = target as HTMLSlotElement;
    const hasContent = (target as HTMLSlotElement)
      .assignedNodes()
      .some(
        (node) => node.nodeType !== Node.TEXT_NODE || node!.textContent!.trim()
      );
    this[name === 'icon' ? '_hasIcon' : ''] = hasContent;
    this.requestUpdate();
  }

  @query('#link')
  protected _linkNode?: HTMLAnchorElement | HTMLParagraphElement;

  /**
   * The CSS class list for the link node.
   */
  protected get _classes() {
    const { disabled, size, inline, visited, _hasIcon } = this;
    return classMap({
      [`${prefix}--link`]: true,
      [`${prefix}--link--disabled`]: disabled,
      [`${prefix}--link--icon`]: _hasIcon,
      [`${prefix}--link--inline`]: inline,
      [`${prefix}--link--${size}`]: size,
      [`${prefix}--link--visited`]: visited,
    });
  }

  /**
   * Handles `click` event on the `<a>`.
   */
  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  protected _handleClick(_: MouseEvent) {}

  /**
   * @returns The inner content.
   */
  // eslint-disable-next-line class-methods-use-this
  protected _renderInner() {
    const { _hasIcon: hasIcon, _handleSlotChange: handleSlotChange } = this;
    return html`
      <slot @slotchange="${handleSlotChange}"></slot>
      <div ?hidden="${!hasIcon}" class="${prefix}--link__icon">
        <slot name="icon" @slotchange="${handleSlotChange}"></slot>
      </div>
    `;
  }

  /**
   * @returns The disabled link content.
   */
  protected _renderDisabledLink() {
    const { _classes: classes } = this;
    return html`
      <p id="link" part="link" class="${classes}">${this._renderInner()}</p>
    `;
  }

  /**
   * @returns The link content.
   */
  protected _renderLink() {
    const {
      download,
      href,
      hreflang,
      linkRole,
      ping,
      rel,
      target,
      type,
      _classes: classes,
      _handleClick: handleClick,
    } = this;
    return html`
      <a
        tabindex="0"
        id="link"
        role="${ifDefined(linkRole)}"
        class="${classes}"
        part="link"
        download="${ifDefined(download)}"
        href="${ifDefined(href)}"
        hreflang="${ifDefined(hreflang)}"
        ping="${ifDefined(ping)}"
        rel="${ifDefined(rel)}"
        target="${ifDefined(target)}"
        type="${ifDefined(type)}"
        @click="${handleClick}">
        ${this._renderInner()}
      </a>
    `;
  }

  /**
   * `true` if the link should be disabled.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * The default file name.
   */
  @property({ reflect: true })
  download!: string;

  /**
   * Link `href`.
   */
  @property({ reflect: true })
  href!: string;

  /**
   * The language of what `href` points to.
   */
  @property({ reflect: true })
  hreflang!: string;

  /**
   * `true` if the link should be inline.
   */
  @property({ type: Boolean, reflect: true })
  inline = false;

  /**
   * The a11y role for `<a>`.
   */
  @property({ attribute: 'link-role' })
  linkRole!: string;

  /**
   * URLs to ping.
   */
  @property({ reflect: true })
  ping!: string;

  /**
   * The link type.
   */
  @property({ reflect: true })
  rel!: string;

  /**
   * Link size.
   */
  @property({ reflect: true })
  size: LINK_SIZE_TYPE = LINK_SIZE.MEDIUM;

  /**
   * The link target.
   */
  @property({ reflect: true })
  target!: string;

  /**
   * MIME type of the `target`.
   */
  @property({ reflect: true })
  type!: string;

  /**
   * `true` if the link has been visited.
   */
  @property({ type: Boolean, reflect: true })
  visited = false;

  render() {
    const { disabled } = this;
    return disabled ? this._renderDisabledLink() : this._renderLink();
  }

  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };
  static styles = styles; // `styles` here is a `CSSResult` generated by custom Vite loader
}

export default CDSLink;
