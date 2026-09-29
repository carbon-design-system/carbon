/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defineCustomElement } from '../../globals/register';
import CDSTimePicker from './time-picker';
import CDSTimePickerSelect from './time-picker-select';

export { CDSTimePicker, CDSTimePickerSelect };

defineCustomElement(CDSTimePicker);
defineCustomElement(CDSTimePickerSelect);
