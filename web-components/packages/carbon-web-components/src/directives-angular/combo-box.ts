/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Directive, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, SelectControlValueAccessor } from '@angular/forms';
import settings from 'carbon-components/es/globals/js/settings';

const prefix = settings.prefix; // eslint-disable-line prefer-destructuring

const host = {
  '(blur)': 'onTouched()',
};

// NOTE: Referring `BXComboBox.eventChange` seems to cause ng-packagr to package up `src/components/combo-box/combo-box.ts` code,
// Which is not desirable
host[`(${prefix}-combo-box-selected)`] = 'onChange($event.detail.item.value)';

@Directive({
  selector: `${prefix}-combo-box[formControlName],${prefix}-combo-box[formControl],${prefix}-combo-box[ngModel]`,
  host,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BXComboBoxDirective), // eslint-disable-line no-use-before-define
      multi: true,
    },
  ],
})
export class BXComboBoxDirective extends SelectControlValueAccessor {} // eslint-disable-line import/prefer-default-export
