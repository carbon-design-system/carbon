/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useCallback } from 'react';
import {
  preview__PageHeader as PageHeader,
  preview__TruncatedText as TruncatedText,
} from '../..';
import {
  PageHeaderBreadcrumbBar,
  PageHeaderContent,
  PageHeaderTabBar,
  PageHeaderContentText,
  PageHeaderContentPageActions,
  PageHeaderHeroImage,
  PageHeaderBreadcrumbPageActions,
  PageHeaderScrollButton,
  PageHeaderTitleBreadcrumb,
  PageHeaderBreadcrumbOverflow,
  PageHeaderTagOverflow,
} from './PageHeader';
import {
  Tag,
  Grid,
  Column,
  Breadcrumb,
  BreadcrumbItem,
  TabList,
  Tab,
  Tabs,
  TabPanels,
  TabPanel,
  OverflowMenu,
  OverflowMenuItem,
  OperationalTag,
  HeaderContainer,
  Header,
  HeaderName,
  FeatureFlags,
} from '@carbon/react';
import { breakpoints } from '@carbon/layout';
import image1 from './_story-assets/2x1.jpg';
import image2 from './_story-assets/3x2.jpg';
import styles from './_storybook-styles.scss?inline';

import {
  Add,
  Bee,
  AiGenerate,
  CloudFoundry_1,
  Activity,
} from '@carbon/icons-react';
import mdx from './PageHeader.mdx';
import { pageActionButtonItems } from './_story-assets/pageActionButtonItems';

export default {
  title: 'Preview/PageHeader',
  component: PageHeader,
  subcomponents: {
    PageHeaderBreadcrumbBar,
    PageHeaderContent,
    PageHeaderHeroImage,
    PageHeaderTabBar,
    PageHeaderContentText,
    PageHeaderContentPageActions,
    PageHeaderBreadcrumbPageActions,
    PageHeaderScrollButton,
    PageHeaderTitleBreadcrumb,
    PageHeaderBreadcrumbOverflow,
    PageHeaderTagOverflow,
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: false, // ReactNode props don't work in the controls pane
    },
  },
  parameters: {
    styles,
    docs: {
      page: mdx,
    },
  },
  decorators: [
    (Story) => (
      <>
        <style>
          {`
          .sb-show-main.sb-main-centered {
            align-items: normal;
          }

          .sb-show-main.sb-main-centered #storybook-root {
            margin: 0;
            padding: 0;
            width: 100%;
          }
        `}
        </style>
        <Story />
      </>
    ),
  ],
};

const BeeIcon = () => <Bee size={32} />;

const BreadcrumbBeeIcon = () => <Bee size={16} />;

const breadcrumbPageActionItems = [
  {
    id: 'breadcrumb-action-1',
    label: 'Icon Description 1',
    renderIcon: Activity,
    onClick: () => console.log('Breadcrumb action 1'),
  },
  {
    id: 'breadcrumb-action-2',
    label: 'Icon Description 2',
    renderIcon: AiGenerate,
    onClick: () => console.log('Breadcrumb action 2'),
  },
  {
    id: 'breadcrumb-action-3',
    label: 'Icon Description 3',
    renderIcon: CloudFoundry_1,
    onClick: () => console.log('Breadcrumb action 3'),
  },
];

const breadcrumbPageActions = (
  <PageHeader.BreadcrumbPageActions actions={breadcrumbPageActionItems} />
);

export const Default = (args) => {
  const {
    border,
    pageActionsFlush,
    contentActionsFlush,
    renderBreadcrumbIcon,
    title,
    ...rootArgs
  } = args;
  return (
    <Tabs>
      <PageHeader.Root {...rootArgs}>
        <PageHeader.BreadcrumbBar
          border={border}
          pageActionsFlush={pageActionsFlush}
          contentActionsFlush={contentActionsFlush}
          renderIcon={renderBreadcrumbIcon ? BreadcrumbBeeIcon : null}
          contentActions={
            <PageHeader.ContentPageActions
              menuButtonLabel="Actions"
              actions={pageActionButtonItems}
            />
          }
          pageActions={breadcrumbPageActions}
        >
          <PageHeader.BreadcrumbOverflow
            renderOverflowBreadcrumb={(hiddenItems) => (
              <BreadcrumbItem data-floating-menu-container>
                <OverflowMenu
                  align="bottom"
                  aria-label="Overflow menu in a breadcrumb"
                >
                  {hiddenItems.map((el) => (
                    <OverflowMenuItem itemText={el.innerText} />
                  ))}
                </OverflowMenu>
              </BreadcrumbItem>
            )}
          >
            <BreadcrumbItem href="/#">Breadcrumb 1</BreadcrumbItem>
            <BreadcrumbItem href="/#">Breadcrumb 2</BreadcrumbItem>
            <BreadcrumbItem href="/#">Breadcrumb 3</BreadcrumbItem>
            <PageHeader.TitleBreadcrumb data-fixed>
              {title}
            </PageHeader.TitleBreadcrumb>
          </PageHeader.BreadcrumbOverflow>
        </PageHeader.BreadcrumbBar>
        <PageHeader.Content
          title={title}
          pageActions={
            <PageHeader.ContentPageActions
              menuButtonLabel="Actions"
              actions={pageActionButtonItems}
            />
          }
        >
          <PageHeader.ContentText subtitle="Subtitle">
            Built for modern teams, our technology platform simplifies
            complexity with powerful APIs, real-time collaboration tools, and
            seamless integration. From deployment to monitoring, we help you
            ship faster, scale efficiently, and stay in control every step of
            the way.
          </PageHeader.ContentText>
        </PageHeader.Content>
        <PageHeader.TabBar>
          <TabList>
            <Tab>Tab 1</Tab>
            <Tab>Tab 2</Tab>
            <Tab>Tab 3</Tab>
            <Tab>Tab 4</Tab>
            <Tab>Tab 5</Tab>
            <Tab>Tab 6</Tab>
            <Tab>Tab 7</Tab>
          </TabList>
        </PageHeader.TabBar>
      </PageHeader.Root>
      <TabPanels>
        <TabPanel className="page-header-story--tall-tab-panel">
          Tab Panel 1
        </TabPanel>
        <TabPanel className="page-header-story--tall-tab-panel">
          Tab Panel 2
        </TabPanel>
        <TabPanel className="page-header-story--tall-tab-panel">
          Tab Panel 3
        </TabPanel>
        <TabPanel className="page-header-story--tall-tab-panel">
          Tab Panel 4
        </TabPanel>
        <TabPanel className="page-header-story--tall-tab-panel">
          Tab Panel 5
        </TabPanel>
        <TabPanel className="page-header-story--tall-tab-panel">
          Tab Panel 6
        </TabPanel>
        <TabPanel className="page-header-story--tall-tab-panel">
          Tab Panel 7
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

Default.args = {
  border: true,
  pageActionsFlush: false,
  contentActionsFlush: false,
  title:
    'Virtual-Machine-DAL-really-long-title-example-that-goes-at-least-2-lines-long',
  renderBreadcrumbIcon: true,
};

Default.argTypes = {
  border: {
    description: 'Specify whether to render BreadcrumbBar border',
    control: {
      type: 'boolean',
    },
  },
  pageActionsFlush: {
    description:
      'Specify whether the page actions within BreadcrumbBar should be flush',
    control: {
      type: 'boolean',
    },
  },
  contentActionsFlush: {
    description:
      'Specify whether the content actions within BreadcrumbBar should be flush with the page actions',
    control: {
      type: 'boolean',
    },
  },
  title: {
    description:
      'Provide the title text to be rendered within  PageHeaderContent',
    control: {
      type: 'text',
    },
  },
  renderBreadcrumbIcon: {
    description:
      'Specify whether to render the BreadcrumbBar icon (storybook control only)',
    control: {
      type: 'boolean',
    },
  },
};

export const ContentWithIcon = (args) => (
  <PageHeader.Root>
    <PageHeader.BreadcrumbBar pageActions={breadcrumbPageActions}>
      <Breadcrumb>
        <BreadcrumbItem href="/#">Breadcrumb 1</BreadcrumbItem>
        <BreadcrumbItem href="#">Breadcrumb 2</BreadcrumbItem>
      </Breadcrumb>
    </PageHeader.BreadcrumbBar>
    <PageHeader.Content
      title="Virtual-Machine-DAL-really-long-title-example-that-goes-at-least-2-lines-long"
      renderIcon={BeeIcon}
      {...args}
    >
      <PageHeader.ContentText subtitle="Subtitle">
        Built for modern teams, our technology platform simplifies complexity
        with powerful APIs, real-time collaboration tools, and seamless
        integration. From deployment to monitoring, we help you ship faster,
        scale efficiently, and stay in control every step of the way.
      </PageHeader.ContentText>
    </PageHeader.Content>
  </PageHeader.Root>
);

export const ContentWithContextualActions = (args) => (
  <PageHeader.Root>
    <PageHeader.BreadcrumbBar
      renderIcon={BreadcrumbBeeIcon}
      pageActions={breadcrumbPageActions}
    >
      <Breadcrumb>
        <BreadcrumbItem href="/#">Breadcrumb 1</BreadcrumbItem>
        <BreadcrumbItem href="#">Breadcrumb 2</BreadcrumbItem>
      </Breadcrumb>
    </PageHeader.BreadcrumbBar>
    <PageHeader.Content
      title="Virtual-Machine-DAL-really-long-title-example-that-goes-at-least-2-lines-long"
      contextualActions={
        <>
          <Tag className="tag" type="blue" size="lg">
            Tag
          </Tag>
        </>
      }
      {...args}
    >
      <PageHeader.ContentText subtitle="Subtitle">
        Built for modern teams, our technology platform simplifies complexity
        with powerful APIs, real-time collaboration tools, and seamless
        integration. From deployment to monitoring, we help you ship faster,
        scale efficiently, and stay in control every step of the way.
      </PageHeader.ContentText>
    </PageHeader.Content>
  </PageHeader.Root>
);

export const ContentWithHeroImage = (args) => (
  <PageHeader.Root>
    <Grid>
      <Column lg={8} md={4} sm={4}>
        <PageHeader.BreadcrumbBar border={false} renderIcon={BreadcrumbBeeIcon}>
          <Breadcrumb>
            <BreadcrumbItem>
              <a href="/#">Breadcrumb 1</a>
            </BreadcrumbItem>
            <BreadcrumbItem href="#">Breadcrumb 2</BreadcrumbItem>
          </Breadcrumb>
        </PageHeader.BreadcrumbBar>
        <PageHeader.Content
          title="Virtual-Machine-DAL-really-long-title-example-that-goes-at-least-2-lines-long"
          {...args}
        >
          <PageHeader.ContentText subtitle="Subtitle">
            Built for modern teams, our technology platform simplifies
            complexity with powerful APIs, real-time collaboration tools, and
            seamless integration. From deployment to monitoring, we help you
            ship faster, scale efficiently, and stay in control every step of
            the way.
          </PageHeader.ContentText>
        </PageHeader.Content>
      </Column>
      <Column lg={8} md={4} sm={0}>
        <PageHeader.HeroImage objectFit="cover">
          <picture>
            <source
              srcset={image1}
              media={`(min-width: ${breakpoints.lg.width})`}
            />
            <source
              srcset={image2}
              media={`(max-width: ${breakpoints.lg.width})`}
            />
            <img src={image1} alt="a default image" />
          </picture>
        </PageHeader.HeroImage>
      </Column>
    </Grid>
  </PageHeader.Root>
);

export const ContentWithContextualActionsAndPageActions = (args) => (
  <PageHeader.Root>
    <PageHeader.BreadcrumbBar
      renderIcon={BreadcrumbBeeIcon}
      pageActions={breadcrumbPageActions}
    >
      <Breadcrumb>
        <BreadcrumbItem href="/#">Breadcrumb 1</BreadcrumbItem>
        <BreadcrumbItem href="#">Breadcrumb 2</BreadcrumbItem>
      </Breadcrumb>
    </PageHeader.BreadcrumbBar>
    <PageHeader.Content
      title="Virtual-Machine-DAL-really-long-title-example-that-goes-at-least-2-lines-long"
      contextualActions={
        <>
          <Tag className="tag" type="blue" size="lg">
            Tag
          </Tag>
        </>
      }
      pageActions={
        <PageHeader.ContentPageActions
          menuButtonLabel="Actions"
          actions={pageActionButtonItems}
        ></PageHeader.ContentPageActions>
      }
      {...args}
    >
      <PageHeader.ContentText subtitle="Subtitle">
        Built for modern teams, our technology platform simplifies complexity
        with powerful APIs, real-time collaboration tools, and seamless
        integration. From deployment to monitoring, we help you ship faster,
        scale efficiently, and stay in control every step of the way.
      </PageHeader.ContentText>
    </PageHeader.Content>
  </PageHeader.Root>
);

const tabBarTags = [
  <Tag type="blue" id="example-tag-1" key="example-tag-1">
    Tag 1
  </Tag>,
  <Tag type="purple" id="example-tag-2" key="example-tag-2">
    Tag 2
  </Tag>,
  <Tag type="red" id="example-tag-3" key="example-tag-3">
    Tag 3
  </Tag>,
  <OperationalTag
    type="blue"
    id="example-tag-4"
    key="example-tag-4"
    text="Tag 4"
  />,
  <Tag type="purple" id="example-tag-5" key="example-tag-5">
    Tag 5
  </Tag>,
  <Tag type="red" id="example-tag-6" key="example-tag-6">
    Tag 6
  </Tag>,
];
const renderUIShellHeader = () => (
  <HeaderContainer
    render={() => (
      <Header aria-label="Header">
        <HeaderName href="/">Application header</HeaderName>
      </Header>
    )}
  />
);

export const TabBarWithTabsAndTags = (args) => (
  <>
    {renderUIShellHeader()}

    <div className="page-header-story__wrapper">
      <Tabs>
        <PageHeader.Root>
          <PageHeader.BreadcrumbBar
            border={args.border}
            pageActionsFlush={args.pageActionsFlush}
            contentActionsFlush={args.contentActionsFlush}
            renderIcon={args.renderBreadcrumbIcon ? BreadcrumbBeeIcon : null}
            pageActions={breadcrumbPageActions}
            contentActions={
              <PageHeader.ContentPageActions
                menuButtonLabel="Actions"
                actions={pageActionButtonItems}
              />
            }
          >
            <PageHeader.BreadcrumbOverflow
              renderOverflowBreadcrumb={(hiddenItems) => (
                <BreadcrumbItem data-floating-menu-container>
                  <OverflowMenu
                    align="bottom"
                    aria-label="Overflow menu in a breadcrumb"
                  >
                    {hiddenItems.map((el) => (
                      <OverflowMenuItem itemText={el.innerText} />
                    ))}
                  </OverflowMenu>
                </BreadcrumbItem>
              )}
            >
              <BreadcrumbItem href="/#">Breadcrumb 1</BreadcrumbItem>
              <BreadcrumbItem href="/#">Breadcrumb 2</BreadcrumbItem>
              <BreadcrumbItem href="/#">Breadcrumb 3</BreadcrumbItem>
              <PageHeader.TitleBreadcrumb data-fixed>
                <TruncatedText
                  value="Virtual-Machine-DAL-really-long-title-example"
                  align="bottom"
                  lines={1}
                />
              </PageHeader.TitleBreadcrumb>
            </PageHeader.BreadcrumbOverflow>
          </PageHeader.BreadcrumbBar>
          <PageHeader.Content
            title="Virtual-Machine-DAL-really-long-title-example-that-goes-at-least-2-lines-long"
            pageActions={
              <PageHeader.ContentPageActions
                menuButtonLabel="Actions"
                actions={pageActionButtonItems}
              />
            }
            {...args}
          >
            <PageHeader.ContentText subtitle="Subtitle">
              Built for modern teams, our technology platform simplifies
              complexity with powerful APIs, real-time collaboration tools, and
              seamless integration. From deployment to monitoring, we help you
              ship faster, scale efficiently, and stay in control every step of
              the way.
            </PageHeader.ContentText>
          </PageHeader.Content>
          <PageHeader.TabBar
            tags={
              <PageHeader.TagOverflow
                renderOverflowTag={(
                  hiddenItems,
                  handleOverflowClick,
                  openPopover
                ) => (
                  <OperationalTag
                    onClick={handleOverflowClick}
                    aria-expanded={openPopover}
                    aria-label={`Show ${hiddenItems.length} more tags`}
                    text={`+${hiddenItems.length}`}
                  />
                )}
                renderPopoverContent={(hiddenItems) => {
                  return hiddenItems.map((i, index) => {
                    const foundJSXTag = tabBarTags.find(
                      (c) => c.props.id === i.id
                    );
                    return React.cloneElement(foundJSXTag, {
                      id: `cloned-tag-node-id-${index}`,
                      key: `cloned-tag-key-${index}`,
                    });
                  });
                }}
              >
                {tabBarTags}
              </PageHeader.TagOverflow>
            }
            scroller={<PageHeader.ScrollButton />}
          >
            <TabList>
              <Tab>Tab 1</Tab>
              <Tab>Tab 2</Tab>
              <Tab>Tab 3</Tab>
              <Tab>Tab 4</Tab>
              <Tab>Tab 5</Tab>
              <Tab>Tab 6</Tab>
              <Tab>Tab 7</Tab>
            </TabList>
          </PageHeader.TabBar>
        </PageHeader.Root>
        <TabPanels>
          <TabPanel className="page-header-story--tall-tab-panel">
            Tab Panel 1
          </TabPanel>
          <TabPanel className="page-header-story--tall-tab-panel">
            Tab Panel 2
          </TabPanel>
          <TabPanel className="page-header-story--tall-tab-panel">
            Tab Panel 3
          </TabPanel>
          <TabPanel className="page-header-story--tall-tab-panel">
            Tab Panel 4
          </TabPanel>
          <TabPanel className="page-header-story--tall-tab-panel">
            Tab Panel 5
          </TabPanel>
          <TabPanel className="page-header-story--tall-tab-panel">
            Tab Panel 6
          </TabPanel>
          <TabPanel className="page-header-story--tall-tab-panel">
            Tab Panel 7
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  </>
);

TabBarWithTabsAndTags.args = {
  border: true,
  pageActionsFlush: false,
  contentActionsFlush: false,
  title:
    'Virtual-Machine-DAL-really-long-title-example-that-goes-at-least-2-lines-long',
  renderBreadcrumbIcon: true,
};

export const Compact = (args) => (
  <Tabs>
    <PageHeader.Root>
      <PageHeader.BreadcrumbBar
        border={args.border}
        pageActionsFlush={args.pageActionsFlush}
        contentActionsFlush={args.contentActionsFlush}
        renderIcon={args.renderBreadcrumbIcon ? BreadcrumbBeeIcon : null}
        pageActions={breadcrumbPageActions}
        contentActions={
          <PageHeader.ContentPageActions
            menuButtonLabel="Actions"
            actions={pageActionButtonItems}
          />
        }
      >
        <PageHeader.BreadcrumbOverflow
          renderOverflowBreadcrumb={(hiddenItems) => (
            <BreadcrumbItem data-floating-menu-container>
              <OverflowMenu
                align="bottom"
                aria-label="Overflow menu in a breadcrumb"
              >
                {hiddenItems.map((el) => (
                  <OverflowMenuItem itemText={el.innerText} />
                ))}
              </OverflowMenu>
            </BreadcrumbItem>
          )}
        >
          <BreadcrumbItem href="/#">Breadcrumb 1</BreadcrumbItem>
          <BreadcrumbItem href="/#">Breadcrumb 2</BreadcrumbItem>
          <BreadcrumbItem href="/#">Breadcrumb 3</BreadcrumbItem>
          <PageHeader.TitleBreadcrumb data-fixed>
            <TruncatedText
              value="Virtual-Machine-DAL-really-long-title-example"
              align="bottom"
              lines={1}
            />
          </PageHeader.TitleBreadcrumb>
        </PageHeader.BreadcrumbOverflow>
      </PageHeader.BreadcrumbBar>
      <PageHeader.TabBar
        tags={
          <PageHeader.TagOverflow
            renderOverflowTag={(
              hiddenItems,
              handleOverflowClick,
              openPopover
            ) => (
              <OperationalTag
                onClick={handleOverflowClick}
                aria-expanded={openPopover}
                aria-label={`Show ${hiddenItems.length} more tags`}
                text={`+${hiddenItems.length}`}
              />
            )}
            renderPopoverContent={(hiddenItems) => {
              return hiddenItems.map((i, index) => {
                const foundJSXTag = tabBarTags.find((c) => c.props.id === i.id);
                return React.cloneElement(foundJSXTag, {
                  id: `cloned-tag-node-id-${index}`,
                  key: `cloned-tag-key-${index}`,
                });
              });
            }}
          >
            {tabBarTags}
          </PageHeader.TagOverflow>
        }
      >
        <TabList>
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
          <Tab>Tab 3</Tab>
          <Tab>Tab 4</Tab>
          <Tab>Tab 5</Tab>
          <Tab>Tab 6</Tab>
          <Tab>Tab 7</Tab>
        </TabList>
      </PageHeader.TabBar>
    </PageHeader.Root>
    <TabPanels>
      <TabPanel className="page-header-story--tall-tab-panel">
        Tab Panel 1
      </TabPanel>
      <TabPanel className="page-header-story--tall-tab-panel">
        Tab Panel 2
      </TabPanel>
      <TabPanel className="page-header-story--tall-tab-panel">
        Tab Panel 3
      </TabPanel>
      <TabPanel className="page-header-story--tall-tab-panel">
        Tab Panel 4
      </TabPanel>
      <TabPanel className="page-header-story--tall-tab-panel">
        Tab Panel 5
      </TabPanel>
      <TabPanel className="page-header-story--tall-tab-panel">
        Tab Panel 6
      </TabPanel>
      <TabPanel className="page-header-story--tall-tab-panel">
        Tab Panel 7
      </TabPanel>
    </TabPanels>
  </Tabs>
);

export const CustomRenderWithCallbacks = (args) => {
  const {
    border,
    pageActionsFlush,
    contentActionsFlush,
    renderBreadcrumbIcon,
    title,
    ...rootArgs
  } = args;

  const handleContentFullyCollapsed = useCallback((collapsed) => {
    console.log('onContentFullyCollapsed:', collapsed);
  }, []);

  const handleTitleClipped = useCallback((clipped) => {
    console.log('onTitleClipped:', clipped);
  }, []);

  const handleContentActionsClipped = useCallback((clipped) => {
    console.log('onContentActionsClipped:', clipped);
  }, []);

  return (
    <Tabs>
      <PageHeader.Root
        {...rootArgs}
        onContentFullyCollapsed={handleContentFullyCollapsed}
        onTitleClipped={handleTitleClipped}
        onContentActionsClipped={handleContentActionsClipped}
      >
        <PageHeader.BreadcrumbBar
          border={border}
          contentActionsFlush={contentActionsFlush}
          renderIcon={renderBreadcrumbIcon ? BreadcrumbBeeIcon : null}
          contentActions={({ contentActionsClipped }) =>
            contentActionsClipped ? (
              <PageHeader.ContentPageActions
                menuButtonLabel="Actions"
                actions={pageActionButtonItems}
              />
            ) : null
          }
          pageActions={breadcrumbPageActions}
        >
          <Breadcrumb>
            <BreadcrumbItem href="/#">Breadcrumb 1</BreadcrumbItem>
            <BreadcrumbItem href="#">Breadcrumb 2</BreadcrumbItem>
          </Breadcrumb>
        </PageHeader.BreadcrumbBar>
        <PageHeader.Content
          title={title}
          pageActions={({ fullyCollapsed }) =>
            !fullyCollapsed ? (
              <PageHeader.ContentPageActions
                menuButtonLabel="Actions"
                actions={pageActionButtonItems}
              />
            ) : null
          }
        >
          <PageHeader.ContentText subtitle="Subtitle">
            Built for modern teams, our technology platform simplifies
            complexity with powerful APIs, real-time collaboration tools, and
            seamless integration. From deployment to monitoring, we help you
            ship faster, scale efficiently, and stay in control every step of
            the way.
          </PageHeader.ContentText>
        </PageHeader.Content>
        <PageHeader.TabBar>
          <TabList>
            <Tab>Tab 1</Tab>
            <Tab>Tab 2</Tab>
            <Tab>Tab 3</Tab>
            <Tab>Tab 4</Tab>
            <Tab>Tab 5</Tab>
            <Tab>Tab 6</Tab>
            <Tab>Tab 7</Tab>
          </TabList>
        </PageHeader.TabBar>
      </PageHeader.Root>
      <TabPanels>
        <TabPanel className="page-header-story--tall-tab-panel">
          Tab Panel 1
        </TabPanel>
        <TabPanel className="page-header-story--tall-tab-panel">
          Tab Panel 2
        </TabPanel>
        <TabPanel className="page-header-story--tall-tab-panel">
          Tab Panel 3
        </TabPanel>
        <TabPanel className="page-header-story--tall-tab-panel">
          Tab Panel 4
        </TabPanel>
        <TabPanel className="page-header-story--tall-tab-panel">
          Tab Panel 5
        </TabPanel>
        <TabPanel className="page-header-story--tall-tab-panel">
          Tab Panel 6
        </TabPanel>
        <TabPanel className="page-header-story--tall-tab-panel">
          Tab Panel 7
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

CustomRenderWithCallbacks.args = {
  border: true,
  contentActionsFlush: false,
  title:
    'Virtual-Machine-DAL-really-long-title-example-that-goes-at-least-2-lines-long',
  renderBreadcrumbIcon: true,
};

CustomRenderWithCallbacks.argTypes = {
  border: {
    description: 'Specify whether to render BreadcrumbBar border',
    control: {
      type: 'boolean',
    },
  },
  contentActionsFlush: {
    description:
      'Specify whether the content actions within BreadcrumbBar should be flush with the page actions',
    control: {
      type: 'boolean',
    },
  },
  title: {
    description:
      'Provide the title text to be rendered within  PageHeaderContent',
    control: {
      type: 'text',
    },
  },
  renderBreadcrumbIcon: {
    description:
      'Specify whether to render the BreadcrumbBar icon (storybook control only)',
    control: {
      type: 'boolean',
    },
  },
};

export const WithDisabledStickyTabBar = ({
  border,
  pageActionsFlush,
  contentActionsFlush,
  renderBreadcrumbIcon,
  title,
  ...args
}) => (
  <Tabs>
    <PageHeader.Root {...args}>
      <PageHeader.BreadcrumbBar
        border={border}
        pageActionsFlush={pageActionsFlush}
        contentActionsFlush={contentActionsFlush}
        renderIcon={renderBreadcrumbIcon ? BreadcrumbBeeIcon : null}
        contentActions={
          <PageHeader.ContentPageActions
            menuButtonLabel="Actions"
            actions={pageActionButtonItems}
          />
        }
        pageActions={breadcrumbPageActions}
      >
        <PageHeader.BreadcrumbOverflow
          renderOverflowBreadcrumb={(hiddenItems) => (
            <BreadcrumbItem data-floating-menu-container>
              <OverflowMenu
                align="bottom"
                aria-label="Overflow menu in a breadcrumb"
              >
                {hiddenItems.map((el) => (
                  <OverflowMenuItem itemText={el.innerText} />
                ))}
              </OverflowMenu>
            </BreadcrumbItem>
          )}
        >
          <BreadcrumbItem href="/#">Breadcrumb 1</BreadcrumbItem>
          <BreadcrumbItem href="/#">Breadcrumb 2</BreadcrumbItem>
          <BreadcrumbItem href="/#">Breadcrumb 3</BreadcrumbItem>
          <PageHeader.TitleBreadcrumb data-fixed>
            {title}
          </PageHeader.TitleBreadcrumb>
        </PageHeader.BreadcrumbOverflow>
      </PageHeader.BreadcrumbBar>
      <PageHeader.Content
        title={title}
        pageActions={
          <PageHeader.ContentPageActions
            menuButtonLabel="Actions"
            actions={pageActionButtonItems}
          />
        }
      >
        <PageHeader.ContentText subtitle="Subtitle">
          Built for modern teams, our technology platform simplifies complexity
          with powerful APIs, real-time collaboration tools, and seamless
          integration. From deployment to monitoring, we help you ship faster,
          scale efficiently, and stay in control every step of the way.
        </PageHeader.ContentText>
      </PageHeader.Content>
      <PageHeader.TabBar disableStickyTabBar>
        <TabList>
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
          <Tab>Tab 3</Tab>
          <Tab>Tab 4</Tab>
          <Tab>Tab 5</Tab>
          <Tab>Tab 6</Tab>
          <Tab>Tab 7</Tab>
        </TabList>
      </PageHeader.TabBar>
    </PageHeader.Root>
    <TabPanels>
      <TabPanel className="page-header-story--tall-tab-panel">
        Tab Panel 1
      </TabPanel>
      <TabPanel className="page-header-story--tall-tab-panel">
        Tab Panel 2
      </TabPanel>
      <TabPanel className="page-header-story--tall-tab-panel">
        Tab Panel 3
      </TabPanel>
      <TabPanel className="page-header-story--tall-tab-panel">
        Tab Panel 4
      </TabPanel>
      <TabPanel className="page-header-story--tall-tab-panel">
        Tab Panel 5
      </TabPanel>
      <TabPanel className="page-header-story--tall-tab-panel">
        Tab Panel 6
      </TabPanel>
      <TabPanel className="page-header-story--tall-tab-panel">
        Tab Panel 7
      </TabPanel>
    </TabPanels>
  </Tabs>
);

WithDisabledStickyTabBar.args = {
  border: true,
  pageActionsFlush: false,
  contentActionsFlush: false,
  title:
    'Virtual-Machine-DAL-really-long-title-example-that-goes-at-least-2-lines-long',
  renderBreadcrumbIcon: true,
};

WithDisabledStickyTabBar.argTypes = {
  border: {
    description: 'Specify whether to render BreadcrumbBar border',
    control: {
      type: 'boolean',
    },
  },
  pageActionsFlush: {
    description:
      'Specify whether the page actions within BreadcrumbBar should be flush',
    control: {
      type: 'boolean',
    },
  },
  contentActionsFlush: {
    description:
      'Specify whether the content actions within BreadcrumbBar should be flush with the page actions',
    control: {
      type: 'boolean',
    },
  },
  title: {
    description:
      'Provide the title text to be rendered within PageHeaderContent',
    control: {
      type: 'text',
    },
  },
  renderBreadcrumbIcon: {
    description:
      'Specify whether to render the BreadcrumbBar icon (storybook control only)',
    control: {
      type: 'boolean',
    },
  },
};
