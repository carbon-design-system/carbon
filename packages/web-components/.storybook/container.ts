/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, TemplateResult } from 'lit';
import containerStyles from './_container.scss?lit'; // eslint-disable-line import/first
import '../src/components/skip-to-content/skip-to-content';

/**
 * @param options The rendering options.
 * @param [options.hasMainTag] `true` if the story itself has `<main>` tag.
 * @param [options.children] The story content.
 * @returns The content that wraps the story.
 */
const container = ({
  hasMainTag,
  children,
}: {
  hasMainTag?: boolean;
  children: TemplateResult;
}) => html`
  <style>
    ${containerStyles}
  </style>
  <cds-skip-to-content href="#main-content"></cds-skip-to-content>
  <div
    id="main-content"
    name="main-content"
    data-floating-menu-container
    role="${hasMainTag ? 'none' : 'main'}">
    ${children}
  </div>
`;

export default container;
