import React, { useState } from 'react';
import { Tearsheet } from '@carbon/ibm-products';
import {
  Button,
  Tabs,
  TabList,
  Tab,
  AILabel,
  AILabelContent,
} from '@carbon/react';

import './_example.scss';

export const Example = () => {
  const [isOpen, setIsOpen] = useState(true);
  const handleOpenModalClick = () => {
    setIsOpen(true);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
  };
  const sampleAILabel = (
    <AILabel className="ai-label-container" size="xs">
      <AILabelContent>
        <div>
          <p className="secondary">AI Explained</p>
          <h1>84%</h1>
          <p className="secondary bold">Confidence score</p>
          <p className="secondary">
            This is not really Lorem Ipsum but the spell checker did not like
            the previous text with it&apos;s non-words which is why this
            unwieldy sentence, should one choose to call it that, here.
          </p>
          <hr />
          <p className="secondary">Model type</p>
          <p className="bold">Foundation model</p>
        </div>
      </AILabelContent>
    </AILabel>
  );
  return (
    <>
      <style>{`.exp-tearsheet { opacity: 0 };`}</style>
      <Button onClick={handleOpenModalClick}>Reopen Tearsheet</Button>
      <Tearsheet
        actions={[
          {
            kind: 'secondary',
            label: 'Cancel',
            onClick: handleCloseModal,
          },
          {
            kind: 'primary',
            label: 'Create',
            onClick: handleCloseModal,
          },
        ]}
        slug={sampleAILabel}
        closeIconDescription="Close the tearsheet"
        description={
          // cspell:disable
          <span>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor <strong>incididunt ut labore</strong> et dolore magna
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat.
          </span>
          // cspell:enable
        }
        influencer={
          <div className="tearsheet-example__dummy-content-block">
            Influencer
          </div>
        }
        label="This is the label of the tearsheet"
        navigation={
          <div className="tearsheet-example__tabs">
            <Tabs onSelectionChange={() => {}}>
              <TabList aria-label="tab list">
                <Tab>Tab 1</Tab>
                <Tab>Tab 2</Tab>
                <Tab>Tab 3</Tab>
                <Tab>Tab 4</Tab>
              </TabList>
            </Tabs>
          </div>
        }
        onClose={handleCloseModal}
        open={isOpen}
        preventCloseOnClickOutside
        title="This is the title of the tearsheet">
        <div className="tearsheet-example__dummy-content-block">
          The main content of the Tearsheet should be placed here.
        </div>
      </Tearsheet>
    </>
  );
};

export default Example;
