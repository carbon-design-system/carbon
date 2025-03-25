//prettier-ignore
import React from 'react';
import { OverflowMenu, OverflowMenuItem, MenuItem, MenuItemDivider, Button } from '@carbon/react';
import { FeatureFlags } from '@carbon/feature-flags';

function TestComponent({ menuProps }) {
 return (  
   (<div>
     {/* Old API usage with props - transformed */}
     <FeatureFlags enableV12Overflowmenu>
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
     </FeatureFlags>

     {/* Old API with spread props */}
     <FeatureFlags enableV12Overflowmenu>
       <OverflowMenu {...menuProps}>
         <MenuItem label="Dynamic item" />
         <MenuItemDivider />
         <MenuItem label="Remove" kind="danger" />
       </OverflowMenu>
     </FeatureFlags>

      {/* Already using new API - should not be transformed */}
     <FeatureFlags enableV12Overflowmenu>
       <OverflowMenu label="Already migrated">
         <MenuItem label="Option 1" />
         <MenuItemDivider />
         <MenuItem label="Delete" kind="danger" />
       </OverflowMenu>
     </FeatureFlags>

     {/* Other components - unchanged */}
     <Button>Normal button</Button>
   </div>)
 );
}

export default TestComponent;