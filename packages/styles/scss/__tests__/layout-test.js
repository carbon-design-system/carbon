/**
 * Copyright IBM Corp. 2026
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

describe('@carbon/styles/scss/layout', () => {
  test('Public API', async () => {
    const { get } = await render(`
      @use 'sass:meta';
      @use '../layout';

      $_: get('api', (
        mixins: (
          emit-layout-classes: meta.mixin-exists('emit-layout-classes', 'layout'),
          emit-layout-tokens: meta.mixin-exists('emit-layout-tokens', 'layout'),
          emit-layout-tokens-to-shadow-host: meta.mixin-exists('emit-layout-tokens-to-shadow-host', 'layout'),
        ),
      ));
    `);

    const { value: api } = get('api');
    expect(api).toEqual({
      mixins: {
        'emit-layout-classes': true,
        'emit-layout-tokens': true,
        'emit-layout-tokens-to-shadow-host': true,
      },
    });
  });

  test('emit-layout-tokens emits all size tokens', async () => {
    const { result } = await render(`
      @use '../layout';
      .test {
        @include layout.emit-layout-tokens();
      }
    `);

    const output = result.css.toString();
    expect(output).toContain('--cds-layout-size-height-xs');
    expect(output).toContain('--cds-layout-size-height-sm');
    expect(output).toContain('--cds-layout-size-height-md');
    expect(output).toContain('--cds-layout-size-height-lg');
    expect(output).toContain('--cds-layout-size-height-xl');
    expect(output).toContain('--cds-layout-size-height-2xl');
  });

  test('emit-layout-tokens emits all density tokens', async () => {
    const { result } = await render(`
      @use '../layout';
      .test {
        @include layout.emit-layout-tokens();
      }
    `);

    const output = result.css.toString();
    expect(output).toContain('--cds-layout-density-padding-inline-condensed');
    expect(output).toContain('--cds-layout-density-padding-inline-normal');
  });

  test('emit-layout-tokens emits min and max boundary tokens', async () => {
    const { result } = await render(`
      @use '../layout';
      .test {
        @include layout.emit-layout-tokens();
      }
    `);

    const output = result.css.toString();
    expect(output).toContain('--cds-layout-size-height-min');
    expect(output).toContain('--cds-layout-size-height-max');
    expect(output).toContain('--cds-layout-density-padding-inline-min');
    expect(output).toContain('--cds-layout-density-padding-inline-max');
  });

  test('layout size classes set size context token', async () => {
    const { result } = await render(`
      @use '../layout';
      @include layout.emit-layout-classes();
    `);

    const { stylesheet } = css.parse(result.css.toString());

    const findRule = (selector) =>
      stylesheet.rules.find((rule) =>
        rule.selectors?.some((s) => s.includes(selector))
      );

    const findDeclaration = (rule, property) =>
      rule?.declarations?.find((d) => d.property.includes(property));

    expect(
      findDeclaration(
        findRule('.cds--layout--size-sm'),
        '--cds-layout-size-height-context'
      )
    ).toBeDefined();

    expect(
      findDeclaration(
        findRule('.cds--layout--size-lg'),
        '--cds-layout-size-height-context'
      )
    ).toBeDefined();
  });

  test('layout density classes set density context token', async () => {
    const { result } = await render(`
      @use '../layout';
      @include layout.emit-layout-classes();
    `);

    const { stylesheet } = css.parse(result.css.toString());

    const findRule = (selector) =>
      stylesheet.rules.find((rule) =>
        rule.selectors?.some((s) => s.includes(selector))
      );

    const findDeclaration = (rule, property) =>
      rule?.declarations?.find((d) => d.property.includes(property));

    expect(
      findDeclaration(
        findRule('.cds--layout--density-condensed'),
        '--cds-layout-density-padding-inline-context'
      )
    ).toBeDefined();

    expect(
      findDeclaration(
        findRule('.cds--layout--density-normal'),
        '--cds-layout-density-padding-inline-context'
      )
    ).toBeDefined();
  });

  test('layout constraint classes are generated for default, min and max', async () => {
    const { result } = await render(`
      @use '../layout';
      @include layout.emit-layout-classes();
    `);

    const output = result.css.toString();
    expect(output).toContain('.cds--layout-constraint--size__default-md');
    expect(output).toContain('.cds--layout-constraint--size__min-sm');
    expect(output).toContain('.cds--layout-constraint--size__max-lg');
    expect(output).toContain(
      '.cds--layout-constraint--density__default-condensed'
    );
    expect(output).toContain('.cds--layout-constraint--density__min-normal');
    expect(output).toContain('.cds--layout-constraint--density__max-normal');
  });

  test('emit-layout-tokens-to-shadow-host generates host selectors for size', async () => {
    const { result } = await render(`
      @use '../layout';
      @include layout.emit-layout-tokens-to-shadow-host('cds-layout');
    `);

    const output = result.css.toString();
    expect(output).toContain(':host(cds-layout[size=xs])');
    expect(output).toContain(':host(cds-layout[size=sm])');
    expect(output).toContain(':host(cds-layout[size=md])');
    expect(output).toContain(':host(cds-layout[size=lg])');
    expect(output).toContain(':host(cds-layout[size=xl])');
    expect(output).toContain(':host(cds-layout[size="2xl"])');
    expect(output).toContain('--cds-layout-size-height-context');
  });

  test('emit-layout-tokens-to-shadow-host generates host selectors for density', async () => {
    const { result } = await render(`
      @use '../layout';
      @include layout.emit-layout-tokens-to-shadow-host('cds-layout');
    `);

    const output = result.css.toString();
    expect(output).toContain(':host(cds-layout[density=condensed])');
    expect(output).toContain(':host(cds-layout[density=normal])');
    expect(output).toContain('--cds-layout-density-padding-inline-context');
  });

  test(':root emits layout tokens globally', async () => {
    const { result } = await render(`
      @use '../layout';
      :root {
        @include layout.emit-layout-tokens();
      }
    `);

    const { stylesheet } = css.parse(result.css.toString());
    const rootRule = stylesheet.rules.find((rule) =>
      rule.selectors?.includes(':root')
    );

    expect(rootRule).toBeDefined();
    expect(
      rootRule.declarations.some((d) =>
        d.property.includes('--cds-layout-size-height-xs')
      )
    ).toBe(true);
  });

  test('should not emit CSS when only using the module', async () => {
    const { result } = await render(`
      @use '../layout';
    `);

    expect(result.css.toString().trim()).toBe('');
  });
});
