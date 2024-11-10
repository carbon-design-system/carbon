/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import './index';
import styles from './grid-story.scss?lit';

const defaultArgs = {
  condensed: false,
  narrow: false,
  fullWidth: false,
};

const controls = {
  condensed: {
    control: 'boolean',
    description: `Collapse gutter to 1px.`,
  },
  narrow: {
    control: 'boolean',
    description: `Hangs 16px into gutter.`,
  },
  fullWidth: {
    control: 'boolean',
    description: 'Remove the default max width',
  },
};

export const Default = {
  args: defaultArgs,
  argTypes: controls,
  parameters: {
    percy: {
      skip: true,
    },
  },
  render: ({ condensed, narrow, fullWidth }) =>
    html`<cds-grid
        ?condensed=${condensed}
        ?narrow=${narrow}
        ?full-width=${fullWidth}>
        <cds-column sm="4" lg="10"></cds-column>
        <cds-column sm="1"></cds-column>
        <cds-column sm="1"></cds-column>
        <cds-column sm="1" md="2" lg="4"></cds-column>
      </cds-grid>
      <style>
        ${styles}
      </style>`,
};

export const Offset = {
  args: defaultArgs,
  argTypes: controls,
  parameters: {
    percy: {
      skip: true,
    },
  },
  render: ({ condensed, narrow, fullWidth }) =>
    html`<cds-grid
        ?condensed=${condensed}
        ?narrow=${narrow}
        ?full-width=${fullWidth}>
        <cds-column
          sm="span:1 start:4"
          md="span:2 start:7"
          lg="span:4 start:13"></cds-column>
        <cds-column
          sm="span:2 start:3"
          md="span:4 start:5"
          lg="span:8 start:9"></cds-column>
        <cds-column
          sm="span:3 start:2"
          md="span:6 start:3"
          lg="span:12 start:5"></cds-column>
        <cds-column sm="span:4" md="span:8" lg="span:16"></cds-column>
        <cds-column
          sm="span:25% start:2"
          md="span:50% start:3"
          lg="span:75% start:5"></cds-column>
      </cds-grid>
      <style>
        ${styles}
      </style>`,
};

export const SubGrid = {
  args: defaultArgs,
  argTypes: controls,
  parameters: {
    percy: {
      skip: true,
    },
  },
  render: ({ condensed, narrow, fullWidth }) =>
    html`<cds-grid
        ?condensed=${condensed}
        ?narrow=${narrow}
        ?full-width=${fullWidth}>
        <cds-column sm="2" md="4" lg="3">
          <p>Small: Span 2 of 4</p>
          <p>Medium: Span 4 of 8</p>
          <p>Large: Span 3 of 16</p>
        </cds-column>
        <cds-column sm="2" md="4" lg="10">
          <p>Small: Span 2 of 4</p>
          <p>Medium: Span 4 of 8</p>
          <p>Large: Span 10 of 16</p>
          <cds-sub-grid>
            <cds-column sm="1" md="1" lg="2">
              <p>sm="1"</p>
              <p>md="1"</p>
              <p>lg="2"</p>
            </cds-column>
            <cds-column sm="1" md="1" lg="2">
              <p>sm="1"</p>
              <p>md="1"</p>
              <p>lg="2"</p>
            </cds-column>
            <cds-column sm="0" md="1" lg="1">
              <p>sm="0"</p>
              <p>md="1"</p>
              <p>lg="1"</p>
            </cds-column>
            <cds-column sm="0" md="1" lg="1">
              <p>sm="0"</p>
              <p>md="1"</p>
              <p>lg="1"</p>
            </cds-column>
            <cds-column sm="0" md="0" lg="1">
              <p>sm="0"</p>
              <p>md="0"</p>
              <p>lg="1"</p>
            </cds-column>
            <cds-column sm="0" md="0" lg="1">
              <p>sm="0"</p>
              <p>md="0"</p>
              <p>lg="1"</p>
            </cds-column>
            <cds-column sm="0" md="0" lg="1">
              <p>sm="0"</p>
              <p>md="0"</p>
              <p>lg="1"</p>
            </cds-column>
            <cds-column sm="0" md="0" lg="1">
              <p>sm="0"</p>
              <p>md="0"</p>
              <p>lg="1"</p>
            </cds-column>
          </cds-sub-grid>
        </cds-column>
        <cds-column sm="0" md="0" lg="3">
          <p>Small: Span 0 of 4</p>
          <p>Medium: Span 0 of 8</p>
          <p>Large: Span 3 of 16</p>
        </cds-column>
      </cds-grid>
      <style>
        ${styles}
      </style>`,
};

const meta = {
  title: 'Components/Grid',
  decorators: [
    (story, { name }) => {
      const width = !name.toLowerCase().includes('layer') ? `width:300px` : ``;
      return html` <div class="sb-css-grid-container">${story()}</div> `;
    },
  ],
};

export default meta;

// <cds-column sm={{ span: 1, offset: 3 }} md={{ span: 2, offset: 6 }} lg={{ span: 4, offset: 12 }} />
// <cds-column sm={{ span: 2, offset: 2}} md={{ span: 4, offset: 4 }} lg={{ span: 8, offset: 8 }} />
// <cds-column sm={{ span: 3, offset: 1 }} md={{ span: 6, offset: 2 }} lg={{ span: 12, offset: 4 }} />
// <cds-column sm={{ span: 4 }} md={{ span: 8 }} lg={{ span: 16 }} />
// <cds-column sm={{ span: '25%', offset: 1 }} md={{ span: '50%', offset: 2 }} lg={{ span: '75%', offset: 4}} />
