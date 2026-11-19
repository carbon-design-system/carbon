/**
 * Copyright IBM Corp. 2018, 2026
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

const v12Flags = `
  @use '../../feature-flags' with (
    $feature-flags: (
      'enable-v12-release': true,
    )
  );
`;

/**
 * Compiles the multiselect styles and returns every style rule, including the
 * ones nested in at-rules, tagged with the at-rule they came from.
 */
async function compileRules(prelude = '') {
  const { result } = await render(`
    ${prelude}
    @use '../multiselect/index';
  `);
  const { stylesheet } = css.parse(result.css.toString());
  const rules = [];

  (function collect(nodes, atRule) {
    nodes.forEach((node) => {
      if (node.type === 'rule') {
        rules.push({ atRule, rule: node });
      } else if (node.rules) {
        collect(node.rules, `@${node.type} ${node.supports || node.media}`);
      }
    });
  })(stylesheet.rules);

  return rules;
}

function declaration(rule, property) {
  const match = rule.declarations.find((candidate) => {
    return candidate.property === property;
  });
  return match && match.value;
}

function findRules(rules, predicate) {
  return rules.filter(({ rule }) => {
    return rule.selectors && rule.selectors.some(predicate);
  });
}

const menuItem = '.cds--list-box__menu-item';
const isLeadingItem = (selector) => {
  return (
    selector.startsWith('.cds--multi-select ') &&
    selector.includes(`:has(+ ${menuItem}:is(`)
  );
};
const isTrailingItem = (selector) => {
  return (
    selector.startsWith('.cds--multi-select ') &&
    selector.includes(`) + ${menuItem}:is(`)
  );
};

const focusedOption =
  '.cds--multi-select .cds--list-box__menu-item--highlighted > .cds--list-box__menu-item__option';

describe('scss/components/multiselect', () => {
  test('Public API', async () => {
    const { unwrap } = await render(`
      @use 'sass:map';
      @use 'sass:meta';
      @use '../multiselect';

      $_: get('mixin', meta.mixin-exists('multiselect', 'multiselect'));
    `);
    expect(unwrap('mixin')).toBe(true);
  });

  describe('v11 (enable-v12-release off)', () => {
    let rules;

    beforeAll(async () => {
      rules = await compileRules();
    });

    test('does not move the focus ring to the option', () => {
      expect(findRules(rules, (s) => s === focusedOption)).toHaveLength(0);
    });

    test('does not connect adjacent selected items', () => {
      expect(findRules(rules, isLeadingItem)).toHaveLength(0);
      expect(findRules(rules, isTrailingItem)).toHaveLength(0);
    });
  });

  describe('v12 (enable-v12-release on)', () => {
    let rules;

    beforeAll(async () => {
      rules = await compileRules(v12Flags);
    });

    test('draws the focus ring on the option with a constant 4px radius', () => {
      const [{ rule }] = findRules(rules, (s) => s === focusedOption).filter(
        ({ rule: candidate }) => declaration(candidate, 'border-radius')
      );

      expect(declaration(rule, 'border-radius')).toBe('0.25rem');
      // Fills the whole row, including fluid rows taller than the option
      expect(declaration(rule, 'block-size')).toBe('100%');
      // Margin is swapped for padding so the label does not shift
      expect(declaration(rule, 'margin-inline')).toBe('0');
      expect(declaration(rule, 'padding-inline')).toBe('1rem 2.5rem');
    });

    test('removes the focus outline from the <li>', () => {
      const [{ rule }] = findRules(
        rules,
        (s) => s === '.cds--multi-select .cds--list-box__menu-item--highlighted'
      );

      expect(declaration(rule, 'outline')).toBe('none');
    });

    test('keeps the label aligned in the inline variant', () => {
      const [{ rule }] = findRules(
        rules,
        (s) =>
          s ===
          '.cds--multi-select.cds--list-box--inline .cds--list-box__menu-item--highlighted > .cds--list-box__menu-item__option'
      );

      expect(declaration(rule, 'padding-inline')).toBe('0.5rem 2rem');
    });

    test('squares only the touching corners of adjacent items, behind a :has() check', () => {
      const [upper, ...extraUpper] = findRules(rules, isLeadingItem);
      const [lower, ...extraLower] = findRules(rules, isTrailingItem);

      expect(extraUpper).toHaveLength(0);
      expect(extraLower).toHaveLength(0);
      expect(upper.atRule).toBe('@supports selector(:has(*))');
      expect(lower.atRule).toBe('@supports selector(:has(*))');

      // The upper item squares its bottom corners, the lower item its top
      expect(declaration(upper.rule, 'border-end-end-radius')).toBe('0px');
      expect(declaration(upper.rule, 'border-end-start-radius')).toBe('0px');
      expect(
        declaration(upper.rule, 'border-start-end-radius')
      ).toBeUndefined();
      expect(declaration(lower.rule, 'border-start-end-radius')).toBe('0px');
      expect(declaration(lower.rule, 'border-start-start-radius')).toBe('0px');
      expect(declaration(lower.rule, 'border-end-end-radius')).toBeUndefined();
    });

    test('only connects selected or hovered items that are not disabled', () => {
      const [{ rule: upper }] = findRules(rules, isLeadingItem);
      const [{ rule: lower }] = findRules(rules, isTrailingItem);

      [...upper.selectors, ...lower.selectors].forEach((selector) => {
        expect(selector).toContain(`${menuItem}--active`);
        expect(selector).toContain(':hover');
        expect(selector).toContain(':not([disabled])');
      });
    });

    test('scopes every new rule to .cds--multi-select', () => {
      const added = rules.filter(({ rule }) => {
        return (
          rule.selectors &&
          (declaration(rule, 'border-end-end-radius') !== undefined ||
            declaration(rule, 'border-start-end-radius') !== undefined)
        );
      });

      expect(added.length).toBeGreaterThan(0);
      added.forEach(({ rule }) => {
        rule.selectors.forEach((selector) => {
          expect(selector.startsWith('.cds--multi-select ')).toBe(true);
        });
      });
    });
  });

  describe('shared list-box styles', () => {
    test('leave the focus ring on the <li> for Dropdown and ComboBox in v12', async () => {
      const { result } = await render(`
        ${v12Flags}
        @use '../list-box/index';
      `);
      const { stylesheet } = css.parse(result.css.toString());
      const highlighted = stylesheet.rules.filter((rule) => {
        return (
          rule.selectors &&
          rule.selectors.includes('.cds--list-box__menu-item--highlighted')
        );
      });

      expect(highlighted.some((rule) => declaration(rule, 'outline'))).toBe(
        true
      );
      expect(
        stylesheet.rules.some((rule) => {
          return (
            rule.selectors &&
            rule.selectors.some((s) => s.includes('__menu-item--highlighted >'))
          );
        })
      ).toBe(false);
    });
  });
});
