import React, { PureComponent } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, boolean, number, text } from '@storybook/addon-knobs';

import Button from '../Button';
import InlineLoading from '../InlineLoading';

const props = () => ({
  success: boolean('Loading successful state (success)', false),
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
  .add(
    'Inline loading',
    withInfo({
      text: `
        Inline Loading spinners are used when creating, updating, or deleting an item.
        They help notify users that their change is underway, with different states for 'loading' and 'success'.
      `,
    })(() => (
      <div>
        <InlineLoading {...props()} />
      </div>
    ))
  )
  .add(
    'UX example',
    withInfo({
      text: `
        This is a full example of how to levarage the <InlineLoading /> component to create a nice user experience when submitting a form.

        For the full source code of this example, check out the 'story' panel below.
      `,
    })(() => {
      class MockSubmission extends PureComponent {
        state = {
          submitting: false,
          success: false,
        };

        handleSubmit() {
          this.setState({ submitting: true });

          // Instead of making a real request, we mock it with a timer
          setTimeout(() => {
            this.setState({ submitting: false, success: true });

            // To make submittable again, we reset the state after a bit so the user gets completion feedback
            setTimeout(() => this.setState({ success: false }), 1500);
          }, 2000);
        }

        render() {
          const { children } = this.props;
          const { submitting, success } = this.state;

          const handleSubmit = this.handleSubmit.bind(this);

          return children({
            handleSubmit,
            submitting,
            success,
          });
        }
      }

      return (
        <MockSubmission>
          {({ handleSubmit, submitting, success }) => (
            <div style={{ display: 'flex', width: '300px' }}>
              <Button kind="secondary" disabled={submitting || success}>
                Cancel
              </Button>
              {submitting || success ? (
                <InlineLoading
                  style={{ marginLeft: '1rem' }}
                  description="Submitting..."
                  success={success}
                />
              ) : (
                <Button onClick={handleSubmit}>Submit</Button>
              )}
            </div>
          )}
        </MockSubmission>
      );
    })
  );
