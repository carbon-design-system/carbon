/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useRef, useState } from 'react';

/**
 * Returns a debounced value that delays being updated until after `wait`
 * milliseconds have elapsed since the last time the value was changed. The
 * result of this hook comes with a `cancel` method to cancel delayed updates.
 * It also supports options for when the value should be updated relative to
 * the timer, on the leading and/or trailing edge.
 *
 * @param {any} value
 * @param {number} wait
 * @param {object} options
 * @param {boolean} options.leading
 * @param {number} options.maxWait
 * @param {boolean} options.trailing
 * @returns {[any, Function]}
 */
export function useDebounce(value, wait = 0, options = {}) {
  const { leading = false, maxWait, trailing = true } = options;
  const [debouncedValue, setDebouncedValue] = useState(value);

  // We keep track of several mutable values across renders given that we often
  // want to know information about when the render itself has occurred in order
  // to correctly debounce the value.
  const savedValue = useRef(value);
  const timerId = useRef(null);
  // We keep track of `lastCallTime` so that we can determine if enough time has
  // passed for us to update the debounced value
  const lastCallTime = useRef(null);
  // We keep track of `lastUpdate` so that we can determine if enough time has
  // passed that our `maxWait` threshold has been hit
  const lastUpdate = useRef(null);

  /**
   * Cancel any currently running timers and reset any internal mutable values
   * that we're tracking
   */
  function cancel() {
    if (timerId.current !== null) {
      clearTimeout(timerId.current);
    }
    timerId.current = null;
    lastCallTime.current = null;
  }

  // We'll need to cancel any existing timers if any of the configuration
  // options for the timer have changed, or if the hook itself has been
  // un-mounted. We separate out this cancellation from the debounce effect
  // below so that we're not cancelling timers we create every time the
  // value has changed.
  useEffect(cancel, [wait, leading, trailing]);
  useEffect(() => cancel, []);

  // Each time our value changes, we're going to run our "debounce" effect that
  // will try and create a new timer if one does not exist already. It's
  // important that this hook runs after the cancellation hooks above so that
  // any timers associated with a previous configuration value have been
  // cancelled.
  useEffect(() => {
    // If our values are the same, there's no reason to kick-off a timer. This
    // check is important so that the first value received does not schedule a
    // timer.
    if (value === debouncedValue) {
      return;
    }

    // For each call to our debounce effect we're going to keep track
    // of the current value and the time when this effect was invoked. We keep
    // track of both so that when our timers are invoked we have fresh values
    // for both to determine either what value to update internal state with, or
    // how long a new timer needs to be created for.
    savedValue.current = value;
    lastCallTime.current = Date.now();

    // If we already have a timer, no need to create another one.
    if (timerId.current !== null) {
      return;
    }

    /**
     * Determine if we should update the `debouncedValue`. There are two signals
     * where we should update, namely if we've waited enough time or if we've hit
     * the `maxWait` threshold
     * @param {number} time
     */
    function shouldUpdate(time) {
      const timeSinceLastCall = time - lastCallTime.current;
      const timeSinceLastUpdate = time - lastUpdate.current;
      return (
        timeSinceLastCall >= wait || (maxWait && timeSinceLastUpdate >= maxWait)
      );
    }

    /**
     * Used as the handler to our `setTimeout` calls. This function will determine
     * if we are able to update the debouncedValue, or if we'll need to schedule a
     * timer to run for the remaining time.
     */
    function timerExpired() {
      const time = Date.now();
      if (shouldUpdate(time)) {
        if (trailing) {
          lastUpdate.current = Date.now();
          setDebouncedValue(savedValue.current);
        }

        timerId.current = null;
        lastCallTime.current = null;
        return;
      }
      timerId.current = setTimeout(timerExpired, getRemainingTime(time));
    }

    /**
     * Get the remaining time for a `setTimeout` call based on the current `time`.
     * If `maxWait` has been specified, we'll choose the minimum between how long
     * we've been waiting and how much time we have left before hitting our
     * `maxWait` threshold. Otherwise, we'll use the time since the last call to
     * schedule the timer.
     * @param {number} time
     */
    function getRemainingTime(time) {
      const timeSinceLastCall = time - lastCallTime.current;
      const timeSinceLastUpdate = time - lastUpdate.current;
      const timeWaiting = wait - timeSinceLastCall;
      return maxWait
        ? Math.min(timeWaiting, maxWait - timeSinceLastUpdate)
        : timeSinceLastCall;
    }

    timerId.current = setTimeout(timerExpired, wait);

    // If a user has specified the `leading` option, let's update the
    // debounced value immediately
    if (leading) {
      lastUpdate.current = Date.now();
      setDebouncedValue(savedValue.current);
    }
  }, [value, debouncedValue, wait, leading, trailing, maxWait]);

  return [debouncedValue, cancel];
}
