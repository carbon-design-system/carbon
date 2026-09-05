/* eslint-disable react/prop-types */
/**
 * Copyright IBM Corp. 2024, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useRef, useContext, useState } from 'react';
import type { Instance } from 'flatpickr/dist/types/instance';

import { DatePicker } from '../../../DatePicker';
import { DatePickerInput } from '../../../DatePickerInput';

import { useTranslations } from '../../utils/useTranslations';
import { Condition, PropertyConfigDate } from '../../ConditionBuilder.types';
import { checkForMultiSelectOperator, focusThisField } from '../../utils/util';
import { ConditionBuilderContext } from '../../ConditionBuilderContext/ConditionBuilderProvider';
import { usePrefix } from '../../../../internal/usePrefix';

interface ConditionBuilderItemDate {
  conditionState: Condition;
  onChange: (date: string) => void;
  config: PropertyConfigDate;
}
export const ConditionBuilderItemDate = ({
  conditionState,
  onChange,
  config,
}) => {
  const prefix = usePrefix();
  const blockClass = `${prefix}--condition-builder`;
  const DatePickerInputRef = useRef<{ calendar: Instance | null }>(null);
  const [startText, endText] = useTranslations(['startText', 'endText']);

  const [dateFromState, setDateFromState] = useState<Date[] | undefined>();

  const dateFormat = config?.dateFormat || 'm/d/Y';

  const { conditionBuilderRef } = useContext(ConditionBuilderContext);
  const datePickerType =
    conditionState.operator == 'between' ||
    checkForMultiSelectOperator(conditionState, config)
      ? 'range'
      : 'single';

  useEffect(() => {
    if (datePickerType === 'range') {
      setDateFromState(getParsedDate(conditionState.value) ?? undefined);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //This method will convert the date string from the condition state to date object based on the dateFormat
  const getParsedDate = (dateToParse: string): Date[] | null => {
    const calendarInstance = DatePickerInputRef?.current?.calendar;
    if (!calendarInstance || !dateToParse) {
      return null;
    }

    const [startDate, endDate] = dateToParse.split(' - ');
    const parsedDates: Date[] = [];

    if (startDate && startDate !== 'INVALID') {
      const parsed = calendarInstance.parseDate(startDate, dateFormat);
      if (parsed) parsedDates.push(parsed);
    }
    if (endDate && endDate !== 'INVALID') {
      const parsed = calendarInstance.parseDate(endDate, dateFormat);
      if (parsed) parsedDates.push(parsed);
    }

    return parsedDates.length ? parsedDates : null;
  };

  const onCloseHandler = (selectedDate, selectedDateStr, instance) => {
    let formattedDate = selectedDateStr;

    if (datePickerType === 'range' && selectedDate.length === 2) {
      formattedDate = `${instance.formatDate(selectedDate[0], dateFormat)} - ${instance.formatDate(selectedDate[1], dateFormat)}`;
    }

    onChange(formattedDate || 'INVALID');
  };

  // this will close the popover on enter key press
  //Note: has to use onKeyPress instead of onKeyDown, since core is stop propagating for onKeydown(fixEventsPlugin.js)
  const onKeyPressHandler = (evt: KeyboardEvent) => {
    if (evt.key === 'Enter') {
      const calendarInstance = DatePickerInputRef?.current?.calendar;
      if (calendarInstance) {
        onCloseHandler(
          calendarInstance.selectedDates,
          (evt.target as HTMLInputElement).value,
          calendarInstance
        );
      }

      focusThisField(evt, conditionBuilderRef, blockClass);
    }
  };

  return (
    <div className={`${blockClass}__item-date `}>
      {datePickerType == 'single' && (
        <DatePicker
          {...config}
          locale={{ locale: config.locale ?? 'en' }}
          ref={DatePickerInputRef}
          datePickerType="single"
          value={conditionState.value === 'INVALID' ? '' : conditionState.value}
          onClose={onCloseHandler}
          onKeyPress={onKeyPressHandler}>
          <DatePickerInput
            id="datePicker"
            placeholder="dd/mm/yyyy"
            labelText={conditionState.property}
          />
        </DatePicker>
      )}

      {datePickerType == 'range' && (
        <DatePicker
          {...config}
          locale={{ locale: config.locale ?? 'en' }}
          ref={DatePickerInputRef}
          datePickerType={datePickerType}
          onClose={onCloseHandler}
          onKeyPress={onKeyPressHandler}
          value={dateFromState}>
          <DatePickerInput
            id="datePickerStart"
            placeholder="dd/mm/yyyy"
            labelText={startText}
          />
          <DatePickerInput
            id="datePickerEnd"
            placeholder="dd/mm/yyyy"
            labelText={endText}
          />
        </DatePicker>
      )}
    </div>
  );
};
