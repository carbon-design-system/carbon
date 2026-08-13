/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import Checkbox from '../Checkbox';
import Form from './Form';
import FormGroup from '../FormGroup';
import FileUploader from '../FileUploader';
import { NumberInput, NumberInputSkeleton } from '../NumberInput';
import RadioButton from '../RadioButton';
import RadioButtonGroup from '../RadioButtonGroup';
import Button from '../Button';
import {
  ComposedModal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '../ComposedModal';
import Search, { SearchSkeleton } from '../Search';
import Select, { SelectSkeleton } from '../Select';
import SelectItem from '../SelectItem';
import TextArea, { TextAreaSkeleton } from '../TextArea';
import TextInput, { TextInputSkeleton } from '../TextInput';
import { Stack } from '../Stack';
import ComboBox from '../ComboBox';
import Dropdown, { DropdownSkeleton } from '../Dropdown';
import DatePicker, { DatePickerSkeleton } from '../DatePicker';
import DatePickerInput from '../DatePickerInput';
import { MultiSelect, FilterableMultiSelect } from '../MultiSelect';
import FluidComboBox, { FluidComboBoxSkeleton } from '../FluidComboBox';
import FluidForm from '../FluidForm';
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
import { IconButton } from '../IconButton';
import { View, FolderOpen, Folders } from '@carbon/icons-react';
import { AILabel, AILabelContent, AILabelActions } from '../AILabel';
import '../AILabel/ailabel-story.scss';

import mdx from './Form.mdx';

const numberInputProps = {
  className: 'some-class',
  id: 'number-input-1',
  label: 'Number Input',
  min: 0,
  max: 100,
  value: 50,
  step: 10,
  iconDescription: 'Add/decrement number',
};

const TextInputProps = {
  className: 'some-class',
  id: 'test2',
  labelText: 'Text Input label',
  placeholder: 'Placeholder text',
};

const PasswordProps = {
  className: 'some-class',
  id: 'test3',
  labelText: 'Password',
};

const InvalidPasswordProps = {
  className: 'some-class',
  id: 'test4',
  labelText: 'Password',
  invalid: true,
  invalidText: 'Invalid password.',
};

const textareaProps = {
  labelText: 'Text Area label',
  className: 'some-class',
  placeholder: 'Placeholder text',
  id: 'test5',
  rows: 4,
};

const buttonEvents = {
  className: 'some-class',
};

export default {
  title: 'Components/Form',
  component: Form,
  parameters: {
    docs: {
      page: mdx,
    },
  },
  // ── Shared controls inherited by every story ──────────────────────────────
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
      control: { type: 'boolean' },
      description: 'Attach an AI Label decorator to all inputs that support it',
      table: { category: 'AILabel' },
    },
    revertActive: {
      control: { type: 'boolean' },
      table: { category: 'AILabel' },
    },
    showInModal: {
      control: { type: 'boolean' },
      description:
        'Render the entire form inside a ComposedModal with a trigger button',
    },
    disabled: {
      control: { type: 'boolean' },
    },
    readOnly: {
      control: { type: 'boolean' },
    },
    invalid: {
      control: { type: 'boolean' },
    },
    invalidText: {
      control: { type: 'text' },
    },
    warn: {
      control: { type: 'boolean' },
    },
    warnText: {
      control: { type: 'text' },
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
    size,
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

  // xs is only valid for TextInput, Select, Search — clamp to sm for list-box components
  const listBoxSize = size === 'xs' ? 'sm' : size;

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
            Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed
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
    size,
    disabled,
    readOnly,
    invalid,
    invalidText,
    warn,
    warnText,
    ...(decorator ? { decorator } : {}),
  };

  const listBoxProps = {
    ...sharedProps,
    size: listBoxSize,
  };

  const formContent = skeleton ? (
    <Form aria-label="new project setup">
      <Stack gap={5}>
        <SearchSkeleton />
        <div style={formRowStyle}>
          <div style={formColStyle}>
            <TextInputSkeleton id="skeleton-project-name" />
          </div>
          <div style={formColStyle}>
            <TextInputSkeleton id="skeleton-project-id" />
          </div>
        </div>
        <div style={formRowStyle}>
          <div style={formColStyle}>
            <DropdownSkeleton />
          </div>
          <div style={formColStyle}>
            <DropdownSkeleton />
          </div>
        </div>
        <DropdownSkeleton />
        <div style={dateRowStyle}>
          <div style={dateRangeColStyle}>
            <DatePickerSkeleton range />
          </div>
          <div style={dateSimpleColStyle}>
            <DatePickerSkeleton />
          </div>
        </div>
        <div style={formRowStyle}>
          <div style={formColStyle}>
            <NumberInputSkeleton />
          </div>
          <div style={formColStyle}>
            <SelectSkeleton id="skeleton-currency" />
          </div>
        </div>
        <DropdownSkeleton />
        <DropdownSkeleton />
        <TextAreaSkeleton />
        <TextInputSkeleton id="skeleton-repo" />
      </Stack>
    </Form>
  ) : (
    <Form aria-label="new project setup">
      <Stack gap={5}>
        <Search
          size={size}
          id="search-members"
          labelText="Search members"
          placeholder="e.g. Jane Smith"
          disabled={disabled}
        />

        {/* ── Project basics ── */}
        <div style={formRowStyle}>
          <div style={formColStyle}>
            <TextInput
              id="project-name"
              labelText="Project name"
              helperText="Short, descriptive project name."
              placeholder="e.g. Carbon Design System"
              {...sharedProps}
            />
          </div>
          <div style={formColStyle}>
            <TextInput
              id="project-id"
              labelText="Project ID"
              helperText="Lowercase letters, numbers, hyphens only."
              placeholder="e.g. carbon-design-system"
              {...sharedProps}
            />
          </div>
        </div>

        {/* ── Team & ownership ── */}
        <div style={formRowStyle}>
          <div style={formColStyle}>
            <Dropdown
              id="workspace"
              titleText="Workspace"
              helperText="Workspace this project belongs to."
              initialSelectedItem={items[1]}
              label="Select workspace"
              items={items}
              itemToString={(item) => (item ? item.text : '')}
              {...listBoxProps}
            />
          </div>
          <div style={formColStyle}>
            <ComboBox
              id="project-lead"
              onChange={() => {}}
              items={items}
              itemToString={(item) => (item ? item.text : '')}
              titleText="Project lead"
              helperText="Start typing to find a team member."
              placeholder="Search members..."
              {...listBoxProps}
            />
          </div>
        </div>

        <MultiSelect
          id="team-members"
          titleText="Team members"
          label="Select members"
          helperText="Everyone who will have access."
          items={items}
          itemToString={(item) => (item ? item.text : '')}
          selectionFeedback="top-after-reopen"
          {...listBoxProps}
        />

        <div style={dateRowStyle}>
          <div style={dateRangeColStyle}>
            <DatePicker datePickerType="range">
              <DatePickerInput
                id="start-date"
                placeholder="mm/dd/yyyy"
                labelText="Start date"
                helperText="Active work begins."
                {...sharedProps}
              />
              <DatePickerInput
                id="end-date"
                placeholder="mm/dd/yyyy"
                labelText="End date"
                helperText="Active work ends."
                {...sharedProps}
              />
            </DatePicker>
          </div>
          <div style={dateSimpleColStyle}>
            <DatePicker datePickerType="simple">
              <DatePickerInput
                id="deadline"
                placeholder="mm/dd/yyyy"
                labelText="Deadline"
                helperText="Final delivery date."
                {...sharedProps}
              />
            </DatePicker>
          </div>
        </div>

        <div style={formRowStyle}>
          <div style={formColStyle}>
            <NumberInput
              id="budget"
              label="Budget"
              helperText="Total allocated budget."
              min={0}
              max={10000000}
              value={5000}
              step={500}
              iconDescription="Adjust budget"
              {...listBoxProps}
            />
          </div>
          <div style={formColStyle}>
            <Select
              id="currency"
              labelText="Currency"
              helperText="Currency for the budget above."
              defaultValue="usd"
              {...sharedProps}>
              <SelectItem value="usd" text="USD – US Dollar" />
              <SelectItem value="eur" text="EUR – Euro" />
              <SelectItem value="gbp" text="GBP – British Pound" />
              <SelectItem value="jpy" text="JPY – Japanese Yen" />
            </Select>
          </div>
        </div>

        {/* ── Classification ── */}
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

        <Dropdown
          id="project-type"
          titleText="Project type"
          helperText="Methodology used for this project."
          initialSelectedItem={items[2]}
          label="Select type"
          items={items}
          itemToString={(item) => (item ? item.text : '')}
          {...listBoxProps}
        />

        <FilterableMultiSelect
          id="tags"
          titleText="Tags"
          helperText="Labels to categorise and filter this project."
          placeholder="Filter"
          items={items}
          itemToString={(item) => (item ? item.text : '')}
          selectionFeedback="top-after-reopen"
          {...listBoxProps}
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

        {/* ── Additional details ── */}
        <TextArea
          id="project-description"
          labelText="Description"
          helperText="Goals and scope of this project."
          placeholder="What is this project about?"
          rows={4}
          {...sharedProps}
        />

        <TextInput
          id="repo-url"
          labelText="Repository URL"
          helperText="Link to an existing Git repository."
          placeholder="https://github.com/org/repo"
          {...sharedProps}
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
    </Form>
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

// Story-specific args — shared controls come from the export default above
Default.args = {
  size: 'md',
  showInModal: false,
};

Default.argTypes = {
  showInModal: {
    control: { type: 'boolean' },
    description:
      'Render the entire form inside a ComposedModal with a trigger button',
  },
  size: {
    control: { type: 'select' },
    options: ['xs', 'sm', 'md', 'lg'],
    description:
      'Size of all form inputs. xs is supported by TextInput, Select and Search; other components clamp to sm.',
  },
};

export const Fluid = (args) => {
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
            Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed
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

  // Fluid components don't accept a size prop — strip it from sharedProps
  const sharedProps = {
    disabled,
    readOnly,
    invalid,
    invalidText,
    warn,
    warnText,
    ...(decorator ? { decorator } : {}),
  };

  const fluidContent = skeleton ? (
    <FluidForm aria-label="new project setup">
      <Stack gap={5}>
        <FluidSearchSkeleton />
        <div style={formRowStyle}>
          <div style={formColStyle}>
            <FluidTextInputSkeleton
              id="f-skeleton-project-name"
              labelText="Project name"
            />
          </div>
          <div style={formColStyle}>
            <FluidTextInputSkeleton
              id="f-skeleton-project-id"
              labelText="Project ID"
            />
          </div>
        </div>
        <div style={formRowStyle}>
          <div style={formColStyle}>
            <FluidDropdownSkeleton id="f-skeleton-workspace" />
          </div>
          <div style={formColStyle}>
            <FluidComboBoxSkeleton id="f-skeleton-project-lead" />
          </div>
        </div>
        <FluidMultiSelectSkeleton id="f-skeleton-team-members" />
        <div style={dateRowStyle}>
          <div style={dateRangeColStyle}>
            <FluidDatePickerSkeleton
              datePickerType="range"
              labelText="Start date"
              placeholder="mm/dd/yyyy"
              id="f-skeleton-range"
            />
          </div>
          <div style={dateSimpleColStyle}>
            <FluidDatePickerSkeleton
              datePickerType="simple"
              labelText="Deadline"
              placeholder="mm/dd/yyyy"
              id="f-skeleton-deadline"
            />
          </div>
        </div>
        <div style={formRowStyle}>
          <div style={formColStyle}>
            <FluidNumberInputSkeleton label="Budget" id="f-skeleton-budget" />
          </div>
          <div style={formColStyle}>
            <FluidSelectSkeleton id="f-skeleton-currency" />
          </div>
        </div>
        <FluidDropdownSkeleton id="f-skeleton-project-type" />
        <FluidMultiSelectSkeleton id="f-skeleton-tags" />
        <FluidTextAreaSkeleton
          labelText="Description"
          id="f-skeleton-description"
        />
        <FluidTextInputSkeleton
          id="f-skeleton-repo-url"
          labelText="Repository URL"
        />
      </Stack>
    </FluidForm>
  ) : (
    <FluidForm aria-label="new project setup">
      <Stack gap={5}>
        <FluidSearch
          id="f-search-members"
          labelText="Search members"
          placeholder="e.g. Jane Smith"
          disabled={disabled}
        />

        {/* ── Project basics ── */}
        <div style={formRowStyle}>
          <div style={formColStyle}>
            <FluidTextInput
              id="f-project-name"
              labelText="Project name"
              placeholder="e.g. Carbon Design System"
              {...sharedProps}
            />
          </div>
          <div style={formColStyle}>
            <FluidTextInput
              id="f-project-id"
              labelText="Project ID"
              placeholder="e.g. carbon-design-system"
              {...sharedProps}
            />
          </div>
        </div>

        {/* ── Team & ownership ── */}
        <div style={formRowStyle}>
          <div style={formColStyle}>
            <FluidDropdown
              id="f-workspace"
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
              id="f-project-lead"
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
          id="f-team-members"
          titleText="Team members"
          label="Select members"
          items={items}
          itemToString={(item) => (item ? item.text : '')}
          selectionFeedback="top-after-reopen"
          {...sharedProps}
        />

        <div style={dateRowStyle}>
          <div style={dateRangeColStyle}>
            <FluidDatePicker datePickerType="range">
              <FluidDatePickerInput
                id="f-start-date"
                placeholder="mm/dd/yyyy"
                labelText="Start date"
                {...sharedProps}
              />
              <FluidDatePickerInput
                id="f-end-date"
                placeholder="mm/dd/yyyy"
                labelText="End date"
                {...sharedProps}
              />
            </FluidDatePicker>
          </div>
          <div style={dateSimpleColStyle}>
            <FluidDatePicker datePickerType="simple">
              <FluidDatePickerInput
                id="f-deadline"
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
              id="f-budget"
              label="Budget"
              min={0}
              max={10000000}
              value={5000}
              step={500}
              iconDescription="Adjust budget"
              {...sharedProps}
            />
          </div>
          <div style={formColStyle}>
            <FluidSelect
              id="f-currency"
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

        {/* ── Classification ── */}
        <RadioButtonGroup
          name="f-project-visibility"
          defaultSelected="private"
          legendText="Visibility"
          helperText="Who can see and access this project."
          disabled={disabled}
          readOnly={readOnly}>
          <RadioButton
            value="private"
            id="f-vis-private"
            labelText="Private – only invited members"
          />
          <RadioButton
            value="internal"
            id="f-vis-internal"
            labelText="Internal – everyone in the org"
          />
          <RadioButton
            value="public"
            id="f-vis-public"
            labelText="Public – anyone with the link"
          />
        </RadioButtonGroup>

        <FluidDropdown
          id="f-project-type"
          titleText="Project type"
          initialSelectedItem={items[2]}
          label="Select type"
          items={items}
          itemToString={(item) => (item ? item.text : '')}
          {...sharedProps}
        />

        <FluidFilterableMultiSelect
          id="f-tags"
          titleText="Tags"
          placeholder="Filter"
          items={items}
          itemToString={(item) => (item ? item.text : '')}
          selectionFeedback="top-after-reopen"
          {...sharedProps}
        />

        <FormGroup legendText="Features">
          <Checkbox
            id="f-feat-issues"
            labelText="Issue tracking"
            defaultChecked
            disabled={disabled}
          />
          <Checkbox
            id="f-feat-wiki"
            labelText="Wiki"
            defaultChecked
            disabled={disabled}
          />
          <Checkbox
            id="f-feat-ci"
            labelText="CI / CD pipeline"
            disabled={disabled}
          />
          <Checkbox
            id="f-feat-releases"
            labelText="Releases"
            disabled={disabled}
          />
        </FormGroup>

        {/* ── Additional details ── */}
        <FluidTextArea
          id="f-project-description"
          labelText="Description"
          placeholder="What is this project about?"
          rows={4}
          {...sharedProps}
        />

        <FluidTextInput
          id="f-repo-url"
          labelText="Repository URL"
          placeholder="https://github.com/org/repo"
          {...sharedProps}
        />

        <FormGroup legendText="Project assets">
          <FileUploader
            id="f-file-assets"
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
            <div style={{ padding: '1rem' }}>{fluidContent}</div>
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

  return <div style={formShellStyle}>{fluidContent}</div>;
};

// Story-specific args — shared controls come from the export default above
Fluid.args = {
  showInModal: false,
};

Fluid.argTypes = {
  showInModal: {
    control: { type: 'boolean' },
    description:
      'Render the entire form inside a ComposedModal with a trigger button',
  },
  size: {
    // Fluid components do not support a size prop — hide this control
    table: { disable: true },
  },
};

export const withAILabel = (args) => {
  const mergedArgs = { ...args, size: 'md' };
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 18rem), 1fr))',
        gap: '2rem',
        alignItems: 'start',
      }}>
      <div style={{ minWidth: 0, maxWidth: '100%' }}>
        <p style={{ marginBottom: '1rem', fontWeight: 600 }}>Default</p>
        <Default {...mergedArgs} />
      </div>
      <div style={{ minWidth: 0, maxWidth: '100%' }}>
        <p style={{ marginBottom: '1rem', fontWeight: 600 }}>Fluid</p>
        <Fluid {...mergedArgs} />
      </div>
    </div>
  );
};

withAILabel.args = {
  aiLabel: true,
};

withAILabel.storyName = 'With AI Label';

withAILabel.argTypes = {
  size: {
    table: { disable: true },
  },
};
