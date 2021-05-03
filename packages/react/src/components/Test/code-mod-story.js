/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable */
import React from 'react';
import {
  Accordion,
  AccordionItem,
  Button,
  CodeSnippet,
  ComboBox,
  ContentSwitcher,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  DatePicker,
  DatePickerInput,
  Dropdown,
  MultiSelect,
  NumberInput,
  OverflowMenu,
  Search,
  Select,
  Switch,
  TextInput,
  TimePicker,
} from '../../index';
import { FeatureFlags } from '../FeatureFlags';

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
    text: 'Option 3',
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

const rows = [
  {
    id: 'load-balancer-1',
    name: 'Load Balancer 1',
    rule: 'Round robin',
    Status: 'Starting',
  },
  {
    id: 'load-balancer-2',
    name: 'Load Balancer 2',
    rule: 'DNS delegation',
    status: 'Active',
  },
  {
    id: 'load-balancer-3',
    name: 'Load Balancer 3',
    rule: 'Round robin',
    status: 'Disabled',
  },
];
const headers = ['Name', 'Rule', 'Status'];

export default {
  title: 'CodeMode/Test',

  parameters: {
    component: CodeModTest,
  },
};

export const CodeModTest = () => {
  return (
    <div>
      <h4>Accordion - size XL -> LG</h4>
      <br />
      <Accordion size="xl">
        <AccordionItem title="Section 1 title">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </AccordionItem>
        <AccordionItem title="Section 2 title">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </AccordionItem>
        <AccordionItem title="Section 3 title">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </AccordionItem>
        <AccordionItem title="Section 4 title">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </AccordionItem>
      </Accordion>
      <br />
      <br />

      <h4>Button variants</h4>
      <Button size="small">small -> sm</Button>
      <br />
      <br />
      <Button size="field">field -> md</Button>
      <br />
      <br />
      <Button size="default">default -> lg</Button>
      <br />
      <br />
      <Button size="lg">lg -> xl</Button>
      <br />
      <br />
      <Button size="xl">xl -> 2xl</Button>
      <br />
      <br />

      <h4>ComboBox - size XL -> LG</h4>
      <div style={{ width: 300 }}>
        <ComboBox
          size="xl"
          onChange={() => {}}
          id="carbon-combobox"
          items={items}
          itemToString={(item) => (item ? item.text : '')}
          placeholder="Filter..."
          titleText="ComboBox title"
          helperText="Combobox helper text"
        />
      </div>
      <br />
      <br />

      <h4>Content Switcher - size XL -> LG</h4>
      <ContentSwitcher size="xl">
        <Switch name="one" text="First section" />
        <Switch name="two" text="Second section" />
        <Switch name="three" text="Third section" />
      </ContentSwitcher>
      <br />
      <br />

      <h4>Dropdown - size XL -> LG</h4>
      <div style={{ width: 400 }}>
        <Dropdown
          size="xl"
          id="default"
          titleText="Dropdown label"
          helperText="This is some helper text"
          label="Dropdown menu options"
          items={items}
          itemToString={(item) => (item ? item.text : '')}
        />
      </div>
      <br />
      <br />

      <h4>DataTable - size Tall -> XL</h4>
      <Table size="tall">
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableHeader key={header}>{header}</TableHeader>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              {Object.keys(row)
                .filter((key) => key !== 'id')
                .map((key) => {
                  return <TableCell key={key}>{row[key]}</TableCell>;
                })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <br />
      <br />

      <h4>Datepicker - size XL -> LG</h4>
      <DatePicker datePickerType="single">
        <DatePickerInput
          size="xl"
          id="datepicker"
          labelText="Datepicker Test"></DatePickerInput>
      </DatePicker>
      <br />
      <br />

      <h4>Multiselect ( and Filterable) - size XL -&gt; LG</h4>
      <div style={{ width: 400 }}>
        <MultiSelect
          size="xl"
          items={items}
          itemToString={(item) => (item ? item.text : '')}
        />
      </div>
      <br />
      <div style={{ width: 400 }}>
        <MultiSelect.Filterable
          size="xl"
          items={items}
          itemToString={(item) => (item ? item.text : '')}
        />
      </div>
      <br />
      <br />

      <h4>Numberinput - size XL -> LG</h4>
      <NumberInput size="xl" id="numberinput"></NumberInput>
      <br />
      <br />
      <h4>OverflowMenu - size XL -> LG</h4>
      <OverflowMenu size="xl"></OverflowMenu>
      <br />
      <br />
      <h4>Search</h4>
      <Search size="lg" placeholder="lg -> md" labelText="search1"></Search>
      <br />
      <br />
      <Search size="xl" placeholder="xl -> lg" labelText="search2"></Search>
      <br />
      <br />
      <h4>Select</h4>
      <Select size="lg" id="lg -> md" labelText="lg -> md"></Select>
      <br />
      <br />
      <Select size="xl" id="xl -> lg" labelText="xl -> lg"></Select>
      <br />
      <br />
      <h4>TextInput</h4>
      <TextInput size="lg" id="textinput1" labelText="lg -> md"></TextInput>
      <br />
      <br />
      <TextInput size="xl" id="textinput2" labelText="xl -> lg"></TextInput>
      <br />
      <br />
      <h4>TimePicker - size xl -> lg</h4>
      <TimePicker size="xl" id="timeinput"></TimePicker>
    </div>
  );
};

export const CodeModeTestResults = () => {
  // Paste the contents of the code mode inside the <FeatureFlags> component to verify the two stories are the same
  return (
    <FeatureFlags flags={{ 'enable-2021-release': true }}>
      <p>
        To test the results, navigate to the <code>codemods</code> folder and
        run
        <CodeSnippet type="single">
          yarn jscodeshift -d -t ./transforms/size-prop-update.js
          '../packages/react/src/components/Test/code-mod-story.js'
        </CodeSnippet>{' '}
        and then paste the results into the <code>CodeModeTestResults</code>
        story
      </p>
    </FeatureFlags>
  );
};
/* eslint-enable */
