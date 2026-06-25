/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import CDSTruncatedText from './truncated-text';
import { prefix, carbonPrefix } from '../../globals/settings';
import './index';

const defaultProps = {
  lines: 2,
  text: 'Buttons are used to initialize an action, either in the background or foreground of an experience. There are several kinds of buttons. Primary buttons should be used for the principle call to action on the page.',
  type: '',
};

const template = (props = defaultProps, templateWidth?: number) => html`
  <div style=${templateWidth ? `width: ${templateWidth}px;` : ''}>
    <c4p-truncated-text
      value=${props.text}
      lines=${props.lines}
      type=${props.type}
    ></c4p-truncated-text>
  </div>
`;

describe('c4p-truncated-text', () => {
  it('renders the component', async () => {
    const wrapper = await fixture(template());
    const el = wrapper.querySelector(`${prefix}-truncated-text`);
    expect(el).toBeTruthy();
  });

  it('renders a tooltip when text is truncated with tooltip', async () => {
    const wrapper = await fixture(
      template({ ...defaultProps, type: 'tooltip' }, 200)
    );

    const el = wrapper.querySelector(
      `${prefix}-truncated-text`
    ) as CDSTruncatedText;
    const tooltip = el.shadowRoot?.querySelector(`${carbonPrefix}-tooltip`);
    expect(tooltip).toBeTruthy();
  });

  it('does not render a tooltip if the text fits', async () => {
    const wrapper = await fixture(
      template({ ...defaultProps, type: 'tooltip' }, 9000)
    );

    const el = wrapper.querySelector(
      `${prefix}-truncated-text`
    ) as CDSTruncatedText;

    const tooltip = el.shadowRoot?.querySelector(`${carbonPrefix}-tooltip`);
    expect(tooltip).not.toBeTruthy();
  });

  it('tests lines prop/attribute with tooltip', async () => {
    for (let lines = 1; lines <= 4; lines++) {
      const wrapper = await fixture(
        template({ ...defaultProps, lines, type: 'tooltip' }, 600)
      );

      const el = wrapper.querySelector(
        `${prefix}-truncated-text`
      ) as CDSTruncatedText;
      await el.updateComplete;

      const tooltip = el.shadowRoot?.querySelector(`${carbonPrefix}-tooltip`);
      if (lines <= 2) {
        expect(tooltip).toBeTruthy();
      } else {
        expect(tooltip).not.toBeTruthy();
      }
    }
  });

  it('renders a expandable button when text is truncated with expand', async () => {
    const wrapper = await fixture(
      template({ ...defaultProps, lines: 2, type: 'expand' }, 400)
    );
    const el = wrapper.querySelector(
      `${prefix}-truncated-text`
    ) as CDSTruncatedText;
    await el.updateComplete;
    const expandButton = el.shadowRoot?.querySelector(
      `.${prefix}--truncated-text_button-expand`
    );
    expect(expandButton).toBeTruthy();
  });
});
