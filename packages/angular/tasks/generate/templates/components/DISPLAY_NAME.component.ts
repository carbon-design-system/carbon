/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  ViewEncapsulation,
} from '@angular/core';

/**
 * Angular wrapper for the `cds-ng-KEBAB_NAME` Web Component.
 *
 * Consumer-facing selector: `cds-KEBAB_NAME`
 * Internal WC tag:          `cds-ng-KEBAB_NAME`  (registered via defineCustomElement)
 */
@Component({
  selector: 'cds-KEBAB_NAME',
  template: `<cds-ng-KEBAB_NAME></cds-ng-KEBAB_NAME>`,
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: false,
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class DISPLAY_NAMEComponent {
  // TODO: add @Input() / @Output() bindings derived from the WC .d.ts
}

@NgModule({
  declarations: [DISPLAY_NAMEComponent],
  exports: [DISPLAY_NAMEComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class CDSAngularDISPLAY_NAMEModule {}
