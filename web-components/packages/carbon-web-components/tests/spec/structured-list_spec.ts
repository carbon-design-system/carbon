/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from 'lit-html';
import BXStructuredListRow from '../../src/components/structured-list/structured-list-row';
import { Default } from '../../src/components/structured-list/structured-list-story';

const template = (props?) =>
  Default({
    'bx-structured-list': props,
  });

describe('bx-structured-list', function () {
  describe('Selection', function () {
    let list;
    let rows;

    beforeEach(async function () {
      render(template({ hasSelection: true }), document.body);
      await Promise.resolve();
      list = document.body.querySelector('bx-structured-list');
      rows = document.body.querySelectorAll('bx-structured-list-row');
    });

    it('should reflect the selection settings', async function () {
      list.setAttribute('selection-name', 'selection-name-foo');
      await Promise.resolve();
      expect(list.shadowRoot!.querySelector('section')!.classList.contains('bx--structured-list--selection')).toBe(true);
      expect(Array.prototype.every.call(rows, row => row.selectionName === 'selection-name-foo')).toBe(true);
    });

    it('should reflect the selection', function () {
      const input1 = rows[1]!.shadowRoot!.querySelector('input');
      input1!.click();
      expect(Array.prototype.map.call(rows, item => (item as BXStructuredListRow).selected)).toEqual([false, true, false]);
    });

    it('Should navigate by up/down keys', function () {
      (rows[0] as HTMLElement).focus();
      const event = new CustomEvent('keydown', { bubbles: true, composed: true });
      rows[0].dispatchEvent(Object.assign(event, { key: 'ArrowDown' }));
      expect(Array.prototype.map.call(rows, item => (item as BXStructuredListRow).selected)).toEqual([false, true, false]);
      expect(Array.prototype.map.call(rows, row => row.tabIndex)).toEqual([-1, 0, -1]);
      rows[1].dispatchEvent(Object.assign(event, { key: 'ArrowUp' }));
      expect(Array.prototype.map.call(rows, item => (item as BXStructuredListRow).selected)).toEqual([true, false, false]);
      expect(Array.prototype.map.call(rows, row => row.tabIndex)).toEqual([0, -1, -1]);
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
  });
});
