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

  // Confirm that Sass receives the same shared-element values as TypeScript.
  test('exposes the expand surface through Sass', async () => {
    const surface = CarbonMotion.getMotionSurface('expand');
    const { getValue } = await render(`
      @use '../index.scss' as motion;

      $_: get-value((
        kind: motion.surface(expand, kind),
        duration: motion.surface(expand, duration),
        enter-opacity: map-get(motion.surface(expand, enter), opacity),
        exit-opacity: map-get(motion.surface(expand, exit), opacity),
        enter-easing: motion.surface(expand, enter-easing),
        exit-easing: motion.surface(expand, exit-easing),
      ));
    `);

    expect(getValue(0)).toEqual({
      kind: surface.kind,
      duration: surface.duration,
      'enter-opacity': surface.enter.opacity,
      'exit-opacity': surface.exit.opacity,
      'enter-easing': [...surface.enterEasing],
      'exit-easing': [...surface.exitEasing],
    });
  });

  // Confirm that Sass receives the same reveal values as TypeScript.
  test('exposes the disclosure surface through Sass', async () => {
    const surface = CarbonMotion.getMotionSurface('disclosure');
    const { getValue } = await render(`
      @use '../index.scss' as motion;

      $_: get-value((
        kind: motion.surface(disclosure, kind),
        duration: motion.surface(disclosure, duration),
        enter-opacity: map-get(motion.surface(disclosure, enter), opacity),
        exit-opacity: map-get(motion.surface(disclosure, exit), opacity),
      ));
    `);

    expect(getValue(0)).toEqual({
      kind: surface.kind,
      duration: surface.duration,
      'enter-opacity': surface.enter.opacity,
      'exit-opacity': surface.exit.opacity,
    });
  });

  test('should throw for unknown easing name', () => {
    expect(() => CarbonMotion.motion('nope', 'productive')).toThrow(
      'Unable to find easing `nope` in our supported easings. Expected one of: standard, entrance, exit'
    );
  });

  // Keep the existing error for an easing mode that Carbon does not support.
  test('should throw for unknown easing mode', () => {
    expect(() => CarbonMotion.motion('standard', 'nope')).toThrow(
      'Unable to find a mode for the easing `standard` called: `nope`. Expected one of: productive, expressive'
    );
  });

  // Resolve the shared surface tokens without choosing an animation engine.
  test('resolves engine-neutral surface tokens for shared-element surfaces', () => {
    const expand = CarbonMotion.getMotionSurface('expand');
    expect(expand).toEqual({
      kind: 'shared-element',
      duration: 'moderate-02',
      enter: { opacity: 1, transform: 'scale(1)' },
      exit: { opacity: 0, transform: 'scale(0.96)' },
      enterEasing: ['standard', 'productive'],
      exitEasing: ['standard', 'productive'],
    });

    const invoke = CarbonMotion.getMotionSurface('invoke');
    expect(invoke).toEqual({
      kind: 'shared-element',
      origin: 'trigger',
      duration: 'moderate-02',
      enterEasing: ['standard', 'expressive'],
      exitEasing: ['standard', 'expressive'],
    });

    expect(CarbonMotion.resolveDuration(expand.duration)).toBe('240ms');
    expect(CarbonMotion.resolveEasing(...expand.enterEasing)).toEqual([
      0.2, 0, 0.38, 0.9,
    ]);
  });

  // Resolve the reveal surface tokens without choosing an animation engine.
  test('resolves engine-neutral surface tokens for reveal surfaces', () => {
    const disclosure = CarbonMotion.getMotionSurface('disclosure');
    expect(disclosure).toEqual({
      kind: 'reveal',
      duration: 'moderate-01',
      enter: { blockSize: 'auto', opacity: 1 },
      exit: { blockSize: 0, opacity: 0 },
      enterEasing: ['entrance', 'productive'],
      exitEasing: ['exit', 'productive'],
    });

    const contextual = CarbonMotion.getMotionSurface('contextual');
    expect(contextual).toEqual({
      kind: 'reveal',
      duration: 'fast-02',
      enter: { opacity: 1, transform: 'scale(1)' },
      exit: { opacity: 0, transform: 'scale(0.96)' },
      enterEasing: ['entrance', 'expressive'],
      exitEasing: ['exit', 'expressive'],
    });

    expect(CarbonMotion.resolveDuration(disclosure.duration)).toBe('150ms');
    expect(CarbonMotion.resolveEasing(...disclosure.enterEasing)).toEqual([
      0, 0, 0.38, 0.9,
    ]);
  });

  // Explain which surface names are available when a name is not valid.
  test('should throw for an unknown motion surface', () => {
    expect(() => CarbonMotion.getMotionSurface('nope')).toThrow(
      'Unable to find motion surface `nope`. Expected one of: disclosure, contextual, stretch, expand, invoke'
    );
  });

  // the mixin emits enter/exit attribute states plus transitions behind a
  // reduced-motion preference guard
  test('surface mixin emits reveal styles behind a reduced-motion guard', async () => {
    const { result } = await render(`
      @use '../index.scss' as motion;

      .surface {
        @include motion.surface(contextual);
      }
    `);
    const css = result.css;

    expect(css).toContain('opacity: 1');
    expect(css).toContain('transform: scale(1)');
    expect(css).toContain('[data-carbon-surface-state=enter]');
    expect(css).toContain('[data-carbon-surface-state=exit]');
    expect(css).toContain('@media (prefers-reduced-motion: no-preference)');
    expect(css).toContain('transition-duration: 110ms');
    expect(css).toContain('transition-property: opacity, transform');
    expect(css).toContain(
      'transition-timing-function: cubic-bezier(0, 0, 0.3, 1)'
    );
    expect(css).toContain(
      'transition-timing-function: cubic-bezier(0.4, 0.14, 1, 1)'
    );
    expect(css).toContain('@starting-style');
    expect(css).toContain('transform: scale(0.96)');
  });

  test('surface mixin rejects shared-element surfaces', async () => {
    await expect(
      render(`
        @use '../index.scss' as motion;

        .surface {
          @include motion.surface(expand);
        }
      `)
    ).rejects.toThrow(/shared-element morph with no CSS-only form/);
  });
});
