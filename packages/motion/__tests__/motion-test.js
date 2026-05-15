/**
 * Copyright IBM Corp. 2018, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

import { SassRenderer } from '@carbon/test-utils/scss';
import * as CarbonMotion from '../src';

const { render } = SassRenderer.create(__dirname);

describe('@carbon/motion', () => {
  test('Public API', () => {
    expect(CarbonMotion).toMatchSnapshot();
  });

  test('@carbon/motion/scss/motion.scss', async () => {
    const { getValue } = await render(`
      @use 'sass:meta';
      @use '../index.scss' as motion;

      $_: get-value(meta.module-variables('motion'));
    `);
    const variables = getValue(0);
    expect(Object.keys(variables)).toMatchSnapshot();
  });

  test('should throw for unknown easing name', () => {
    expect(() => CarbonMotion.motion('nope', 'productive')).toThrow(
      'Unable to find easing `nope` in our supported easings. Expected one of: standard, entrance, exit'
    );
  });

  test('should throw for unknown easing mode', () => {
    expect(() => CarbonMotion.motion('standard', 'nope')).toThrow(
      'Unable to find a mode for the easing `standard` called: `nope`. Expected one of: productive, expressive'
    );
  });
});
