import React from 'react';
import { TileGroup, Tile, Stack } from '@carbon/react';
import { FeatureFlags } from '@carbon/feature-flags';

const TestComponent: React.FC = () => {
  return (
    //prettier-ignore
    <div>
      {/* Case 1: Unwrapped TileGroup */}
      <TileGroup legend="TestGroup" name="test">
        <Tile id="test-1">Option 1</Tile>
        <Tile id="test-2">Option 2</Tile>
      </TileGroup>

      {/* Wrapped standalone missing flag prop */}
      <FeatureFlags>
        <TileGroup legend="Missing Attribute" name="wrapped">
          <Tile id="wrapped-1">Already Wrapped Option 1</Tile>
          <Tile id="wrapped-2">Already Wrapped Option 2</Tile>
          <Tile id="wrapped-3">Already Wrapped Option 3</Tile>
        </TileGroup>
      </FeatureFlags>

      {/* Case 3: Already wrapped with other flags */}
      <FeatureFlags enable-v12-tile-radio-icons>
        <TileGroup legend="Other Attribute" name="other-wrapped">
          <Tile id="other-1">Other Flag Option 1</Tile>
        </TileGroup>
      </FeatureFlags>

      {/* Case 4: Already wrapped with correct flag */}
      <FeatureFlags enableV12TileDefaultIcons>
        <TileGroup legend="Correct Wrapped" name="correct">
          <Tile id="correct-1">Correctly Wrapped Option</Tile>
        </TileGroup>
      </FeatureFlags>

      {/* Case 5: Standalone Tiles with different scenarios */}
      <Stack>
        {/* Unwrapped standalone */}
        <Tile id="standalone">Standalone Tile</Tile>

        {/* Wrapped standalone missing flag prop */}
        <FeatureFlags>
          <Tile id="wrapped-standalone">Wrapped Standalone</Tile>
        </FeatureFlags>

        {/* Wrapped standalone with other flag */}
        <FeatureFlags enable-v12-tile-radio-icons>
          <Tile id="other-standalone">Other Flag Standalone</Tile>
        </FeatureFlags>

        {/* Correctly wrapped standalone */}
        <FeatureFlags enableV12TileDefaultIcons>
          <Tile id="correct-standalone">Correct Standalone</Tile>
        </FeatureFlags>
      </Stack>

      {/* Case 6: Nested structures */}
      <div className="nested">
        <TileGroup legend="Nested Group" name="nested">
          <div className="wrapper">
            <Tile id="nested-1">Nested Option 1</Tile>
          </div>
          <Tile id="nested-2">Nested Option 2</Tile>
        </TileGroup>
      </div>
    </div>
  );
};

export default TestComponent;
