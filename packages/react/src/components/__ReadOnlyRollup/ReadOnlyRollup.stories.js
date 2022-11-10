/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Checkbox from '../Checkbox';
// import ComboBox from '../ComboBox/ComboBox';
// import DatePicker from '../DatePicker/DatePicker';
// import Dropdown from '../Dropdown/Dropdown';
// import MultiSelect from '../MultiSelect';
// import { NumberInput } from '../NumberInput';
// import RadioButton from '../RadioButton';
// import RadioButtonGroup from '../RadioButtonGroup';
// import Select from '../Select';
// import SelectItem from '../SelectItem';
// import Slider from '../Slider';
// import TextArea from '../TextArea';
// import TextInput from '../TextInput';
// import TimePicker from '../TimePicker';
// import Toggle from '../Toggle/Toggle';

const Checkboxes = () => (
  <div className="component-set">
    <fieldset className="cds--fieldset">
      <legend className="cds--label">Default group</legend>
      <Checkbox labelText="Checkbox label" id="checked" checked />
      <Checkbox labelText="Checkbox label" id="unchecked" />
    </fieldset>
    <fieldset className="cds--fieldset">
      <legend className="cds--label">Disabled group</legend>
      <Checkbox
        labelText="Checkbox label"
        id="checked-disabled"
        checked
        disabled
      />
      <Checkbox labelText="Checkbox label" id="unchecked-disabled" disabled />
    </fieldset>
    <fieldset className="cds--fieldset">
      <legend className="cds--label">Readonly group</legend>
      <Checkbox
        labelText="Checkbox label"
        id="checked-readonly"
        checked
        readonly
      />
      <Checkbox labelText="Checkbox label" id="unchecked-readonly" readonly />
    </fieldset>
  </div>
);

export const ReadonlyRollup = () => (
  <div className="component-sets">
    <Checkboxes />
  </div>
);

export default {
  title: 'Components/ReadonlyRollup',
  component: ReadonlyRollup,
};

export const Default = () => <ReadonlyRollup />;
