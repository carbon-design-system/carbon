/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { Dropdown, TextArea, TextInput } from '@carbon/react';
import { CreateModal } from '../components/CreateModal';

const dropdownItems = ['Option 0', 'Option 1', 'Option 2'];

interface StandardCreateModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const StandardCreateModal = ({
  open,
  setOpen,
}: StandardCreateModalProps) => {
  const [textInput, setTextInput] = useState('');
  const [selectedDropdown, setSelectedDropdown] = useState<string | null>(null);
  const [textArea, setTextArea] = useState('');

  const handleClose = () => {
    // Reset form fields when modal closes
    setTextInput('');
    setSelectedDropdown(null);
    setTextArea('');
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
      selectorPrimaryFocus="#text-input-1"
      onRequestSubmit={handleClose}
    >
      <TextInput
        id="text-input-1"
        labelText="Text input label"
        helperText="Helper text goes here"
        placeholder="Placeholder"
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
      />
      <Dropdown
        id="dropdown-1"
        titleText="Dropdown label"
        helperText="This is some helper text"
        label="Dropdown menu options"
        items={dropdownItems}
        selectedItem={selectedDropdown}
        onChange={({ selectedItem }) =>
          setSelectedDropdown(selectedItem ?? null)
        }
      />
      <TextArea
        id="text-area-1"
        placeholder="Placeholder text"
        labelText="Text area label"
        helperText="Optional helper text"
        value={textArea}
        onChange={(e) => setTextArea(e.target.value)}
      />
    </CreateModal>
  );
};
