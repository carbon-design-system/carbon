/**
 * Copyright IBM Corp. 2020, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const events = {
  issues: {
    opened: {
      key: 'issue_opened',
      run: action('opened'),
    },
  },
  comments: {
    created: {
      key: 'comment_created',
      run: action('created'),
    },
  },
};

const states = {
  issues: {
    from_non_collaborator: {
      key: 'from_non_collaborator',
      run(context) {
        const { issue } = context.payload;
        const roles = new Set(['OWNER', 'COLLABORATOR', 'MEMBER']);
        return roles.has(issue.author_association);
      },
    },
    open: {
      key: 'issue_is_open',
      run(context) {
        return !context.issue.closed_at;
      },
    },
    closed: {
      key: 'issue_is_closed',
      run(context) {
        return !!context.issue.closed_at;
      },
    },
    has(label) {
      return {
        key: `has_issue_label_${label}`,
        run(context) {
          if (!context.payload.issue) {
            return;
          }
          return context.payload.issue.labels.find(({ name }) => {
            return name === label;
          });
        },
      };
    },
  },
};

/**
 * Check if a specific action was triggered for a given action context
 * @param {string} name
 * @returns {Function}
 */
function action(name) {
  return (context) => context.payload.action === name;
}

module.exports = {
  events,
  states,
};
