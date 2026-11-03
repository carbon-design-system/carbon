/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Information } from '@carbon/icons-react';
import React, { useRef, useEffect } from 'react';
import { default as Button } from '../Button';
import { default as Link } from '../Link';
import {
  ToggletipLabel,
  Toggletip,
  ToggletipButton,
  ToggletipContent,
  ToggletipActions,
} from '../Toggletip';
import mdx from './Toggletip.mdx';

const alignOptions = [
  'top',
  'top-start',
  'top-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'left',
  'left-start',
  'left-end',
  'right',
  'right-start',
  'right-end',
];

const deprecatedAlignOptions = [
  'top-left',
  'top-right',
  'bottom-left',
  'bottom-right',
  'left-bottom',
  'left-top',
  'right-bottom',
  'right-top',
];

const defaultArgs = {
  align: 'bottom',
  alignmentAxisOffset: 0,
  autoAlign: true,
  bodyText:
    'Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed do eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.',
  buttonLabel: 'Show information',
  buttonText: 'Button',
  defaultOpen: false,
  labelText: 'Toggletip label',
  linkText: 'Link action',
};

const argTypes = {
  align: {
    options: alignOptions,
    control: 'select',
  },
  alignDeprecated: {
    name: 'align (deprecated)',
    options: deprecatedAlignOptions,
    control: 'select',
    table: {
      category: 'Deprecated',
    },
  },
  alignmentAxisOffset: {
    control: 'number',
    if: { arg: 'autoAlign', eq: true },
  },
  autoAlign: {
    control: 'boolean',
  },
  bodyText: {
    control: 'text',
    table: {
      category: 'ToggletipContent',
    },
  },
  buttonLabel: {
    control: 'text',
    table: {
      category: 'ToggletipButton',
    },
  },
  buttonText: {
    control: 'text',
    table: {
      category: 'ToggletipActions',
    },
  },
  defaultOpen: {
    control: 'boolean',
  },
  labelText: {
    control: 'text',
    table: {
      category: 'ToggletipLabel',
    },
  },
  linkText: {
    control: 'text',
    table: {
      category: 'ToggletipActions',
    },
  },
};

const experimentalArgTypes = {
  ...argTypes,
  autoAlign: {
    ...argTypes.autoAlign,
    table: { readonly: true },
  },
  defaultOpen: {
    ...argTypes.defaultOpen,
    table: { readonly: true },
  },
};

const autoAlignStoryContainerStyle = {
  display: 'grid',
  placeItems: 'center',
  width: '200vw',
  minWidth: '1200px',
  height: '200vh',
  minHeight: '1200px',
};

export default {
  title: 'Components/Toggletip',
  component: Toggletip,
  subcomponents: {
    ToggletipLabel,
    ToggletipButton,
    ToggletipContent,
    ToggletipActions,
  },
  parameters: {
    controls: {
      include: Object.keys(argTypes),
    },
    docs: {
      page: mdx,
    },
  },
};

// Note: autoAlign is used here only to make tooltips visible in StackBlitz,
// autoAlign is in preview and not part of the actual implementation.
export const Default = (args) => {
  const {
    align,
    alignDeprecated,
    bodyText,
    buttonLabel,
    buttonText,
    defaultOpen,
    labelText,
    linkText,
    ...rest
  } = args;
  const resolvedAlign = alignDeprecated || align;
  return (
    <>
      <ToggletipLabel>{labelText}</ToggletipLabel>
      <Toggletip
        key={defaultOpen ? 'open' : 'closed'}
        align={resolvedAlign}
        defaultOpen={defaultOpen}
        {...rest}>
        <ToggletipButton label={buttonLabel}>
          <Information />
        </ToggletipButton>
        <ToggletipContent>
          <p>{bodyText}</p>
          <ToggletipActions>
            <Link href="#">{linkText}</Link>
            <Button size="sm">{buttonText}</Button>
          </ToggletipActions>
        </ToggletipContent>
      </Toggletip>
    </>
  );
};

Default.args = defaultArgs;
Default.argTypes = argTypes;

Default.story = {
  decorators: [
    (story) => (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}>
        {story()}
      </div>
    ),
  ],
};

export const ExperimentalAutoAlign = (args) => {
  const ref = useRef();
  useEffect(() => {
    ref?.current?.scrollIntoView({ block: 'center', inline: 'center' });
  });

  const {
    align,
    alignDeprecated,
    bodyText,
    buttonLabel,
    buttonText,
    defaultOpen,
    labelText,
    linkText,
    ...rest
  } = args;
  const resolvedAlign = alignDeprecated || align;

  return (
    <div style={autoAlignStoryContainerStyle}>
      <div
        style={{
          inlineSize: '8rem',
        }}>
        <ToggletipLabel>{labelText}</ToggletipLabel>
        <Toggletip
          key={defaultOpen ? 'open' : 'closed'}
          align={resolvedAlign}
          defaultOpen={defaultOpen}
          {...rest}>
          <ToggletipButton label={buttonLabel}>
            <Information ref={ref} />
          </ToggletipButton>
          <ToggletipContent>
            <p>{bodyText}</p>
            <ToggletipActions>
              <Link href="#">{linkText}</Link>
              <Button size="sm">{buttonText}</Button>
            </ToggletipActions>
          </ToggletipContent>
        </Toggletip>
      </div>
    </div>
  );
};

ExperimentalAutoAlign.args = {
  ...defaultArgs,
  autoAlign: true,
  bodyText:
    'Scroll the container up, down, left or right to observe how the Toggletip will automatically change its position in attempt to stay within the viewport. This works on initial render in addition to on scroll.',
  defaultOpen: true,
};
ExperimentalAutoAlign.argTypes = experimentalArgTypes;
