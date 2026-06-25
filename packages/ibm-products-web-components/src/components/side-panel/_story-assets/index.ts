/**
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { html } from 'lit';
import styles from '../story-styles.scss?lit';
import { BUTTON_KIND } from '@carbon/web-components/es/components/button/defs.js';
import TrashCan16 from '@carbon/icons/es/trash-can/16';
import Settings16 from '@carbon/icons/es/settings/16';
import { iconLoader } from '@carbon/web-components/es/globals/internal/icon-loader.js';
import '@carbon/web-components/es/components/breadcrumb/index.js';
import '@carbon/web-components/es/components/notification/index.js';

const storyPrefix = 'side-panel-stories__';

export const getContent = (index) => {
  switch (index) {
    case 1:
      return html`
        <style>
          ${styles}
        </style>
        <h5>Section</h5>
        <cds-text-input
          label="Input A"
          id="side-panel-story-text-input-a"
          class="${storyPrefix}text-input"
        ></cds-text-input>
        <cds-text-input
          label="Input B"
          id="side-panel-story-text-input-b"
          class="${storyPrefix}text-input"
        ></cds-text-input>
      `;
    case 2:
      return html`
        <style>
          ${styles}
        </style>
        <h5>Section</h5>
        <div class="${storyPrefix}text-inputs">
          <cds-text-input
            label="Input A"
            id="side-panel-story-text-input-a"
          ></cds-text-input>
          <cds-text-input
            label="Input B"
            id="side-panel-story-text-input-b"
          ></cds-text-input>
        </div>
        <div class="${storyPrefix}text-inputs">
          <cds-text-input
            label="Input C"
            id="side-panel-story-text-input-c"
          ></cds-text-input>
          <cds-text-input
            label="Input D"
            id="side-panel-story-text-input-d"
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
      `;

    default:
      return null;
  }
};

export const getSubTitle = (index) => {
  switch (index) {
    case 1:
      return html`<div slot="subtitle">This is your subtitle slot.</div>`;
    case 2:
      return html`<div slot="subtitle">
        I am your subtitle slot for <strong>adding detail</strong> that can be
        one or two lines.
      </div>`;
    default:
      return null;
  }
};

export const getActionToolbarItems = (index) => {
  switch (index) {
    case 1:
      return html`
        <cds-button slot="action-toolbar">Copy</cds-button>
        <cds-button
          slot="action-toolbar"
          aria-label="Settings"
          has-icon-only="true"
          kind=${BUTTON_KIND.GHOST}
          size="sm"
          tooltip-text="Settings"
        >
          ${iconLoader(Settings16, { slot: 'icon' })}
        </cds-button>
        <cds-button
          slot="action-toolbar"
          aria-label="Delete"
          has-icon-only="true"
          kind=${BUTTON_KIND.GHOST}
          size="sm"
          tooltip-text="Delete"
        >
          ${iconLoader(TrashCan16, { slot: 'icon' })}
        </cds-button>
      `;
    default:
      return null;
  }
};

// TODO: There are problems switching this
export const getActionItems = (index) => {
  switch (index) {
    case 1: // One button
      return html`<cds-button slot="actions" kind=${BUTTON_KIND.PRIMARY}
        >Primary</cds-button
      >`;
    case 2: // One button (ghost)
      return html`<cds-button slot="actions" kind=${BUTTON_KIND.GHOST}
        >Ghost</cds-button
      >`;
    case 3: // One button (danger)
      return html`<cds-button slot="actions" kind=${BUTTON_KIND.DANGER}
        >Danger</cds-button
      >`;
    case 4: // Two buttons
      return html`
        <cds-button slot="actions" kind=${BUTTON_KIND.SECONDARY}
          >Secondary</cds-button
        >
        <cds-button slot="actions" kind=${BUTTON_KIND.PRIMARY}
          >Primary</cds-button
        >
      `;
    case 5: // Two buttons with ghost
      return html`
        <cds-button slot="actions" kind=${BUTTON_KIND.GHOST}>Ghost</cds-button>
        <cds-button slot="actions" kind=${BUTTON_KIND.PRIMARY}
          >Primary</cds-button
        >
      `;
    case 6: // Two buttons with danger
      return html`<cds-button slot="actions" kind=${BUTTON_KIND.DANGER}
          >Danger</cds-button
        >
        <cds-button slot="actions" kind=${BUTTON_KIND.PRIMARY}
          >Primary</cds-button
        >`;
    case 7: // Three buttons with ghost
      return html`<cds-button slot="actions" kind=${BUTTON_KIND.GHOST}
          >Ghost</cds-button
        >
        <cds-button slot="actions" kind=${BUTTON_KIND.SECONDARY}
          >Secondary</cds-button
        >
        <cds-button slot="actions" kind=${BUTTON_KIND.PRIMARY}
          >Primary</cds-button
        >`;
    case 8: // Three buttons with danger
      return html`<cds-button slot="actions" kind=${BUTTON_KIND.DANGER}
          >Danger</cds-button
        >
        <cds-button slot="actions" kind=${BUTTON_KIND.SECONDARY}
          >Secondary</cds-button
        >
        <cds-button slot="actions" kind=${BUTTON_KIND.PRIMARY}
          >Primary</cds-button
        >`;
    case 9: // Three buttons
      return html`<cds-button slot="actions" kind=${BUTTON_KIND.SECONDARY}
          >Secondary</cds-button
        >
        <cds-button slot="actions" kind=${BUTTON_KIND.SECONDARY}
          >Secondary</cds-button
        >
        <cds-button slot="actions" kind=${BUTTON_KIND.PRIMARY}
          >Primary</cds-button
        >`;
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

export const getCustomHeaderComponents = (index) => {
  switch (index) {
    case 1:
      return html` <style>
          ${styles}
        </style>
        <div slot="above-title" class="${storyPrefix}custom-header-content">
          <cds-breadcrumb aria-label="">
            <cds-breadcrumb-item>
              <cds-breadcrumb-link href="#">Breadcrumb 1</cds-breadcrumb-link>
            </cds-breadcrumb-item>
            <cds-breadcrumb-item>
              <cds-breadcrumb-link href="#">Breadcrumb 2</cds-breadcrumb-link>
            </cds-breadcrumb-item>
          </cds-breadcrumb>
        </div>`;
    case 2:
      return html` <style>
          ${styles}
        </style>
        <div slot="below-title" class="${storyPrefix}custom-header-content">
          <cds-inline-notification
            title="Notification title"
            subtitle="Subtitle text goes here"
            kind="error"
          >
          </cds-inline-notification>
        </div>`;
    case 3:
      return html` <style>
          ${styles}
        </style>
        <div slot="above-title" class="${storyPrefix}custom-header-content">
          <cds-breadcrumb aria-label="">
            <cds-breadcrumb-item>
              <cds-breadcrumb-link href="#">Breadcrumb 1</cds-breadcrumb-link>
            </cds-breadcrumb-item>
            <cds-breadcrumb-item>
              <cds-breadcrumb-link href="#">Breadcrumb 2</cds-breadcrumb-link>
            </cds-breadcrumb-item>
          </cds-breadcrumb>
        </div>

        <div slot="below-title" class="${storyPrefix}custom-header-content">
          <cds-inline-notification
            title="Notification title"
            subtitle="Subtitle text goes here"
            kind="error"
          >
          </cds-inline-notification>
        </div>`;
    default:
      return null;
  }
};
