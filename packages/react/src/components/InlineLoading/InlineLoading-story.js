/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, number, select, text } from '@storybook/addon-knobs';
import Button from '../Button';
import InlineLoading from '../InlineLoading';
import mdx from './InlineLoading.mdx';

const props = () => ({
  status: select(
    'Loading status (status)',
    ['inactive', 'active', 'finished', 'error'],
    'active'
  ),
  iconDescription: text(
    'Icon description (iconDescription)',
    'Active loading indicator'
  ),
  description: text(
    'Loading progress description (description)',
    'Loading data...'
  ),
  successDelay: number(
    'The duration for successful state before `onSuccess` fires (successDelay)',
    1500
  ),
  onSuccess: action('onSuccess'),
});

export default {
  title: 'Components/InlineLoading',
  decorators: [withKnobs],

  parameters: {
    component: InlineLoading,
    docs: {
      page: mdx,
    },
  },
};

export const _InlineLoading = () => <InlineLoading {...props()} />;

_InlineLoading.storyName = 'Inline loading';

_InlineLoading.parameters = {
  info: {
    text: `
            Inline Loading spinners are used when creating, updating, or deleting an item.
            They help notify users that their change is underway, with different states for 'loading' and 'success'.
          `,
  },
};

export const UxExample = () => {
  function MockSubmission({ children }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [description, setDescription] = useState('Submitting...');
    const [ariaLive, setAriaLive] = useState('off');
    const handleSubmit = () => {
      setIsSubmitting(true);
      setAriaLive('assertive');

      // Instead of making a real request, we mock it with a timer
      setTimeout(() => {
        setIsSubmitting(false);
        setSuccess(true);
        setDescription('Submitted!');

        // To make submittable again, we reset the state after a bit so the user gets completion feedback
        setTimeout(() => {
          setSuccess(false);
          setDescription('Submitting...');
          setAriaLive('off');
        }, 1500);
      }, 2000);
    };

    return children({
      handleSubmit,
      isSubmitting,
      success,
      description,
      ariaLive,
    });
  }

  MockSubmission.displayName = 'InlineLoading';
  MockSubmission.__docgenInfo = {
    ...InlineLoading.__docgenInfo,
    props: {
      ...InlineLoading.__docgenInfo.props,
    },
  };

  return (
    <MockSubmission>
      {({ handleSubmit, isSubmitting, success, description, ariaLive }) => (
        <div style={{ display: 'flex', width: '300px' }}>
          <Button kind="secondary" disabled={isSubmitting || success}>
            Cancel
          </Button>
          {isSubmitting || success ? (
            <InlineLoading
              style={{ marginLeft: '1rem' }}
              description={description}
              status={success ? 'finished' : 'active'}
              aria-live={ariaLive}
            />
          ) : (
            <Button onClick={handleSubmit}>Submit</Button>
          )}
        </div>
      )}
    </MockSubmission>
  );
};

UxExample.storyName = 'UX example';

UxExample.parameters = {
  info: {
    text: `
        This is a full example of how to leverage the <InlineLoading /> component to create a nice user experience when submitting a form.

        For the full source code of this example, check out the 'story' panel below.
      `,
  },
};
