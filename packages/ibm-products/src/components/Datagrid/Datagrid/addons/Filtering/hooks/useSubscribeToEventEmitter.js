/**
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useContext } from 'react';
import { FilterContext } from '../FilterProvider';

/**
 * Subscribes to the filter event emitter
 * @param  {string} type - the type of event to call
 * @param  {Function} callback - a callback to run when the event is dispatched
 */
const useSubscribeToEventEmitter = (type, callback) => {
  const { EventEmitter } = useContext(FilterContext);

  useEffect(function subscribeToEmitter() {
    // This event is emitted from the DatagridToolbar component when clearFilters is clicked in FilterSummary
    EventEmitter.subscribe(type, callback);
  });
};

export default useSubscribeToEventEmitter;
