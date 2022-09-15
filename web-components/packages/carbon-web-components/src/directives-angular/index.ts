/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { NgModule } from '@angular/core';
import { BXCheckboxDirective } from './checkbox';
import { BXComboBoxDirective } from './combo-box';
import { BXDropdownDirective } from './dropdown';
import { BXInputDirective } from './input';
import { BXMultiSelectDirective } from './multi-select';
import { BXNumberInputDirective } from './number-input';
import { BXSelectDirective } from './select';
import { BXSliderDirective } from './slider';
import { BXToggleDirective } from './toggle';

@NgModule({
  declarations: [
    BXCheckboxDirective,
    BXComboBoxDirective,
    BXDropdownDirective,
    BXInputDirective,
    BXMultiSelectDirective,
    BXNumberInputDirective,
    BXSelectDirective,
    BXSliderDirective,
    BXToggleDirective,
  ],
  exports: [
    BXCheckboxDirective,
    BXComboBoxDirective,
    BXDropdownDirective,
    BXInputDirective,
    BXMultiSelectDirective,
    BXNumberInputDirective,
    BXSelectDirective,
    BXSliderDirective,
    BXToggleDirective,
  ],
})
export class BXFormAccessorsModule {} // eslint-disable-line import/prefer-default-export
