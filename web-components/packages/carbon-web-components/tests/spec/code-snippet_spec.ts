/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from 'lit';
import {
  singleLine,
  multiLine,
  inline,
} from '../../src/components/code-snippet/code-snippet-story';

const singleLineTemplate = (props?) =>
  singleLine({
    'bx-code-snippet': props,
  });

const multiLineTemplate = (props?) =>
  multiLine({
    'bx-code-snippet': props,
  });

const inlineTemplate = (props?) =>
  inline({
    'bx-code-snippet': props,
  });

describe('bx-code-snippet', function () {
  describe('Rendering', function () {
    it('Should render with minimum attributes for single line mode', async function () {
      render(singleLineTemplate(), document.body);
      await Promise.resolve();
      expect(
        document.body.querySelector('bx-code-snippet' as any)
      ).toMatchSnapshot({
        mode: 'shadow',
      });
    });

    it('Should render with minimum attributes for multi line mode', async function () {
      render(multiLineTemplate(), document.body);
      await Promise.resolve();
      expect(
        document.body.querySelector('bx-code-snippet' as any)
      ).toMatchSnapshot({
        mode: 'shadow',
      });
    });

    it('Should render with minimum attributes for inline mode', async function () {
      render(inlineTemplate(), document.body);
      await Promise.resolve();
      expect(
        document.body.querySelector('bx-code-snippet' as any)
      ).toMatchSnapshot({
        mode: 'shadow',
      });
    });

    it('Should render with various attributes for single line mode', async function () {
      render(
        singleLineTemplate({
          codeAssistiveText: 'code-assistive-text-foo',
          copyButtonAssistiveText: 'copy-button-assistive-text-foo',
          copyButtonFeedbackText: 'copy-button-feedback-text-foo',
          copyButtonFeedbackTimeout: 16,
        }),
        document.body
      );
      await Promise.resolve();
      expect(
        document.body.querySelector('bx-code-snippet' as any)
      ).toMatchSnapshot({
        mode: 'shadow',
      });
    });

    it('Should render with various attributes for multi line mode', async function () {
      render(
        multiLineTemplate({
          codeAssistiveText: 'code-assistive-text-foo',
          copyButtonAssistiveText: 'copy-button-assistive-text-foo',
          copyButtonFeedbackText: 'copy-button-feedback-text-foo',
          copyButtonFeedbackTimeout: 16,
        }),
        document.body
      );
      await Promise.resolve();
      expect(
        document.body.querySelector('bx-code-snippet' as any)
      ).toMatchSnapshot({
        mode: 'shadow',
      });
    });

    it('Should render with various attributes for inline mode', async function () {
      render(
        inlineTemplate({
          codeAssistiveText: 'code-assistive-text-foo',
          copyButtonAssistiveText: 'copy-button-assistive-text-foo',
          copyButtonFeedbackText: 'copy-button-feedback-text-foo',
          copyButtonFeedbackTimeout: 16,
        }),
        document.body
      );
      await Promise.resolve();
      expect(
        document.body.querySelector('bx-code-snippet' as any)
      ).toMatchSnapshot({
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
      render(singleLineTemplate(), document.body);
      await Promise.resolve();
      const button = document.body
        .querySelector('bx-code-snippet')!
        .shadowRoot!.querySelector('.bx--snippet-button');
      (button as HTMLElement).click();
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

    it('Should show the tooltip on the code snippet itself for inline mode', async function () {
      render(inlineTemplate(), document.body);
      await Promise.resolve();
      const button = document.body
        .querySelector('bx-code-snippet')!
        .shadowRoot!.querySelector('.bx--snippet--inline');
      (button as HTMLElement).click();
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
      render(
        singleLineTemplate({ copyButtonFeedbackTimeout: 500 }),
        document.body
      );
      await Promise.resolve();
      const button = document.body
        .querySelector('bx-code-snippet')!
        .shadowRoot!.querySelector('.bx--snippet-button');
      (button as HTMLElement).click();
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

  describe('Expand/collapse button in multi line mode', function () {
    it('Should render the expando', async function () {
      render(
        multiLineTemplate({
          collapseButtonText: 'collapse-button-text-foo',
          expandButtonText: 'expand-button-text-foo',
        }),
        document.body
      );
      await Promise.resolve();
      const snippet = document.body.querySelector('bx-code-snippet');
      snippet!.shadowRoot!.querySelector('pre')!.style.display = 'block';
      snippet!.shadowRoot!.querySelector('pre')!.style.height = '256px';
      snippet!.textContent = 'foo'; // Force firing `slotchange` event
      await Promise.resolve(); // For firing `slotchange` event
      await Promise.resolve(); // For re-rendering
      expect(
        snippet!.shadowRoot!.querySelector('.bx--snippet-btn--expand')
      ).toMatchSnapshot();
    });

    it('Should change the button text by expanding/collapsing', async function () {
      render(
        multiLineTemplate({
          collapseButtonText: 'collapse-button-text-foo',
          expandButtonText: 'expand-button-text-foo',
        }),
        document.body
      );
      await Promise.resolve();
      const snippet = document.body.querySelector('bx-code-snippet');
      snippet!.shadowRoot!.querySelector('pre')!.style.display = 'block';
      snippet!.shadowRoot!.querySelector('pre')!.style.height = '256px';
      snippet!.textContent = 'foo'; // Force firing `slotchange` event
      await Promise.resolve(); // For firing `slotchange` event
      await Promise.resolve(); // For re-rendering
      const expando = snippet!.shadowRoot!.querySelector(
        '.bx--snippet-btn--expand'
      );
      expect(
        expando!.querySelector('.bx--snippet-btn--text')!.textContent!.trim()
      ).toBe('expand-button-text-foo');
      (expando as HTMLElement).click();
      await Promise.resolve(); // For re-rendering
      expect(
        expando!.querySelector('.bx--snippet-btn--text')!.textContent!.trim()
      ).toBe('collapse-button-text-foo');
    });

    afterEach(function () {
      const snippet = document.body.querySelector('bx-code-snippet');
      snippet!.shadowRoot!.querySelector('pre')!.style.display = '';
      snippet!.shadowRoot!.querySelector('pre')!.style.height = '';
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
  });
});
