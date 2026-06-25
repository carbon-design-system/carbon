/**
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { SidePanel as CCSidePanel, UserProfileImage } from '../../../../src';
import {
  Column,
  NumberInput,
  RadioButton,
  RadioButtonGroup,
  Row,
  TextInput,
  FormGroup,
  usePrefix,
} from '@carbon/react';
import { pkg } from '../../../../src/settings';

import costaPic from '../../_story-assets/costa.jpeg';

const SidePanel = (props) => {
  const carbonPrefix = usePrefix();
  const [editValues, setEditValues] = useState(props.data);
  const [isInvalid, setIsInvalid] = useState(false);
  const blockClass = `${pkg.prefix}--create-side-panel`;

  const updateCards = () => {
    let tmpCards = Array.from(props.cards);
    tmpCards.splice(props.index, 1, editValues);
    props.actions.setCards(tmpCards);
  };

  useEffect(() => {
    setEditValues(props.data);
  }, [props.data]);
  return (
    <CCSidePanel
      actions={[
        {
          kind: 'primary',
          label: 'Save changes',
          onClick: () => {
            updateCards();
            props.setIsOpen(false);
          },
        },
      ]}
      formDescription="description here"
      formTitle="form title"
      includeOverlay
      open={props.isOpen}
      subtitle="Edit the values of the topic."
      title={`Edit ${editValues.topic.name}`}
      selectorPageContent="#cloud-and-cognitive-page-content"
      onRequestClose={() => {
        props.setIsOpen(false);
      }}
    >
      <FormGroup
        className={`${blockClass}__form`}
        legendText="Topic information"
      >
        <div className={`${carbonPrefix}--col-lg-12`}>
          <TextInput
            labelText="Topic name"
            id="tearsheet-multi-step-story-text-input-multi-step-1"
            value={editValues ? editValues.topic.name : ''}
            placeholder="Enter topic name"
            onChange={(event) => {
              if (event.target.value.length) {
                setIsInvalid(false);
              }
              setEditValues({
                ...editValues,
                topic: {
                  ...editValues.topic,
                  [event.target.name]: event.target.value,
                },
              });
            }}
            name="name"
            invalid={isInvalid}
            invalidText="This is a required field"
            onBlur={() => {
              console.log('on blur');
              //   if (!stepOneTextInputValue.length) setIsInvalid(true);
            }}
          />
        </div>
        <TextInput
          labelText="Description"
          id="tearsheet-multi-step-story-text-input-multi-step-1-input-2"
          value={editValues.topic.description}
          placeholder="Enter topic description"
          name="description"
          onChange={(event) => {
            setEditValues({
              ...editValues,
              topic: {
                ...editValues.topic,
                [event.target.name]: event.target.value,
              },
            });
          }}
        />

        <div className={`${carbonPrefix}--col-lg-3`}>
          <UserProfileImage
            backgroundColor="light-cyan"
            theme="light"
            size="xlg"
            initials="CC"
            imageDescription="blank"
            image={costaPic}
          />
        </div>
        <div className={`${carbonPrefix}--col-lg-10`}>
          <TextInput
            labelText="Author"
            id="tearsheet-multi-step-story-text-input-multi-step-1-input-3"
            value={editValues.topic.author}
            name="author"
            placeholder="Enter topic version"
            onChange={(event) => {
              setEditValues({
                ...editValues,
                topic: {
                  ...editValues.topic,
                  [event.target.name]: event.target.value,
                },
              });
            }}
          />
        </div>
      </FormGroup>

      {/* <TextInput
                labelText="Date published"
                id="tearsheet-multi-step-story-text-input-multi-step-1-input-3"
                //value={props.data.topic.data}
                name="date"
                placeholder="mm/dd/yyyy"
                onChange={(event) => {}
                    //setCreateValues({...createValues, "topic" : { ...createValues.topic, [event.target.name] : event.target.value}})
                }
              /> */}

      <FormGroup
        className={`${blockClass}__form`}
        legendText="form group legend text"
      >
        <Row>
          <Column xlg={12} lg={12} md={12}>
            <NumberInput
              iconDescription="Choose a number"
              id="carbon-number"
              min={1}
              max={100}
              value={editValues.partitions}
              name="partitions"
              label="Partitions"
              helperText="1 partition is sufficient for getting started but, production systems often have more."
              invalidText="Max partitions is 100, min is 1"
              onChange={() => {
                setEditValues({
                  ...editValues,
                  partitions: document.getElementById('carbon-number').value,
                });
              }}
            />
          </Column>
        </Row>
      </FormGroup>
      <FormGroup
        className={`${blockClass}__form`}
        legendText="form group legend text"
      >
        <Row>
          <Column xlg={8} lg={8} md={8} sm={8}>
            <RadioButtonGroup
              id="retention"
              legendText="Message retention"
              name="retention"
              defaultSelected={editValues.retention}
              onChange={(event) => {
                console.log('radio', event);
                setEditValues({ ...editValues, retention: event });
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
      </FormGroup>
      <Row>
        <Column xlg={8} lg={8} md={8} sm={8}>
          <RadioButtonGroup
            legendText="Replicas"
            name="replicas"
            defaultSelected={editValues.replicas}
            onChange={(event) => {
              setEditValues({ ...editValues, replicas: event });
            }}
            orientation="vertical"
          >
            <RadioButton
              labelText="Replication factor: 1"
              value="factor-1"
              id="factor-1`"
              checked
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
    </CCSidePanel>
  );
};
SidePanel.propTypes = {
  actions: PropTypes.object,
  cards: PropTypes.object,
  data: PropTypes.object,
  index: PropTypes.number,
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
};
export default SidePanel;
