/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { RefObject } from 'react';
import { useNoInteractiveChildren } from '../../internal/useNoInteractiveChildren';
import { useFeatureFlag } from './index';

/**
 * Warn about interactive label content in v11 and enforce it in v12.
 */
export const useNoInteractiveChildrenForLabel = (
  ref: RefObject<HTMLElement | null>,
  message: string
) => {
  const enableV12Release = useFeatureFlag('enable-v12-release');
  const migrationMessage = `${message}. Render interactive content as a sibling of the label or use the \`decorator\` prop when available`;

  useNoInteractiveChildren(ref, migrationMessage, {
    shouldThrow: enableV12Release,
  });
};
