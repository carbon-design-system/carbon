/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Add16 from '@carbon/icons-react/es/add/16';
// Below path will be there when an application installs `carbon-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import BXBtn from 'carbon-web-components/es/components-react/button/button';
// @ts-ignore
import BXBtnSkeleton from 'carbon-web-components/es/components-react/button/button-skeleton';
import {
  Default as baseDefault,
  icon as baseIcon,
  textAndIcon as baseTextAndIcon,
  skeleton as baseSkeleton,
} from './button-story';

export { default } from './button-story';

export const Default = args => {
  const { kind, disabled, size, href, isExpressive } = args?.['bx-btn'];
  return (
    <BXBtn kind={kind} disabled={disabled} size={size} href={href} isExpressive={isExpressive}>
      Button
    </BXBtn>
  );
};

Object.assign(Default, baseDefault);

export const icon = args => {
  const { kind, disabled, size, href, isExpressive } = args?.['bx-btn'];
  return (
    <BXBtn kind={kind} disabled={disabled} size={size} href={href} isExpressive={isExpressive}>
      <Add16 slot="icon" />
    </BXBtn>
  );
};

Object.assign(icon, baseIcon);

export const textAndIcon = args => {
  const { kind, disabled, size, href, iconLayout, isExpressive } = args?.['bx-btn'];
  return (
    <BXBtn kind={kind} disabled={disabled} size={size} href={href} iconLayout={iconLayout} isExpressive={isExpressive}>
      Button <Add16 slot="icon" />
    </BXBtn>
  );
};

Object.assign(textAndIcon, baseTextAndIcon);

export const skeleton = args => {
  const { disabled, size, href, isExpressive } = args?.['bx-btn-skeleton'];
  return <BXBtnSkeleton disabled={disabled} size={size} href={href} isExpressive={isExpressive}></BXBtnSkeleton>;
};

Object.assign(skeleton, baseSkeleton);
