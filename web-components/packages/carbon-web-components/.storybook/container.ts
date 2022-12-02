/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-html';
import type { TemplateResult } from 'lit-html';
import '../src/components/skip-to-content/skip-to-content';
import containerStyles from './_container.scss'; // eslint-disable-line import/first

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
  <bx-skip-to-content href="#main-content"></bx-skip-to-content>
  <div
    id="main-content"
    name="main-content"
    data-floating-menu-container
    role="${hasMainTag ? 'none' : 'main'}"
    class="bx--body bx-ce-demo-devenv--container">
    ${children}
  </div>
`;

export default container;
