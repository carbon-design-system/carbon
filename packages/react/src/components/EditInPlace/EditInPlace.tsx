/**
 * Copyright IBM Corp. 2022, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { PropsWithChildren, forwardRef, useRef, useState } from 'react';
import cx from 'classnames';
import {
  Checkmark,
  Close,
  Edit,
  EditOff,
  WarningFilled,
} from '@carbon/icons-react';
import { IconButton } from '../IconButton';
import { Toggletip, ToggletipButton, ToggletipContent } from '../Toggletip';
import { usePrefix } from '../../internal/usePrefix';

const componentName = 'EditInPlace';

const defaults = {
  tooltipAlignment: 'top' as const,
  size: 'sm' as const,
};

type Size = 'sm' | 'md' | 'lg';
type AlignPropType =
  | 'top'
  | 'top-left'
  | 'top-right'
  | 'bottom'
  | 'bottom-left'
  | 'bottom-right'
  | 'left'
  | 'right';
type Shape = {
  cancel: AlignPropType;
  edit: AlignPropType;
  save: AlignPropType;
};

export interface EditInPlaceProps
  extends PropsWithChildren,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'onBlur'> {
  /**
   * label for cancel button
   */
  cancelLabel: string;
  /**
   * By default the edit icon is shown on hover only.
   */
  editAlwaysVisible?: boolean;
  /**
   * label for edit button
   */
  editLabel: string;
  /**
   * Specify a custom id for the input
   */
  id: string;
  /**
   * inheritTypography - causes the text entry field to inherit typography settings
   * assigned to the container. This is useful when editing titles for instance.
   *
   * NOTE: The size property limits the vertical size of the input element.
   * Inherited font's should be selected to fit within the size selected.
   */
  inheritTypography?: boolean;
  /**
   * determines if the input is invalid
   */
  invalid?: boolean;
  /**
   * text that is displayed if the input is invalid
   */
  invalidText?: string;
  /**
   * Provide the text that will be read by a screen reader when visiting this control
   */
  labelText: string;
  /**
   * handler to add custom onBlur event
   */
  onBlur?: (value: string) => void;
  /**
   * handler that is called when the cancel button is pressed or when the user removes focus from the input and there is no new value
   */
  onCancel: (value: string) => void;
  /**
   * handler that is called when the input is updated
   */
  onChange: (value: string) => void;
  /**
   * handler that is called when the save button is pressed or when the user removes focus from the input if it has a new value
   */
  onSave: () => void;
  /**
   * placeholder for the input
   */
  placeholder?: string;
  /**
   * determines if the input is in readOnly mode
   */
  readOnly?: boolean;
  /**
   * label for the edit off button that displays when in read only mode
   */
  readOnlyLabel?: string;
  /**
   * text for the toggletip that displays when in read only mode
   */
  readOnlyToggleTipText?: string;
  /**
   * label for save button
   */
  saveLabel: string;
  /**
   * vertical size of control
   */
  size?: Size;
  /**
   * alignment for the toggletip that displays when in read only mode
   */
  toggleTipAlignment?: AlignPropType;
  /**
   * tooltipAlignment from the standard tooltip. Default center.
   *
   * Can be passed either as one of tooltip options or as an object specifying cancel, edit and save separately
   */
  tooltipAlignment?: AlignPropType | Shape;
  /**
   * current value of the input
   */
  value: string;
}

export const EditInPlace = forwardRef<HTMLDivElement, EditInPlaceProps>(
  (
    {
      cancelLabel,
      editAlwaysVisible,
      editLabel,
      id,
      inheritTypography,
      invalid,
      invalidLabel: deprecated_invalidLabel = ' ',
      invalidText,
      labelText,
      onBlur,
      onCancel,
      onChange,
      onSave,
      placeholder,
      readOnly,
      readOnlyLabel,
      readOnlyToggleTipText,
      saveLabel,
      size = 'sm',
      toggleTipAlignment,
      tooltipAlignment,
      value,
      ...rest
    }: EditInPlaceProps & { invalidLabel?: string },
    ref
  ) => {
    const prefix = usePrefix();
    const blockClass = `${prefix}--edit-in-place`;

    const [focused, setFocused] = useState(false);
    const [initialValue, setInitialValue] = useState<string>(value);
    const [dirtyInput, setDirtyInput] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    // Compare trimmed values to determine if there's a real change
    const hasValueChanged = value.trim() !== initialValue.trim();
    const canSave = hasValueChanged && !invalid;
    const canCancel = hasValueChanged;
    const escaping = useRef(false);
    const clickingWithin = useRef(false);

    const tipAlignIsObject = typeof tooltipAlignment === 'object';
    const tipAlignments: { [key: string]: AlignPropType } = [
      'edit',
      'save',
      'cancel',
    ].reduce(
      (acc, tips) => {
        acc[tips] =
          (tipAlignIsObject
            ? (tooltipAlignment as Shape)[tips]
            : (tooltipAlignment as AlignPropType)) ?? defaults.tooltipAlignment;

        return acc;
      },
      {} as Record<string, AlignPropType>
    );

    const isTargetingChild = ({
      currentTarget,
      relatedTarget,
    }: {
      currentTarget: EventTarget & HTMLElement;
      relatedTarget: EventTarget | null;
    }) =>
      relatedTarget instanceof Node && currentTarget.contains(relatedTarget);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!dirtyInput) {
        setDirtyInput(true);
      }

      onChange(e.target.value);
    };

    const onFocusHandler = (e: React.FocusEvent<HTMLElement>) => {
      if (!isTargetingChild(e)) {
        inputRef.current?.focus();
      }
      // Always set focused when the input receives focus
      // The blur handler will manage exiting edit mode
      setFocused(true);
    };

    const onSaveHandler = (exitEditMode = false) => {
      setInitialValue(value);
      setDirtyInput(false);
      onSave();
      if (exitEditMode) {
        // Exit edit mode (for auto-save on blur)
        setFocused(false);
      } else {
        // Stay in edit mode (for manual save button click)
        requestAnimationFrame(() => {
          inputRef.current?.focus();
        });
      }
    };

    const onCancelHandler = (exitEditMode = false) => {
      setDirtyInput(false);
      onCancel(initialValue);
      if (exitEditMode) {
        // Exit edit mode (for auto-cancel on blur)
        setFocused(false);
      } else {
        // Stay in edit mode (for manual cancel button click)
        requestAnimationFrame(() => {
          if (inputRef.current) {
            inputRef.current.focus();
            // Set cursor to end of text
            const length = inputRef.current.value.length;
            inputRef.current.setSelectionRange(length, length);
          }
        });
      }
    };

    const onBlurHandler = (e: React.FocusEvent<HTMLDivElement>) => {
      // Check if we clicked within (any button click)
      const clickedWithin = clickingWithin.current;

      // Check if targeting child (for tab navigation or clicking within)
      const targetingChild = isTargetingChild(e);

      // If clicked any button AND focus is staying within the component, don't exit edit mode
      // This handles clicking enabled buttons within the toolbar
      if (clickedWithin && targetingChild) {
        clickingWithin.current = false; // Reset for next interaction
        return;
      }

      // If clicked within but focus is leaving the component, exit edit mode
      // This handles clicking outside after clicking a disabled button
      if (clickedWithin && !targetingChild) {
        clickingWithin.current = false; // Reset the flag
        // Continue to exit edit mode below
      }

      // If tabbing to a button within the component, allow it (don't exit edit mode)
      if (!clickedWithin && targetingChild) {
        return;
      }

      // Use custom function provided if passed through
      if (typeof onBlur === 'function') {
        onBlur(initialValue);
        setFocused(false);
      } else {
        // Use Default behavior if no custom function provided
        if (escaping.current) {
          return;
        }
        if (canSave) {
          onSaveHandler(true); // Exit edit mode after auto-save
        } else {
          onCancelHandler(true); // Exit edit mode after auto-cancel
          setFocused(false);
        }
      }
    };

    const returnHandler = () => {
      if (canSave) {
        onSaveHandler();
      }
    };

    const escapeHandler = () => {
      onCancelHandler();
    };

    const removeFocus = () => {
      inputRef.current?.blur();
      setFocused(false);
    };

    const handleToolbarMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
      // Set flag when clicking any button to prevent blur handler from running
      const element = e.target as HTMLElement;
      let foundButton: HTMLElement | null = null;

      // First, try to traverse up to find a button
      let current: HTMLElement | null = element;
      while (current && current !== e.currentTarget) {
        if (current.tagName === 'BUTTON') {
          foundButton = current;
          break;
        }
        current = current.parentElement;
      }

      // If no button found by traversing up, search within the clicked element
      if (!foundButton) {
        foundButton = element.querySelector('button');
      }

      if (foundButton) {
        clickingWithin.current = true;

        // For disabled buttons, prevent default to stop blur from firing
        // This keeps the input focused when clicking disabled buttons
        const isDisabled =
          foundButton.hasAttribute('disabled') ||
          foundButton.getAttribute('aria-disabled') === 'true';
        if (isDisabled) {
          e.preventDefault();
        }
      }
    };

    const onKeyHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
      // to prevent blur handler from being called twice add additional state to check if escape is being used
      escaping.current = true;
      switch (e.key) {
        case 'Escape':
          removeFocus();
          escapeHandler();
          break;
        case 'Enter':
          removeFocus();
          returnHandler();
          break;
        default:
          break;
      }
      escaping.current = false;
    };

    const inputElement = (
      <input
        id={id}
        className={cx(
          `${blockClass}__text-input`,
          `${prefix}--text-input`,
          `${prefix}--text-input--${size}`
        )}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChangeHandler}
        ref={inputRef}
        readOnly={readOnly}
        onKeyDown={onKeyHandler}
        aria-label={labelText}
        aria-invalid={invalid}
      />
    );

    const inputContainer = (
      <div
        className={cx(blockClass, `${blockClass}--${size}`, {
          [`${blockClass}--focused`]: focused,
          [`${blockClass}--invalid`]: invalid,
          [`${blockClass}--inherit-type`]: inheritTypography,
          [`${blockClass}--overflows`]:
            inputRef.current &&
            inputRef.current.scrollWidth > inputRef.current.offsetWidth,
          [`${blockClass}--readonly`]: readOnly,
        })}
        onFocus={onFocusHandler}
        onBlur={onBlurHandler}>
        {readOnly ? (
          <Toggletip
            align={toggleTipAlignment}
            className={`${blockClass}__toggletip-wrapper`}>
            <ToggletipButton label={readOnlyLabel || 'Edit off'}>
              {inputElement}
            </ToggletipButton>
            <ToggletipContent>
              <p>
                {readOnlyToggleTipText ||
                  'This field is read-only and cannot be edited'}
              </p>
            </ToggletipContent>
          </Toggletip>
        ) : (
          inputElement
        )}
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions -- This div is not interactive; onMouseDown is used only to detect clicks on disabled buttons within to prevent blur */}
        <div
          className={`${blockClass}__toolbar`}
          onMouseDown={handleToolbarMouseDown}>
          {invalid && (
            <WarningFilled
              size={16}
              className={`${blockClass}__warning-icon`}
            />
          )}
          {readOnly ? (
            <IconButton
              className={`${blockClass}__btn-readonly`}
              size={size}
              label={readOnlyLabel || 'Edit off'}
              kind="ghost"
              key="readonly"
              onClick={onFocusHandler}>
              <EditOff size={16} />
            </IconButton>
          ) : focused ? (
            <>
              <IconButton
                align={tipAlignments.cancel}
                size={size}
                label={cancelLabel}
                onClick={() => onCancelHandler(false)}
                kind="ghost"
                key="cancel"
                className={`${blockClass}__btn ${blockClass}__btn-cancel`}
                disabled={!canCancel}>
                <Close size={16} />
              </IconButton>

              <IconButton
                align={tipAlignments.save}
                size={size}
                label={saveLabel}
                onClick={() => onSaveHandler(false)}
                kind="ghost"
                key="save"
                className={`${blockClass}__btn ${blockClass}__btn-save`}
                disabled={!canSave}>
                <Checkmark size={16} />
              </IconButton>
            </>
          ) : (
            <IconButton
              align={tipAlignments.edit}
              className={cx(`${blockClass}__btn`, `${blockClass}__btn-edit`, {
                [`${blockClass}__btn-edit--always-visible`]: editAlwaysVisible,
              })}
              size={size}
              label={editLabel}
              onClick={onFocusHandler}
              kind="ghost"
              key="edit">
              <Edit size={16} />
            </IconButton>
          )}
        </div>
      </div>
    );

    return (
      <div {...rest} ref={ref} data-component-name={componentName}>
        {inputContainer}
        {invalid && (
          <p className={`${blockClass}__warning-text`}>
            {invalidText ?? deprecated_invalidLabel}
          </p>
        )}
      </div>
    );
  }
);

EditInPlace.displayName = componentName;
