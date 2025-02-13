import React from 'react';
import { Dropdown, Checkbox, Tag } from '@carbon/react';

const TestComponent: React.FC = () => {
  return (
    //prettier-ignore
    (<div>
      {/* Basic Dropdown usage */}
      <Dropdown
        label="Select an option"
        decorator="dropdown-1"
        items={['Option 1', 'Option 2']}
        id="dropdown-1"
        titleText="Dropdown"
      />
      {/* Checkbox with expression */}
      <Checkbox
        labelText="Check me"
        decorator={'checkbox-1'}
        id="checkbox-1"
      />
      {/* Tag with string literal */}
      <Tag decorator={'static-tag'} type="red">
        Important
      </Tag>
      {/* Nested structure */}
      <div>
        <Tag decorator="tag-1" type="blue">
          Active
        </Tag>
        <Checkbox
          decorator="checkbox-2"
          labelText="Enable feature"
          id="checkbox-2"
        />
      </div>
    </div>)
  );
};

export default TestComponent;