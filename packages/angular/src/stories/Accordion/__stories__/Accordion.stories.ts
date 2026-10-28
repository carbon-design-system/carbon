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
} from '@carbon/angular/accordion';

/**
 * Verification stories for child registration (`cds-ng-accordion-item` is
 * registered by importing only the accordion entry) and for events. Asserted
 * by `Accordion.e2e.ts`.
 */
const meta: Meta<AccordionComponent> = {
  title: 'Components/Accordion',
  component: AccordionComponent,
  decorators: [moduleMetadata({ imports: [AccordionItemComponent] })],
};

export default meta;
type Story = StoryObj<AccordionComponent>;

export const Default: Story = {
  render: () => ({
    template: `
      <cds-ng-accordion>
        <cds-ng-accordion-item title="Section 1">Content 1</cds-ng-accordion-item>
        <cds-ng-accordion-item title="Section 2" [open]="true">Content 2</cds-ng-accordion-item>
        <cds-ng-accordion-item title="Section 3" [disabled]="true">Content 3</cds-ng-accordion-item>
      </cds-ng-accordion>
    `,
  }),
};

// Counts the generated `@Output` and the DOM event for the same toggle.
export const Events: Story = {
  render: () => ({
    props: { outputCount: 0, domCount: 0 },
    template: `
      <cds-ng-accordion>
        <cds-ng-accordion-item
          title="Section 1"
          (accordionItemToggled)="outputCount = outputCount + 1"
          (cds-ng-accordion-item-toggled)="domCount = domCount + 1"
        >Content 1</cds-ng-accordion-item>
      </cds-ng-accordion>
      <p data-testid="output-count">{{ outputCount }}</p>
      <p data-testid="dom-count">{{ domCount }}</p>
    `,
  }),
};
