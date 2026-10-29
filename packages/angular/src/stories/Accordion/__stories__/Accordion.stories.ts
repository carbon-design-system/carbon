/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import {
  AccordionComponent,
  AccordionItemComponent,
  AccordionSkeletonComponent,
} from '@carbon/angular/accordion';
import { ButtonComponent, ButtonSetComponent } from '@carbon/angular/button';
import { LayerComponent } from '@carbon/angular/layer';

// ─── WC-parity stories (one-for-one with @carbon/web-components Accordion) ────

const meta: Meta<AccordionComponent> = {
  title: 'Components/Accordion',
  component: AccordionComponent,
  decorators: [
    moduleMetadata({
      imports: [
        AccordionItemComponent,
        AccordionSkeletonComponent,
        ButtonComponent,
        ButtonSetComponent,
        LayerComponent,
      ],
    }),
  ],
  argTypes: {
    alignment: {
      control: 'select',
      options: ['start', 'END'],
      description:
        'Specify the alignment of the accordion heading title and chevron.',
    },
    disabled: {
      control: 'boolean',
      description:
        'Specify whether an individual AccordionItem should be disabled.',
    },
    isFlush: {
      control: 'boolean',
      description:
        'Specify whether Accordion text should be flush, default is false, does not work with align="start".',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      labels: { sm: 'Small (sm)', md: 'Medium (md)', lg: 'Large (lg)' },
      description: 'Specify the size of the Accordion.',
    },
  },
};

export default meta;
type Story = StoryObj<AccordionComponent>;

const defaultArgs = {
  alignment: 'END',
  disabled: false,
  isFlush: false,
  size: 'md',
} as const;

// WC: Default
export const Default: Story = {
  args: defaultArgs,
  parameters: {
    controls: {
      exclude: ['accordionItemToggled', 'accordionItemBeingtoggled'],
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <cds-ng-accordion
        [alignment]="alignment"
        [size]="size"
        [isFlush]="isFlush"
        [disabled]="disabled"
      >
        <cds-ng-accordion-item
          title="Choose your plan"
          (accordionItemBeingtoggled)="accordionItemBeingtoggled?.($event)"
          (accordionItemToggled)="accordionItemToggled?.($event)"
        >
          <p>Compare plan features and select the option that best matches your team's expected usage.</p>
        </cds-ng-accordion-item>
        <cds-ng-accordion-item
          title="Add team members"
          (accordionItemBeingtoggled)="accordionItemBeingtoggled?.($event)"
          (accordionItemToggled)="accordionItemToggled?.($event)"
        >
          <p>Invite collaborators by email and assign their workspace roles before launch.</p>
        </cds-ng-accordion-item>
        <cds-ng-accordion-item
          title="Set payment details"
          (accordionItemBeingtoggled)="accordionItemBeingtoggled?.($event)"
          (accordionItemToggled)="accordionItemToggled?.($event)"
        >
          <p>Add billing information and choose whether to receive invoices by email.</p>
        </cds-ng-accordion-item>
        <cds-ng-accordion-item
          title="Review and confirm"
          (accordionItemBeingtoggled)="accordionItemBeingtoggled?.($event)"
          (accordionItemToggled)="accordionItemToggled?.($event)"
        >
          <p>Check your setup summary, then confirm to create the workspace for your team.</p>
        </cds-ng-accordion-item>
      </cds-ng-accordion>
    `,
  }),
};

// WC: Controlled (expand / collapse all via external buttons)
export const Controlled: Story = {
  args: defaultArgs,
  parameters: {
    controls: {
      exclude: ['accordionItemToggled', 'accordionItemBeingtoggled'],
    },
  },
  render: (args) => ({
    props: {
      ...args,
      toggleItems: (isOpen: boolean) => {
        document
          .querySelectorAll('cds-ng-accordion-item[controlled]')
          .forEach((item) => {
            if (isOpen) {
              item.setAttribute('open', '');
            } else {
              item.removeAttribute('open');
            }
          });
      },
    },
    template: `
      <cds-ng-button-set style="margin-bottom: 1rem;">
        <cds-ng-button (click)="toggleItems(true)">Click to expand all</cds-ng-button>
        <cds-ng-button (click)="toggleItems(false)">Click to collapse all</cds-ng-button>
      </cds-ng-button-set>
      <cds-ng-accordion
        [alignment]="alignment"
        [size]="size"
        [isFlush]="isFlush"
        [disabled]="disabled"
      >
        <cds-ng-accordion-item
          controlled
          title="Choose your plan"
          (accordionItemToggled)="accordionItemToggled?.($event)"
        >
          <p>Compare plan features and select the option that best matches your team's expected usage.</p>
        </cds-ng-accordion-item>
        <cds-ng-accordion-item
          controlled
          title="Add team members"
          (accordionItemToggled)="accordionItemToggled?.($event)"
        >
          <p>Invite collaborators by email and assign their workspace roles before launch.</p>
        </cds-ng-accordion-item>
        <cds-ng-accordion-item
          controlled
          title="Set payment details"
          (accordionItemToggled)="accordionItemToggled?.($event)"
        >
          <p>Add billing information and choose whether to receive invoices by email.</p>
        </cds-ng-accordion-item>
        <cds-ng-accordion-item
          controlled
          title="Review and confirm"
          (accordionItemToggled)="accordionItemToggled?.($event)"
        >
          <p>Check your setup summary, then confirm to create the workspace for your team.</p>
        </cds-ng-accordion-item>
      </cds-ng-accordion>
    `,
  }),
};

// WC: Skeleton
export const Skeleton: StoryObj<Record<string, unknown>> = {
  args: {
    alignment: 'END',
    isFlush: false,
  },
  argTypes: {
    alignment: {
      control: 'select',
      options: ['start', 'END'],
      description:
        'Specify the alignment of the accordion heading title and chevron.',
    },
    isFlush: {
      control: 'boolean',
      description:
        'Specify whether Accordion text should be flush, default is false, does not work with align="start".',
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 500px">
        <cds-ng-accordion-skeleton [alignment]="alignment" [isFlush]="isFlush"></cds-ng-accordion-skeleton>
      </div>
    `,
  }),
};

// WC: WithLayer
export const WithLayer: StoryObj<typeof defaultArgs> = {
  args: defaultArgs,
  argTypes: {
    alignment: {
      control: 'select',
      options: ['start', 'END'],
      description:
        'Specify the alignment of the accordion heading title and chevron.',
    },
    disabled: {
      control: 'boolean',
      description:
        'Specify whether an individual AccordionItem should be disabled.',
    },
    isFlush: {
      control: 'boolean',
      description:
        'Specify whether Accordion text should be flush, default is false, does not work with align="start".',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      labels: { sm: 'Small (sm)', md: 'Medium (md)', lg: 'Large (lg)' },
      description: 'Specify the size of the Accordion.',
    },
  },
  parameters: {
    layout: 'fullscreen',
    controls: {
      exclude: ['accordionItemToggled', 'accordionItemBeingtoggled'],
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="cds--with-layer__background">
        <div class="cds--with-layer__label">$background</div>
        <div class="cds--with-layer__content">
          <cds-ng-accordion [alignment]="alignment" [size]="size" [isFlush]="isFlush" [disabled]="disabled">
            <cds-ng-accordion-item title="Choose your plan">
              Compare plan features and select the option that best matches your team's expected usage.
            </cds-ng-accordion-item>
            <cds-ng-accordion-item title="Add team members">
              Invite collaborators by email and assign their workspace roles before launch.
            </cds-ng-accordion-item>
            <cds-ng-accordion-item title="Set payment details">
              Add billing information and choose whether to receive invoices by email.
            </cds-ng-accordion-item>
            <cds-ng-accordion-item title="Review and confirm">
              Check your setup summary, then confirm to create the workspace for your team.
            </cds-ng-accordion-item>
          </cds-ng-accordion>
          <cds-ng-layer [withBackground]="true">
            <div class="cds--with-layer__layer">
              <div class="cds--with-layer__label">$layer-01</div>
              <div class="cds--with-layer__content">
                <cds-ng-accordion [alignment]="alignment" [size]="size" [isFlush]="isFlush" [disabled]="disabled">
                  <cds-ng-accordion-item title="Choose your plan">
                    Compare plan features and select the option that best matches your team's expected usage.
                  </cds-ng-accordion-item>
                  <cds-ng-accordion-item title="Add team members">
                    Invite collaborators by email and assign their workspace roles before launch.
                  </cds-ng-accordion-item>
                  <cds-ng-accordion-item title="Set payment details">
                    Add billing information and choose whether to receive invoices by email.
                  </cds-ng-accordion-item>
                  <cds-ng-accordion-item title="Review and confirm">
                    Check your setup summary, then confirm to create the workspace for your team.
                  </cds-ng-accordion-item>
                </cds-ng-accordion>
                <cds-ng-layer [withBackground]="true">
                  <div class="cds--with-layer__layer">
                    <div class="cds--with-layer__label">$layer-02</div>
                    <div class="cds--with-layer__content">
                      <cds-ng-accordion [alignment]="alignment" [size]="size" [isFlush]="isFlush" [disabled]="disabled">
                        <cds-ng-accordion-item title="Choose your plan">
                          Compare plan features and select the option that best matches your team's expected usage.
                        </cds-ng-accordion-item>
                        <cds-ng-accordion-item title="Add team members">
                          Invite collaborators by email and assign their workspace roles before launch.
                        </cds-ng-accordion-item>
                        <cds-ng-accordion-item title="Set payment details">
                          Add billing information and choose whether to receive invoices by email.
                        </cds-ng-accordion-item>
                        <cds-ng-accordion-item title="Review and confirm">
                          Check your setup summary, then confirm to create the workspace for your team.
                        </cds-ng-accordion-item>
                      </cds-ng-accordion>
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

// Angular-only: Event count verification (used by Accordion.e2e.ts)
export const Events: Story = {
  tags: ['!dev', '!autodocs'],
  render: () => ({
    props: { outputCount: 0, domCount: 0 },
    template: `
      <cds-ng-accordion>
        <cds-ng-accordion-item
          title="Section 1"
          (accordionItemToggled)="outputCount = outputCount + 1"
          (cds-ng-accordion-item-toggled)="domCount = domCount + 1"
        >Content 1</cds-ng-accordion-item>
        <cds-ng-accordion-item title="Section 2" [open]="true">Content 2</cds-ng-accordion-item>
        <cds-ng-accordion-item title="Section 3" [disabled]="true">Content 3</cds-ng-accordion-item>
      </cds-ng-accordion>
      <p data-testid="output-count">{{ outputCount }}</p>
      <p data-testid="dom-count">{{ domCount }}</p>
    `,
  }),
};
