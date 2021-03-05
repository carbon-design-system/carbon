/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from '@storybook/addon-actions';
import {
  withKnobs,
  boolean,
  text,
  select,
  number,
} from '@storybook/addon-knobs';
import CodeSnippet from './CodeSnippet';
import CodeSnippetSkeleton from './CodeSnippet.Skeleton';
import mdx from './CodeSnippet.mdx';

const lightPropMessage = (
  <small style={{ display: 'block', paddingBottom: '1rem' }}>
    The snippet container should never be the same color as the page background.
    <br />
    {'Do not use the '}
    <CodeSnippet type="inline" light>
      light
    </CodeSnippet>
    {' variant on '}
    <CodeSnippet type="inline" light>
      $ui-background
    </CodeSnippet>
    {' or '}
    <CodeSnippet type="inline" light>
      $ui-02
    </CodeSnippet>
    .
  </small>
);

export default {
  title: 'CodeSnippet',
  component: CodeSnippet,
  subcomponents: {
    CodeSnippetSkeleton,
  },
  decorators: [
    withKnobs,
    (story) => (
      <div className={lightProp().light ? 'bx--tile' : ''}>
        {lightProp().light && lightPropMessage}
        <br />
        {story()}
      </div>
    ),
  ],
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

const typeOptions = {
  inline: { inline: 'inline' },
  single: { single: 'single' },
  multi: { multi: 'multi' },
  skeleton: { single: 'single', multi: 'multi' },
  playground: {
    inline: 'inline',
    single: 'single',
    multi: 'multi',
  },
};

const typeDefaults = {
  inline: 'inline',
  single: 'single',
  multi: 'multi',
  skeleton: 'single',
  playground: 'inline',
};

const childrenOptions = {
  inline: 'node -v',
  single:
    'yarn add carbon-components@latest carbon-components-react@latest @carbon/icons-react@latest carbon-icons@latest',
  multi: 'The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog.\n'.repeat(
    60
  ),
  skeleton: undefined,
  playground: 'Playground CodeSnippet',
};

const ariaLabelProp = () => ({
  ariaLabel: text(
    'ariaLabel: Specify a label to be read by screen readers',
    undefined
  ),
});
const classNameProp = () => ({
  className: text(
    'className: Specify an optional className to be applied to the container node',
    undefined
  ),
});
const childrenProp = (type) => ({
  children: text(
    'children: Provide the content of your CodeSnippet as a string',
    childrenOptions[type || 'playground']
  ),
});
const copyButtonDescriptionProp = () => ({
  copyButtonDescription: text(
    'copyButtonDescription: Specify the description for the Copy Button',
    undefined
  ),
});
const disabledProp = () => ({
  disabled: boolean(
    'disabled: Specify whether or not the CodeSnippet should be disabled',
    false
  ),
});
const feedbackProp = () => ({
  feedback: text(
    'feedback: Specify the string displayed when the snippet is copied',
    undefined
  ),
});
const hideCopyButtonProp = () => ({
  hideCopyButton: boolean(
    'hideCopyButton: Specify whether or not a copy button should be used/rendered',
    false
  ),
});
const lightProp = () => ({
  light: boolean(
    'light: Specify whether you are using the light variant of the Code Snippet',
    false
  ),
});
const minClosedNumberOfRowsProp = () => ({
  minClosedNumberOfRows: number(
    'minClosedNumberOfRows: Specify the minimum number of rows to be shown when in closed view',
    3
  ),
});
const minExpandedNumberOfRowsProp = () => ({
  minExpandedNumberOfRows: number(
    'minExpandedNumberOfRows: Specify the minimum number of rows to be shown when in expanded view',
    16
  ),
});
const maxClosedNumberOfRowsProp = () => ({
  maxClosedNumberOfRows: number(
    'maxClosedNumberOfRows: Specify the maximum number of rows to be shown when in closed view',
    15
  ),
});
const maxExpandedNumberOfRowsProp = () => ({
  maxExpandedNumberOfRows: number(
    'maxExpandedNumberOfRows: Specify the maximum number of rows to be shown when in expanded view',
    50
  ),
});
const onClickProp = () => ({
  onClick: action('onClick'),
});
const showLessTextProp = () => ({
  showLessText: text(
    'showLessText: Specify a string that is displayed to close the Code Snippet',
    undefined
  ),
});
const showMoreTextProp = () => ({
  showMoreText: text(
    'showMoreText: Specify a string that is displayed to expand the Code Snippet',
    undefined
  ),
});
const typeProp = (type) => ({
  type: select(
    'type: Provide the type of Code Snippet',
    typeOptions[type],
    typeDefaults[type]
  ),
});
const wrapTextProp = () => ({
  wrapText: boolean('wrapText: Specify whether or not to wrap the text)', true),
});

export const Inline = () => (
  <CodeSnippet
    type="inline"
    {...ariaLabelProp()}
    {...classNameProp()}
    // {...copyButtonDescriptionProp()}
    // {...disabledProp()}
    {...feedbackProp()}
    {...hideCopyButtonProp()}
    {...lightProp()}
    // {...minClosedNumberOfRowsProp()}
    // {...minExpandedNumberOfRowsProp()}
    // {...maxClosedNumberOfRowsProp()}
    // {...maxExpandedNumberOfRowsProp()}
    {...onClickProp()}
    // {...showLessTextProp()}
    // {...showMoreTextProp()}
    {...typeProp('inline')}
    {...wrapTextProp()}>
    {childrenProp('inline').children}
  </CodeSnippet>
);

export const Single = () => (
  <CodeSnippet
    type="single"
    {...ariaLabelProp()}
    {...classNameProp()}
    {...copyButtonDescriptionProp()}
    {...disabledProp()}
    {...feedbackProp()}
    {...hideCopyButtonProp()}
    {...lightProp()}
    // {...minClosedNumberOfRowsProp()}
    // {...minExpandedNumberOfRowsProp()}
    // {...maxClosedNumberOfRowsProp()}
    // {...maxExpandedNumberOfRowsProp()}
    {...onClickProp()}
    // {...showLessTextProp()}
    // {...showMoreTextProp()}
    {...typeProp('single')}
    {...wrapTextProp()}>
    {childrenProp('single').children}
  </CodeSnippet>
);

export const Multi = () => (
  <CodeSnippet
    type="multi"
    {...ariaLabelProp()}
    {...classNameProp()}
    {...copyButtonDescriptionProp()}
    {...disabledProp()}
    {...feedbackProp()}
    {...hideCopyButtonProp()}
    {...lightProp()}
    {...minClosedNumberOfRowsProp()}
    {...minExpandedNumberOfRowsProp()}
    {...maxClosedNumberOfRowsProp()}
    {...maxExpandedNumberOfRowsProp()}
    {...onClickProp()}
    {...showLessTextProp()}
    {...showMoreTextProp()}
    {...typeProp('multi')}
    {...wrapTextProp()}>
    {childrenProp('multi').children}
  </CodeSnippet>
);

export const Skeleton = () => (
  <CodeSnippetSkeleton
    type="single"
    {...classNameProp()}
    {...typeProp('skeleton')}
  />
);

export const Playground = () => {
  childrenProp('playground');
  return (
    <>
      {typeProp('playground').type === 'inline' && Inline()}
      {typeProp('playground').type === 'single' && Single()}
      {typeProp('playground').type === 'multi' && Multi()}
    </>
  );
};

export const DocsOverView = () => (
  <CodeSnippet type="inline" feedback="Copied to clipboard">
    {'node -v'}
  </CodeSnippet>
);

export const DocsInline = () => (
  <CodeSnippet type="inline" feedback="Copied to clipboard">
    {'node -v'}
  </CodeSnippet>
);

export const DocsMulti = () => (
  <CodeSnippet type="multi" feedback="Copied to clipboard">
    {'The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog.\n'.repeat(
      60
    )}
  </CodeSnippet>
);

export const DocsSingle = () => (
  <CodeSnippet type="single" feedback="Copied to clipboard">
    yarn add carbon-components@latest carbon-components-react@latest
    @carbon/icons-react@latest carbon-icons@latest
  </CodeSnippet>
);

export const DocsSkeleton = () => (
  <div>
    <CodeSnippetSkeleton type="single" />
    <br />
    <CodeSnippetSkeleton type="multi" />
  </div>
);
