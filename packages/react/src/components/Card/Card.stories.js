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
  DirectionFork,
  Time,
} from '@carbon/icons-react';
import illustration1 from './_story-assets/illustration-img-1.png';
import placeholder16x9 from './_story-assets/placeholder-16x9.png';
import placeholder1x1 from './_story-assets/placeholder-1x1.png';
import rebusClassic from './_story-assets/classic-rebus.png';
import './card-story.scss';
import mdx from './Card.mdx';

export default {
  title: 'Preview/Card',
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
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: mdx,
    },
  },
  argTypes: {
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
  },
};

export const Minimal = () => (
  <Grid withRowGap>
    <Column lg={4} md={4} sm={4}>
      <Card>
        <Card.Body>
          <p>A minimal card with just body content.</p>
        </Card.Body>
      </Card>
    </Column>
    <Column lg={4} md={4} sm={4}>
      <Card>
        <Card.Header>
          <Card.Title>Card Title</Card.Title>
        </Card.Header>
        <Card.Body>
          <p>
            This is the card body content. It can contain any custom content you
            need.
          </p>
        </Card.Body>
        <Card.Footer>
          <Button kind="tertiary" size="md">
            Action
          </Button>
        </Card.Footer>
      </Card>
    </Column>
  </Grid>
);

export const Disabled = () => {
  const [disabled, setDisabled] = React.useState(true);
  return (
    <Grid withRowGap>
      <Column lg={4} md={4} sm={4}>
        <Card disabled={disabled}>
          <Card.Header>
            <Card.Title>Card Title</Card.Title>
          </Card.Header>
          <Card.Body>
            <p>
              When the card is disabled, pass the same state to all interactive
              elements inside — buttons, inputs, toggles, etc.
            </p>
          </Card.Body>
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
      <Column lg={4} md={4} sm={4} className="card-story-disabled-toggle">
        <Button
          kind="tertiary"
          size="sm"
          onClick={() => setDisabled((d) => !d)}>
          {!disabled ? 'Disable Card' : 'Enable Card'}
        </Button>
      </Column>
    </Grid>
  );
};

export const ProductiveAndExpressive = () => (
  <Grid withRowGap>
    <Column lg={4} md={4} sm={4}>
      <Card>
        <Card.Header>
          <Card.Title label="Category" description="Uses heading-compact-02">
            Productive Card
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <p>
            Productive density uses compact headings (heading-compact-02) for a
            more condensed layout.
          </p>
        </Card.Body>
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
          <Card.Title label="Category" description="Uses heading-03">
            Expressive Card
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <p>
            Expressive density uses larger headings (heading-03) for a more
            spacious layout.
          </p>
        </Card.Body>
        <Card.Footer>
          <IconIndicator kind="succeeded" size={16} label="Succeeded" />
        </Card.Footer>
      </Card>
    </Column>
  </Grid>
);

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
        <Card.Body>
          <p>This card includes a small icon (16px) alongside the title.</p>
        </Card.Body>
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
        <Card.Body>
          <p>This card includes a larger icon (32px) for more prominence.</p>
        </Card.Body>
        <Card.Footer>
          <Button kind="tertiary" size="md">
            Learn more
          </Button>
        </Card.Footer>
      </Card>
    </Column>
  </Grid>
);

export const WithMedia = () => (
  <Grid withRowGap>
    <Column lg={4} md={4} sm={4}>
      <Card>
        <Card.Media ratio="16x9">
          <img
            src={placeholder16x9}
            alt="Placeholder 16:9 ratio"
            width="100%"
          />
        </Card.Media>
        <Card.Header>
          <Card.Title label="Featured" description="Join us for the big reveal">
            Product Launch Event
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <p>This card features a 16:9 aspect ratio media slot at the top.</p>
        </Card.Body>
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
          <img src={placeholder1x1} alt="Placeholder 1:1 ratio" width="100%" />
        </Card.Media>
        <Card.Header>
          <Card.Title description="Perfect for profile images">
            Square Format
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <p>This card uses a 1:1 (square) aspect ratio for the media.</p>
        </Card.Body>
        <Card.Footer>
          <Card.Action>
            <Button kind="ghost" size="md">
              Cancel
            </Button>
          </Card.Action>
          <Card.Action>
            <Button kind="secondary" size="md" renderIcon={ArrowRight}>
              Confirm
            </Button>
          </Card.Action>
        </Card.Footer>
      </Card>
    </Column>
  </Grid>
);

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
          <p>
            This clickable card has action buttons in the header that prevent
            click propagation.
          </p>
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
          <Card.Title label="Category" description="Last updated 2 hours ago">
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
        <Card.Body>
          <p>
            Multiple action buttons can be placed in the header alongside label,
            title, and description. Actions are right-aligned and maintain
            proper spacing.
          </p>
        </Card.Body>
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
        <Card.Body>
          <p>
            Text actions use Carbon&apos;s small ghost button for actions that
            require text labels instead of icons.
          </p>
        </Card.Body>
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
        <Card.Body>
          <p>Multiple text actions in the header.</p>
        </Card.Body>
      </Card>
    </Column>
    <Column lg={4} md={4} sm={4}>
      <Card>
        <Card.Header>
          <Card.Title
            label="Category"
            labelTruncate
            description="This is a lengthy description that will be clamped to exactly two lines using multi-line truncation so you can see how it interacts with the action buttons above"
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
        <Card.Body>
          <p>
            Truncated label (single line ellipsis), long wrapping title, and
            description clamped to 2 lines — all alongside header actions.
          </p>
        </Card.Body>
      </Card>
    </Column>
  </Grid>
);

export const WithHeaderMedia = () => (
  <Grid withRowGap>
    <Column lg={4} md={4} sm={4}>
      <Card>
        <Card.Header>
          <Card.HeaderMedia>
            <Analytics />
          </Card.HeaderMedia>
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
          <Card.Title description="Real-time metrics">
            Analytics Dashboard
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <p>
            This card demonstrates the icon slot (first child) with action
            buttons on the right.
          </p>
        </Card.Body>
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
        <Card.Body>
          <p>The icon slot can contain an image element.</p>
        </Card.Body>
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
        <Card.Body>
          <p>The icon slot can contain a Tag component.</p>
        </Card.Body>
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
        <Card.Body>
          <p>The icon slot can contain an IconIndicator component.</p>
        </Card.Body>
      </Card>
    </Column>
  </Grid>
);

export const WithTruncatedTitle = () => (
  <Grid withRowGap>
    <Column lg={4} md={4} sm={4}>
      <Card>
        <Card.Header>
          <Card.Title
            titleTruncate
            description="Single-line truncation example">
            This is a very long title that will be truncated with an ellipsis
            when it exceeds the maximum width
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <p>The title is truncated to a single line with an ellipsis.</p>
        </Card.Body>
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
    <Column lg={4} md={4} sm={4}>
      <Card>
        <Card.Header>
          <Card.Title
            titleTruncate={3}
            description="Multi-line truncation example">
            This is a very long title that will be truncated after three lines.
            It demonstrates the multi-line truncation feature using WebKit line
            clamp. Any content beyond three lines will be hidden with an
            ellipsis.
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <p>The title is truncated to three lines with an ellipsis.</p>
        </Card.Body>
        <Card.Footer>
          <div style={{ padding: '0 1rem' }}>
            <IconIndicator kind="failed" size={16} label="Failed" />
          </div>
          <Card.Action>
            <IconButton label="Retry" kind="ghost" size="md">
              <View />
            </IconButton>
          </Card.Action>
        </Card.Footer>
      </Card>
    </Column>
  </Grid>
);

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
        <Card.Body>
          <p>
            This card demonstrates the AI label feature with a blue gradient
            border indicating AI-generated content.
          </p>
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
          <p>Card with AI label and header media slot (icon).</p>
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
          <Card.Title>Smart Recommendations Long title</Card.Title>
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
          <p>
            Card with AI label and actions. Note how the actions are positioned
            to the left of the AI label with proper spacing.
          </p>
        </Card.Body>
        <Card.Footer>
          <Button size="sm" kind="tertiary">
            View Details
          </Button>
        </Card.Footer>
      </Card>
    </Column>
  </Grid>
);

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
        <Card.Body>
          <p>
            CardTitleMedia provides a media slot positioned to the left of the
            card title. The media adapts to the heading area height (min 48px,
            max 64px).
          </p>
        </Card.Body>
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
        <Card.Body>
          <p>
            CardTitleMedia provides a media slot positioned to the left of the
            card title. The media adapts to the heading area height (min 48px,
            max 64px).
          </p>
        </Card.Body>
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
        <Card.Body>
          <p>
            CardTitleMedia provides a media slot positioned to the left of the
            card title. The media adapts to the heading area height (min 48px,
            max 64px).
          </p>
        </Card.Body>
      </Card>
    </Column>
    <Column lg={4} md={4} sm={4}>
      <Card>
        <Card.Media ratio="16x9">
          <img
            src={placeholder16x9}
            alt="Placeholder 16:9 ratio"
            width="100%"
          />
        </Card.Media>
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
        <Card.Body>
          <p>
            CardTitleMedia provides a media slot positioned to the left of the
            card title. The media adapts to the heading area height (min 48px,
            max 64px).
          </p>
        </Card.Body>
      </Card>
    </Column>
  </Grid>
);

export const WithTitleLeadingIcon = () => (
  <Grid withRowGap>
    <Column lg={4} md={4} sm={4}>
      <Card>
        <Card.Header>
          <Card.Title titleStart={<BeeIcon size={16} />}>
            Analytics dashboard
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <p>
            The leading icon adapts to the title size. In productive density,
            use 16px icons.
          </p>
        </Card.Body>
      </Card>
    </Column>
    <Column lg={4} md={4} sm={4}>
      <Card density="expressive">
        <Card.Header>
          <Card.Title titleStart={<BeeIcon size={24} />}>
            Analytics dashboard
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <p>
            The leading icon adapts to the title size. In expressive density,
            use 24px icons.
          </p>
        </Card.Body>
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
          <p>
            When the title wraps to multiple lines, the icon stays top-aligned
            with 2px padding to center with the first line.
          </p>
        </Card.Body>
      </Card>
    </Column>
  </Grid>
);

export const WithTitleTrailingIcon = () => (
  <Grid withRowGap>
    <Column lg={4} md={4} sm={4}>
      <Card>
        <Card.Header>
          <Card.Title titleEnd={<BeeIcon size={16} />}>
            Analytics dashboard
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <p>
            The trailing icon adapts to the title size. In productive density,
            use 16px icons.
          </p>
        </Card.Body>
      </Card>
    </Column>
    <Column lg={4} md={4} sm={4}>
      <Card density="expressive">
        <Card.Header>
          <Card.Title titleEnd={<BeeIcon size={24} />}>
            Analytics dashboard
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <p>
            The trailing icon adapts to the title size. In expressive density,
            use 24px icons.
          </p>
        </Card.Body>
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
          <p>
            When the title wraps to multiple lines, the icon stays inline with
            the text on the last line with 8px gap.
          </p>
        </Card.Body>
      </Card>
    </Column>
  </Grid>
);

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
        <Card.Body>
          <p style={{ marginBlockStart: 'revert' }}>
            Video content fills the AspectRatio container and maintains the 16:9
            aspect ratio.
          </p>
        </Card.Body>
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
          <p>
            Videos can include a poster image that displays before playback
            starts.
          </p>
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

export const WithHorizontalMedia = () => (
  <Grid withRowGap>
    <Column lg={8} md={4} sm={4}>
      <Card horizontal>
        <Card.Media>
          <img
            src={placeholder1x1}
            alt="Placeholder"
            style={{ width: '100%', height: '100%' }}
          />
        </Card.Media>
        <Card.Header>
          <Card.Title label="Get started">
            Generate synthetic tabular data
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <p>
            Prepare your data and generate synthetic tabular data using
            AI-assisted tooling.
          </p>
        </Card.Body>
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
            src={placeholder16x9}
            alt="Placeholder"
            style={{ width: '100%', height: '100%' }}
          />
        </Card.Media>
        <Card.Header>
          <Card.Title>Custom media width</Card.Title>
        </Card.Header>
        <Card.Body>
          <p>
            Pass <code>mediaWidth=50%</code> to control the media column width.
            Accepts any valid CSS value.
          </p>
        </Card.Body>
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
        <Card.Body>
          <p>
            When Card.Media appears after the content children in JSX, it is
            rendered on the right.
          </p>
        </Card.Body>
        <Card.Footer>
          <Card.Action>
            <Button kind="ghost" size="md" renderIcon={ArrowRight}>
              Learn more
            </Button>
          </Card.Action>
        </Card.Footer>
        <Card.Media>
          <img
            src={placeholder1x1}
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
            <IconButton renderIcon={ArrowRight} kind="ghost" size="md" />
          </Card.Action>
        </Card.Footer>
        <Card.Media>
          <img
            src={placeholder1x1}
            alt="Placeholder"
            style={{ width: '100%', height: '100%' }}
          />
        </Card.Media>
      </Card>
    </Column>
  </Grid>
);
