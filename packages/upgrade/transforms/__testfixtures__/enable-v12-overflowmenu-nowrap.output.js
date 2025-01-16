// Output: enable-v12-overflowmenu.output.js
import React from 'react';
import { OverflowMenu, OverflowMenuItem, MenuItem, MenuItemDivider, Button } from '@carbon/react';
import { FeatureFlags } from '@carbon/feature-flags';

function TestComponent({ menuProps }) {
 return (
   <div>
     {/* Old API usage with props - transformed */}
       <OverflowMenu 
         label="overflow-menu"
         align="bottom"
         flipped={true}
         light={true}
         size="xl"
       >
         <MenuItem 
           className="test-class" 
           label="Stop app" 
           disabled={false}
           onClick={() => {}}
         />
         <MenuItem label="Restart app" />
         <MenuItemDivider />
         <MenuItem label="Delete app" kind="danger" />
       </OverflowMenu>

     {/* Old API with spread props */}
       <OverflowMenu {...menuProps}>
         <MenuItem label="Dynamic item" />
         <MenuItemDivider />
         <MenuItem label="Remove" kind="danger" />
       </OverflowMenu>

      {/* Already using new API - should not be transformed */}
       <OverflowMenu label="Already migrated">
         <MenuItem label="Option 1" />
         <MenuItemDivider />
         <MenuItem label="Delete" kind="danger" />
       </OverflowMenu>

     {/* Other components - unchanged */}
     <Button>Normal button</Button>
   </div>
 );
}

export default TestComponent;