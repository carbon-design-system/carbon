/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import { WithLayer } from '../../../.storybook/templates/WithLayer';

import ExpandableSearch from '../ExpandableSearch';
import Search from '.';

export default {
  title: 'Components/Search',
  component: Search,
  argTypes: {
    light: {
      table: {
        disable: true,
      },
    },
  },
  subcomponents: {
    ExpandableSearch,
  },
};

export const Default = () => (
  <>
    <a
      href="https://builder.carbondesignsystem.com/from-json/%7B%22title%22%3A%22SearchFragment%22%2C%22data%22%3A%7B%22items%22%3A%5B%7B%22type%22%3A%22search%22%2C%22label%22%3A%22Search%22%2C%22placeholder%22%3A%22Search%22%2C%22autocomplete%22%3A%22off%22%2C%22inputSize%22%3A%22lg%22%2C%22defaultValue%22%3A%22%22%2C%22expandable%22%3Afalse%2C%22closeButtonLabelText%22%3A%22Clear%20search%20input%22%2C%22disabled%22%3Afalse%2C%22light%22%3Afalse%2C%22searchType%22%3A%22text%22%2C%22role%22%3A%22searchbox%22%2C%22id%22%3A%222%22%2C%22codeContext%22%3A%7B%22name%22%3A%22search-2%22%7D%7D%5D%2C%22id%22%3A1%7D%2C%22allCssClasses%22%3A%5B%5D%7D"
      target="_blank"
      rel="noreferrer">
      Edit on Carbon UI Builder
    </a>
    <br></br>
    <br></br>
    <Search
      size="lg"
      placeholder="Find your items"
      labelText="Search"
      closeButtonLabelText="Clear search input"
      id="search-1"
      onChange={() => {}}
      onKeyDown={() => {}}
    />
  </>
);

export const Disabled = () => (
  <>
    <a
      href="https://builder.carbondesignsystem.com/from-json/%7B%22title%22%3A%22SearchFragment%22%2C%22data%22%3A%7B%22items%22%3A%5B%7B%22type%22%3A%22search%22%2C%22label%22%3A%22Search%22%2C%22placeholder%22%3A%22Search%22%2C%22autocomplete%22%3A%22off%22%2C%22inputSize%22%3A%22lg%22%2C%22defaultValue%22%3A%22%22%2C%22expandable%22%3Afalse%2C%22closeButtonLabelText%22%3A%22Clear%20search%20input%22%2C%22disabled%22%3Atrue%2C%22light%22%3Afalse%2C%22searchType%22%3A%22text%22%2C%22role%22%3A%22searchbox%22%2C%22id%22%3A%222%22%2C%22codeContext%22%3A%7B%22name%22%3A%22search-2%22%7D%7D%5D%2C%22id%22%3A1%7D%2C%22allCssClasses%22%3A%5B%5D%7D"
      target="_blank"
      rel="noreferrer">
      Edit on Carbon UI Builder
    </a>
    <br></br>
    <br></br>
    <Search
      disabled
      size="lg"
      placeholder="Find your items"
      labelText="Search"
      closeButtonLabelText="Clear search input"
      id="search-1"
      onChange={() => {}}
      onKeyDown={() => {}}
    />
  </>
);

export const Expandable = () => (
  <>
    <a
      href="https://builder.carbondesignsystem.com/from-json/%7B%22title%22%3A%22SearchFragment%22%2C%22data%22%3A%7B%22items%22%3A%5B%7B%22type%22%3A%22search%22%2C%22label%22%3A%22Search%22%2C%22placeholder%22%3A%22Search%22%2C%22autocomplete%22%3A%22off%22%2C%22inputSize%22%3A%22lg%22%2C%22defaultValue%22%3A%22%22%2C%22expandable%22%3Atrue%2C%22closeButtonLabelText%22%3A%22Clear%20search%20input%22%2C%22disabled%22%3Afalse%2C%22light%22%3Afalse%2C%22searchType%22%3A%22text%22%2C%22role%22%3A%22searchbox%22%2C%22id%22%3A%222%22%2C%22codeContext%22%3A%7B%22name%22%3A%22search-2%22%7D%7D%5D%2C%22id%22%3A1%7D%2C%22allCssClasses%22%3A%5B%5D%7D"
      target="_blank"
      rel="noreferrer">
      Edit on Carbon UI Builder
    </a>
    <br></br>
    <br></br>
    <ExpandableSearch
      size="lg"
      labelText="Search"
      closeButtonLabelText="Clear search input"
      id="search-expandable-1"
      onChange={() => {}}
      onKeyDown={() => {}}
    />
  </>
);

export const _WithLayer = () => (
  <>
    <a
      href="https://builder.carbondesignsystem.com/from-json/%7B%22title%22%3A%22SearchFragment%22%2C%22data%22%3A%7B%22items%22%3A%5B%7B%22type%22%3A%22search%22%2C%22label%22%3A%22Search%22%2C%22placeholder%22%3A%22Search%22%2C%22autocomplete%22%3A%22off%22%2C%22inputSize%22%3A%22lg%22%2C%22defaultValue%22%3A%22%22%2C%22expandable%22%3Afalse%2C%22closeButtonLabelText%22%3A%22Clear%20search%20input%22%2C%22disabled%22%3Afalse%2C%22light%22%3Afalse%2C%22searchType%22%3A%22text%22%2C%22role%22%3A%22searchbox%22%2C%22id%22%3A%222%22%2C%22codeContext%22%3A%7B%22name%22%3A%22search-2%22%7D%7D%5D%2C%22id%22%3A1%7D%2C%22allCssClasses%22%3A%5B%5D%7D"
      target="_blank"
      rel="noreferrer">
      Edit on Carbon UI Builder
    </a>
    <br></br>
    <br></br>
    <WithLayer>
      {(layer) => (
        <Search
          size="lg"
          placeholder="Find your items"
          labelText="Search"
          closeButtonLabelText="Clear search input"
          id={`search-${layer}`}
          onChange={() => {}}
          onKeyDown={() => {}}
        />
      )}
    </WithLayer>
  </>
);

export const ExpandableWithLayer = () => (
  <>
    <a
      href="https://builder.carbondesignsystem.com/from-json/%7B%22title%22%3A%22SearchFragment%22%2C%22data%22%3A%7B%22items%22%3A%5B%7B%22type%22%3A%22search%22%2C%22label%22%3A%22Search%22%2C%22placeholder%22%3A%22Search%22%2C%22autocomplete%22%3A%22off%22%2C%22inputSize%22%3A%22lg%22%2C%22defaultValue%22%3A%22%22%2C%22expandable%22%3Atrue%2C%22closeButtonLabelText%22%3A%22Clear%20search%20input%22%2C%22disabled%22%3Afalse%2C%22light%22%3Afalse%2C%22searchType%22%3A%22text%22%2C%22role%22%3A%22searchbox%22%2C%22id%22%3A%222%22%2C%22codeContext%22%3A%7B%22name%22%3A%22search-2%22%7D%7D%5D%2C%22id%22%3A1%7D%2C%22allCssClasses%22%3A%5B%5D%7D"
      target="_blank"
      rel="noreferrer">
      Edit on Carbon UI Builder
    </a>
    <br></br>
    <br></br>
    <WithLayer>
      {(layer) => (
        <ExpandableSearch
          size="lg"
          placeholder="Search"
          labelText="First Layer"
          closeButtonLabelText="Clear search input"
          id={`search-expandable-${layer}`}
          onChange={() => {}}
          onKeyDown={() => {}}
        />
      )}
    </WithLayer>
  </>
);

export const Playground = (args) => (
  <div style={{ width: args.playgroundWidth }}>
    <a
      href="https://builder.carbondesignsystem.com/from-json/%7B%22title%22%3A%22SearchFragment%22%2C%22data%22%3A%7B%22items%22%3A%5B%7B%22type%22%3A%22search%22%2C%22label%22%3A%22Search%22%2C%22placeholder%22%3A%22Search%22%2C%22autocomplete%22%3A%22off%22%2C%22inputSize%22%3A%22lg%22%2C%22defaultValue%22%3A%22%22%2C%22expandable%22%3Afalse%2C%22closeButtonLabelText%22%3A%22Clear%20search%20input%22%2C%22disabled%22%3Afalse%2C%22light%22%3Afalse%2C%22searchType%22%3A%22text%22%2C%22role%22%3A%22searchbox%22%2C%22id%22%3A%222%22%2C%22codeContext%22%3A%7B%22name%22%3A%22search-2%22%7D%7D%5D%2C%22id%22%3A1%7D%2C%22allCssClasses%22%3A%5B%5D%7D"
      target="_blank"
      rel="noreferrer">
      Edit on Carbon UI Builder
    </a>
    <br></br>
    <br></br>
    <Search id="search-playground-1" {...args} />
  </div>
);

Playground.argTypes = {
  playgroundWidth: {
    control: { type: 'range', min: 300, max: 800, step: 50 },
    defaultValue: 300,
  },
  className: {
    table: {
      disable: true,
    },
  },
  closeButtonLabelText: {
    control: {
      type: 'text',
    },
    defaultValue: 'Clear search input',
  },
  disabled: {
    control: {
      type: 'boolean',
    },
    defaultValue: false,
  },
  id: {
    table: {
      disable: true,
    },
  },
  defaultValue: {
    control: {
      type: 'text',
    },
    defaultValue: 'Default value',
  },
  labelText: {
    control: {
      type: 'text',
    },
    defaultValue: 'Label text',
  },
  placeholder: {
    control: {
      type: 'text',
    },
    defaultValue: 'Placeholder text',
  },
  renderIcon: {
    control: false,
  },
  role: {
    control: {
      type: 'text',
    },
    defaultValue: 'searchbox',
  },
  size: {
    defaultValue: 'md',
    options: ['sm', 'md', 'lg'],
    control: {
      type: 'select',
    },
  },
  type: {
    control: {
      type: 'text',
    },
    defaultValue: 'text',
  },
};
