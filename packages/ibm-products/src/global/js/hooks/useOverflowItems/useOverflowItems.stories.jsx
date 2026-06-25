/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useRef, useState } from 'react';
import { useOverflowItems } from './useOverflowItems';
import { Tag, Slider } from '@carbon/react';
import { Annotation } from '../../../../../.storybook/Annotation';
import { FitToWidth } from '@carbon/react/icons';
import './_storybook-styles.scss';
import mdx from './useOverflowItems.mdx';

export default {
  title: 'Utilities/useOverflowItems',
  parameters: {
    layout: 'padded',
    docs: {
      page: mdx,
    },
  },
  tags: ['autodocs'],
};

const Template = () => {
  const [width, setWidth] = useState(500);
  const [numberOfTags, setNumberOfTags] = useState(10);
  const containerRef = useRef(null);

  const makeTags = (n) => {
    return Array(n)
      .fill(null)
      .map((_, idx) => ({
        id: idx,
        label: `Tag ${idx + 1}`,
      }));
  };

  const tags = makeTags(numberOfTags);

  const { visibleItems, hiddenItems, itemRefHandler } = useOverflowItems(
    tags,
    containerRef
  );

  const widthHandler = (n) => {
    setWidth(n);
  };

  return (
    <div>
      <Slider
        className="slider"
        max={1000}
        min={200}
        value={width}
        onChange={({ value }) => widthHandler(value)}
        hideTextInput
        labelText="Parent container width"
      />
      <Slider
        className="slider"
        max={50}
        min={1}
        value={numberOfTags}
        onChange={({ value }) => setNumberOfTags(value)}
        hideTextInput
        labelText="Number of total tags"
      />
      <div
        className="parent"
        style={{
          width: `${width}px`,
        }}
      >
        <Annotation text="Parent container" type="layer" icon={FitToWidth}>
          <div className="child" ref={containerRef}>
            <p>Visible items:</p>
            {visibleItems.map((tag) => (
              <Tag
                type="blue"
                key={tag.id}
                ref={(node) => {
                  itemRefHandler(tag.id, node);
                }}
              >
                {tag.label}
              </Tag>
            ))}
          </div>
          <div className="child">
            <p>Hidden items:</p>
            {hiddenItems.map((tag) => (
              <Tag key={tag.id} type="blue">
                {tag.label}
              </Tag>
            ))}
          </div>
        </Annotation>
      </div>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};
