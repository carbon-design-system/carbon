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
 * Next gen of Carbon component design.
 */
export const componentsX = false;

/**
 * Support for prop -> state sync of `<Slider>` value.
 */
export const sliderValuePropSync = false;
