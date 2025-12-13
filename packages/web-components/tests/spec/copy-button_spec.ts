/**
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from 'lit';
import { Default } from '../../src/components/copy-button/copy-button.stories';

const template = (props?) =>
  Default({
    'cds-copy-button': props,
  });

describe('cds-copy-button', () => {
  describe('Rendering', () => {
    it('Should render with minimum attributes', async () => {
      render(template(), document.body);
      await Promise.resolve();
      expect(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
        document.body.querySelector('cds-copy-button' as any)
      ).toMatchSnapshot({
        mode: 'shadow',
      });
    });

    it('Should render with various attributes', async () => {
      render(
        template({
          buttonAssistiveText: 'button-assistive-text-foo',
          feedbackText: 'feedback-text-foo',
          feedbackTimeout: 16,
        }),
        document.body
      );
      await Promise.resolve();
      expect(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
        document.body.querySelector('cds-copy-button' as any)
      ).toMatchSnapshot({
        mode: 'shadow',
      });
    });
  });

  describe('Showing tooltip', () => {
    beforeEach(() => {
      // Workaround for:
      // `Error: Jasmine Clock was unable to install over custom global timer functions. Is the clock already installed?`
      jasmine.clock().uninstall();
      jasmine.clock().install();
    });

    xit('Should show the tooltip for 2 seconds by default', async () => {
      render(template(), document.body);
      await Promise.resolve();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      const button = document.body
        .querySelector('cds-copy-button')!
        .shadowRoot!.querySelector('button');
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      button!.click();
      await Promise.resolve();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      const feedback = button!.querySelector('.cds--btn--copy__feedback');
      expect(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
        feedback!.classList.contains('cds--btn--copy__feedback--displayed')
      ).toBe(true);
      jasmine.clock().tick(2000);
      await Promise.resolve();
      expect(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
        feedback!.classList.contains('cds--btn--copy__feedback--displayed')
      ).toBe(false);
    });

    xit('Should support changing the duration', async () => {
      render(template({ feedbackTimeout: 500 }), document.body);
      await Promise.resolve();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      const button = document.body
        .querySelector('cds-copy-button')!
        .shadowRoot!.querySelector('button');
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      button!.click();
      await Promise.resolve();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      const feedback = button!.querySelector('.cds--btn--copy__feedback');
      expect(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
        feedback!.classList.contains('cds--btn--copy__feedback--displayed')
      ).toBe(true);
      jasmine.clock().tick(500);
      await Promise.resolve();
      expect(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
        feedback!.classList.contains('cds--btn--copy__feedback--displayed')
      ).toBe(false);
    });

    afterEach(() => {
      jasmine.clock().uninstall();
    });
  });

  afterEach(async () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
    await render(undefined!, document.body);
  });
});
