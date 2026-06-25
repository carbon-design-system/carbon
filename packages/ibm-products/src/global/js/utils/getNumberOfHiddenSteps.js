/**
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export const getNumberOfHiddenSteps = (stepData, initialStep) => {
  let numberOfHiddenSteps = 0;
  stepData.forEach((step, stepIndex) => {
    if (stepIndex + 1 > initialStep) {
      return;
    }
    if (step.shouldIncludeStep === false) {
      numberOfHiddenSteps += 1;
    }
  });
  return numberOfHiddenSteps;
};
