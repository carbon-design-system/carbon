/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable no-console */

import React from 'react';
import { action } from 'storybook/actions';
import './story.scss';
import { default as Accordion, AccordionItem, AccordionSkeleton } from '.';
import Button from '../Button';
import ButtonSet from '../ButtonSet';
import mdx from './Accordion.mdx';
import { WithLayer } from '../../../.storybook/templates/WithLayer';

export default {
  title: 'Components/Accordion',
  component: Accordion,
  subcomponents: {
    AccordionItem,
    AccordionSkeleton,
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

const sharedArgTypes = {
  align: {
    options: ['start', 'end'],
    control: { type: 'select' },
  },
  children: {
    control: false,
  },
  className: {
    control: false,
  },
  disabled: {
    control: {
      type: 'boolean',
    },
  },
  ordered: {
    control: {
      type: 'boolean',
    },
  },
  isFlush: {
    control: {
      type: 'boolean',
    },
  },
  size: {
    options: ['sm', 'md', 'lg'],
    control: { type: 'select' },
  },
  onHeadingClick: {
    action: 'onHeadingClick',
    control: false,
  },
};

const sharedArgs = {
  align: 'end',
  disabled: false,
  isFlush: false,
  ordered: false,
  size: 'md',
  onHeadingClick: ({ isOpen, event }) => {
    action('onHeadingClick')({
      isOpen,
      type: event.type,
    });
  },
};

export const Default = (args) => {
  const { onHeadingClick, ...restArgs } = args;
  return (
    <Accordion {...restArgs}>
      <AccordionItem title="Choose your plan" onHeadingClick={onHeadingClick}>
        <p>
          Compare plan features and select the option that best matches your
          team&apos;s expected usage.
        </p>
      </AccordionItem>
      <AccordionItem title="Add team members" onHeadingClick={onHeadingClick}>
        <p>
          Invite collaborators by email and assign their workspace roles before
          launch.
        </p>
      </AccordionItem>
      <AccordionItem
        title="Set payment details"
        onHeadingClick={onHeadingClick}>
        <p>
          Add billing information and choose whether to receive invoices by
          email.
        </p>
      </AccordionItem>
      <AccordionItem
        onHeadingClick={onHeadingClick}
        title={
          <span>
            Review and confirm (<em>title can be a node</em>)
          </span>
        }>
        <p>
          Check your setup summary, then confirm to create the workspace for
          your team.
        </p>
      </AccordionItem>
    </Accordion>
  );
};

Default.args = { ...sharedArgs };

Default.argTypes = { ...sharedArgTypes };

export const Controlled = (args) => {
  const [expandAll, setExpandAll] = React.useState(false);
  const { onHeadingClick, ...restArgs } = args;

  return (
    <>
      <ButtonSet className={'controlled-accordion-btnset'}>
        <Button
          className={'controlled-accordion-btn'}
          onClick={() => {
            expandAll === true ? setExpandAll(1) : setExpandAll(true);
          }}>
          Click to expand all
        </Button>
        <Button
          className={'controlled-accordion-btn'}
          onClick={() => {
            expandAll || expandAll === null
              ? setExpandAll(false)
              : setExpandAll(null);
          }}>
          Click to collapse all
        </Button>
      </ButtonSet>

      <Accordion {...restArgs}>
        <AccordionItem
          title="Choose your plan"
          open={expandAll}
          onHeadingClick={onHeadingClick}>
          <p>
            Compare plan features and select the option that best matches your
            team&apos;s expected usage.
          </p>
        </AccordionItem>
        <AccordionItem
          title="Add team members"
          open={expandAll}
          onHeadingClick={onHeadingClick}>
          <p>
            Invite collaborators by email and assign their workspace roles
            before launch.
          </p>
        </AccordionItem>
        <AccordionItem
          title="Set payment details"
          open={expandAll}
          onHeadingClick={onHeadingClick}>
          <p>
            Add billing information and choose whether to receive invoices by
            email.
          </p>
        </AccordionItem>
        <AccordionItem
          title="Review and confirm"
          open={expandAll}
          onHeadingClick={onHeadingClick}>
          <p>
            Check your setup summary, then confirm to create the workspace for
            your team.
          </p>
        </AccordionItem>
      </Accordion>
    </>
  );
};

Controlled.args = { ...sharedArgs };

Controlled.argTypes = { ...sharedArgTypes };

export const _WithLayer = (args) => {
  const { onHeadingClick, ...restArgs } = args;

  return (
    <WithLayer>
      <Accordion {...restArgs}>
        <AccordionItem title="Choose your plan" onHeadingClick={onHeadingClick}>
          <p>
            Compare plan features and select the option that best matches your
            team&apos;s expected usage.
          </p>
        </AccordionItem>
        <AccordionItem title="Add team members" onHeadingClick={onHeadingClick}>
          <p>
            Invite collaborators by email and assign their workspace roles
            before launch.
          </p>
        </AccordionItem>
        <AccordionItem
          title="Set payment details"
          onHeadingClick={onHeadingClick}>
          <p>
            Add billing information and choose whether to receive invoices by
            email.
          </p>
        </AccordionItem>
        <AccordionItem
          title="Review and confirm"
          onHeadingClick={onHeadingClick}>
          <p>
            Check your setup summary, then confirm to create the workspace for
            your team.
          </p>
        </AccordionItem>
      </Accordion>
    </WithLayer>
  );
};

_WithLayer.args = { ...sharedArgs };

_WithLayer.argTypes = { ...sharedArgTypes };

export const Skeleton = (args) => (
  <AccordionSkeleton open count={4} {...args} />
);

Skeleton.decorators = [
  (story) => <div style={{ width: '500px' }}>{story()}</div>,
];

Skeleton.args = {
  align: 'end',
  isFlush: false,
  ordered: false,
};

Skeleton.argTypes = {
  align: {
    options: ['start', 'end'],
    control: { type: 'select' },
  },
  children: {
    control: false,
  },
  className: {
    control: false,
  },
  disabled: {
    table: {
      disable: true,
    },
  },
  isFlush: {
    control: {
      type: 'boolean',
    },
  },
  size: {
    table: {
      disable: true,
    },
  },
};
