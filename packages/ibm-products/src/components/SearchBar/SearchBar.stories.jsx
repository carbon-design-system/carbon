/**
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from 'storybook/actions';

import { previewCandidate__SearchBar as SearchBar } from '..';
import mdx from './SearchBar.mdx';

import styles from './_storybook-styles.scss?inline';

export default {
  title: 'Preview Candidate/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
  argTypes: {
    value: { control: { disable: true } },
    onChange: { control: { disable: true } },
    className: { control: { disable: true } },
    hideScopesLabel: { control: { disable: true } },
    onSubmit: { control: { disable: true } },
    scopeToString: { control: { disable: true } },
    scopes: { control: { disable: true } },
    scopesTypeLabel: { control: { disable: true } },
    selectedScopes: { control: { disable: true } },
    sortItems: { control: { disable: true } },
    titleText: { control: { disable: true } },
    translateWithId: { control: { disable: true } },
  },
  parameters: {
    styles,
    docs: {
      page: mdx,
    },
  },
};

const scopes = [
  {
    id: 'scope-2',
    text: 'Scope 2',
  },
  {
    id: 'scope-1',
    text: 'Scope 1',
  },
  {
    id: 'scope-3',
    text: 'Scope 3',
  },
];

const defaultProps = {
  clearButtonLabelText: 'Clear',
  placeholderText: 'Search...',
  submitLabel: 'Search',
  labelText: 'Label text',
  onChange: (newVal) => action('onChange')(newVal),
  onSubmit: (newVal) => action('onSubmit')(newVal),
};

const DefaultTemplate = ({ ...args }) => {
  return <SearchBar {...args} />;
};

const ScopesTemplate = ({ ...args }) => {
  return <SearchBar {...args} />;
};

export const Default = DefaultTemplate.bind({});
Default.args = {
  ...defaultProps,
};

export const InitialValue = DefaultTemplate.bind({});
InitialValue.args = {
  ...defaultProps,
  value: 'Initial value',
};

export const Scopes = ScopesTemplate.bind({});
Scopes.args = {
  ...defaultProps,
  scopes,
  scopesTypeLabel: 'Scopes',
  scopeToString: (item) => (item ? item.text : ''),
};

export const UnsortedScopes = ScopesTemplate.bind({});
UnsortedScopes.args = {
  ...defaultProps,
  scopes,
  scopesTypeLabel: 'Scopes',
  sortItems: (items) => items,
  scopeToString: (item) => (item ? item.text : ''),
};

export const SelectedScopes = DefaultTemplate.bind({});
SelectedScopes.args = {
  ...defaultProps,
  scopes,
  scopesTypeLabel: 'Scopes',
  selectedScopes: [scopes[0]],
  scopeToString: (item) => (item ? item.text : ''),
};
