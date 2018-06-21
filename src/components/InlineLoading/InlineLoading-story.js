import React from 'react';
import { storiesOf } from '@storybook/react';
import InlineLoading from '../InlineLoading';

const loadingProps = {
  className: 'some-class',
};

const loadingText = 'Loading data...';

let timeout;

storiesOf('InlineLoading', module).addWithInfo(
  'Inline loading',
  `
      Inline Loading spinners are used when create, updating, or deleting an item.
      They help notify users that their change is underway. Inline Loading has three states, LOADING, SUCCESS.
    `,
  () => {
    class InlineLoadingStory extends React.Component {
      constructor(props) {
        super(props);

        this.state = {
          success: false,
          description: loadingText,
        };

        // Initial timeout
        setTimeout(() => {
          this.setSuccess();
        }, 3000);
      }

      setSuccess() {
        this.setState({
          success: true,
          description: 'Data loaded.',
        });
      }
      resetLoading() {
        this.setState({
          success: false,
          description: loadingText,
        });
      }

      render() {
        const { success, description } = this.state;

        return (
          <div>
            <InlineLoading
              success={success}
              description={description}
              successDelay={1500}
              onSuccess={() => {
                clearTimeout(timeout);
                // Re occuring timeout
                timeout = setTimeout(() => {
                  this.setSuccess();
                }, 3000);
                this.resetLoading();
              }}
              {...loadingProps}
            />
          </div>
        );
      }
    }

    return <InlineLoadingStory />;
  }
);
