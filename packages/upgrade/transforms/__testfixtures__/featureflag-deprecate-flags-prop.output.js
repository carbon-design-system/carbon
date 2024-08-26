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
    <FeatureFlags enableV12TileDefaultIcons>
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
    <FeatureFlags enableExperimentalFocusWrapWithoutSentinels>
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
  const [selected, setSelected] = useState([]);
  const [active, setActive] = useState(null);
  const nodes = [
    {
      id: '1',
      value: 'Artificial intelligence',
      label: <span>Artificial intelligence</span>,
      renderIcon: Document,
    },
    {
      id: '2',
      value: 'Blockchain',
      label: 'Blockchain',
      renderIcon: Document,
    },
    {
      id: '3',
      value: 'Business automation',
      label: 'Business automation',
      renderIcon: Folder,
      children: [
        {
          id: '3-1',
          value: 'Business process automation',
          label: 'Business process automation',
          renderIcon: Document,
        },
        {
          id: '3-2',
          value: 'Business process mapping',
          label: 'Business process mapping',
          renderIcon: Document,
        },
      ],
    },
    {
      id: '4',
      value: 'Business operations',
      label: 'Business operations',
      renderIcon: Document,
    },
    {
      id: '5',
      value: 'Cloud computing',
      label: 'Cloud computing',
      isExpanded: true,
      renderIcon: Folder,
      children: [
        {
          id: '5-1',
          value: 'Containers',
          label: 'Containers',
          renderIcon: Document,
        },
        {
          id: '5-2',
          value: 'Databases',
          label: 'Databases',
          renderIcon: Document,
        },
        {
          id: '5-3',
          value: 'DevOps',
          label: 'DevOps',
          isExpanded: true,
          renderIcon: Folder,
          children: [
            {
              id: '5-4',
              value: 'Solutions',
              label: 'Solutions',
              renderIcon: Document,
            },
            {
              id: '5-5',
              value: 'Case studies',
              label: 'Case studies',
              isExpanded: true,
              renderIcon: Folder,
              children: [
                {
                  id: '5-6',
                  value: 'Resources',
                  label: 'Resources',
                  renderIcon: Document,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: '6',
      value: 'Data & Analytics',
      label: 'Data & Analytics',
      renderIcon: Folder,
      children: [
        {
          id: '6-1',
          value: 'Big data',
          label: 'Big data',
          renderIcon: Document,
        },
        {
          id: '6-2',
          value: 'Business intelligence',
          label: 'Business intelligence',
          renderIcon: Document,
        },
      ],
    },
    {
      id: '7',
      value: 'Models',
      label: 'Models',
      isExpanded: true,
      disabled: true,
      renderIcon: Folder,
      children: [
        {
          id: '7-1',
          value: 'Audit',
          label: 'Audit',
          renderIcon: Document,
        },
        {
          id: '7-2',
          value: 'Monthly data',
          label: 'Monthly data',
          renderIcon: Document,
        },
        {
          id: '8',
          value: 'Data warehouse',
          label: 'Data warehouse',
          isExpanded: true,
          renderIcon: Folder,
          children: [
            {
              id: '8-1',
              value: 'Report samples',
              label: 'Report samples',
              renderIcon: Document,
            },
            {
              id: '8-2',
              value: 'Sales performance',
              label: 'Sales performance',
              renderIcon: Document,
            },
          ],
        },
      ],
    },
  ];
  function renderTree(nodes) {
    if (!nodes) {
      return;
    }

    return nodes.map(({ children, isExpanded, ...nodeProps }) => (
      <TreeNode
        key={nodeProps.id}
        defaultIsExpanded={isExpanded}
        {...nodeProps}>
        {renderTree(children)}
      </TreeNode>
    ));
  }

  return (
    <VStack gap={6}>
      <VStack gap={2}>
        <Button
          kind="tertiary"
          size="sm"
          onClick={() => {
            setSelected(['5-2']);
          }}>
          Select &quot;Databases&quot;
        </Button>
        <Button
          kind="tertiary"
          size="sm"
          onClick={() => {
            setActive('5-2');
          }}>
          Activate &quot;Databases&quot;
        </Button>
      </VStack>
      <div>
        <FeatureFlags enableTreeviewControllable>
          <TreeView
            label="Tree View"
            {...args}
            active={active}
            onActivate={setActive}
            selected={selected}
            onSelect={setSelected}>
            {renderTree(nodes)}
          </TreeView>
        </FeatureFlags>
      </div>
    </VStack>
  );
};
export const EnableV12Overflowmenu = () => {
  return (
    <FeatureFlags enableV12Overflowmenu>
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
    <FeatureFlags enableV12TileRadioIcons>
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
export const Test = () => {
  return <div className={wrapperClasses}></div>;
};
