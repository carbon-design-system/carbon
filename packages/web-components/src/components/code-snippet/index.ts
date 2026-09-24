/**
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defineCustomElement } from '../../globals/register';
import '../button/index';
import '../copy/index';
import CDSCodeSnippet from './code-snippet';
import CDSCodeSnippetSkeleton from './code-snippet-skeleton';

export { CDSCodeSnippet, CDSCodeSnippetSkeleton };

defineCustomElement(CDSCodeSnippet);
defineCustomElement(CDSCodeSnippetSkeleton);
