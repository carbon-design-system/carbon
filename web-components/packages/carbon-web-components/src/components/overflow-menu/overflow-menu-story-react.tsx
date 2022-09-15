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
import BXOverflowMenu from 'carbon-web-components/es/components-react/overflow-menu/overflow-menu';
// @ts-ignore
import BXOverflowMenuBody from 'carbon-web-components/es/components-react/overflow-menu/overflow-menu-body';
// @ts-ignore
import BXOverflowMenuItem from 'carbon-web-components/es/components-react/overflow-menu/overflow-menu-item';
import { Default as baseDefault } from './overflow-menu-story';

export { default } from './overflow-menu-story';

export const Default = args => {
  const { open, colorScheme, disabled, direction, size } = args?.['bx-overflow-menu'];
  return (
    <BXOverflowMenu colorScheme={colorScheme} disabled={disabled} open={open} size={size}>
      <BXOverflowMenuBody direction={direction}>
        <BXOverflowMenuItem>Option 1</BXOverflowMenuItem>
        <BXOverflowMenuItem>Option 2</BXOverflowMenuItem>
        <BXOverflowMenuItem>Option 3</BXOverflowMenuItem>
        <BXOverflowMenuItem>Option 4</BXOverflowMenuItem>
        <BXOverflowMenuItem>Option 5</BXOverflowMenuItem>
      </BXOverflowMenuBody>
    </BXOverflowMenu>
  );
};

Object.assign(Default, baseDefault);
