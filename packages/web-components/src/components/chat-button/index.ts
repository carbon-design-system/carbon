/**
 * Copyright IBM Corp. 2021, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defineCustomElement } from '../../globals/register';
import '../button/index';
import CDSChatButton from './chat-button';
import CDSChatButtonSkeleton from './chat-button-skeleton';

export { CDSChatButton, CDSChatButtonSkeleton };

defineCustomElement(CDSChatButton);
defineCustomElement(CDSChatButtonSkeleton);
