/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  Children,
  isValidElement,
  useEffect,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import { useDatePicker } from '../hooks/useDatePicker';
import { usePrefix } from '../../../../internal/usePrefix';
import { Calendar } from './Calendar';
import { formatPlainDate } from '@carbon/utilities/date-picker';
import type { DatePickerInputProps } from './DatePickerInput';

/**
 * DatePicker component props
 * Maintains 100% backwards compatibility with Carbon React v11 API
 */
export interface DatePickerProps {
  /**
   * The type of date picker
   */
  datePickerType?: 'simple' | 'single' | 'range';

  /**
   * The date format string
   */
  dateFormat?: string;

  /**
   * Minimum selectable date (mm/dd/yyyy format)
   */
  minDate?: string;

  /**
   * Maximum selectable date (mm/dd/yyyy format)
   */
  maxDate?: string;

  /**
   * Locale for date formatting
   */
  locale?: string;

  /**
   * Whether the picker is read-only
   */
  readOnly?: boolean;

  /**
   * Whether to use the light variant
   */
  light?: boolean;

  /**
   * Whether to use the short variant
   */
  short?: boolean;

  /**
   * Whether to allow manual input
   */
  allowInput?: boolean;

  /**
   * Whether to close calendar on date selection
   */
  closeOnSelect?: boolean;

  /**
   * Change handler - receives array of Date objects
   */
  onChange?: (dates: Date[]) => void;

  /**
   * Close handler
   */
  onClose?: () => void;

  /**
   * Open handler
   */
  onOpen?: () => void;

  /**
   * Additional CSS class names
   */
  className?: string;

  /**
   * Children (DatePickerInput components)
   */
  children?: React.ReactNode;

  /**
   * Initial value
   */
  value?: string;
}

/**
 * DatePicker component
 * Main wrapper component that orchestrates date picker functionality
 * Maintains 100% backwards compatibility with Carbon React v11
 */
export function DatePicker({
  datePickerType = 'single',
  dateFormat = 'm/d/Y',
  minDate,
  maxDate,
  locale = 'en',
  readOnly = false,
  light = false,
  short = false,
  allowInput = true,
  closeOnSelect = true,
  onChange,
  onClose,
  onOpen,
  className,
  children,
  value,
}: DatePickerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const prefix = usePrefix();

  // Use the date picker hook
  const {
    context,
    isOpen,
    selectDate,
    openCalendar,
    closeCalendar,
    handleInputFocus,
    handleInputBlur,
    handleInputChange,
    send,
    startInputRef,
    endInputRef,
    calendarRef,
    exitSentinelRef,
    handleExitSentinelFocus,
  } = useDatePicker({
    datePickerType,
    value,
    minDate,
    maxDate,
    dateFormat,
    allowInput,
    closeOnSelect,
    readOnly,
    locale,
    onChange,
    onOpen,
    onClose,
  });

  // Draft text for controlled inputs. Selection updates sync from the machine;
  // typed characters update the draft so allowInput can actually accept typing.
  const formattedStartDate = context.startDate
    ? formatPlainDate(context.startDate, context.dateFormat)
    : '';
  const formattedEndDate = context.endDate
    ? formatPlainDate(context.endDate, context.dateFormat)
    : '';
  const [draftValues, setDraftValues] = useState({
    from: formattedStartDate,
    to: formattedEndDate,
  });
  const prevFormattedDatesRef = useRef({
    from: formattedStartDate,
    to: formattedEndDate,
  });

  useEffect(() => {
    const prev = prevFormattedDatesRef.current;
    if (prev.from !== formattedStartDate || prev.to !== formattedEndDate) {
      prevFormattedDatesRef.current = {
        from: formattedStartDate,
        to: formattedEndDate,
      };
      setDraftValues({
        from: formattedStartDate,
        to: formattedEndDate,
      });
    }
  }, [formattedStartDate, formattedEndDate]);

  // Handle calendar navigation
  const handleNavigate = (eventType: string) => {
    send(eventType);
  };

  // Handle calendar icon click - toggle calendar open/close
  const handleIconClick = () => {
    if (isOpen) {
      closeCalendar();
    } else {
      openCalendar();
    }
  };

  // Clone children and inject props
  const childArray = Children.toArray(children);
  const enhancedChildren = childArray.map((child, index) => {
    if (!isValidElement<DatePickerInputProps>(child)) {
      return child;
    }

    // Determine which input this is (start or end for range mode)
    const isStartInput = index === 0;
    const isEndInput = index === 1 && datePickerType === 'range';
    const inputType = isEndInput ? 'to' : 'from';

    // Get the appropriate ref
    const inputRef = isStartInput
      ? startInputRef
      : isEndInput
        ? endInputRef
        : undefined;

    // Prefer an explicitly controlled child value; otherwise use the draft so
    // typing is not wiped on every render by the selected-date formatted value.
    const inputValue =
      child.props.value ?? (isEndInput ? draftValues.to : draftValues.from);

    // Clone the child with enhanced props
    const enhancedProps: Partial<DatePickerInputProps> = {
      ...child.props,
      value: inputValue, // Always a string, never undefined
      disabled: child.props.disabled || context.isDisabled,
      // keep DatePickerInput.readOnly for true read-only; allowInput=false only
      // blocks typing while leaving the calendar button enabled
      readOnly: child.props.readOnly || readOnly,
      allowInput,
      onFocus: (e: React.FocusEvent<HTMLInputElement>) => {
        child.props.onFocus?.(e);
        handleInputFocus(inputType);
      },
      onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
        child.props.onBlur?.(e);
        handleInputBlur();
      },
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!allowInput || readOnly || child.props.readOnly) {
          return;
        }
        child.props.onChange?.(e);
        const nextValue = e.target.value;
        setDraftValues((prev) => ({
          ...prev,
          [inputType]: nextValue,
        }));
        handleInputChange(nextValue, inputType);
      },
      onClick: (e: React.MouseEvent<HTMLInputElement>) => {
        child.props.onClick?.(e);
        if (!isOpen) {
          openCalendar();
        }
      },
      onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
        child.props.onKeyDown?.(e);

        if (!e.defaultPrevented && e.key === 'Tab' && !e.shiftKey && !isOpen) {
          e.preventDefault();
          openCalendar();
        }
      },
      onIconClick: () => {
        child.props.onIconClick?.();
        handleIconClick();
      },
      hideIcon: datePickerType === 'simple' || child.props.hideIcon,
    };

    // Wrap each input in a container div with proper Carbon classes
    const containerClasses = classNames(`${prefix}--date-picker-container`, {
      [`${prefix}--date-picker-container--single`]: datePickerType === 'single',
      [`${prefix}--date-picker-container--from`]:
        isStartInput && datePickerType === 'range',
      [`${prefix}--date-picker-container--to`]:
        isEndInput && datePickerType === 'range',
    });

    // Preserve the forwarded input ref so focus management targets the actual input element
    const childWithRef = React.createElement(child.type, {
      ...child.props,
      ...enhancedProps,
      ref: inputRef,
    });

    return (
      <div key={child.props.id} className={containerClasses}>
        {childWithRef}
      </div>
    );
  });

  // Generate class names
  const wrapperClasses = classNames(
    `${prefix}--date-picker`,
    `${prefix}--date-picker--next`,
    {
      [`${prefix}--date-picker--simple`]: datePickerType === 'simple',
      [`${prefix}--date-picker--single`]: datePickerType === 'single',
      [`${prefix}--date-picker--range`]: datePickerType === 'range',
      [`${prefix}--date-picker--light`]: light,
      [`${prefix}--date-picker--short`]: short,
      [`${prefix}--date-picker--open`]: isOpen,
    },
    className
  );

  // Don't render calendar for simple mode
  const shouldRenderCalendar = datePickerType !== 'simple' && isOpen;

  return (
    <div ref={containerRef} className={wrapperClasses}>
      {/* Input fields - each wrapped in its own container */}
      {enhancedChildren}

      {/* Calendar dropdown */}
      {shouldRenderCalendar && (
        <div
          ref={calendarRef}
          className={`${prefix}--date-picker__calendar-container`}>
          <Calendar
            context={context}
            onDateSelect={selectDate}
            onNavigate={handleNavigate}
            locale={locale}
          />
        </div>
      )}

      {/*
        Exit sentinel: a zero-size, aria-hidden span placed just after the
        calendar container in the render tree (and therefore in DOM tab order).
        Normally tabindex="-1" — invisible to Tab.  When the user presses Tab
        from inside the calendar, the keydown handler briefly sets it to
        tabindex="0" so the browser delivers that Tab keystroke here naturally.
        The onFocus handler then closes the calendar and restores tabindex="-1".
      */}
      <span
        ref={exitSentinelRef}
        tabIndex={-1}
        aria-hidden={true}
        onFocus={handleExitSentinelFocus}
        style={{
          position: 'absolute',
          width: 0,
          height: 0,
          overflow: 'hidden',
        }}
      />
    </div>
  );
}

DatePicker.displayName = 'DatePicker';
