/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

import stylelint from 'stylelint';

const ruleName = 'carbon/web-component-best-practices';

const messages = stylelint.utils.ruleMessages(ruleName, {
  preferDirPseudoClass:
    'Use `:dir(ltr)` or `:dir(rtl)` instead of `[dir=ltr]` / `[dir=rtl]` so direction-aware selectors work across shadow boundaries.',
  invalidCustomPropertyPlacement: (propertyName) =>
    `Declare shared custom property \`${propertyName}\` on \`:host(...)\` or directly on a child custom-element selector.`,
});

const defaultPrefixes = ['--cds-', '--tabs-'];

function splitSelectors(selector) {
  if (typeof selector !== 'string') {
    return [];
  }

  return selector.split(/,(?![^(]*\))/g).map((entry) => entry.trim());
}

function isCustomElementSelector(selector) {
  if (typeof selector !== 'string') {
    return false;
  }

  const nativeCustomElementPattern =
    /(^|[\s>+~(])([a-z][a-z0-9]*-[a-z0-9-]*)(?=[\s#.:,[\]>+~)]|$)/i;
  const carbonPrefixInterpolationPattern =
    /(^|[\s>+~(])#\{\$[^}]+\}-[a-z0-9-]+(?=[\s#.:,[\]>+~)]|$)/i;

  return (
    nativeCustomElementPattern.test(selector) ||
    carbonPrefixInterpolationPattern.test(selector)
  );
}

function selectorAllowsSharedProperty(selector) {
  if (typeof selector !== 'string') {
    return false;
  }

  if (selector.includes(':host')) {
    return true;
  }

  return isCustomElementSelector(selector);
}

function selectorListAllowsSharedProperty(selector) {
  const selectors = splitSelectors(selector);

  return selectors.some((entry) => selectorAllowsSharedProperty(entry));
}

function shouldValidateProperty(propertyName, prefixes) {
  return prefixes.some((prefix) => propertyName.startsWith(prefix));
}

const rule = (primaryOption, secondaryOptions = {}, context = {}) => {
  const {
    sharedCustomPropertyPrefixes = defaultPrefixes,
    validateDirectionSelector = true,
  } = secondaryOptions;
  const { fix = false } = context;

  return (root, result) => {
    const validOptions = stylelint.utils.validateOptions(result, ruleName, {
      actual: primaryOption,
      possible: [true],
    });

    if (!validOptions) {
      return;
    }

    if (validateDirectionSelector) {
      const dirAttributePattern =
        /\[(\s*)dir\s*=\s*(['"]?)(rtl|ltr)\2(\s*)\]/gi;

      root.walkRules((ruleNode) => {
        const { selector } = ruleNode;

        if (fix) {
          ruleNode.selector = selector.replace(
            dirAttributePattern,
            (_, _space, _quote, dir) => `:dir(${dir.toLowerCase()})`
          );
          return;
        }

        const re = new RegExp(
          dirAttributePattern.source,
          dirAttributePattern.flags
        );
        let match;

        while ((match = re.exec(selector)) !== null) {
          stylelint.utils.report({
            result,
            ruleName,
            message: messages.preferDirPseudoClass,
            node: ruleNode,
            index: match.index,
            endIndex: match.index + match[0].length,
          });
        }
      });
    }

    root.walkDecls((declaration) => {
      const propertyName = declaration.prop;

      if (
        typeof propertyName !== 'string' ||
        !shouldValidateProperty(propertyName, sharedCustomPropertyPrefixes)
      ) {
        return;
      }

      let parentRule = declaration.parent;
      while (parentRule && parentRule.type !== 'rule') {
        parentRule = parentRule.parent;
      }

      if (
        !parentRule ||
        selectorListAllowsSharedProperty(parentRule.selector)
      ) {
        return;
      }

      stylelint.utils.report({
        result,
        ruleName,
        message: messages.invalidCustomPropertyPlacement(propertyName),
        node: declaration,
        word: propertyName,
      });
    });
  };
};

rule.ruleName = ruleName;
rule.messages = messages;

export default stylelint.createPlugin(ruleName, rule);
