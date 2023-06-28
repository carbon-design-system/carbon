/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './Theme-story.scss';
import React from 'react';

import { WithLayer } from '../../../.storybook/templates/WithLayer';
import { VStack } from '../Stack';

import { GlobalTheme, Theme, useTheme } from '../Theme';
import mdx from './Theme.mdx';

export default {
  title: 'Components/Theme',
  component: Theme,
  subcomponents: {
    GlobalTheme,
  },
  parameters: {
    controls: {
      hideNoControlsWarning: true,
    },
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    as: {
      table: {
        disable: true,
      },
    },
    children: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    theme: 'g10',
  },
};

export const Default = () => {
  return (
    <>
      <Theme theme="g100">
        <section className="theme-section">
          <p>g100 theme</p>
        </section>
      </Theme>
      <Theme theme="g90">
        <section className="theme-section">
          <p>g90 theme</p>
        </section>
      </Theme>
      <Theme theme="g10">
        <section className="theme-section">
          <p>g10 theme</p>
        </section>
      </Theme>
      <Theme theme="white">
        <section className="theme-section">
          <p>white theme</p>
        </section>
      </Theme>
    </>
  );
};

export const UseTheme = () => {
  function Example() {
    const { theme } = useTheme();
    return <div className="theme-section">The current theme is: {theme}</div>;
  }

  return (
    <div>
      <Example />
      <Theme theme="g100">
        <Example />
      </Theme>
    </div>
  );
};

UseTheme.storyName = 'useTheme';

export const _WithLayer = () => {
  const themes = ['white', 'g10', 'g90', 'g100'];

  return (
    <VStack gap={7}>
      {themes.map((theme) => (
        <Theme key={theme} theme={theme}>
          <article className="theme-layer-example">
            <header className="theme-layer-header">{theme} theme</header>
            <WithLayer>
              <div className="theme-with-layer">Content</div>
            </WithLayer>
          </article>
        </Theme>
      ))}
    </VStack>
  );
};

const PlaygroundStory = (args) => {
  return (
    <Theme {...args}>
      <section className="theme-section">
        <p>{args.theme} theme</p>
      </section>
    </Theme>
  );
};

export const Playground = PlaygroundStory.bind({});
