/**
 * Copyright IBM Corp. 2020, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import axe from 'axe-core';

const defaultOptions = {
  rules: {
    'document-title': {
      enabled: false,
    },
    'html-has-lang': {
      enabled: false,
    },
    'landmark-one-main': {
      enabled: false,
    },
    'page-has-heading-one': {
      enabled: false,
    },
    region: {
      enabled: false,
    },
  },
};

async function toHaveNoAxeViolations(node, options = {}) {
  const result = await axe.run(node, {
    ...defaultOptions,
    ...options,
  });

  if (result.violations.length > 0) {
    return {
      message: () => formatOutput(result.violations),
      pass: false,
    };
  }

  return {
    pass: true,
  };
}

function formatOutput(violations) {
  const firstViolation = violations[0];
  const { description, id, impact, help, helpUrl } = firstViolation;
  const nodes = firstViolation.nodes.map((node) => {
    return ['Node:', node.html, '\n', ...node.failureSummary.split('\n')].join(
      '\n'
    );
  });
  const divider = '='.repeat(80);

  return `Rule violation: #${id} [${impact}]
> ${description}
${help}
${helpUrl}
${divider}
${nodes.join('\n')}`;
}

export default toHaveNoAxeViolations;
