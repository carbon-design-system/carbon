/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import pickBy from 'lodash-es/pickBy';

/**
 * @param props A key-value pair of properties to bind to a Vue component.
 * @returns The converted version of the given `props`, to be used for Vue data binding.
 */
const convertProps = (props: { [key: string]: any }) =>
  Object.keys(props).reduce(
    (acc, key) => ({
      ...acc,
      [key]: {
        default: props[key],
      },
    }),
    {}
  );

/**
 * @param props A key-value pair of properties to bind to a Vue component.
 * @returns Vue binding data from the given `props`.
 */
const createVueBindingsFromProps = (props: { [key: string]: any }) => ({
  props: convertProps(pickBy(props, value => typeof value !== 'function')),
  methods: pickBy(props, value => typeof value === 'function'),
});

export default createVueBindingsFromProps;
