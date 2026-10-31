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
const { files } = require('../files');

const { render } = SassRenderer.create(__dirname);
const filepaths = files.map((file) => {
  return [file.filepath, file.relativePath];
});

describe('@carbon/styles', () => {
  describe.each(filepaths)('%s', (_filepath, relativePath) => {
    it('should be importable', async () => {
      await expect(
        render(`@use '../${relativePath}' as test;`)
      ).resolves.toBeDefined();
    });
  });

  it('should have stable public scss entrypoints', async () => {
    expect(files).toMatchSnapshot();
  });

  describe('scss/config', () => {
    test('config overrides', async () => {
      const { get } = await render(`
        @use 'sass:meta';
        @use '../scss/config' with (
          $prefix: 'custom-prefix',
          $css--font-face: false,
        );

        $_: get('config', (
          prefix: config.$prefix,
          css--font-face: config.$css--font-face,
        ));
      `);

      expect(get('config').value).toEqual({
        prefix: 'custom-prefix',
        ['css--font-face']: false,
      });
    });
  });

  describe('Tile input capabilities', () => {
    it('only emits hover styles for devices with a hover-capable input', async () => {
      const { result } = await render(`
        @use '../scss/components/tile/tile';
        @include tile.tile();
      `);
      const rules = css.parse(result.css.toString()).stylesheet.rules;
      const hoverRules = [];

      function visit(nodes, supportsHover = false) {
        for (const node of nodes) {
          if (node.type === 'media') {
            visit(
              node.rules,
              supportsHover || node.media === '(any-hover: hover)'
            );
          } else if (node.type === 'rule') {
            for (const selector of node.selectors) {
              if (selector.includes(':hover')) {
                hoverRules.push(selector);
                expect(supportsHover).toBe(true);
              }
            }
          }
        }
      }

      visit(rules);
      expect(hoverRules.length).toBeGreaterThan(0);
    });

    it('keeps keyboard focus styles available without hover support', async () => {
      const { result } = await render(`
        @use '../scss/components/tile/tile';
        @include tile.tile();
      `);
      const rules = css.parse(result.css.toString()).stylesheet.rules;
      const checkmark = rules.find(
        (rule) =>
          rule.type === 'rule' &&
          rule.selectors.includes(
            '.cds--tile--clickable:focus .cds--tile__checkmark'
          )
      );

      expect(checkmark).toBeDefined();
      expect(checkmark.declarations).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ property: 'opacity', value: '1' }),
        ])
      );
    });
  });

  describe('import order', () => {
    it('should support bringing in stylesheets independently', async () => {
      await expect(
        render(`
          @use '../scss/reset';
          @use '../scss/grid';
          @use '../scss/breakpoint';
          @use '../scss/colors';
          @use '../scss/components';
        `)
      ).resolves.not.toThrow();

      await expect(
        render(`
          @use '../scss/type';
          @use '../scss/grid';
        `)
      ).resolves.not.toThrow();

      await expect(
        render(`
          @use '../scss/themes';
          @use '../scss/theme';
        `)
      ).resolves.not.toThrow();
    });
  });

  it('should emit DatePicker position-try rules at the top level', async () => {
    const { result } = await render(`
    @use '../scss/components/date-picker/date-picker-next' as date-picker;

    @include date-picker.date-picker-next();
  `);

    const output = result.css.toString();

    expect(output).toContain('@position-try --bottom-left {');
    expect(output).toContain(
      'position-try-fallbacks: --bottom-left, --top-left, --bottom-right, --top-right'
    );

    expect(output).not.toMatch(
      /@position-try --bottom-left\s*{\s*\.cds--date-picker/
    );
  });
});
