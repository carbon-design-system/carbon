/**
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from 'lit';

import CDSOverflowMenu from '../../src/components/overflow-menu/overflow-menu';
import { Playground } from '../../src/components/overflow-menu/overflow-menu.stories';

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20071
const template = (props?: any) =>
  Playground({
    'cds-overflow-menu': props,
  });

describe('cds-overflow-menu', () => {
  describe('Missing menu body', () => {
    let elem: Element;

    beforeEach(async () => {
      render(template({ hasBody: false }), document.body);
      await Promise.resolve();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      document.querySelector('cds-overflow-menu')!.innerHTML = '';
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      elem = document.body.querySelector('cds-overflow-menu')!;
    });

    it('Should be tolerant of missing menu body', async () => {
      (elem as HTMLElement).click();
      await Promise.resolve();
      expect((elem as CDSOverflowMenu).open).toBe(true);

      (elem as HTMLElement).click();
      await Promise.resolve();
      expect((elem as CDSOverflowMenu).open).toBe(false);
    });

    afterEach(() => {
      render(template({ hasContent: false }), document.body);
    });
  });

  xdescribe('Toggling', () => {
    let elem: Element;
    let bodyNode: Element;

    beforeEach(async () => {
      render(template(), document.body);
      await Promise.resolve();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      elem = document.body.querySelector('cds-overflow-menu')!;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      bodyNode = elem.querySelector('cds-overflow-menu-body')!;
    });

    it('should add "open" stateful property by clicking', async () => {
      (elem as HTMLElement).click();
      await Promise.resolve();
      expect((elem as CDSOverflowMenu).open).toBe(true);
    });

    it('should remove "open" stateful property (closed default state) by clicking', async () => {
      (elem as CDSOverflowMenu).open = true;
      await Promise.resolve();
      (elem as HTMLElement).click();
      await Promise.resolve();
      expect((elem as CDSOverflowMenu).open).toBe(false);
    });

    xit('should focus on the menu body when the menu is opened by clicking on the trigger button', async () => {
      spyOn(bodyNode as HTMLElement, 'focus');
      (elem as HTMLElement).click();
      await Promise.resolve(); // For updating `<cds-overflow-menu>`
      await Promise.resolve(); // For updating `<cds-overflow-menu-body>`
      expect((bodyNode as HTMLElement).focus).toHaveBeenCalled();
    });

    it('should add "open" stateful property by space key', async () => {
      elem.dispatchEvent(
        Object.assign(new CustomEvent('keydown', { bubbles: true }), {
          key: ' ',
        })
      );
      await Promise.resolve();
      expect((elem as CDSOverflowMenu).open).toBe(true);
    });

    it('should remove "open" stateful property (closed default state) by space key', async () => {
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

    xit('should focus on the menu body when the menu is opened by space key on the trigger button', async () => {
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

    it('should add "open" stateful property by enter key', async () => {
      elem.dispatchEvent(
        Object.assign(new CustomEvent('keydown', { bubbles: true }), {
          key: 'Enter',
        })
      );
      await Promise.resolve();
      expect((elem as CDSOverflowMenu).open).toBe(true);
    });

    it('should remove "open" stateful property (closed default state) by enter key', async () => {
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

    xit('should focus on the menu body when the menu is opened by enter key on the trigger button', async () => {
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

  afterEach(async () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
    await render(undefined!, document.body);
  });
});
