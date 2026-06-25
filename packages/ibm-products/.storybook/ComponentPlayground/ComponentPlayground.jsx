/**
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useEffect } from 'react';

import { Cascade } from '../../src';
import {
  ProductiveCard,
  GlobalHeader,
  MultiStepTearsheetWide,
  PageHeader,
  SidePanel,
  TearsheetNarrow,
  TearsheetWide,
} from './components';
import { Column } from '@carbon/react';

const App = () => {
  const [cards, setCards] = useState([]);
  const [sidePanelOpen, setSidePanelOpen] = useState(false);
  const [cardToEdit, setCardToEdit] = useState();
  const [narrowTearsheetOpen, setNarrowTearsheetOpen] = useState(false);
  const [wideTearsheetOpen, setWideTearsheetOpen] = useState(false);
  const [multiStepTearsheetOpen, setMultiStepTearsheetOpen] = useState(false);
  const [componentConfig, setComponentConfig] = useState({
    cards: {},
    loadBar: {},
    sidePanel: {},
    tagSet: {},
    tearSheet: {},
    createTearsheet: {
      title: 'Create task',
      label: 'This is the label of the multi step tearsheet',
      nextButtonText: 'Next step',
      description: 'Specify details for the new task you want to create',
      submitButtonText: 'Create',
      cancelButtonText: 'Cancel',
      backButtonText: 'Back',
    },
    modifiedTabs: {},
    pageHeader: {},
  });

  const actions = {
    setSidePanelOpen,
    setNarrowTearsheetOpen,
    setWideTearsheetOpen,
    setComponentConfig,
    setCards,
    setCardToEdit,
  };
  const initialCardsToDisplay = 21;

  useEffect(() => {
    let tmpCards = [];
    for (let i = 0; i < initialCardsToDisplay; i++) {
      tmpCards.push({
        partitions: 1,
        replicas: 'Factor 1',
        retention: 'A month',
        topic: {
          name: 'Example ' + i,
          description: 'Some description here ' + i,
          author: 'Jane Doe',
          date: new Date(),
        },
      });
    }

    setCards(tmpCards);
  }, []);

  return (
    <div className="component-playground">
      <GlobalHeader />
      <div
        style={{
          // stylelint-disable-next-line carbon/layout-use
          marginTop: '48px',
        }}
      ></div>
      <PageHeader setIsOpen={setMultiStepTearsheetOpen} />
      <MultiStepTearsheetWide
        cards={cards}
        isOpen={multiStepTearsheetOpen}
        setIsOpen={setMultiStepTearsheetOpen}
        componentConfig={componentConfig.createTearsheet}
        actions={actions}
      />
      {cardToEdit !== undefined && (
        <SidePanel
          data={cards[cardToEdit]}
          actions={actions}
          index={cardToEdit}
          cards={cards}
          isOpen={sidePanelOpen}
          setIsOpen={setSidePanelOpen}
          componentConfig={componentConfig}
        />
      )}

      <TearsheetNarrow
        isOpen={narrowTearsheetOpen}
        setIsOpen={setNarrowTearsheetOpen}
      />
      <TearsheetWide
        isOpen={wideTearsheetOpen}
        setIsOpen={setWideTearsheetOpen}
      />

      <Cascade grid>
        {cards.map((card, index) => {
          return (
            <Column
              key={card.topic.name}
              lg={4}
              style={{
                // stylelint-disable-next-line carbon/layout-use
                marginTop: '36px',
              }}
            >
              <ProductiveCard
                data={cards[index]}
                index={index}
                cards={cards}
                actions={actions}
                config={componentConfig}
              />
            </Column>
          );
        })}
      </Cascade>
    </div>
  );
};

export default App;
