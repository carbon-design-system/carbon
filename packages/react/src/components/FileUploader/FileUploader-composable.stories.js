/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable no-console */

import React from 'react';
import ComposableFileUploader from './stories/composable-uploader';

import {
  FileUploaderButton,
  FileUploaderDropContainer,
  FileUploaderItem,
} from './';

export default {
  title: 'Components/FileUploader/Composable',
  component: FileUploaderButton,
  subcomponents: {
    FileUploaderItem,
    FileUploaderDropContainer,
  },
};

export const Default = (args) => ComposableFileUploader(args);

Default.args = {
  disabled: false,
  useDragAndDrop: false,
  // FileUploaderButton Props
  '<FileUploaderButton> - labelText': 'Add files',
  '<FileUploaderButton> - buttonKind': 'primary',
  '<FileUploaderButton> - disabled': false,
  '<FileUploaderButton> - disableLabelChanges': false,
  '<FileUploaderButton> - accept': ['.jpg', '.png'],
  '<FileUploaderButton> - multiple': true,
  '<FileUploaderButton> - name': '',
  '<FileUploaderButton> - size': 'md',
  '<FileUploaderButton> - className': '',
  '<FileUploaderButton> - id': '',
  // FileUploaderItem Props
  // None since their rendering is stateful. if modified all items share the control.
  // FileUploaderDropContainer Props
  '<FileUploaderDropContainer> - labelText':
    'Drag and drop files here or click to upload',
  '<FileUploaderDropContainer> - accept': [
    '.jpg',
    '.png',
    'image/jpeg',
    'image/png',
  ],
  '<FileUploaderDropContainer> - multiple': true,
  '<FileUploaderDropContainer> - className': '',
  '<FileUploaderDropContainer> - id': '',
  '<FileUploaderDropContainer> - disabled': false,
  '<FileUploaderDropContainer> - maxFileSize': 1024 * 1024,
  '<FileUploaderDropContainer> - name': '',
  '<FileUploaderDropContainer> - pattern': '.[0-9a-z]+$',
};

Default.argTypes = {
  disabled: {
    control: 'boolean',
    description: 'Specify whether the file uploader is disabled',
    table: { category: '1. General' },
  },
  useDragAndDrop: {
    control: 'boolean',
    description: 'Use drag and drop container instead of button',
    table: { category: '1. General' },
  },
  // FileUploaderButton Props
  '<FileUploaderButton> - labelText': {
    control: 'text',
    description: 'Label text for the FileUploaderButton',
    table: { category: '2. FileUploaderButton props' },
    if: { arg: 'useDragAndDrop', truthy: false },
  },
  '<FileUploaderButton> - buttonKind': {
    control: { type: 'select' },
    options: [
      'primary',
      'secondary',
      'danger',
      'ghost',
      'danger--primary',
      'danger--ghost',
      'danger--tertiary',
      'tertiary',
    ],
    description: 'Specify the type of underlying button',
    table: { category: '2. FileUploaderButton props' },
    if: { arg: 'useDragAndDrop', truthy: false },
  },
  '<FileUploaderButton> - disabled': {
    control: 'boolean',
    description: 'Specify whether the FileUploaderButton is disabled',
    table: { category: '2. FileUploaderButton props' },
    if: { arg: 'useDragAndDrop', truthy: false },
  },
  '<FileUploaderButton> - disableLabelChanges': {
    control: 'boolean',
    description: 'Disable updates to the FileUploaderButton label',
    table: { category: '2. FileUploaderButton props' },
    if: { arg: 'useDragAndDrop', truthy: false },
  },
  '<FileUploaderButton> - accept': {
    control: 'object',
    description: 'Specify the types of files that the button should accept',
    table: { category: '2. FileUploaderButton props' },
    if: { arg: 'useDragAndDrop', truthy: false },
  },
  '<FileUploaderButton> - multiple': {
    control: 'boolean',
    description: 'Specify if the button should accept multiple files',
    table: { category: '2. FileUploaderButton props' },
    if: { arg: 'useDragAndDrop', truthy: false },
  },
  '<FileUploaderButton> - name': {
    control: 'text',
    description: 'Name attribute for the FileUploaderButton input',
    table: { category: '2. FileUploaderButton props' },
    if: { arg: 'useDragAndDrop', truthy: false },
  },
  '<FileUploaderButton> - size': {
    control: { type: 'select' },
    options: ['sm', 'md', 'lg'],
    description: 'Size of the FileUploaderButton',
    table: { category: '2. FileUploaderButton props' },
    if: { arg: 'useDragAndDrop', truthy: false },
  },
  '<FileUploaderButton> - className': {
    control: 'text',
    description: 'Custom className for the FileUploaderButton',
    table: { category: '2. FileUploaderButton props' },
    if: { arg: 'useDragAndDrop', truthy: false },
  },
  '<FileUploaderButton> - id': {
    control: 'text',
    description: 'ID for the FileUploaderButton',
    table: { category: '2. FileUploaderButton props' },
    if: { arg: 'useDragAndDrop', truthy: false },
  },
  // FileUploaderItem Props
  '<FileUploaderItem> - iconDescription': {
    control: 'text',
    description: 'Description of status icon for FileUploaderItem',
    table: { category: '3. FileUploaderItem props' },
  },
  '<FileUploaderItem> - status': {
    control: { type: 'select' },
    options: ['uploading', 'edit', 'complete'],
    description: 'Status of the file upload',
    table: { category: '3. FileUploaderItem props' },
  },
  '<FileUploaderItem> - invalid': {
    control: 'boolean',
    description: 'Specify if the currently uploaded file is invalid',
    table: { category: '3. FileUploaderItem props' },
  },
  '<FileUploaderItem> - errorSubject': {
    control: 'text',
    description: 'Error message subject for an invalid file upload',
    table: { category: '3. FileUploaderItem props' },
  },
  '<FileUploaderItem> - errorBody': {
    control: 'text',
    description: 'Error message body for an invalid file upload',
    table: { category: '3. FileUploaderItem props' },
  },
  '<FileUploaderItem> - size': {
    control: { type: 'select' },
    options: ['sm', 'md', 'lg'],
    description: 'Size of the FileUploaderItem',
    table: { category: '3. FileUploaderItem props' },
  },
  '<FileUploaderItem> - className': {
    control: 'text',
    description: 'Custom className for the FileUploaderItem',
    table: { category: '3. FileUploaderItem props' },
  },
  '<FileUploaderItem> - disabled': {
    control: 'boolean',
    description: 'Specify whether FileUploaderItem is disabled',
    table: { category: '3. FileUploaderItem props' },
  },
  // FileUploaderDropContainer Props
  '<FileUploaderDropContainer> - labelText': {
    control: 'text',
    description: 'Label text for the FileUploaderDropContainer',
    table: { category: '2. FileUploaderDropContainer props' },
    if: { arg: 'useDragAndDrop', truthy: true },
  },
  '<FileUploaderDropContainer> - accept': {
    control: 'object',
    description:
      'Specify the types of files that the drop container should accept',
    table: { category: '2. FileUploaderDropContainer props' },
    if: { arg: 'useDragAndDrop', truthy: true },
  },
  '<FileUploaderDropContainer> - multiple': {
    control: 'boolean',
    description: 'Specify if the drop container should accept multiple files',
    table: { category: '2. FileUploaderDropContainer props' },
    if: { arg: 'useDragAndDrop', truthy: true },
  },
  '<FileUploaderDropContainer> - className': {
    control: 'text',
    description: 'Custom className for the FileUploaderDropContainer',
    table: { category: '2. FileUploaderDropContainer props' },
    if: { arg: 'useDragAndDrop', truthy: true },
  },
  '<FileUploaderDropContainer> - id': {
    control: 'text',
    description: 'ID for the FileUploaderDropContainer',
    table: { category: '2. FileUploaderDropContainer props' },
    if: { arg: 'useDragAndDrop', truthy: true },
  },
  '<FileUploaderDropContainer> - disabled': {
    control: 'boolean',
    description: 'Specify whether the FileUploaderDropContainer is disabled',
    table: { category: '2. FileUploaderDropContainer props' },
    if: { arg: 'useDragAndDrop', truthy: true },
  },
  '<FileUploaderDropContainer> - maxFileSize': {
    control: 'number',
    description: 'Maximum file size in bytes for the drop container',
    table: { category: '2. FileUploaderDropContainer props' },
    if: { arg: 'useDragAndDrop', truthy: true },
  },
  '<FileUploaderDropContainer> - name': {
    control: 'text',
    description: 'Name attribute for the FileUploaderDropContainer',
    table: { category: '2. FileUploaderDropContainer props' },
    if: { arg: 'useDragAndDrop', truthy: true },
  },
  '<FileUploaderDropContainer> - pattern': {
    control: 'text',
    description: 'Pattern for file validation in the drop container',
    table: { category: '2. FileUploaderDropContainer props' },
    if: { arg: 'useDragAndDrop', truthy: true },
  },
};

Default.parameters = {
  controls: {
    exclude: [
      // Exclude auto-inferred props from FileUploaderButton to avoid duplicates
      'accept',
      'buttonKind',
      'disableLabelChanges',
      'id',
      'labelText',
      'multiple',
      'name',
      'role',
      'tabIndex',
      'size',
    ],
  },
};

// Made with Bob
