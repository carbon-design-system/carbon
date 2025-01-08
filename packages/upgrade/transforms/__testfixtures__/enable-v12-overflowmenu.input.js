// Input: enable-v12-overflowmenu.input.js
import React from 'react';
import { OverflowMenu, Button, FeatureFlags } from '@carbon/react';

function TestComponent() {
  return (
    // prettier-ignore
    <div>
      {/* Basic OverflowMenu */}
        <OverflowMenu>
          <OverflowMenu.Item>Option 1</OverflowMenu.Item>
          <OverflowMenu.Item>Option 2</OverflowMenu.Item>
        </OverflowMenu>
      {/* With spread props */}
        <OverflowMenu {...menuProps} />
      {/* With explicit props */}
        <OverflowMenu direction="top" size="lg">
          <OverflowMenu.Item>Another option</OverflowMenu.Item>
        </OverflowMenu>
      {/* Already wrapped - should not be modified */}
        <OverflowMenu>
          <OverflowMenu.Item>Existing wrapped</OverflowMenu.Item>
        </OverflowMenu>
      {/* Other components should be unaffected */}
      <Button>Normal button</Button>
    </div>
  );
}

export default TestComponent;
