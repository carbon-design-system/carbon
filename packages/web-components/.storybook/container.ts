/**
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, TemplateResult } from 'lit';
import '../src/components/skip-to-content/skip-to-content';

/**
 * @param options The rendering options.
 * @param [options.hasMainTag] `true` if the story itself has `<main>` tag.
 * @param [options.children] The story content.
 * @returns The content that wraps the story.
 */
const container = ({
  children,
}: {
  hasMainTag?: boolean;
  children: TemplateResult;
}) => html` ${children} `;

export default container;
