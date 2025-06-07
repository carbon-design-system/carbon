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
    <FeatureFlags flags={{ 'enable-v12-tile-default-icons': true }}>
      <TileGroup legend="TestGroup" name="test">
        <RadioTile id="test-1" value="test-1">
          Option 1
        </RadioTile>
        <RadioTile id="test-2" value="test-2">
          Option 2
        </RadioTile>
      </TileGroup>
    </FeatureFlags>
  );
};
export const EnableExperimentalFocusWrapWithoutSentinels = () => {
  return (
    // prettier-ignore
    <FeatureFlags flags={{ 'enable-experimental-focus-wrap-without-sentinels': true }}>
      <ActionableNotification
        title="Notification title"
        subtitle="Subtitle text goes here"
        closeOnEscape
        inline={false}
        actionButtonLabel="Action"
      />
    </FeatureFlags>
  );
};
export const EnableTreeviewControllable = (args) => {
  return (
    <div>
      <FeatureFlags flags={{ 'enable-treeview-controllable': true }}>
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
    </div>
  );
};
export const EnableV12Overflowmenu = () => {
  return (
    <FeatureFlags flags={{ 'enable-v12-overflowmenu': true }}>
      <OverflowMenu autoAlign={true}>
        <MenuItem label="Stop app" />
        <MenuItem label="Restart app" />
        <MenuItem label="Rename app" />
        <MenuItem label="Edit routes and access" />

        <MenuItem label="Delete app" kind="danger" />
      </OverflowMenu>
    </FeatureFlags>
  );
};
export const EnableV12TileRadioIcons = () => {
  return (
    <FeatureFlags flags={{ 'enable-v12-tile-radio-icons': true }}>
      <TileGroup legend="TestGroup" name="test">
        <RadioTile id="test-1" value="test-1">
          Option 1
        </RadioTile>
        <RadioTile id="test-2" value="test-2">
          Option 2
        </RadioTile>
      </TileGroup>
    </FeatureFlags>
  );
};
export const TestRegularJsx = () => {
  return <div className={wrapperClasses}></div>;
};
export const CombinedFlags = () => {
  return (
    // prettier-ignore
    <FeatureFlags
      flags={{
        'enable-v12-tile-default-icons': true,
        'enable-v12-tile-radio-icons': true,
        'enable-v12-overflowmenu': true,
        'enable-treeview-controllable': true,       
        'enable-experimental-focus-wrap-without-sentinels': true,
        'enable-v11-release': true,
        'enable-css-custom-properties': true,
        'enable-css-grid': true,
      }}>
      <TileGroup legend="TestGroup" name="test">
        <RadioTile id="test-1" value="test-1">
          Option 1
        </RadioTile>
        <RadioTile id="test-2" value="test-2">
          Option 2
        </RadioTile>
      </TileGroup>
    </FeatureFlags>
  );
};
export const OldFlags = () => {
  return (
    <FeatureFlags
      flags={{
        'enable-v11-release': true,
        'enable-css-custom-properties': true,
        'enable-css-grid': true,
      }}>
      <TileGroup legend="TestGroup" name="test">
        <RadioTile id="test-1" value="test-1">
          Option 1
        </RadioTile>
        <RadioTile id="test-2" value="test-2">
          Option 2
        </RadioTile>
      </TileGroup>
    </FeatureFlags>
  );
};
