/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  moduleMetadata,
  type Meta,
  type StoryObj,
  type ArgTypes,
} from '@storybook/angular';
import { fn } from 'storybook/test';
import {
  FileUploaderComponent,
  FileUploaderButtonComponent,
  FileUploaderDropContainerComponent,
  FileUploaderItemComponent,
  FileUploaderSkeletonComponent,
} from '@carbon/angular/file-uploader';

// ─── WC-parity stories (one-for-one with @carbon/web-components File Uploader) ───

const kinds = [
  'primary',
  'secondary',
  'tertiary',
  'danger-primary',
  'danger',
  'ghost',
];

const states = ['uploading', 'complete', 'edit'];

const sizes = ['sm', 'md', 'lg'];

const defaultArgs = {
  accept: 'image/jpeg',
  buttonKind: 'primary',
  buttonLabel: 'Add file',
  disabled: false,
  labelDescription: 'Max file size is 500kb. Only .jpg files are supported.',
  labelTitle: 'Upload files',
  name: '',
  multiple: false,
  size: 'md',
};

const argTypes: ArgTypes = {
  accept: {
    control: 'text',
    description: 'Specify the types of files that this input can receive.',
  },
  buttonKind: {
    control: 'select',
    options: kinds,
    labels: {
      primary: 'Primary button (primary)',
      secondary: 'Secondary button (secondary)',
      tertiary: 'Tertiary button (tertiary)',
      'danger-primary': 'Danger primary button (danger-primary)',
      danger: 'Danger button (danger)',
      ghost: 'Ghost button (ghost)',
    },
    description:
      'Specify the types of files that this input should be able to receive.',
  },
  buttonLabel: {
    control: 'text',
    description:
      'Provide the label text to be read by screen readers when interacting with the <code>&lt;cds-ng-file-uploader-button&gt;</code>.',
  },
  disabled: {
    control: 'boolean',
    description: 'Specify whether file input is disabled.',
  },
  labelDescription: {
    control: 'text',
    description:
      'Specify the description text of this <code>&lt;cds-ng-file-uploader&gt;</code>.',
  },
  labelTitle: {
    control: 'text',
    description:
      'Specify the title text of this <code>&lt;cds-ng-file-uploader&gt;</code>.',
  },
  name: {
    control: 'text',
    description:
      'Provide a name for the underlying <code>&lt;input&gt;</code> node.',
  },
  multiple: {
    control: 'boolean',
    description:
      'Specify if the component should accept multiple files to upload.',
  },
  size: {
    control: 'select',
    description:
      'Specify the size of the <code>&lt;cds-ng-file-uploader-button&gt;</code>, from a list of available sizes.',
    options: sizes,
    labels: {
      sm: 'sm (sm)',
      md: 'md (md)',
      lg: 'lg (lg)',
    },
  },
};

const dropContainerArgs = {
  accept: 'image/jpeg image/png',
  disabled: false,
  labelDescription:
    'Max file size is 1 MB. Supported file types are .jpg and .png.',
  labelText: 'Drag and drop files here or click to upload',
  labelTitle: 'Upload files',
  multiple: true,
  name: '',
};

const dropContainerArgTypes: ArgTypes = {
  accept: { control: 'text' },
  disabled: { control: 'boolean' },
  labelDescription: { control: 'text' },
  labelText: { control: 'text' },
  labelTitle: { control: 'text' },
  multiple: { control: 'boolean' },
  name: { control: 'text' },
};

const fileUploaderItemArgs = {
  disabled: false,
  errorBody: '1 MB max file size. Select a new file and try again.',
  errorSubject: 'File size exceeds limit',
  iconDescription: 'Delete file',
  invalid: false,
  name: 'README.md',
  size: 'md',
  state: 'edit',
};

const fileUploaderItemArgTypes: ArgTypes = {
  disabled: {
    control: 'boolean',
    description: 'Controls the disabled state of this file uploader item.',
  },
  errorBody: { control: 'text' },
  errorSubject: { control: 'text' },
  iconDescription: { control: 'text' },
  invalid: { control: 'boolean' },
  name: { control: 'text' },
  size: {
    control: 'select',
    options: ['sm', 'md', 'lg'],
    labels: {
      sm: 'Small',
      md: 'Medium',
      lg: 'Large',
    },
  },
  state: {
    control: 'select',
    options: states,
    labels: {
      uploading: 'Upload in progress (uploading)',
      complete: 'Upload complete (complete)',
      edit: 'Edit upload (edit)',
    },
  },
};

const dropContainerTemplate = `
  <cds-ng-file-uploader
    [labelTitle]="labelTitle"
    [labelDescription]="labelDescription"
    [disabled]="disabled">
    <cds-ng-file-uploader-drop-container
      [accept]="accept"
      [disabled]="disabled"
      [multiple]="multiple"
      [name]="name"
      (fileUploaderDropContainerChanged)="fileUploaderDropContainerChanged($event)">
      {{ labelText }}
    </cds-ng-file-uploader-drop-container>
  </cds-ng-file-uploader>
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const meta: Meta<any> = {
  title: 'Components/File uploader',
  // Storybook for Angular drops args that have no `action` or `control`
  // argType before rendering, so the output handlers need one.
  args: {
    fileUploaderButtonChanged: fn(),
    fileUploaderDropContainerChanged: fn(),
    fileUploaderItemDeleted: fn(),
  },
  argTypes: {
    fileUploaderButtonChanged: {
      action: 'cds-file-uploader-button-changed',
    },
    fileUploaderDropContainerChanged: {
      action: 'cds-file-uploader-drop-container-changed',
    },
    fileUploaderItemDeleted: {
      action: 'cds-file-uploader-item-deleted',
    },
  },
  decorators: [
    moduleMetadata({
      imports: [
        FileUploaderComponent,
        FileUploaderButtonComponent,
        FileUploaderDropContainerComponent,
        FileUploaderItemComponent,
        FileUploaderSkeletonComponent,
      ],
    }),
  ],
  parameters: {
    controls: {
      exclude: [
        'fileUploaderButtonChanged',
        'fileUploaderDropContainerChanged',
        'fileUploaderItemDeleted',
      ],
    },
  },
};

export default meta;
type Story = StoryObj<Record<string, unknown>>;

// WC: Default
export const Default: Story = {
  args: defaultArgs,
  argTypes,
  render: (args) => ({
    props: args,
    template: `
      <cds-ng-file-uploader
        [labelTitle]="labelTitle"
        [labelDescription]="labelDescription"
        [disabled]="disabled">
        <cds-ng-file-uploader-button
          [buttonKind]="buttonKind"
          [accept]="accept"
          [multiple]="multiple"
          [name]="name"
          [size]="size"
          (fileUploaderButtonChanged)="fileUploaderButtonChanged($event)">
          {{ buttonLabel }}
        </cds-ng-file-uploader-button>
      </cds-ng-file-uploader>
    `,
  }),
};

// WC: DragAndDropUploadContainerExampleApplication
export const DragAndDropUploadContainerExampleApplication: Story = {
  args: { ...dropContainerArgs },
  argTypes: { ...dropContainerArgTypes },
  render: (args) => ({
    props: args,
    template: dropContainerTemplate,
  }),
};

// WC: DragAndDropUploadSingleContainerExampleApplication
export const DragAndDropUploadSingleContainerExampleApplication: Story = {
  args: {
    ...dropContainerArgs,
    accept: 'image/jpeg',
    labelDescription: 'Max file size is 1 MB. Only .jpg files are supported.',
    labelText: 'Drag and drop a file here or click to upload',
    labelTitle: 'Upload a file',
    multiple: false,
  },
  argTypes: {
    ...dropContainerArgTypes,
    multiple: {
      ...dropContainerArgTypes.multiple,
      table: { readonly: true },
    },
  },
  render: (args) => ({
    props: args,
    template: dropContainerTemplate,
  }),
};

// WC: FileUploaderDropContainer
export const FileUploaderDropContainer: Story = {
  args: { ...dropContainerArgs },
  argTypes: { ...dropContainerArgTypes },
  render: (args) => ({
    props: args,
    template: dropContainerTemplate,
  }),
};

// WC: FileUploaderItem
export const FileUploaderItem: Story = {
  argTypes: { ...fileUploaderItemArgTypes },
  args: { ...fileUploaderItemArgs },
  render: (args) => ({
    props: args,
    template: `
      <cds-ng-file-uploader-item
        [disabled]="disabled"
        [errorBody]="errorBody"
        [errorSubject]="errorSubject"
        [iconDescription]="iconDescription"
        [invalid]="invalid"
        [size]="size"
        [state]="state"
        (fileUploaderItemDeleted)="fileUploaderItemDeleted($event)">
        {{ name }}
      </cds-ng-file-uploader-item>
    `,
  }),
};

// WC: Skeleton
export const Skeleton: Story = {
  render: () => ({
    template: `<cds-ng-file-uploader-skeleton></cds-ng-file-uploader-skeleton>`,
  }),
};
