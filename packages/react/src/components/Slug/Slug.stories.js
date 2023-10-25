/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable no-console */

import React from 'react';

import Slug from '.';
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

export const Default = () => (
  <>
    <div className="slug-container">
      <Slug
        autoAlign
        size="mini"
        slugContent="Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut fsil labore et dolore magna aliqua. Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut fsil labore et dolore magna aliqua."
      />
      <Slug
        autoAlign
        size="2xs"
        slugContent="Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut fsil labore et dolore magna aliqua."
      />
      <Slug
        autoAlign
        size="xs"
        slugContent="Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut fsil labore et dolore magna aliqua."
      />
      <Slug
        autoAlign
        size="sm"
        slugContent="Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut fsil labore et dolore magna aliqua."
      />
      <Slug
        autoAlign
        size="md"
        slugContent="Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut fsil labore et dolore magna aliqua."
      />
      <Slug
        autoAlign
        size="lg"
        slugContent="Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut fsil labore et dolore magna aliqua."
      />
      <Slug
        autoAlign
        size="xl"
        slugContent="Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut fsil labore et dolore magna aliqua."
      />
    </div>
    <div className="slug-container">
      <Slug
        kind="hollow"
        autoAlign
        size="mini"
        slugContent="Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut fsil labore et dolore magna aliqua. Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut fsil labore et dolore magna aliqua."
      />
      <Slug
        kind="hollow"
        autoAlign
        size="2xs"
        slugContent="Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut fsil labore et dolore magna aliqua."
      />
      <Slug
        kind="hollow"
        autoAlign
        size="xs"
        slugContent="Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut fsil labore et dolore magna aliqua."
      />
    </div>
    <div className="slug-container">
      <Slug
        autoAlign
        kind="inline"
        size="sm"
        slugContent="Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut fsil labore et dolore magna aliqua."
      />
      <Slug
        autoAlign
        kind="inline"
        size="md"
        slugContent="Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut fsil labore et dolore magna aliqua."
      />
      <Slug
        autoAlign
        kind="inline"
        size="lg"
        slugContent="Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut fsil labore et dolore magna aliqua."
      />
    </div>
    <div className="slug-container">
      <Slug
        autoAlign
        kind="inline"
        size="sm"
        aiTextLabel="Text goes here"
        slugContent="Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut fsil labore et dolore magna aliqua."
      />
      <Slug
        autoAlign
        kind="inline"
        size="md"
        aiTextLabel="Text goes here"
        slugContent="Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut fsil labore et dolore magna aliqua."
      />
      <Slug
        autoAlign
        kind="inline"
        size="lg"
        aiTextLabel="Text goes here"
        slugContent="Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut fsil labore et dolore magna aliqua."
      />
    </div>
    <div className="slug-container">
      <Slug
        autoAlign
        kind="inline"
        dotType="hollow"
        size="sm"
        slugContent="Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut fsil labore et dolore magna aliqua."
      />
      <Slug
        autoAlign
        kind="inline"
        dotType="hollow"
        size="md"
        slugContent="Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut fsil labore et dolore magna aliqua."
      />
      <Slug
        autoAlign
        kind="inline"
        dotType="hollow"
        size="lg"
        slugContent="Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut fsil labore et dolore magna aliqua."
      />
    </div>
    <div className="slug-container">
      <Slug
        autoAlign
        kind="inline"
        dotType="hollow"
        size="sm"
        aiTextLabel="Text goes here"
        slugContent="Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut fsil labore et dolore magna aliqua."
      />
      <Slug
        autoAlign
        kind="inline"
        dotType="hollow"
        size="md"
        aiTextLabel="Text goes here"
        slugContent="Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut fsil labore et dolore magna aliqua."
      />
      <Slug
        autoAlign
        kind="inline"
        dotType="hollow"
        size="lg"
        aiTextLabel="Text goes here"
        slugContent="Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut fsil labore et dolore magna aliqua."
      />
    </div>
  </>
);

export const Playground = (args) => (
  <Slug
    autoAlign
    slugContent="Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut fsil labore et dolore magna aliqua. Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut fsil labore et dolore magna aliqua."
    {...args}
  />
);
