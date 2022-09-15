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
import BXContentSwitcher from 'carbon-web-components/es/components-react/content-switcher/content-switcher';
// @ts-ignore
import BXContentSwitcherItem from 'carbon-web-components/es/components-react/content-switcher/content-switcher-item';
import { Default as baseDefault } from './content-switcher-story';

export { default } from './content-switcher-story';

export const Default = args => {
  const { value, disableSelection, onBeforeSelect, onSelect, size } = args?.['bx-content-switcher'];
  const handleBeforeSelected = (event: CustomEvent) => {
    onBeforeSelect(event);
    if (disableSelection) {
      event.preventDefault();
    }
  };
  return (
    <BXContentSwitcher value={value} onBeforeSelect={handleBeforeSelected} onSelect={onSelect} size={size}>
      <BXContentSwitcherItem value="all">Option 1</BXContentSwitcherItem>
      <BXContentSwitcherItem value="cloudFoundry" disabled>
        Option 2
      </BXContentSwitcherItem>
      <BXContentSwitcherItem value="staging">Option 3</BXContentSwitcherItem>
      <BXContentSwitcherItem value="dea">Option 4</BXContentSwitcherItem>
      <BXContentSwitcherItem value="router">Option 5</BXContentSwitcherItem>
    </BXContentSwitcher>
  );
};

Object.assign(Default, baseDefault);
