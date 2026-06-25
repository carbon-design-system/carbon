/**
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useState, useEffect } from 'react';
import { pkg } from '../../settings';

const useExample = (initialTime) => {
  // NOTE: hooks cannot be called conditionally.
  //
  // ** If the hook uses other hooks then they must be called,
  // ** this could lead to unexpected behavior.
  // ** As some hooks may still be called even if the condition is false.

  const [time, setTime] = useState(
    // Disable hook in a safe way if possible, else use despite feature disabled.
    // Either a console error or warning will be logged.
    initialTime
  );

  // Use of the feature flag to
  const feature = 'ExampleComponent.useExample';
  const tryFeature = initialTime !== undefined;
  const featureEnabled = tryFeature && pkg.checkReportFeatureEnabled(feature);
  if (tryFeature && !featureEnabled) {
    // Output a useful message if the feature is disabled.
    console.warn(
      `Disabled feature "${feature}" does not change the initialTime.`
    );
  }

  // Actual hook is code is below
  useEffect(() => {
    if (!featureEnabled) {
      return;
    }

    // turn off all or part of the feature
    if (time > 0) {
      setTimeout(() => {
        setTime(Math.max(0, time - 0.1));
      }, 100);
    }
  }, [featureEnabled, time]);

  return [time];
};

export default useExample;
