The `Switcher` component is designed to have `SwitcherItem` components as its
direct children. However, there may be cases where you want to use React
Fragments or other nested structures within the `Switcher`. To accommodate we
recommend using the [`react-keyed-flatten-children`]
(https://www.npmjs.com/package/react-keyed-flatten-children#react-keyed-flatten-children)
package.

### Using react-keyed-flatten-children

The `react-keyed-flatten-children` package allows you to flatten arrays and
React Fragments into a regular, one-dimensional array while preserving element
and fragment keys.

1. Install the package:

   ```
   npm install react-keyed-flatten-children
   ```

2. Import and use in your component:

   ```jsx
   import flattenChildren from 'react-keyed-flatten-children';

   const YourComponent = () => (
     <Switcher>
       {flattenChildren(
         <>
           <SwitcherItem>Item 1</SwitcherItem>
           <SwitcherItem>Item 2</SwitcherItem>
           <>
             <SwitcherItem>Item 3</SwitcherItem>
             <SwitcherItem>Item 4</SwitcherItem>
           </>
         </>
       )}
     </Switcher>
   );
   ```

This approach allows you to use Fragments and nested structures with components
like `<Switcher>` without modifying their source code. It preserves keys and
props, ensuring stable rendering across updates.
