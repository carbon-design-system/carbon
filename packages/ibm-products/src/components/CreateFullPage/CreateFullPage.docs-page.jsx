/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { StoryDocsPage } from '../../global/js/utils/StoryDocsPage';
import * as stories from './CreateFullPage.stories';

const DocsPage = () => {
  return (
    <StoryDocsPage
      altGuidelinesHref="https://pages.github.ibm.com/carbon/ibm-products/patterns/create-flows/usage/#full-page"
      blocks={[
        {
          description: `There are **2** components that make up a Create Full Page component, which can
be used in unison to create the desired look, or flow. Please note, to utilize
the Create Full Page component, you'll need to have a minimum of two steps. If
you are looking for a one step creation flow, consider Create Tearsheet, Create
Side Panel, or Create Modal.`,
        },
        {
          story: stories.createFullPage,
          description: `This is used when you have one section per step. This can be created by passing
in the overall \`<CreateFullPage />\` component and the \`<CreateFullPageStep />\`
component with form items as children:
`,
          source: {
            code: `<CreateFullPage {...props}>
      <CreateFullPageStep
          title="Required title"
          subtitle="Optional subtitle"
          description="Optional description"
          onNext={() => {'Optional function'}}
          >
          <Row>
            <Column xlg={5} lg={5} md={4} sm={4}>
              <TextInput
                id="test-1"
                invalidText="A valid value is required"
                labelText="Topic name"
                placeholder="Enter topic name"
              />
            </Column>
          </Row>
      </CreateFullPageStep>
    </CreateFullPage>`,
          },
        },
        {
          story: stories.createFullPageWithSections,
          description: `This is used when you have several sections per step. This can be created by
passing in the overall \`<CreateFullPage />\` component and the
\`<CreateFullPageStep />\` component for the first \`section\`. All additional
\`sections\` must be passed in as children, as shown below:`,
          source: {
            code: `<CreateFullPageStep
    title="Required title"
    subtitle="Optional subtitle"
    description="Optional description"
    onNext={() => {'Optional function'}}
    >
    <Row>
      <Column xlg={5} lg={5} md={4} sm={4}>
        <fieldset className={\`#{$pkg-prefix}--create-full-page__step-fieldset\`}>
          <TextInput
            id="test-1"
            invalidText="A valid value is required"
            labelText="Topic name"
            placeholder="Enter topic name"
          />
        </fieldset>
      </Column>
    </Row>
    <span className={\`#{$pkg-prefix}--create-full-page__section-divider\`} />
    <h5 className={\`#{$pkg-prefix}--create-full-page__step-title\`}>Required title</h5>
    <h6 className={\`#{$pkg-prefix}--create-full-page__step-subtitle\`}>
      Optional subtitle
    </h6>
    <p className={\`#{$pkg-prefix}--create-full-page__step-description\`}>
      Optional description
    </p>
    <Row>
      <Column xlg={5} lg={5} md={4} sm={4}>
        <fieldset className={\`#{$pkg-prefix}--create-full-page__step-fieldset\`}>
          <TextInput
            id="test-2"
            invalidText="A valid value is required"
            labelText="Topic name"
            placeholder="Enter topic name"
          />
        </fieldset>
      </Column>
    </Row>
</CreateFullPageStep>`,
          },
        },
        {
          story: stories.createFullPageWithHeader,
          description: `This is used when you want to show a header title and breadcrumbs. This can be created by
passing in a title or breadcrumbs to the \`<CreateFullPage />\` component  as shown below:`,
          source: {
            code: `<CreateFullPage
  title='Page title'
  breadcrumbsOverflowAriaLabel='Open and close additional breadcrumb item list.'
  breadcrumbs={[
    { key: '0', label: 'Breadcrumb 1', href: '/', title: 'home page' },
    { key: '1', label: 'Breadcrumb 2', href: '/', },
    { key: '2', label: 'Breadcrumb 3', href:'/' },
    { key: '3', label: 'Breadcrumb 4', isCurrentPage: true }
  ]}
  maxVisibleBreadcrumbs={3}
  {...props}
>
    <CreateFullPageStep {...createFullPageStepProps}>...</CreateFullPageStep>
</CreateFullPage>`,
          },
        },
        {
          story: stories.createFullPageWithStepInErrorState,
          description: `Passing an invalid prop to the step will show up an error icon on the progress indicator step indicating an error state in that step`,
          source: {
            code: `<CreateFullPage {...createFullPageProps}>
  <CreateFullPageStep
    title="Topic name"
    invalid={true}
  >
    Step content
  </CreateFullPageStep>
</CreateFullPage>`,
          },
        },
        {
          title: 'Using custom components',
          description: `It is possible to use custom components that return \`CreateFullPageStep\`s in
order to help reduce the amount of logic in the component that contains the main
\`CreateFullPage\`. _It is required that each child of the \`CreateFullPage\` either
be a custom step or a \`CreateFullPageStep\`_. An example of this could look like
the following:`,
          source: {
            code: `const CreateStepCustom = ({ subtitle, ...rest }) => {
  return (
    <CreateFullPageStep
      {...rest}
      subtitle={subtitle}
      title="Step 1"
      onNext={() => console.log('optional validation check')}
      onMount={() => console.log('optional onMount fn')}
      disableSubmit={false}
    >
      step content here
    </CreateFullPageStep>
  );
};

const CreateComponent = () => {
  return (
    <CreateFullPage {...createFullPageProps}>
      <CreateStepCustom subtitle="Custom step subtitle" />
      <CreateFullPageStep
        title="Topic name"
        fieldsetLegendText="Topic information"
        disableSubmit={!value}
        subtitle="This is the unique name used to recognize your topic"
        description="It will also be used by your producers and consumers as part of the
        connection information, so make it something easy to recognize."
      >
        Content for second step
      </CreateFullPageStep>
    </CreateFullPage>
  );
};`,
          },
        },
        {
          title: 'Using dynamic steps',
          description: `The use of dynamic steps can be utilized in a scenario when the user makes a
certain selection on one step that effects which steps will follow it, this is
controlled via the \`includeStep\` prop. See abbreviated example below:`,
          source: {
            code: `import { useState } from 'react';

const CreateFlow = () => {
  const [shouldIncludeAdditionalStep, setShouldIncludeAdditionalStep] =
    useState(false);
  return (
    <CreateFullPage {...createFullPageProps}>
      <CreateFullPageStep {...step1Props}>
        Step 1 content
        <Checkbox
          labelText={\`Include additional step\`}
          id="include-additional-step-checkbox"
          onChange={(value) => setShouldIncludeAdditionalStep(value)}
          checked={shouldIncludeAdditionalStep}
        />
      </CreateFullPageStep>
      <CreateFullPageStep
        {...step2Props}
        includeStep={shouldIncludeAdditionalStep}
      >
        Dynamic step content
      </CreateFullPageStep>
      <CreateFullPageStep {...step3Props}>
        Final step content
      </CreateFullPageStep>
    </CreateFullPage>
  );
};`,
          },
        },
        {
          title: 'Class names',
          description: `Additionally, to get the preferred styling when including your own children as
sections, you can utilize the below included class names.

| Class name                                           | Element     | Features                                                   |
| ---------------------------------------------------- | ----------- | ---------------------------------------------------------- |
| \`#{$pkg-prefix}--create-full-page__step-title\`       | title       | \`productive-heading-04\` & \`margin-bottom\` of \`$spacing-05\` |
| \`#{$pkg-prefix}--create-full-page__step-subtitle\`    | subtitle    | \`productive-heading-01\` & \`margin-bottom\` of \`$spacing-03\` |
| \`#{$pkg-prefix}--create-full-page__step-description\` | description | \`body-long-01\` & \`margin-bottom\` of \`$spacing-06\`          |
| \`#{$pkg-prefix}--create-full-page__step-fieldset\`    | fieldset    | \`margin-bottom\` of \`$spacing-05\` to all children elements  |
| \`#{$pkg-prefix}--create-full-page__section-divider\`  | divider     | Includes a \`1px\` divider line inside the \`main\` content    |
`,
        },
        {
          title: 'Prevent the modal from closing after submit',
          description: `In the case that you want to prevent the modal from closing after the user submits you can return an object from \`onRequestSubmit\` and indicate the \`preventClose\` property to \`true\``,
          source: {
            code: `
<CreateFullPage onRequestSubmit={() => ({ preventClose: true })}>
  ...
</CreateFullPage>
`,
          },
        },
      ]}
    />
  );
};

export default DocsPage;
