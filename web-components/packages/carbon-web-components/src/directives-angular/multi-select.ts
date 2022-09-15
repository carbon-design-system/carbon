/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Directive, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, SelectMultipleControlValueAccessor } from '@angular/forms';
import settings from 'carbon-components/es/globals/js/settings';

const prefix = settings.prefix; // eslint-disable-line prefer-destructuring

const host = {
  '(blur)': 'onTouched()',
};

// NOTE: Referring `BXMultiSelect.eventChange` seems to cause
// ng-packagr to package up `src/components/multi-select/multi-select.ts` code, Which is not desirable
host[`(${prefix}-multi-select-selected)`] = 'onChange($event.detail.item.value)';

@Directive({
  selector: `${prefix}-multi-select[formControlName],${prefix}-multi-select[formControl],${prefix}-multi-select[ngModel]`,
  host,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BXMultiSelectDirective), // eslint-disable-line no-use-before-define
      multi: true,
    },
  ],
})
// eslint-disable-next-line import/prefer-default-export
export class BXMultiSelectDirective extends SelectMultipleControlValueAccessor {
  /**
   * Registers `onChange` handler.
   * @param fn The event listener.
   */
  registerOnChange(fn: (selected: string[]) => void) {
    // NOTE: Referring `BXMultiSelect` seems to cause ng-packagr to package up `src/components/multi-select/multi-select.ts` code,
    this.onChange = function handleOnChange(selectedValue) {
      const { value: oldValue } = this;
      const oldValues = !oldValue ? [] : oldValue.split(',');
      const values =
        oldValues.indexOf(selectedValue) < 0
          ? oldValues.concat(selectedValue)
          : oldValues.filter(oldItemValue => oldItemValue !== selectedValue);
      const value = values.join(',');
      this.value = value;
      fn(value);
    };
  }
}
