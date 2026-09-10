/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Card } from './Card';
import { Button } from '../Button';
import { IconButton } from '../IconButton';
import { Grid, Column } from '../Grid';
import { Tag } from '../Tag';
import { AILabel, AILabelContent } from '../AILabel';
import { IconIndicator } from '../IconIndicator';
import { UserAvatar } from '../UserAvatar';
import {
  Edit,
  TrashCan,
  Analytics,
  Favorite,
  Bee as BeeIcon,
  Share,
  Download,
  Settings,
  Notification,
  View,
  Copy,
  ArrowRight,
  Launch,
  DirectionFork,
  Time,
} from '@carbon/icons-react';
import illustration1 from './_story-assets/illustration-img-1.png';
import illustration16x9 from './_story-assets/illustration-16x9.png';
import illustration1x1 from './_story-assets/illustration-1x1.png';
import illustration2_16x9 from './_story-assets/illustration-2-16x9.png';
import illustration2_1x1 from './_story-assets/illustration-2-1x1.png';
import rebusClassic from './_story-assets/classic-rebus.png';
import './card-story.scss';
import mdx from './Card.mdx';

const storyClass = 'card-story';

export default {
  title: 'Preview/preview__Card',
  component: Card,
  subcomponents: {
    CardHeader: Card.Header,
    CardBody: Card.Body,
    CardFooter: Card.Footer,
    CardHeaderMedia: Card.HeaderMedia,
    CardMedia: Card.Media,
    CardTitle: Card.Title,
    CardTitleMedia: Card.TitleMedia,
    CardActions: Card.Actions,
    CardAction: Card.Action,
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className={`${storyClass}__viewport`}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    renderFooterIcon: {
      control: { type: 'select' },
      options: ['ArrowRight', 'Launch', 'Share', 'Download'],
      description:
        'Icon rendered in the clickable-card footer affordance. Only has effect when `clickable` is true. Defaults to `ArrowRight`.',
    },
    density: {
      control: { type: 'select' },
      options: ['productive', 'expressive'],
      description:
        'Density variant: productive uses heading-compact-02, expressive uses heading-03',
    },
    clickable: {
      control: { type: 'boolean' },
      description: 'Makes the entire card clickable',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disables the card and all interactive elements',
    },
    horizontal: {
      control: { type: 'boolean' },
      description:
        'Horizontal layout: media on the left, content stacked on the right',
    },
    label: {
      control: { type: 'text' },
      description: 'Optional label rendered above the title (Card.Title)',
    },
    title: {
      control: { type: 'text' },
      description: 'Title text (Card.Title children)',
    },
    description: {
      control: { type: 'text' },
      description: 'Optional description rendered below the title (Card.Title)',
    },
    bodyText: {
      control: { type: 'text' },
      description: 'Body copy (Card.Body children)',
    },
    actionCount: {
      control: { type: 'number', min: 0, max: 8 },
      description:
        'Number of icon actions to show in the header (0–8). Rendered as IconButtons inside Card.Actions; overflow collapses into a menu.',
    },
    footerActions: {
      control: { type: 'select' },
      options: ['none', 'ghost-button', 'ghost-button-icons', 'icons-only'],
      description:
        'Footer action combination. "ghost-button" — single text action. "ghost-button-icons" — text action with icon secondaries. "icons-only" — icon buttons only. Has no effect when `clickable` is true.',
    },
    mediaRatio: {
      control: { type: 'select' },
      options: [
        'none',
        '16x9',
        '9x16',
        '2x1',
        '1x2',
        '4x3',
        '3x4',
        '3x2',
        '2x3',
        '1x1',
      ],
      description:
        'Aspect ratio of the card media slot. "none" hides the media slot.',
    },
    mediaContent: {
      control: { type: 'select' },
      options: ['image', 'video'],
      description:
        'Content rendered inside the media slot. "video" embeds a YouTube iframe. Has no effect when mediaRatio is "none".',
    },
    showAILabel: {
      control: { type: 'boolean' },
      description: 'Attach an AI label decorator to the card.',
    },
    headerMedia: {
      control: { type: 'select' },
      options: ['none', 'icon', 'tag', 'user-avatar', 'status-indicator'],
      description:
        'Content shown in the Card.HeaderMedia slot above the title row.',
    },
    titleMedia: {
      control: { type: 'select' },
      options: ['none', 'image'],
      description:
        'Content shown in the Card.TitleMedia slot to the left of the title.',
    },
    titleLeadingIcon: {
      control: { type: 'boolean' },
      description: 'Show a leading icon inside the title text row.',
    },
    titleTrailingIcon: {
      control: { type: 'boolean' },
      description: 'Show a trailing icon inside the title text row.',
    },
  },
  args: {
    density: 'productive',
    clickable: false,
    disabled: false,
    horizontal: false,
    label: 'Example',
    title: 'Card title',
    description: '',
    bodyText: 'Last updated 2 hours ago.',
    actionCount: 0,
    footerActions: 'none',
    mediaRatio: '16x9',
    mediaContent: 'image',
    showAILabel: false,
    headerMedia: 'none',
    titleMedia: 'none',
    titleLeadingIcon: false,
    titleTrailingIcon: false,
    renderFooterIcon: 'ArrowRight',
  },
};

const FOOTER_ICON_MAP = {
  ArrowRight,
  Launch,
  Share,
  Download,
};

const ACTION_ICONS = [
  { icon: Edit, label: 'Edit' },
  { icon: Download, label: 'Download' },
  { icon: Settings, label: 'Settings' },
  { icon: TrashCan, label: 'Delete' },
  { icon: Share, label: 'Share' },
  { icon: Favorite, label: 'Favorite' },
  { icon: Copy, label: 'Copy' },
  { icon: View, label: 'View' },
];

// Maps the headerMedia control value to a concrete React element.
const HEADER_MEDIA_MAP = {
  none: null,
  icon: <Analytics size={32} />,
  tag: <Tag type="blue">New</Tag>,
  'user-avatar': <UserAvatar name="Thomas J. Watson" size="md" />,
  'status-indicator': (
    <IconIndicator kind="succeeded" size={16} label="Succeeded" />
  ),
};

// Maps the titleMedia control value to a concrete React element.
const TITLE_MEDIA_MAP = {
  none: null,
  image: (
    <img
      src={rebusClassic}
      alt="IBM Classic Rebus logo"
      width={48}
      height={48}
    />
  ),
};

// Renders the footer action combination selected via the footerActions control.
// Not used when the card is clickable (clickable cards render their own footer).
const renderFooterActions = (footerActions) => {
  if (footerActions === 'none') return null;
  return (
    <Card.Footer>
      {(footerActions === 'ghost-button' ||
        footerActions === 'ghost-button-icons') && (
        <Card.Action>
          <Button kind="ghost" size="md">
            View details
          </Button>
        </Card.Action>
      )}
      {(footerActions === 'ghost-button-icons' ||
        footerActions === 'icons-only') && (
        <>
          <Card.Action>
            <IconButton label="Share" kind="ghost" size="md">
              <Share />
            </IconButton>
          </Card.Action>
          <Card.Action>
            <IconButton label="Download" kind="ghost" size="md">
              <Download />
            </IconButton>
          </Card.Action>
        </>
      )}
    </Card.Footer>
  );
};

export const Default = {
  render: ({
    label,
    title,
    description,
    bodyText,
    titleTruncate = false,
    actionCount,
    footerActions,
    mediaRatio,
    mediaContent,
    showAILabel,
    headerMedia,
    titleMedia,
    titleLeadingIcon,
    titleTrailingIcon,
    renderFooterIcon,
    ...cardArgs
  }) => (
    <Grid>
      <Column lg={4} md={4} sm={4}>
        <Card
          {...cardArgs}
          {...(cardArgs.clickable && {
            renderFooterIcon: FOOTER_ICON_MAP[renderFooterIcon],
          })}
          {...(showAILabel && {
            decorator: (
              <AILabel align="bottom" size="xs">
                <AILabelContent>
                  <div>
                    <p className="secondary">AI Explained</p>
                    <h1>84%</h1>
                    <p className="secondary bold">Confidence score</p>
                    <p className="secondary">
                      This content was generated using IBM AI services.
                    </p>
                    <hr />
                    <p className="secondary">Model type</p>
                    <p className="bold">Foundation model</p>
                  </div>
                </AILabelContent>
              </AILabel>
            ),
          })}>
          {mediaRatio !== 'none' && (
            <Card.Media ratio={mediaRatio}>
              {mediaContent === 'video' ? (
                <iframe
                  width="100%"
                  height="100%"
                  style={{ position: 'absolute' }}
                  src="https://www.youtube.com/embed/Veg7njIKUm4?si=B9yWeUzcFHI4ITD1&controls=0"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              ) : (
                <img src={illustration1x1} alt="" width="100%" />
              )}
            </Card.Media>
          )}
          <Card.Header>
            {HEADER_MEDIA_MAP[headerMedia] && (
              <Card.HeaderMedia>
                {HEADER_MEDIA_MAP[headerMedia]}
              </Card.HeaderMedia>
            )}
            {TITLE_MEDIA_MAP[titleMedia] && (
              <Card.TitleMedia>{TITLE_MEDIA_MAP[titleMedia]}</Card.TitleMedia>
            )}
            <Card.Title
              label={label || undefined}
              description={description || undefined}
              titleTruncate={titleTruncate}
              {...(titleLeadingIcon && { titleStart: <BeeIcon size={16} /> })}
              {...(titleTrailingIcon && { titleEnd: <BeeIcon size={16} /> })}>
              {title}
            </Card.Title>
            {actionCount > 0 && (
              <Card.Actions>
                {ACTION_ICONS.slice(0, actionCount).map(
                  ({ icon: Icon, label: iconLabel }) => (
                    <Card.Action key={iconLabel}>
                      <IconButton label={iconLabel} kind="ghost" size="sm">
                        <Icon />
                      </IconButton>
                    </Card.Action>
                  )
                )}
              </Card.Actions>
            )}
          </Card.Header>
          <Card.Body>{bodyText}</Card.Body>
          {!cardArgs.clickable && renderFooterActions(footerActions)}
        </Card>
      </Column>
    </Grid>
  ),
};

const readonlyArgTypes = {
  renderFooterIcon: { control: false },
  density: { control: false },
  clickable: { control: false },
  disabled: { control: false },
  horizontal: { control: false },
  label: { control: false },
  title: { control: false },
  description: { control: false },
  bodyText: { control: false },
  actionCount: { control: false },
  footerActions: { control: false },
  mediaRatio: { control: false },
  mediaContent: { control: false },
  showAILabel: { control: false },
  headerMedia: { control: false },
  titleMedia: { control: false },
  titleLeadingIcon: { control: false },
  titleTrailingIcon: { control: false },
};

export const Clickable = () => (
  <Grid withRowGap>
    {/* Action card — onClick handler */}
    <Column lg={4} md={4} sm={4}>
      <Card
        clickable
        onClick={() => alert('Card clicked')}
        aria-labelledby="clickable-title-usage">
        <Card.Media ratio="16x9">
          <img src={illustration16x9} alt="" width="100%" />
        </Card.Media>
        <Card.Header>
          <Card.Title id="clickable-title-usage" label="Analytics">
            Usage report
          </Card.Title>
        </Card.Header>
        <Card.Body>Monthly summary across all active projects.</Card.Body>
      </Card>
    </Column>

    {/* Navigation card — as="a" with href */}
    <Column lg={4} md={4} sm={4}>
      <Card
        clickable
        as="a"
        href="https://carbondesignsystem.com"
        target="_blank"
        aria-labelledby="clickable-title-carbon">
        <Card.Media ratio="16x9">
          <img src={illustration2_16x9} alt="" width="100%" />
        </Card.Media>
        <Card.Header>
          <Card.Title id="clickable-title-carbon" label="External link">
            Carbon Design System
          </Card.Title>
        </Card.Header>
        <Card.Body>Read about tokens, components, and patterns.</Card.Body>
      </Card>
    </Column>

    {/* Custom icon override */}
    <Column lg={4} md={4} sm={4}>
      <Card
        clickable
        onClick={() => alert('Launch clicked')}
        renderFooterIcon={Share}
        aria-labelledby="clickable-title-share">
        <Card.Header>
          <Card.Title id="clickable-title-share" label="Share">
            Share report
          </Card.Title>
        </Card.Header>
        <Card.Body>Share this report with your team.</Card.Body>
      </Card>
    </Column>

    {/* Disabled clickable card */}
    <Column lg={4} md={4} sm={4}>
      <Card
        clickable
        disabled
        onClick={() => alert('Should not fire')}
        aria-labelledby="clickable-title-disabled">
        <Card.Header>
          <Card.Title id="clickable-title-disabled" label="Status">
            Disabled card
          </Card.Title>
        </Card.Header>
        <Card.Body>This card is not currently available.</Card.Body>
      </Card>
    </Column>

    {/* Expressive density */}
    <Column lg={4} md={4} sm={4}>
      <Card
        clickable
        density="expressive"
        onClick={() => alert('Expressive card clicked')}
        aria-labelledby="clickable-title-launch">
        <Card.Media ratio="16x9">
          <img src={illustration16x9} alt="" width="100%" />
        </Card.Media>
        <Card.Header>
          <Card.Title id="clickable-title-launch" label="Featured">
            Product launch
          </Card.Title>
        </Card.Header>
        <Card.Body>Highlights from the Q3 product launch.</Card.Body>
      </Card>
    </Column>

    {/* Clickable card as anchor with custom density */}
    <Column lg={4} md={4} sm={4}>
      <Card
        clickable
        density="expressive"
        as="a"
        href="#"
        aria-labelledby="clickable-title-quarterly">
        <Card.Header>
          <Card.Title id="clickable-title-quarterly" label="Report">
            Quarterly review
          </Card.Title>
        </Card.Header>
        <Card.Body>Key findings and recommendations from Q3.</Card.Body>
      </Card>
    </Column>
  </Grid>
);

Clickable.argTypes = readonlyArgTypes;

export const Disabled = {
  render: ({
    density,
    disabled,
    label,
    title,
    description,
    bodyText,
    titleTruncate = false,
  }) => (
    <Grid withRowGap>
      <Column lg={4} md={4} sm={4}>
        <Card density={density} disabled={disabled}>
          <Card.Header>
            <Card.Title
              label={label || undefined}
              description={description || undefined}
              titleTruncate={titleTruncate}>
              {title}
            </Card.Title>
          </Card.Header>
          <Card.Body>{bodyText}</Card.Body>
          <Card.Footer>
            <Card.Action>
              <Button kind="ghost" size="md" disabled={disabled}>
                Action
              </Button>
            </Card.Action>
            <Card.Action>
              <IconButton
                label="Download"
                kind="ghost"
                size="md"
                disabled={disabled}>
                <Download />
              </IconButton>
            </Card.Action>
          </Card.Footer>
        </Card>
      </Column>
    </Grid>
  ),
  args: {
    disabled: true,
  },
  argTypes: (({
    density,
    disabled,
    label,
    title,
    description,
    bodyText,
    ...rest
  }) => rest)(readonlyArgTypes),
};

export const Minimal = {
  render: ({ density, clickable, disabled, horizontal, bodyText }) => (
    <Grid>
      <Column lg={4} md={4} sm={4}>
        <Card
          density={density}
          clickable={clickable}
          disabled={disabled}
          horizontal={horizontal}
          {...(clickable && { 'aria-label': 'Minimal card' })}>
          <Card.Body>{bodyText}</Card.Body>
        </Card>
      </Column>
    </Grid>
  ),
  args: {
    bodyText: 'Card body content.',
  },
  argTypes: {
    ...readonlyArgTypes,
    bodyText: { control: 'text' },
    clickable: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export const WithDensities = () => (
  <Grid withRowGap>
    <Column lg={4} md={4} sm={4}>
      <Card>
        <Card.Header>
          <Card.Title label="Category" description="Card description">
            Card title
          </Card.Title>
        </Card.Header>
        <Card.Body>5,240 active users across 12 regions.</Card.Body>
        <Card.Footer>
          <Card.Action>
            <Button kind="ghost" size="md">
              View details
            </Button>
          </Card.Action>
        </Card.Footer>
      </Card>
    </Column>
    <Column lg={4} md={4} sm={4}>
      <Card density="expressive">
        <Card.Header>
          <Card.Title label="Category" description="Card description">
            Card title
          </Card.Title>
        </Card.Header>
        <Card.Body>5,240 active users across 12 regions.</Card.Body>
        <Card.Footer>
          <Card.Action>
            <Button kind="ghost" size="md">
              View details
            </Button>
          </Card.Action>
        </Card.Footer>
      </Card>
    </Column>
  </Grid>
);

WithDensities.argTypes = readonlyArgTypes;

export const WithAILabel = () => (
  <Grid withRowGap>
    <Column lg={4} md={4} sm={4}>
      <Card
        decorator={
          <AILabel align="bottom" size="xs">
            <AILabelContent>
              <div>
                <p className="secondary">AI Explained</p>
                <h1>84%</h1>
                <p className="secondary bold">Confidence score</p>
                <p className="secondary">
                  This content was generated using IBM AI services with high
                  confidence based on historical data patterns.
                </p>
                <hr />
                <p className="secondary">Model type</p>
                <p className="bold">Foundation model</p>
              </div>
            </AILabelContent>
          </AILabel>
        }>
        <Card.Header>
          <Card.Title label="AI-powered" description="Generated by AI">
            Usage Analytics
          </Card.Title>
        </Card.Header>
        <Card.Body>4,812 active users — 9% above forecast.</Card.Body>
      </Card>
    </Column>
    <Column lg={4} md={4} sm={4}>
      <Card
        decorator={
          <AILabel align="bottom" size="xs">
            <AILabelContent>
              <div>
                <p className="secondary">AI Explained</p>
                <h1>92%</h1>
                <p className="secondary bold">Confidence score</p>
                <p className="secondary">
                  Performance insights generated by AI analysis of system
                  metrics and user behavior patterns.
                </p>
                <hr />
                <p className="secondary">Model type</p>
                <p className="bold">Analytics model</p>
              </div>
            </AILabelContent>
          </AILabel>
        }>
        <Card.Header>
          <Card.HeaderMedia>
            <Analytics />
          </Card.HeaderMedia>
          <Card.Title description="AI-generated summary">
            Performance Insights
          </Card.Title>
        </Card.Header>
        <Card.Body>
          CPU utilization averaged 62% over the last 7 days.
        </Card.Body>
      </Card>
    </Column>
    <Column lg={4} md={4} sm={4}>
      <Card
        decorator={
          <AILabel align="bottom" size="xs">
            <AILabelContent>
              <div>
                <p className="secondary">AI Explained</p>
                <h1>88%</h1>
                <p className="secondary bold">Confidence score</p>
                <p className="secondary">
                  Smart recommendations powered by AI learning from user
                  preferences and behavior.
                </p>
                <hr />
                <p className="secondary">Model type</p>
                <p className="bold">Recommendation engine</p>
              </div>
            </AILabelContent>
          </AILabel>
        }>
        <Card.Header>
          <Card.Title>Smart Recommendations</Card.Title>
          <Card.Actions>
            <Card.Action>
              <IconButton
                label="Edit"
                kind="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log('Edit clicked');
                }}>
                <Edit />
              </IconButton>
            </Card.Action>
            <Card.Action>
              <IconButton
                label="Delete"
                kind="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log('Delete clicked');
                }}>
                <TrashCan />
              </IconButton>
            </Card.Action>
          </Card.Actions>
        </Card.Header>
        <Card.Body>3 products match your recent activity.</Card.Body>
        <Card.Footer>
          <Button size="sm" kind="tertiary">
            View Details
          </Button>
        </Card.Footer>
      </Card>
    </Column>
  </Grid>
);

WithAILabel.argTypes = readonlyArgTypes;

export const WithFlushBody = () => (
  <Grid withRowGap>
    {/* Default — 16px padding */}
    <Column lg={4} md={4} sm={4}>
      <Card>
        <Card.Header>
          <Card.Title>Default body</Card.Title>
        </Card.Header>
        <Card.Body>
          <div
            style={{
              background: 'var(--cds-highlight)',
              border: '1px dashed var(--cds-link-primary)',
              padding: '1rem',
            }}>
            Body with default padding
          </div>
        </Card.Body>
      </Card>
    </Column>

    {/* isFlush — 0px padding */}
    <Column lg={4} md={4} sm={4}>
      <Card>
        <Card.Header>
          <Card.Title>Flush body</Card.Title>
        </Card.Header>
        <Card.Body isFlush>
          <div
            style={{
              background: 'var(--cds-highlight)',
              border: '1px dashed var(--cds-link-primary)',
              padding: '1rem',
            }}>
            Body flush to card edges
          </div>
        </Card.Body>
      </Card>
    </Column>
  </Grid>
);

WithFlushBody.argTypes = readonlyArgTypes;

export const WithHeaderActions = () => (
  <Grid withRowGap>
    <Column lg={4} md={4} sm={4}>
      <Card onClick={() => console.log('Card clicked')}>
        <Card.Header>
          <Card.Title label="Project" description="Due in 3 days">
            Website Redesign
          </Card.Title>
          <Card.Actions>
            <Card.Action>
              <IconButton
                label="Edit"
                kind="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log('Edit clicked');
                }}>
                <Edit />
              </IconButton>
            </Card.Action>
            <Card.Action>
              <IconButton
                label="Delete"
                kind="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log('Delete clicked');
                }}>
                <TrashCan />
              </IconButton>
            </Card.Action>
          </Card.Actions>
        </Card.Header>
        <Card.Body>
          Deployment pipeline ran successfully across all regions.
        </Card.Body>
        <Card.Footer>
          <Card.Action>
            <Button kind="ghost" size="md">
              View report
            </Button>
          </Card.Action>
          <Card.Action>
            <IconButton label="Share" kind="ghost" size="md">
              <Share />
            </IconButton>
          </Card.Action>
          <Card.Action>
            <IconButton label="Download" kind="ghost" size="md">
              <Download />
            </IconButton>
          </Card.Action>
        </Card.Footer>
      </Card>
    </Column>
    <Column lg={4} md={4} sm={4}>
      <Card>
        <Card.Header>
          <Card.Title label="Category" description="2 hours ago">
            Project dashboard
          </Card.Title>
          <Card.Actions>
            <Card.Action>
              <IconButton kind="ghost" label="Edit" size="sm">
                <Edit />
              </IconButton>
            </Card.Action>
            <Card.Action>
              <IconButton kind="ghost" label="Favorite" size="sm">
                <Favorite />
              </IconButton>
            </Card.Action>
            <Card.Action>
              <IconButton kind="ghost" label="Analytics" size="sm">
                <Analytics />
              </IconButton>
            </Card.Action>
            <Card.Action>
              <IconButton kind="ghost" label="Share" size="sm">
                <Share />
              </IconButton>
            </Card.Action>
            <Card.Action>
              <IconButton kind="ghost" label="Download" size="sm">
                <Download />
              </IconButton>
            </Card.Action>
            <Card.Action>
              <IconButton kind="ghost" label="Settings" size="sm">
                <Settings />
              </IconButton>
            </Card.Action>
            <Card.Action>
              <IconButton kind="ghost" label="Notification" size="sm">
                <Notification />
              </IconButton>
            </Card.Action>
            <Card.Action>
              <IconButton kind="ghost" label="View" size="sm">
                <View />
              </IconButton>
            </Card.Action>
            <Card.Action>
              <IconButton kind="ghost" label="Copy" size="sm">
                <Copy />
              </IconButton>
            </Card.Action>
            <Card.Action>
              <IconButton kind="ghost" label="Delete" size="sm">
                <TrashCan />
              </IconButton>
            </Card.Action>
          </Card.Actions>
        </Card.Header>
        <Card.Body>Last synced 4 minutes ago.</Card.Body>
      </Card>
    </Column>
    <Column lg={4} md={4} sm={4}>
      <Card>
        <Card.Header>
          <Card.Title>Usage metrics</Card.Title>
          <Card.Actions>
            <Card.Action>
              <Button kind="tertiary" size="sm">
                Action
              </Button>
            </Card.Action>
          </Card.Actions>
        </Card.Header>
        <Card.Body>API requests peaked at 3.2k/s on Thursday.</Card.Body>
      </Card>
    </Column>
    <Column lg={4} md={4} sm={4}>
      <Card>
        <Card.Header>
          <Card.Title>Usage metrics</Card.Title>
          <Card.Actions>
            <Card.Action>
              <Button kind="tertiary" size="sm">
                Export
              </Button>
            </Card.Action>
            <Card.Action>
              <Button kind="tertiary" size="sm">
                Share
              </Button>
            </Card.Action>
            <Card.Action>
              <Button kind="tertiary" size="sm">
                View report
              </Button>
            </Card.Action>
          </Card.Actions>
        </Card.Header>
        <Card.Body>Exports available in CSV, JSON, and PDF.</Card.Body>
      </Card>
    </Column>
    <Column lg={4} md={4} sm={4}>
      <Card>
        <Card.Header>
          <Card.Title
            label="Category"
            labelTruncate
            description="Automated daily pipeline run across three regions — results available for review"
            descriptionTruncate
            titleTruncate={2}>
            This is a very long card title that wraps across multiple lines in a
            narrow container
          </Card.Title>
          <Card.Actions>
            <Card.Action>
              <IconButton kind="ghost" label="Edit" size="sm">
                <Edit />
              </IconButton>
            </Card.Action>
            <Card.Action>
              <IconButton kind="ghost" label="Favorite" size="sm">
                <Favorite />
              </IconButton>
            </Card.Action>
            <Card.Action>
              <IconButton kind="ghost" label="Share" size="sm">
                <Share />
              </IconButton>
            </Card.Action>
          </Card.Actions>
        </Card.Header>
        <Card.Body>Pipeline completed in 4m 12s with no warnings.</Card.Body>
      </Card>
    </Column>
  </Grid>
);

WithHeaderActions.argTypes = readonlyArgTypes;

export const WithHeaderMedia = () => (
  <Grid withRowGap>
    <Column lg={4} md={4} sm={4}>
      <Card>
        <Card.Header>
          <Card.HeaderMedia>
            <Analytics />
          </Card.HeaderMedia>
          <Card.Title description="Real-time metrics">
            Analytics Dashboard
          </Card.Title>
          <Card.Actions>
            <Card.Action>
              <IconButton
                label="Edit"
                kind="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log('Edit clicked');
                }}>
                <Edit />
              </IconButton>
            </Card.Action>
            <Card.Action>
              <IconButton
                label="Delete"
                kind="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log('Delete clicked');
                }}>
                <TrashCan />
              </IconButton>
            </Card.Action>
          </Card.Actions>
        </Card.Header>
        <Card.Body>Request volume up 12% compared to last week.</Card.Body>
      </Card>
    </Column>
    <Column lg={4} md={4} sm={4}>
      <Card>
        <Card.Header>
          <Card.HeaderMedia>
            <img
              src={illustration1}
              alt="A sample illustration"
              style={{ width: '48px', height: '48px', borderRadius: '4px' }}
            />
          </Card.HeaderMedia>
          <Card.Title>Card with Image</Card.Title>
        </Card.Header>
        <Card.Body>4 deployments completed this week.</Card.Body>
      </Card>
    </Column>
    <Column lg={4} md={4} sm={4}>
      <Card>
        <Card.Header>
          <Card.HeaderMedia>
            <Tag type="blue">New</Tag>
          </Card.HeaderMedia>
          <Card.Title>Card with Tag</Card.Title>
        </Card.Header>
        <Card.Body>Feature flag enabled for 10% of users.</Card.Body>
      </Card>
    </Column>
    <Column lg={4} md={4} sm={4}>
      <Card>
        <Card.Header>
          <Card.HeaderMedia>
            <IconIndicator kind="succeeded" size={16} label="Succeeded" />
          </Card.HeaderMedia>
          <Card.Title>Card with Status</Card.Title>
        </Card.Header>
        <Card.Body>All systems operational. No incidents reported.</Card.Body>
      </Card>
    </Column>
  </Grid>
);

WithHeaderMedia.argTypes = readonlyArgTypes;

export const WithHorizontalMedia = () => (
  <Grid withRowGap>
    <Column lg={8} md={4} sm={4}>
      <Card horizontal>
        <Card.Media>
          <img
            src={illustration1x1}
            alt="Placeholder"
            style={{ width: '100%', height: '100%' }}
          />
        </Card.Media>
        <Card.Header>
          <Card.Title label="Get started">
            Generate synthetic tabular data
          </Card.Title>
        </Card.Header>
        <Card.Body>Balanced dataset ready for model training.</Card.Body>
        <Card.Footer>
          <Button kind="tertiary" size="md" renderIcon={ArrowRight}>
            Start
          </Button>
        </Card.Footer>
      </Card>
    </Column>
    <Column lg={8} md={4} sm={4}>
      <Card horizontal>
        <Card.Media mediaWidth="50%">
          <img
            src={illustration2_16x9}
            alt="Placeholder"
            style={{ width: '100%', height: '100%' }}
          />
        </Card.Media>
        <Card.Header>
          <Card.Title>Custom media width</Card.Title>
        </Card.Header>
        <Card.Body>Revenue grew 18% year-over-year in this segment.</Card.Body>
        <Card.Footer>
          <Card.Action>
            <Button kind="ghost" size="md" renderIcon={ArrowRight}>
              Learn more
            </Button>
          </Card.Action>
        </Card.Footer>
      </Card>
    </Column>
    <Column lg={8} md={4} sm={4}>
      <Card horizontal>
        <Card.Header>
          <Card.Title>Content before media</Card.Title>
        </Card.Header>
        <Card.Body>Scheduled maintenance window starts at 02:00 UTC.</Card.Body>
        <Card.Footer>
          <Card.Action>
            <Button kind="ghost" size="md" renderIcon={ArrowRight}>
              Learn more
            </Button>
          </Card.Action>
        </Card.Footer>
        <Card.Media>
          <img
            src={illustration2_1x1}
            alt="Placeholder"
            style={{ width: '100%', height: '100%' }}
          />
        </Card.Media>
      </Card>
    </Column>
    <Column lg={8} md={4} sm={4}>
      <Card horizontal density="expressive">
        <Card.Header>
          <Card.HeaderMedia>
            <DirectionFork size="32" />
          </Card.HeaderMedia>
          <Card.Title label="Prepare your data">
            Generate synthetic tabular data
          </Card.Title>
        </Card.Header>
        <Card.Footer>
          <div className="story-time">
            <Time /> 12:00 PM
          </div>
          <Card.Action>
            <IconButton
              label="Next"
              renderIcon={ArrowRight}
              kind="ghost"
              size="md"
            />
          </Card.Action>
        </Card.Footer>
        <Card.Media>
          <img
            src={illustration1x1}
            alt="Placeholder"
            style={{ width: '100%', height: '100%' }}
          />
        </Card.Media>
      </Card>
    </Column>
  </Grid>
);

WithHorizontalMedia.argTypes = readonlyArgTypes;

export const WithIcon = () => (
  <Grid withRowGap>
    <Column lg={4} md={4} sm={4}>
      <Card>
        <Card.Header>
          <Card.HeaderMedia>
            <Analytics />
          </Card.HeaderMedia>
          <Card.Title description="Real-time metrics">
            Analytics Dashboard
          </Card.Title>
        </Card.Header>
        <Card.Body>Inbound traffic up 8% since last Tuesday.</Card.Body>
        <Card.Footer>
          <Card.Action>
            <Button kind="ghost" size="md">
              View report
            </Button>
          </Card.Action>
          <Card.Action>
            <Button
              kind="ghost"
              label="View report"
              size="md"
              renderIcon={Share}
              hasIconOnly></Button>
          </Card.Action>
          <Card.Action>
            <IconButton
              label="View"
              kind="ghost"
              size="md"
              onClick={(e) => {
                e.stopPropagation();
                console.log('View clicked');
              }}>
              <View />
            </IconButton>
          </Card.Action>
          <Card.Action>
            <IconButton
              label="Download"
              kind="ghost"
              size="md"
              onClick={(e) => {
                e.stopPropagation();
                console.log('Download clicked');
              }}>
              <Download />
            </IconButton>
          </Card.Action>
        </Card.Footer>
      </Card>
    </Column>
    <Column lg={4} md={4} sm={4}>
      <Card>
        <Card.Header>
          <Card.HeaderMedia>
            <Favorite size="32" />
          </Card.HeaderMedia>
          <Card.Title description="Your saved content">
            Favorite Items
          </Card.Title>
        </Card.Header>
        <Card.Body>12 items saved across 3 workspaces.</Card.Body>
        <Card.Footer>
          <Button kind="tertiary" size="md">
            Learn more
          </Button>
        </Card.Footer>
      </Card>
    </Column>
  </Grid>
);

WithIcon.argTypes = readonlyArgTypes;

export const WithMedia = () => (
  <Grid withRowGap>
    <Column lg={4} md={4} sm={4}>
      <Card>
        <Card.Media ratio="16x9">
          <img
            src={illustration16x9}
            alt="Placeholder 16:9 ratio"
            width="100%"
          />
        </Card.Media>
        <Card.Header>
          <Card.Title label="Featured" description="Join us for the big reveal">
            Product Launch Event
          </Card.Title>
        </Card.Header>
        <Card.Body>Registration closes 30 April.</Card.Body>
        <Card.Footer>
          <div style={{ padding: '0 1rem' }}>
            <IconIndicator kind="in-progress" size={16} label="In progress" />
          </div>
          <Card.Action>
            <Button
              kind="ghost"
              label="View report"
              size="md"
              renderIcon={Share}
              hasIconOnly></Button>
          </Card.Action>
        </Card.Footer>
      </Card>
    </Column>
    <Column lg={4} md={4} sm={4}>
      <Card>
        <Card.Media ratio="1x1">
          <img
            src={illustration2_1x1}
            alt="Placeholder 1:1 ratio"
            width="100%"
          />
        </Card.Media>
        <Card.Header>
          <Card.Title description="Perfect for profile images">
            Square Format
          </Card.Title>
        </Card.Header>
        <Card.Body>Confirm your profile photo before publishing.</Card.Body>
        <Card.Footer>
          <Card.Action>
            <Button kind="ghost" size="md">
              Cancel
            </Button>
          </Card.Action>
          <Card.Action>
            <Button kind="primary" size="md" renderIcon={ArrowRight}>
              Confirm
            </Button>
          </Card.Action>
        </Card.Footer>
      </Card>
    </Column>
  </Grid>
);

WithMedia.argTypes = readonlyArgTypes;

export const WithTitleLeadingIcon = () => (
  <Grid withRowGap>
    <Column lg={4} md={4} sm={4}>
      <Card>
        <Card.Header>
          <Card.Title titleStart={<BeeIcon size={16} />}>
            Analytics dashboard
          </Card.Title>
        </Card.Header>
        <Card.Body>Latency p99 held below 120ms all week.</Card.Body>
      </Card>
    </Column>
    <Column lg={4} md={4} sm={4}>
      <Card density="expressive">
        <Card.Header>
          <Card.Title titleStart={<BeeIcon size={24} />}>
            Analytics dashboard
          </Card.Title>
        </Card.Header>
        <Card.Body>Latency p99 held below 120ms all week.</Card.Body>
      </Card>
    </Column>
    <Column lg={4} md={4} sm={4}>
      <Card>
        <Card.Header>
          <Card.Title titleStart={<BeeIcon size={16} />} titleTruncate={2}>
            Example of long title text that wraps onto two lines
          </Card.Title>
        </Card.Header>
        <Card.Body>
          Storage quota reached on 2 of 5 connected accounts.
        </Card.Body>
      </Card>
    </Column>
  </Grid>
);

WithTitleLeadingIcon.argTypes = readonlyArgTypes;

export const WithTitleMedia = () => (
  <Grid withRowGap>
    <Column lg={4} md={4} sm={4}>
      <Card>
        <Card.Header>
          <Card.TitleMedia>
            <img
              src={rebusClassic}
              alt="IBM Classic Rebus logo"
              width={48}
              height={48}
            />
          </Card.TitleMedia>
          <Card.Title
            label="Label"
            description="The title media slot positions an icon to the left of the title text">
            Card with title icon
          </Card.Title>
        </Card.Header>
        <Card.Body>12 contributors, 3 open pull requests.</Card.Body>
      </Card>
    </Column>
    <Column lg={4} md={4} sm={4}>
      <Card>
        <Card.Header>
          <Card.TitleMedia>
            <img
              src={rebusClassic}
              alt="IBM Classic Rebus logo"
              width={64}
              height={64}
            />
          </Card.TitleMedia>
          <Card.Title
            label="Label"
            description="The title media slot positions an icon to the left of the title text">
            Card with title icon
          </Card.Title>
        </Card.Header>
        <Card.Body>12 contributors, 3 open pull requests.</Card.Body>
      </Card>
    </Column>
    <Column lg={4} md={4} sm={4}>
      <Card>
        <Card.Header>
          <Card.TitleMedia>
            <img
              src={rebusClassic}
              alt="IBM Classic Rebus logo"
              width={48}
              height={48}
            />
          </Card.TitleMedia>
          <Card.Title
            label="Label"
            description="The title media slot positions an icon to the left of the title text">
            Card with title icon
          </Card.Title>
          <Card.Actions>
            <Card.Action>
              <IconButton
                label="Edit"
                kind="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log('Edit clicked');
                }}>
                <Edit />
              </IconButton>
            </Card.Action>
            <Card.Action>
              <IconButton
                label="Delete"
                kind="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log('Delete clicked');
                }}>
                <TrashCan />
              </IconButton>
            </Card.Action>
          </Card.Actions>
        </Card.Header>
        <Card.Body>Release tagged and deployment pipeline triggered.</Card.Body>
      </Card>
    </Column>
    <Column lg={4} md={4} sm={4}>
      <Card>
        <Card.Header>
          <Card.HeaderMedia>
            <IconIndicator kind="succeeded" size={16} label="Succeeded" />
          </Card.HeaderMedia>
          <Card.TitleMedia>
            <img
              src={rebusClassic}
              alt="IBM Classic Rebus logo"
              width={48}
              height={48}
            />
          </Card.TitleMedia>
          <Card.Title
            label="Label"
            description="The title media slot positions an icon to the left of the title text">
            Card with title icon
          </Card.Title>
          <Card.Actions>
            <Card.Action>
              <IconButton
                label="Edit"
                kind="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log('Edit clicked');
                }}>
                <Edit />
              </IconButton>
            </Card.Action>
            <Card.Action>
              <IconButton
                label="Delete"
                kind="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log('Delete clicked');
                }}>
                <TrashCan />
              </IconButton>
            </Card.Action>
          </Card.Actions>
        </Card.Header>
        <Card.Body>Build passed all 847 checks. Ready to merge.</Card.Body>
      </Card>
    </Column>
  </Grid>
);

WithTitleMedia.argTypes = readonlyArgTypes;

export const WithTitleTrailingIcon = () => (
  <Grid withRowGap>
    <Column lg={4} md={4} sm={4}>
      <Card>
        <Card.Header>
          <Card.Title titleEnd={<BeeIcon size={16} />}>
            Analytics dashboard
          </Card.Title>
        </Card.Header>
        <Card.Body>Error rate dropped to 0.02% after the patch.</Card.Body>
      </Card>
    </Column>
    <Column lg={4} md={4} sm={4}>
      <Card density="expressive">
        <Card.Header>
          <Card.Title titleEnd={<BeeIcon size={24} />}>
            Analytics dashboard
          </Card.Title>
        </Card.Header>
        <Card.Body>Error rate dropped to 0.02% after the patch.</Card.Body>
      </Card>
    </Column>
    <Column lg={4} md={4} sm={4}>
      <Card>
        <Card.Header>
          <Card.Title titleEnd={<BeeIcon size={16} />} titleTruncate={2}>
            Example of long title text that wraps into three lines with icon
          </Card.Title>
        </Card.Header>
        <Card.Body>
          Backup completed successfully. Next run in 23 hours.
        </Card.Body>
      </Card>
    </Column>
  </Grid>
);

WithTitleTrailingIcon.argTypes = readonlyArgTypes;

export const WithTruncatedTitle = {
  render: ({
    label,
    title,
    description,
    bodyText,
    titleTruncate,
    labelTruncate,
    descriptionTruncate,
    actionCount,
  }) => (
    <Grid>
      <Column lg={4} md={4} sm={4}>
        <Card>
          <Card.Header>
            <Card.Title
              label={label || undefined}
              description={description || undefined}
              titleTruncate={titleTruncate || false}
              labelTruncate={labelTruncate}
              descriptionTruncate={descriptionTruncate}>
              {title}
            </Card.Title>
            {actionCount > 0 && (
              <Card.Actions>
                {ACTION_ICONS.slice(0, actionCount).map(
                  ({ icon: Icon, label: iconLabel }) => (
                    <Card.Action key={iconLabel}>
                      <IconButton label={iconLabel} kind="ghost" size="sm">
                        <Icon />
                      </IconButton>
                    </Card.Action>
                  )
                )}
              </Card.Actions>
            )}
          </Card.Header>
          <Card.Body>{bodyText}</Card.Body>
          <Card.Footer>
            <Card.Action>
              <IconButton label="Share" kind="ghost" size="md">
                <Share />
              </IconButton>
            </Card.Action>
            <Card.Action>
              <IconButton label="Download" kind="ghost" size="md">
                <Download />
              </IconButton>
            </Card.Action>
          </Card.Footer>
        </Card>
      </Column>
    </Grid>
  ),
  args: {
    label: 'Category',
    title:
      'A long card title that will be truncated once it exceeds the available width',
    description: '3 regions',
    bodyText: '14 of 20 steps completed.',
    titleTruncate: true,
    labelTruncate: false,
    descriptionTruncate: false,
    actionCount: 0,
  },
  argTypes: {
    ...readonlyArgTypes,
    label: { control: 'text' },
    title: { control: 'text' },
    description: { control: 'text' },
    bodyText: { control: 'text' },
    actionCount: {
      control: { type: 'number', min: 0, max: 8 },
      description:
        'Number of icon actions to show in the header (0–8). Overflow collapses into a menu.',
    },
    titleTruncate: {
      control: { type: 'select' },
      options: [false, true, 2, 3, 4],
      description:
        'Truncate the title. `true` clamps to 1 line; a number clamps to that many lines.',
    },
    labelTruncate: {
      control: 'boolean',
      description: 'Truncate the label to a single line with an ellipsis.',
    },
    descriptionTruncate: {
      control: 'boolean',
      description:
        'Truncate the description to a single line with an ellipsis.',
    },
  },
};

export const WithVideo = () => (
  <Grid withRowGap>
    <Column lg={4} md={4} sm={4}>
      <Card>
        <Card.Header>
          <Card.Title description="Watch our latest feature walkthrough">
            Product demo video
          </Card.Title>
        </Card.Header>
        <Card.Media ratio="16x9">
          <video
            controls
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute',
            }}>
            <source
              src="https://www.youtube.com/watch?v=Veg7njIKUm4"
              type="video/mp4"
            />
            <track kind="captions" />
            Your browser does not support the video tag.
          </video>
        </Card.Media>
        <Card.Body>Full walkthrough of the new pipeline builder.</Card.Body>
      </Card>
    </Column>
    <Column lg={4} md={4} sm={4}>
      <Card>
        <Card.Media ratio="16x9">
          <iframe
            width="100%"
            height="100%"
            style={{ position: 'absolute' }}
            src="https://www.youtube.com/embed/Veg7njIKUm4?si=B9yWeUzcFHI4ITD1&amp;controls=0"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"></iframe>
        </Card.Media>
        <Card.Header>
          <Card.Title description="Getting started guide">
            Tutorial series
          </Card.Title>
        </Card.Header>
        <Card.Body>
          Set up your first automated workflow in under 5 minutes.
        </Card.Body>
      </Card>
    </Column>
    <Column lg={4} md={4} sm={4}>
      <Card>
        <Card.Media ratio="16x9">
          <iframe
            width={'100%'}
            height={'100%'}
            style={{ position: 'absolute' }}
            src="https://www.youtube.com/embed/Veg7njIKUm4?si=B9yWeUzcFHI4ITD1&amp;controls=0"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"></iframe>
        </Card.Media>
      </Card>
    </Column>
  </Grid>
);

WithVideo.argTypes = readonlyArgTypes;
