/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { RadioButton, RadioButtonGroup, TextInput } from '@carbon/react';
import { CreateModal } from '../components/CreateModal';

interface CreateModalWithValidationProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const CreateModalWithValidation = ({
  open,
  setOpen,
}: CreateModalWithValidationProps) => {
  const [textInput, setTextInput] = useState('');
  const [invalid, setInvalid] = useState(false);

  const handleClose = () => {
    // Reset form fields when modal closes
    setTextInput('');
    setInvalid(false);
    setOpen(false);
  };

  return (
    <CreateModal
      open={open}
      onRequestClose={handleClose}
      title="Title"
      subtitle="Your subtitle text will appear here"
      description="This is example description text that will appear here in your modal"
      primaryButtonText="Create"
      secondaryButtonText="Cancel"
      disableSubmit={textInput.length === 0}
      selectorPrimaryFocus="#text-input-1"
      onRequestSubmit={handleClose}
    >
      <TextInput
        id="text-input-1"
        labelText="Text input label"
        placeholder="Placeholder"
        value={textInput}
        onChange={(e) => {
          setTextInput(e.target.value);
          setInvalid(false);
        }}
        onBlur={() => {
          textInput.length === 0 && setInvalid(true);
        }}
        invalid={invalid}
        invalidText="This is a required field"
      />
      <TextInput
        id="text-input-2"
        labelText="Text input label (optional)"
        placeholder="Placeholder"
      />
      <TextInput
        id="text-input-3"
        labelText="Text input label (optional)"
        placeholder="Placeholder"
      />
      <RadioButtonGroup
        legendText="Radio button legend text goes here"
        name="radio-button-group"
        defaultSelected="radio-1"
      >
        <RadioButton labelText="Radio-1" value="radio-1" id="radio-1" />
        <RadioButton labelText="Radio-2" value="radio-2" id="radio-2" />
        <RadioButton labelText="Radio-3" value="radio-3" id="radio-3" />
      </RadioButtonGroup>
    </CreateModal>
  );
};
