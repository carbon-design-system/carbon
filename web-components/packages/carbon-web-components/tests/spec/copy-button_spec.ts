/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from 'lit-html';
import { Default } from '../../src/components/copy-button/copy-button-story';

const template = (props?) =>
  Default({
    'bx-copy-button': props,
  });

describe('bx-copy-button', function () {
  describe('Rendering', function () {
    it('Should render with minimum attributes', async function () {
      render(template(), document.body);
      await Promise.resolve();
      expect(document.body.querySelector('bx-copy-button')).toMatchSnapshot({
        mode: 'shadow',
      });
    });

    it('Should render with various attributes', async function () {
      render(
        template({
          buttonAssistiveText: 'button-assistive-text-foo',
          feedbackText: 'feedback-text-foo',
          feedbackTimeout: 16,
        }),
        document.body
      );
      await Promise.resolve();
      expect(document.body.querySelector('bx-copy-button')).toMatchSnapshot({
        mode: 'shadow',
      });
    });
  });

  describe('Showing tooltip', function () {
    beforeEach(function () {
      // Workaround for:
      // `Error: Jasmine Clock was unable to install over custom global timer functions. Is the clock already installed?`
      jasmine.clock().uninstall();
      jasmine.clock().install();
    });

    it('Should show the tooltip for 2 seconds by default', async function () {
      render(template(), document.body);
      await Promise.resolve();
      const button = document.body
        .querySelector('bx-copy-button')!
        .shadowRoot!.querySelector('button');
      button!.click();
      await Promise.resolve();
      const feedback = button!.querySelector('.bx--btn--copy__feedback');
      expect(
        feedback!.classList.contains('bx--btn--copy__feedback--displayed')
      ).toBe(true);
      jasmine.clock().tick(2000);
      await Promise.resolve();
      expect(
        feedback!.classList.contains('bx--btn--copy__feedback--displayed')
      ).toBe(false);
    });

    it('Should support changing the duration', async function () {
      render(template({ feedbackTimeout: 500 }), document.body);
      await Promise.resolve();
      const button = document.body
        .querySelector('bx-copy-button')!
        .shadowRoot!.querySelector('button');
      button!.click();
      await Promise.resolve();
      const feedback = button!.querySelector('.bx--btn--copy__feedback');
      expect(
        feedback!.classList.contains('bx--btn--copy__feedback--displayed')
      ).toBe(true);
      jasmine.clock().tick(500);
      await Promise.resolve();
      expect(
        feedback!.classList.contains('bx--btn--copy__feedback--displayed')
      ).toBe(false);
    });

    afterEach(function () {
      jasmine.clock().uninstall();
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
  });
});
