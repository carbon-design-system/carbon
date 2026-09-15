/**
 * Copyright IBM Corp. 2020, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Shared predicates used by plugins to declare which GitHub issue actions they
 * handle. Keeping event checks here makes the plugin registry readable and
 * gives runner logs stable condition names.
 */
export const events = {
  issues: {
    opened: {
      key: 'issue_opened',
      run: action('opened'),
    },
    typed: {
      key: 'issue_typed',
      run: action('typed'),
    },
    labeled: {
      key: 'issue_labeled',
      run: action('labeled'),
    },
    unlabeled: {
      key: 'issue_unlabeled',
      run: action('unlabeled'),
    },
  },
};

export function or(...conditions) {
  // Preserve the child keys in the combined key so a failed condition remains
  // understandable in the GitHub Actions log.
  const key = conditions
    .map((condition) => {
      return condition.key;
    })
    .join(', ');
  return {
    key: `or(${key})`,
    run(context) {
      return conditions.some((condition) => {
        return condition.run(context);
      });
    },
  };
}

/**
 * Check if a specific action was triggered for a given action context
 * @param {string} name
 * @returns {Function}
 */
function action(name) {
  // GitHub places the webhook action (for example, "opened") on the payload.
  return (context) => context.payload.action === name;
}
