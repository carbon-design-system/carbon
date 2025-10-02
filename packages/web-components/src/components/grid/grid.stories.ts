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

const alignments = {
  [`Start`]: 'start',
  [`Center`]: 'center',
  [`End`]: 'end',
};

const defaultArgs = {
  align: 'center',
  condensed: false,
  narrow: false,
  fullWidth: false,
};

const controls = {
  align: {
    control: 'radio',
    description: 'Specify grid alignment. Default is center',
    options: alignments,
  },
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
  render: ({ align, condensed, narrow, fullWidth }) =>
    html`<cds-grid
        align=${align}
        class="sb-grid"
        ?condensed=${condensed}
        ?narrow=${narrow}
        ?full-width=${fullWidth}>
        <cds-column class="sb-column" sm="4"></cds-column>
        <cds-column class="sb-column" sm="4"></cds-column>
        <cds-column class="sb-column" sm="4"></cds-column>
        <cds-column class="sb-column" sm="4"></cds-column>
      </cds-grid>
      <style>
        ${styles}
      </style>`,
};

export const Condensed = {
  parameters: {
    percy: {
      skip: true,
    },
  },
  render: () =>
    html`<cds-grid class="sb-grid" condensed>
        <cds-column class="sb-column" sm="4"></cds-column>
        <cds-column class="sb-column" sm="4"></cds-column>
        <cds-column class="sb-column" sm="4"></cds-column>
        <cds-column class="sb-column" sm="4"></cds-column>
      </cds-grid>
      <style>
        ${styles}
      </style>`,
};

export const FullWidth = {
  parameters: {
    percy: {
      skip: true,
    },
  },
  render: () =>
    html`<cds-grid class="sb-grid" full-width>
        <cds-column class="sb-column" sm="4"></cds-column>
        <cds-column class="sb-column" sm="4"></cds-column>
        <cds-column class="sb-column" sm="4"></cds-column>
        <cds-column class="sb-column" sm="4"></cds-column>
      </cds-grid>
      <style>
        ${styles}
      </style>`,
};

export const MixedGutterModes = {
  parameters: {
    percy: {
      skip: true,
    },
  },
  render: () =>
    html`<cds-grid class="sb-grid">
        <cds-column class="sb-column" span="8">
          <cds-grid class="sb-sub-grid">
            <cds-column class="sb-column" span="8">
              <cds-grid class="sb-sub-grid" narrow>
                <cds-column class="sb-column">
                  <cds-column-hang>Text</cds-column-hang>
                </cds-column>
                <cds-column class="sb-column">
                  <cds-column-hang>Text</cds-column-hang>
                </cds-column>
                <cds-column class="sb-column">
                  <cds-column-hang>Text</cds-column-hang>
                </cds-column>
                <cds-column class="sb-column">
                  <cds-column-hang>Text</cds-column-hang>
                </cds-column>
                <cds-column class="sb-column" span="4">
                  <cds-grid class="sb-sub-grid">
                    <cds-column class="sb-column">Text</cds-column>
                    <cds-column class="sb-column">Text</cds-column>
                    <cds-column class="sb-column" span="2">
                      <cds-grid class="sb-sub-grid" condensed>
                        <cds-column class="sb-column">
                          <cds-column-hang>Text</cds-column-hang>
                        </cds-column>
                        <cds-column class="sb-column">
                          <cds-column-hang>Text</cds-column-hang>
                        </cds-column>
                      </cds-grid>
                    </cds-column>
                  </cds-grid>
                </cds-column>
              </cds-grid>
            </cds-column>
          </cds-grid>
        </cds-column>
      </cds-grid>
      <cds-grid class="sb-grid" narrow>
        <cds-column class="sb-column" span="8">
          <cds-grid class="sb-sub-grid">
            <cds-column class="sb-column" span="4"></cds-column>
            <cds-column class="sb-column" span="4">
              <cds-grid class="sb-sub-grid" narrow>
                <cds-column class="sb-column">
                  <cds-column-hang>Text</cds-column-hang>
                </cds-column>
                <cds-column class="sb-column">
                  <cds-column-hang>Text</cds-column-hang>
                </cds-column>
                <cds-column class="sb-column">
                  <cds-column-hang>Text</cds-column-hang>
                </cds-column>
                <cds-column class="sb-column">
                  <cds-column-hang>Text</cds-column-hang>
                </cds-column>
              </cds-grid>
            </cds-column>
          </cds-grid>
        </cds-column>
      </cds-grid>
      <style>
        ${styles}
      </style>`,
};

export const Narrow = {
  parameters: {
    percy: {
      skip: true,
    },
  },
  render: () =>
    html`<cds-grid class="sb-grid" narrow>
        <cds-column class="sb-column" sm="4"></cds-column>
        <cds-column class="sb-column" sm="4"></cds-column>
        <cds-column class="sb-column" sm="4"></cds-column>
        <cds-column class="sb-column" sm="4"></cds-column>
      </cds-grid>
      <style>
        ${styles}
      </style>`,
};

export const GridStartEnd = {
  parameters: {
    percy: {
      skip: true,
    },
  },
  render: () =>
    html`<cds-grid class="sb-grid">
        <cds-column
          class="sb-column"
          sm="span:1 start:4"
          md="span:2 start:7"
          lg="span:4 start:13"
          >span, start</cds-column
        >
        <cds-column
          class="sb-column"
          sm="span:2 end:5"
          md="span:4 end:9"
          lg="span:8 end:17"
          >span, end</cds-column
        >
        <cds-column
          class="sb-column"
          sm="start:1 end:4"
          md="start:3 end:9"
          lg="start:5 end:17"
          >start, end</cds-column
        >
      </cds-grid>
      <style>
        ${styles}
      </style>`,
};

export const Offset = {
  parameters: {
    percy: {
      skip: true,
    },
  },
  render: () =>
    html`<cds-grid class="sb-grid">
        <cds-column
          class="sb-column"
          sm="span:0"
          md="span:2 start:7"
          lg="span:4 start:13"></cds-column>
        <cds-column
          class="sb-column"
          sm="span:2 start:3"
          md="span:4 start:5"
          lg="span:8 start:9"></cds-column>
        <cds-column
          class="sb-column"
          sm="span:3 start:2"
          md="span:6 start:3"
          lg="span:12 start:5"></cds-column>
        <cds-column
          class="sb-column"
          sm="span:4"
          md="span:8"
          lg="span:16"></cds-column>
        <cds-column
          class="sb-column"
          sm="span:25% start:2"
          md="span:50% start:3"
          lg="span:75% start:5"></cds-column>
      </cds-grid>
      <style>
        ${styles}
      </style>`,
};

export const Responsive = {
  parameters: {
    percy: {
      skip: true,
    },
  },
  render: () =>
    html`<cds-grid class="sb-grid">
        <cds-column class="sb-column" sm="2" md="4" lg="6">
          <p>Small: Span 2 of 4</p>
          <p>Medium: Span 4 of 8</p>
          <p>Large: Span 6 of 16</p>
        </cds-column>
        <cds-column class="sb-column" sm="2" md="2" lg="3">
          <p>Small: Span 2 of 4</p>
          <p>Medium: Span 2 of 8</p>
          <p>Large: Span 3 of 16</p>
        </cds-column>
        <cds-column class="sb-column" sm="0" md="2" lg="3">
          <p>Small: Span 0 of 4</p>
          <p>Medium: Span 2 of 8</p>
          <p>Large: Span 3 of 16</p>
        </cds-column>
        <cds-column class="sb-column" sm="0" md="0" lg="4">
          <p>Small: Span 0 of 4</p>
          <p>Medium: Span 0 of 8</p>
          <p>Large: Span 4 of 16</p>
        </cds-column>
        <cds-column class="sb-column" sm="25%" md="50%" lg="75%">
          <p>Small: Span 25%</p>
          <p>Medium: Span 50%</p>
          <p>Large: Span 75%</p>
        </cds-column>
      </cds-grid>
      <style>
        ${styles}
      </style>`,
};

export const Subgrid = {
  args: defaultArgs,
  render: ({ condensed, narrow, fullWidth }) =>
    html`<cds-grid
        class="sb-grid"
        ?condensed=${condensed}
        ?narrow=${narrow}
        ?full-width=${fullWidth}>
        <cds-column class="sb-column" sm="2" md="4" lg="3">
          <p>Small: Span 2 of 4</p>
          <p>Medium: Span 4 of 8</p>
          <p>Large: Span 3 of 16</p>
        </cds-column>
        <cds-column class="sb-column" sm="2" md="4" lg="10">
          <p>Small: Span 2 of 4</p>
          <p>Medium: Span 4 of 8</p>
          <p>Large: Span 10 of 16</p>
          <cds-grid class="sb-sub-grid">
            <cds-column class="sb-column" sm="1" md="1" lg="2">
              <p>sm=1</p>
              <p>md=1</p>
              <p>lg=2</p>
            </cds-column>
            <cds-column class="sb-column" sm="1" md="1" lg="2">
              <p>sm=1</p>
              <p>md=1</p>
              <p>lg=2</p>
            </cds-column>
            <cds-column class="sb-column" sm="0" md="1" lg="1">
              <p>sm=0</p>
              <p>md=1</p>
              <p>lg=1</p>
            </cds-column>
            <cds-column class="sb-column" sm="0" md="1" lg="1">
              <p>sm=0</p>
              <p>md=1</p>
              <p>lg=1</p>
            </cds-column>
            <cds-column class="sb-column" sm="0" md="0" lg="1">
              <p>sm=0</p>
              <p>md=0</p>
              <p>lg=1</p>
            </cds-column>
            <cds-column class="sb-column" sm="0" md="0" lg="1">
              <p>sm=0</p>
              <p>md=0</p>
              <p>lg=1</p>
            </cds-column>
            <cds-column class="sb-column" sm="0" md="0" lg="1">
              <p>sm=0</p>
              <p>md=0</p>
              <p>lg=1</p>
            </cds-column>
            <cds-column class="sb-column" sm="0" md="0" lg="1">
              <p>sm=0</p>
              <p>md=0</p>
              <p>lg=1</p>
            </cds-column>
          </cds-grid>
        </cds-column>
        <cds-column class="sb-column" sm="0" md="0" lg="3">
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
  title: 'Elements/Grid',
  decorators: [
    (story, { name }) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars -- https://github.com/carbon-design-system/carbon/issues/20452
      const width = !name.toLowerCase().includes('layer') ? `width:300px` : ``;
      return html` <div class="sb-css-grid-container">${story()}</div> `;
    },
  ],
};

export default meta;
