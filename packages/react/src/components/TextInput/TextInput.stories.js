/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { WithLayer } from '../../../.storybook/templates/WithLayer';
import { View, FolderOpen, Folders } from '@carbon/icons-react';
import Button from '../Button';
import { AILabel, AILabelContent, AILabelActions } from '../AILabel';
import { IconButton } from '../IconButton';
import mdx from './TextInput.mdx';

import { default as TextInput, TextInputSkeleton } from '../TextInput';
import TextArea from '../TextArea'; //need remove this later

const getTextInputStoryArgs = ({
  defaultWidth,
  onChange,
  onClick,
  ...textInputArgs
}) => {
  const handleChange = (event) => {
    onChange?.({
      value: event.target.value,
    });
  };
  const handleClick = (event) => {
    onClick?.({
      value: event.target.value,
    });
  };

  return {
    defaultWidth,
    textInputArgs: {
      ...textInputArgs,
      onChange: handleChange,
      onClick: handleClick,
    },
  };
};

export default {
  title: 'Components/TextInput',
  component: TextInput,
  parameters: {
    docs: {
      page: mdx,
    },
  },
  subcomponents: {
    TextInputSkeleton,
  },
  argTypes: {
    className: {
      control: {
        type: 'text',
      },
    },
    defaultValue: {
      control: {
        type: 'text',
      },
    },
    placeholder: {
      control: {
        type: 'text',
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
    disabled: {
      control: {
        type: 'boolean',
      },
    },
    labelText: {
      control: {
        type: 'text',
      },
    },
    helperText: {
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
    value: {
      control: {
        type: 'text',
      },
    },
    onChange: {
      action: 'onChange',
    },
    onClick: {
      action: 'onClick',
    },
    size: {
      options: ['xs', 'sm', 'md', 'lg'],
      control: {
        type: 'select',
      },
    },
    type: {
      control: {
        type: 'text',
      },
    },
    id: {
      control: { type: 'text' },
    },
    readOnly: {
      control: {
        type: 'boolean',
      },
    },
    inline: {
      control: {
        type: 'boolean',
      },
    },
    hideLabel: {
      control: {
        type: 'boolean',
      },
    },
    enableCounter: {
      control: {
        type: 'boolean',
      },
    },
    maxCount: {
      control: {
        type: 'number',
      },
    },
    light: {
      table: {
        disable: true,
      },
    },
    slug: {
      table: {
        disable: true,
      },
    },
    defaultWidth: {
      control: { type: 'range', min: 300, max: 800, step: 50 },
    },
  },
};

const defaultArgs = {
  className: 'input-test-class',
  id: 'text-input-1',
  placeholder: 'Placeholder text',
  invalid: false,
  invalidText: 'Error message goes here',
  disabled: false,
  labelText: 'Label text',
  helperText: 'Helper text',
  warn: false,
  warnText:
    'Warning message that is really long can wrap to more lines but should not be excessively long.',
  size: 'md',
  readOnly: false,
  inline: false,
  hideLabel: false,
  enableCounter: false,
  maxCount: 10,
  type: 'text',
  defaultWidth: 300,
  defaultValue: '',
};

export const Default = (args) => {
  const { defaultWidth, textInputArgs } = getTextInputStoryArgs(args);

  return (
    <div style={{ width: defaultWidth }}>
      <TextInput {...textInputArgs} />
    </div>
  );
};

Default.args = { ...defaultArgs };

export const Inline = (args) => {
  const { defaultWidth, textInputArgs } = getTextInputStoryArgs(args);

  return (
    <div style={{ width: defaultWidth }}>
      <TextInput inline {...textInputArgs} />
    </div>
  );
};

Inline.args = {
  ...defaultArgs,
  defaultWidth: 450,
  inline: true,
};

Inline.parameters = {
  controls: {
    exclude: ['inline'],
  },
};

export const ReadOnly = (args) => {
  const { defaultWidth, textInputArgs } = getTextInputStoryArgs(args);

  return (
    <div style={{ width: defaultWidth }}>
      <TextInput {...textInputArgs} />
    </div>
  );
};

ReadOnly.args = {
  ...defaultArgs,
  defaultValue: "This is read only, you can't type more.",
  readOnly: true,
};

ReadOnly.parameters = {
  controls: {
    exclude: [
      'readOnly',
      'disabled',
      'invalid',
      'invalidText',
      'warn',
      'warnText',
      'enableCounter',
      'maxCount',
      'value',
    ],
  },
};

export const _WithLayer = (args) => {
  const { defaultWidth, textInputArgs } = getTextInputStoryArgs(args);

  return (
    <WithLayer>
      {(layer) => (
        <div style={{ width: defaultWidth }}>
          <TextInput {...textInputArgs} id={`text-input-${layer}`} />
        </div>
      )}
    </WithLayer>
  );
};

_WithLayer.args = { ...defaultArgs };

export const withAILabel = (args) => {
  const { defaultWidth, textInputArgs } = getTextInputStoryArgs(args);
  const aiLabel = (
    <AILabel className="ai-label-container">
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
  );
  return (
    <div style={{ width: defaultWidth }}>
      <TextInput
        {...textInputArgs}
        type="text"
        labelText="Text input label"
        helperText="Optional help text"
        id="text-input-ai-label"
        decorator={aiLabel}
      />
    </div>
  );
};

withAILabel.args = { ...defaultArgs };

export const Skeleton = (args) => {
  return <TextInputSkeleton {...args} />;
};

Skeleton.args = {
  hideLabel: defaultArgs.hideLabel,
  size: defaultArgs.size,
};

Skeleton.parameters = {
  controls: {
    include: ['hideLabel', 'size'],
  },
};

// Hidden Test-Only Story. This story tests for a bug where the invalid-text would overlap with components below it. #19960
export const TestInvalidTextNoOverlap = (args) => {
  return (
    <div style={{ width: args.defaultWidth }}>
      <TextInput
        labelText="test invalid text, the invalid text should not overlap"
        invalid
        invalidText="invalid text, this should not overlap with the component below"
        id="text-input-1"
        type="text"
      />
      <TextInput labelText="test label" id="text-input-2" type="text" />
    </div>
  );
};

TestInvalidTextNoOverlap.args = { ...defaultArgs };
/*
 * This story will:
 * - Be excluded from the docs page
 * - Removed from the sidebar navigation
 * - Still be a tested variant
 */
TestInvalidTextNoOverlap.tags = ['!dev', '!autodocs'];

// Temporary example for review. Remove before merging.
function RapidInputExample({ kind, enableCounter }) {
  const [value, setValue] = React.useState('');
  const [result, setResult] = React.useState('');
  const inputRef = React.useRef(null);
  const changes = React.useRef(0);
  const label = kind === 'native' ? 'Native input' : kind;
  const Field = kind === 'TextInput' ? TextInput : TextArea;

  function handleChange(event) {
    changes.current++;
    setValue(event.target.value);
  }

  async function handleTest() {
    const input = inputRef.current;
    const prototype =
      kind === 'TextArea'
        ? HTMLTextAreaElement.prototype
        : HTMLInputElement.prototype;
    const setInputValue = Object.getOwnPropertyDescriptor(
      prototype,
      'value'
    ).set;
    changes.current = 0;
    setResult('Running...');
    input.focus();

    for (let count = 1; count <= 150; count++) {
      setInputValue.call(input, 'x'.repeat(count));
      input.dispatchEvent(new Event('input', { bubbles: true }));
      await Promise.resolve();
    }
    await new Promise((resolve) => setTimeout(resolve, 50));
    setResult(`Last run: ${changes.current}/150 onChange calls`);
  }

  return (
    <div style={{ width: 300 }}>
      {kind === 'native' ? (
        <label>
          {label}
          <input ref={inputRef} value={value} onChange={handleChange} />
        </label>
      ) : (
        <Field
          id={`rapid-input-${kind}`}
          labelText={label}
          ref={inputRef}
          value={value}
          onChange={handleChange}
          enableCounter={enableCounter}
          maxCount={200}
        />
      )}
      <p>Current value: {value.length} characters</p>
      <Button
        kind="secondary"
        disabled={result === 'Running...'}
        onClick={handleTest}>
        Send 150 input events
      </Button>
      <output aria-label={`${label} result`}>{result}</output>
    </div>
  );
}

export const TestRapidControlledInput = ({ enableCounter }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32 }}>
    {['TextInput', 'TextArea', 'native'].map((kind) => (
      <RapidInputExample key={kind} kind={kind} enableCounter={enableCounter} />
    ))}
  </div>
);

TestRapidControlledInput.args = { enableCounter: false };
TestRapidControlledInput.parameters = {
  controls: { include: ['enableCounter'] },
};
TestRapidControlledInput.tags = ['!autodocs'];
