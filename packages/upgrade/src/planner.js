/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { prompt } = require('inquirer');

const Planner = {
  /**
   * Prompt the user to see which migrations they would like to apply for each
   * workspace
   * @param {Array<WorkspaceMigration>} migrationsByWorkspace
   * @returns {Array<WorkspaceMigration>}
   */
  async getSelectedMigrations(migrationsByWorkspace) {
    // will eventually contain all migration selections
    // each workspace receives an individual selection
    // and each selection, can contain one or more migrations (dependencies to be updated)
    // [
    //   { selected: [ [Object], [Object] ] }, // workspace 1
    //   { selected: [ [Object], [Object] ] }  // workspace 2
    // ]
    const answers = [];

    // migrationOptions: {
    //   dependency: { type: 'peerDependencies', name: 'react', version: '>=16' },
    //   migration: {
    //     packageName: 'react',
    //     from: '>=16',
    //     to: '18.0.0',
    //     migrate: [AsyncFunction: migrate]
    //   },
    //   available: true,
    //   code: 'supported'
    // }
    for (const { workspace, migrationOptions } of migrationsByWorkspace) {
      // answer returns array of objects (example below):
      //   selected: [
      //     {
      //       packageName: 'react-dom',
      //       from: '>=16',
      //       to: '18.0.0',
      //       migrate: [AsyncFunction: migrate]
      //     }
      //   ]
      const answer = await prompt({
        type: 'checkbox',
        message: `Migrations available for ${workspace.name}`,
        name: 'selected',
        choices: migrationOptions
          .filter((migrationOption) => {
            // example of what migrationOption contains
            // if migration doesn't match, available = false, code = 'range_mistmatch'
            // {
            //   dependency: { type: 'peerDependencies', name: 'react', version: '>=16' },
            //   migration: {
            //     packageName: 'react',
            //     from: '>=16',
            //     to: '18.0.0',
            //     migrate: [AsyncFunction: migrate]
            //   },
            //   available: true,
            //   code: 'supported'
            // }
            return migrationOption.available === true;
          })
          .map((migrationOption) => {
            const { dependency, migration } = migrationOption;
            return {
              name: `Migrate ${dependency.name} from: ${dependency.version} to: ${migration.to}`,
              value: migration,
              checked: true,
            };
          }),
      });

      answers.push(answer);
    }

    return migrationsByWorkspace.map(({ workspace, migrationOptions }, i) => {
      const answer = answers[i];
      return {
        workspace,
        migrationOptions: migrationOptions.filter((migrationOption) => {
          return answer.selected.includes(migrationOption.migration);
        }),
      };
    });
  },
};

module.exports = {
  Planner,
};
