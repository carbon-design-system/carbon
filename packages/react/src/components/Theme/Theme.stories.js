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

import { GlobalTheme, Theme, usePrefersDarkScheme, useTheme } from '../Theme';
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

const ThemeText = ({ children, showIsDark }) => {
  const { theme, isDark } = useTheme();

  return (
    <p>
      {children}
      {showIsDark
        ? ` useTheme reveals... { theme: '${theme}', isDark: '${isDark}'}`
        : theme}
    </p>
  );
};

export const Default = () => {
  return (
    <>
      <Theme theme="g100">
        <section className="theme-section">
          <ThemeText />
        </section>
      </Theme>
      <Theme theme="g90">
        <section className="theme-section">
          <ThemeText />
        </section>
      </Theme>
      <Theme theme="g10">
        <section className="theme-section">
          <ThemeText />
        </section>
      </Theme>
      <Theme theme="white">
        <section className="theme-section">
          <ThemeText />
        </section>
      </Theme>
    </>
  );
};

export const UseTheme = () => {
  return (
    <div>
      <section className="theme-section">
        <ThemeText showIsDark={true} />
      </section>
      <Theme theme="g100">
        <section className="theme-section">
          <ThemeText showIsDark={true} />
        </section>
      </Theme>
    </div>
  );
};

UseTheme.storyName = 'useTheme';

export const UsePrefersDarkScheme = () => {
  const prefersDark = usePrefersDarkScheme();

  const theme1 = prefersDark ? 'g100' : 'white';
  const theme2 = prefersDark ? 'white' : 'g100';
  const theme3 = prefersDark ? 'g90' : 'g10';
  const theme4 = prefersDark ? 'g10' : 'g90';

  return (
    <Theme theme={theme1}>
      <section className="theme-section">
        <ThemeText showIsDark={true}>
          usePrefersDarkScheme() is {prefersDark ? '`true`' : '`false`'}. Theme
          set to `{theme1}`.
        </ThemeText>
      </section>
      <Theme theme={theme2}>
        <section className="theme-section">
          <ThemeText showIsDark={true}>
            usePrefersDarkScheme() is {prefersDark ? '`true`' : '`false`'}. An
            alternative theme set of `{theme2}`.
          </ThemeText>
        </section>
      </Theme>
      <Theme theme={theme3}>
        <section className="theme-section">
          <ThemeText showIsDark={true}>
            usePrefersDarkScheme() is {prefersDark ? '`true`' : '`false`'}.
            Theme set to `{theme3}`.
          </ThemeText>
        </section>
      </Theme>
      <Theme theme={theme4}>
        <section className="theme-section">
          <ThemeText showIsDark={true}>
            usePrefersDarkScheme() is {prefersDark ? '`true`' : '`false`'}. An
            alternative theme set of `{theme4}`.
          </ThemeText>
        </section>
      </Theme>
    </Theme>
  );
};
UsePrefersDarkScheme.storyName = 'usePrefersDarkScheme';

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
        <ThemeText before="Theme" />
      </section>
    </Theme>
  );
};

export const Playground = PlaygroundStory.bind({});
