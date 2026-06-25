/**
 * Copyright IBM Corp. 2021, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useContext } from 'react';
import { ConditionBuilderContext } from '../ConditionBuilderContext/ConditionBuilderProvider';
import { translationsObject } from '../ConditionBuilderContext/translationObject';

export const useTranslations = (translationKeys, alterTranslationKeyMap) => {
  const { translateWithId } = useContext(ConditionBuilderContext);
  return translationKeys.map((translationKey) => {
    if (alterTranslationKeyMap?.[translationKey]) {
      translationKey = alterTranslationKeyMap[translationKey];
    }
    if (
      translateWithId?.(translationKey) &&
      translateWithId?.(translationKey) !== translationKey
    ) {
      return translateWithId(translationKey);
    } else if (translationsObject[translationKey]) {
      return translationsObject[translationKey];
    } else {
      return translationKey;
    }
  });
};
