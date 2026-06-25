/**
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable no-console */

'use strict';

const { readFile, writeFile, readdir } = require('fs');
const path = require('path');

// Our project setup, as a monorepo, has introduced relative path issues in our
// sass source maps. Changing the relative path each source map uses to find
// the correct node_module directory fixes this issue.
readdir(
  path.join(__dirname, '../packages/ibm-products-styles/css'),
  (err, files) => {
    if (err) {
      console.log(err);
      return;
    }
    files.forEach((file) => {
      if (file.endsWith('.map')) {
        readFile(
          path.join(__dirname, `../packages/ibm-products-styles/css/${file}`),
          'utf-8',
          (err, fileContents) => {
            if (err) {
              console.log(err);
              return;
            }

            // Each instance of `../../../node_modules` should be changed to `../../../../node_modules`
            const updatedMap = fileContents
              .split('../../../node_modules/')
              .join('../../../../node_modules/');

            writeFile(
              path.join(
                __dirname,
                `../packages/ibm-products-styles/css/${file}`
              ),
              updatedMap,
              'utf-8',
              (err) => {
                if (err) {
                  console.log(err);
                  return;
                }
                return;
              }
            );
          }
        );
      }
    });
  }
);
