import React from 'react';
import { OverflowMenu, Button, FeatureFlags } from '@carbon/react';

function TestComponent() {
  return (
    <div>
      {/* Basic OverflowMenu */}
      <FeatureFlags enableV12Overflowmenu>
        <OverflowMenu>
          <OverflowMenu.Item>Option 1</OverflowMenu.Item>
          <OverflowMenu.Item>Option 2</OverflowMenu.Item>
        </OverflowMenu>
      </FeatureFlags>

      {/* With spread props */}
      <FeatureFlags enableV12Overflowmenu>
        <OverflowMenu {...menuProps} />
      </FeatureFlags>

      {/* With explicit props */}
      <FeatureFlags enableV12Overflowmenu>
        <OverflowMenu direction="top" size="lg">
          <OverflowMenu.Item>Another option</OverflowMenu.Item>
        </OverflowMenu>
      </FeatureFlags>

      {/* Already wrapped - should not be modified */}
      <FeatureFlags enableV12Overflowmenu>
        <OverflowMenu>
          <OverflowMenu.Item>Existing wrapped</OverflowMenu.Item>
        </OverflowMenu>
      </FeatureFlags>

      {/* Other components should be unaffected */}
      <Button>Normal button</Button>

    </div>
  );
}

export default TestComponent;