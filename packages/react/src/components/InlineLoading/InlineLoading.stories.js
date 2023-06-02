/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import Button from '../Button';
import InlineLoading from '.';
import mdx from './InlineLoading.mdx';

export default {
  title: 'Components/InlineLoading',
  component: InlineLoading,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => (
  <>
    <a
      href="https://builder.carbondesignsystem.com/from-json/%7B%22title%22%3A%22InlineLoadingFragment%22%2C%22data%22%3A%7B%22items%22%3A%5B%7B%22type%22%3A%22inline-loading%22%2C%22status%22%3A%22active%22%2C%22activeText%22%3A%22Loading...%22%2C%22successText%22%3A%22Finished.%22%2C%22errorText%22%3A%22Error%21%22%2C%22id%22%3A%222%22%2C%22codeContext%22%3A%7B%22name%22%3A%22inline-loading-2%22%7D%7D%5D%2C%22id%22%3A1%7D%2C%22allCssClasses%22%3A%5B%5D%7D"
      target="_blank"
      rel="noreferrer">
      Edit on Carbon UI Builder
    </a>
    <br></br>
    <br></br>
    <InlineLoading
      status="active"
      iconDescription="Loading"
      description="Loading data..."
    />
  </>
);

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

  return (
    <>
      <a
        href="https://builder.carbondesignsystem.com/from-json/%7B%22title%22%3A%22InlineLoadingFragment%22%2C%22data%22%3A%7B%22items%22%3A%5B%7B%22type%22%3A%22inline-loading%22%2C%22status%22%3A%22active%22%2C%22activeText%22%3A%22Loading...%22%2C%22successText%22%3A%22Finished.%22%2C%22errorText%22%3A%22Error%21%22%2C%22id%22%3A%222%22%2C%22codeContext%22%3A%7B%22name%22%3A%22inline-loading-2%22%7D%7D%5D%2C%22id%22%3A1%7D%2C%22allCssClasses%22%3A%5B%5D%7D"
        target="_blank"
        rel="noreferrer">
        Edit on Carbon UI Builder
      </a>
      <br></br>
      <br></br>
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
    </>
  );
};

export const Playground = (args) => (
  <>
    <a
      href="https://builder.carbondesignsystem.com/from-json/%7B%22title%22%3A%22InlineLoadingFragment%22%2C%22data%22%3A%7B%22items%22%3A%5B%7B%22type%22%3A%22inline-loading%22%2C%22status%22%3A%22active%22%2C%22activeText%22%3A%22Loading...%22%2C%22successText%22%3A%22Finished.%22%2C%22errorText%22%3A%22Error%21%22%2C%22id%22%3A%222%22%2C%22codeContext%22%3A%7B%22name%22%3A%22inline-loading-2%22%7D%7D%5D%2C%22id%22%3A1%7D%2C%22allCssClasses%22%3A%5B%5D%7D"
      target="_blank"
      rel="noreferrer">
      Edit on Carbon UI Builder
    </a>
    <br></br>
    <br></br>
    <InlineLoading {...args} />
  </>
);

Playground.argTypes = {
  className: {
    table: {
      disable: true,
    },
  },
  description: {
    control: {
      type: 'text',
    },
    defaultValue: 'Loading',
  },
  iconDescription: {
    control: {
      type: 'text',
    },
    defaultValue: 'Loading data...',
  },
  onSuccess: {
    table: {
      disable: true,
    },
  },
  successDelay: {
    table: {
      disable: true,
    },
  },
};
