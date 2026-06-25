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
import { classMap } from 'lit/directives/class-map.js';
import '@carbon/web-components/es/components/tag/index.js';
import '@carbon/ibm-products-web-components/es/components/user-avatar/index.js';
import '@carbon/web-components/es/components/link/index.js';
import '@carbon/web-components/es/components/modal/index.js';
import '@carbon/web-components/es/components/search/index.js';
import { createOverflowHandler } from '@carbon/utilities';
import styles from './set-of-users.scss?lit';

const blockClass = `c4p--set-of-users`;

// TODO: remove after user-avatar gets box-sizing
function waitForDeepSelector(
  selector: any,
  root: any = document,
  maxTries = 10
): Promise<any> {
  const find = (el: any): any =>
    el?.querySelector?.(selector) ||
    (el?.shadowRoot && find(el.shadowRoot)) ||
    [...(el?.children || [])].map(find).find(Boolean) ||
    [...(el?.children || [])]
      .map((c) => c.shadowRoot && find(c.shadowRoot))
      .find(Boolean);

  return new Promise((resolve, reject) => {
    let tries = 0;
    const check = () =>
      find(root)
        ? resolve(find(root))
        : ++tries >= maxTries
          ? reject(`Selector "${selector}" not found`)
          : requestAnimationFrame(check);
    check();
  });
}

@customElement('set-of-users')
export default class SetOfUsers extends LitElement {
  @state()
  hiddenUsers: any[] = [];

  @property({ type: Array, attribute: 'users-data', reflect: true })
  usersData: any[] = [];

  @property({ type: String, attribute: 'theme', reflect: true })
  theme: string = 'white';

  @property({ type: Boolean, attribute: 'condensed', reflect: true })
  condensed = false;

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
    // Observe size changes in the overflow offset item
    this.resizeObserver = new ResizeObserver(() => {
      this.setupOverflowHandler();
    });
    this.resizeObserver.observe(this.offset);

    document.addEventListener('click', this.handleDocumentClick);

    // On first render, all elements are initially visible. so hiding `this` visibility in connectedCallback
    // The handler runs on the second render to hide specific elements as needed.
    // The following line restores visibility after layout settles, allowing for smoother transitions.
    setTimeout(() => {
      this.style.visibility = 'visible';
    });

    // TODO: remove after user-avatar gets box-sizing
    this.shadowRoot?.querySelectorAll('c4p-user-avatar').forEach((el) => {
      waitForDeepSelector('button', el)
        .then((btn) => {
          btn.style.boxSizing = 'border-box';
        })
        .catch(console.warn);
    });
  }

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('usersData')) {
      this.updateComplete.then(() => {
        this.hiddenUsers = [];
        this.setupOverflowHandler();
      });
    }

    if (!this.hiddenUsers.length) {
      const lastItem = this.shadowRoot?.querySelector(
        '[data-hidden]:not([data-offset])'
      );
      lastItem?.removeAttribute('data-hidden');
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.overflowHandler) {
      this.overflowHandler.disconnect();
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
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

        this.hiddenUsers = hiddenItems.map((hiddenItem) => {
          const index = filteredChildren.indexOf(hiddenItem);
          return this.usersData[index];
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

  render() {
    return html` <div
        class=${blockClass}
        style="display: flex; white-space: nowrap;"
      >
        ${this.usersData.map(
          (user) => html`
            <span>
              <c4p-user-avatar
                theme=${this.theme}
                class=${classMap({
                  [`${blockClass}__custom-avatar`]: true,
                  [`${blockClass}__custom-avatar--${user.size}`]: true,
                  [`${blockClass}__custom-avatar--condensed`]: this.condensed,
                })}
                name=${user?.name}
                background-color=${user?.backgroundColor}
                size=${user?.size}
                tooltip-text=${user?.name}
                tooltip-alignment="top"
              ></c4p-user-avatar>
            </span>
          `
        )}
        <span data-offset ?data-hidden=${this.hiddenUsers.length === 0}>
          <cds-popover
            ?open=${this.isPopoverOpen}
            ?highContrast=${true}
            align=${document.dir === 'rtl' ? 'bottom-left' : 'bottom-right'}
          >
            <button
              class=${classMap({
                [`${blockClass}__custom-overflow`]: true,
                [`${blockClass}__custom-overflow--${this.usersData[0].size}`]:
                  true,
              })}
              @click=${this.handleTogglePopover}
            >
              +${this.hiddenUsers.length}
            </button>
            <cds-popover-content>
              <div
                style="padding: 0.9rem;"
                class="${blockClass}__popover-container"
              >
                ${this.hiddenUsers.length > 0
                  ? this.hiddenUsers
                      .slice(0, 10)
                      .map(
                        (user) =>
                          html`<p class="${blockClass}__popover-user">
                            ${user?.name}
                          </p>`
                      )
                  : nothing}
                ${this.hiddenUsers.length > 10
                  ? html`
                      <cds-link
                        class="${blockClass}__popover-view-all"
                        @click=${() => (this.modalOpen = true)}
                        @keydown=${(e: KeyboardEvent) => {
                          if (e.key === ' ') {
                            this.modalOpen = true;
                          }
                        }}
                      >
                        View all users
                      </cds-link>
                    `
                  : nothing}
              </div>
            </cds-popover-content>
          </cds-popover>
        </span>
      </div>
      ${this.hiddenUsers.length > 10
        ? html`<cds-modal
            ?open=${this.modalOpen}
            size="sm"
            @cds-modal-closed=${(e: CustomEvent) => (this.modalOpen = false)}
          >
            <cds-modal-header>
              <cds-modal-close-button></cds-modal-close-button>
              <cds-modal-heading>All users</cds-modal-heading>
              <cds-search
                size="lg"
                close-button-label-text="Clear search input"
                value="${this.searchString}"
                class="${blockClass}__modal-users-search"
                label-text="Search"
                placeholder="Search all users"
                type="text"
                @cds-search-input=${(e: CustomEvent) =>
                  (this.searchString = e.detail.value)}
              ></cds-search>
            </cds-modal-header>
            <cds-modal-body>
              <div class="modal-users-container">
                ${this.usersData
                  .filter(
                    (user) =>
                      user?.name &&
                      new RegExp(this.searchString, 'i').test(user?.name)
                  )
                  .map((user) => html`<cds-tag>${user?.name}</cds-tag>`)}
              </div>
            </cds-modal-body>
          </cds-modal>`
        : nothing}`;
  }

  static styles = styles;
}

declare global {
  interface HTMLElementTagNameMap {
    'set-of-users': SetOfUsers;
  }
}
