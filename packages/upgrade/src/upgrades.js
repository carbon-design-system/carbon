/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * @typedef Upgrade
 * @property {string} name
 * @property {string} description
 * @property {Array<Update>} updates
 */

/**
 * @typedef Update
 * @property {object} package
 * @property {string} package.name
 * @property {string} package.version
 * @property {Array<Change>} changes
 */

/**
 * Represents all possible changes made in a project's package.json file for a
 * package
 */
const Change = {
  /**
   * @param {object} options
   * @param {string} options.name
   * @param {string} options.version
   * @returns {object}
   */
  install({ name, version }) {
    return {
      type: 'install',
      package: {
        name,
        version,
      },
    };
  },

  uninstall: {
    type: 'uninstall',
  },

  /**
   * @param {object} options
   * @param {string} options.version
   * @returns {object}
   */
  update({ version }) {
    return {
      type: 'update',
      package: {
        version,
      },
    };
  },
};

/**
 * @type {Array<Upgrade>}
 */
export const upgrades = [
  {
    name: 'v11: full update',
    description:
      'changes carbon-components, carbon-components-react, carbon-icons, and @carbon/icons-react to @carbon/react',
    updates: [
      {
        package: {
          name: 'carbon-components',
          range: '10.x',
        },
        changes: [Change.uninstall],
      },
      {
        package: {
          name: 'carbon-icons',
          range: '7.x',
        },
        changes: [Change.uninstall],
      },
      {
        package: {
          name: 'carbon-components-react',
          range: '7.x',
        },
        changes: [
          Change.uninstall,
          Change.install({
            name: '@carbon/react',
            version: '~1.0.0',
          }),
        ],
      },
      {
        package: {
          name: '@carbon/icons-react',
          range: '10.x',
        },
        changes: [Change.uninstall],
      },
    ],
  },
  {
    name: 'v11: default update',
    description:
      'changes carbon-components, carbon-components-react, and carbon-icons to @carbon/react',
    updates: [
      {
        package: {
          name: 'carbon-components',
          range: '10.x',
        },
        changes: [Change.uninstall],
      },
      {
        package: {
          name: 'carbon-components-react',
          range: '7.x',
        },
        changes: [
          Change.uninstall,
          Change.install({
            name: '@carbon/react',
            version: '~1.0.0',
          }),
        ],
      },
      {
        package: {
          name: 'carbon-icons',
          range: '7.x',
        },
        changes: [Change.uninstall],
      },
    ],
  },
  {
    name: 'v11: carbon-components',
    description: 'changes carbon-components to @carbon/styles',
    updates: [
      {
        package: {
          name: 'carbon-components',
          range: '10.x',
        },
        changes: [
          Change.uninstall,
          Change.install({
            name: '@carbon/styles',
            version: '~1.0.0',
          }),
        ],
      },
    ],
  },
];
