/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  moduleMetadata,
  type Meta,
  type StoryObj,
  type ArgTypes,
} from '@storybook/angular';
import {
  TagComponent,
  DismissibleTagComponent,
  SelectableTagComponent,
  OperationalTagComponent,
  TagSkeletonComponent,
} from '@carbon/angular/tag';
import { ButtonComponent } from '@carbon/angular/button';
import {
  AiLabelComponent,
  AiLabelActionButtonComponent,
} from '@carbon/angular/ai-label';
import {
  PopoverComponent,
  PopoverContentComponent,
} from '@carbon/angular/popover';

const sizes = {
  'Small size (sm)': 'sm',
  'Medium size (md)': 'md',
  'Large size (lg)': 'lg',
};

const types = [
  'red',
  'magenta',
  'purple',
  'blue',
  'cyan',
  'teal',
  'green',
  'gray',
  'cool-gray',
  'warm-gray',
  'high-contrast',
  'outline',
];

const defaultArgs = {
  disabled: false,
  size: 'md',
};

const controls: ArgTypes = {
  disabled: {
    control: 'boolean',
    description: 'Specify if the element should be disabled',
  },
  size: {
    control: 'select',
    description:
      'Specify the size of the Tag. Currently supports either `sm`, `md` (default) or `lg` sizes.',
    options: Object.values(sizes),
  },
};

const meta: Meta = {
  title: 'Components/Tag',
  decorators: [
    moduleMetadata({
      imports: [
        TagComponent,
        DismissibleTagComponent,
        SelectableTagComponent,
        OperationalTagComponent,
        TagSkeletonComponent,
        ButtonComponent,
        AiLabelComponent,
        AiLabelActionButtonComponent,
        PopoverComponent,
        PopoverContentComponent,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj;

export const Dismissible: Story = {
  argTypes: {
    ...controls,
    text: {
      control: 'text',
      description: 'Provide text to be rendered inside of the tag.',
    },
    dismissTooltipAlignment: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Specify the tooltip alignment for the dismiss button',
    },
    dismissTooltipLabel: {
      control: 'text',
      description: 'Text to show on clear filters',
    },
  },
  args: {
    ...defaultArgs,
    dismissTooltipAlignment: 'bottom',
    dismissTooltipLabel: 'Dismiss',
    text: 'Tag content',
  },
  render: (args) => ({
    props: {
      ...args,
      tags: [
        {
          type: 'red',
          text: 'Tag content with a long text description',
          tagTitle: 'Provide a custom title to the tag',
        },
        { type: 'magenta', text: 'Tag content 1' },
        { type: 'purple', text: 'Tag content 2' },
        { type: 'blue', text: 'Tag content 3' },
        { type: 'cyan', text: 'Tag content 4' },
        { type: 'teal', text: 'Tag content 5' },
        { type: 'green', text: 'Tag content 6' },
        { type: 'gray', text: 'Tag content 7' },
        { type: 'cool-gray', text: 'Tag content 8' },
        { type: 'warm-gray', text: 'Tag content 9' },
        { type: 'high-contrast', text: 'Tag content 10' },
        { type: 'outline', text: 'Tag content 11' },
      ],
      resetTags: () => {
        const dismissibleTags = document.querySelectorAll(
          'cds-ng-dismissible-tag'
        );
        dismissibleTags.forEach((tag) => tag.setAttribute('open', 'true'));
      },
    },
    template: `
      <div style="margin-bottom: 3rem">
        <cds-ng-button (click)="resetTags()">Reset</cds-ng-button>
      </div>
      <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
        <cds-ng-dismissible-tag
          *ngFor="let tag of tags"
          [disabled]="disabled"
          [text]="text || tag.text"
          [tagTitle]="tag.tagTitle"
          [type]="tag.type"
          [size]="size"
          [dismissTooltipLabel]="dismissTooltipLabel"
          [dismissTooltipAlignment]="dismissTooltipAlignment">
        </cds-ng-dismissible-tag>
      </div>
    `,
  }),
};

export const Skeleton: Story = {
  argTypes: {
    size: {
      control: 'select',
      description: 'Specify the size of the Tag.',
      options: Object.values(sizes),
    },
  },
  args: {
    size: 'md',
  },
  render: (args) => ({
    props: args,
    template: `<cds-ng-tag-skeleton [size]="size">Tag content</cds-ng-tag-skeleton>`,
  }),
};

export const Selectable: Story = {
  argTypes: {
    ...controls,
    text: {
      control: 'text',
      description: 'Provide text to be rendered inside of the tag.',
    },
  },
  args: {
    ...defaultArgs,
    text: 'Tag content',
  },
  render: (args) => ({
    props: {
      ...args,
      tags: [
        {
          id: 1,
          text: 'Tag content with a long text description',
          selected: false,
        },
        { id: 2, text: 'Tag content 1', selected: true },
        { id: 3, text: 'Tag content 2', selected: false },
        { id: 4, text: 'Tag content 3', selected: false },
      ],
    },
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;" aria-label="Selectable tags" role="group">
        <cds-ng-selectable-tag
          *ngFor="let tag of tags"
          [disabled]="disabled"
          [selected]="tag.selected"
          [id]="tag.id"
          [text]="text || tag.text"
          [size]="size">
        </cds-ng-selectable-tag>
      </div>
    `,
  }),
};

export const Operational: Story = {
  argTypes: {
    ...controls,
    text: {
      control: 'text',
      description: 'Provide text to be rendered inside of the tag.',
    },
    showIcon: {
      control: 'boolean',
      description: 'Specify whether the Tag has an icon',
    },
  },
  args: {
    ...defaultArgs,
    showIcon: true,
    text: 'Tag content',
  },
  render: (args) => ({
    props: {
      ...args,
      tags: [
        { type: 'red', text: 'Tag content with a long text description' },
        { type: 'magenta', text: 'Tag content' },
        { type: 'purple', text: 'Tag content' },
        { type: 'blue', text: 'Tag content' },
        { type: 'cyan', text: 'Tag content' },
        { type: 'teal', text: 'Tag content' },
        { type: 'green', text: 'Tag content' },
        { type: 'gray', text: 'Tag content' },
        { type: 'cool-gray', text: 'Tag content' },
        { type: 'warm-gray', text: 'Tag content' },
        { type: 'high-contrast', text: 'Tag content' },
        { type: 'outline', text: 'Tag content' },
      ],
    },
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
        <cds-ng-operational-tag
          *ngFor="let tag of tags"
          [disabled]="disabled"
          [text]="text || tag.text"
          [type]="tag.type"
          [size]="size">
        </cds-ng-operational-tag>
      </div>
    `,
  }),
};

export const ReadOnly: Story = {
  argTypes: {
    ...controls,
    title: {
      control: 'text',
      description: 'Text to show on clear filters',
    },
    text: {
      control: 'text',
      description: 'Provide text to be rendered inside of the tag.',
    },
    filter: {
      control: 'boolean',
      description: 'Determine if `Tag` is a filter/chip',
    },
  },
  args: {
    ...defaultArgs,
    filter: false,
    title: 'Clear filters',
    text: 'Tag content',
  },
  render: (args) => ({
    props: {
      ...args,
      types,
    },
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
        <cds-ng-tag
          *ngFor="let type of types"
          [type]="type"
          [filter]="filter"
          [title]="title"
          [size]="size"
          [disabled]="disabled">
          {{ text }}
        </cds-ng-tag>
      </div>
    `,
  }),
};

export const WithAILabel: Story = {
  argTypes: {
    ...controls,
    dismissTooltipLabel: {
      control: 'text',
      description: 'Text to show on clear filters',
    },
    text: {
      control: 'text',
      description: 'Provide text to be rendered inside of the tag.',
    },
  },
  args: {
    ...defaultArgs,
    text: 'Tag content',
    dismissTooltipLabel: 'Dismiss',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
        <cds-ng-tag type="red" [disabled]="disabled" [size]="size">
          {{ text }}
          <cds-ng-ai-label alignment="bottom-left">
            <div slot="body-text">AI Explained</div>
          </cds-ng-ai-label>
        </cds-ng-tag>

        <cds-ng-dismissible-tag
          type="purple"
          [disabled]="disabled"
          [size]="size"
          [dismissTooltipLabel]="dismissTooltipLabel"
          [text]="text">
          <cds-ng-ai-label alignment="bottom-left">
            <div slot="body-text">AI Explained</div>
          </cds-ng-ai-label>
        </cds-ng-dismissible-tag>
      </div>
    `,
  }),
};
