/**
 * Copyright IBM Corp. 2020, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import styles from './_storybook-styles.scss?inline';
import React, { useRef, useState } from 'react';
import { action } from 'storybook/actions';
import {
  Button,
  TextArea,
  TextInput,
  MultiSelect,
  DataTable,
  Table,
  TableHeader,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Header,
  HeaderContainer,
  HeaderName,
  AILabel,
  AILabelContent,
} from '@carbon/react';

import { Copy, TrashCan, Settings } from '@carbon/react/icons';
import { SidePanel } from './SidePanel';
import { sidePanelDecorator } from '../../global/decorators/sidePanelDecorator';
import DocsPage from './SidePanel.docs-page';
import { renderTrigger } from '../../global/js/utils/story-helper';

const prefix = 'side-panel-stories__';

const defaultStoryProps = {
  title:
    'Incident management for your application, testing a very long title to see how this behaves with a longer title',
  subtitle: (
    <>
      This is some text that would talk about how you could{' '}
      <strong>investigate</strong> incident management within this side panel.
    </>
  ),
  id: 'storybook-sidepanel',
  size: 'md',
  placement: 'right',
};

const headerData = [
  { id: 1, header: 'Column header', key: 'value' },
  { id: 2, header: 'Column header', key: 'value' },
];

const rowData = [
  {
    id: 'a',
    value: 'Cell text a',
  },
  {
    id: 'b',
    value: 'Cell text b',
  },
  {
    id: 'c',
    value: 'Cell text c',
  },
  {
    id: 'd',
    value: 'Cell text d',
  },
  {
    id: 'e',
    value: 'Cell text d',
  },
  {
    id: 'f',
    value: 'Cell text f',
  },
  {
    id: 'g',
    value: 'Cell text g',
  },
  {
    id: 'h',
    value: 'Cell text h',
  },
];

const actions_1 = [
  {
    label: 'Submit',
    onClick: action('Clicked action button'),
    kind: 'primary',
  },
];

const actions_2 = [
  {
    label: 'Ghost button',
    onClick: action('Clicked action button'),
    kind: 'ghost',
  },
];

const actions_3 = [
  {
    label: 'Danger button',
    onClick: action('Clicked action button'),
    kind: 'danger',
  },
];

const actions_4 = [
  {
    label: 'Submit',
    onClick: action('Clicked action button'),
    kind: 'primary',
  },
  {
    label: 'Cancel',
    onClick: action('Clicked action button'),
    kind: 'secondary',
  },
];

const actions_5 = [
  {
    label: 'Ghost button',
    onClick: action('Clicked action button'),
    kind: 'ghost',
  },
  {
    label: 'Submit',
    onClick: action('Clicked action button'),
    kind: 'primary',
  },
];

const actions_6 = [
  {
    label: 'Ghost button',
    onClick: action('Clicked action button'),
    kind: 'ghost',
  },
  {
    label: 'Danger button',
    onClick: action('Clicked action button'),
    kind: 'danger',
  },
];

const actions_7 = [
  {
    label: 'Submit',
    onClick: action('Clicked action button'),
    kind: 'primary',
  },
  {
    label: 'Cancel',
    onClick: action('Clicked action button'),
    kind: 'secondary',
  },
  {
    label: 'Ghost button',
    onClick: action('Clicked action button'),
    kind: 'ghost',
  },
];

const actions_8 = [
  {
    label: 'Cancel',
    onClick: action('Clicked action button'),
    kind: 'secondary',
  },
  {
    label: 'Cancel',
    onClick: action('Clicked action button'),
    kind: 'secondary',
  },
  {
    label: 'Danger button',
    onClick: action('Clicked action button'),
    kind: 'danger',
  },
];

const actions_9 = [
  {
    label: 'Submit',
    onClick: action('Clicked action button'),
    kind: 'primary',
  },
  {
    label: 'Cancel',
    onClick: action('Clicked action button'),
    kind: 'secondary',
  },
  {
    label: 'Cancel',
    onClick: action('Clicked action button'),
    kind: 'secondary',
  },
];

const toolbarItem_1 = [
  {
    leading: true,
    label: 'Copy',
    icon: (props) => <Copy size={16} {...props} />,
    onClick: action('Toolbar button clicked: Copy'),
    kind: 'primary',
  },
];

const toolbarItem_2 = [
  {
    leading: true,
    label: 'Copy',
    icon: (props) => <Copy size={16} {...props} />,
    onClick: action('Toolbar button clicked: Copy'),
    kind: 'primary',
  },
  {
    label: 'Settings',
    icon: (props) => <Settings size={16} {...props} />,
    onClick: action('Toolbar button clicked: Settings'),
    hasIconOnly: true,
  },
];

const toolbarItem_3 = [
  {
    leading: true,
    label: 'Copy',
    icon: (props) => <Copy size={16} {...props} />,
    onClick: action('Toolbar button clicked: Copy'),
    kind: 'primary',
  },
  {
    label: 'Settings',
    icon: (props) => <Settings size={16} {...props} />,
    onClick: action('Toolbar button clicked: Settings'),
    hasIconOnly: true,
  },
  {
    label: 'Delete',
    icon: (props) => <TrashCan size={16} {...props} />,
    onClick: action('Toolbar button clicked: Delete'),
    hasIconOnly: true,
  },
];

const toolbarActions = [null, toolbarItem_1, toolbarItem_2, toolbarItem_3];

const actionSets = [
  actions_1,
  actions_2,
  actions_3,
  actions_4,
  actions_5,
  actions_6,
  actions_7,
  actions_8,
  actions_9,
  [],
];

const sampleAILabel = (
  <AILabel className="aiLabel-container" size="xs" align="bottom">
    <AILabelContent>
      <div>
        <p className="secondary">AI Explained</p>
        <h1>84%</h1>
        <p className="secondary bold">Confidence score</p>
        <p className="secondary">
          This is not really Lorem Ipsum but the spell checker did not like the
          previous text with it&apos;s non-words which is why this unwieldy
          sentence, should one choose to call it that, here.
        </p>
        <hr />
        <p className="secondary">Model type</p>
        <p className="bold">Foundation model</p>
      </div>
    </AILabelContent>
  </AILabel>
);

// eslint-disable-next-line react/prop-types
const ChildrenContent = () => {
  const [notesValue, setNotesValue] = useState('');
  return (
    <div className={`${prefix}body-content`}>
      <h3 className={`${prefix}body-subheading`}>Section</h3>
      <div className={`${prefix}text-inputs`}>
        <TextInput
          labelText="Input A"
          id="side-panel-story-text-input-a"
          className={`${prefix}text-input`}
        />
        <TextInput
          labelText="Input B"
          id="side-panel-story-text-input-b"
          className={`${prefix}text-input`}
        />
      </div>
      <div className={`${prefix}text-inputs`}>
        <TextInput
          labelText="Input C"
          id="side-panel-story-text-input-c"
          className={`${prefix}text-input`}
        />
        <TextInput
          labelText="Input D"
          id="side-panel-story-text-input-d"
          className={`${prefix}text-input`}
        />
      </div>
      <div className={`${prefix}multi-select-container`}>
        <MultiSelect
          data-testid="alert--subtype--transfer--secondary-zones"
          id="multiselectA"
          titleText="Multiselect A"
          label="Select an item"
          items={[
            {
              value: 'all',
              label: 'Multiselect A',
            },
          ]}
          selectionFeedback="top-after-reopen"
        />
      </div>
      <div className={`${prefix}text-area-container`}>
        <span
          className={[
            `${prefix}allowed-characters`,
            `${
              notesValue.length > 100
                ? `${prefix}allowed-characters-invalid`
                : null
            }`,
          ].join(' ')}
        >
          {notesValue.length}/100
        </span>
        <TextArea
          id="side-panel-textarea"
          className={`${prefix}text-area`}
          labelText="Notes"
          value={notesValue}
          onChange={(event) => setNotesValue(event.target.value)}
        />
      </div>
      <h3 className={`${prefix}content-subtitle ${prefix}body-subheading`}>
        Section
      </h3>
      {renderDataTable()}
    </div>
  );
};

// eslint-disable-next-line react/prop-types
const ChildrenContentWithSteps = ({ currentStep, setCurrentStep }) => {
  return (
    <>
      {currentStep === 0 && (
        <div className={`${prefix}body-content`}>
          <h3 className={`${prefix}content-subtitle ${prefix}body-subheading`}>
            Main view
          </h3>
          {renderDataTable()}
          <Button
            kind="tertiary"
            onClick={() => setCurrentStep((prev) => prev + 1)}
          >
            View all
          </Button>
        </div>
      )}
      {currentStep === 1 && (
        <div className={`${prefix}body-content`}>
          <h3 className={`${prefix}content-subtitle ${prefix}body-subheading`}>
            Detail view
          </h3>
          {renderDataTable()}
        </div>
      )}
    </>
  );
};

const renderDataTable = () => {
  return (
    <DataTable
      rows={rowData}
      headers={headerData}
      render={({ rows, headers }) => (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {headers.map((header) => (
                  <TableHeader key={header.id}>{header.header}</TableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  {row.cells.map((cell, cellIndex) => (
                    <TableCell key={cellIndex}>{cell.value}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    />
  );
};

const renderUIShellHeader = () => (
  <HeaderContainer
    render={() => (
      <Header aria-label="IBM Cloud Pak" className={`${prefix}header`}>
        <HeaderName href="/" prefix="IBM">
          Cloud Pak
        </HeaderName>
      </Header>
    )}
  />
);

export default {
  title: 'Components/SidePanel',
  component: SidePanel,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    styles,
    docs: {
      page: DocsPage,
    },
  },
  animateTitle: {
    control: {
      type: 'boolean',
    },
    default: false,
  },
  argTypes: {
    actionToolbarButtons: {
      control: {
        type: 'select',
        labels: {
          0: 'None',
          1: 'One button',
          2: 'Two buttons',
          3: 'Three buttons',
        },
        default: 3,
      },
      description: 'Sets the action toolbar buttons',
      options: [0, 1, 2, 3],
    },
    actions: {
      control: {
        type: 'select',
        labels: {
          0: 'One button',
          1: 'One button (ghost)',
          2: 'One button (danger)',
          3: 'Two buttons',
          4: 'Two buttons with ghost',
          5: 'Two buttons with danger',
          6: 'Three buttons with ghost',
          7: 'Three buttons with danger',
          8: 'Three buttons',
          9: 'None',
        },
        default: 0,
      },
      options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    },
    aiLabel: {
      control: {
        type: 'select',
        labels: {
          0: 'No AI Label',
          1: 'with AI Label',
        },
        default: 0,
      },
      description:
        'Optional prop that is intended for any scenario where something is being generated by AI to reinforce AI transparency, accountability, and explainability at the UI level.',
      options: [0, 1],
    },

    animateTitle: {
      control: {
        type: 'boolean',
      },
      default: true,
      description: 'Determines if the title will animate on scroll',
    },
    className: {
      control: {
        type: 'text',
      },
      default: '',
      description:
        'Sets an optional className to be added to the side panel outermost element',
    },
    closeIconDescription: {
      control: {
        type: 'text',
      },
      default: 'Close',
      description: 'Sets the close button icon description',
    },
    closeIconTooltipAlignment: {
      control: {
        type: 'text',
      },
      default: 'left',
      description: 'Sets the close button tooltip alignment',
    },
    condensedActions: {
      control: {
        type: 'boolean',
      },
      description:
        'Determines whether the side panel should render the condensed version (affects action buttons primarily)',
      default: false,
    },
    currentStep: {
      control: false,
      description: 'Sets the current step of the side panel',
    },
    decorator: {
      control: {
        type: 'select',
        labels: {
          0: 'No AI Label',
          1: 'with AI Label',
        },
        default: 0,
      },
      description:
        'Optional prop that is intended for any scenario where something is being generated by AI to reinforce AI transparency, accountability, and explainability at the UI level.',
      options: [0, 1],
    },
    hideCloseButton: {
      control: {
        type: 'boolean',
      },
      default: false,
      description: 'Show/hide the "X" close button.',
    },
    id: {
      control: {
        type: 'text',
      },
      description: 'Unique identifier',
      default: 'storybook-sidepanel',
    },
    includeOverlay: {
      control: {
        type: 'boolean',
      },
      default: false,
      description:
        'Determines whether the side panel should render with an overlay',
    },
    labelText: {
      control: {
        type: 'text',
      },
      description:
        'Sets the label text which will display above the title text',
      default: 'Incident management',
    },
    launcherButtonRef: {
      control: false,
      description:
        'Provide a ref to return focus to once the side panel is closed.',
    },
    navigationBackIconDescription: {
      control: {
        type: 'text',
      },
      default: 'Back',
      description:
        'Sets the icon description for the navigation back icon button',
    },
    onNavigationBack: {
      control: false,
      description: 'Changes the current side panel page to the previous page',
    },
    onRequestClose: {
      control: false,
      description:
        'Specify a handler for closing the side panel. This handler closes the modal, e.g. changing `open` prop.',
    },
    onUnmount: {
      control: false,
      description:
        'Optional function called when the side panel exit animation is complete. This handler can be used for any state cleanup needed before the panel is removed from the DOM.',
    },
    open: {
      control: false,
      default: true,
      description: 'Determines whether the side panel should render or not',
    },
    placement: {
      control: {
        type: 'select',
        labels: {
          0: 'Left',
          1: 'Right',
        },
      },
      options: ['left', 'right'],
      default: 'right',
      description: 'Determines if the side panel is on the right or left',
    },
    preventCloseOnClickOutside: {
      control: {
        type: 'boolean',
      },
      default: false,
      description: 'Prevent closing on click outside of the panel',
    },
    selectorPageContent: {
      control: {
        type: 'text',
      },
      default: '#ibm-products-page-content',
      description:
        'This is the selector to the element that contains all of the page content that will shrink if the panel is a slide in. This prop is required when using the `slideIn` variant of the side panel.',
    },
    selectorPrimaryFocus: {
      control: {
        type: 'text',
      },
      default: '#side-panel-story-text-input-a',
      description:
        'Specify a CSS selector that matches the DOM element that should be focused when the side panel opens',
    },
    size: {
      control: {
        type: 'select',
        labels: {
          0: 'Extra small (xs)',
          1: 'Small (sm)',
          2: 'Medium (md)',
          3: 'Large (lg)',
          4: 'Extra large (xl)',
          5: 'Double xl (2xl)',
        },
      },
      default: 'md',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Sets the size of the side panel',
    },
    slideIn: {
      table: {
        disable: true,
      },
    },
    slug: {
      control: {
        type: 'select',
        labels: {
          0: 'No AI slug',
          1: 'with AI Slug',
        },
        default: 0,
      },
      options: [0, 1],
    },
    subtitle: {
      control: {
        type: 'object',
      },
      description: 'Sets the subtitle element',
    },
    title: {
      control: {
        type: 'text',
      },
      default:
        'Incident management for your application, testing a very long title to see how this behaves with a longer title',
      description: 'Sets the title text',
    },
    jsFlags: {
      name: 'JS Flags',
      control: 'check',
      options: ['enableSidepanelResizer'],
      description: 'wraps the stories with the selected flag',
      table: {
        category: 'Feature Flags',
      },
    },
    // 'SCSS flags': { // scss flags in story controls are impossible (or) we can add a className conditionally through this arg, and add scss flag enabling logic to that class.
    //   control: 'check',
    //   options: ['example-scss-flag'],
    //   description: 'wraps the stories with the selected flag',
    //   table: {
    //     category: 'Feature Flags',
    //   },
    // },
  },
  decorators: [sidePanelDecorator(renderUIShellHeader, prefix)],
};

// eslint-disable-next-line react/prop-types
const SlideOverTemplate = (
  {
    minimalContent,
    actions,
    aiLabel,
    slug,
    decorator,
    jsFlags, // destructuring this here, so it wont get passed to the component
    actionToolbarButtons,
    ...args
  },
  context
) => {
  const [open, setOpen] = useState(context.viewMode !== 'docs');
  const testRef = useRef(undefined);
  const buttonRef = useRef(undefined);

  return (
    <>
      {renderTrigger({ open, setOpen, buttonRef, prefix, name: 'side panel' })}
      <SidePanel
        {...args}
        open={open}
        onRequestClose={() => setOpen(false)}
        actions={actionSets[actions]}
        ref={testRef}
        aiLabel={aiLabel && sampleAILabel}
        slug={slug && sampleAILabel}
        decorator={decorator && sampleAILabel}
        launcherButtonRef={buttonRef}
        actionToolbarButtons={toolbarActions[actionToolbarButtons]}
      >
        {!minimalContent && <ChildrenContent />}
      </SidePanel>
    </>
  );
};

const FirstElementDisabledTemplate = (
  {
    minimalContent,
    actions,
    aiLabel,
    slug,
    decorator,
    jsFlags, // destructuring this here, so it wont get passed to the component
    actionToolbarButtons,
    ...args
  },
  context
) => {
  const [open, setOpen] = useState(context.viewMode !== 'docs');
  const testRef = useRef(undefined);
  const buttonRef = useRef(undefined);

  return (
    <>
      {renderTrigger({ open, setOpen, buttonRef, prefix, name: 'side panel' })}
      <SidePanel
        {...args}
        open={open}
        onRequestClose={() => setOpen(false)}
        actions={actionSets[actions]}
        ref={testRef}
        aiLabel={aiLabel && sampleAILabel}
        slug={slug && sampleAILabel}
        decorator={decorator && sampleAILabel}
        launcherButtonRef={buttonRef}
        actionToolbarButtons={toolbarActions[actionToolbarButtons]}
      >
        {!minimalContent && (
          <div className={`${prefix}body-content`}>
            <h3 className={`${prefix}body-subheading`}>Section</h3>
            <div className={`${prefix}text-inputs`}>
              <TextInput
                labelText="Input A"
                id="side-panel-story-text-input-a"
                className={`${prefix}text-input`}
                disabled
              />
              <TextInput
                labelText="Input B"
                id="side-panel-story-text-input-b"
                className={`${prefix}text-input`}
              />
            </div>
            <div className={`${prefix}text-inputs`}>
              <TextInput
                labelText="Input C"
                id="side-panel-story-text-input-c"
                className={`${prefix}text-input`}
              />
              <TextInput
                labelText="Input D"
                id="side-panel-story-text-input-d"
                className={`${prefix}text-input`}
              />
            </div>
          </div>
        )}
      </SidePanel>
    </>
  );
};

// eslint-disable-next-line react/prop-types
const StepTemplate = (
  {
    actions,
    aiLabel,
    slug,
    decorator,
    jsFlags, // destructuring this here, so it wont get passed to the component
    actionToolbarButtons,
    ...args
  },
  context
) => {
  const [open, setOpen] = useState(context.viewMode !== 'docs');
  const [currentStep, setCurrentStep] = useState(0);
  const buttonRef = useRef(undefined);

  return (
    <>
      {renderTrigger({ open, setOpen, buttonRef, prefix, name: 'side panel' })}
      <SidePanel
        {...args}
        open={open}
        onRequestClose={() => setOpen(false)}
        currentStep={currentStep}
        onNavigationBack={() => setCurrentStep((prev) => prev - 1)}
        actions={actionSets[actions]}
        aiLabel={aiLabel && sampleAILabel}
        slug={slug && sampleAILabel}
        decorator={decorator && sampleAILabel}
        launcherButtonRef={buttonRef}
        actionToolbarButtons={toolbarActions[actionToolbarButtons]}
      >
        <ChildrenContentWithSteps
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      </SidePanel>
    </>
  );
};

// eslint-disable-next-line react/prop-types
const SlideInTemplate = (
  {
    actions,
    aiLabel,
    slug,
    decorator,
    jsFlags, // destructuring this here, so it wont get passed to the component
    actionToolbarButtons,
    ...args
  },
  context
) => {
  const [open, setOpen] = useState(context.viewMode !== 'docs');
  const buttonRef = useRef(undefined);

  return (
    <>
      <div className={`${prefix}story-content`} id="ibm-products-page-content">
        {renderTrigger({
          open,
          setOpen,
          buttonRef,
          prefix,
          name: 'side panel',
        })}
      </div>
      <SidePanel
        {...args}
        open={open}
        onRequestClose={() => setOpen(false)}
        actions={actionSets[actions]}
        aiLabel={aiLabel && sampleAILabel}
        slug={slug && sampleAILabel}
        decorator={decorator && sampleAILabel}
        launcherButtonRef={buttonRef}
        actionToolbarButtons={toolbarActions[actionToolbarButtons]}
      >
        <ChildrenContent />
      </SidePanel>
    </>
  );
};

export const SlideOver = SlideOverTemplate.bind({});
SlideOver.args = {
  includeOverlay: true,
  actions: 0,
  ...defaultStoryProps,
};

export const SlideIn = SlideInTemplate.bind({});
SlideIn.args = {
  placement: 'right',
  slideIn: true,
  selectorPageContent: '#ibm-products-page-content',
  actions: 0,
  ...defaultStoryProps,
  labelText: 'Incident management',
};

SlideIn.argTypes = {
  jsFlags: {
    control: false,
    description: 'Not supported in this story',
  },
};

export const WithActionToolbar = SlideOverTemplate.bind({});
WithActionToolbar.args = {
  actionToolbarButtons: 3,
  ...defaultStoryProps,
};

export const PanelWithSecondStep = StepTemplate.bind({});
PanelWithSecondStep.args = {
  actions: 0,
  includeOverlay: true,
  currentStep: 1,
  ...defaultStoryProps,
};

export const WithAILabel = SlideOverTemplate.bind({});
WithAILabel.args = {
  includeOverlay: true,
  actions: 0,
  decorator: 1,
  ...defaultStoryProps,
};

export const SpecifyElementToHaveInitialFocus = SlideOverTemplate.bind({});
SpecifyElementToHaveInitialFocus.args = {
  actions: 0,
  selectorPrimaryFocus: '#side-panel-story-text-input-a',
  ...defaultStoryProps,
};

export const WithStaticTitle = SlideOverTemplate.bind({});
WithStaticTitle.args = {
  ...defaultStoryProps,
  actions: 0,
  animateTitle: false,
  includeOverlay: true,
};

export const FirstElementDisabled = FirstElementDisabledTemplate.bind({});
FirstElementDisabled.args = {
  ...defaultStoryProps,
  actions: 0,
  animateTitle: false,
  includeOverlay: true,
};

export const WithStaticTitleAndActionToolbar = SlideOverTemplate.bind({});
WithStaticTitleAndActionToolbar.args = {
  ...defaultStoryProps,
  actions: 0,
  animateTitle: false,
  includeOverlay: true,
  actionToolbarButtons: 3,
};

export const WithoutTitle = SlideOverTemplate.bind({});
WithoutTitle.args = {
  ...defaultStoryProps,
  actions: 0,
  title: null,
  subtitle: null,
  includeOverlay: true,
  'aria-label': 'SidePanel without title',
};
