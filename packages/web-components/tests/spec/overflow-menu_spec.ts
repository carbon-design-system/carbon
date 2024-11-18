/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from 'lit';

import CDSOverflowMenu from '../../src/components/overflow-menu/overflow-menu';
import { Playground } from '../../src/components/overflow-menu/overflow-menu.stories';

const template = (props?) =>
  Playground({
    'cds-overflow-menu': props,
  });

describe('cds-overflow-menu', function () {
  describe('Missing menu body', function () {
    let elem: Element;

    beforeEach(async function () {
      render(template({ hasBody: false }), document.body);
      await Promise.resolve();
      document.querySelector('cds-overflow-menu')!.innerHTML = '';
      elem = document.body.querySelector('cds-overflow-menu')!;
    });

    it('Should be tolerant of missing menu body', async function () {
      (elem as HTMLElement).click();
      await Promise.resolve();
      expect((elem as CDSOverflowMenu).open).toBe(true);

      (elem as HTMLElement).click();
      await Promise.resolve();
      expect((elem as CDSOverflowMenu).open).toBe(false);
    });

    afterEach(function () {
      render(template({ hasContent: false }), document.body);
    });
  });

  xdescribe('Toggling', function () {
    let elem: Element;
    let bodyNode: Element;

    beforeEach(async function () {
      render(template(), document.body);
      await Promise.resolve();
      elem = document.body.querySelector('cds-overflow-menu')!;
      bodyNode = elem.querySelector('cds-overflow-menu-body')!;
    });

    it('should add "open" stateful property by clicking', async function () {
      (elem as HTMLElement).click();
      await Promise.resolve();
      expect((elem as CDSOverflowMenu).open).toBe(true);
    });

    it('should remove "open" stateful property (closed default state) by clicking', async function () {
      (elem as CDSOverflowMenu).open = true;
      await Promise.resolve();
      (elem as HTMLElement).click();
      await Promise.resolve();
      expect((elem as CDSOverflowMenu).open).toBe(false);
    });

    xit('should focus on the menu body when the menu is opened by clicking on the trigger button', async function () {
      spyOn(bodyNode as HTMLElement, 'focus');
      (elem as HTMLElement).click();
      await Promise.resolve(); // For updating `<cds-overflow-menu>`
      await Promise.resolve(); // For updating `<cds-overflow-menu-body>`
      expect((bodyNode as HTMLElement).focus).toHaveBeenCalled();
    });

    it('should add "open" stateful property by space key', async function () {
      elem.dispatchEvent(
        Object.assign(new CustomEvent('keydown', { bubbles: true }), {
          key: ' ',
        })
      );
      await Promise.resolve();
      expect((elem as CDSOverflowMenu).open).toBe(true);
    });

    it('should remove "open" stateful property (closed default state) by space key', async function () {
      (elem as CDSOverflowMenu).open = true;
      await Promise.resolve();
      elem.dispatchEvent(
        Object.assign(new CustomEvent('keydown', { bubbles: true }), {
          key: 'Enter',
        })
      );
      await Promise.resolve();
      expect((elem as CDSOverflowMenu).open).toBe(false);
    });

    xit('should focus on the menu body when the menu is opened by space key on the trigger button', async function () {
      spyOn(bodyNode as HTMLElement, 'focus');
      elem.dispatchEvent(
        Object.assign(new CustomEvent('keydown', { bubbles: true }), {
          key: ' ',
        })
      );
      await Promise.resolve(); // For updating `<cds-overflow-menu>`
      await Promise.resolve(); // For updating `<cds-overflow-menu-body>`
      expect((bodyNode as HTMLElement).focus).toHaveBeenCalled();
    });

    it('should add "open" stateful property by enter key', async function () {
      elem.dispatchEvent(
        Object.assign(new CustomEvent('keydown', { bubbles: true }), {
          key: 'Enter',
        })
      );
      await Promise.resolve();
      expect((elem as CDSOverflowMenu).open).toBe(true);
    });

    it('should remove "open" stateful property (closed default state) by enter key', async function () {
      (elem as CDSOverflowMenu).open = true;
      await Promise.resolve();
      elem.dispatchEvent(
        Object.assign(new CustomEvent('keydown', { bubbles: true }), {
          key: 'Enter',
        })
      );
      await Promise.resolve();
      expect((elem as CDSOverflowMenu).open).toBe(false);
    });

    xit('should focus on the menu body when the menu is opened by enter key on the trigger button', async function () {
      spyOn(bodyNode as HTMLElement, 'focus');
      elem.dispatchEvent(
        Object.assign(new CustomEvent('keydown', { bubbles: true }), {
          key: 'Enter',
        })
      );
      await Promise.resolve(); // For updating `<cds-overflow-menu>`
      await Promise.resolve(); // For updating `<cds-overflow-menu-body>`
      expect((bodyNode as HTMLElement).focus).toHaveBeenCalled();
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
  });
});
