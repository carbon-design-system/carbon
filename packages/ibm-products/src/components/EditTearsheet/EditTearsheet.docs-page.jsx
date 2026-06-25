/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { StoryDocsPage } from '../../global/js/utils/StoryDocsPage';
import * as stories from './EditTearsheet.stories';

const DocsPage = () => {
  return (
    <StoryDocsPage
      altGuidelinesHref="https://pages.github.ibm.com/carbon/ibm-products/patterns/edit-and-update/usage/#tearsheet-edit"
      blocks={[
        {
          story: stories.multiFormEditTearsheet,
          description: `This is used when you have one section per step. This can be created by passing
in the overall \`<EditTearsheet />\` component and the \`<EditTearsheetForm />\`
component with form items as children:`,
          source: {
            code: `<EditTearsheet {...props}>
  <EditTearsheetForm
    title="Required title"
    subtitle="Optional subtitle"
    description="Optional description"
    onNext={() => {
      'Optional function';
    }}
  >
    <TextInput
      id="test-1"
      invalidText="A valid value is required"
      labelText="Topic name"
      placeholder="Enter topic name"
    />
  </EditTearsheetForm>
</EditTearsheet>`,
          },
        },
        {
          title: 'Using custom components',
          description: `It is possible to use custom components that return \`EditTearsheetForms\` in
order to help reduce the amount of logic in the component that contains the main
\`EditTearsheet\`. _It is required that each child of the \`EditTearsheet\` either
be a custom step or a \`EditTearsheetForm\`_. An example of this could look like
the following:`,
          source: {
            code: `const CreateFormCustom = ({ subtitle, ...rest }) => {
  return (
    <EditTearsheetForm {...rest} subtitle={subtitle} title="Form 1">
      form content here
    </EditTearsheetForm>
  );
};

const CreateComponent = () => {
  return (
    <EditTearsheet {...EditTearsheetProps}>
      <CreateFormCustom subtitle="Custom form subtitle" />
      <EditTearsheetForm
        title="Topic name"
        fieldsetLegendText="Topic information"
        subtitle="This is the unique name used to recognize your topic"
        description="It will also be used by your producers and consumers as part of the
        connection information, so make it something easy to recognize."
      >
        Content for second form
      </EditTearsheetForm>
    </EditTearsheet>
  );
};`,
          },
        },
        {
          title: `Class names`,
          description: `Additionally, to get the preferred styling when including your own children as
sections, you can utilize the below included class names.

| Class name                                            | Element     | Features                                                   |
| ----------------------------------------------------- | ----------- | ---------------------------------------------------------- |
| \`#{$pkg-prefix}--create-tearsheet__form--title\`       | title       | \`productive-heading-04\` & \`margin-bottom\` of \`$spacing-05\` |
| \`#{$pkg-prefix}--create-tearsheet__form--subtitle\`    | subtitle    | \`productive-heading-01\` & \`margin-bottom\` of \`$spacing-03\` |
| \`#{$pkg-prefix}--create-tearsheet__form--description\` | description | \`body-long-01\` & \`margin-bottom\` of \`$spacing-06\`          |
| \`#{$pkg-prefix}--create-tearsheet__form--fieldset\`    | fieldset    | \`margin-bottom\` of \`$spacing-05\` to all children elements  |
`,
        },
      ]}
    />
  );
};

export default DocsPage;
