/**
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import addTriageLabel from './add-triage-label.js';
import addIssueResponse from './add-issue-response.js';

export const plugins = [addTriageLabel, addIssueResponse];
