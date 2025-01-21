/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { INLINE_LOADING_STATE } from './inline-loading';
import { prefix } from '../../globals/settings';

const states = {
  [`Inactive (${INLINE_LOADING_STATE.INACTIVE})`]:
    INLINE_LOADING_STATE.INACTIVE,
  [`Active (${INLINE_LOADING_STATE.ACTIVE})`]: INLINE_LOADING_STATE.ACTIVE,
  [`Finished (${INLINE_LOADING_STATE.FINISHED})`]:
    INLINE_LOADING_STATE.FINISHED,
  [`Failed (${INLINE_LOADING_STATE.ERROR})`]: INLINE_LOADING_STATE.ERROR,
};

const noop = () => {};
const defaultArgs = {
  description: 'Loading data...',
  assistiveText: 'Loading',
  iconDescription: 'Loading',
  status: INLINE_LOADING_STATE.ACTIVE,
  successDelay: 2000,
};

const controls = {
  description: {
    control: 'text',
    description: 'Specify the description for the inline loading text.',
  },
  assistiveText: {
    control: 'text',
    description:
      'The `assistiveText` property will be deprecated in the next major release. Please use `iconDescription` instead.',
  },
  iconDescription: {
    control: 'text',
    description:
      'Specify a description that would be used to best describe the loading state.',
  },
  status: {
    control: 'select',
    description: 'Specify the loading status.',
    options: states,
  },
  onSuccess: {
    action: `${prefix}-inline-loading-onsuccess`,
    description: 'Provide an optional handler to be invoked when is successful',
  },
  successDelay: {
    description: 'Provide a delay for the setTimeout for success',
  },
};
export const Default = {
  render: () => html`<cds-inline-loading>Loading data...</cds-inline-loading>`,
};

export const UxExample = () => {
  const onSubmit = () => {
    const submit = document.querySelector('#submit');
    const cancel = document
      .querySelector('#cancel')
      ?.shadowRoot?.querySelector('button');
    const loadingElem = document.querySelector('cds-inline-loading');

    if (loadingElem) {
      (loadingElem as HTMLElement).style.display = 'inherit';

      loadingElem.setAttribute('status', 'active');
      loadingElem.setAttribute('aria-live', 'assertive');
    }

    submit && ((submit as HTMLElement).style.display = 'none');

    cancel && (cancel.disabled = true);

    // Instead of making a real request, we mock it with a timer
    setTimeout(() => {
      loadingElem && loadingElem.setAttribute('status', 'finished');

      // To make submittable again, we reset the state after a bit so the user gets completion feedback
      setTimeout(() => {
        loadingElem && ((loadingElem as HTMLElement).style.display = 'none');

        submit && ((submit as HTMLElement).style.display = 'block');

        cancel && (cancel.disabled = false);
        loadingElem && loadingElem.setAttribute('aria-live', 'off');
      }, 1500);
    }, 2000);
  };

  const onSuccess = () => {
    console.log('on success');
  };

  return html`<div style="display:flex;width:300px">
    <cds-button kind="secondary" id="cancel"> Cancel </cds-button>
    <cds-button @click=${onSubmit} id="submit">Submit</cds-button>
    <cds-inline-loading
        style='display:none;margin-left:1rem'
        success-delay=${2000}
        icon-description='Submitting'
        aria-live='off'
        @cds-inline-loading-onsuccess=${onSuccess}
        >
       Submitting
      </cds-inline-loading>
   
   </div></div>
    `;
};

export const Playground = {
  args: defaultArgs,
  argTypes: controls,
  parameters: {
    percy: { skip: true },
  },
  render: ({
    assistiveText,
    description,
    status,
    iconDescription,
    onSuccess = noop,
  }) => {
    return html`
      <cds-inline-loading
        status="${status}"
        success-delay=${2000}
        assistive-text=${assistiveText}
        icon-description=${iconDescription}
        @cds-inline-loading-onsuccess=${onSuccess}
        }>
        ${description}
      </cds-inline-loading>
    `;
  },
};

const meta = {
  title: 'Components/Inline loading',
};

export default meta;
