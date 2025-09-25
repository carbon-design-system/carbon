/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { action } from 'storybook/actions';
import Modal from './Modal';
import Button from '../Button';
import Select from '../Select';
import { MultiSelect } from '../MultiSelect';
import { Checkbox as CheckboxIcon } from '@carbon/icons-react';
import { Popover, PopoverContent } from '../Popover';
import Dropdown from '../Dropdown';
import SelectItem from '../SelectItem';
import TextInput from '../TextInput';
import ComboBox from '../ComboBox';
import mdx from './Modal.mdx';
import {
  StructuredListWrapper,
  StructuredListHead,
  StructuredListBody,
  StructuredListRow,
  StructuredListCell,
} from '../StructuredList';
import TextArea from '../TextArea';
import { AILabel, AILabelContent, AILabelActions } from '../AILabel';
import { IconButton } from '../IconButton';
import { View, FolderOpen, Folders } from '@carbon/icons-react';
import Checkbox from '../Checkbox';
import CheckboxGroup from '../CheckboxGroup';
// remove all of these before merging

import ComposedModal from '../ComposedModal';
import { ModalHeader } from '../ComposedModal';
import { ModalBody } from '../ComposedModal';
import ContainedList from '../ContainedList';
import ContainedListItem from '../ContainedList';
import { Time, Edit, Information } from '@carbon/icons-react';
import { Tile } from '../Tile';
import { ModalFooter } from '../ComposedModal';
import Tag from '../Tag';
import { Grid } from '../Grid';
import Column from '../Grid';
import DatePicker from '../DatePicker';
import TimePicker from '../TimePicker';
import DatePickerInput from '../DatePickerInput';

export default {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

const buttons = {
  'One (1)': '1',
  'Two (2)': '2',
  'Three (3)': '3',
};

// remove this test story before merging

export const test = () => {
  // --- Inline Styles ---
  const styles = {
    BlockoutUpdate_ListItem: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    BlockoutUpdate_Margin_Gap: {
      marginBottom: '0.5rem',
    },
  };

  // --- Mock components ---
  const TagListInput = ({ tags, setTags, placeholder, allowDuplicates }) => {
    const [input, setInput] = useState('');
    const addTag = () => {
      if (!input.trim()) return;
      if (!allowDuplicates && tags.includes(input)) return;
      setTags([...tags, input]);
      setInput('');
    };
    return (
      <>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            marginBottom: '0.5rem',
          }}>
          {tags.map((tag, idx) => (
            <Tag key={idx}>{tag}</Tag>
          ))}
        </div>
        <input
          type="text"
          placeholder={placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTag()}
          style={{ marginTop: '0.5rem', width: '100%', padding: '0.5rem' }}
        />
      </>
    );
  };

  const DismissibleTag = ({ text, onClose }) => (
    <Tag type="cool-gray" filter onClose={onClose}>
      {text}
    </Tag>
  );

  // --- App ---
  const blockout = {
    startTime: new Date(),
    endTime: new Date(),
    status: 'Medium',
    resources: ['Server A', 'Server B'],
    events: { value: ['Upgrade', 'Patch'] },
    services: { value: ['DNS', 'HTTP'] },
  };

  const [open, setOpen] = useState(true);
  const [formData, setFormData] = useState({
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    resources: [...blockout.resources],
    comment: '',
    events: blockout.events.value,
    services: blockout.services.value,
  });

  const [isStartChecked, setIsStartChecked] = useState(false);
  const [isEndChecked, setIsEndChecked] = useState(false);
  const [isTargetChecked, setIsTargetChecked] = useState(false);
  const [isEventsChecked, setIsEventsChecked] = useState(false);
  const [isServicesChecked, setIsServicesChecked] = useState(false);

  const [layoutType, setLayoutType] = useState('new');
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingtTargets, setIsFetchingTargets] = useState(false);

  const DATACENTERMODE_OPTIONS = [{ label: 'Mode1', value: 'mode1' }];
  const [dcMode, setDcMode] = useState(DATACENTERMODE_OPTIONS[0]);
  const datacenterListToShow = [{ id: 1, name: 'DC1' }];
  const [selectedDc, setSelectedDc] = useState(datacenterListToShow[0]);
  const targetDevices = [{ id: 1, name: 'xcr01' }];
  const [selectedTarget, setSelectedTarget] = useState(targetDevices[0]);
  const neighbors = [{ to_device_id: 'xcr01', to_port: '1' }];

  const formatDateSafe = (date) => (date ? new Date(date).toUTCString() : '—');

  const onClose = () => setOpen(false);
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.id]: e.target.value });
  const handleResourceRemove = (index) =>
    setFormData((prev) => ({
      ...prev,
      resources: prev.resources.filter((_, i) => i !== index),
    }));

  const handleSubmit = () => {
    alert(JSON.stringify(formData, null, 2));
    setOpen(false);
  };

  const handleDcModeChange = (item) => setDcMode(item);
  const handleDcChange = (item) => setSelectedDc(item);
  const handleTargetChange = ({ target }) => setSelectedTarget(target.value);
  const handleNeighborChange = () => {};
  const onAddSelection = () => alert('Selection Added');

  return (
    <ComposedModal open={open} onClose={onClose} size="md">
      <ModalHeader title="Update Blockout" />
      <ModalBody hasScrollingContent>
        {/* 🔑 Fix: invisible div to catch focus so Carbon won't scroll */}
        <div
          tabIndex="0"
          style={{ outline: 'none', height: 0, overflow: 'hidden' }}
        />

        <ContainedList
          kind="on-page"
          label={
            <>
              <span style={{ marginBottom: '2.7rem' }}>Status</span>
              <span style={{ marginLeft: '1rem', marginBottom: '2.7rem' }}>
                <Tag>{blockout.status}</Tag>
              </span>
            </>
          }>
          {/* Start Time */}
          <Button />
          <ContainedListItem
            style={{ marginBottom: '0.7rem' }}
            id="startTime"
            rendericon={Time}
            action={
              <Button
                kind="ghost"
                size="sm"
                hasIconOnly
                rendericon={isStartChecked ? Close : Edit}
                iconDescription={
                  isStartChecked ? 'Discard changes' : 'Edit start time'
                }
                tabIndex={-1}
              />
            }>
            {!isStartChecked ? (
              <>
                <span>Start Time (UTC)</span>
                <span>{formatDateSafe(blockout.startTime)}</span>
              </>
            ) : (
              <Grid className="mt-2">
                <Column lg={8}>
                  <DatePicker datePickerType="single" tabIndex={-1}>
                    <DatePickerInput
                      id="edit-start-date"
                      labelText="Start Date"
                      placeholder="mm/dd/yyyy"
                    />
                  </DatePicker>
                </Column>
                <Column lg={8}>
                  <TimePicker
                    labelText="Time"
                    id="start-time"
                    placeholder="00:00"
                  />
                </Column>
              </Grid>
            )}
          </ContainedListItem>

          {/* End Time */}
          <ContainedListItem
            style={{ marginBottom: '0.7rem' }}
            id="endTime"
            action={
              <Button
                kind="ghost"
                size="sm"
                hasIconOnly
                iconDescription={
                  isEndChecked ? 'Discard changes' : 'Edit end time'
                }
                onClick={() => setIsEndChecked(!isEndChecked)}
              />
            }>
            {!isEndChecked ? (
              <div style={styles.BlockoutUpdate_ListItem}>
                <span>End Time (UTC)</span>
                <span>{formatDateSafe(blockout.endTime)}</span>
              </div>
            ) : (
              <Grid className="mt-2">
                <Column lg={8}>
                  <DatePicker datePickerType="single">
                    <DatePickerInput
                      id="edit-end-date"
                      labelText="End Date"
                      placeholder="mm/dd/yyyy"
                    />
                  </DatePicker>
                </Column>
                <Column lg={8}>
                  <TimePicker
                    labelText="Time"
                    id="end-time"
                    placeholder="00:00"
                  />
                </Column>
              </Grid>
            )}
          </ContainedListItem>

          {/* Targets */}
          <ContainedListItem
            style={{ marginBottom: '0.7rem' }}
            action={
              <Button
                kind="ghost"
                size="sm"
                hasIconOnly
                iconDescription={
                  isTargetChecked ? 'Discard changes' : 'Edit Blockout Targets'
                }
                onClick={() => setIsTargetChecked(!isTargetChecked)}
              />
            }>
            <span style={{ display: 'inline-block', marginBottom: '0.65rem' }}>
              Blockout Targets
            </span>
            {!isTargetChecked ? (
              <Tile>{formData.resources.join(', ')}</Tile>
            ) : (
              <>
                <ContentSwitcher
                  onChange={(e) => setLayoutType(e.name)}
                  selectedIndex={layoutType === 'new' ? 0 : 1}>
                  <Switch name="new" text="New Layout" />
                  <Switch name="old" text="Classic Layout" />
                </ContentSwitcher>

                {layoutType === 'old' && (
                  <TagListInput
                    tags={formData.resources}
                    setTags={(tags) =>
                      setFormData((prev) => ({ ...prev, resources: tags }))
                    }
                    placeholder="Type and press Enter"
                    allowDuplicates={false}
                  />
                )}

                {layoutType === 'new' && (
                  <>
                    <Tile
                      style={{
                        maxHeight: '10.5rem',
                        overflowY: 'scroll',
                        marginBottom: '0.65rem',
                      }}>
                      {formData.resources.map((item, idx) => (
                        <DismissibleTag
                          key={idx}
                          text={item}
                          onClose={() => handleResourceRemove(idx)}
                        />
                      ))}
                    </Tile>

                    <Grid style={{ marginBottom: '0.65rem' }}>
                      <Column lg={4}>
                        {isLoading ? (
                          <DropdownSkeleton />
                        ) : (
                          <Dropdown
                            id="dc-mode"
                            titleText="Blockout Subtype"
                            label="Blockout Subtype"
                            items={DATACENTERMODE_OPTIONS}
                            selectedItem={dcMode}
                            itemToString={(item) => item.label}
                            onChange={({ selectedItem }) =>
                              handleDcModeChange(selectedItem)
                            }
                          />
                        )}
                      </Column>
                      <Column lg={4}>
                        {isLoading ? (
                          <DropdownSkeleton />
                        ) : (
                          <Dropdown
                            id="dc"
                            titleText="Datacenter"
                            label="Select DC"
                            items={datacenterListToShow}
                            selectedItem={selectedDc}
                            itemToString={(item) => item.name}
                            onChange={({ selectedItem }) =>
                              handleDcChange(selectedItem)
                            }
                          />
                        )}
                      </Column>
                      <Column lg={8}>
                        {isFetchingtTargets ? (
                          <DropdownSkeleton />
                        ) : (
                          <Dropdown
                            id="target"
                            titleText="Select Target"
                            label="Select Target"
                            items={targetDevices}
                            selectedItem={selectedTarget}
                            itemToString={(item) => item.name}
                            onChange={({ selectedItem }) =>
                              handleTargetChange({
                                target: { value: selectedItem },
                              })
                            }
                            disabled={isFetchingtTargets}
                          />
                        )}
                      </Column>
                    </Grid>

                    <Grid style={{ marginBottom: '0.65rem' }}>
                      <Column lg={16}>
                        <MultiSelect
                          id="neighbor"
                          titleText="Select Neighbor"
                          label="Select Neighbor(s)"
                          items={neighbors}
                          itemToString={(item) =>
                            `${item.to_device_id} ${item.to_port}`
                          }
                          onChange={handleNeighborChange}
                        />
                      </Column>
                    </Grid>

                    <Grid>
                      <Column lg={16}>
                        <Button
                          kind="primary"
                          onClick={onAddSelection}
                          style={{ width: '100%' }}>
                          Add Selection
                        </Button>
                      </Column>
                    </Grid>
                  </>
                )}
              </>
            )}
          </ContainedListItem>

          {/* Events */}
          <ContainedListItem
            style={styles.BlockoutUpdate_Margin_Gap}
            action={
              <Button
                kind="ghost"
                size="sm"
                hasIconOnly
                iconDescription={
                  isEventsChecked ? 'Discard changes' : 'Edit Events'
                }
                onClick={() => setIsEventsChecked(!isEventsChecked)}
              />
            }>
            <span style={{ display: 'inline-block', marginBottom: '0.65rem' }}>
              Events
            </span>
            {!isEventsChecked ? (
              <Tile>{formData.events.join(', ')}</Tile>
            ) : (
              <TagListInput
                tags={formData.events}
                setTags={(tags) =>
                  setFormData((prev) => ({ ...prev, events: tags }))
                }
                placeholder="Type and press Enter"
                allowDuplicates
              />
            )}
          </ContainedListItem>

          {/* Services */}
          <ContainedListItem
            style={styles.BlockoutUpdate_Margin_Gap}
            action={
              <Button
                kind="ghost"
                size="sm"
                hasIconOnly
                iconDescription={
                  isServicesChecked ? 'Discard changes' : 'Edit Services'
                }
                onClick={() => setIsServicesChecked(!isServicesChecked)}
              />
            }>
            <span style={{ display: 'inline-block', marginBottom: '0.65rem' }}>
              Services
            </span>
            {!isServicesChecked ? (
              <Tile>{formData.services.join(', ')}</Tile>
            ) : (
              <TagListInput
                tags={formData.services}
                setTags={(tags) =>
                  setFormData((prev) => ({ ...prev, services: tags }))
                }
                placeholder="Type and press Enter"
                allowDuplicates
              />
            )}
          </ContainedListItem>

          {/* Comment */}
          <ContainedListItem>
            <span style={{ display: 'inline-block', marginBottom: '0.65rem' }}>
              Comment (Required)
            </span>
            1:30
            <TextArea
              enableCounter
              id="comment"
              value={formData.comment}
              onChange={handleChange}
              placeholder="Type Comment here"
              rows={8}
            />
          </ContainedListItem>
        </ContainedList>
      </ModalBody>

      <ModalFooter>
        <Button kind="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button kind="primary" onClick={handleSubmit}>
          Update
        </Button>
      </ModalFooter>
    </ComposedModal>
  );
};

export const Default = ({ numberOfButtons, ...args }) => {
  const [open, setOpen] = useState(true);
  const [popoverOpen, setPopoverOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Launch modal</Button>
      <Modal
        onRequestClose={(e) => {
          action(e);
          setOpen(false);
        }}
        modalHeading="Add a custom domain"
        primaryButtonText="Add"
        secondaryButtonText="Cancel"
        aria-label="Modal content"
        open={open}
        {...args}
        {...modalFooter(numberOfButtons)}>
        <p style={{ marginBottom: '2rem' }}>
          Custom domains direct requests for your apps in this Cloud Foundry
          organization to a URL that you own. A custom domain can be a shared
          domain, a shared subdomain, or a shared domain and host.
        </p>
        <TextInput
          data-modal-primary-focus
          id="text-input-1"
          labelText="Domain name"
          placeholder="For example, GitHub.com"
          style={{ marginBottom: '24px' }}
        />
        <div style={{ marginBottom: '24px' }}>
          <Select id="select-1" defaultValue="us-south" labelText="Region">
            <SelectItem value="us-south" text="US South" />
            <SelectItem value="us-east" text="US East" />
          </Select>
        </div>
        <div style={{ marginBottom: '24px' }}>
          <ComboBox
            allowCustomValue
            autoAlign={true}
            id="carbon-combobox"
            items={['Viewer', 'Editor', 'Manager']}
            titleText="Permissions (Example of Floating UI)"
          />
        </div>
        <div style={{ marginBottom: '24px' }}>
          <Dropdown
            autoAlign={true}
            id="default"
            titleText="TLS (Example of Floating UI)"
            label="Option 1"
            items={[
              {
                id: 'option-0',
                text: '1.0',
              },
              {
                id: 'option-1',
                text: '1.1',
              },
              {
                id: 'option-2',
                text: '1.2',
              },
            ]}
            itemToString={(item) => (item ? item.text : '')}
          />
        </div>
        <div style={{ marginBottom: '24px' }}>
          <MultiSelect
            id="test"
            label="Choose options"
            titleText="Mapping domain"
            autoAlign
            items={[
              {
                id: 'downshift-1-item-0',
                text: 'Cloud Foundry',
              },
              {
                id: 'downshift-1-item-1',
                text: 'Kubernetes Ingress',
              },
              {
                id: 'downshift-1-item-2',
                text: 'VPC Load Balancer',
              },
            ]}
            itemToString={(item) => (item ? item.text : '')}
          />
        </div>
        <CheckboxGroup legendText="Terms of Agreement">
          <Checkbox
            id="checkbox-label-1"
            labelText="I confirm domain ownership and accept IBM service terms and applicable charges."
          />
        </CheckboxGroup>
      </Modal>
    </>
  );
};

Default.args = {
  numberOfButtons: 'Two (2)',
};

Default.argTypes = {
  modalHeading: {
    control: 'text',
  },
  modalLabel: {
    control: 'text',
  },
  numberOfButtons: {
    description: 'Count of Footer Buttons',
    options: Object.keys(buttons),
    mapping: buttons,
    control: {
      type: 'inline-radio',
      labels: Object.keys(buttons),
    },
  },
  onKeyDown: {
    action: 'onKeyDown',
  },
  onRequestSubmit: {
    action: 'onRequestSubmit',
  },
  onSecondarySubmit: {
    action: 'onSecondarySubmit',
  },
  primaryButtonText: {
    control: 'text',
  },
};

Default.parameters = {
  controls: {
    exclude: [
      'id',
      'launcherButtonRef',
      'secondaryButtons',
      'secondaryButtonText',
      'selectorPrimaryFocus',
      'selectorsFloatingMenus',
    ],
  },
};

export const FullWidth = () => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Launch modal</Button>
      <Modal
        open={open}
        onRequestClose={() => setOpen(false)}
        isFullWidth
        modalHeading="Full width modal"
        modalLabel="An example of a modal with no padding"
        primaryButtonText="Add"
        secondaryButtonText="Cancel">
        <StructuredListWrapper style={{ marginBottom: '48px' }}>
          <StructuredListHead>
            <StructuredListRow head>
              <StructuredListCell head noWrap>
                Default size
              </StructuredListCell>
              <StructuredListCell head noWrap>
                Features
              </StructuredListCell>
              <StructuredListCell head noWrap>
                Pricing
              </StructuredListCell>
            </StructuredListRow>
          </StructuredListHead>
          <StructuredListBody>
            <StructuredListRow>
              <StructuredListCell noWrap>Lite</StructuredListCell>
              <StructuredListCell>2 vCPUs | 4GB RAM</StructuredListCell>
              <StructuredListCell>$0.12 USD / hourly</StructuredListCell>
            </StructuredListRow>
            <StructuredListRow>
              <StructuredListCell noWrap>Graduated tier</StructuredListCell>
              <StructuredListCell>2 vCPUs | 8GB RAM</StructuredListCell>
              <StructuredListCell>$0.13 USD / hourly</StructuredListCell>
            </StructuredListRow>
            <StructuredListRow>
              <StructuredListCell noWrap>Premium</StructuredListCell>
              <StructuredListCell>4 vCPUs | 10GB RAM</StructuredListCell>
              <StructuredListCell>$0.20 USD / hourly</StructuredListCell>
            </StructuredListRow>
          </StructuredListBody>
        </StructuredListWrapper>
      </Modal>
    </>
  );
};

export const DangerModal = () => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Launch modal</Button>
      <Modal
        open={open}
        onRequestClose={() => setOpen(false)}
        danger
        modalHeading="Are you sure you want to delete this custom domain?"
        modalLabel="Account resources"
        primaryButtonText="Delete"
        secondaryButtonText="Cancel">
        <p>
          Check for dependencies on the domain before deletion. For instance, if
          the domain is used as a primary domain for users or if it's associated
          with critical applications or services, those connections will need to
          be removed or reconfigured first.
        </p>
      </Modal>
    </>
  );
};

const modalFooter = (numberOfButtons) => {
  const secondaryButtons = () => {
    switch (numberOfButtons) {
      case '1':
        return {
          secondaryButtons: [],
        };
      case '2':
        return {
          secondaryButtonText: 'Cancel',
        };
      case '3':
        return {
          secondaryButtons: [
            {
              buttonText: 'Keep both',
              onClick: action('onClick'),
            },
            {
              buttonText: 'Rename',
              onClick: action('onClick'),
            },
          ],
        };
      default:
        return null;
    }
  };
  return {
    ...secondaryButtons(),
  };
};

export const WithScrollingContent = () => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Launch modal</Button>
      <Modal
        open={open}
        onRequestClose={() => setOpen(false)}
        hasScrollingContent
        modalHeading="Add a custom domain"
        modalLabel="Account resources"
        primaryButtonText="Add"
        secondaryButtonText="Cancel">
        <p style={{ marginBottom: '1rem' }}>
          Custom domains direct requests for your apps in this Cloud Foundry
          organization to a URL that you own. A custom domain can be a shared
          domain, a shared subdomain, or a shared domain and host.
        </p>
        <p style={{ marginBottom: '2rem' }}>
          Domain mappings provide the URL route to your Code Engine application
          or function within a project. With Code Engine, these mappings are
          automatically created, by default, whenever you deploy an application
          or create a function. However, you can map your own custom domain to a
          Code Engine application or function. This option routes requests from
          your custom URL to your application or function. You can use the Code
          Engine CLI.
        </p>
        <div style={{ marginBottom: '24px' }}>
          <TextInput
            data-modal-primary-focus
            id="text-input-1"
            labelText="Domain name"
            placeholder="For example, GitHub.com"
          />
        </div>
        <div style={{ marginBottom: '24px' }}>
          <Select id="select-1" defaultValue="us-south" labelText="Region">
            <SelectItem value="us-south" text="US South" />
            <SelectItem value="us-east" text="US East" />
          </Select>
        </div>
        <div style={{ marginBottom: '24px' }}>
          <ComboBox
            allowCustomValue
            autoAlign={true}
            id="carbon-combobox"
            items={['Viewer', 'Editor', 'Manager']}
            titleText="Permissions (Example of Floating UI)"
          />
        </div>
        <MultiSelect
          id="test"
          label="Choose options"
          titleText="Mapping domain"
          autoAlign
          items={[
            {
              id: 'downshift-1-item-0',
              text: 'Cloud Foundry',
            },
            {
              id: 'downshift-1-item-1',
              text: 'Kubernetes Ingress',
            },
            {
              id: 'downshift-1-item-2',
              text: 'VPC Load Balancer',
            },
          ]}
          itemToString={(item) => (item ? item.text : '')}
        />
      </Modal>
    </>
  );
};

export const WithStateManager = () => {
  /**
   * Simple state manager for modals.
   */
  const ModalStateManager = ({
    renderLauncher: LauncherContent,
    children: ModalContent,
  }) => {
    const [open, setOpen] = React.useState(false);
    return (
      <>
        {!ModalContent || typeof document === 'undefined'
          ? null
          : ReactDOM.createPortal(
              <ModalContent open={open} setOpen={setOpen} />,
              document.body
            )}
        {LauncherContent && <LauncherContent open={open} setOpen={setOpen} />}
      </>
    );
  };

  const button = React.useRef();

  return (
    <ModalStateManager
      renderLauncher={({ setOpen }) => (
        <Button ref={button} onClick={() => setOpen(true)}>
          Launch modal
        </Button>
      )}>
      {({ open, setOpen }) => (
        <Modal
          launcherButtonRef={button}
          modalHeading="Add a custom domain"
          modalLabel="Account resources"
          primaryButtonText="Add"
          secondaryButtonText="Cancel"
          open={open}
          onRequestClose={() => setOpen(false)}>
          <p style={{ marginBottom: '1rem' }}>
            Custom domains direct requests for your apps in this Cloud Foundry
            organization to a URL that you own. A custom domain can be a shared
            domain, a shared subdomain, or a shared domain and host.
          </p>
          <TextInput
            data-modal-primary-focus
            id="text-input-1"
            labelText="Domain name"
            placeholder="e.g. github.com"
            style={{ marginBottom: '1rem' }}
          />
          <Select id="select-1" defaultValue="us-south" labelText="Region">
            <SelectItem value="us-south" text="US South" />
            <SelectItem value="us-east" text="US East" />
          </Select>
        </Modal>
      )}
    </ModalStateManager>
  );
};

export const PassiveModal = () => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Launch modal</Button>
      <Modal
        open={open}
        onRequestClose={() => setOpen(false)}
        passiveModal
        modalHeading="You are now signed out."
      />
    </>
  );
};

export const WithInlineLoading = () => {
  const [status, setStatus] = useState('inactive');
  const [description, setDescription] = useState('Deleting...');

  const fakePromise = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  };

  const submit = async () => {
    setStatus('active');

    await fakePromise();

    setDescription('Deleted!');
    setStatus('finished');
  };

  const resetStatus = () => {
    setStatus('inactive');
    setDescription('Deleting...');
  };

  const [open, setOpen] = useState(true);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Launch modal</Button>
      <Modal
        open={open}
        onRequestClose={() => setOpen(false)}
        danger
        modalHeading="Are you sure you want to delete this custom domain?"
        modalLabel="Account resources"
        primaryButtonText="Delete"
        secondaryButtonText="Cancel"
        onRequestSubmit={submit}
        loadingStatus={status}
        loadingDescription={description}
        onLoadingSuccess={resetStatus}
      />
    </>
  );
};

const aiLabel = (
  <AILabel className="ai-label-container">
    <AILabelContent>
      <div>
        <p className="secondary">AI Explained</p>
        <h2 className="ai-label-heading">84%</h2>
        <p className="secondary bold">Confidence score</p>
        <p className="secondary">
          Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.
        </p>
        <hr />
        <p className="secondary">Model type</p>
        <p className="bold">Foundation model</p>
      </div>
      <AILabelActions>
        <IconButton kind="ghost" label="View">
          <View />
        </IconButton>
        <IconButton kind="ghost" label="Open Folder">
          <FolderOpen />
        </IconButton>
        <IconButton kind="ghost" label="Folders">
          <Folders />
        </IconButton>
        <Button>View details</Button>
      </AILabelActions>
    </AILabelContent>
  </AILabel>
);

export const withAILabel = {
  render: () => {
    const [open, setOpen] = useState(true); // eslint-disable-line
    return (
      <div className="ai-label-modal">
        <Button onClick={() => setOpen(true)}>Launch modal</Button>
        <Button onClick={() => setOpen2(true)}>
          Launch modal decorator tooltip
        </Button>
        <Modal
          open={open}
          onRequestClose={() => setOpen(false)}
          modalHeading="Add a custom domain"
          modalLabel="Account resources"
          primaryButtonText="Add"
          secondaryButtonText="Cancel"
          decorator={aiLabel}>
          <p style={{ marginBottom: '2rem' }}>
            Custom domains direct requests for your apps in this Cloud Foundry
            organization to a URL that you own. A custom domain can be a shared
            domain, a shared subdomain, or a shared domain and host.
          </p>
          <TextInput
            data-modal-primary-focus
            id="text-input-1"
            labelText="Domain name"
            placeholder="For example, GitHub.com"
            style={{ marginBottom: '24px' }}
          />
          <div style={{ marginBottom: '24px' }}>
            <Select id="select-1" defaultValue="us-south" labelText="Region">
              <SelectItem value="us-south" text="US South" />
              <SelectItem value="us-east" text="US East" />
            </Select>
          </div>
          <TextArea labelText="Comments" style={{ height: '80px' }} />
        </Modal>
      </div>
    );
  },
};
