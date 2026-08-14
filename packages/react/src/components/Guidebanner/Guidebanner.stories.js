/**
 * Copyright IBM Corp. 2023, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './story.scss';

import React, { useState } from 'react';

import { action } from 'storybook/actions';
import { Guidebanner } from './Guidebanner';
import { GuidebannerElement } from './GuidebannerElement';
import { GuidebannerElementButton } from './GuidebannerElementButton';
import { GuidebannerElementLink } from './GuidebannerElementLink';
import mdx from './docs/overview.mdx';

const storyClass = 'guidebanner-stories';

export default {
  title: 'Preview/Onboarding/preview__Guidebanner',
  component: Guidebanner,
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    // Hide inherited HTML attributes
    children: { table: { disable: true } },
    className: { table: { disable: true } },
    id: { table: { disable: true } },
    onChange: { table: { disable: true } },
    onClose: { table: { disable: true } },
    ref: { table: { disable: true } },
    style: { table: { disable: true } },
    tabIndex: { table: { disable: true } },
    // Component-specific props with controls
    closeIconDescription: { control: 'text' },
    collapseButtonLabel: { control: 'text' },
    collapsible: { control: 'boolean' },
    expandButtonLabel: { control: 'text' },
    nextIconDescription: { control: 'text' },
    previousIconDescription: { control: 'text' },
    title: { control: 'text' },
    withLeftGutter: { control: 'boolean' },
  },
  args: {
    closeIconDescription: 'Close',
    collapseButtonLabel: 'Read less',
    collapsible: false,
    expandButtonLabel: 'Read more',
    nextIconDescription: 'Next',
    previousIconDescription: 'Back',
    title: 'Page-related heading that can stand on its own',
    withLeftGutter: false,
  },
};

const DefaultButtonLarge = () => (
  <GuidebannerElementButton
    type="primary"
    onClick={() => {
      action('GuidebannerElementButton.onClick() (type="primary")')();
    }}>
    Show Me
  </GuidebannerElementButton>
);

const DefaultButtonSmall = () => (
  <GuidebannerElementButton
    onClick={() => {
      action('GuidebannerElementButton.onClick()')();
    }}>
    Click me
  </GuidebannerElementButton>
);

const DefaultLink = () => (
  <GuidebannerElementLink
    href="https://www.ibm.com"
    target="_blank"
    onClick={() => {
      action('GuidebannerElementLink.onClick()')();
    }}>
    Learn more
  </GuidebannerElementLink>
);

export const Default = (args) => (
  <div className={`${storyClass}__viewport`}>
    <Guidebanner {...args} onClose={() => action('onClose()')()}>
      <GuidebannerElement
        title="Use-case specific heading"
        description="Use-case specific content related to the heading that explains the concept or adds context. Use-case specific content related to the heading that explains the concept or adds context."
        button={<DefaultButtonLarge />}
      />
      <GuidebannerElement
        title="Use-case specific heading"
        description="Use-case specific content related to the heading that explains the concept or adds context."
        button={<DefaultButtonSmall />}
      />
      <GuidebannerElement
        title="Use-case specific heading"
        description="Use-case specific content related to the heading that explains the concept or adds context."
        button={<DefaultLink />}
      />
    </Guidebanner>
  </div>
);

export const ManyInsights = (args) => {
  const [open, setOpen] = useState(true);
  return (
    <div className={`${storyClass}__viewport`}>
      <Guidebanner
        {...args}
        collapsible
        open={open}
        onChange={setOpen}
        onClose={() => action('onClose()')()}>
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
      </Guidebanner>
    </div>
  );
};

export const Collapsible = (args) => {
  const [open, setOpen] = useState(true);
  return (
    <div className={`${storyClass}__viewport`}>
      <Guidebanner
        {...args}
        collapsible
        open={open}
        onChange={setOpen}
        onClose={() => action('onClose()')()}>
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
      </Guidebanner>
    </div>
  );
};
