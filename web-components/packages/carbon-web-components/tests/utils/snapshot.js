/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import diff from 'jest-diff';
import { getDiffableHTML } from '@open-wc/semantic-dom-diff';

const currentSpec = [];
let currentSeq;

jasmine.getEnv().addReporter({
  suiteStarted({ description }) {
    currentSpec.push(description);
  },
  specStarted({ description }) {
    currentSpec.push(description);
    currentSeq = 0;
  },
  specDone() {
    currentSeq = undefined;
    currentSpec.pop();
  },
  suiteDone() {
    currentSpec.pop();
  },
});

beforeEach(function() {
  jasmine.addMatchers({
    toMatchSnapshot() {
      return {
        /**
         * @param {HTMLElement} actualElem The DOM element to match the snapshot with.
         * @param {object} [options={}] The options.
         * @param {string} [options.mode]
         *   `shadow` to use the `actualElem.shadowRoot.innerHTML`. Otherwise `actualElem.outerHTML` is used.
         * @returns {boolean}
         *   `true` if the given DOM element's content matches the snapshot or the snapshot does not exist. Otherwise throws.
         */
        compare(actualElem, options) {
          const { __snapshot__: snapshotState } = window;
          const { update } = snapshotState;
          const snapshot = !update && snapshotState.get(currentSpec, currentSeq);
          const { mode } = options || {};
          const actual = mode === 'shadow' ? actualElem.shadowRoot.innerHTML : actualElem.outerHTML;
          const formattedActual = getDiffableHTML(actual);
          if (!snapshot) {
            snapshotState.set(currentSpec, currentSeq, formattedActual);
            return {
              pass: true,
            };
          }
          const formattedExpected = getDiffableHTML(snapshot.code);
          if (!snapshotState.match(formattedActual, formattedExpected)) {
            return {
              pass: false,
              message: `Unmatched snapshot:\n${diff(formattedExpected, formattedActual)}`,
            };
          }
          return {
            pass: true,
          };
        },
      };
    },
  });
});
