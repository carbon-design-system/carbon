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
import { TREE_SIZE } from './defs';
import HostListener from '../../globals/decorators/host-listener';
import HostListenerMixin from '../../globals/mixins/host-listener';
import styles from './tree-view.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import CDSTreeNode from './tree-node';

export { TREE_SIZE };
/**
 * Tree view.
 *
 * @element cds-tree-view
 */
@customElement(`${prefix}-tree-view`)
class CDSTreeView extends HostListenerMixin(LitElement) {
  /**
   * Specify whether or not the label should be hidden
   */
  @property({ type: Boolean, attribute: 'hide-label' })
  hideLabel = false;

  /**
   * Provide the label text that will be read by a screen reader
   */
  @property()
  label!: string;

  /**
   * Specify the size of the tree from a list of available sizes.
   */
  @property({ reflect: true })
  size = TREE_SIZE.SMALL;

  @HostListener('click')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _click = ({ target }) => {
    if ((target as CDSTreeNode).disabled) return;

    const nodes = this.querySelectorAll(CDSTreeView.selectorTreeNode);
    nodes.forEach((node) => {
      const isTarget = node === target;
      const isLink = (node as CDSTreeNode).hasAttribute('href');
      const element = isLink ? node.shadowRoot?.querySelector('a') : node;
      (node as CDSTreeNode).selected = isTarget;
      (node as CDSTreeNode).active = isTarget;
      if (!isTarget) {
        isLink
          ? (element as CDSTreeNode).setAttribute('tabindex', '-1')
          : (element as CDSTreeNode).removeAttribute('tabindex');
      } else (element as CDSTreeNode).setAttribute('tabindex', '0');
    });
  };

  @HostListener('keydown')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleKeyDown = (event: KeyboardEvent) => {
    const { key } = event;
    const nodes = Array.from(
      this.querySelectorAll(CDSTreeView.selectorTreeNode)
    ).filter(
      (node) => node.checkVisibility() && !node.hasAttribute('disabled')
    );

    const allNodes = Array.from(
      this.querySelectorAll(CDSTreeView.selectorTreeNode)
    ).filter((node) => !node.hasAttribute('disabled'));

    const withLinks = (nodes[0] as CDSTreeNode).href;

    const currentIndex = nodes.findIndex((node) =>
      withLinks
        ? node.shadowRoot?.querySelector('a')!.getAttribute('tabindex') === '0'
        : node.getAttribute('tabindex') === '0'
    );

    let nextIndex = currentIndex;

    switch (key) {
      case 'ArrowDown':
        nextIndex = Math.min(currentIndex + 1, nodes.length - 1);
        break;
      case 'ArrowUp':
        nextIndex = Math.max(currentIndex - 1, 0);
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = nodes.length - 1;
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        allNodes.forEach((node) => {
          (node as CDSTreeNode).selected = false;
          (node as CDSTreeNode).active = false;
        });
        (nodes[currentIndex] as CDSTreeNode).selected = true;
        (nodes[currentIndex] as CDSTreeNode).active = true;
        break;
      case 'ArrowRight':
        if ((nodes[currentIndex] as CDSTreeNode).hasAttribute('parent')) {
          (nodes[currentIndex] as CDSTreeNode).isExpanded = true;
          nodes[currentIndex].setAttribute('aria-expanded', 'true');
        }
        break;
      case 'ArrowLeft':
        if (!nodes[currentIndex].hasAttribute('parent')) {
          const temp = nodes.findIndex(
            (node) => node === nodes[currentIndex].parentElement
          );
          nextIndex = temp === -1 ? currentIndex : temp;
        } else {
          (nodes[currentIndex] as CDSTreeNode).isExpanded = false;
          nodes[currentIndex].setAttribute('aria-expanded', 'false');
        }
        break;
    }

    if (nextIndex !== currentIndex) {
      nodes.forEach((node) => {
        if (!withLinks) {
          node.removeAttribute('tabindex');
        } else {
          node.shadowRoot?.querySelector('a')!.setAttribute('tabindex', '-1');
        }
      });
      const element = withLinks
        ? (nodes[nextIndex] as CDSTreeNode).shadowRoot!.querySelector('a')
        : nodes[nextIndex];
      (element as CDSTreeNode).setAttribute('tabindex', '0');
      (element as CDSTreeNode).focus();
      event.preventDefault();
    }
  };

  private async _setInitialFocus() {
    await this.updateComplete;

    const nodes = this.querySelectorAll(CDSTreeView.selectorTreeNode);
    if (nodes.length > 0) {
      const selectedNode =
        Array.from(nodes).find((node) => (node as CDSTreeNode).selected) ||
        nodes[0];
      const element = (selectedNode as CDSTreeNode).href
        ? (selectedNode as CDSTreeNode).shadowRoot!.querySelector('a')
        : selectedNode;
      (element as CDSTreeNode).setAttribute('tabindex', '0');
    }
  }
  connectedCallback() {
    super.connectedCallback();

    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'tree');
    }

    if (!this.hasAttribute('aria-label')) {
      this.setAttribute('aria-label', this.label);
    }
  }

  updated(changedProperties) {
    this._setInitialFocus();

    if (changedProperties.has('size')) {
      const items = this.querySelectorAll(CDSTreeView.selectorTreeNode);
      items.forEach((item) => {
        (item as CDSTreeNode).setAttribute('size', this.size);
      });
    }
  }

  render() {
    const { hideLabel, label, size } = this;
    const labelId = 'tree-view__label';
    const treeClasses = classMap({
      [`${prefix}--tree`]: true,
      [`${prefix}--tree--${size}`]: size,
    });
    return html`
      ${
        !hideLabel
          ? html`<label id=${labelId} class=${`${prefix}--label`}
              >${label}
            </label>`
          : null
      }
      <ul
        aria-label=${hideLabel ? label : undefined}
        aria-labelledby=${!hideLabel ? labelId : undefined}
        class=${treeClasses}
        role="tree">
        <slot><slot>
      </ul>
    `;
  }

  static get selectorTreeNode() {
    return `${prefix}-tree-node`;
  }

  static styles = styles;
}

export default CDSTreeView;
