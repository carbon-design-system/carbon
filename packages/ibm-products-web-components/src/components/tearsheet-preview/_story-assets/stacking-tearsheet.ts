/**
 * @license
 *
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ref, createRef } from 'lit/directives/ref.js';
import '../index.js';
import '@carbon/web-components/es/components/button/index.js';
import '@carbon/web-components/es/components/text-input/index.js';
import styles from './_storybook-styles.scss?lit';
import { iconLoader } from '@carbon/web-components/es/globals/internal/icon-loader.js';
import BottomPanelOpen32 from '@carbon/icons/es/bottom-panel--open/32';

@customElement('stacking-tearsheet-demo')
export class StackingTearsheetDemo extends LitElement {
  @property({ type: String, attribute: 'tearsheet-type' })
  tearsheetType = 'wide';

  @state()
  private _open1 = false;

  @state()
  private _open2 = false;

  @state()
  private _open3 = false;

  private _launcherButtonRef1 = createRef<HTMLElement>();
  private _launcherButtonRef2 = createRef<HTMLElement>();
  private _launcherButtonRef3 = createRef<HTMLElement>();

  connectedCallback(): void {
    super.connectedCallback();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
  }

  private _toggleTearsheet1() {
    this._open1 = !this._open1;
  }

  private _toggleTearsheet2() {
    this._open2 = !this._open2;
  }

  private _toggleTearsheet3() {
    this._open3 = !this._open3;
  }

  render() {
    const summaryContent = html`
      <div class="rightDetailsBody">
        <div>
          <label>item 1</label>
          <p>item description</p>
        </div>
        <div>
          <label>item 2</label>
          <p>item description</p>
        </div>
        <div>
          <label>item 3</label>
          <p>item description</p>
        </div>
        <div>
          <label>item 4</label>
          <p>item description</p>
        </div>
        <div>
          <label>item 5</label>
          <p>item description</p>
        </div>
      </div>
    `;

    const dummyContent = html`
      <section class="main-content">
        <h4>Main content heading</h4>
        <div class="tearsheet-preview-stories-text-inputs">
          <cds-text-input
            label="Enter an important value here"
            id="tss-ft1"
          ></cds-text-input>
          <cds-text-input
            label="Here is an entry field:"
            id="tss-ft2"
          ></cds-text-input>
        </div>
      </section>
    `;
    const getTearsheetVariant = (index) => {
      if (this.tearsheetType === 'mixed') {
        return index % 2 === 0 ? 'narrow' : 'wide';
      }
      if (this.tearsheetType === 'wide') {
        return 'wide';
      }
      if (this.tearsheetType === 'narrow') {
        return 'narrow';
      }
      return 'wide';
    };
    return html`
      <div class="stackButtons">
        <cds-button
          ${ref(this._launcherButtonRef1)}
          @click="${this._toggleTearsheet1}"
          aria-haspopup="dialog"
        >
          Open Tearsheet 1
        </cds-button>
      </div>
      <div class="smallScreenButton">
        <cds-button
          kind="ghost"
          @click="${this._toggleTearsheet1}"
          aria-label="Open Tearsheet 1"
          aria-haspopup="dialog"
          tooltip-text="Open Tearsheet 1"
          tooltip-position="right"
        >
          ${iconLoader(BottomPanelOpen32, {
            slot: 'icon',
          })}
        </cds-button>
      </div>

      <!-- Wrap tearsheets in stack provider to enable stacking -->
      <c4p-tearsheet-stack stack-step-size="lg">
        <!-- Tearsheet 1 -->
        <c4p-preview-tearsheet
          ?open="${this._open1}"
          variant="${getTearsheetVariant(1)}"
          .launcherButtonRef="${this._launcherButtonRef1.value}"
          selector-primary-focus="#tss-ft1"
          @c4p-preview-tearsheet-closed="${() => (this._open1 = false)}"
        >
          <c4p-tearsheet-header>
            <c4p-tearsheet-header-content title="Tearsheet 1">
              <label slot="label">Customer data</label>
              <span slot="description">
                This is a description for the tearsheet, providing an
                opportunity to describe the flow over a couple of lines in the
                header of the tearsheet.
              </span>
              <div slot="header-actions">
                <cds-button
                  ${ref(this._launcherButtonRef2)}
                  size="sm"
                  kind="tertiary"
                  @click="${this._toggleTearsheet2}"
                  aria-haspopup="dialog"
                >
                  Open Tearsheet 2
                </cds-button>
              </div>
            </c4p-tearsheet-header-content>
          </c4p-tearsheet-header>

          <c4p-tearsheet-body>
            <div slot="main-content">${dummyContent}</div>
            <c4p-tearsheet-summary-content slot="summary-content">
              <h4 class="rightPanelHeading">Summary Details</h4>
              ${summaryContent}
            </c4p-tearsheet-summary-content>
          </c4p-tearsheet-body>

          <c4p-tearsheet-footer
            .actions="${[
              {
                kind: 'ghost',
                label: 'Cancel',
                onClick: () => this._toggleTearsheet1(),
              },
              {
                kind: 'secondary',
                label: 'Back',
              },
              {
                kind: 'primary',
                label: 'Submit',
              },
            ]}"
          >
          </c4p-tearsheet-footer>
        </c4p-preview-tearsheet>

        <!-- Tearsheet 2 -->
        <c4p-preview-tearsheet
          ?open="${this._open2}"
          variant="${getTearsheetVariant(2)}"
          .launcherButtonRef="${this._launcherButtonRef2.value}"
          selector-primary-focus="#tss-ft1"
          @c4p-preview-tearsheet-closed="${() => (this._open2 = false)}"
        >
          <c4p-tearsheet-header>
            <c4p-tearsheet-header-content title="Tearsheet 2">
              <label slot="label">Customer data</label>
              <span slot="description">
                This is a description for the tearsheet, providing an
                opportunity to describe the flow over a couple of lines in the
                header of the tearsheet.
              </span>
              <div slot="header-actions">
                <cds-button
                  ${ref(this._launcherButtonRef3)}
                  size="sm"
                  kind="tertiary"
                  @click="${this._toggleTearsheet3}"
                  aria-haspopup="dialog"
                >
                  Open Tearsheet 3
                </cds-button>
              </div>
            </c4p-tearsheet-header-content>
          </c4p-tearsheet-header>

          <c4p-tearsheet-body>
            <div slot="main-content">${dummyContent}</div>
            <c4p-tearsheet-summary-content slot="summary-content">
              <h4 class="rightPanelHeading">Summary Details</h4>
              ${summaryContent}
            </c4p-tearsheet-summary-content>
          </c4p-tearsheet-body>

          <c4p-tearsheet-footer
            .actions="${[
              {
                kind: 'ghost',
                label: 'Cancel',
                onClick: () => this._toggleTearsheet2(),
              },
              {
                kind: 'secondary',
                label: 'Back',
              },
              {
                kind: 'primary',
                label: 'Submit',
              },
            ]}"
          >
          </c4p-tearsheet-footer>
        </c4p-preview-tearsheet>

        <!-- Tearsheet 3 -->
        <c4p-preview-tearsheet
          ?open="${this._open3}"
          variant="${getTearsheetVariant(3)}"
          .launcherButtonRef="${this._launcherButtonRef3.value}"
          selector-primary-focus="#tss-ft1"
          @c4p-preview-tearsheet-closed="${() => (this._open3 = false)}"
        >
          <c4p-tearsheet-header>
            <c4p-tearsheet-header-content title="Tearsheet 3">
              <label slot="label">Customer data</label>
              <span slot="description">
                This is a description for the tearsheet, providing an
                opportunity to describe the flow over a couple of lines in the
                header of the tearsheet.
              </span>
            </c4p-tearsheet-header-content>
          </c4p-tearsheet-header>

          <c4p-tearsheet-body>
            <div slot="main-content">${dummyContent}</div>
            <c4p-tearsheet-summary-content slot="summary-content">
              <h4 class="rightPanelHeading">Summary Details</h4>
              ${summaryContent}
            </c4p-tearsheet-summary-content>
          </c4p-tearsheet-body>

          <c4p-tearsheet-footer
            .actions="${[
              {
                kind: 'ghost',
                label: 'Cancel',
                onClick: () => this._toggleTearsheet3(),
              },
              {
                kind: 'secondary',
                label: 'Back',
              },
              {
                kind: 'primary',
                label: 'Submit',
              },
            ]}"
          >
          </c4p-tearsheet-footer>
        </c4p-preview-tearsheet>
      </c4p-tearsheet-stack>
    `;
  }

  static styles = styles;
}

declare global {
  interface HTMLElementTagNameMap {
    'stacking-tearsheet-demo': StackingTearsheetDemo;
  }
}
