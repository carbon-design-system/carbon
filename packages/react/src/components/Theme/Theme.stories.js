/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './Theme-story.scss';
import React, { useEffect } from 'react';

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

const ThemeText = ({ before, after }) => {
  const { theme } = useTheme();

  return (
    <p>
      {before} `{theme}` {after}
    </p>
  );
};

export const Default = () => {
  return (
    <>
      <Theme theme="g100">
        <section className="theme-section">
          <ThemeText before="Theme" after="selected" />
        </section>
      </Theme>
      <Theme theme="g90">
        <section className="theme-section">
          <ThemeText before="Theme" after="selected" />
        </section>
      </Theme>
      <Theme theme="g10">
        <section className="theme-section">
          <ThemeText before="Theme" after="selected" />
        </section>
      </Theme>
      <Theme theme="white">
        <section className="theme-section">
          <ThemeText before="Theme" after="selected" />
        </section>
      </Theme>
      <Theme theme="system">
        <section className="theme-section">
          <ThemeText before="Theme" after="based on system settings" />
        </section>
      </Theme>
      <Theme theme="system" themeSystemLight="g10" themeSystemDark="g100">
        <section className="theme-section">
          <ThemeText before="Theme" after="based on system settings" />
        </section>
      </Theme>
    </>
  );
};

export const UseTheme = () => {
  const Example = ({ after }) => {
    const { theme } = useTheme();

    return (
      <div className="theme-section">
        The current theme is: `{theme}` {after}
      </div>
    );
  };

  return (
    <div>
      <Example />
      <Theme theme="g100">
        <Example />
      </Theme>
      <Theme theme="system">
        <Example after="based on system settings" />
      </Theme>
      <Theme theme="system" themeSystemLight="g10" themeSystemDark="g100">
        <Example after="based on system settings" />
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
        <ThemeText />
      </section>
    </Theme>
  );
};

export const Playground = PlaygroundStory.bind({});
