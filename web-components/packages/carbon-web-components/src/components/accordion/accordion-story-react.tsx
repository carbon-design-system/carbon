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
import BXAccordion from 'carbon-web-components/es/components-react/accordion/accordion';
// @ts-ignore
import BXAccordionItem from 'carbon-web-components/es/components-react/accordion/accordion-item';
import { Default as baseDefault } from './accordion-story';

export { default } from './accordion-story';

export const Default = args => {
  const { disabled, open, titleText, disableToggle, onBeforeToggle, onToggle, size } = args?.['bx-accordion'];
  const handleBeforeToggle = (event: CustomEvent) => {
    onBeforeToggle(event);
    if (disableToggle) {
      event.preventDefault();
    }
  };
  return (
    <BXAccordion>
      <BXAccordionItem
        open={open}
        titleText={titleText}
        onBeforeToggle={handleBeforeToggle}
        onToggle={onToggle}
        disabled={disabled}
        size={size}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </BXAccordionItem>
      <BXAccordionItem open={open} titleText={titleText} onBeforeToggle={handleBeforeToggle} onToggle={onToggle}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </BXAccordionItem>
      <BXAccordionItem open={open} onBeforeToggle={handleBeforeToggle} onToggle={onToggle}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <span slot="title">{titleText}</span>
      </BXAccordionItem>
    </BXAccordion>
  );
};

Object.assign(Default, baseDefault);
