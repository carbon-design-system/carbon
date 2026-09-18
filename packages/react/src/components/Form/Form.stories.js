/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
import { PasswordInput } from '../PasswordInput';
import { Stack } from '../Stack';
import ComboBox from '../ComboBox';
import Dropdown, { DropdownSkeleton } from '../Dropdown';
import DatePicker, { DatePickerSkeleton } from '../DatePicker';
import DatePickerInput from '../DatePickerInput';
import { MultiSelect, FilterableMultiSelect } from '../MultiSelect';
import { IconButton } from '../IconButton';
import { View, FolderOpen, Folders } from '@carbon/icons-react';
import { AILabel, AILabelContent, AILabelActions } from '../AILabel';
import '../AILabel/ailabel-story.scss';

import mdx from './Form.mdx';

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
    className: 'some-class',
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
    className: {
      control: { type: 'text' },
      description: 'Specify a custom className to be applied to the form',
    },
    onSubmit: {
      action: 'onSubmit',
    },
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
      description: 'Specify whether the form inputs should be disabled',
    },
    readOnly: {
      control: { type: 'boolean' },
      description: 'Specify whether the form inputs should be read-only',
    },
    invalid: {
      control: { type: 'boolean' },
      description: 'Specify whether the form inputs are in an invalid state',
    },
    invalidText: {
      control: { type: 'text' },
      description: 'Provide the text for the invalid state',
    },
    warn: {
      control: { type: 'boolean' },
      description: 'Specify whether the form inputs should display a warning',
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
    className,
    onSubmit,
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

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit?.(event);
  };

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
    <Form
      aria-label="new project setup"
      className={className}
      onSubmit={handleSubmit}>
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
        <div style={formRowStyle}>
          <div style={formColStyle}>
            <TextInputSkeleton id="skeleton-repo" />
          </div>
          <div style={formColStyle}>
            <TextInputSkeleton id="skeleton-password" />
          </div>
        </div>
      </Stack>
    </Form>
  ) : (
    <Form
      aria-label="new project setup"
      className={className}
      onSubmit={handleSubmit}>
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
            <DatePicker datePickerType="range" readOnly={readOnly}>
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
            <DatePicker datePickerType="simple" readOnly={readOnly}>
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
              defaultValue={5000}
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

        <PasswordInput
          id="repo-password"
          labelText="Password"
          helperText="Must be at least 6 characters and include an uppercase letter, a lowercase letter, and a number."
          placeholder="Enter password"
          required
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
          size={size}
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

Default.propTypes = {
  className: PropTypes.string,
  onSubmit: PropTypes.func,
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

export const withAILabel = (args) => {
  const mergedArgs = { ...args, size: 'md' };
  return <Default {...mergedArgs} />;
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
