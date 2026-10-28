/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import {
  ModalBodyComponent,
  ModalBodyContentComponent,
  ModalCloseButtonComponent,
  ModalComponent,
  ModalFooterButtonComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  ModalHeadingComponent,
  ModalLabelComponent,
} from '@carbon/angular/modal';

/**
 * Verification stories for child registration (`cds-ng-dialog`,
 * `-modal-header`, `-modal-body` and `-modal-footer` are registered by
 * importing only the modal entry), `ModalFooter.hasThreeButtons`, the close
 * button, and events. Asserted by `Modal.e2e.ts`.
 */
const meta: Meta<ModalComponent> = {
  title: 'Components/Modal',
  component: ModalComponent,
  decorators: [
    moduleMetadata({
      imports: [
        ModalBodyComponent,
        ModalBodyContentComponent,
        ModalCloseButtonComponent,
        ModalFooterButtonComponent,
        ModalFooterComponent,
        ModalHeaderComponent,
        ModalHeadingComponent,
        ModalLabelComponent,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<ModalComponent>;

export const TwoButtons: Story = {
  render: () => ({
    props: { outputCount: 0, domCount: 0 },
    template: `
      <cds-ng-modal
        [open]="true"
        aria-label="Example modal"
        (modalClosed)="outputCount = outputCount + 1"
        (cds-ng-modal-closed)="domCount = domCount + 1"
      >
        <cds-ng-modal-header>
          <cds-ng-modal-close-button></cds-ng-modal-close-button>
          <cds-ng-modal-label>Account resources</cds-ng-modal-label>
          <cds-ng-modal-heading>Add a custom domain</cds-ng-modal-heading>
        </cds-ng-modal-header>
        <cds-ng-modal-body>
          <cds-ng-modal-body-content>Modal content.</cds-ng-modal-body-content>
        </cds-ng-modal-body>
        <cds-ng-modal-footer>
          <cds-ng-modal-footer-button kind="secondary">Cancel</cds-ng-modal-footer-button>
          <cds-ng-modal-footer-button kind="primary">Add</cds-ng-modal-footer-button>
        </cds-ng-modal-footer>
      </cds-ng-modal>
      <p data-testid="output-count">{{ outputCount }}</p>
      <p data-testid="dom-count">{{ domCount }}</p>
    `,
  }),
};

export const ThreeButtons: Story = {
  render: () => ({
    template: `
      <cds-ng-modal [open]="true" aria-label="Example modal">
        <cds-ng-modal-header>
          <cds-ng-modal-heading>Rename</cds-ng-modal-heading>
        </cds-ng-modal-header>
        <cds-ng-modal-body>
          <cds-ng-modal-body-content>Modal content.</cds-ng-modal-body-content>
        </cds-ng-modal-body>
        <cds-ng-modal-footer>
          <cds-ng-modal-footer-button kind="secondary">Keep both</cds-ng-modal-footer-button>
          <cds-ng-modal-footer-button kind="secondary">Rename</cds-ng-modal-footer-button>
          <cds-ng-modal-footer-button kind="primary">Replace</cds-ng-modal-footer-button>
        </cds-ng-modal-footer>
      </cds-ng-modal>
    `,
  }),
};
