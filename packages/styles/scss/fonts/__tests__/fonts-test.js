/**
 * Copyright IBM Corp. 2018, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

const { SassRenderer } = require('@carbon/test-utils/scss');
const css = require('css');

const { render } = SassRenderer.create(__dirname);

const fonts = [
  'mono',
  'sans-arabic',
  'sans-devanagari',
  'sans-hebrew',
  'sans-thai-looped',
  'sans-thai',
  'sans',
  'serif',
];
const weights = [
  'thin',
  'extralight',
  'light',
  'regular',
  'text',
  'medium',
  'semibold',
  'bold',
];

describe('@carbon/styles/scss/fonts', () => {
  it('should emit default fonts, weights, and styles', async () => {
    const { result } = await render(`@use '../' as fonts;`);
    const { stylesheet } = css.parse(result.css.toString());
    const atRules = stylesheet.rules.filter((rule) => {
      return rule.type === 'font-face';
    });
    const emitted = new Map();

    for (const rule of atRules) {
      const fontFamily = rule.declarations
        .find((declaration) => {
          return declaration.property === 'font-family';
        })
        .value.replace(/['"]/g, '');

      if (!emitted.has(fontFamily)) {
        emitted.set(fontFamily, {
          weights: new Set(),
          styles: new Set(),
          src: new Set(),
        });
      }

      const entry = emitted.get(fontFamily);

      for (const declaration of rule.declarations) {
        if (declaration.property === 'font-weight') {
          entry.weights.add(declaration.value);
        }

        if (declaration.property === 'font-style') {
          entry.styles.add(declaration.value);
        }

        if (declaration.property === 'src') {
          entry.src.add(declaration.value);
        }
      }
    }

    expect(emitted.has('IBM Plex Mono')).toBe(true);
    const mono = emitted.get('IBM Plex Mono');
    expect(mono.weights).toEqual(new Set(['300', '400', '600']));
    expect(mono.styles).toEqual(new Set(['normal', 'italic']));

    expect(emitted.has('IBM Plex Sans')).toBe(true);
    expect(emitted.get('IBM Plex Sans').weights).toEqual(
      new Set(['300', '400', '600'])
    );
    expect(emitted.get('IBM Plex Sans').styles).toEqual(
      new Set(['normal', 'italic'])
    );

    expect(emitted.has('IBM Plex Serif')).toBe(true);
    expect(emitted.get('IBM Plex Serif').weights).toEqual(
      new Set(['300', '400', '600'])
    );
    expect(emitted.get('IBM Plex Serif').styles).toEqual(
      new Set(['normal', 'italic'])
    );

    expect(emitted).toMatchSnapshot();
  });

  it('should emit src from akamai cdn if $use-akamai-cdn is true', async () => {
    const { result } = await render(`
      @use '../../config' with (
        $use-akamai-cdn: true,
      );
      @use '../' as fonts;
    `);
    const { stylesheet } = css.parse(result.css.toString());
    const atRules = stylesheet.rules.filter((rule) => {
      return rule.type === 'font-face';
    });
    const emitted = new Map();

    for (const rule of atRules) {
      const fontFamily = rule.declarations
        .find((declaration) => {
          return declaration.property === 'font-family';
        })
        .value.replace(/['"]/g, '');

      if (!emitted.has(fontFamily)) {
        emitted.set(fontFamily, {
          weights: new Set(),
          styles: new Set(),
          src: new Set(),
        });
      }

      const entry = emitted.get(fontFamily);

      for (const declaration of rule.declarations) {
        if (declaration.property === 'font-weight') {
          entry.weights.add(declaration.value);
        }

        if (declaration.property === 'font-style') {
          entry.styles.add(declaration.value);
        }

        if (declaration.property === 'src') {
          entry.src.add(declaration.value);
        }
      }
    }

    expect(emitted).toMatchSnapshot();
  });

  it('should emit no @font-face blocks if $css--font-face is false', async () => {
    const { result } = await render(`
      @use '../../config' with (
        $css--font-face: false,
      );
      @use '../' as fonts;
    `);
    expect(result.css.toString()).toBe('');
  });

  it('should not emit fonts set to false', async () => {
    const { result } = await render(`
      @use '../' as fonts with (
        $fonts: (
          IBM-Plex-Mono: false,
          IBM-Plex-Sans: false,
          IBM-Plex-Serif: false,
        ),
      );
    `);
    expect(result.css.toString()).toBe('');
  });

  describe.each(fonts)('scss/fonts/_%s.scss', (font) => {
    it('should export all font weights as mixins', async () => {
      const weightMixins = weights.map((weight) => {
        return `$_: get('${weight}', meta.mixin-exists('${weight}', '${font}'));`;
      });

      const { unwrap } = await render(`
        @use 'sass:meta';
        @use '../${font}';

        ${weightMixins.join('\n')}
        $_: get('all', meta.mixin-exists('all', '${font}'));
        $_: get('default', meta.mixin-exists('default', '${font}'));
      `);

      for (const weight of weights) {
        expect(unwrap(weight)).toBe(true);
      }

      expect(unwrap('all')).toBe(true);
      expect(unwrap('default')).toBe(true);
    });
  });
});
