/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { StoryDocsPage } from '../../global/js/utils/StoryDocsPage';
import * as stories from './CreateTearsheet.stories';

const DocsPage = () => {
  return (
    <StoryDocsPage
      altGuidelinesHref="https://pages.github.ibm.com/carbon/ibm-products/patterns/create-flows/usage/#wide-tearsheet"
      blocks={[
        {
          story: stories.multiStepTearsheet,
          description: `This is used when you have one section per step. This can be created by passing
in the overall \`<CreateTearsheet />\` component and the \`<CreateTearsheetStep />\`
component with form items as children:`,
          source: {
            code: `    <CreateTearsheet {...props}>
      <CreateTearsheetStep
          title="Required title"
          subtitle="Optional subtitle"
          description="Optional description"
          onNext={() => {'Optional function'}}
          disableSubmit={}
          >
        <TextInput
          id="test-1"
          invalidText="A valid value is required"
          labelText="Topic name"
          placeholder="Enter topic name"
        />
      </CreateTearsheetStep>
    </CreateTearsheet>`,
          },
        },
        {
          title: 'Using custom components',
          description: `It is possible to use custom components that return \`CreateTearsheetStep\`s in
order to help reduce the amount of logic in the component that contains the main
\`CreateTearsheet\`. _It is required that each child of the \`CreateTearsheet\`
either be a custom step or a \`CreateTearsheetStep\`_. An example of this could
look like the following:`,
          source: {
            code: `const CreateStepCustom = ({ subtitle, ...rest }) => {
  return (
    <CreateTearsheetStep
      {...rest}
      subtitle={subtitle}
      title="Step 1"
      onNext={() => console.log('optional validation check')}
      onMount={() => console.log('optional onMount fn')}
      disableSubmit={false}
    >
      step content here
    </CreateTearsheetStep>
  );
};

const CreateComponent = () => {
  return (
    <CreateTearsheet {...createTearsheetProps}>
      <CreateStepCustom subtitle="Custom step subtitle" />
      <CreateTearsheetStep
        title="Topic name"
        fieldsetLegendText="Topic information"
        disableSubmit={!value}
        subtitle="This is the unique name used to recognize your topic"
        description="It will also be used by your producers and consumers as part of the
        connection information, so make it something easy to recognize."
      >
        Content for second step
      </CreateTearsheetStep>
    </CreateTearsheet>
  );
};`,
          },
        },
        {
          title: 'Using dynamic steps',
          description: `The use of dynamic steps can be utilized in a scenario when the user makes a
certain selection on one step that effects which steps will follow it, this is
controlled via the \`includeStep\` prop. See abbreviated example below:`,
          code: `import { useState } from 'react';

const CreateFlow = () => {
  const [shouldIncludeAdditionalStep, setShouldIncludeAdditionalStep] =
    useState(false);
  return (
    <CreateTearsheet {...createTearsheetProps}>
      <CreateTearsheetStep {...step1Props}>
        Step 1 content
        <Checkbox
          labelText={\`Include additional step\`}
          id="include-additional-step-checkbox"
          onChange={(value) => setShouldIncludeAdditionalStep(value)}
          checked={shouldIncludeAdditionalStep}
        />
      </CreateTearsheetStep>
      <CreateTearsheetStep
        {...step2Props}
        includeStep={shouldIncludeAdditionalStep}
      >
        Dynamic step content
      </CreateTearsheetStep>
      <CreateTearsheetStep {...step3Props}>
        Final step content
      </CreateTearsheetStep>
    </CreateTearsheet>
  );
};`,
        },
        {
          story: stories.withErrorState,
          title: 'Create tearsheet with step in error state',
          description:
            'Passing an invalid prop to the step will show up an error icon on the progress indicator step indicating an error state in that step',
          source: {
            code: `<CreateTearsheet {...createTearsheetProps}>
      <CreateTearsheetStep
      {...stepProps}
      invalid={true}
    >
      Step in error state
    </CreateTearsheetStep>
  </CreateTearsheet>
  );
};`,
          },
        },
        {
          title: 'Class names',
          description: `Additionally, to get the preferred styling when including your own children as
sections, you can utilize the below included class names.

| Class name                                            | Element     | Features                                                   |
| ----------------------------------------------------- | ----------- | ---------------------------------------------------------- |
| \`#{$pkg-prefix}--create-tearsheet__step--title\`       | title       | \`productive-heading-04\` & \`margin-bottom\` of \`$spacing-05\` |
| \`#{$pkg-prefix}--create-tearsheet__step--subtitle\`    | subtitle    | \`productive-heading-01\` & \`margin-bottom\` of \`$spacing-03\` |
| \`#{$pkg-prefix}--create-tearsheet__step--description\` | description | \`body-long-01\` & \`margin-bottom\` of \`$spacing-06\`          |
| \`#{$pkg-prefix}--create-tearsheet__step--fieldset\`    | fieldset    | \`margin-bottom\` of \`$spacing-05\` to all children elements  |
| \`#{$pkg-prefix}--create-tearsheet__section--divider\`  | divider     | Includes a \`1px\` divider line inside the \`main\` content    |
`,
        },
        {
          title: 'With AI Label',
          description:
            'An AI Label is intended for any scenario where something is being generated by AI to reinforce AI transparency, accountability, and explainability at the UI level. A Carbon AI Label can be provided to the CreateTearsheet component by including a `decorator` or `slug` property on it and providing the carbon AILabel component as its own custom component. Please note that the `slug` attribute is being deprecated and will soon be replaced by `decorator` to align with the Carbon.<br/> The `decorator` is versatile and can also be used to render other components.',
          source: {
            language: 'html',
            code: `
<CreateTearsheet
  {...args}
  decorator={
    <AILabel
      className="ai-label-container"
      autoAlign={false}
      align="bottom-right"
    >
      <AILabelContent>... ...</AILabelContent>
    </AILabel>
  }
>
  ...
</CreateTearsheet>
          `,
          },
        },
      ]}
    />
  );
};

export default DocsPage;
