/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {
  StructuredListWrapper,
  StructuredListHead,
  StructuredListBody,
  StructuredListRow,
  StructuredListCell,
  StructuredListInput,
} from '@carbon/react';

// Case 1: Direct usage with selection
export const BasicSelection = () => (
  <StructuredListWrapper selection>
    <StructuredListHead>
      <StructuredListRow head selection>
        <StructuredListCell head>Column A</StructuredListCell>
        <StructuredListCell head>Column B</StructuredListCell>
      </StructuredListRow>
    </StructuredListHead>
    <StructuredListBody>
      <StructuredListRow selection>
        <StructuredListCell>Row 1</StructuredListCell>
        <StructuredListCell>Row 1</StructuredListCell>
        <StructuredListInput
          id="row-1"
          value="row-1"
          title="row-1"
          name="row-1"
          aria-label="row-1"
        />
      </StructuredListRow>
    </StructuredListBody>
  </StructuredListWrapper>
);

// Case 2: Row generator function
const generateRows = (count) => {
  return Array.from({ length: count }, (_, i) => (
    <StructuredListRow key={`row-${i}`} selection>
      <StructuredListCell>Row {i}</StructuredListCell>
      <StructuredListCell>Content {i}</StructuredListCell>
      <StructuredListInput
        id={`row-${i}`}
        value={`row-${i}`}
        title={`row-${i}`}
        name="row-0"
        aria-label={`row-${i}`}
      />
    </StructuredListRow>
  ));
};

export const WithRowGenerator = () => (
  <StructuredListWrapper selection>
    <StructuredListHead>
      <StructuredListRow head selection>
        <StructuredListCell head>Column A</StructuredListCell>
        <StructuredListCell head>Column B</StructuredListCell>
      </StructuredListRow>
    </StructuredListHead>
    <StructuredListBody>{generateRows(3)}</StructuredListBody>
  </StructuredListWrapper>
);

// Case 3: Nested inside other components
export const NestedStructuredList = () => (
  <div className="wrapper">
    <div className="inner">
      <StructuredListWrapper selection>
        <StructuredListHead>
          <StructuredListRow head selection>
            <StructuredListCell head>Nested Column</StructuredListCell>
          </StructuredListRow>
        </StructuredListHead>
        <StructuredListBody>
          <StructuredListRow selection>
            <StructuredListCell>Nested Content</StructuredListCell>
            <StructuredListInput
              id="nested-1"
              value="nested-1"
              title="nested-1"
              name="nested-1"
              aria-label="nested-1"
            />
          </StructuredListRow>
        </StructuredListBody>
      </StructuredListWrapper>
    </div>
  </div>
);

// Case 4: Without selection (should not be modified)
export const WithoutSelection = () => (
  <StructuredListWrapper>
    <StructuredListHead>
      <StructuredListRow head>
        <StructuredListCell head>No Selection</StructuredListCell>
      </StructuredListRow>
    </StructuredListHead>
    <StructuredListBody>
      <StructuredListRow>
        <StructuredListCell>Should Not Change</StructuredListCell>
      </StructuredListRow>
    </StructuredListBody>
  </StructuredListWrapper>
);

// Case 5: Mixed with and without selection
export const MixedSelectionUsage = () => (
  <div>
    <StructuredListWrapper selection>
      <StructuredListHead>
        <StructuredListRow head selection>
          <StructuredListCell head>With Selection</StructuredListCell>
        </StructuredListRow>
      </StructuredListHead>
      <StructuredListBody>
        <StructuredListRow selection>
          <StructuredListCell>Should Get Selection</StructuredListCell>
          <StructuredListInput
            id="mixed-1"
            value="mixed-1"
            title="mixed-1"
            name="mixed-1"
            aria-label="mixed-1"
          />
        </StructuredListRow>
      </StructuredListBody>
    </StructuredListWrapper>
    <StructuredListWrapper>
      <StructuredListHead>
        <StructuredListRow head>
          <StructuredListCell head>Without Selection</StructuredListCell>
        </StructuredListRow>
      </StructuredListHead>
      <StructuredListBody>
        <StructuredListRow>
          <StructuredListCell>Should Not Get Selection</StructuredListCell>
        </StructuredListRow>
      </StructuredListBody>
    </StructuredListWrapper>
  </div>
);
// Case 7: Conditional Rendering with Selection
export const ConditionalRendering = ({ showSelection = true }) => (
  <StructuredListWrapper selection={showSelection}>
    <StructuredListHead>
      <StructuredListRow head selection>
        <StructuredListCell head>Conditional</StructuredListCell>
      </StructuredListRow>
    </StructuredListHead>
    <StructuredListBody>
      <StructuredListRow selection>
        <StructuredListCell>Conditional Row</StructuredListCell>
        <StructuredListInput
          id="conditional-1"
          value="conditional-1"
          title="conditional-1"
          name="conditional"
          aria-label="conditional-1"
        />
      </StructuredListRow>
    </StructuredListBody>
  </StructuredListWrapper>
);

// Case 8: Multiple Nested StructuredLists
export const NestedLists = () => (
  <StructuredListWrapper selection>
    <StructuredListHead>
      <StructuredListRow head selection>
        <StructuredListCell head>Parent List</StructuredListCell>
      </StructuredListRow>
    </StructuredListHead>
    <StructuredListBody>
      <StructuredListRow selection>
        <StructuredListCell>
          <StructuredListWrapper selection>
            <StructuredListHead>
              <StructuredListRow head selection>
                <StructuredListCell head>Nested List</StructuredListCell>
              </StructuredListRow>
            </StructuredListHead>
            <StructuredListBody>
              <StructuredListRow selection>
                <StructuredListCell>Nested Content</StructuredListCell>
                <StructuredListInput
                  id="nested-2"
                  value="nested-2"
                  title="nested-2"
                  name="nested-2"
                  aria-label="nested-2"
                />
              </StructuredListRow>
            </StructuredListBody>
          </StructuredListWrapper>
        </StructuredListCell>
        <StructuredListInput
          id="parent-1"
          value="parent-1"
          title="parent-1"
          name="parent"
          aria-label="parent-1"
        />
      </StructuredListRow>
    </StructuredListBody>
  </StructuredListWrapper>
);

// Case 10: With Conditional StructuredListInput
export const ConditionalInput = ({ isSelectable = true }) => (
  <StructuredListWrapper selection>
    <StructuredListHead>
      <StructuredListRow head selection>
        <StructuredListCell head>Conditional Input</StructuredListCell>
      </StructuredListRow>
    </StructuredListHead>
    <StructuredListBody>
      <StructuredListRow selection>
        <StructuredListCell>Row Content</StructuredListCell>
        {isSelectable && (
          <StructuredListInput
            id="conditional-input-1"
            value="conditional-input-1"
            title="conditional-input-1"
            name="conditional-input"
            aria-label="conditional-input-1"
          />
        )}
      </StructuredListRow>
    </StructuredListBody>
  </StructuredListWrapper>
);

// Case 11: With Multiple Body Sections
export const MultipleBodySections = () => (
  <StructuredListWrapper selection>
    <StructuredListHead>
      <StructuredListRow head selection>
        <StructuredListCell head>Multiple Bodies</StructuredListCell>
      </StructuredListRow>
    </StructuredListHead>
    <StructuredListBody>
      <StructuredListRow selection>
        <StructuredListCell>Section 1</StructuredListCell>
        <StructuredListInput
          id="section-1"
          value="section-1"
          title="section-1"
          name="multi-section"
          aria-label="section-1"
        />
      </StructuredListRow>
    </StructuredListBody>
    <StructuredListBody>
      <StructuredListRow selection>
        <StructuredListCell>Section 2</StructuredListCell>
        <StructuredListInput
          id="section-2"
          value="section-2"
          title="section-2"
          name="multi-section"
          aria-label="section-2"
        />
      </StructuredListRow>
    </StructuredListBody>
  </StructuredListWrapper>
);
