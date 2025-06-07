import React from 'react';
import { TileGroup, Tile, Stack } from '@carbon/react';
import { FeatureFlags } from '@carbon/feature-flags';

function TestComponent() {
  return (
    (<div>
      {/* Case 1: Unwrapped TileGroup */}
      <FeatureFlags enableV12TileDefaultIcons><TileGroup legend="TestGroup" name="test">
          <Tile>
            Option 1
          </Tile>
          <Tile>
            Option 2
          </Tile>
        </TileGroup></FeatureFlags>
      {/* Wrapped standalone missing flag prop */}
      <FeatureFlags enableV12TileDefaultIcons>
        <TileGroup legend="Missing Attribute" name="wrapped">
          <Tile>
            Already Wrapped Option 1
          </Tile>
          <Tile>
            Already Wrapped Option 2
          </Tile>
        </TileGroup>
      </FeatureFlags>
      {/* Case 3: Already wrapped with other attributes */}
      <FeatureFlags enable-v12-tile-radio-icons enableV12TileDefaultIcons>
        <TileGroup legend="Other Attribute" name="other-wrapped">
          <Tile>
            Other Flag Option 1
          </Tile>
        </TileGroup>
      </FeatureFlags>
      {/* Case 4: Already wrapped with correct attribute */}
      <FeatureFlags enableV12TileDefaultIcons>
        <TileGroup legend="Correct Wrapped" name="correct">
          <Tile>
            Correctly Wrapped Option
          </Tile>
        </TileGroup>
      </FeatureFlags>
      {/* Case 5: Standalone Tiles with different scenarios */}
      <Stack>
        {/* Unwrapped standalone */}
        <FeatureFlags enableV12TileDefaultIcons><Tile>
            Standalone Tile
          </Tile></FeatureFlags>

        {/* Wrapped standalone missing flag prop */}
        <FeatureFlags enableV12TileDefaultIcons>
          <Tile>
            Wrapped Standalone
          </Tile>
        </FeatureFlags>

        {/* Wrapped standalone with other flag */}
        <FeatureFlags enable-v12-tile-radio-icons enableV12TileDefaultIcons>
          <Tile>
            Other Flag Standalone
          </Tile>
        </FeatureFlags>

        {/* Correctly wrapped standalone */}
        <FeatureFlags enableV12TileDefaultIcons>
          <Tile>
            Correct Standalone
          </Tile>
        </FeatureFlags>
      </Stack>
      {/* Case 6: Nested structures */}
      <div className="nested">
        <FeatureFlags enableV12TileDefaultIcons><TileGroup legend="Nested Group" name="nested">
            <div className="wrapper">
              <Tile>
                Nested Option 1
              </Tile>
            </div>
            <Tile>
              Nested Option 2
            </Tile>
          </TileGroup></FeatureFlags>
      </div>
    </div>)
  );
}

export default TestComponent;