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
 * Uses `value` prop to turn several components to controlled mode, notablly `<NumberInput>`.
 * The "controlled mode" detection is done in component creation time and _never_ changes after creation.
 * To ensure the component is in controlled mode, define a `value` prop at creation time.
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
 * * _Without_ this feature flag the event handler has `onChange(event, direction)`.
 */
export const useControlledStateWithValue = false;
