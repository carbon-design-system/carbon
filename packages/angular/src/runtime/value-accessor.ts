/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Directive, ElementRef, inject } from '@angular/core';
import type { ControlValueAccessor } from '@angular/forms';

/**
 * Base class for the generated wrappers of form-associated web components. It
 * connects `ngModel`, `formControl` and `formControlName` to the host element
 * (ADR 0013). Not intended for direct use.
 *
 * A subclass names the host property that holds the value and calls
 * `handleValueEvent()` and `handleTouched()` from host listeners for the events
 * the web component dispatches.
 */
@Directive()
export abstract class CdsValueAccessor implements ControlValueAccessor {
  /** The host property that holds the value: `value` or `checked`. */
  protected abstract readonly valueProperty: 'value' | 'checked';

  protected readonly hostElement =
    inject<ElementRef<HTMLElement & Record<string, unknown>>>(ElementRef)
      .nativeElement;

  private onChange: (value: unknown) => void = () => {};
  private onTouched: () => void = () => {};
  private lastValue: unknown;

  /**
   * Reports the host's value to the form. A web component can dispatch more
   * than one event for the same change (`input` and its own `-changed` event),
   * so a value that was already reported is skipped.
   */
  protected handleValueEvent(): void {
    const value = this.hostElement[this.valueProperty];
    if (value === this.lastValue) {
      return;
    }
    this.lastValue = value;
    this.onChange(value);
  }

  protected handleTouched(): void {
    this.onTouched();
  }

  writeValue(value: unknown): void {
    const next = value ?? (this.valueProperty === 'checked' ? false : '');
    this.lastValue = next;
    this.hostElement[this.valueProperty] = next;
  }

  registerOnChange(fn: (value: unknown) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.hostElement['disabled'] = isDisabled;
  }
}
