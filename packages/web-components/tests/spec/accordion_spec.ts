/**
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from 'lit';
import EventManager from '../utils/event-manager';
import CDSAccordionItem from '../../src/components/accordion/accordion-item';
import { Default } from '../../src/components/accordion/accordion-story';

const template = () => Default();

describe('cds-accordion', () => {
  describe('Toggling', () => {
    let item: CDSAccordionItem | null;
    const events = new EventManager();

    beforeEach(async () => {
      render(template(), document.body);
      await Promise.resolve();
      item = document.body.querySelector('cds-accordion-item');
    });

    it('Should open and close the item', async () => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      item!.shadowRoot!.querySelector('button')!.click();
      await Promise.resolve();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      expect(item!.open).toBe(true);

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      item!.shadowRoot!.querySelector('button')!.click();
      await Promise.resolve();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      expect(item!.open).toBe(false);
    });

    it('Should fire cds-accordion-item-beingtoggled/cds-accordion-item-toggled events upon opening', async () => {
      const spyBeforeToggle = jasmine.createSpy('before toggle');
      const spyAfterToggle = jasmine.createSpy('after toggle');
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      events.on(item!, 'cds-accordion-item-beingtoggled', spyBeforeToggle);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      events.on(item!, 'cds-accordion-item-toggled', spyAfterToggle);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      item!.shadowRoot!.querySelector('button')!.click();
      await Promise.resolve();
      expect(spyBeforeToggle).toHaveBeenCalled();
      expect(spyAfterToggle).toHaveBeenCalled();
    });

    it('Should support preventing modal from being opened upon user gesture', async () => {
      const spyAfterToggle = jasmine.createSpy('after toggle');
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      events.on(item!, 'cds-accordion-item-beingtoggled', (event) => {
        event.preventDefault();
      });
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      events.on(item!, 'cds-accordion-item-toggled', spyAfterToggle);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      item!.shadowRoot!.querySelector('button')!.click();
      await Promise.resolve();
      expect(spyAfterToggle).not.toHaveBeenCalled();
    });

    afterEach(async () => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      await render(undefined!, document.body);
      events.reset();
    });
  });
});
