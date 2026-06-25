/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import figma from '@figma/code-connect';
import { preview__PageHeader as PageHeader } from './../../../components';
import {
  Button,
  Grid,
  Column,
  BreadcrumbItem,
  Tag,
  TabList,
  Tab,
  OverflowMenu,
  OverflowMenuItem,
} from '@carbon/react';
import { Activity, Bee } from '@carbon/react/icons';

// Breadcrumb bar
figma.connect(
  PageHeader.BreadcrumbBar,
  'https://www.figma.com/design/0F9dKH2abAd7gSfvnacfWf/-v11--IBM-Products-%E2%80%93-Carbon-Design-System?node-id=41243-6410',
  {
    props: {
      icon: figma.boolean('Icon', {
        true: () => <Bee size={16} />,
        false: undefined,
      }),
      contentActions: figma.boolean('Buttons', {
        true: (
          <Button className="breadcrumb-bar-action-button" size="sm">
            Button
          </Button>
        ),
        false: undefined,
      }),
      pageActions: figma.boolean('Actions', {
        true: (
          <>
            <Button
              renderIcon={Activity}
              iconDescription="Icon Description 1"
              hasIconOnly
              size="md"
              kind="ghost"
            />
            <Button
              renderIcon={Activity}
              iconDescription="Icon Description 2"
              hasIconOnly
              size="md"
              kind="ghost"
            />
            <Button
              renderIcon={Activity}
              iconDescription="Icon Description 3"
              hasIconOnly
              size="md"
              kind="ghost"
            />
          </>
        ),
        false: undefined,
      }),
      border: figma.boolean('Bottom border'),
    },
    example: (props) => {
      return (
        <PageHeader.BreadcrumbBar
          border={props.border}
          renderIcon={props.icon}
          pageActions={props.pageActions}
          contentActions={props.contentActions}
        >
          <PageHeader.BreadcrumbOverflow
            renderOverflowBreadcrumb={(hiddenItems) => (
              <BreadcrumbItem data-floating-menu-container>
                <OverflowMenu
                  align="bottom"
                  aria-label="Overflow menu in a breadcrumb"
                >
                  {hiddenItems.map((el, i) => (
                    <OverflowMenuItem itemText={el.innerText} key={i} />
                  ))}
                </OverflowMenu>
              </BreadcrumbItem>
            )}
          >
            <BreadcrumbItem href="/#">Breadcrumb</BreadcrumbItem>
            <BreadcrumbItem href="/#">Breadcrumb</BreadcrumbItem>
            <BreadcrumbItem href="/#">Breadcrumb</BreadcrumbItem>
            <BreadcrumbItem href="/#">Breadcrumb</BreadcrumbItem>
          </PageHeader.BreadcrumbOverflow>
        </PageHeader.BreadcrumbBar>
      );
    },
    imports: [
      "import { preview__PageHeader as PageHeader } from '@carbon/ibm-products';",
    ],
  }
);

// Tab bar
figma.connect(
  PageHeader.TabBar,
  'https://www.figma.com/design/0F9dKH2abAd7gSfvnacfWf/-v11--IBM-Products-%E2%80%93-Carbon-Design-System?node-id=41241-4083',
  {
    props: {
      tabs: figma.boolean('Tabs', {
        true: (
          <TabList>
            <Tab>Tab label</Tab>
            <Tab>Tab label</Tab>
          </TabList>
        ),
        false: undefined,
      }),
      tags: figma.boolean('Tags', {
        true: (
          <>
            <Tag type="blue" id="example-tag-1" key="example-tag-1">
              Tag
            </Tag>
            <Tag type="blue" id="example-tag-2" key="example-tag-2">
              Tag
            </Tag>
          </>
        ),
        false: undefined,
      }),
      scroller: figma.boolean('Collapsable button', {
        true: <PageHeader.ScrollButton />,
        false: undefined,
      }),
    },
    example: (props) => {
      return (
        <PageHeader.TabBar tags={props.tags} scroller={props.scroller}>
          {props.tabs}
        </PageHeader.TabBar>
      );
    },
    imports: [
      "import { preview__PageHeader as PageHeader } from '@carbon/ibm-products';",
    ],
  }
);

const sharedProps = {
  title: figma.nestedProps('_Title', {
    text: figma.string('Title text'),
    icon: figma.boolean('Leading icon', {
      true: () => <Bee size={32} />,
      false: undefined,
    }),
    tags: figma.boolean('Slot', {
      true: (
        <>
          <Tag className="tag" type="blue" size="lg">
            Tag
          </Tag>
          <Tag className="tag" type="blue" size="lg">
            Tag
          </Tag>
        </>
      ),
      false: undefined,
    }),
  }),
  summary: figma.nestedProps('_Summary', {
    text: figma.string('Summary text'),
  }),
};

const pageHeaderConnectionURL =
  'https://www.figma.com/design/0F9dKH2abAd7gSfvnacfWf/-v11--IBM-Products-%E2%80%93-Carbon-Design-System?node-id=31080%3A23323';

figma.connect(PageHeader, pageHeaderConnectionURL, {
  variant: { Style: 'Action' },
  props: {
    ...sharedProps,
    breadcrumbBar: figma.boolean('Breadcrumb bar', {
      true: figma.children('_Breadcrumb bar'),
      false: undefined,
    }),
    header: figma.nestedProps('_Content', {
      actions: figma.boolean('Actions', {
        true: (
          <PageHeader.ContentPageActions
            actions={[
              {
                id: 'action1',
                onClick: () => console.log('Action 1'),
                body: (
                  <Button size="md" kind="primary">
                    Button
                  </Button>
                ),
              },
            ]}
          ></PageHeader.ContentPageActions>
        ),
        false: undefined,
      }),
      subtitle: figma.boolean('Subtitle', {
        true: figma.textContent('Subtitle'),
        false: undefined,
      }),
    }),
    tabBar: figma.boolean('Tab bar', {
      true: figma.children('_Tab bar'),
      false: undefined,
    }),
  },
  example: (props) => {
    return (
      <PageHeader.Root>
        {props.breadcrumbBar}
        <PageHeader.Content
          title={props.title.text}
          renderIcon={props.title.icon}
          pageActions={props.header.actions}
          contextualActions={props.title.tags}
        >
          <PageHeader.ContentText subtitle={props.header.subtitle}>
            {props.summary.text}
          </PageHeader.ContentText>
        </PageHeader.Content>
        {props.tabBar}
      </PageHeader.Root>
    );
  },
  imports: [
    "import { preview__PageHeader as PageHeader } from '@carbon/ibm-products';",
  ],
});

figma.connect(PageHeader, pageHeaderConnectionURL, {
  variant: { Style: 'Image' },
  props: {
    ...sharedProps,
    breadcrumbBar: figma.boolean('Breadcrumb bar', {
      true: figma.children('_Breadcrumb bar'),
      false: undefined,
    }),
    subtitle: figma.nestedProps('_Content expressive', {
      text: figma.boolean('Subtitle', {
        true: figma.textContent('Subtitle'),
        false: undefined,
      }),
    }),
  },
  example: (props) => {
    return (
      <PageHeader.Root>
        <Grid>
          <Column lg={8} md={4} sm={4}>
            {props.breadcrumbBar}
            <PageHeader.Content
              title={props.title.text}
              renderIcon={props.title.icon}
              contextualActions={props.title.tags}
            >
              <PageHeader.ContentText subtitle={props.subtitle.text}>
                {props.summary.text}
              </PageHeader.ContentText>
            </PageHeader.Content>
          </Column>
          <Column lg={8} md={4} sm={0}>
            <PageHeader.HeroImage>
              <img
                src="https://placehold.co/600x400"
                alt="placeholder"
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            </PageHeader.HeroImage>
          </Column>
        </Grid>
      </PageHeader.Root>
    );
  },
  imports: [
    "import { preview__PageHeader as PageHeader } from '@carbon/ibm-products';",
  ],
});
