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

  test('exposes the expand surface through Sass', async () => {
    const { getValue } = await render(`
      @use '../index.scss' as motion;

      $_: get-value((
        kind: motion.surface(expand, kind),
        origin: motion.surface(expand, origin),
        duration: motion.surface(expand, duration),
        reduced-motion: motion.surface(expand, reduced-motion),
      ));
    `);

    expect(getValue(0)).toEqual({
      kind: 'shared-element',
      origin: 'surface',
      duration: 'slow-01',
      'reduced-motion': 'fade',
    });
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

  test('resolves engine-neutral surface tokens', () => {
    const surface = CarbonMotion.getMotionSurface('expand');

    expect(surface).toEqual({
      kind: 'shared-element',
      origin: 'surface',
      duration: 'slow-01',
      enterEasing: ['entrance', 'expressive'],
      exitEasing: ['exit', 'expressive'],
      reducedMotion: 'fade',
    });
    expect(CarbonMotion.resolveDurationMilliseconds(surface.duration)).toBe(
      400
    );
    expect(CarbonMotion.resolveEasing(...surface.enterEasing)).toEqual([
      0, 0, 0.3, 1,
    ]);
  });

  test('should throw for an unknown motion surface', () => {
    expect(() => CarbonMotion.getMotionSurface('nope')).toThrow(
      'Unable to find motion surface `nope`. Expected one of: expand'
    );
  });
});
