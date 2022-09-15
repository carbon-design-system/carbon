/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Directive, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, NumberValueAccessor } from '@angular/forms';
import settings from 'carbon-components/es/globals/js/settings';

const prefix = settings.prefix; // eslint-disable-line prefer-destructuring

const host = {
  '(change)': 'onChange($event.target.value)',
  '(blur)': 'onTouched()',
};

// NOTE: Referring `BXNumberInput.eventChange` seems to cause ng-packagr to package up `src/components/number-input.ts` code,
// Which is not desirable
host[`(${prefix}-number-input)`] = 'onChange($event.target.value)';

@Directive({
  selector: `${prefix}-number-input[formControlName],${prefix}-number-input[formControl],${prefix}-number-input[ngModel]`,
  host,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BXNumberInputDirective), // eslint-disable-line no-use-before-define
      multi: true,
    },
  ],
})
export class BXNumberInputDirective extends NumberValueAccessor {} // eslint-disable-line import/prefer-default-export
