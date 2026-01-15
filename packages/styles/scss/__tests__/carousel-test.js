/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

const { SassRenderer } = require('@carbon/test-utils/scss');

const { render } = SassRenderer.create(__dirname);

describe('scss/carousel', () => {
  test('Public API', async () => {
    const { unwrap } = await render(`
      @use 'sass:map';
      @use 'sass:meta';
      @use '../_carbon-utilities' as carousel;

      $_: get('carousel-mixin', meta.mixin-exists('carousel', 'carousel'));
      $_: get('keyframes-mixin', meta.mixin-exists('keyframes', 'carousel'));
      $_: get('viewBase-mixin', meta.mixin-exists('viewBase', 'carousel'));
      $_: get('wrapperStyles-mixin', meta.mixin-exists('wrapperStyles', 'carousel'));
      $_: get('viewStyles-mixin', meta.mixin-exists('viewStyles', 'carousel'));
      $_: get('variables', map.keys(meta.module-variables('carousel')));
    `);

    expect(unwrap('carousel-mixin')).toBe(true);
    expect(unwrap('keyframes-mixin')).toBe(true);
    expect(unwrap('viewBase-mixin')).toBe(true);
    expect(unwrap('wrapperStyles-mixin')).toBe(true);
    expect(unwrap('viewStyles-mixin')).toBe(true);
    expect(unwrap('variables')).toEqual(['prefix', 'animateTime']);
  });

  test('configuration - animateTime override', async () => {
    const { unwrap } = await render(`
      @use '../_carbon-utilities' as carousel with (
        $animateTime: 500ms,
      );
      $_: get('animateTime', carousel.$animateTime);
    `);
    expect(unwrap('animateTime')).toBe('500ms');
  });

  test('carousel mixin can be included without errors', async () => {
    await expect(
      render(`
        @use '../_carbon-utilities' as carousel;
        
        .test {
          @include carousel.carousel;
        }
      `)
    ).resolves.not.toThrow();
  });

  test('wrapperStyles mixin can be included without errors', async () => {
    await expect(
      render(`
        @use '../_carbon-utilities' as carousel;
        
        @include carousel.wrapperStyles;
      `)
    ).resolves.not.toThrow();
  });

  test('viewStyles mixin can be included without errors', async () => {
    await expect(
      render(`
        @use '../_carbon-utilities' as carousel;
        
        @include carousel.viewStyles;
      `)
    ).resolves.not.toThrow();
  });

  test('default variables have expected values', async () => {
    const { unwrap } = await render(`
      @use '../_carbon-utilities' as carousel;
      
    
      $_: get('animateTime', carousel.$animateTime);
    `);

    // animateTime should be $duration-moderate-02 from @carbon/styles/scss/motion
    expect(unwrap('animateTime')).toBeDefined();
  });
});
