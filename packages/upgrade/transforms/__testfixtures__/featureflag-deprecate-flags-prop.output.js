import { FeatureFlags } from '../FeatureFlags';
import {
  RadioTile,
  TileGroup,
  TreeView,
  VStack,
  TreeNode,
  OverflowMenu,
  MenuItem,
} from '@carbon/react';
import { Document, Folder } from '@carbon/icons-react';
export const EnableV12TileDefaultIconsFlag = () => {
  return (
    (<FeatureFlags enableV12TileDefaultIcons>
      <TileGroup legend="TestGroup" name="test">
        <RadioTile id="test-1" value="test-1">
          Option 1
        </RadioTile>
        <RadioTile id="test-2" value="test-2">
          Option 2
        </RadioTile>
      </TileGroup>
    </FeatureFlags>)
  );
};
export const EnableExperimentalFocusWrapWithoutSentinels = () => {
  return (
    // prettier-ignore
    (<FeatureFlags enableExperimentalFocusWrapWithoutSentinels>
      <ActionableNotification
        title="Notification title"
        subtitle="Subtitle text goes here"
        closeOnEscape
        inline={false}
        actionButtonLabel="Action"
      />
    </FeatureFlags>)
  );
};
export const EnableTreeviewControllable = (args) => {
  return (
    (<div>
      <FeatureFlags enableTreeviewControllable>
        <TreeView
          label="Tree View"
          active={true}
          onActivate={() => {
            console.log('test');
          }}
          selected={[]}
          onSelect={() => {
            console.log('test');
          }}>
          {renderTree(nodes)}
        </TreeView>
      </FeatureFlags>
    </div>)
  );
};
export const EnableV12Overflowmenu = () => {
  return (
    (<FeatureFlags enableV12Overflowmenu>
      <OverflowMenu autoAlign={true}>
        <MenuItem label="Stop app" />
        <MenuItem label="Restart app" />
        <MenuItem label="Rename app" />
        <MenuItem label="Edit routes and access" />

        <MenuItem label="Delete app" kind="danger" />
      </OverflowMenu>
    </FeatureFlags>)
  );
};
export const EnableV12TileRadioIcons = () => {
  return (
    (<FeatureFlags enableV12TileRadioIcons>
      <TileGroup legend="TestGroup" name="test">
        <RadioTile id="test-1" value="test-1">
          Option 1
        </RadioTile>
        <RadioTile id="test-2" value="test-2">
          Option 2
        </RadioTile>
      </TileGroup>
    </FeatureFlags>)
  );
};
export const TestRegularJsx = () => {
  return <div className={wrapperClasses}></div>;
};
export const CombinedFlags = () => {
  return (
    // prettier-ignore
    (<FeatureFlags
      enableV12TileDefaultIcons
      enableV12TileRadioIcons
      enableV12Overflowmenu
      enableTreeviewControllable
      enableExperimentalFocusWrapWithoutSentinels>
      <TileGroup legend="TestGroup" name="test">
        <RadioTile id="test-1" value="test-1">
          Option 1
        </RadioTile>
        <RadioTile id="test-2" value="test-2">
          Option 2
        </RadioTile>
      </TileGroup>
    </FeatureFlags>)
  );
};
export const OldFlags = () => {
  return (
    (<FeatureFlags>
      <TileGroup legend="TestGroup" name="test">
        <RadioTile id="test-1" value="test-1">
          Option 1
        </RadioTile>
        <RadioTile id="test-2" value="test-2">
          Option 2
        </RadioTile>
      </TileGroup>
    </FeatureFlags>)
  );
};
