/**
 * @license
 *
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit/directives/class-map.js';
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import CaretDown16 from '@carbon/icons/lib/caret--down/16.js';

import styles from './tree-view.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

/**
 * Tree node.
 *
 * @element cds-tree-node
 */
@customElement(`${prefix}-tree-node`)
class CDSTreeNode extends LitElement {
  private _hasChildren = false;
  private _hasIcon = false;
  /**
   * Handles `slotchange` event.
   */
  private _handleSlotChange({ target }: Event) {
    const items = (target as HTMLSlotElement)
      .assignedNodes()
      .filter(
        (node) =>
          node.nodeType === Node.ELEMENT_NODE &&
          (node as Element).tagName.toLowerCase() === `${prefix}-tree-node`
      );

    items.forEach((item) => {
      (item as CDSTreeNode).depth = this.depth + 1;
      (item as CDSTreeNode).disabled = this.disabled;
    });

    this._hasChildren = items.length > 0;
    if (this._hasChildren) this.setAttribute('parent', '');
    this.requestUpdate();
  }

  /**
   * Handles icon's `slotchange` event.
   */
  private _handleIconSlotChange({ target }: Event) {
    this._hasIcon = (target as HTMLSlotElement).assignedNodes().length > 0;
    if (this._hasIcon) this.setAttribute('has-icon', '');
    this.requestUpdate();
  }

  private _handleStyles = () => {
    const calcOffset = () => {
      if (this._hasChildren && this._hasIcon) {
        return this.depth + 1 + this.depth * 0.5;
      }

      if (this._hasChildren) {
        return this.depth + 1;
      }

      if (this._hasIcon) {
        return this.depth + 2 + this.depth * 0.5;
      }

      return this.depth + 2.5;
    };
    const label = this.shadowRoot!.querySelector(
      `.${prefix}--tree-node__label`
    );
    if (label) {
      (label as HTMLElement).style.marginInlineStart = `-${calcOffset()}rem`;
      (label as HTMLElement).style.paddingInlineStart = `${calcOffset()}rem`;
    }
  };

  _handleToggleClick = () => {
    if (!this.disabled) {
      this.isExpanded = !this.isExpanded;
      if (this.hasAttribute('aria-expanded')) {
        this.setAttribute('aria-expanded', String(this.isExpanded));
      }
    }
  };

  /**
   * sets if tree node is active
   */
  @property({ type: Boolean, reflect: true })
  active = false;

  /**
   * disabled property
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * depth property
   */
  @property({ reflect: true })
  depth = 0;

  /**
   * is expanded property
   */
  @property({ type: Boolean, attribute: 'is-expanded' })
  isExpanded = false;

  /**
   * Optional: The URL the TreeNode is linking to
   */
  @property({})
  href;

  /**
   * Optional: The URL the TreeNode is linking to
   */
  @property({})
  label;

  /**
   * sets if tree node is selected
   */
  @property({ type: Boolean, reflect: true })
  selected = false;

  connectedCallback() {
    super.connectedCallback();

    // Detect children on first render
    this._hasChildren = Array.from(this.children).some(
      (node) => node.tagName.toLowerCase() === `${prefix}-tree-node`
    );

    this._hasIcon = Array.from(this.children).some(
      (node) => node.getAttribute('slot') === 'icon'
    );

    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'treeitem');
    }

    if (!this.hasAttribute('aria-owns')) {
      this.setAttribute(
        'aria-owns',
        String(this._hasChildren ? `subtree` : undefined)
      );
    }

    if (this._hasChildren) {
      this.setAttribute('aria-expanded', String(this.isExpanded));
    }
  }

  updated(changedProperties) {
    if (changedProperties.has('depth')) {
      this._handleStyles();
    }
    if (changedProperties.has('selected')) {
      this.setAttribute(
        'aria-selected',
        String(
          !this.href ? (this.disabled ? undefined : this.selected) : undefined
        )
      );
    }

    if (changedProperties.has('active')) {
      this.setAttribute(
        'aria-current',
        String(
          !this.href
            ? this.active || undefined
            : this.active
              ? 'page'
              : undefined
        )
      );
    }

    if (changedProperties.has('disabled')) {
      this.setAttribute('aria-disabled', String(this.disabled));
    }
  }

  render() {
    const {
      disabled,
      isExpanded,
      href,
      label,
      _hasChildren: hasChildren,
      _handleSlotChange: handleSlotChange,
      _handleIconSlotChange: handleIconSlotChange,
    } = this;

    let toggleClasses = `${prefix}--tree-parent-node__toggle-icon`;
    if (isExpanded) {
      toggleClasses += `${prefix}--tree-parent-node__toggle-icon--expanded`;
    }

    const subTreeClasses = classMap({
      [`${prefix}--tree-node__children`]: true,
      [`${prefix}--tree-node__hidden`]: !isExpanded,
    });

    return html`
      ${!hasChildren
        ? html`
            ${href
              ? html`<a href=${!disabled ? href : undefined}>
                  <div class="${prefix}--tree-node__label">
                    <slot
                      name="icon"
                      @slotchange=${handleIconSlotChange}></slot>
                    ${label}
                  </div>
                </a>`
              : html` <div class="${prefix}--tree-node__label">
                  <slot name="icon" @slotchange=${handleIconSlotChange}></slot>
                  ${label}
                </div>`}
          `
        : html`
            ${href
              ? html` <a
                    aria-expanded=${!!isExpanded}
                    href=${!disabled ? href : undefined}>
                    <div class="${prefix}--tree-node__label">
                      <span
                        class="${prefix}--tree-parent-node__toggle"
                        ?disabled=${disabled}
                        @click=${this._handleToggleClick}>
                        ${CaretDown16({ class: toggleClasses })}
                      </span>
                      <span class="${prefix}--tree-node__label__details">
                        <slot
                          name="icon"
                          @slotchange=${handleIconSlotChange}></slot>
                        ${label}
                      </span>
                    </div>
                  </a>
                  <ul id="subtree" role="group" class="${subTreeClasses}">
                    <slot @slotchange=${handleSlotChange}></slot>
                  </ul>`
              : html`<div class="${prefix}--tree-node__label">
                    <span
                      class="${prefix}--tree-parent-node__toggle"
                      ?disabled=${disabled}
                      @click=${this._handleToggleClick}>
                      ${CaretDown16({ class: toggleClasses })}
                    </span>
                    <span class="${prefix}--tree-node__label__details">
                      <slot
                        name="icon"
                        @slotchange=${handleIconSlotChange}></slot>
                      ${label}
                    </span>
                  </div>
                  <ul id="subtree" role="group" class="${subTreeClasses}">
                    <slot @slotchange=${handleSlotChange}></slot>
                  </ul>`}
          `}
    `;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom Vite loader
}

export default CDSTreeNode;
