/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
// @ts-nocheck
import React from 'react';
import {
  // ClickableTile,
  // ExpandableTile,
  // SelectableTile,
  Tile,
  // TileAboveTheFoldContent,
  // TileBelowTheFoldContent,
} from '@carbon/react';
import figma from '@figma/code-connect';

figma.connect(
  Tile,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/-v11--Carbon-Design-System?node-id=20125-279432&m=dev',
  {
    props: {
      // TODO: Re-enable these props when Code Connect validation bug is fixed
      // Properties exist in Figma but fail validation despite correct names:
      // https://github.com/carbon-design-system/carbon/issues/20089
      // titleText: figma.string('Title text'),
      // descriptionText: figma.string('Description text'),
      // slot: figma.boolean('Slot'),
      // title: figma.boolean('Title'),
      // description: figma.boolean('Description'),
      swapSlot: figma.instance('Swap slot'),
    },
    example: ({ swapSlot }) => (
      <Tile>
        {/* See https://react.carbondesignsystem.com/?path=/docs/components-tile--overview
            for complete prop mapping. Other properties commented out due to
            Code Connect CLI validation bug - properties exist in Figma but fail validation. */}
        {swapSlot}
      </Tile>
    ),
  }
);

// figma.connect(
//   Tile,
//   'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=20125-279432&m=dev',
//   {
//     // variant: { Type: 'Base' },
//     props: {
//       swapslot: figma.instance('Swap slot'),
//       // descriptiontext: figma.string('Description text'),
//       // titletext: figma.string('Title text'),
//       // disabled: figma.enum('State', {
//       //   Disabled: true,
//       // }),
//     },
//     example: ({ swapslot }) => (
//       <Tile>
//         {/* {titletext}
//         <br />
//         {descriptiontext} */}
//         {swapslot}
//       </Tile>
//     ),
//   }
// );

// figma.connect(
//   ClickableTile,
//   'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=20125-279432&m=dev',
//   {
//     variant: { Type: 'Clickable' },
//     props: {
//       swapslot: figma.instance('Swap slot'),
//       descriptiontext: figma.string('Description text'),
//       titletext: figma.string('Title text'),
//       disabled: figma.enum('State', {
//         Disabled: true,
//       }),
//     },
//     example: ({ disabled, titletext, swapslot, descriptiontext }) => (
//       <ClickableTile disabled={disabled}>
//         {titletext}
//         <br />
//         {descriptiontext}
//         {swapslot}
//       </ClickableTile>
//     ),
//   }
// );

// figma.connect(
//   SelectableTile,
//   'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=20125-279432&m=dev',
//   {
//     variant: { Type: 'Single-select' },
//     props: {
//       swapslot: figma.instance('Swap slot'),
//       descriptiontext: figma.string('Description text'),
//       titletext: figma.string('Title text'),
//       disabled: figma.enum('State', {
//         Disabled: true,
//       }),
//       selected: figma.boolean('Selected'),
//     },
//     example: ({ disabled, titletext, swapslot, descriptiontext, selected }) => (
//       <SelectableTile disabled={disabled} selected={selected}>
//         {titletext}
//         <br />
//         {descriptiontext}
//         {swapslot}
//       </SelectableTile>
//     ),
//   }
// );

// figma.connect(
//   SelectableTile,
//   'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=20125-279432&m=dev',
//   {
//     variant: { Type: 'Multi-select' },
//     props: {
//       swapslot: figma.instance('Swap slot'),
//       descriptiontext: figma.string('Description text'),
//       titletext: figma.string('Title text'),
//       disabled: figma.enum('State', {
//         Disabled: true,
//       }),
//       selected: figma.boolean('Selected'),
//     },
//     example: ({ disabled, titletext, swapslot, descriptiontext, selected }) => (
//       <SelectableTile disabled={disabled} selected={selected}>
//         {titletext}
//         <br />
//         {descriptiontext}
//         {swapslot}
//       </SelectableTile>
//     ),
//   }
// );

// figma.connect(
//   ExpandableTile,
//   'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=20125-279432&m=dev',
//   {
//     variant: { Type: 'Expandable' },
//     props: {
//       descriptiontext: figma.string('Description text'),
//       titletext: figma.string('Title text'),
//     },
//     example: ({ titletext, descriptiontext }) => (
//       <ExpandableTile
//         tileCollapsedIconText="Interact to Expand tile"
//         tileExpandedIconText="Interact to Collapse tile">
//         <TileAboveTheFoldContent>
//           <div style={{ height: '200px' }}>
//             {titletext}
//             <br />
//             {descriptiontext}
//           </div>
//         </TileAboveTheFoldContent>
//         <TileBelowTheFoldContent>
//           <div style={{ height: '400px' }}>Below the fold content here</div>
//         </TileBelowTheFoldContent>
//       </ExpandableTile>
//     ),
//   }
// );

// figma.connect(
//   ExpandableTile,
//   'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=20125-279432&m=dev',
//   {
//     variant: { Type: 'Expandable (Interactive)' },
//     props: {
//       swapslot: figma.instance('Swap slot'),
//       descriptiontext: figma.string('Description text'),
//       titletext: figma.string('Title text'),
//     },
//     example: ({ titletext, descriptiontext }) => (
//       <ExpandableTile
//         // eslint-disable-next-line no-console -- https://github.com/carbon-design-system/carbon/issues/20071
//         onClick={() => console.log('click')}
//         tileCollapsedIconText="Interact to Expand tile"
//         tileExpandedIconText="Interact to Collapse tile">
//         <TileAboveTheFoldContent>
//           <div style={{ height: '200px' }}>
//             {titletext}
//             <br />
//             {descriptiontext}
//             {swapslot}
//           </div>
//         </TileAboveTheFoldContent>
//         <TileBelowTheFoldContent>
//           <div style={{ height: '400px' }}>Below the fold content here</div>
//         </TileBelowTheFoldContent>
//       </ExpandableTile>
//     ),
//   }
// );
