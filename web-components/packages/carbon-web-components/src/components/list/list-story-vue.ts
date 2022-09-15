/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export { default } from './list-story';

export const ordered = () => ({
  template: `
    <bx-ordered-list>
      <bx-list-item>
        Ordered List level 1
        <bx-ordered-list>
          <bx-list-item>Ordered List level 2</bx-list-item>
          <bx-list-item>
            Ordered List level 2
            <bx-ordered-list>
              <bx-list-item>Ordered List level 2</bx-list-item>
              <bx-list-item>Ordered List level 2</bx-list-item>
            </bx-ordered-list>
          </bx-list-item>
        </bx-ordered-list>
      </bx-list-item>
      <bx-list-item>Ordered List level 1</bx-list-item>
      <bx-list-item>Ordered List level 1</bx-list-item>
    </bx-ordered-list>
  `,
});

export const unordered = () => ({
  template: `
    <bx-unordered-list>
      <bx-list-item>
        Unordered List level 1
        <bx-unordered-list>
          <bx-list-item>Unordered List level 2</bx-list-item>
          <bx-list-item>
            Unordered List level 2
            <bx-unordered-list>
              <bx-list-item>Unordered List level 2</bx-list-item>
              <bx-list-item>Unordered List level 2</bx-list-item>
            </bx-unordered-list>
          </bx-list-item>
        </bx-unordered-list>
      </bx-list-item>
      <bx-list-item>Unordered List level 1</bx-list-item>
      <bx-list-item>Unordered List level 1</bx-list-item>
    </bx-unordered-list>
  `,
});
