/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  moduleMetadata,
  type Meta,
  type StoryObj,
  type ArgTypes,
} from '@storybook/angular';
import {
  SearchComponent,
  SearchSkeletonComponent,
} from '@carbon/angular/search';
import { LayerComponent } from '@carbon/angular/layer';

const sizes = ['xs', 'sm', 'md', 'lg'];

const args = {
  autoComplete: 'off',
  autofocus: false,
  closeButtonLabelText: 'Clear search input',
  defaultWidth: 800,
  disabled: false,
  labelText: 'Search',
  placeholder: 'Placeholder text',
  role: 'searchbox',
  size: 'md',
  type: 'text',
  value: '',
};

const argTypes: ArgTypes = {
  autoComplete: {
    control: 'text',
    description:
      'Specify an optional value for the <code>autocomplete</code> property on the underlying <code>&lt;input&gt;</code>, defaults to "off".',
  },
  autofocus: {
    control: 'boolean',
    description:
      'Sets the input to be focussed automatically on page load. Defaults to false',
  },
  closeButtonLabelText: {
    control: 'text',
    description:
      'Specify a label to be read by screen readers on the "close" button.',
  },
  defaultWidth: {
    control: { type: 'range', min: 300, max: 800, step: 50 },
  },
  disabled: {
    control: 'boolean',
    description:
      'Specify whether the <code>&lt;input&gt;</code> should be disabled.',
  },
  expanded: {
    control: 'boolean',
    description: 'Specify whether the Expandable Search should be expanded',
  },
  labelText: {
    control: 'text',
    description: 'Provide the label text for the Search icon.',
  },
  placeholder: {
    control: 'text',
    description:
      'Provide an optional placeholder text for the Search. Note: if the label and placeholder differ, VoiceOver on Mac will read both.',
  },
  role: {
    control: 'text',
    description:
      'Specify the role for the underlying <code>&lt;input&gt;</code>, defaults to <code>searchbox</code>.',
  },
  size: {
    control: 'select',
    description: 'Specify the size of the Search.',
    options: sizes,
    labels: {
      xs: 'Extra small size (xs)',
      sm: 'Small size (sm)',
      md: 'Medium size (md)',
      lg: 'Large size (lg)',
    },
  },
  type: {
    control: 'text',
    description:
      'Optional prop to specify the type of the <code>&lt;input&gt;</code>.',
  },
  value: {
    control: 'text',
    description: 'Specify the value of the <code>&lt;input&gt;</code>.',
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const meta: Meta<any> = {
  title: 'Components/Search',
  decorators: [
    moduleMetadata({
      imports: [
        SearchComponent,
        SearchSkeletonComponent,
        LayerComponent,
        FormsModule,
        ReactiveFormsModule,
      ],
    }),
  ],
  parameters: {
    controls: {
      exclude: ['onInput'],
    },
  },
};

export default meta;
type Story = StoryObj<Record<string, unknown>>;

// WC: Default
export const Default: Story = {
  args,
  argTypes,
  render: (args) => ({
    props: args,
    template: `
      <div [style.width.px]="defaultWidth">
        <cds-ng-search
          [autoComplete]="autoComplete"
          [autofocus]="autofocus"
          [closeButtonLabelText]="closeButtonLabelText"
          [disabled]="disabled"
          [labelText]="labelText"
          [placeholder]="placeholder"
          [size]="size"
          [type]="type"
          [role]="role"
          [value]="value">
        </cds-ng-search>
      </div>
    `,
  }),
};

// WC: Expandable
export const Expandable: Story = {
  args: { ...args, expanded: false },
  argTypes,
  render: (args) => ({
    props: args,
    template: `
      <div [style.width.px]="defaultWidth">
        <cds-ng-search
          [autoComplete]="autoComplete"
          [autofocus]="autofocus"
          [closeButtonLabelText]="closeButtonLabelText"
          [disabled]="disabled"
          [labelText]="labelText"
          [placeholder]="placeholder"
          [size]="size"
          [type]="type"
          [role]="role"
          [value]="value"
          [expandable]="true"
          [expanded]="expanded">
        </cds-ng-search>
      </div>
    `,
  }),
};

// WC: ExpandableWithLayer
export const ExpandableWithLayer: Story = {
  args: { ...args, expanded: false },
  argTypes,
  parameters: {
    layout: 'fullscreen',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="cds--with-layer__background">
        <div class="cds--with-layer__label">$background</div>
        <div class="cds--with-layer__content">
          <div [style.width.px]="defaultWidth">
            <cds-ng-search
              [autoComplete]="autoComplete"
              [autofocus]="autofocus"
              [closeButtonLabelText]="closeButtonLabelText"
              [disabled]="disabled"
              [labelText]="labelText"
              [placeholder]="placeholder"
              [size]="size"
              [type]="type"
              [role]="role"
              [value]="value"
              [expandable]="true"
              [expanded]="expanded">
            </cds-ng-search>
          </div>
          <cds-ng-layer [withBackground]="true">
            <div class="cds--with-layer__layer">
              <div class="cds--with-layer__label">$layer-01</div>
              <div class="cds--with-layer__content">
                <div [style.width.px]="defaultWidth">
                  <cds-ng-search
                    [autoComplete]="autoComplete"
                    [autofocus]="autofocus"
                    [closeButtonLabelText]="closeButtonLabelText"
                    [disabled]="disabled"
                    [labelText]="labelText"
                    [placeholder]="placeholder"
                    [size]="size"
                    [type]="type"
                    [role]="role"
                    [value]="value"
                    [expandable]="true"
                    [expanded]="expanded">
                  </cds-ng-search>
                </div>
                <cds-ng-layer [withBackground]="true">
                  <div class="cds--with-layer__layer">
                    <div class="cds--with-layer__label">$layer-02</div>
                    <div class="cds--with-layer__content">
                      <div [style.width.px]="defaultWidth">
                        <cds-ng-search
                          [autoComplete]="autoComplete"
                          [autofocus]="autofocus"
                          [closeButtonLabelText]="closeButtonLabelText"
                          [disabled]="disabled"
                          [labelText]="labelText"
                          [placeholder]="placeholder"
                          [size]="size"
                          [type]="type"
                          [role]="role"
                          [value]="value"
                          [expandable]="true"
                          [expanded]="expanded">
                        </cds-ng-search>
                      </div>
                    </div>
                  </div>
                </cds-ng-layer>
              </div>
            </div>
          </cds-ng-layer>
        </div>
      </div>
    `,
  }),
};

// WC: Skeleton
export const Skeleton: Story = {
  args,
  argTypes: {
    ...argTypes,
    size: {
      ...argTypes.size,
      description: 'Specify the size of the Search Skeleton.',
    },
  },
  parameters: {
    controls: {
      include: ['size', 'defaultWidth'],
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <div [style.width.px]="defaultWidth">
        <cds-ng-search-skeleton [size]="size"></cds-ng-search-skeleton>
      </div>
    `,
  }),
};

// WC: WithLayer
export const WithLayer: Story = {
  args,
  argTypes,
  parameters: {
    layout: 'fullscreen',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="cds--with-layer__background">
        <div class="cds--with-layer__label">$background</div>
        <div class="cds--with-layer__content">
          <div [style.width.px]="defaultWidth">
            <cds-ng-search
              [autoComplete]="autoComplete"
              [autofocus]="autofocus"
              [closeButtonLabelText]="closeButtonLabelText"
              [disabled]="disabled"
              [labelText]="labelText"
              [placeholder]="placeholder"
              [size]="size"
              [type]="type"
              [role]="role"
              [value]="value">
            </cds-ng-search>
          </div>
          <cds-ng-layer [withBackground]="true">
            <div class="cds--with-layer__layer">
              <div class="cds--with-layer__label">$layer-01</div>
              <div class="cds--with-layer__content">
                <div [style.width.px]="defaultWidth">
                  <cds-ng-search
                    [autoComplete]="autoComplete"
                    [autofocus]="autofocus"
                    [closeButtonLabelText]="closeButtonLabelText"
                    [disabled]="disabled"
                    [labelText]="labelText"
                    [placeholder]="placeholder"
                    [size]="size"
                    [type]="type"
                    [role]="role"
                    [value]="value">
                  </cds-ng-search>
                </div>
                <cds-ng-layer [withBackground]="true">
                  <div class="cds--with-layer__layer">
                    <div class="cds--with-layer__label">$layer-02</div>
                    <div class="cds--with-layer__content">
                      <div [style.width.px]="defaultWidth">
                        <cds-ng-search
                          [autoComplete]="autoComplete"
                          [autofocus]="autofocus"
                          [closeButtonLabelText]="closeButtonLabelText"
                          [disabled]="disabled"
                          [labelText]="labelText"
                          [placeholder]="placeholder"
                          [size]="size"
                          [type]="type"
                          [role]="role"
                          [value]="value">
                        </cds-ng-search>
                      </div>
                    </div>
                  </div>
                </cds-ng-layer>
              </div>
            </div>
          </cds-ng-layer>
        </div>
      </div>
    `,
  }),
};
