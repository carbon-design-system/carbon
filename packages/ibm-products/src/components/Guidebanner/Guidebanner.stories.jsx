/**
 * Copyright IBM Corp. 2023, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { action } from 'storybook/actions';
import {
  previewCandidate__Guidebanner as Guidebanner,
  previewCandidate__GuidebannerElement as GuidebannerElement,
  previewCandidate__GuidebannerElementButton as GuidebannerElementButton,
  previewCandidate__GuidebannerElementLink as GuidebannerElementLink,
} from '..';
import mdx from './Guidebanner.mdx';

import styles from './_storybook-styles.scss?inline';

const storyClass = 'guidebanner-stories';

export default {
  title: 'Preview Candidate/Onboarding/Guidebanner',
  component: Guidebanner,
  tags: ['autodocs', 'Onboarding'],
  parameters: {
    styles,
    layout: 'fullscreen',
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
    theme: {
      table: {
        disable: true,
      },
    },
  },
};

const defaultProps = {
  onClose: () => action('onClose()')(),
  title: 'Page-related heading that can stand on its own',
  withLeftGutter: false,
};

const DefaultButtonLarge = () => (
  <GuidebannerElementButton
    type="primary"
    onClick={() => {
      action('GuidebannerElementButton.onClick() (type="primary")')();
    }}
  >
    Show Me
  </GuidebannerElementButton>
);

const DefaultButtonSmall = () => (
  <GuidebannerElementButton
    onClick={() => {
      action('GuidebannerElementButton.onClick()')();
    }}
  >
    Click me
  </GuidebannerElementButton>
);

const DefaultLink = () => (
  <GuidebannerElementLink
    href="https://www.ibm.com"
    target="_blank"
    onClick={() => {
      action('GuidebannerElementLink.onClick()')();
    }}
  >
    Learn more
  </GuidebannerElementLink>
);

const Template = ({ children, ...rest }) => {
  // Normally GuidebannerElement are listed directly as children of Guidebanner,
  // but as a story we have to wrap the JSX in a React.Fragment.
  // To feed them here, we point to the list of GuidebannerElements directly.
  const childArray = children.props.children;
  return (
    <div className={`${storyClass}__viewport`}>
      <Guidebanner {...rest}>{childArray}</Guidebanner>
    </div>
  );
};

export const collapsible = Template.bind({});
collapsible.args = {
  ...defaultProps,
  collapsible: true,
  open: true,
  children: (
    <React.Fragment>
      <GuidebannerElement
        title="Use-case specific heading"
        description="Use-case specific content related to the heading that explains the concept or adds context. Use-case specific content related to the heading that explains the concept or adds context."
        button={<DefaultButtonLarge />}
      />
      <GuidebannerElement
        title="Use-case specific heading"
        description="Use-case specific content related to the heading that explains the concept or adds context. Use-case specific content related to the heading that explains the concept or adds context. Use-case specific content related to the heading that explains the concept or adds context."
        button={<DefaultButtonSmall />}
      />
      <GuidebannerElement
        title="Use-case specific heading"
        description="Use-case specific content related to the heading that explains the concept or adds context."
        button={<DefaultButtonSmall />}
      />
      <GuidebannerElement
        title="Use-case specific heading"
        description="Use-case specific content related to the heading that explains the concept or adds context. Use-case specific content related to the heading that explains the concept or adds context."
        button={<DefaultLink />}
      />
      <GuidebannerElement
        title="Use-case specific heading"
        description="Use-case specific content related to the heading that explains the concept or adds context."
        button={<DefaultLink />}
      />
    </React.Fragment>
  ),
};

export const manyInsights = Template.bind({});
manyInsights.args = {
  ...defaultProps,
  collapsible: true,
  open: false,
  children: (
    <React.Fragment>
      <GuidebannerElement
        title="Use-case specific heading"
        description="Use-case specific content related to the heading that explains the concept or adds context. Use-case specific content related to the heading that explains the concept or adds context."
        button={<DefaultButtonLarge />}
      />
      <GuidebannerElement
        title="Use-case specific heading"
        description="Use-case specific content related to the heading that explains the concept or adds context. Use-case specific content related to the heading that explains the concept or adds context. Use-case specific content related to the heading that explains the concept or adds context."
        button={<DefaultButtonSmall />}
      />
      <GuidebannerElement
        title="Use-case specific heading"
        description="Use-case specific content related to the heading that explains the concept or adds context."
        button={<DefaultButtonSmall />}
      />
      <GuidebannerElement
        title="Use-case specific heading"
        description="Use-case specific content related to the heading that explains the concept or adds context. Use-case specific content related to the heading that explains the concept or adds context."
        button={<DefaultLink />}
      />
      <GuidebannerElement
        title="Use-case specific heading"
        description="Use-case specific content related to the heading that explains the concept or adds context."
        button={<DefaultLink />}
      />
    </React.Fragment>
  ),
};

export const fewInsights = Template.bind({});
fewInsights.args = {
  ...defaultProps,
  collapsible: true,
  open: false,
  children: (
    <React.Fragment>
      <GuidebannerElement
        title="Use-case specific heading"
        description="Use-case specific content related to the heading that explains the concept or adds context. Use-case specific content related to the heading that explains the concept or adds context."
        button={<DefaultButtonLarge />}
      />
      <GuidebannerElement
        title="Use-case specific heading"
        description="Use-case specific content related to the heading that explains the concept or adds context."
        button={<DefaultLink />}
      />
    </React.Fragment>
  ),
};
