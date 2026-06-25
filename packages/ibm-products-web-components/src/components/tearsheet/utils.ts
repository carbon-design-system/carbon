/**
 * @license
 *
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { BUTTON_KIND } from '@carbon/web-components/es/components/button/defs.js';
import '@carbon/web-components/es/components/tabs/index.js';
import '@carbon/web-components/es/components/text-input/index.js';
import '@carbon/web-components/es/components/textarea/index.js';
import '@carbon/web-components/es/components/tabs/index.js';
import '@carbon/web-components/es/components/slug/index.js';
import '@carbon/web-components/es/components/ai-label/index.js';
import '@carbon/web-components/es/components/toggle-tip/index.js';
import '@carbon/web-components/es/components/dropdown/index.js';
import '@carbon/web-components/es/components/progress-indicator/index.js';
import '@carbon/web-components/es/components/progress-bar/index.js';
import './index';
import '../truncated-text/index';
import { html } from 'lit';
import { prefix } from '../../globals/settings';
import styles from './story-styles.scss?lit';

const storyPrefix = 'tearsheet-stories';
const cancelButton = () => {
  document.querySelector(`${prefix}-tearsheet`)?.removeAttribute('open');
};

export const influencers = {
  'No influencer': 0,
  'Simple influencer': 1,
  'Progress influencer': 2,
};

export const getInfluencer = (index) => {
  switch (index) {
    case 1:
      return html`<div
        slot="influencer"
        class=${`${storyPrefix}__dummy-content-block`}
      >
        Influencer
      </div>`;
    case 2:
      return html` <cds-progress-indicator
        vertical
        slot="influencer"
        class=${`${storyPrefix}__dummy-content-block`}
      >
        <cds-progress-step
          state="complete"
          label="First step"
          secondary-label="Optional label"
          description="Step 1: Getting started with Carbon Design System"
        ></cds-progress-step>
        <cds-progress-step
          label="Second step with tooltip"
          state="current"
        ></cds-progress-step>
        <cds-progress-step
          label="Third step with tooltip"
          state="incomplete"
        ></cds-progress-step>
        <cds-progress-step
          label="Fourth step"
          secondary-label="Example invalid step"
          state="invalid"
        ></cds-progress-step>
        <cds-progress-step
          disabled
          label="Fifth step"
          state="incomplete"
        ></cds-progress-step>
      </cds-progress-indicator>`;
    default:
      return null;
  }
};

export const getContent = (index) => {
  switch (index) {
    case 1:
      return html`
        <style>
          ${styles}
        </style>
        <div class=${`${storyPrefix}__dummy-content-block`}>
          <h5>Section</h5>
          <cds-text-input
            label="Input A"
            id="tearsheet-story-text-input-a"
            class="${storyPrefix}text-input"
          ></cds-text-input>
          <cds-text-input
            label="Input B"
            id="tearsheet-story-text-input-b"
            class="${storyPrefix}text-input"
          ></cds-text-input>
        </div>
      `;
    case 2:
      return html` <style>
          ${styles}
        </style>
        <div class=${`${storyPrefix}__dummy-content-block`}>
          <h5>Section</h5>
          <div class="${storyPrefix}text-inputs">
            <cds-text-input
              label="Input A"
              id="tearsheet-story-text-input-a"
            ></cds-text-input>
            <cds-text-input
              label="Input B"
              id="tearsheet-story-text-input-b"
            ></cds-text-input>
          </div>
          <div class="${storyPrefix}text-inputs">
            <cds-text-input
              label="Input C"
              id="tearsheet-story-text-input-c"
            ></cds-text-input>
            <cds-text-input
              label="Input D"
              id="tearsheet-story-text-input-d"
            ></cds-text-input>
          </div>
          <div class="${storyPrefix}textarea-container">
            <cds-textarea
              label="Notes"
              value="This is a text area"
            ></cds-textarea>
            <cds-textarea
              label="Notes"
              value="This is a text area"
            ></cds-textarea>
            <cds-textarea
              label="Notes"
              value="This is a text area"
            ></cds-textarea>
          </div>
        </div>`;
    default:
      return null;
  }
};

export const getLabel = (index) => {
  switch (index) {
    case 1:
      return html`<span slot="label">Optional label for context</span>`;
    case 2:
      return html`<span slot="label"
        >A longer label giving a bit more context
      </span>`;
    default:
      return null;
  }
};

export const getActionToolbarItems = (index) => {
  switch (index) {
    case 1:
      return html`<cds-dropdown slot="header-actions" value="option 1">
        ${['option 1', 'option 2', 'option 3', 'option 4'].map(
          (option) =>
            html` <cds-dropdown-item value="${option}"
              >${option}</cds-dropdown-item
            >`
        )}
      </cds-dropdown>`;
    case 2:
      return html`
        <cds-button
          slot="header-actions"
          kind=${BUTTON_KIND.SECONDARY}
          size="sm"
          style="width: initial"
        >
          Secondary
        </cds-button>
        <cds-button
          slot="header-actions"
          kind=${BUTTON_KIND.PRIMARY}
          size="sm"
          style="width: initial"
        >
          Primary
        </cds-button>
      `;
    default:
      return null;
  }
};

const toActions = (kinds: BUTTON_KIND[]) => {
  return kinds?.map((kind) => {
    return html`<cds-button
      key=${kind}
      slot="actions"
      kind=${kind}
      @click=${kind === 'ghost' && cancelButton}
    >
      ${kind.charAt(0).toUpperCase() + kind.slice(1)}
    </cds-button>`;
  });
};

// TODO: There are problems switching this
export const getActionItems = (index) => {
  switch (index) {
    case 1:
      return toActions([BUTTON_KIND.PRIMARY]);
    case 2:
      return toActions([BUTTON_KIND.GHOST, BUTTON_KIND.PRIMARY]);
    case 3:
      return toActions([BUTTON_KIND.DANGER, BUTTON_KIND.PRIMARY]);
    case 4:
      return toActions([
        BUTTON_KIND.GHOST,
        BUTTON_KIND.SECONDARY,
        BUTTON_KIND.PRIMARY,
      ]);
    case 5:
      return toActions([
        BUTTON_KIND.DANGER,
        BUTTON_KIND.SECONDARY,
        BUTTON_KIND.PRIMARY,
      ]);
    case 6:
      return toActions([
        BUTTON_KIND.GHOST,
        BUTTON_KIND.TERTIARY,
        BUTTON_KIND.SECONDARY,
        BUTTON_KIND.PRIMARY,
      ]);
    case 7:
      return toActions([
        BUTTON_KIND.DANGER,
        BUTTON_KIND.TERTIARY,
        BUTTON_KIND.SECONDARY,
        BUTTON_KIND.PRIMARY,
      ]);
    case 8:
      return toActions([
        BUTTON_KIND.GHOST,
        BUTTON_KIND.DANGER,
        BUTTON_KIND.TERTIARY,
        BUTTON_KIND.SECONDARY,
        BUTTON_KIND.PRIMARY,
      ]);
    default:
      return null;
  }
};

export const getNavigation = (index) => {
  switch (index) {
    case 1:
      return html` <div
        className="tearsheet-stories__tabs"
        slot="header-navigation"
      >
        <cds-tabs value="1">
          <cds-tab value="1">Tab 1</cds-tab>
          <cds-tab value="2">Tab 2</cds-tab>
          <cds-tab value="3">Tab 3</cds-tab>
          <cds-tab value="4">Tab 4</cds-tab>
        </cds-tabs>
      </div>`;
    default:
      return null;
  }
};

export const getSlug = (index) => {
  switch (index) {
    case 1:
      return html`<cds-slug size="xs" alignment="bottom-right">
        <div slot="body-text">
          <p class="secondary">AI Explained</p>
          <h1>84%</h1>
          <p class="secondary bold">Confidence score</p>
          <!-- //cspell: disable -->
          <p class="secondary">
            Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.
          </p>
          <!-- //cspell: enable -->
          <hr />
          <p class="secondary">Model type</p>
          <p class="bold">Foundation model</p>
        </div>
      </cds-slug>`;
    default:
      return null;
  }
};
// cspell: disable
export const getDecorator = (decorator) => {
  switch (decorator) {
    case 'WITH_AI_LABEL':
      return html`
        <cds-ai-label alignment="bottom-right" slot="decorator">
          <div slot="body-text">
            <p class="secondary">AI Explained</p>
            <h2 class="ai-label-heading">84%</h2>
            <p class="secondary bold">Confidence score</p>
            <p class="secondary">
              Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed
              do eiusmod tempor incididunt ut fsil labore et dolore magna
              aliqua.
            </p>
            <hr />
            <p class="secondary">Model type</p>
            <p class="bold">Foundation model</p>
          </div>
        </cds-ai-label>
      `;
    case 'NON_AI_LABEL_DECORATOR':
      return html`
        <cds-toggletip slot="decorator" alignment="bottom">
          <p slot="body-text">
            Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.
          </p>
          <cds-link slot="actions">Test</cds-link>
          <cds-button slot="actions">Button</cds-button>
        </cds-toggletip>
      `;
    default:
      return;
  }
};
// cspell: enable

export const getDescription = (index) => {
  switch (index) {
    case 1:
      return html`
        <span slot="description">
          This is a description for the tearsheet, providing an opportunity to
          describe the flow over a couple of lines in the header of the
          tearsheet.
        </span>
      `;
    case 2:
      return html`
        <span slot="description">
          <c4p-truncated-text
            value="This is a description for the tearsheet, providing an opportunity to describe the flow over a couple of lines in the header of the tearsheet."
            lines="1"
            autoalign="true"
            align="bottom"
          />
        </span>
      `;
    case 3:
      return html`
        <span slot="description">
          <c4p-truncated-text
            value="This is a description for the tearsheet, providing an opportunity to describe the flow over a couple of lines in the header of the tearsheet."
            lines="2"
            autoalign="true"
            align="bottom"
          />
        </span>
      `;
    default:
      return null;
  }
};
