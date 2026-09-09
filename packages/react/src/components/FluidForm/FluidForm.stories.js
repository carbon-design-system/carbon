/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';

import FluidForm from '.';
import FluidComboBox, { FluidComboBoxSkeleton } from '../FluidComboBox';
import FluidNumberInput, {
  FluidNumberInputSkeleton,
} from '../FluidNumberInput';
import FluidDatePicker, { FluidDatePickerSkeleton } from '../FluidDatePicker';
import FluidDatePickerInput from '../FluidDatePickerInput';
import FluidDropdown, { FluidDropdownSkeleton } from '../FluidDropdown';
import FluidMultiSelect, {
  FluidMultiSelectSkeleton,
} from '../FluidMultiSelect';
import FluidFilterableMultiSelect from '../FluidMultiSelect/FluidFilterableMultiSelect';
import FluidSearch, { FluidSearchSkeleton } from '../FluidSearch';
import FluidSelect, { FluidSelectSkeleton } from '../FluidSelect';
import FluidTextArea, { FluidTextAreaSkeleton } from '../FluidTextArea';
import FluidTextInput, { FluidTextInputSkeleton } from '../FluidTextInput';
import FluidPasswordInput from '../FluidTextInput/FluidPasswordInput';
import Checkbox from '../Checkbox';
import FormGroup from '../FormGroup';
import FileUploader from '../FileUploader';
import RadioButton from '../RadioButton';
import RadioButtonGroup from '../RadioButtonGroup';
import Button from '../Button';
import {
  ComposedModal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '../ComposedModal';
import SelectItem from '../SelectItem';
import { Stack } from '../Stack';
import { IconButton } from '../IconButton';
import { View, FolderOpen, Folders } from '@carbon/icons-react';
import { AILabel, AILabelContent, AILabelActions } from '../AILabel';
import '../AILabel/ailabel-story.scss';
import mdx from './FluidForm.mdx';

export default {
  title: 'Components/Fluid Components/FluidForm',
  component: FluidForm,
  parameters: {
    docs: {
      page: mdx,
    },
  },
  args: {
    skeleton: false,
    aiLabel: false,
    revertActive: false,
    showInModal: false,
    disabled: false,
    readOnly: false,
    invalid: false,
    invalidText: 'Error message.',
    warn: false,
    warnText: 'Warning message.',
  },
  argTypes: {
    skeleton: {
      control: { type: 'boolean' },
      description: 'Render all form inputs as skeleton loaders simultaneously',
    },
    aiLabel: {
      table: { disable: true },
    },
    revertActive: {
      table: { disable: true },
    },
    showInModal: {
      control: { type: 'boolean' },
      description:
        'Render the entire form inside a ComposedModal with a trigger button',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Specify whether the fluid form inputs should be disabled',
    },
    readOnly: {
      control: { type: 'boolean' },
      description: 'Specify whether the fluid form inputs should be read-only',
    },
    invalid: {
      control: { type: 'boolean' },
      description:
        'Specify whether the fluid form inputs are in an invalid state',
    },
    invalidText: {
      control: { type: 'text' },
      description: 'Provide the text for the invalid state',
    },
    warn: {
      control: { type: 'boolean' },
      description:
        'Specify whether the fluid form inputs should display a warning',
    },
    warnText: {
      control: { type: 'text' },
      description: 'Provide the text for the warning state',
    },
  },
};

const items = [
  {
    id: 'option-0',
    text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
  },
  {
    id: 'option-1',
    text: 'Option 1',
  },
  {
    id: 'option-2',
    text: 'Option 2',
  },
  {
    id: 'option-3',
    text: 'Option 3 - a disabled item',
    disabled: true,
  },
  {
    id: 'option-4',
    text: 'Option 4',
  },
  {
    id: 'option-5',
    text: 'Option 5',
  },
];

const formRowStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '1rem',
};

const formColStyle = {
  flex: '1 1 12rem',
  minWidth: 0,
};

const dateRowStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '1rem',
  alignItems: 'flex-start',
};

const dateRangeColStyle = {
  flex: '0 1 auto',
};

const dateSimpleColStyle = {
  flex: '0 1 auto',
};

const formShellStyle = {
  width: '100%',
  maxWidth: '600px',
  minWidth: 0,
};

export const Default = (args) => {
  const {
    skeleton,
    showInModal,
    aiLabel,
    revertActive,
    disabled,
    readOnly,
    invalid,
    invalidText,
    warn,
    warnText,
  } = args;

  const [modalOpen, setModalOpen] = useState(false);

  const decorator = aiLabel ? (
    <AILabel
      className="ai-label-container"
      align="bottom-left"
      revertActive={revertActive}>
      <AILabelContent>
        <div>
          <p className="secondary">AI Explained</p>
          <h2 className="ai-label-heading">84%</h2>
          <p className="secondary bold">Confidence score</p>
          <p className="secondary">
            Lorem ipsum dolor sit amet, di os consectetur adipisicing elit, sed
            do eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.
          </p>
          <hr />
          <p className="secondary">Model type</p>
          <p className="bold">Foundation model</p>
        </div>
        <AILabelActions>
          <IconButton kind="ghost" label="View">
            <View />
          </IconButton>
          <IconButton kind="ghost" label="Open Folder">
            <FolderOpen />
          </IconButton>
          <IconButton kind="ghost" label="Folders">
            <Folders />
          </IconButton>
          <Button>View details</Button>
        </AILabelActions>
      </AILabelContent>
    </AILabel>
  ) : undefined;

  const sharedProps = {
    disabled,
    readOnly,
    invalid,
    invalidText,
    warn,
    warnText,
    ...(decorator ? { decorator } : {}),
  };

  const formContent = skeleton ? (
    <FluidForm aria-label="new project setup">
      <Stack gap={5}>
        <FluidSearchSkeleton />
        <div style={formRowStyle}>
          <div style={formColStyle}>
            <FluidTextInputSkeleton
              id="skeleton-project-name"
              labelText="Project name"
            />
          </div>
          <div style={formColStyle}>
            <FluidTextInputSkeleton
              id="skeleton-project-id"
              labelText="Project ID"
            />
          </div>
        </div>
        <div style={formRowStyle}>
          <div style={formColStyle}>
            <FluidDropdownSkeleton id="skeleton-workspace" />
          </div>
          <div style={formColStyle}>
            <FluidComboBoxSkeleton id="skeleton-project-lead" />
          </div>
        </div>
        <FluidMultiSelectSkeleton id="skeleton-team-members" />
        <div style={formRowStyle}>
          <div style={{ flex: '2 1 16rem', minWidth: 0 }}>
            <FluidDatePickerSkeleton datePickerType="range" />
          </div>
          <div style={{ flex: '1 1 8rem', minWidth: 0 }}>
            <FluidDatePickerSkeleton datePickerType="simple" />
          </div>
        </div>
        <div style={formRowStyle}>
          <div style={formColStyle}>
            <FluidNumberInputSkeleton label="Budget" id="skeleton-budget" />
          </div>
          <div style={formColStyle}>
            <FluidSelectSkeleton id="skeleton-currency" />
          </div>
        </div>
        <FluidDropdownSkeleton id="skeleton-project-type" />
        <FluidMultiSelectSkeleton id="skeleton-tags" />
        <FluidTextAreaSkeleton
          labelText="Description"
          id="skeleton-description"
        />
        <FluidTextInputSkeleton
          id="skeleton-repo-url"
          labelText="Repository URL"
        />
        <FluidTextInputSkeleton id="skeleton-password" labelText="Password" />
      </Stack>
    </FluidForm>
  ) : (
    <FluidForm aria-label="new project setup">
      <Stack gap={5}>
        <FluidSearch
          id="search-members"
          labelText="Search members"
          placeholder="e.g. Jane Smith"
          disabled={disabled}
        />

        <div style={formRowStyle}>
          <div style={formColStyle}>
            <FluidTextInput
              id="project-name"
              labelText="Project name"
              placeholder="e.g. Carbon Design System"
              {...sharedProps}
            />
          </div>
          <div style={formColStyle}>
            <FluidTextInput
              id="project-id"
              labelText="Project ID"
              placeholder="e.g. carbon-design-system"
              {...sharedProps}
            />
          </div>
        </div>

        <div style={formRowStyle}>
          <div style={formColStyle}>
            <FluidDropdown
              id="workspace"
              titleText="Workspace"
              initialSelectedItem={items[1]}
              label="Select workspace"
              items={items}
              itemToString={(item) => (item ? item.text : '')}
              {...sharedProps}
            />
          </div>
          <div style={formColStyle}>
            <FluidComboBox
              id="project-lead"
              onChange={() => {}}
              items={items}
              itemToString={(item) => (item ? item.text : '')}
              titleText="Project lead"
              placeholder="Search members..."
              {...sharedProps}
            />
          </div>
        </div>

        <FluidMultiSelect
          id="team-members"
          titleText="Team members"
          label="Select members"
          items={items}
          itemToString={(item) => (item ? item.text : '')}
          selectionFeedback="top-after-reopen"
          {...sharedProps}
        />

        <div style={dateRowStyle}>
          <div style={dateRangeColStyle}>
            <FluidDatePicker datePickerType="range" readOnly={readOnly}>
              <FluidDatePickerInput
                id="start-date"
                placeholder="mm/dd/yyyy"
                labelText="Start date"
                {...sharedProps}
              />
              <FluidDatePickerInput
                id="end-date"
                placeholder="mm/dd/yyyy"
                labelText="End date"
                {...sharedProps}
              />
            </FluidDatePicker>
          </div>
          <div style={dateSimpleColStyle}>
            <FluidDatePicker datePickerType="simple" readOnly={readOnly}>
              <FluidDatePickerInput
                id="deadline"
                placeholder="mm/dd/yyyy"
                labelText="Deadline"
                {...sharedProps}
              />
            </FluidDatePicker>
          </div>
        </div>

        <div style={formRowStyle}>
          <div style={formColStyle}>
            <FluidNumberInput
              id="budget"
              label="Budget"
              min={0}
              max={10000000}
              defaultValue={5000}
              step={500}
              iconDescription="Adjust budget"
              {...sharedProps}
            />
          </div>
          <div style={formColStyle}>
            <FluidSelect
              id="currency"
              labelText="Currency"
              defaultValue="usd"
              {...sharedProps}>
              <SelectItem value="usd" text="USD – US Dollar" />
              <SelectItem value="eur" text="EUR – Euro" />
              <SelectItem value="gbp" text="GBP – British Pound" />
              <SelectItem value="jpy" text="JPY – Japanese Yen" />
            </FluidSelect>
          </div>
        </div>

        <RadioButtonGroup
          name="project-visibility"
          defaultSelected="private"
          legendText="Visibility"
          helperText="Who can see and access this project."
          disabled={disabled}
          readOnly={readOnly}>
          <RadioButton
            value="private"
            id="vis-private"
            labelText="Private – only invited members"
          />
          <RadioButton
            value="internal"
            id="vis-internal"
            labelText="Internal – everyone in the org"
          />
          <RadioButton
            value="public"
            id="vis-public"
            labelText="Public – anyone with the link"
          />
        </RadioButtonGroup>

        <FluidDropdown
          id="project-type"
          titleText="Project type"
          initialSelectedItem={items[2]}
          label="Select type"
          items={items}
          itemToString={(item) => (item ? item.text : '')}
          {...sharedProps}
        />

        <FluidFilterableMultiSelect
          id="tags"
          titleText="Tags"
          placeholder="Filter"
          items={items}
          itemToString={(item) => (item ? item.text : '')}
          selectionFeedback="top-after-reopen"
          {...sharedProps}
        />

        <FormGroup legendText="Features">
          <Checkbox
            id="feat-issues"
            labelText="Issue tracking"
            defaultChecked
            disabled={disabled}
          />
          <Checkbox
            id="feat-wiki"
            labelText="Wiki"
            defaultChecked
            disabled={disabled}
          />
          <Checkbox
            id="feat-ci"
            labelText="CI / CD pipeline"
            disabled={disabled}
          />
          <Checkbox
            id="feat-releases"
            labelText="Releases"
            disabled={disabled}
          />
        </FormGroup>

        <FluidTextArea
          id="project-description"
          labelText="Description"
          placeholder="What is this project about?"
          rows={4}
          {...sharedProps}
        />

        <FluidTextInput
          id="repo-url"
          labelText="Repository URL"
          placeholder="https://github.com/org/repo"
          {...sharedProps}
        />

        <FluidPasswordInput
          id="repo-password"
          labelText="Password"
          placeholder="Enter password"
          required
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
          disabled={disabled}
          readOnly={readOnly}
          invalid={invalid}
          invalidText="Your password must be at least 6 characters as well as contain at least one uppercase, one lowercase, and one number."
          warn={warn}
          warnText={warnText}
        />

        <FormGroup legendText="Project assets">
          <FileUploader
            id="file-assets"
            role="button"
            labelDescription="Max 25 MB per file."
            buttonLabel="Add files"
            buttonKind="primary"
            size="md"
            filenameStatus="edit"
            accept={['.pdf', '.png', '.jpg', '.fig', '.sketch']}
            multiple={true}
            disabled={disabled}
            iconDescription="Remove file"
            name=""
          />
        </FormGroup>

        <Button
          type="submit"
          onClick={() => showInModal && setModalOpen(false)}>
          Create project
        </Button>
      </Stack>
    </FluidForm>
  );

  if (showInModal) {
    return (
      <>
        <Button onClick={() => setModalOpen(true)}>Open form</Button>
        <ComposedModal open={modalOpen} onClose={() => setModalOpen(false)}>
          <ModalHeader title="Create project" />
          <ModalBody hasScrollingContent>
            <div style={{ padding: '1rem' }}>{formContent}</div>
          </ModalBody>
          <ModalFooter
            primaryButtonText="Create project"
            secondaryButtonText="Cancel"
            onRequestClose={() => setModalOpen(false)}
            onRequestSubmit={() => setModalOpen(false)}
          />
        </ComposedModal>
      </>
    );
  }

  return <div style={formShellStyle}>{formContent}</div>;
};

Default.args = {
  showInModal: false,
};

Default.argTypes = {
  showInModal: {
    control: { type: 'boolean' },
    description:
      'Render the entire form inside a ComposedModal with a trigger button',
  },
};
