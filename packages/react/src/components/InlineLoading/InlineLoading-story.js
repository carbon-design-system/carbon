/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, number, text } from '@storybook/addon-knobs';
import Button from '../Button';
import InlineLoading from '../InlineLoading';

const props = () => ({
  success: boolean('Loading successful state (success)', false),
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

storiesOf('InlineLoading', module)
  .addDecorator(withKnobs)
  .add('Inline loading', () => <InlineLoading {...props()} />, {
    info: {
      text: `
            Inline Loading spinners are used when creating, updating, or deleting an item.
            They help notify users that their change is underway, with different states for 'loading' and 'success'.
          `,
    },
  })
  .add(
    'UX example',
    () => {
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
                  success={success}
                  aria-live={ariaLive}
                />
              ) : (
                <Button onClick={handleSubmit}>Submit</Button>
              )}
            </div>
          )}
        </MockSubmission>
      );
    },
    {
      info: {
        text: `
            This is a full example of how to levarage the <InlineLoading /> component to create a nice user experience when submitting a form.

            For the full source code of this example, check out the 'story' panel below.
          `,
      },
    }
  );
