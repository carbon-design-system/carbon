import React from 'react';
import Button from '../Button';
import Checkbox from '../Checkbox';
import CheckboxGroup from '../CheckboxGroup';
import ComboBox from '../ComboBox';
import {
  ComposedModal,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from '../ComposedModal';
import DatePicker from '../DatePicker';
import DatePickerInput from '../DatePickerInput';
import Dropdown from '../Dropdown';
import Modal from '../Modal';
import { MultiSelect, FilterableMultiSelect } from '../MultiSelect';
import { NumberInput } from '../NumberInput';
import RadioButton from '../RadioButton';
import RadioButtonGroup from '../RadioButtonGroup';
import Select from '../Select';
import SelectItem from '../SelectItem';
import Tag from '../Tag';
import TextArea from '../TextArea';
import TextInput from '../TextInput';
import {
  ClickableTile,
  ExpandableTile,
  SelectableTile,
  Tile,
  TileAboveTheFoldContent,
  TileBelowTheFoldContent,
} from '../Tile';
import { IconButton } from '../IconButton';
import {
  ArrowRight,
  View,
  FolderOpen,
  Folders,
  Asleep,
} from '@carbon/icons-react';
import { Slug, SlugContent, SlugActions } from '../Slug';
import './slug-story.scss';

export default {
  title: 'Experimental/unstable__Slug/Examples',
  component: null,
};

const args = {
  invalid: false,
  invalidText:
    'Error message that is really long can wrap to more lines but should not be excessively long.',
  disabled: false,
  warn: false,
  warnText:
    'Warning message that is really long can wrap to more lines but should not be excessively long.',
};

const argTypes = {
  children: {
    table: {
      disable: true,
    },
  },
  className: {
    table: {
      disable: true,
    },
  },
  disabled: {
    control: {
      type: 'boolean',
    },
  },
  invalid: {
    control: {
      type: 'boolean',
    },
  },
  invalidText: {
    control: {
      type: 'text',
    },
  },
  warn: {
    control: {
      type: 'boolean',
    },
  },
  warnText: {
    control: {
      type: 'text',
    },
  },
  slug: {
    description:
      '**Experimental**: Provide a `Slug` component to be rendered inside the component',
  },
};

const textareaProps = {
  labelText: 'Text Area label',
  className: 'some-class',
  placeholder: 'Placeholder text',
  id: 'test5',
  rows: 4,
};

const TextInputProps = {
  className: 'some-class',
  id: 'test2',
  labelText: 'Text Input label',
  placeholder: 'Placeholder text',
};

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

const slug = (
  <Slug className="slug-container">
    <SlugContent>
      <div>
        <p className="secondary">AI Explained</p>
        <h1>84%</h1>
        <p className="secondary bold">Confidence score</p>
        <p className="secondary">
          Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.
        </p>
        <hr />
        <p className="secondary">Model type</p>
        <p className="bold">Foundation model</p>
      </div>
      <SlugActions>
        <IconButton kind="ghost" label="View">
          <View />
        </IconButton>
        <IconButton kind="ghost" label="Open Folder">
          <FolderOpen />
        </IconButton>
        <IconButton kind="ghost" label="Folders">
          <Folders />
        </IconButton>
        <Button>View literature</Button>
      </SlugActions>
    </SlugContent>
  </Slug>
);

const slugFunc = (kind) => (
  <Slug kind={kind}>
    <SlugContent>
      <div>
        <p className="secondary">AI Explained</p>
        <h1>84%</h1>
        <p className="secondary bold">Confidence score</p>
        <p className="secondary">
          Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.
        </p>
        <hr />
        <p className="secondary">Model type</p>
        <p className="bold">Foundation model</p>
      </div>
      <SlugActions>
        <IconButton kind="ghost" label="View">
          <View />
        </IconButton>
        <IconButton kind="ghost" label="Open Folder">
          <FolderOpen />
        </IconButton>
        <IconButton kind="ghost" label="Folders">
          <Folders />
        </IconButton>
        <Button>View literature</Button>
      </SlugActions>
    </SlugContent>
  </Slug>
);

export const _Checkbox = {
  args: args,
  argTypes: argTypes,
  render: (args) => (
    <div className="slug-check-radio-container">
      <CheckboxGroup legendText="Group Label" slug={slugFunc()} {...args}>
        <Checkbox labelText={`Checkbox label`} id="checkbox-label-1" />
        <Checkbox labelText={`Checkbox label`} id="checkbox-label-2" />
        <Checkbox labelText={`Checkbox label`} id="checkbox-label-3" />
      </CheckboxGroup>

      <CheckboxGroup legendText="Group Label" {...args}>
        <Checkbox
          labelText={`Checkbox label`}
          id="checkbox-label-4"
          slug={slugFunc()}
        />
        <Checkbox
          labelText={`Checkbox label`}
          id="checkbox-label-5"
          slug={slugFunc()}
        />
        <Checkbox labelText={`Checkbox label`} id="checkbox-label-6" />
      </CheckboxGroup>

      <CheckboxGroup legendText="Group Label" {...args}>
        <Checkbox
          labelText={`Checkbox label`}
          id="checkbox-label-7"
          slug={slugFunc('inline')}
        />
        <Checkbox
          labelText={`Checkbox label`}
          id="checkbox-label-8"
          slug={slugFunc('inline')}
        />
        <Checkbox labelText={`Checkbox label`} id="checkbox-label-9" />
      </CheckboxGroup>
    </div>
  ),
};

export const _Combobox = {
  args: args,
  argTypes: argTypes,
  render: (args) => (
    <div style={{ width: 400 }}>
      <ComboBox
        onChange={() => {}}
        id="carbon-combobox"
        items={items}
        itemToString={(item) => (item ? item.text : '')}
        titleText="ComboBox title"
        helperText="Combobox helper text"
        slug={slug}
        {...args}
      />
    </div>
  ),
};

export const _ComposedModal = {
  argTypes: {
    slug: {
      description:
        '**Experimental**: Provide a `Slug` component to be rendered inside the component',
    },
  },
  render: () => (
    <div className="slug-modal">
      <ComposedModal slug={slug} open>
        <ModalHeader label="Account resources" title="Add a custom domain" />
        <ModalBody>
          <p style={{ marginBottom: '1rem' }}>
            Custom domains direct requests for your apps in this Cloud Foundry
            organization to a URL that you own. A custom domain can be a shared
            domain, a shared subdomain, or a shared domain and host.
          </p>
          <TextInput
            data-modal-primary-focus
            id="text-input-1"
            labelText="Domain name"
            placeholder="e.g. github.com"
            style={{ marginBottom: '1rem' }}
          />
          <Select id="select-1" defaultValue="us-south" labelText="Region">
            <SelectItem value="us-south" text="US South" />
            <SelectItem value="us-east" text="US East" />
          </Select>
        </ModalBody>
        <ModalFooter
          primaryButtonText="Add"
          secondaryButtons={[
            { buttonText: 'Keep both' },
            { buttonText: 'Rename' },
          ]}
        />
      </ComposedModal>
    </div>
  ),
};

export const _DatePicker = {
  args: args,
  argTypes: argTypes,
  render: (args) => (
    <div style={{ width: 400 }}>
      <DatePicker datePickerType="single">
        <DatePickerInput
          placeholder="mm/dd/yyyy"
          labelText="Date Picker label"
          size="md"
          id="date-picker"
          slug={slug}
          {...args}
        />
      </DatePicker>
    </div>
  ),
};

export const _Dropdown = {
  args: args,
  argTypes: argTypes,
  render: (args) => (
    <div style={{ width: 400 }}>
      <Dropdown
        id="default"
        titleText="Dropdown title"
        helperText="This is some helper text"
        initialSelectedItem={items[1]}
        label="Option 1"
        items={items}
        itemToString={(item) => (item ? item.text : '')}
        slug={slug}
        {...args}
      />
    </div>
  ),
};

export const _FilterableMultiselect = {
  args: args,
  argTypes: argTypes,
  render: (args) => (
    <div style={{ width: 400 }}>
      <FilterableMultiSelect
        label="Multiselect Label"
        id="carbon-multiselect-example"
        titleText="Multiselect title"
        helperText="This is helper text"
        items={items}
        itemToString={(item) => (item ? item.text : '')}
        selectionFeedback="top-after-reopen"
        slug={slug}
        {...args}
      />
    </div>
  ),
};

export const _Modal = {
  argTypes: {
    slug: {
      description:
        '**Experimental**: Provide a `Slug` component to be rendered inside the component',
    },
  },
  render: () => (
    <div className="slug-modal">
      <Modal
        open
        modalHeading="Add a custom domain"
        modalLabel="Account resources"
        primaryButtonText="Add"
        secondaryButtonText="Cancel"
        slug={slug}>
        <p>
          Custom domains direct requests for your apps in this Cloud Foundry
          organization to a URL that you own. A custom domain can be a shared
          domain, a shared subdomain, or a shared domain and host.
        </p>
        <TextInput
          data-modal-primary-focus
          id="text-input-1"
          labelText="Domain name"
          placeholder="e.g. github.com"
        />
        <Select id="select-1" defaultValue="us-south" labelText="Region">
          <SelectItem value="us-south" text="US South" />
          <SelectItem value="us-east" text="US East" />
        </Select>
        <TextArea labelText="Comments" />
      </Modal>
    </div>
  ),
};

export const _Multiselect = {
  args: args,
  argTypes: argTypes,
  render: (args) => (
    <div style={{ width: 400 }}>
      <MultiSelect
        label="Multiselect Label"
        id="carbon-multiselect-example"
        titleText="Multiselect title"
        helperText="This is helper text"
        items={items}
        itemToString={(item) => (item ? item.text : '')}
        selectionFeedback="top-after-reopen"
        slug={slug}
        {...args}
      />
    </div>
  ),
};

export const _NumberInput = {
  args: args,
  argTypes: argTypes,
  render: (args) => (
    <div style={{ width: 400 }}>
      <NumberInput {...numberInputProps} slug={slug} {...args} />
    </div>
  ),
};

export const _RadioButton = {
  args: args,
  argTypes: argTypes,
  render: (args) => (
    <div className="slug-check-radio-container">
      <RadioButtonGroup
        slug={slugFunc('default')}
        orientation="vertical"
        legendText="Group label"
        name="radio-button-group"
        defaultSelected="radio-1"
        {...args}>
        <RadioButton
          labelText="Radio button label"
          value="radio-1"
          id="radio-1"
        />
        <RadioButton
          labelText="Radio button label"
          value="radio-2"
          id="radio-2"
        />
        <RadioButton
          labelText="Radio button label"
          value="radio-3"
          id="radio-3"
        />
      </RadioButtonGroup>

      <RadioButtonGroup
        orientation="vertical"
        legendText="Group label"
        name="radio-button-group-2"
        defaultSelected="radio-4"
        {...args}>
        <RadioButton
          labelText="Radio button label"
          value="radio-4"
          id="radio-4"
          slug={slugFunc()}
        />
        <RadioButton
          labelText="Radio button label"
          value="radio-5"
          id="radio-5"
          slug={slugFunc()}
        />
        <RadioButton
          labelText="Radio button label"
          value="radio-6"
          id="radio-6"
        />
      </RadioButtonGroup>

      <RadioButtonGroup
        orientation="vertical"
        legendText="Group label"
        name="radio-button-group-3"
        defaultSelected="radio-7"
        {...args}>
        <RadioButton
          labelText="Radio button label"
          value="radio-7"
          id="radio-7"
          slug={slugFunc('inline')}
        />
        <RadioButton
          labelText="Radio button label"
          value="radio-8"
          id="radio-8"
          slug={slugFunc('inline')}
        />
        <RadioButton
          labelText="Radio button label"
          value="radio-9"
          id="radio-9"
        />
      </RadioButtonGroup>
    </div>
  ),
};

export const _Select = {
  args: args,
  argTypes: argTypes,
  render: (args) => (
    <div style={{ width: 400 }}>
      <Select
        id="select-1"
        labelText="Select an option"
        helperText="Optional helper text"
        slug={slug}
        {...args}>
        <SelectItem value="" text="" />
        <SelectItem
          value="An example option that is really long to show what should be done to handle long text"
          text="An example option that is really long to show what should be done to handle long text"
        />
        <SelectItem value="Option 2" text="Option 2" />
        <SelectItem value="Option 3" text="Option 3" />
        <SelectItem value="Option 4" text="Option 4" />
      </Select>
    </div>
  ),
};

export const _Tag = {
  argTypes: {
    slug: {
      description:
        '**Experimental**: Provide a `Slug` component to be rendered inside the component',
    },
  },
  render: () => (
    <>
      <div style={{ marginBottom: '4rem' }}>
        <Tag slug={slug} className="some-class" type="red" title="Clear Filter">
          {'Tag'}
        </Tag>
        <Tag
          slug={slug}
          className="some-class"
          type="magenta"
          title="Clear Filter">
          {'Tag'}
        </Tag>
        <Tag
          slug={slug}
          className="some-class"
          type="purple"
          title="Clear Filter">
          {'Tag'}
        </Tag>
        <Tag
          slug={slug}
          className="some-class"
          type="blue"
          title="Clear Filter">
          {'Tag'}
        </Tag>
        <Tag
          slug={slug}
          className="some-class"
          type="cyan"
          title="Clear Filter">
          {'Tag'}
        </Tag>
        <Tag
          slug={slug}
          className="some-class"
          type="teal"
          title="Clear Filter">
          {'Tag'}
        </Tag>
        <Tag
          slug={slug}
          className="some-class"
          type="green"
          title="Clear Filter">
          {'Tag'}
        </Tag>
        <Tag
          slug={slug}
          className="some-class"
          type="gray"
          title="Clear Filter">
          {'Tag'}
        </Tag>
        <Tag
          slug={slug}
          className="some-class"
          type="cool-gray"
          title="Clear Filter">
          {'Tag'}
        </Tag>
        <Tag
          slug={slug}
          className="some-class"
          type="warm-gray"
          title="Clear Filter">
          {'Tag'}
        </Tag>
        <Tag
          slug={slug}
          className="some-class"
          type="high-contrast"
          title="Clear Filter">
          {'Tag'}
        </Tag>
        <Tag
          slug={slug}
          className="some-class"
          type="outline"
          title="Clear Filter">
          {'Tag'}
        </Tag>
      </div>
      <div style={{ marginBottom: '4rem' }}>
        <Tag
          filter
          slug={slug}
          className="some-class"
          type="red"
          title="Clear Filter">
          {'Tag'}
        </Tag>
        <Tag
          filter
          slug={slug}
          className="some-class"
          type="magenta"
          title="Clear Filter">
          {'Tag'}
        </Tag>
        <Tag
          filter
          slug={slug}
          className="some-class"
          type="purple"
          title="Clear Filter">
          {'Tag'}
        </Tag>
        <Tag
          filter
          slug={slug}
          className="some-class"
          type="blue"
          title="Clear Filter">
          {'Tag'}
        </Tag>
        <Tag
          filter
          slug={slug}
          className="some-class"
          type="cyan"
          title="Clear Filter">
          {'Tag'}
        </Tag>
        <Tag
          filter
          slug={slug}
          className="some-class"
          type="teal"
          title="Clear Filter">
          {'Tag'}
        </Tag>
        <Tag
          filter
          slug={slug}
          className="some-class"
          type="green"
          title="Clear Filter">
          {'Tag'}
        </Tag>
        <Tag
          filter
          slug={slug}
          className="some-class"
          type="gray"
          title="Clear Filter">
          {'Tag'}
        </Tag>
        <Tag
          filter
          slug={slug}
          className="some-class"
          type="cool-gray"
          title="Clear Filter">
          {'Tag'}
        </Tag>
        <Tag
          filter
          slug={slug}
          className="some-class"
          type="warm-gray"
          title="Clear Filter">
          {'Tag'}
        </Tag>
        <Tag
          filter
          slug={slug}
          className="some-class"
          type="high-contrast"
          title="Clear Filter">
          {'Tag'}
        </Tag>
        <Tag
          filter
          slug={slug}
          className="some-class"
          type="outline"
          title="Clear Filter">
          {'Tag'}
        </Tag>
      </div>
      <div style={{ marginBottom: '4rem' }}>
        <Tag
          renderIcon={Asleep}
          slug={slug}
          className="some-class"
          type="red"
          title="Clear Filter">
          {'Tag'}
        </Tag>
        <Tag
          renderIcon={Asleep}
          slug={slug}
          className="some-class"
          type="magenta"
          title="Clear Filter">
          {'Tag'}
        </Tag>
        <Tag
          renderIcon={Asleep}
          slug={slug}
          className="some-class"
          type="purple"
          title="Clear Filter">
          {'Tag'}
        </Tag>
        <Tag
          renderIcon={Asleep}
          slug={slug}
          className="some-class"
          type="blue"
          title="Clear Filter">
          {'Tag'}
        </Tag>
        <Tag
          renderIcon={Asleep}
          slug={slug}
          className="some-class"
          type="cyan"
          title="Clear Filter">
          {'Tag'}
        </Tag>
        <Tag
          renderIcon={Asleep}
          slug={slug}
          className="some-class"
          type="teal"
          title="Clear Filter">
          {'Tag'}
        </Tag>
        <Tag
          renderIcon={Asleep}
          slug={slug}
          className="some-class"
          type="green"
          title="Clear Filter">
          {'Tag'}
        </Tag>
        <Tag
          renderIcon={Asleep}
          slug={slug}
          className="some-class"
          type="gray"
          title="Clear Filter">
          {'Tag'}
        </Tag>
        <Tag
          renderIcon={Asleep}
          slug={slug}
          className="some-class"
          type="cool-gray"
          title="Clear Filter">
          {'Tag'}
        </Tag>
        <Tag
          renderIcon={Asleep}
          slug={slug}
          className="some-class"
          type="warm-gray"
          title="Clear Filter">
          {'Tag'}
        </Tag>
        <Tag
          renderIcon={Asleep}
          slug={slug}
          className="some-class"
          type="high-contrast"
          title="Clear Filter">
          {'Tag'}
        </Tag>
        <Tag
          renderIcon={Asleep}
          slug={slug}
          className="some-class"
          type="outline"
          title="Clear Filter">
          {'Tag'}
        </Tag>
      </div>
      <div style={{ marginBottom: '4rem' }}>
        <Tag
          filter
          renderIcon={Asleep}
          slug={slug}
          className="some-class"
          type="red"
          title="Clear Filter">
          {'Tag'}
        </Tag>
        <Tag
          filter
          renderIcon={Asleep}
          slug={slug}
          className="some-class"
          type="magenta"
          title="Clear Filter">
          {'Tag'}
        </Tag>
        <Tag
          filter
          renderIcon={Asleep}
          slug={slug}
          className="some-class"
          type="purple"
          title="Clear Filter">
          {'Tag'}
        </Tag>
        <Tag
          renderIcon={Asleep}
          slug={slug}
          className="some-class"
          type="blue"
          title="Clear Filter">
          {'Tag'}
        </Tag>

        <Tag
          filter
          renderIcon={Asleep}
          slug={slug}
          className="some-class"
          type="cyan"
          title="Clear Filter">
          {'Tag'}
        </Tag>
        <Tag
          filter
          renderIcon={Asleep}
          slug={slug}
          className="some-class"
          type="teal"
          title="Clear Filter">
          {'Tag'}
        </Tag>
        <Tag
          filter
          renderIcon={Asleep}
          slug={slug}
          className="some-class"
          type="green"
          title="Clear Filter">
          {'Tag'}
        </Tag>
        <Tag
          filter
          renderIcon={Asleep}
          slug={slug}
          className="some-class"
          type="gray"
          title="Clear Filter">
          {'Tag'}
        </Tag>
        <Tag
          filter
          renderIcon={Asleep}
          slug={slug}
          className="some-class"
          type="cool-gray"
          title="Clear Filter">
          {'Tag'}
        </Tag>
        <Tag
          filter
          renderIcon={Asleep}
          slug={slug}
          className="some-class"
          type="warm-gray"
          title="Clear Filter">
          {'Tag'}
        </Tag>
        <Tag
          filter
          renderIcon={Asleep}
          slug={slug}
          className="some-class"
          type="high-contrast"
          title="Clear Filter">
          {'Tag'}
        </Tag>
        <Tag
          filter
          renderIcon={Asleep}
          slug={slug}
          className="some-class"
          type="outline"
          title="Clear Filter">
          {'Tag'}
        </Tag>
      </div>
    </>
  ),
};

export const _TextArea = {
  args: args,
  argTypes: argTypes,
  render: (args) => (
    <div style={{ width: 400 }}>
      <TextArea {...textareaProps} slug={slug} {...args} />
    </div>
  ),
};

export const _TextInput = {
  args: args,
  argTypes: argTypes,
  render: (args) => (
    <div style={{ width: 400 }}>
      <TextInput {...TextInputProps} slug={slug} {...args} />
    </div>
  ),
};

export const _Tile = {
  argTypes: {
    hasRoundedCorners: {
      control: {
        type: 'boolean',
      },
    },
    slug: {
      description:
        '**Experimental**: Provide a `Slug` component to be rendered inside the component',
    },
  },
  render: (args) => (
    <div className="slug-tile-container">
      <Tile slug={slug} id="tile-1" {...args}>
        <h4>Title</h4>
        <p>
          Lorem ipsum dolor sit amet consectetur. Posuere duis fermentum sit at
          consectetur turpis mauris gravida penatibus.
        </p>
        <div className="ai-data">
          <div className="data-container">
            <p>Data Quality</p>
            <h3>85%</h3>
          </div>
          <div className="data-container">
            <p>Label text</p>
            <h3>16%</h3>
          </div>
        </div>
      </Tile>
      <ClickableTile
        href="https://www.carbondesignsystem.com/"
        slug
        id="tile-click"
        renderIcon={ArrowRight}
        {...args}>
        <h4>Title</h4>
        <p>
          Lorem ipsum dolor sit amet consectetur. Posuere duis fermentum sit at
          consectetur turpis mauris gravida penatibus.
        </p>
        <div className="ai-data">
          <div className="data-container">
            <p>Data Quality</p>
            <h3>85%</h3>
          </div>
          <div className="data-container">
            <p>Label text</p>
            <h3>16%</h3>
          </div>
        </div>
      </ClickableTile>
      <SelectableTile
        id="selectable-tile-1"
        name="tiles"
        value="selectable"
        slug={slug}
        {...args}>
        <h4>Title</h4>
        <p>
          Lorem ipsum dolor sit amet consectetur. Posuere duis fermentum sit at
          consectetur turpis mauris gravida penatibus.
        </p>
        <div className="ai-data">
          <div className="data-container">
            <p>Data Quality</p>
            <h3>85%</h3>
          </div>
          <div className="data-container">
            <p>Label text</p>
            <h3>16%</h3>
          </div>
        </div>
      </SelectableTile>
      <ExpandableTile
        id="expandable-tile-1"
        tileCollapsedIconText="Interact to Expand tile"
        tileExpandedIconText="Interact to Collapse tile"
        slug={slug}
        {...args}>
        <TileAboveTheFoldContent>
          <h4>Title</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur. Posuere duis fermentum sit
            at consectetur turpis mauris gravida penatibus.
          </p>
          <div className="ai-data">
            <div className="data-container">
              <p>Data Quality</p>
              <h3>85%</h3>
            </div>
            <div className="data-container">
              <p>Label text</p>
              <h3>16%</h3>
            </div>
          </div>
        </TileAboveTheFoldContent>
        <TileBelowTheFoldContent>
          <h6>Expanded Section</h6>
          <p>
            Lorem ipsum dolor sit amet consectetur. Posuere duis fermentum sit
            at consectetur turpis mauris.
          </p>
        </TileBelowTheFoldContent>
      </ExpandableTile>
    </div>
  ),
};
