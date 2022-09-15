/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Directive, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, CheckboxControlValueAccessor } from '@angular/forms';
import settings from 'carbon-components/es/globals/js/settings';

const prefix = settings.prefix; // eslint-disable-line prefer-destructuring

const host = {
  '(blur)': 'onTouched()',
};

// NOTE: Referring `BXCheckbox.eventChange` seems to cause ng-packagr to package up `src/components/checkbox.ts` code,
// Which is not desirable
host[`(${prefix}-toggle-changed)`] = 'onChange($event.target.checked)';

@Directive({
  selector: `
    ${prefix}-toggle[formControlName],${prefix}-toggle[formControl],${prefix}-toggle[ngModel],
  `,
  host,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BXToggleDirective), // eslint-disable-line no-use-before-define
      multi: true,
    },
  ],
})
export class BXToggleDirective extends CheckboxControlValueAccessor {} // eslint-disable-line import/prefer-default-export
