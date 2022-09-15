/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { moduleMetadata } from '@storybook/angular';
import baseStory, { Default as baseDefault } from './breadcrumb-story';

export const Default = () => ({
  template: `
    <bx-breadcrumb>
      <bx-breadcrumb-item>
        <bx-breadcrumb-link href="/#">Breadcrumb 1</bx-breadcrumb-link>
      </bx-breadcrumb-item>
      <bx-breadcrumb-item>
        <bx-breadcrumb-link href="/#">Breadcrumb 2</bx-breadcrumb-link>
      </bx-breadcrumb-item>
      <bx-breadcrumb-item>
        <bx-breadcrumb-link href="/#" aria-current="page">Breadcrumb 3</bx-breadcrumb-link>
      </bx-breadcrumb-item>
    </bx-breadcrumb>
  `,
});

Object.assign(Default, baseDefault);

export default Object.assign(baseStory, {
  decorators: [
    moduleMetadata({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }),
  ],
});

export const withOverflowMenu = () => ({
  template: `
    <bx-breadcrumb>
      <bx-breadcrumb-item>
        <bx-breadcrumb-link href="/#">Breadcrumb 1</bx-breadcrumb-link>
      </bx-breadcrumb-item>
      <bx-breadcrumb-item>
        <bx-breadcrumb-link href="/#">Breadcrumb 2</bx-breadcrumb-link>
      </bx-breadcrumb-item>
      <bx-breadcrumb-item>
        <bx-breadcrumb-overflow-menu>
          <bx-overflow-menu-body>
            <bx-overflow-menu-item>Option 1</bx-overflow-menu-item>
            <bx-overflow-menu-item>Option 2</bx-overflow-menu-item>
          </bx-overflow-menu-body>
        </bx-breadcrumb-overflow-menu>
      </bx-breadcrumb-item>
      <bx-breadcrumb-item>
        <bx-breadcrumb-link href="/#" aria-current="page">Breadcrumb 3</bx-breadcrumb-link>
      </bx-breadcrumb-item>
    </bx-breadcrumb>
  `,
});
