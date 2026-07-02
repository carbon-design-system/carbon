export const FlexGridScss = `
@use '@carbon/styles/scss/colors' as *;

// base of project work area
#root > #templates > div:first-child {
  inline-size: 100%;
}

// grid styles
.cds--grid .outside {
  block-size: 100%;
  min-block-size: 80px;
}

.cds--grid .inside {
  block-size: 100%;
  min-block-size: 80px;
}

// hack to enable zoom feature to trigger
.cds--grid--full-width {
  max-inline-size: 100%;
}

.default .cds--col code {
  display: flex;
  justify-content: center;
}

// template hard-coded styles
#templates .inside {
  background-color: $blue-10;
}

#templates .cds--grid [class*='col'] {
  background-color: $blue-20;
  outline: 1px dashed $blue-40;
}

#templates .cds--grid--condensed,
#templates .cds--row--condensed {
  background-color: $warm-gray-100;
  color: $gray-10;
}

#templates .cds--grid--condensed [class*='col'],
#templates .cds--row--condensed [class*='col'] {
  background: none;
  outline: none;
}

#templates .cds--grid--condensed .outside,
#templates .cds--row--condensed .outside {
  background-color: $gray-80;
  outline: none;
}

#templates .cds--grid--condensed .inside,
#templates .cds--row--condensed .inside {
  background: none;
}

#templates .cds--grid--narrow .inside,
#templates .cds--row--narrow .inside {
  background-color: $teal-10;
}

#templates .cds--grid--narrow [class*='col'],
#templates .cds--row--narrow [class*='col'] {
  background-color: $teal-20;
  outline: 1px dashed $teal-40;
}

// css grid
#templates > .cds--css-grid {
  border: 1px dashed black;
}

#templates .cds--css-grid .cds--subgrid [class*='col'] {
  background-color: rgba(#ffe056, 0.25);
  outline: 1px solid #ffe056;
}

#templates .cds--css-grid [class*='col'] {
  background-color: #edf4ff;
  min-block-size: 80px;
  outline: 1px solid #a6c8ff;
}
`;

export const GridScss = `
@use '@carbon/styles/scss/colors' as *;
@use '@carbon/styles/scss/type' as *;

.sb-css-grid-container {
  // Gutter modes
  .cds--css-grid {
    background-color: $blue-20;
    outline: 1px dashed $blue-40;
  }

  .cds--css-grid p {
    @include type-style('code-02');
  }

  .cds--css-grid p:first-of-type {
    margin-block-start: 0;
  }

  // Narrow
  .cds--css-grid.cds--css-grid--narrow {
    background-color: #d6f9f9;
    outline: 1px dashed $green-40;
  }

  // Condensed
  .cds--css-grid.cds--css-grid--condensed {
    background-color: $purple-10;
    outline: 1px dashed $purple-40;
  }

  .cds--subgrid {
    position: relative;
    background: #eef4ff;
    outline: 1px solid black;
    padding-block: 2rem;
  }

  .cds--css-grid,
  .cds--subgrid--wide {
    --grid-mode-color: #97c1ff;
  }

  .cds--css-grid--narrow,
  .cds--subgrid--narrow {
    --grid-mode-color: #20d5d2;

    background: $green-10;
  }

  .cds--css-grid--condensed,
  .cds--subgrid--condensed {
    --grid-mode-color: #bb8eff;

    background: $purple-10;
  }

  .cds--subgrid--narrow {
    background: #d6f9f9;
  }

  .cds--subgrid--condensed {
    background: #f7f2ff;
  }

  .cds--subgrid::before {
    @include type-style('code-01');

    position: absolute;
    display: block;
    padding: 0.125rem 0.25rem;
    background: var(--grid-mode-color, #97c1ff);
    color: $black;
    content: 'subgrid';
    inset-block-start: 0;
    inset-inline-start: 0;
  }

  // Column
  .cds--css-grid-column {
    --border-color: #97c1ff;

    background: $white;
    box-shadow: 0 0 0 1px var(--border-color);

    min-block-size: 80px;
  }

  .cds--css-grid--narrow .cds--css-grid-column,
  .cds--subgrid--narrow .cds--css-grid-column {
    --border-color: #20d5d2;
  }

  .cds--css-grid--condensed .cds--css-grid-column,
  .cds--subgrid--condensed .cds--css-grid-column {
    --border-color: #bb8eff;
  }
}
`;

export const LayerScss = `
@use '@carbon/styles/scss/theme';

.example-layer-test-component {
  padding: 1rem;
  background: theme.$layer;
  color: theme.$text-primary;
}

.example-layer-test-component-no-background {
  padding: 1rem;
  color: theme.$text-primary;
}
`;

export const ThemeScss = `
@use '@carbon/styles/scss/themes';
@use '@carbon/styles/scss/theme';

.theme-section {
  padding: 1rem;
  background: theme.$background;
  color: theme.$text-primary;
}

.theme-layer-example {
  padding: 1rem;
  background: theme.$background;
  color: theme.$text-primary;
}

.theme-layer-header {
  margin-block-end: 1rem;
}

.theme-with-layer {
  padding: 1rem;
  background: theme.$layer;
  color: theme.$text-primary;
}

.carbon-storybook-template--annotation--background {
  margin: 0 !important; /* stylelint-disable-line declaration-no-important */
  min-block-size: 0 !important; /* stylelint-disable-line declaration-no-important */
}
`;
