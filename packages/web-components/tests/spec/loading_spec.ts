/**
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LOADING_TYPE } from '../../src/components/loading/loading';

describe('cds-loading', () => {
  describe('Changing spinner type', () => {
    let elem: HTMLElement | null;

    beforeEach(() => {
      elem = document.body.appendChild(document.createElement('cds-loading'));
    });

    it('should choose the right template for default type', () => {
      expect(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
        elem!.shadowRoot!.querySelectorAll(
          '.cds--loading--small,.cds--loading-overlay'
        ).length
      ).toBe(0);
    });

    it('should choose the right template for regular type', async () => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      elem!.setAttribute('type', LOADING_TYPE.REGULAR);
      await Promise.resolve();
      expect(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
        elem!.shadowRoot!.querySelectorAll(
          '.cds--loading--small,.cds--loading-overlay'
        ).length
      ).toBe(0);
    });

    it('should choose the right template for small type', async () => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      elem!.setAttribute('type', LOADING_TYPE.SMALL);
      await Promise.resolve();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      expect(elem!.shadowRoot!.querySelectorAll('.cds--loading').length).toBe(
        0
      );
    });

    xit('should choose the right template for overlay type', async () => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      elem!.setAttribute('type', LOADING_TYPE.REGULAR);
      await Promise.resolve();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      expect(elem!.shadowRoot!.querySelectorAll('.cds--loading').length).toBe(
        1
      );
    });

    afterEach(() => {
      if (elem && elem.parentNode) {
        elem.parentNode.removeChild(elem);
        elem = null;
      }
    });
  });

  describe('Changing state', () => {
    let elem: HTMLElement | null;

    beforeAll(() => {
      elem = document.body.appendChild(document.createElement('cds-loading'));
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      elem!.setAttribute('type', LOADING_TYPE.REGULAR);
    });

    xit('should deactivate when inactive attribute is set', async () => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      elem!.setAttribute('inactive', '');
      await Promise.resolve();
      expect(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
        elem!.shadowRoot!.querySelectorAll('.cds--loading--stop').length
      ).toBe(1);
    });

    it('should activate when inactive attribute is unset', async () => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      elem!.removeAttribute('inactive');
      await Promise.resolve();
      expect(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
        elem!.shadowRoot!.querySelectorAll('.cds--loading--stop').length
      ).toBe(0);
    });

    afterAll(() => {
      if (elem && elem.parentNode) {
        elem.parentNode.removeChild(elem);
        elem = null;
      }
    });
  });
});
