/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable no-console */

import React from 'react';

import { Slug, SlugContent, SlugActions } from '.';
import { View, FolderOpen, Folders } from '@carbon/icons-react';
import Button from '../Button';
import { IconButton } from '../IconButton';
import mdx from './Slug.mdx';
import './slug-story.scss';

export default {
  title: 'Experimental/unstable__Slug',
  component: Slug,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

const aiContent = (
  <div>
    <p className="secondary">AI Explained</p>
    <h1>84%</h1>
    <p className="secondary bold">Confidence score</p>
    <p className="secondary">
      Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed do
      eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.
    </p>
    <hr />
    <p className="secondary">Model type</p>
    <p className="bold">Foundation model</p>
  </div>
);

const content = <span>AI was used to generate this content</span>;

export const Default = () => (
  <>
    <div className="slug-container slug-container-example">
      <Slug autoAlign size="mini">
        <SlugContent>{aiContent}</SlugContent>
      </Slug>
      <Slug autoAlign size="2xs">
        <SlugContent>{aiContent}</SlugContent>
      </Slug>
      <Slug autoAlign size="xs">
        <SlugContent>
          {aiContent}
          <SlugActions>
            <IconButton kind="ghost" label="View">
              <View />
            </IconButton>
            <IconButton kind="ghost" label="Open Folder">
              <FolderOpen />
            </IconButton>
            <IconButton kind="ghost" label="Folders">
              <Folders />
            </IconButton>
            <Button>View details</Button>
          </SlugActions>
        </SlugContent>
      </Slug>
      <Slug autoAlign size="sm">
        <SlugContent>
          {aiContent}
          <SlugActions>
            <IconButton kind="ghost" label="View">
              <View />
            </IconButton>
            <IconButton kind="ghost" label="Open Folder">
              <FolderOpen />
            </IconButton>
            <IconButton kind="ghost" label="Folders">
              <Folders />
            </IconButton>
            <Button>View details</Button>
          </SlugActions>
        </SlugContent>
      </Slug>
      <Slug autoAlign size="md">
        <SlugContent>
          {aiContent}
          <SlugActions>
            <IconButton kind="ghost" label="View">
              <View />
            </IconButton>
            <IconButton kind="ghost" label="Open Folder">
              <FolderOpen />
            </IconButton>
            <IconButton kind="ghost" label="Folders">
              <Folders />
            </IconButton>
            <Button>View details</Button>
          </SlugActions>
        </SlugContent>
      </Slug>
      <Slug autoAlign size="lg">
        <SlugContent>
          {aiContent}
          <SlugActions>
            <IconButton kind="ghost" label="View">
              <View />
            </IconButton>
            <IconButton kind="ghost" label="Open Folder">
              <FolderOpen />
            </IconButton>
            <IconButton kind="ghost" label="Folders">
              <Folders />
            </IconButton>
            <Button>View details</Button>
          </SlugActions>
        </SlugContent>
      </Slug>
      <Slug autoAlign size="xl">
        <SlugContent>
          {aiContent}
          <SlugActions>
            <IconButton kind="ghost" label="View">
              <View />
            </IconButton>
            <IconButton kind="ghost" label="Open Folder">
              <FolderOpen />
            </IconButton>
            <IconButton kind="ghost" label="Folders">
              <Folders />
            </IconButton>
            <Button>View details</Button>
          </SlugActions>
        </SlugContent>
      </Slug>
    </div>
    <div className="slug-container-example slug-container">
      <Slug kind="hollow" autoAlign size="mini">
        <SlugContent>{content}</SlugContent>
      </Slug>
      <Slug kind="hollow" autoAlign size="2xs">
        <SlugContent>{content}</SlugContent>
      </Slug>
      <Slug kind="hollow" autoAlign size="xs">
        <SlugContent>{content}</SlugContent>
      </Slug>
    </div>
    <div className="slug-container-example slug-container">
      <Slug autoAlign kind="inline" size="sm">
        <SlugContent>
          {aiContent}
          <SlugActions>
            <IconButton kind="ghost" label="View">
              <View />
            </IconButton>
            <IconButton kind="ghost" label="Open Folder">
              <FolderOpen />
            </IconButton>
            <IconButton kind="ghost" label="Folders">
              <Folders />
            </IconButton>
            <Button>View details</Button>
          </SlugActions>
        </SlugContent>
      </Slug>
      <Slug autoAlign kind="inline" size="md">
        <SlugContent>
          {aiContent}
          <SlugActions>
            <IconButton kind="ghost" label="View">
              <View />
            </IconButton>
            <IconButton kind="ghost" label="Open Folder">
              <FolderOpen />
            </IconButton>
            <IconButton kind="ghost" label="Folders">
              <Folders />
            </IconButton>
            <Button>View details</Button>
          </SlugActions>
        </SlugContent>
      </Slug>
      <Slug autoAlign kind="inline" size="lg">
        <SlugContent>
          {aiContent}
          <SlugActions>
            <IconButton kind="ghost" label="View">
              <View />
            </IconButton>
            <IconButton kind="ghost" label="Open Folder">
              <FolderOpen />
            </IconButton>
            <IconButton kind="ghost" label="Folders">
              <Folders />
            </IconButton>
            <Button>View details</Button>
          </SlugActions>
        </SlugContent>
      </Slug>
    </div>
    <div className="slug-container-example slug-container">
      <Slug autoAlign kind="inline" size="sm" aiTextLabel="Text goes here">
        <SlugContent>
          {aiContent}
          <SlugActions>
            <IconButton kind="ghost" label="View">
              <View />
            </IconButton>
            <IconButton kind="ghost" label="Open Folder">
              <FolderOpen />
            </IconButton>
            <IconButton kind="ghost" label="Folders">
              <Folders />
            </IconButton>
            <Button>View details</Button>
          </SlugActions>
        </SlugContent>
      </Slug>
      <Slug autoAlign kind="inline" size="md" aiTextLabel="Text goes here">
        <SlugContent>
          {aiContent}
          <SlugActions>
            <IconButton kind="ghost" label="View">
              <View />
            </IconButton>
            <IconButton kind="ghost" label="Open Folder">
              <FolderOpen />
            </IconButton>
            <IconButton kind="ghost" label="Folders">
              <Folders />
            </IconButton>
            <Button>View details</Button>
          </SlugActions>
        </SlugContent>
      </Slug>
      <Slug autoAlign kind="inline" size="lg" aiTextLabel="Text goes here">
        <SlugContent>
          {aiContent}
          <SlugActions>
            <IconButton kind="ghost" label="View">
              <View />
            </IconButton>
            <IconButton kind="ghost" label="Open Folder">
              <FolderOpen />
            </IconButton>
            <IconButton kind="ghost" label="Folders">
              <Folders />
            </IconButton>
            <Button>View details</Button>
          </SlugActions>
        </SlugContent>
      </Slug>
    </div>
    <div className="slug-container-example slug-container">
      <Slug autoAlign kind="inline" dotType="hollow" size="sm">
        <SlugContent>{content}</SlugContent>
      </Slug>
      <Slug autoAlign kind="inline" dotType="hollow" size="md">
        <SlugContent>{content}</SlugContent>
      </Slug>
      <Slug autoAlign kind="inline" dotType="hollow" size="lg">
        <SlugContent>{content}</SlugContent>
      </Slug>
    </div>
    <div className="slug-container-example slug-container">
      <Slug
        autoAlign
        kind="inline"
        dotType="hollow"
        size="sm"
        aiTextLabel="Text goes here">
        <SlugContent>{content}</SlugContent>
      </Slug>
      <Slug
        autoAlign
        kind="inline"
        dotType="hollow"
        size="md"
        aiTextLabel="Text goes here">
        <SlugContent>{content}</SlugContent>
      </Slug>
      <Slug
        autoAlign
        kind="inline"
        dotType="hollow"
        size="lg"
        aiTextLabel="Text goes here">
        <SlugContent>{content}</SlugContent>
      </Slug>
    </div>
  </>
);

export const Callout = (args) => {
  const { showSlugActions = true } = args;

  return (
    <div className="slug-container-example slug-container centered">
      <Slug autoAlign={false} defaultOpen {...args}>
        <SlugContent>
          {' '}
          <div>
            <p className="secondary">AI Explained</p>
            <h1>84%</h1>
            <p className="secondary bold">Confidence score</p>
            <p className="secondary">
              Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed
              do eiusmod tempor incididunt ut fsil labore et dolore magna
              aliqua.
            </p>
            <hr />
            <p className="secondary">Model type</p>
            <p className="bold">Foundation model</p>
          </div>
          {showSlugActions && (
            <SlugActions>
              <IconButton kind="ghost" label="View">
                <View />
              </IconButton>
              <IconButton kind="ghost" label="Open Folder">
                <FolderOpen />
              </IconButton>
              <IconButton kind="ghost" label="Folders">
                <Folders />
              </IconButton>
              <Button>View details</Button>
            </SlugActions>
          )}
        </SlugContent>
      </Slug>
    </div>
  );
};

Callout.argTypes = {
  showSlugActions: {
    control: {
      type: 'boolean',
    },
    description: 'Playground only - toggle to show the callout toolbar',
  },
  revertActive: {
    table: {
      disable: true,
    },
  },
  aiText: {
    table: {
      disable: true,
    },
  },
  aiTextLabel: {
    table: {
      disable: true,
    },
  },
  autoAlign: {
    table: {
      disable: true,
    },
  },
  children: {
    table: {
      disable: true,
    },
  },
  className: {
    table: {
      disable: true,
    },
  },
  dotType: {
    table: {
      disable: true,
    },
  },
  kind: {
    table: {
      disable: true,
    },
  },
  onRevertClick: {
    table: {
      disable: true,
    },
  },
  revertLabel: {
    table: {
      disable: true,
    },
  },
  size: {
    table: {
      disable: true,
    },
  },
  slugContent: {
    table: {
      disable: true,
    },
  },
  slugLabel: {
    table: {
      disable: true,
    },
  },
};

export const Playground = (args) => {
  const { kind, dotType, showSlugActions = true } = args;

  let renderedContent;
  if (kind === 'hollow' || dotType === 'hollow') {
    renderedContent = content;
  } else {
    renderedContent = (
      <>
        <div>
          <p className="secondary">AI Explained</p>
          <h1>84%</h1>
          <p className="secondary bold">Confidence score</p>
          <p className="secondary">
            Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.
          </p>
          <hr />
          <p className="secondary">Model type</p>
          <p className="bold">Foundation model</p>
        </div>
        {showSlugActions && (
          <SlugActions>
            <IconButton kind="ghost" label="View">
              <View />
            </IconButton>
            <IconButton kind="ghost" label="Open Folder">
              <FolderOpen />
            </IconButton>
            <IconButton kind="ghost" label="Folders">
              <Folders />
            </IconButton>
            <Button>View details</Button>
          </SlugActions>
        )}
      </>
    );
  }

  return (
    <>
      <div className="slug-container slug-container-example">
        <Slug autoAlign {...args}>
          <SlugContent>{renderedContent}</SlugContent>
        </Slug>
      </div>
      <Button>Test</Button>
      <Button kind="danger">Test</Button>
    </>
  );
};

Playground.argTypes = {
  showSlugActions: {
    control: {
      type: 'boolean',
    },
    description: 'Playground only - toggle to show the callout toolbar',
  },
};
