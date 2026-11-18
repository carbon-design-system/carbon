/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  componentWrapperDecorator,
  moduleMetadata,
  type Decorator,
  type Meta,
  type StoryObj,
  type ArgTypes,
} from '@storybook/angular';
import {
  ColumnComponent,
  ColumnHangComponent,
  GridComponent,
} from '@carbon/angular/grid';

// ─── WC-parity stories (one-for-one with @carbon/web-components Grid) ─────────

const defaultArgs = {
  align: 'center',
  condensed: false,
  fullWidth: false,
  narrow: false,
  withRowGap: false,
};

const sharedArgTypes: ArgTypes = {
  align: {
    control: 'radio',
    description: 'Specify grid alignment. Default is center',
    options: ['start', 'center', 'end'],
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
  withRowGap: {
    control: 'boolean',
    description:
      'Add a row gap to the grid that matches the current gutter size',
  },
};

// Port of `grid-story.scss` from `@carbon/web-components`. The grid draws
// itself inside shadow DOM and exposes it through `part="grid"`, so the story
// styles have to be global (Angular's emulated encapsulation cannot reach
// `::part()` reliably). The `:root` grid custom properties already ship with
// `@carbon/styles`.
const gridStoryStyles = `
  .sb-css-grid-container .sb-grid::part(grid) {
    background-color: #d0e2ff;
    outline: 1px dashed #78a9ff;
  }

  .sb-css-grid-container .sb-grid[narrow]::part(grid) {
    background-color: #d6f9f9;
    outline: 1px dashed #42be65;
  }

  .sb-css-grid-container .sb-grid[condensed]::part(grid) {
    background-color: #f6f2ff;
    outline: 1px dashed #be95ff;
  }

  .sb-css-grid-container .sb-sub-grid::part(grid) {
    position: relative;
    background: #eef4ff;
    outline: 1px solid black;
    padding-block: 2rem;
  }

  .sb-css-grid-container .sb-sub-grid::part(grid),
  .sb-css-grid-container .sb-sub-grid:not([condensed], [narrow])::part(grid) {
    --grid-mode-color: #97c1ff;
  }

  .sb-css-grid-container .sb-sub-grid[narrow]::part(grid) {
    --grid-mode-color: #20d5d2;

    background: #d6f9f9;
  }

  .sb-css-grid-container .sb-grid[condensed]::part(grid),
  .sb-css-grid-container .sb-sub-grid[condensed]::part(grid) {
    --grid-mode-color: #bb8eff;

    background: #f6f2ff;
  }

  .sb-css-grid-container .sb-sub-grid[condensed]::part(grid) {
    background: #f7f2ff;
  }

  .sb-css-grid-container .sb-sub-grid::part(grid)::before {
    font-family: var(--cds-code-01-font-family, 'IBM Plex Mono', monospace);
    font-size: var(--cds-code-01-font-size, 0.75rem);
    font-weight: var(--cds-code-01-font-weight, 400);
    line-height: var(--cds-code-01-line-height, 1.33333);
    letter-spacing: var(--cds-code-01-letter-spacing, 0.32px);
    position: absolute;
    display: block;
    padding: 0.125rem 0.25rem;
    background: var(--grid-mode-color, #97c1ff);
    color: #000000;
    content: 'subgrid';
    inset-block-start: 0;
    inset-inline-start: 0;
  }

  .sb-css-grid-container .sb-column {
    --border-color: #97c1ff;

    background: #ffffff;
    box-shadow: 0 0 0 1px var(--border-color);
    color: #161616;

    min-block-size: 80px;
  }

  .sb-css-grid-container .sb-sub-grid[narrow]::part(grid) .sb-column,
  .sb-css-grid-container .sb-grid[narrow]::part(grid) .sb-column {
    --border-color: #20d5d2;
  }

  .sb-css-grid-container .sb-sub-grid[condensed]::part(grid) .sb-column,
  .sb-css-grid-container .sb-grid[condensed]::part(grid) .sb-column {
    --border-color: #bb8eff;
  }

  .cds--grid-part .sb-column .sb-grid::part(grid) {
    box-shadow: 0 0 5px black;
  }
`;

const STYLE_ELEMENT_ID = 'sb-grid-story-styles';

// Adds the story styles to the document once. The WC story renders them in a
// `<style>` next to the grid.
const withGridStyles: Decorator = (storyFn) => {
  if (!document.getElementById(STYLE_ELEMENT_ID)) {
    const style = document.createElement('style');
    style.id = STYLE_ELEMENT_ID;
    style.textContent = gridStoryStyles;
    document.head.appendChild(style);
  }
  return storyFn();
};

// Opening tag shared by the root grid of every WC story.
const gridBindings = `
  [align]="align"
  class="sb-grid"
  [condensed]="condensed"
  [fullWidth]="fullWidth"
  [narrow]="narrow"
  [withRowGap]="withRowGap"
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const meta: Meta<any> = {
  title: 'Elements/Grid',
  args: defaultArgs,
  argTypes: sharedArgTypes,
  decorators: [
    moduleMetadata({
      imports: [GridComponent, ColumnComponent, ColumnHangComponent],
    }),
    withGridStyles,
    componentWrapperDecorator(
      (story) => `<div class="sb-css-grid-container">${story}</div>`
    ),
  ],
};

export default meta;
type Story = StoryObj<Record<string, unknown>>;

// WC: Default
export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <cds-ng-grid ${gridBindings}>
        <cds-ng-column class="sb-column" sm="4"></cds-ng-column>
        <cds-ng-column class="sb-column" sm="4"></cds-ng-column>
        <cds-ng-column class="sb-column" sm="4"></cds-ng-column>
        <cds-ng-column class="sb-column" sm="4"></cds-ng-column>
      </cds-ng-grid>
    `,
  }),
};

// WC: Condensed
export const Condensed: Story = {
  args: {
    condensed: true,
  },
  argTypes: {
    condensed: {
      ...sharedArgTypes['condensed'],
      table: {
        readonly: true,
      },
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <cds-ng-grid ${gridBindings}>
        <cds-ng-column class="sb-column" sm="4"></cds-ng-column>
        <cds-ng-column class="sb-column" sm="4"></cds-ng-column>
        <cds-ng-column class="sb-column" sm="4"></cds-ng-column>
        <cds-ng-column class="sb-column" sm="4"></cds-ng-column>
      </cds-ng-grid>
    `,
  }),
};

// WC: FullWidth
export const FullWidth: Story = {
  args: {
    fullWidth: true,
  },
  argTypes: {
    fullWidth: {
      ...sharedArgTypes['fullWidth'],
      table: {
        readonly: true,
      },
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <cds-ng-grid ${gridBindings}>
        <cds-ng-column class="sb-column" sm="4"></cds-ng-column>
        <cds-ng-column class="sb-column" sm="4"></cds-ng-column>
        <cds-ng-column class="sb-column" sm="4"></cds-ng-column>
        <cds-ng-column class="sb-column" sm="4"></cds-ng-column>
      </cds-ng-grid>
    `,
  }),
};

// WC: WithRowGap
export const WithRowGap: Story = {
  args: {
    withRowGap: true,
  },
  argTypes: {
    withRowGap: {
      ...sharedArgTypes['withRowGap'],
      table: {
        readonly: true,
      },
    },
  },
  parameters: {
    percy: {
      skip: true,
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <cds-ng-grid ${gridBindings}>
        <cds-ng-column class="sb-column" sm="4"></cds-ng-column>
        <cds-ng-column class="sb-column" sm="4"></cds-ng-column>
        <cds-ng-column class="sb-column" sm="4"></cds-ng-column>
        <cds-ng-column class="sb-column" sm="4"></cds-ng-column>
        <cds-ng-column class="sb-column" sm="4"></cds-ng-column>
        <cds-ng-column class="sb-column" sm="4"></cds-ng-column>
        <cds-ng-column class="sb-column" sm="4"></cds-ng-column>
        <cds-ng-column class="sb-column" sm="4"></cds-ng-column>
      </cds-ng-grid>
    `,
  }),
};

// WC: MixedGutterModes
export const MixedGutterModes: Story = {
  render: (args) => ({
    props: args,
    template: `
      <cds-ng-grid ${gridBindings}>
        <cds-ng-column class="sb-column" span="8">
          <cds-ng-grid class="sb-sub-grid">
            <cds-ng-column class="sb-column" span="8">
              <cds-ng-grid class="sb-sub-grid" [narrow]="true">
                <cds-ng-column class="sb-column">
                  <cds-ng-column-hang>Text</cds-ng-column-hang>
                </cds-ng-column>
                <cds-ng-column class="sb-column">
                  <cds-ng-column-hang>Text</cds-ng-column-hang>
                </cds-ng-column>
                <cds-ng-column class="sb-column">
                  <cds-ng-column-hang>Text</cds-ng-column-hang>
                </cds-ng-column>
                <cds-ng-column class="sb-column">
                  <cds-ng-column-hang>Text</cds-ng-column-hang>
                </cds-ng-column>
                <cds-ng-column class="sb-column" span="4">
                  <cds-ng-grid class="sb-sub-grid">
                    <cds-ng-column class="sb-column">Text</cds-ng-column>
                    <cds-ng-column class="sb-column">Text</cds-ng-column>
                    <cds-ng-column class="sb-column" span="2">
                      <cds-ng-grid class="sb-sub-grid" [condensed]="true">
                        <cds-ng-column class="sb-column">
                          <cds-ng-column-hang>Text</cds-ng-column-hang>
                        </cds-ng-column>
                        <cds-ng-column class="sb-column">
                          <cds-ng-column-hang>Text</cds-ng-column-hang>
                        </cds-ng-column>
                      </cds-ng-grid>
                    </cds-ng-column>
                  </cds-ng-grid>
                </cds-ng-column>
              </cds-ng-grid>
            </cds-ng-column>
          </cds-ng-grid>
        </cds-ng-column>
      </cds-ng-grid>
      <cds-ng-grid
        [align]="align"
        class="sb-grid"
        [condensed]="condensed"
        [fullWidth]="fullWidth"
        [narrow]="true"
        [withRowGap]="withRowGap">
        <cds-ng-column class="sb-column" span="8">
          <cds-ng-grid class="sb-sub-grid">
            <cds-ng-column class="sb-column" span="4"></cds-ng-column>
            <cds-ng-column class="sb-column" span="4">
              <cds-ng-grid class="sb-sub-grid" [narrow]="true">
                <cds-ng-column class="sb-column">
                  <cds-ng-column-hang>Text</cds-ng-column-hang>
                </cds-ng-column>
                <cds-ng-column class="sb-column">
                  <cds-ng-column-hang>Text</cds-ng-column-hang>
                </cds-ng-column>
                <cds-ng-column class="sb-column">
                  <cds-ng-column-hang>Text</cds-ng-column-hang>
                </cds-ng-column>
                <cds-ng-column class="sb-column">
                  <cds-ng-column-hang>Text</cds-ng-column-hang>
                </cds-ng-column>
              </cds-ng-grid>
            </cds-ng-column>
          </cds-ng-grid>
        </cds-ng-column>
      </cds-ng-grid>
    `,
  }),
};

// WC: Narrow
export const Narrow: Story = {
  args: {
    narrow: true,
  },
  argTypes: {
    narrow: {
      ...sharedArgTypes['narrow'],
      table: {
        readonly: true,
      },
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <cds-ng-grid ${gridBindings}>
        <cds-ng-column class="sb-column" sm="4"></cds-ng-column>
        <cds-ng-column class="sb-column" sm="4"></cds-ng-column>
        <cds-ng-column class="sb-column" sm="4"></cds-ng-column>
        <cds-ng-column class="sb-column" sm="4"></cds-ng-column>
      </cds-ng-grid>
    `,
  }),
};

// WC: GridStartEnd
export const GridStartEnd: Story = {
  render: (args) => ({
    props: args,
    template: `
      <cds-ng-grid ${gridBindings}>
        <cds-ng-column
          class="sb-column"
          sm="span:1 start:4"
          md="span:2 start:7"
          lg="span:4 start:13"
          >span, start</cds-ng-column
        >
        <cds-ng-column
          class="sb-column"
          sm="span:2 end:5"
          md="span:4 end:9"
          lg="span:8 end:17"
          >span, end</cds-ng-column
        >
        <cds-ng-column
          class="sb-column"
          sm="start:1 end:4"
          md="start:3 end:9"
          lg="start:5 end:17"
          >start, end</cds-ng-column
        >
      </cds-ng-grid>
    `,
  }),
};

// WC: Offset
export const Offset: Story = {
  render: (args) => ({
    props: args,
    template: `
      <cds-ng-grid ${gridBindings}>
        <cds-ng-column
          class="sb-column"
          sm="span:0"
          md="span:2 start:7"
          lg="span:4 start:13"></cds-ng-column>
        <cds-ng-column
          class="sb-column"
          sm="span:2 start:3"
          md="span:4 start:5"
          lg="span:8 start:9"></cds-ng-column>
        <cds-ng-column
          class="sb-column"
          sm="span:3 start:2"
          md="span:6 start:3"
          lg="span:12 start:5"></cds-ng-column>
        <cds-ng-column
          class="sb-column"
          sm="span:4"
          md="span:8"
          lg="span:16"></cds-ng-column>
        <cds-ng-column
          class="sb-column"
          sm="span:25% start:2"
          md="span:50% start:3"
          lg="span:75% start:5"></cds-ng-column>
      </cds-ng-grid>
    `,
  }),
};

// WC: Responsive
export const Responsive: Story = {
  render: (args) => ({
    props: args,
    template: `
      <cds-ng-grid ${gridBindings}>
        <cds-ng-column class="sb-column" sm="2" md="4" lg="6">
          <p>Small: Span 2 of 4</p>
          <p>Medium: Span 4 of 8</p>
          <p>Large: Span 6 of 16</p>
        </cds-ng-column>
        <cds-ng-column class="sb-column" sm="2" md="2" lg="3">
          <p>Small: Span 2 of 4</p>
          <p>Medium: Span 2 of 8</p>
          <p>Large: Span 3 of 16</p>
        </cds-ng-column>
        <cds-ng-column class="sb-column" sm="0" md="2" lg="3">
          <p>Small: Span 0 of 4</p>
          <p>Medium: Span 2 of 8</p>
          <p>Large: Span 3 of 16</p>
        </cds-ng-column>
        <cds-ng-column class="sb-column" sm="0" md="0" lg="4">
          <p>Small: Span 0 of 4</p>
          <p>Medium: Span 0 of 8</p>
          <p>Large: Span 4 of 16</p>
        </cds-ng-column>
        <cds-ng-column class="sb-column" sm="25%" md="50%" lg="75%">
          <p>Small: Span 25%</p>
          <p>Medium: Span 50%</p>
          <p>Large: Span 75%</p>
        </cds-ng-column>
      </cds-ng-grid>
    `,
  }),
};

// WC: Subgrid
export const Subgrid: Story = {
  render: (args) => ({
    props: args,
    template: `
      <cds-ng-grid ${gridBindings}>
        <cds-ng-column class="sb-column" sm="2" md="4" lg="3">
          <p>Small: Span 2 of 4</p>
          <p>Medium: Span 4 of 8</p>
          <p>Large: Span 3 of 16</p>
        </cds-ng-column>
        <cds-ng-column class="sb-column" sm="2" md="4" lg="10">
          <p>Small: Span 2 of 4</p>
          <p>Medium: Span 4 of 8</p>
          <p>Large: Span 10 of 16</p>
          <cds-ng-grid class="sb-sub-grid">
            <cds-ng-column class="sb-column" sm="1" md="1" lg="2">
              <p>sm=1</p>
              <p>md=1</p>
              <p>lg=2</p>
            </cds-ng-column>
            <cds-ng-column class="sb-column" sm="1" md="1" lg="2">
              <p>sm=1</p>
              <p>md=1</p>
              <p>lg=2</p>
            </cds-ng-column>
            <cds-ng-column class="sb-column" sm="0" md="1" lg="1">
              <p>sm=0</p>
              <p>md=1</p>
              <p>lg=1</p>
            </cds-ng-column>
            <cds-ng-column class="sb-column" sm="0" md="1" lg="1">
              <p>sm=0</p>
              <p>md=1</p>
              <p>lg=1</p>
            </cds-ng-column>
            <cds-ng-column class="sb-column" sm="0" md="0" lg="1">
              <p>sm=0</p>
              <p>md=0</p>
              <p>lg=1</p>
            </cds-ng-column>
            <cds-ng-column class="sb-column" sm="0" md="0" lg="1">
              <p>sm=0</p>
              <p>md=0</p>
              <p>lg=1</p>
            </cds-ng-column>
            <cds-ng-column class="sb-column" sm="0" md="0" lg="1">
              <p>sm=0</p>
              <p>md=0</p>
              <p>lg=1</p>
            </cds-ng-column>
            <cds-ng-column class="sb-column" sm="0" md="0" lg="1">
              <p>sm=0</p>
              <p>md=0</p>
              <p>lg=1</p>
            </cds-ng-column>
          </cds-ng-grid>
        </cds-ng-column>
        <cds-ng-column class="sb-column" sm="0" md="0" lg="3">
          <p>Small: Span 0 of 4</p>
          <p>Medium: Span 0 of 8</p>
          <p>Large: Span 3 of 16</p>
        </cds-ng-column>
      </cds-ng-grid>
    `,
  }),
};

// WC: SubgridWithRowGap
export const SubgridWithRowGap: Story = {
  args: {
    withRowGap: true,
  },
  argTypes: {
    withRowGap: {
      ...sharedArgTypes['withRowGap'],
      table: {
        readonly: true,
      },
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <cds-ng-grid ${gridBindings}>
        <cds-ng-column class="sb-column" sm="2" md="4" lg="16">
          <cds-ng-grid class="sb-sub-grid" [withRowGap]="true">
            <!-- Nested subgrid with row gap  -->
            <cds-ng-column class="sb-column" sm="4" md="4" lg="8"></cds-ng-column>
            <cds-ng-column class="sb-column" sm="4" md="4" lg="8"></cds-ng-column>
            <cds-ng-column class="sb-column" sm="4" md="4" lg="8"></cds-ng-column>
            <cds-ng-column class="sb-column" sm="4" md="4" lg="8"></cds-ng-column>
          </cds-ng-grid>
        </cds-ng-column>
        <cds-ng-column class="sb-column" sm="2" md="4" lg="16">
          <cds-ng-grid class="sb-sub-grid" [withRowGap]="true" [narrow]="true">
            <!-- Nested subgrid with row gap  -->
            <cds-ng-column class="sb-column" sm="4" md="4" lg="8"></cds-ng-column>
            <cds-ng-column class="sb-column" sm="4" md="4" lg="8"></cds-ng-column>
            <cds-ng-column class="sb-column" sm="4" md="4" lg="8"></cds-ng-column>
            <cds-ng-column class="sb-column" sm="4" md="4" lg="8"></cds-ng-column>
          </cds-ng-grid>
        </cds-ng-column>
        <cds-ng-column class="sb-column" sm="2" md="4" lg="16">
          <cds-ng-grid class="sb-sub-grid" [withRowGap]="true" [condensed]="true">
            <!-- Nested subgrid with row gap  -->
            <cds-ng-column class="sb-column" sm="4" md="4" lg="8"></cds-ng-column>
            <cds-ng-column class="sb-column" sm="4" md="4" lg="8"></cds-ng-column>
            <cds-ng-column class="sb-column" sm="4" md="4" lg="8"></cds-ng-column>
            <cds-ng-column class="sb-column" sm="4" md="4" lg="8"></cds-ng-column>
          </cds-ng-grid>
        </cds-ng-column>
      </cds-ng-grid>
    `,
  }),
};
