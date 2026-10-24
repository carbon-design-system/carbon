/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ViewEncapsulation,
} from '@angular/core';

/**
 * Legacy Angular wrapper for `cds-KEBAB_NAME`.
 *
 * @deprecated Legacy wrapper provided for backward compatibility with `carbon-components-angular`.
 * For new features, import from `@carbon/angular` directly:
 * ```ts
 * import { DISPLAY_NAMEComponent } from '@carbon/angular';
 * ```
 */
@Component({
  selector: 'cds-KEBAB_NAME',
  template: `<cds-ng-KEBAB_NAME><ng-content /></cds-ng-KEBAB_NAME>`,
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class -- placeholder until the CCA adapter bindings are added
export class DISPLAY_NAMEComponent {
  // TODO: add backward-compatible CCA @Input() / @Output() adapter bindings
}
