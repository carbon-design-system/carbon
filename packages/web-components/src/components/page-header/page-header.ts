/**
 * @license
 *
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { provide } from '@lit/context';
import { prefix } from '../../globals/settings';
import styles from './page-header.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import { pageHeaderContext } from './context';
import { getHeaderOffset } from './utils';
import CDSPageHeaderContent from './page-header-content';

export interface pageHeaderContextType {
  breadcrumbOffset?: number;
  headerOffset?: number;
  fullyCollapsed?: boolean;
  titleClipped?: boolean;
  contentActionsClipped?: boolean;
  root?: CDSPageHeader | null;
  withContent?: boolean;
  disableStickyTabBar?: boolean;
  fullWidthGrid?: boolean;
  narrowGrid?: boolean;
}

/**
 * Page header.
 * @element cds-page-header
 */
@customElement(`${prefix}-page-header`)
class CDSPageHeader extends LitElement {
  /**
   * Set to `true` to use a full-width Carbon CSS grid (no max-width cap).
   */
  @property({ attribute: 'full-width-grid', type: Boolean, reflect: true })
  fullWidthGrid = false;

  /**
   * Set to `true` to use the Carbon narrow grid mode (content aligns to
   * the gutter edge).
   */
  @property({ attribute: 'narrow-grid', type: Boolean, reflect: true })
  narrowGrid = false;

  @state()
  @provide({ context: pageHeaderContext })
  context: pageHeaderContextType = {
    fullWidthGrid: this.fullWidthGrid,
    narrowGrid: this.narrowGrid,
  };

  private resizeObserver: ResizeObserver | undefined;
  private contentObserver: IntersectionObserver | undefined;
  private titleObserver: IntersectionObserver | undefined;
  private actionsObserver: IntersectionObserver | undefined;

  updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);
    if (changedProperties.has('context')) {
      // Update host class based on disableStickyTabBar
      if (this.context.disableStickyTabBar) {
        this.classList.add(`${prefix}--page-header--disable-sticky-tab-bar`);
      } else {
        this.classList.remove(`${prefix}--page-header--disable-sticky-tab-bar`);
      }
    }
    if (
      changedProperties.has('fullWidthGrid') ||
      changedProperties.has('narrowGrid')
    ) {
      this.context = {
        ...this.context,
        fullWidthGrid: this.fullWidthGrid,
        narrowGrid: this.narrowGrid,
      };
    }
  }

  connectedCallback(): void {
    super.connectedCallback();
    // Listen for the page-actions container registration from page-header-content
    this.addEventListener(
      `${prefix}-page-header-content-actions-registered`,
      (e: Event) => {
        const { actionsEl } = (e as CustomEvent).detail as {
          actionsEl: HTMLElement;
        };
        if (!actionsEl) {
          return;
        }
        // Re-wire the actionsObserver to the specific page-actions element
        this.actionsObserver?.disconnect();
        this.actionsObserver = this._createActionsObserver();
        this.actionsObserver.observe(actionsEl);
      }
    );

    this.resizeObserver = new ResizeObserver((entries) => {
      const pageHeaderElement = entries[0];
      const contentEl = pageHeaderElement.target.querySelector(
        `${prefix}-page-header-content`
      );
      const contentHeight =
        contentEl instanceof CDSPageHeaderContent ? contentEl.scrollHeight : 0;
      const paddingBlockStart =
        contentEl instanceof CDSPageHeaderContent
          ? parseFloat(getComputedStyle(contentEl)?.paddingBlockStart)
          : 0;
      const paddingBlockEnd =
        contentEl instanceof CDSPageHeaderContent
          ? parseFloat(getComputedStyle(contentEl)?.paddingBlockEnd)
          : 0;
      const totalContentHeight =
        contentHeight + paddingBlockStart + paddingBlockEnd;
      const headerOffset = getHeaderOffset(this);
      const contentPadding = paddingBlockStart;

      this.style.setProperty(
        `--${prefix}-page-header-header-top`,
        `${(Math.round(totalContentHeight - contentPadding) - headerOffset) * -1}px`
      );
      this.style.setProperty(
        `--${prefix}-page-header-breadcrumb-top`,
        `${headerOffset}px`
      );
      this.context = {
        ...this.context,
        breadcrumbOffset: headerOffset,
        headerOffset: (Math.round(totalContentHeight) - headerOffset) * -1,
        root: this,
        withContent: !!contentEl,
      };
    });
    this.resizeObserver.observe(this);

    this.actionsObserver = this._createActionsObserver();
  }

  firstUpdated() {
    const contentElement = this.querySelector(`${prefix}-page-header-content`);
    const predefinedContentPadding = 24;
    const totalHeaderOffset = getHeaderOffset(this);

    this.contentObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const fullyCollapsed = !entry.isIntersecting;
          if (this.context.fullyCollapsed !== fullyCollapsed) {
            this.context = { ...this.context, fullyCollapsed };
            this.dispatchEvent(
              new CustomEvent(`${prefix}-page-header-fully-collapsed`, {
                bubbles: true,
                composed: true,
                detail: { fullyCollapsed },
              })
            );
          }
        });
      },
      {
        root: null,
        rootMargin: `${(predefinedContentPadding + totalHeaderOffset + 40) * -1}px 0px 0px 0px`,
        threshold: 0.1,
      }
    );

    this.titleObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const titleClipped = !entry.isIntersecting;
          if (this.context.titleClipped !== titleClipped) {
            this.context = { ...this.context, titleClipped };
            this.dispatchEvent(
              new CustomEvent(`${prefix}-page-header-title-clipped`, {
                bubbles: true,
                composed: true,
                detail: { titleClipped },
              })
            );
          }
        });
      },
      {
        root: null,
        rootMargin: `${(predefinedContentPadding + totalHeaderOffset + 40) * -1}px 0px 0px 0px`,
        threshold: 0.95,
      }
    );

    if (contentElement) {
      this.contentObserver.observe(contentElement);
      this.titleObserver.observe(contentElement);
      // actionsObserver starts on contentElement; once page-header-content fires
      // its registration event, it is rewired to the specific page-actions element.
      this.actionsObserver?.observe(contentElement);
    }
  }

  private _createActionsObserver(): IntersectionObserver {
    const totalHeaderOffset = getHeaderOffset(this);
    return new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const contentActionsClipped = !entry.isIntersecting;
          if (this.context.contentActionsClipped !== contentActionsClipped) {
            this.context = { ...this.context, contentActionsClipped };
            this.dispatchEvent(
              new CustomEvent(`${prefix}-page-header-content-actions-clipped`, {
                bubbles: true,
                composed: true,
                detail: { contentActionsClipped },
              })
            );
          }
        });
      },
      {
        root: null,
        // 48 -> breadcrumb bar height
        // 18 -> content padding
        rootMargin: `${(totalHeaderOffset + 48 + 18) * -1}px 0px 0px 0px`,
        threshold: 0.95,
      }
    );
  }

  disconnectedCallback() {
    this.resizeObserver?.disconnect();
    this.contentObserver?.disconnect();
    this.titleObserver?.disconnect();
    this.actionsObserver?.disconnect();
    super.disconnectedCallback();
  }

  render() {
    return html`<slot></slot>`;
  }

  static styles = styles;
}

export default CDSPageHeader;
