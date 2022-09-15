/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
// Below path will be there when an application installs `carbon-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import BXTag from 'carbon-web-components/es/components-react/tag/tag';
// @ts-ignore
import BXFilterTag from 'carbon-web-components/es/components-react/tag/filter-tag';
import { Default as baseDefault, filter as baseFilter } from './tag-story';

export { default } from './tag-story';

export const Default = args => {
  const { size, type, title, disabled } = args?.['bx-tag'];
  return (
    <BXTag size={size} type={type} title={title} disabled={disabled}>
      This is a tag
    </BXTag>
  );
};

Object.assign(Default, baseDefault);

export const filter = args => {
  const { open, size, type, title, disabled, disableClose, onClick, onBeforeClose, onClose } = args?.['bx-filter-tag'];
  const handleBeforeClose = (event: CustomEvent) => {
    onBeforeClose(event);
    if (disableClose) {
      event.preventDefault();
    }
  };
  return (
    <BXFilterTag
      open={open}
      size={size}
      type={type}
      title={title}
      disabled={disabled}
      onClick={onClick}
      onBeforeClose={handleBeforeClose}
      onClose={onClose}>
      This is a tag
    </BXFilterTag>
  );
};

Object.assign(filter, baseFilter);
