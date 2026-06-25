/**
 * @license
 *
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import TriangleRightOutline16 from '@carbon/icons/es/triangle--right--outline/16.js';
import Deploy16 from '@carbon/icons/es/deploy/16.js';
import BuildTool from '@carbon/icons/es/build-tool/16.js';
import TestTool from '@carbon/icons/es/test-tool/16.js';
import Scan from '@carbon/icons/es/scan/16.js';
import DataFormat from '@carbon/icons/es/data--format/16.js';
import Debug from '@carbon/icons/es/debug/16.js';
import User from '@carbon/icons/es/user/16.js';
import Analytics from '@carbon/icons/es/analytics/16.js';
import Async from '@carbon/icons/es/async/16.js';
import Upload from '@carbon/icons/es/upload/16.js';
import { iconLoader } from "@carbon/web-components/es/globals/internal/icon-loader.js";
import { TemplateResult } from 'lit';

export interface ActionData {
  text: string;
  icon: TemplateResult;
  onClick: () => void;
}

const actionWords =
  'Run Deploy Build Test Scan Format Debug Profile Analyze Sync Upload';
const actionWordList = actionWords.split(/\s+/);

const actionIcons: (() => TemplateResult)[] = [
  () => iconLoader(TriangleRightOutline16, { slot: 'icon' }),
  () => iconLoader(Deploy16, { slot: 'icon' }),
  () => iconLoader(BuildTool, { slot: 'icon' }),
  () => iconLoader(TestTool, { slot: 'icon' }),
  () => iconLoader(Scan, { slot: 'icon' }),
  () => iconLoader(DataFormat, { slot: 'icon' }),
  () => iconLoader(Debug, { slot: 'icon' }),
  () => iconLoader(User, { slot: 'icon' }),
  () => iconLoader(Analytics, { slot: 'icon' }),
  () => iconLoader(Async, { slot: 'icon' }),
  () => iconLoader(Upload, { slot: 'icon' }),
];

interface GenerateActionsOptions {
  count: number;
  size?: string;
  onClick?: (text: string) => void;
}

export function generateActions({
  count,
  size,
  onClick = (text) => alert(`Clicked action: ${text}`),
}: GenerateActionsOptions): ActionData[] {
  return Array.from({ length: count }, (_, index) => {
    const text = actionWordList[index % actionWordList.length];
    const iconFn = actionIcons[index % actionIcons.length];

    return {
      text,
      icon: iconFn(),
      size,
      onClick: () => onClick(text),
    };
  });
}

export const actionsData = generateActions({ count: 12 });
