import React from 'react';
import { TileGroup, RadioTile, Stack } from '@carbon/react';
import { FeatureFlags } from '@carbon/feature-flags';

function TestComponent() {
  return (
    //prettier-ignore
    <div>
      {/* Case 1: Unwrapped TileGroup */}
      <TileGroup legend="TestGroup" name="test">
        <RadioTile id="test-1" value="test-1">
          Option 1
        </RadioTile>
        <RadioTile id="test-2" value="test-2">
          Option 2
        </RadioTile>
      </TileGroup>
      {/* Wrapped standalone missing flag prop */}
      <FeatureFlags>
        <TileGroup legend="Missing Attribute" name="wrapped">
          <RadioTile id="wrapped-1" value="wrapped-1">
            Already Wrapped Option 1
          </RadioTile>
          <RadioTile id="wrapped-2" value="wrapped-2">
            Already Wrapped Option 2
          </RadioTile>
        </TileGroup>
      </FeatureFlags>
      {/* Case 3: Already wrapped with other attributes */}
      <FeatureFlags enable-v12-tile-default-icons>
        <TileGroup legend="Other Attribute" name="other-wrapped">
          <RadioTile id="other-1" value="other-1">
            Other Flag Option 1
          </RadioTile>
        </TileGroup>
      </FeatureFlags>
      {/* Case 4: Already wrapped with correct attribute */}
      <FeatureFlags enableV12TileRadioIcons>
        <TileGroup legend="Correct Wrapped" name="correct">
          <RadioTile id="correct-1" value="correct-1">
            Correctly Wrapped Option
          </RadioTile>
        </TileGroup>
      </FeatureFlags>
      {/* Case 5: Standalone RadioTiles with different scenarios */}
      <Stack>
        {/* Unwrapped standalone */}
        <RadioTile id="standalone" value="standalone">
          Standalone Tile
        </RadioTile>
        {/* Wrapped standalone missing flag prop */}
        <FeatureFlags>
          <RadioTile id="wrapped-standalone" value="wrapped-standalone">
            Wrapped Standalone
          </RadioTile>
        </FeatureFlags>
        {/* Wrapped standalone with other flag */}
        <FeatureFlags enable-v12-tile-default-icons>
          <RadioTile id="other-standalone" value="other-standalone">
            Other Flag Standalone
          </RadioTile>
        </FeatureFlags>
        {/* Correctly wrapped standalone */}
        <FeatureFlags enableV12TileRadioIcons>
          <RadioTile id="correct-standalone" value="correct-standalone">
            Correct Standalone
          </RadioTile>
        </FeatureFlags>
      </Stack>
      {/* Case 6: Nested structures */}
      <div className="nested">
        <TileGroup legend="Nested Group" name="nested">
          <div className="wrapper">
            <RadioTile id="nested-1" value="nested-1">
              Nested Option 1
            </RadioTile>
          </div>
          <RadioTile id="nested-2" value="nested-2">
            Nested Option 2
          </RadioTile>
        </TileGroup>
      </div>
    </div>
  );
}

export default TestComponent;
