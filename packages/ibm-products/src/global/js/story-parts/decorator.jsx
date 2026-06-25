/**
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {
  AILabel,
  AILabelContent,
  Toggletip,
  ToggletipButton,
  ToggletipContent,
} from '@carbon/react';
import { Information } from '@carbon/react/icons';

export const sampleDecorator = (decorator) => {
  switch (decorator) {
    case 1:
      return (
        <AILabel className="decorator-container" size="xs">
          <AILabelContent>
            <div>
              <p className="secondary">AI Explained</p>
              <h1>84%</h1>
              <p className="secondary bold">Confidence score</p>
              <p className="secondary">
                This is not really Lorem Ipsum but the spell checker did not
                like the previous text with it&apos;s non-words which is why
                this unwieldy sentence, should one choose to call it that, here.
              </p>
              <hr />
              <p className="secondary">Model type</p>
              <p className="bold">Foundation model</p>
            </div>
          </AILabelContent>
        </AILabel>
      );
    case 2:
      return (
        <Toggletip>
          <ToggletipButton label="Additional information">
            <Information />
          </ToggletipButton>
          <ToggletipContent>
            <p>Custom content here</p>
          </ToggletipContent>
        </Toggletip>
      );
    default:
      return;
  }
};

export const decoratorArgTypes = ({
  _default = 1,
  withHollow = false,
} = {}) => {
  const decorator = {
    control: {
      type: 'select',
      labels: {
        0: 'No AI Label',
        1: 'with AI Label',
        2: 'With non AI Label component',
      },
      default: _default,
    },
    options: [0, 1, 2],
  };

  if (withHollow) {
    decorator.control.labels[3] = 'with hollow AI Label (boolean)';
    decorator.options.push(3);
  }
  return { decorator };
};

export const slugArgTypes = ({ _default = 1, withHollow = false } = {}) => {
  const slug = {
    control: {
      type: 'select',
      labels: {
        0: 'No AI slug',
        1: 'with AI Slug',
      },
      default: _default,
    },
    options: [0, 1],
  };

  if (withHollow) {
    slug.control.labels[2] = 'with hollow AI Slug (boolean)';
    slug.options.push(2);
  }
  return { slug };
};
