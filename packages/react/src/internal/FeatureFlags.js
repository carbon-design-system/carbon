/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * This file contains the list of the default values of compile-time feature flags.
 *
 * Build toolchain can replace variable here and/or the references
 * in order to apply non-default values to those feature flags.
 *
 * @example Render `foo` if `aFeatureFlag` is `true`, render `bar` otherwise.
 * import { aFeatureFlag } from '/path/to/FeatureFlags';
 * ...
 * const MyComponent = props => (<div {...props}>{aFeatureFlag ? 'foo' : 'bar'}</div>);
 */

/**
 * With this flag, certain components will be created in either a controlled or controlled
 * mode based on the existence of a value prop.
 *
 * The following components will have the significance of their props slightly altered as outlined below.
 *
 * Components: `<NumberInput>`
 *
 * * `value` → when provided, enables controlled mode.
 *   For the rest of the component's lifecycle, it will be controlled by this prop as it's single source of truth.
 * * `defaultValue` → Optional starting value, used for for uncontrolled mode only (no value prop).
 *   The value prop takes precedence over defaultValue.
 * * `onChange` → Optional event handler.
 *   However, if value is provided and a handler is not, we'll throw a warning indicating the component is now read-only
 * * `readOnly` → silences the above warning, acknowledging the read-only state of the component
 *
 * This flag also disables prop -> state sync in several components, notablly `<NumberInput>`.
 *
 * This flag also updates event handlers to pass an up-to-date value in the second parameter,
 * so applications can use it in both controlled and uncontrolled components.
 *
 * * _With_ this feature flag, the signature of the event handler will be altered to provide additional context in the second parameter: `onChange(event, { value, ...rest })` where:
 *   * `event` is the (React) raw event
 *   * `value` is the new value
 *   * `rest` tells you additional information based on the source component
 * * _Without_ this feature flag the event handler has component-specific signature, e.g. `onChange(event, direction)`.
 */
export const useControlledStateWithValue = false;
