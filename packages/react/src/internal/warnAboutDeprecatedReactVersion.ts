/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { warning } from './warning';

let didWarnAboutDeprecatedReactVersion = false;

function getReactMajorVersion(version: string | undefined) {
  if (typeof version !== 'string') {
    return null;
  }

  const match = version.match(/^(\d+)/);
  return match ? Number(match[1]) : null;
}

export function warnAboutDeprecatedReactVersion(version?: string) {
  if (
    process.env.NODE_ENV === 'production' ||
    didWarnAboutDeprecatedReactVersion
  ) {
    return;
  }

  const reactVersion =
    version ?? (React as { version?: string } | undefined)?.version;
  const major = getReactMajorVersion(reactVersion);

  if (major === 16 || major === 17) {
    didWarnAboutDeprecatedReactVersion = true;

    warning(
      false,
      `Detected React ${reactVersion}. Support for React 16 and React 17 ` +
        'is deprecated in Carbon v11 (@carbon/react v1.x) and will be ' +
        'removed in Carbon v12 (@carbon/react v2.x). Please upgrade your ' +
        'project to React 18 or later. For more information, visit ' +
        'https://carbondesignsystem.com/deprecations.'
    );
  }
}

warnAboutDeprecatedReactVersion();
