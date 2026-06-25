/**
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { CreateTearsheet, CreateTearsheetStep } from '../../../../src';
import {
  Column,
  //Dropdown,
  //Form,
  //FormGroup,
  NumberInput,
  RadioButton,
  RadioButtonGroup,
  Row,
  //Tabs,
  //Tab,
  TextInput,
  //Toggle,
} from '@carbon/react';

const MultiStepTearsheetWide = (props) => {
  const [createValues, setCreateValues] = useState({});

  return (
    <CreateTearsheet
      {...props.componentConfig}
      open={props.isOpen}
      onClose={() => props.setIsOpen(false)}
      onRequestSubmit={() => {
        let tmpCards = Array.from(props.cards);
        tmpCards.unshift(createValues);
        props.actions.setCards(tmpCards);
        setCreateValues({});
        console.log('creation value card', tmpCards);
      }}
    >
      <CreateTearsheetStep
        title="Create new task"
        fieldsetLegendText="Task information"
        disableSubmit={!createValues.topic?.name}
        subtitle="This is the unique name used to recognize your task"
        description="It will also be used by your producers and consumers as part of the
          connection information, so make it something easy to recognize."
      >
        <Row>
          <Column xlg={8} lg={8} md={8} sm={8}>
            <TextInput
              labelText="Task name"
              id="tearsheet-multi-step-story-text-input-multi-step-1"
              value={createValues.topic ? createValues.topic.name : ''}
              placeholder="Enter task name"
              onChange={(event) => {
                setCreateValues({
                  ...createValues,
                  topic: {
                    ...createValues.topic,
                    [event.target.name]: event.target.value,
                  },
                });
                //   if (event.target.value.length) setIsInvalid(false);
                //   setStepOneTextInputValue(event.target.value);
              }}
              name="name"
              invalid={false}
              invalidText="This is a required field"
            />
            <TextInput
              labelText="Description (optional)"
              id="tearsheet-multi-step-story-text-input-multi-step-1-input-2"
              //value={topicDescriptionValue}
              value={createValues.topic ? createValues.topic.description : ''}
              placeholder="Enter topic description"
              name="description"
              onChange={(event) =>
                setCreateValues({
                  ...createValues,
                  topic: {
                    ...createValues.topic,
                    [event.target.name]: event.target.value,
                  },
                })
              }
            />
            <TextInput
              labelText="Author (optional)"
              id="tearsheet-multi-step-story-text-input-multi-step-1-input-3"
              value={createValues.topic ? createValues.topic.author : ''}
              name="author"
              placeholder="Enter topic version"
              onChange={(event) =>
                setCreateValues({
                  ...createValues,
                  topic: {
                    ...createValues.topic,
                    [event.target.name]: event.target.value,
                  },
                })
              }
            />
            <TextInput
              labelText="Date published (optional)"
              id="tearsheet-multi-step-story-text-input-multi-step-1-input-3"
              value={createValues.topic ? createValues.topic.date : ''}
              name="date"
              placeholder="mm/dd/yyyy"
              onChange={(event) =>
                setCreateValues({
                  ...createValues,
                  topic: {
                    ...createValues.topic,
                    [event.target.name]: event.target.value,
                  },
                })
              }
            />
            {/* {hasSubmitError && (
                <InlineNotification
                  kind="error"
                  title="Error"
                  subtitle="Resolve errors to continue"
                  onClose={() => setHasSubmitError(false)}
                />
              )} */}
          </Column>
        </Row>
      </CreateTearsheetStep>
      <CreateTearsheetStep
        title="Partitions"
        subtitle="One or more partitions make up a topic. A partition is an ordered
          list of messages."
        description="Partitions are distributed across the brokers in order to increase
          the scalability of your topic. You can also use them to distribute
          messages across the members of a consumer group."
        fieldsetLegendText="Partition information"
        //   disableSubmit={
        //     !stepTwoTextInputValue ||
        //     stepTwoTextInputValue > 100 ||
        //     stepTwoTextInputValue < 1
        //   }
      >
        <Row>
          <Column xlg={3} lg={4} md={3}>
            <NumberInput
              iconDescription="Choose a number"
              id="carbon-number"
              min={1}
              max={100}
              value={createValues.partitions ? createValues.partitions : '1'}
              name="partitions"
              label="Partitions"
              helperText="1 partition is sufficient for getting started but, production systems often have more."
              invalidText="Max partitions is 100, min is 1"
              onChange={() => {
                setCreateValues({
                  ...createValues,
                  partitions: document.getElementById('carbon-number').value,
                });
              }}
            />
          </Column>
        </Row>
      </CreateTearsheetStep>
      <CreateTearsheetStep
        title="Message retention"
        subtitle="This is how long messages are retained before they are deleted."
        description="If your messages are not read by a consumer within this time, they
          will be missed."
        fieldsetLegendText="Message retention scheduling"
        //disableSubmit={!stepThreeTextInputValue}
        onNext={() => {
          Promise.resolve();
          //setCreateValues({...createValues, "retention"  : document.getElementsById('retention').value})
        }}
      >
        <Row>
          <Column xlg={8} lg={8} md={8} sm={8}>
            <RadioButtonGroup
              id="retention"
              legendText="Message retention"
              name="retention"
              defaultSelected="one-day"
              valueSelected="one-day"
              onChange={(event) => {
                setCreateValues({ ...createValues, retention: event });
              }}
              orientation="vertical"
            >
              <RadioButton labelText="A day" value="one-day" id="one-day" />
              <RadioButton labelText="A week" value="one-week" id="one-week" />
              <RadioButton
                labelText="A month"
                value="one-month"
                id="one-month"
              />
              <RadioButton labelText="Custom" value="custom" id="custom" />
            </RadioButtonGroup>
          </Column>
        </Row>
      </CreateTearsheetStep>

      <CreateTearsheetStep
        title="Replicas"
        description="The partitions of each topic can be replicated across a configurable number of brokers"
        fieldsetLegendText=""
        //disableSubmit={!stepThreeTextInputValue}
        onNext={() => Promise.resolve()}
      >
        <Row>
          <Column xlg={8} lg={8} md={8} sm={8}>
            <RadioButtonGroup
              legendText="Replicas"
              name="replicas"
              defaultSelected="factor-1"
              onChange={(event) =>
                setCreateValues({ ...createValues, replicas: event })
              }
              orientation="vertical"
            >
              <RadioButton
                labelText="Replication factor: 1"
                value="factor-1"
                id="factor-1"
              />
              <RadioButton
                labelText="Replication factor: 2"
                value="factor-2"
                id="factor-2"
              />
              <RadioButton
                labelText="Replication factor: 3"
                value="factor-3"
                id="factor-3"
              />
            </RadioButtonGroup>
          </Column>
        </Row>
      </CreateTearsheetStep>
    </CreateTearsheet>
  );
};
MultiStepTearsheetWide.propTypes = {
  actions: PropTypes.object,
  cards: PropTypes.array,
  componentConfig: PropTypes.object,
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
};

export default MultiStepTearsheetWide;
