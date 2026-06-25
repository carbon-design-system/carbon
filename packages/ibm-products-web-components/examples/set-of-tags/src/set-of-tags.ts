/**
 * @license
 *
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html, nothing } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import '@carbon/web-components/es/components/tag/index.js';
import '@carbon/web-components/es/components/link/index.js';
import '@carbon/web-components/es/components/modal/index.js';
import '@carbon/web-components/es/components/search/index.js';
import { createOverflowHandler } from '@carbon/utilities';
import { TagType } from './example-data';
import styles from './set-of-tags.scss?lit';

const blockClass = `c4p--set-of-tags`;

@customElement('set-of-tags')
export default class SetOfTags extends LitElement {
  @state()
  hiddenTags: TagType[] = [];

  @property({ type: Array, attribute: 'tags-data', reflect: true })
  tagsData: TagType[] = [];

  @query(`.${blockClass}`)
  private container!: HTMLElement;

  @query('[data-offset]')
  private offset!: HTMLElement;

  @state()
  private isPopoverOpen = false;

  @state()
  private modalOpen = false;

  @state()
  private searchString = '';

  private overflowHandler: { disconnect: () => void } | undefined;
  private resizeObserver: ResizeObserver | undefined; // only for observing width changes of offset

  connectedCallback(): void {
    super.connectedCallback();
    this.style.visibility = 'hidden';
  }

  firstUpdated() {
    // setup overflow handler by observing offset by default
    // dynamic changes in offset sizes re-initializes the handler to account for the new offset size
    this.resizeObserver = new ResizeObserver(() => {
      this.setupOverflowHandler();
    });
    this.resizeObserver.observe(this.offset);

    // On first render, all elements are initially visible. so hiding `this` visibility in connectedCallback
    // The handler runs on the second render to hide specific elements as needed.
    // The following line restores visibility after layout settles, allowing for smoother transitions.
    setTimeout(() => {
      this.style.visibility = 'visible';
    });

    document.addEventListener('click', this.handleDocumentClick);
  }

  updated(changedProperties: Map<string, unknown>) {
    // setup overflow handler whenever tags data changes to account for the new item sizes
    if (changedProperties.has('tagsData')) {
      const previousIsPopoverOpen = this.isPopoverOpen;
      this.updateComplete.then(() => {
        this.hiddenTags = [];
        this.isPopoverOpen = previousIsPopoverOpen;
        this.setupOverflowHandler();
      });
    }

    if (!this.hiddenTags.length) {
      const lastItem = this.shadowRoot?.querySelector(
        '[data-hidden]:not([data-offset])'
      );
      lastItem?.removeAttribute('data-hidden');
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.overflowHandler?.disconnect();
    this.resizeObserver?.disconnect();
    document.removeEventListener('click', this.handleDocumentClick);
  }

  private setupOverflowHandler() {
    if (!this.container) {
      return;
    }

    // Disconnect existing handler if any
    this.overflowHandler?.disconnect();

    this.overflowHandler = createOverflowHandler({
      container: this.container,
      onChange: (_, hiddenItems: HTMLElement[]) => {
        const filteredChildren = Array.from(this.container.children).filter(
          (child) =>
            !child.hasAttribute('data-offset') &&
            !child.hasAttribute('data-fixed')
        );

        this.hiddenTags = hiddenItems.map((hiddenItem) => {
          const index = filteredChildren.indexOf(hiddenItem);
          return this.tagsData[index];
        });
      },
    });
  }

  private handleTogglePopover(event: Event) {
    if (
      event instanceof PointerEvent ||
      (event instanceof KeyboardEvent && [' ', 'Enter'].includes(event.key))
    ) {
      this.isPopoverOpen = !this.isPopoverOpen;
    }
  }

  private handleDocumentClick = (event: Event) => {
    if (event.target !== this) {
      this.isPopoverOpen = false;
    }
  };

  private handleDismiss = (e: CustomEvent, tag: TagType) => {
    e.stopPropagation();
    e.preventDefault();

    this.tagsData = this.tagsData.filter((t) => t.text !== tag.text);
    this.shadowRoot
      ?.querySelectorAll('[data-hidden]:not([data-offset])')
      .forEach((el) => el.removeAttribute('data-hidden'));

    const remaining = this.hiddenTags.filter((t) => t.text !== tag.text);
    if (this.hiddenTags.length === 2 && remaining[0]) {
      this.shadowRoot
        ?.querySelector(`#${remaining[0].text}`)
        ?.removeAttribute('data-hidden');
    }
  };

  render() {
    return html` <div class=${blockClass}>
        ${this.tagsData.map(
          (tag) => html`
            <span id=${tag?.text}>
              ${tag?.onClose
                ? html`<cds-dismissible-tag
                    @cds-dismissible-tag-beingclosed=${(e: CustomEvent) =>
                      this.handleDismiss(e, tag)}
                    text=${tag?.text}
                    tag-title="Provide a custom title to the tag"
                    type=${tag.type}
                    size=${tag.size}
                  ></cds-dismissible-tag>`
                : html`<cds-tag type=${tag.type} size=${tag.size}
                    >${tag?.text}</cds-tag
                  >`}
            </span>
          `
        )}
        <span data-offset ?data-hidden=${this.hiddenTags.length === 0}>
          <cds-popover
            ?open=${this.isPopoverOpen}
            ?highContrast=${true}
            align=${document.dir === 'rtl' ? 'bottom-left' : 'bottom-right'}
          >
            <cds-operational-tag
              size=${this.tagsData[0]?.size}
              title="+${this.hiddenTags.length}"
              text="+${this.hiddenTags.length}"
              @click=${this.handleTogglePopover}
              @keydown=${this.handleTogglePopover}
            ></cds-operational-tag>
            <cds-popover-content>
              <div class="${`${blockClass}__popover-container`}">
                ${this.hiddenTags.length > 0
                  ? this.hiddenTags.slice(0, 10).map((tag) =>
                      tag.onClose
                        ? html`
                            <div>
                              <cds-dismissible-tag
                                @cds-dismissible-tag-beingclosed=${(
                                  e: CustomEvent
                                ) => this.handleDismiss(e, tag)}
                                text=${tag?.text}
                                tag-title="Provide a custom title to the tag"
                                type=${tag.type}
                                size=${tag.size}
                              ></cds-dismissible-tag>
                            </div>
                          `
                        : html`<p class="${blockClass}__popover-tag">
                            ${tag?.text}
                          </p>`
                    )
                  : nothing}
                ${this.hiddenTags.length > 10
                  ? html`
                      <cds-link
                        class="${blockClass}__view-all"
                        @click=${() => (this.modalOpen = true)}
                        @keydown=${(e: KeyboardEvent) => {
                          if (e.key === ' ') {
                            this.modalOpen = true;
                          }
                        }}
                      >
                        View all tags
                      </cds-link>
                    `
                  : nothing}
              </div>
            </cds-popover-content>
          </cds-popover>
        </span>
      </div>
      ${this.hiddenTags.length > 10
        ? html`<cds-modal
            ?open=${this.modalOpen}
            size="sm"
            @cds-modal-closed=${(e: CustomEvent) => (this.modalOpen = false)}
          >
            <cds-modal-header>
              <cds-modal-close-button></cds-modal-close-button>
              <cds-modal-heading>All tags</cds-modal-heading>
              <cds-search
                size="lg"
                close-button-label-text="Clear search input"
                value="${this.searchString}"
                class="${blockClass}__modal-tags-search"
                label-text="Search"
                placeholder="Search all tags"
                type="text"
                @cds-search-input=${(e: CustomEvent) =>
                  (this.searchString = e.detail.value)}
              ></cds-search>
            </cds-modal-header>
            <cds-modal-body>
              <div class="${blockClass}__modal-tags-container">
                ${this.tagsData
                  .filter(
                    (tag) =>
                      tag.text &&
                      new RegExp(this.searchString, 'i').test(tag.text)
                  )
                  .map((tag) =>
                    tag.onClose
                      ? html`<cds-dismissible-tag
                          @cds-dismissible-tag-beingclosed=${(e: CustomEvent) =>
                            this.handleDismiss(e, tag)}
                          text=${tag?.text}
                          tag-title="Provide a custom title to the tag"
                          type=${tag.type}
                          size=${tag.size}
                        ></cds-dismissible-tag>`
                      : html`<cds-tag type=${tag.type} size=${tag.size}
                          >${tag?.text}</cds-tag
                        >`
                  )}
              </div>
            </cds-modal-body>
          </cds-modal>`
        : nothing}`;
  }

  static styles = styles;
}

declare global {
  interface HTMLElementTagNameMap {
    'set-of-tags': SetOfTags;
  }
}
