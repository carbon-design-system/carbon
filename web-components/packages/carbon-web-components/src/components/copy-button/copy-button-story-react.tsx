/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
// Below path will be there when an application installs `carbon-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import BXCopyButton from 'carbon-web-components/es/components-react/copy-button/copy-button';
import { Default as baseDefault } from './copy-button-story';

export { default } from './copy-button-story';

export const Default = args => {
  const { buttonAssistiveText, feedbackText, feedbackTimeout, onClick } = args?.['bx-copy-button'];
  return (
    <BXCopyButton
      buttonAssistiveText={buttonAssistiveText}
      feedbackText={feedbackText || undefined}
      feedbackTimeout={feedbackTimeout}
      onClick={onClick}
    />
  );
};

Object.assign(Default, baseDefault);
