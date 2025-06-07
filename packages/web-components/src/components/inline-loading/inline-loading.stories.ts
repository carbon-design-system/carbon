/**
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { INLINE_LOADING_STATE } from './inline-loading';

const states = {
  [`${INLINE_LOADING_STATE.INACTIVE}`]: INLINE_LOADING_STATE.INACTIVE,
  [`${INLINE_LOADING_STATE.ACTIVE}`]: INLINE_LOADING_STATE.ACTIVE,
  [`${INLINE_LOADING_STATE.FINISHED}`]: INLINE_LOADING_STATE.FINISHED,
  [`${INLINE_LOADING_STATE.ERROR}`]: INLINE_LOADING_STATE.ERROR,
};

const noop = () => {};
const defaultArgs = {
  description: 'Loading data...',
  assistiveText: 'Loading',
  iconDescription: 'Loading',
  status: INLINE_LOADING_STATE.ACTIVE,
  successDelay: 2000,
};

const getControls = ({ disableControl }) => {
  return {
    description: {
      control: disableControl || 'text',
      description: 'Specify the description for the inline loading text.',
    },
    iconDescription: {
      control: disableControl || 'text',
      description:
        'Specify a description that would be used to best describe the loading state.',
    },
    status: {
      control: disableControl || 'select',
      description: 'Specify the loading status.',
      options: states,
    },
    successDelay: {
      control: disableControl,
      description: 'Provide a delay for the setTimeout for success',
    },
  };
};

export const Default = {
  args: defaultArgs,
  argTypes: getControls({ disableControl: false }),
  parameters: {
    percy: { skip: true },
  },
  render: ({ assistiveText, description, status, iconDescription }) => {
    return html`
      <cds-inline-loading
        status="${status}"
        success-delay=${2000}
        assistive-text=${assistiveText}
        icon-description=${iconDescription}
        }>
        ${description}
      </cds-inline-loading>
    `;
  },
};

export const UxExample = {
  args: defaultArgs,
  argTypes: getControls({ disableControl: true }),
  decorators: [
    (story) => html`<div style="display:flex;width:300px">${story()}</div>`,
  ],

  parameters: {
    percy: { skip: true },
  },
  render: ({ onSuccess = noop }) => {
    const onSubmit = () => {
      const submit = document.querySelector('#submit');
      const cancel = document
        .querySelector('#cancel')
        ?.shadowRoot?.querySelector('button');
      const loadingElem = document.querySelector(
        'cds-inline-loading[controlled]'
      );

      if (loadingElem) {
        (loadingElem as HTMLElement).style.display = 'inherit';

        loadingElem.setAttribute('status', 'active');
        loadingElem.setAttribute('aria-live', 'assertive');
      }

      submit && ((submit as HTMLElement).style.display = 'none');

      cancel && (cancel.disabled = true);

      // Instead of making a real request, we mock it with a timer
      setTimeout(() => {
        if (loadingElem) {
          loadingElem.setAttribute('status', 'finished');
          loadingElem.innerHTML = 'Submitted!';
        }

        // To make submittable again, we reset the state after a bit so the user gets completion feedback
        setTimeout(() => {
          loadingElem && ((loadingElem as HTMLElement).style.display = 'none');

          submit && ((submit as HTMLElement).style.display = 'block');

          cancel && (cancel.disabled = false);
          if (loadingElem) {
            loadingElem.setAttribute('aria-live', 'off');
            loadingElem.innerHTML = 'Submitting';
          }
        }, 1500);
      }, 2000);
    };

    return html`
      <cds-button kind="secondary" id="cancel"> Cancel </cds-button>
      <cds-button @click=${onSubmit} id="submit">Submit</cds-button>
      <cds-inline-loading
        controlled
        style="display:none;margin-left:1rem"
        success-delay=${2000}
        icon-description="Submitting"
        aria-live="off"
        @cds-inline-loading-onsuccess=${onSuccess}>
        Submitting
      </cds-inline-loading>
    `;
  },
};

const meta = {
  title: 'Components/Inline loading',
};

export default meta;
