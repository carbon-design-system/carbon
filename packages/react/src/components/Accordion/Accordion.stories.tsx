/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { action } from 'storybook/actions';
import './story.scss';
import { default as Accordion, AccordionItem, AccordionSkeleton } from '.';
import type { AccordionItemProps } from './AccordionItem';
import Button from '../Button';
import ButtonSet from '../ButtonSet';
import mdx from './Accordion.mdx';
import { WithLayer } from '../../../.storybook/templates/WithLayer';

type OnHeadingClickPayload = Parameters<
  NonNullable<AccordionItemProps['onHeadingClick']>
>[0];

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
  onHeadingClick: ({ isOpen, event }: OnHeadingClickPayload) => {
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
  const { onHeadingClick, ...restArgs } = args;
  const accordionItemIds = ['plan', 'members', 'payment', 'review'] as const;
  type AccordionItemId = (typeof accordionItemIds)[number];

  const [openItems, setOpenItems] = useState(() => new Set<AccordionItemId>());

  const handleHeadingClick =
    (id: AccordionItemId) =>
    ({ isOpen, event }: OnHeadingClickPayload) => {
      setOpenItems((prev) => {
        const nextOpenItems = new Set(prev);

        if (isOpen) {
          nextOpenItems.add(id);
        } else {
          nextOpenItems.delete(id);
        }

        return nextOpenItems;
      });

      if (onHeadingClick) {
        onHeadingClick({ isOpen, event });
      }
    };

  return (
    <>
      <ButtonSet className={'controlled-accordion-btnset'}>
        <Button
          className={'controlled-accordion-btn'}
          onClick={() => {
            setOpenItems(new Set(accordionItemIds));
          }}>
          Open all
        </Button>
        <Button
          className={'controlled-accordion-btn'}
          onClick={() => {
            setOpenItems(new Set());
          }}>
          Close all
        </Button>
      </ButtonSet>

      <Accordion {...restArgs}>
        <AccordionItem
          title="Choose your plan"
          open={openItems.has('plan')}
          onHeadingClick={handleHeadingClick('plan')}>
          <p>
            Compare plan features and select the option that best matches your
            team&apos;s expected usage.
          </p>
        </AccordionItem>
        <AccordionItem
          title="Add team members"
          open={openItems.has('members')}
          onHeadingClick={handleHeadingClick('members')}>
          <p>
            Invite collaborators by email and assign their workspace roles
            before launch.
          </p>
        </AccordionItem>
        <AccordionItem
          title="Set payment details"
          open={openItems.has('payment')}
          onHeadingClick={handleHeadingClick('payment')}>
          <p>
            Add billing information and choose whether to receive invoices by
            email.
          </p>
        </AccordionItem>
        <AccordionItem
          title="Review and confirm"
          open={openItems.has('review')}
          onHeadingClick={handleHeadingClick('review')}>
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
