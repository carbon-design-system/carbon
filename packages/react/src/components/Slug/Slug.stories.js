/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable no-console */

import React from 'react';

import Slug from '.';
import Button from '../Button';
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
    <div className="slug-container">
      <Slug autoAlign size="mini" slugContent={aiContent} />
      <Slug autoAlign size="2xs" slugContent={aiContent} />
      <Slug autoAlign size="xs" slugContent={aiContent} />
      <Slug autoAlign size="sm" slugContent={aiContent} />
      <Slug autoAlign size="md" slugContent={aiContent} />
      <Slug autoAlign size="lg" slugContent={aiContent} />
      <Slug autoAlign size="xl" slugContent={aiContent} />
    </div>
    <div className="slug-container">
      <Slug kind="hollow" autoAlign size="mini" slugContent={content} />
      <Slug kind="hollow" autoAlign size="2xs" slugContent={content} />
      <Slug kind="hollow" autoAlign size="xs" slugContent={content} />
    </div>
    <div className="slug-container">
      <Slug autoAlign kind="inline" size="sm" slugContent={aiContent} />
      <Slug autoAlign kind="inline" size="md" slugContent={aiContent} />
      <Slug autoAlign kind="inline" size="lg" slugContent={aiContent} />
    </div>
    <div className="slug-container">
      <Slug
        autoAlign
        kind="inline"
        size="sm"
        aiTextLabel="Text goes here"
        slugContent={aiContent}
      />
      <Slug
        autoAlign
        kind="inline"
        size="md"
        aiTextLabel="Text goes here"
        slugContent={aiContent}
      />
      <Slug
        autoAlign
        kind="inline"
        size="lg"
        aiTextLabel="Text goes here"
        slugContent={aiContent}
      />
    </div>
    <div className="slug-container">
      <Slug
        autoAlign
        kind="inline"
        dotType="hollow"
        size="sm"
        slugContent={content}
      />
      <Slug
        autoAlign
        kind="inline"
        dotType="hollow"
        size="md"
        slugContent={content}
      />
      <Slug
        autoAlign
        kind="inline"
        dotType="hollow"
        size="lg"
        slugContent={content}
      />
    </div>
    <div className="slug-container">
      <Slug
        autoAlign
        kind="inline"
        dotType="hollow"
        size="sm"
        aiTextLabel="Text goes here"
        slugContent={content}
      />
      <Slug
        autoAlign
        kind="inline"
        dotType="hollow"
        size="md"
        aiTextLabel="Text goes here"
        slugContent={content}
      />
      <Slug
        autoAlign
        kind="inline"
        dotType="hollow"
        size="lg"
        aiTextLabel="Text goes here"
        slugContent={content}
      />
    </div>
  </>
);

export const Playground = (args) => (
  <>
    <div className="slug-container">
      <Slug autoAlign slugContent={aiContent} {...args} />
    </div>
    <Button>Test</Button>
    <Button kind="danger">Test</Button>
  </>
);
