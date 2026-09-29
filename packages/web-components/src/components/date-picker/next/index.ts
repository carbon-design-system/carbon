/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defineCustomElement } from '../../../globals/register';
import CDSDatePicker from './components/date-picker';
import CDSDatePickerInput from './components/date-picker-input';
import CDSDatePickerInputSkeleton from './components/date-picker-input-skeleton';
import CDSDatePickerCalendar from './components/calendar-renderer';

export {
  CDSDatePicker,
  CDSDatePickerInput,
  CDSDatePickerInputSkeleton,
  CDSDatePickerCalendar,
};

defineCustomElement(CDSDatePicker);
defineCustomElement(CDSDatePickerInput);
defineCustomElement(CDSDatePickerInputSkeleton);
defineCustomElement(CDSDatePickerCalendar);
