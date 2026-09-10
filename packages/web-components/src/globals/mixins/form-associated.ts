/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { unsafeCSS, type CSSResult } from 'lit';

/**
 * Form association for Carbon's form components.
 *
 * Mirrors the `ElementInternals.setFormValue()` signature. `null` means the
 * element contributes no entry, which is how a disabled or unchecked control
 * stays out of the submission.
 *
 * Intentionally re-create a sub-section of `@lit-labs/forms` rather than using it
 * directly, until it graduates to a production package. The API here is shaped
 * like Lit's package so that if/when it graduates, our adoption of it will
 * be a simple switch.
 */
export type FormValue = string | File | FormData | null;

/**
 * @param Base The base class.
 * @returns A mixin turning the element into a form-associated custom element
 *
 * Delegate to `ElementInternals` as much as possible
 *
 * A component using this implements {@link _getFormValue} and lists the
 * properties that change it in `formValueProperties`.
 *
 * - Form value is pushed from `requestUpdate()`, which Lit calls
 *   synchronously from every property setter. Syncing in an async lifecycle
 *   instead (`updated()`) leaves a stale value readable by a
 *   `new FormData(form)` in the same task, which a native control never does.
 * - The rendered control is disabled while an ancestor `<fieldset>` is, which
 *   the platform does not do for shadow content on its own.
 * - `_handleFormdata` is neutralized, so the deprecated `formdata` path
 *   inherited from `FormMixin` cannot double-submit alongside `setFormValue()`.
 *   This override disappears in v3 when `FormMixin` is removed.
 */
const FormAssociatedMixin = <T extends Constructor<HTMLElement>>(
  Base: T
): {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new (...args: any[]): {
    _internals: ElementInternals;
    _attachInternalsClaimed: boolean;
    attachInternals(): ElementInternals;
    _fieldsetDisabled: boolean;
    _fieldsetDisabledControls: Set<HTMLInputElement>;
    _getFormValue(): FormValue;
    _getFormState(): FormValue;
    _syncFormValue(): void;
    _syncValidity(): void;
    _validationAnchor(): HTMLElement | undefined;
    _handleFormdata(event: Event): void;
    updated(changed: Map<PropertyKey, unknown>): void;
    readonly form: HTMLFormElement | null;
    readonly labels: NodeList;
    readonly validity: ValidityState;
    readonly validationMessage: string;
    readonly willValidate: boolean;
    checkValidity(): boolean;
    reportValidity(): boolean;
    formResetCallback(): void;
    formDisabledCallback(disabled: boolean): void;
    formStateRestoreCallback(state: FormValue, mode: string): void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    requestUpdate(name?: PropertyKey, oldValue?: unknown, options?: any): void;
    connectedCallback(): void;
  };
  formValueProperties: string[];
} & T => {
  abstract class FormAssociatedImpl extends Base {
    /**
     * support v12 preview tag names
     */
    static finalize() {
      // @ts-expect-error -- `finalize` comes from ReactiveElement.
      const finalized = super.finalize();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const self = this as any;
      const tag: string | undefined = self.is;
      if (!tag?.includes('-preview-') || !Array.isArray(self.elementStyles)) {
        return finalized;
      }
      const base = tag.replace('-preview-', '-');
      self.elementStyles = self.elementStyles.map((style: CSSResult) => {
        const css = String(style.cssText);
        const rewritten = css.replace(
          /:host\(([^)]*)\)/g,
          (whole: string, arg: string) =>
            arg.includes(base) ? `:host(${arg.split(base).join(tag)})` : whole
        );
        return rewritten === css ? style : unsafeCSS(rewritten);
      });
      return finalized;
    }

    /**
     * Marks the element as a form-associated custom element.
     *
     * Read by the browser once, at `customElements.define()`. It cannot be
     * toggled per instance or after registration, which is why form
     * association is under separate `cds-preview-*` tags rather than behind
     * a runtime feature flag.
     */
    static formAssociated = true;

    /**
     * The properties whose changes affect the submitted value.
     *
     * Components extend this list when their value comes from elsewhere.
     */
    static formValueProperties: string[] = [
      'value',
      'checked',
      'disabled',
      'name',
    ];

    /**
     * The element's `ElementInternals`.
     *
     * Grabbed with `super.attachInternals()` so that the override below — which
     * shields downstream subclasses — does not see this call.
     *
     * @protected
     */
    _internals: ElementInternals = super.attachInternals();

    /**
     * `true` once a subclass has claimed the internals.
     */
    _attachInternalsClaimed = false;

    /**
     * Hands a subclass the internals this element already attached.
     *
     * A subclass that calls `attachInternals()` itself — the workaround people
     * wrote while waiting for form association — would otherwise throw inside
     * its own constructor. That failure does not propagate to `createElement()`
     * or the parser: it surfaces as an uncaught error and leaves a silently
     * dead element. Returning the existing internals keeps that code working.
     * A second claim still provokes the native error.
     *
     * This mirrors the approach in `@lit-labs/forms`.
     */
    attachInternals(): ElementInternals {
      if (this._attachInternalsClaimed) {
        // Provoke the native error for a genuine double-attach.
        super.attachInternals();
      }
      this._attachInternalsClaimed = true;
      return this._internals;
    }

    /**
     * `true` while an ancestor `<fieldset>` is disabled.
     *
     * @protected
     */
    _fieldsetDisabled = false;

    /**
     * The rendered controls this mix-in disabled on behalf of an ancestor
     * `<fieldset>`, so that leaving it restores exactly those.
     *
     * @protected
     */
    _fieldsetDisabledControls = new Set<HTMLInputElement>();

    /**
     * The value this element contributes to its form.
     *
     * The default reproduces what every v2 `_handleFormdata` did — submit
     * `value` unless disabled — so most components need no override. Controls
     * whose value is not a plain `value` property (a checkbox, say) override
     * this. Returning `null` submits no entry.
     *
     * @protected
     */
    _getFormValue(): FormValue {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { disabled, value } = this as any;
      if (disabled || value === undefined || value === null) {
        return null;
      }
      return String(value);
    }

    /**
     * The state this element restores from, when it differs from the value.
     *
     * `setFormValue()` takes both. The state is what the browser hands back to
     * `formStateRestoreCallback` — for a checkbox the value is `"on"` but the
     * state is its checkedness, which is what makes session restore correct.
     *
     * @protected
     */
    _getFormState(): FormValue {
      return this._getFormValue();
    }

    /**
     * Pushes the current value and validity into the form.
     *
     * @protected
     */
    _syncFormValue() {
      this._internals.setFormValue(this._getFormValue(), this._getFormState());
      this._syncValidity();
    }

    /**
     * Mirrors the rendered control's constraints onto the host.
     *
     * The inner `<input>` already carries `pattern`, `min`, `minlength`, `type`
     * and the rest, so its `validity` is copied up rather than reimplemented.
     * `required` is checked against the host's own form value first, for
     * controls whose value is not an inner input's value.
     *
     * `invalid` stays presentational — it styles the control without blocking
     * submission, as it always has.
     *
     * @protected
     */
    _syncValidity() {
      const anchor = this._validationAnchor();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { required, requiredValidityMessage } = this as any;

      if (required && !this._getFormValue()) {
        this._internals.setValidity(
          { valueMissing: true },
          requiredValidityMessage || 'Please fill out this field.',
          anchor
        );
        return;
      }

      const native = (anchor as HTMLInputElement | undefined)?.validity;
      if (native && !native.valid) {
        const flags: ValidityStateFlags = {};
        for (const flag in native) {
          if (flag !== 'valid' && native[flag as keyof ValidityState]) {
            flags[flag as keyof ValidityStateFlags] = true;
          }
        }
        this._internals.setValidity(
          flags,
          (anchor as HTMLInputElement).validationMessage,
          anchor
        );
        return;
      }

      this._internals.setValidity({});
    }

    /**
     * The element the browser points its validation bubble at.
     *
     * @protected
     */
    _validationAnchor(): HTMLElement | undefined {
      return (
        (this.shadowRoot?.querySelector(
          'input, select, textarea'
        ) as HTMLElement) ?? undefined
      );
    }

    /**
     * Neutralizes the deprecated `formdata` path inherited from `FormMixin`.
     *
     * Without this the element submits twice — once from the legacy listener
     * and once from `setFormValue()`.
     */
    _handleFormdata() {
      // Intentionally empty. `setFormValue()` is the only submission path.
    }

    /**
     * Applies the effective disabled state to the rendered control.
     *
     * `disabled` deliberately reports only this element's own attribute, the
     * way `HTMLInputElement.disabled` does — an element inside a disabled
     * `<fieldset>` reports `false` and matches `:disabled` instead. Use
     * `el.matches(':disabled')` for the effective state.
     *
     * A native UA still makes such a control non-interactive. That does not
     * reach shadow content on its own — a shadow `<input>` inside a disabled
     * `<fieldset>` stays focusable and editable — so the rendered control is
     * disabled here to match what the platform does for a built-in.
     */
    updated(changed: Map<PropertyKey, unknown>) {
      // @ts-expect-error -- `updated` comes from LitElement.
      super.updated(changed);
      const controls = this.shadowRoot?.querySelectorAll<HTMLInputElement>(
        'input, select, textarea, button'
      );
      if (this._fieldsetDisabled) {
        // Only touch controls that are not already disabled for reasons of
        // their own, and remember them so they can be restored exactly.
        controls?.forEach((control) => {
          if (!control.disabled) {
            control.disabled = true;
            this._fieldsetDisabledControls.add(control);
          }
        });
        return;
      }
      if (this._fieldsetDisabledControls.size === 0) {
        return;
      }
      // Re-rendering does not undo this: the template binds the element's own
      // `disabled`, which never changed, so Lit sees no change to apply.
      this._fieldsetDisabledControls.forEach((control) => {
        control.disabled = false;
      });
      this._fieldsetDisabledControls.clear();
    }

    /**
     * The containing form, or `null`.
     */
    get form() {
      return this._internals.form;
    }

    /**
     * The `<label>` elements associated with this control.
     */
    get labels() {
      return this._internals.labels;
    }

    get validity() {
      return this._internals.validity;
    }

    get validationMessage() {
      return this._internals.validationMessage;
    }

    get willValidate() {
      return this._internals.willValidate;
    }

    checkValidity() {
      return this._internals.checkValidity();
    }

    reportValidity() {
      return this._internals.reportValidity();
    }

    /**
     * Restores the element to its default state on `form.reset()`.
     *
     * Components override this. The native default comes from content
     * attributes, not from the current property values.
     */
    formResetCallback() {
      // Native controls reset to the default their content attribute defines,
      // not to their current property value.
      if ('value' in this) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (this as any).value = this.getAttribute('value') ?? '';
      }
      this._syncFormValue();
    }

    /**
     * Called when an ancestor `<fieldset>` is enabled or disabled.
     */
    formDisabledCallback(disabled: boolean) {
      // Only the rendered control changes. `disabled` stays the element's own
      // attribute, and the browser already excludes a fieldset-disabled
      // control from submission without help.
      this._fieldsetDisabled = disabled;
      this.requestUpdate();
    }

    /**
     * Called when the browser restores state, e.g. on session restore.
     */
    formStateRestoreCallback() {
      // Components override this when they can restore from a submitted value.
    }

    /**
     * Pushes the form value on every relevant property change.
     *
     * Lit calls this synchronously from its generated setters, which is what
     * keeps the submitted value in step with the property the way a native
     * control does.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    requestUpdate(name?: PropertyKey, oldValue?: unknown, options?: any) {
      // @ts-expect-error -- `requestUpdate` comes from LitElement.
      super.requestUpdate(name, oldValue, options);
      // Guard: the base constructor can call this before `_internals` exists.
      if (!this._internals) {
        return;
      }
      // `setFormValue()` reads the `name` *content attribute*, and Lit reflects
      // asynchronously. Writing it here — from the same synchronous hook — is
      // what keeps a name set as a property (which is what framework template
      // bindings do) readable by a `new FormData(form)` in the same task.
      if (name === undefined || name === 'name') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const current = String((this as any).name ?? '');
        if (current && this.getAttribute('name') !== current) {
          this.setAttribute('name', current);
        }
      }
      const { formValueProperties } = this
        .constructor as typeof FormAssociatedImpl;
      if (name === undefined || formValueProperties.includes(String(name))) {
        this._syncFormValue();
      }
    }

    connectedCallback() {
      // @ts-expect-error -- `connectedCallback` comes from LitElement.
      super.connectedCallback();
      this._syncFormValue();
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return FormAssociatedImpl as any;
};

export default FormAssociatedMixin;
