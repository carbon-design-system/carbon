/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './story.scss';
import { Checkbox as CheckboxIcon } from '@carbon/icons-react';
import React, { useState, useEffect, useRef } from 'react';
import { Popover, PopoverContent } from '../Popover';
import RadioButton from '../RadioButton';
import RadioButtonGroup from '../RadioButtonGroup';
import { default as Checkbox } from '../Checkbox';
import mdx from './Popover.mdx';
import { Settings } from '@carbon/icons-react';

const prefix = 'cds';

const alignments = [
  'top',
  'top-start',
  'top-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'left',
  'left-end',
  'left-start',
  'right',
  'right-end',
  'right-start',
];

const argTypes = {
  align: {
    options: alignments,
    control: { type: 'select' },
  },
  alignmentAxisOffset: {
    control: { type: 'number' },
  },
  autoAlign: {
    control: { type: 'boolean' },
  },
  backgroundToken: {
    options: ['layer', 'background'],
    control: { type: 'select' },
  },
  border: {
    control: { type: 'boolean' },
  },
  caret: {
    control: { type: 'boolean' },
  },
  dropShadow: {
    control: { type: 'boolean' },
  },
  highContrast: {
    control: { type: 'boolean' },
  },
  onRequestClose: {
    action: 'onRequestClose',
  },
  open: {
    control: { type: 'boolean' },
  },
};

const defaultArgs = {
  align: 'bottom',
  alignmentAxisOffset: 0,
  autoAlign: false,
  backgroundToken: 'layer',
  border: false,
  caret: true,
  dropShadow: true,
  highContrast: false,
  open: true,
};

const autoAlignArgs = {
  ...defaultArgs,
  align: 'top',
  autoAlign: true,
};

const defaultControls = Object.keys(argTypes);
const autoAlignControls = defaultControls.filter(
  (control) => control !== 'autoAlign'
);
const tabTipControls = [
  'backgroundToken',
  'border',
  'dropShadow',
  'onRequestClose',
  'open',
];

const useOpenState = (open) => {
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  return [isOpen, setIsOpen];
};

export default {
  title: 'Components/Popover',
  component: Popover,
  subcomponents: {
    PopoverContent,
  },
  argTypes,
  parameters: {
    controls: {
      hideNoControlsWarning: true,
      include: defaultControls,
    },
    docs: {
      page: mdx,
    },
  },
};

export const Default = (args) => {
  const { onRequestClose, open, ...popoverProps } = args;
  const [isOpen, setIsOpen] = useOpenState(open);

  const handleRequestClose = () => {
    onRequestClose?.();
    setIsOpen(false);
  };

  return (
    <Popover
      {...popoverProps}
      open={isOpen}
      onRequestClose={handleRequestClose}>
      <button
        className="playground-trigger"
        aria-label="Checkbox"
        type="button"
        aria-expanded={isOpen}
        onClick={() => {
          setIsOpen(!isOpen);
        }}>
        <CheckboxIcon />
      </button>
      <PopoverContent className="p-3">
        <h2 className="popover-title">Available storage</h2>
        <p className="popover-details">
          This server has 150 GB of block storage remaining.
        </p>
      </PopoverContent>
    </Popover>
  );
};

export const TabTip = (args) => {
  const { onRequestClose, open: openArg, ...popoverProps } = args;
  const [open, setOpen] = useOpenState(openArg);
  const [openTwo, setOpenTwo] = useState(false);
  const align = document?.dir === 'rtl' ? 'bottom-right' : 'bottom-left';
  const alignTwo = document?.dir === 'rtl' ? 'bottom-left' : 'bottom-right';

  const handleRequestClose = (setOpenState) => {
    onRequestClose?.();
    setOpenState(false);
  };

  return (
    <div className="popover-tabtip-story" style={{ display: 'flex' }}>
      <Popover
        {...popoverProps}
        align={align}
        open={open}
        isTabTip
        onRequestClose={() => handleRequestClose(setOpen)}>
        <button
          aria-label="Settings"
          type="button"
          aria-expanded={open}
          onClick={() => {
            setOpen(!open);
          }}>
          <Settings />
        </button>
        <PopoverContent className="p-3">
          <RadioButtonGroup
            style={{ alignItems: 'flex-start', flexDirection: 'column' }}
            legendText="Row height 1"
            name="radio-button-group"
            defaultSelected="small">
            <RadioButton labelText="Small" value="small" id="radio-small" />
            <RadioButton labelText="Large" value="large" id="radio-large" />
          </RadioButtonGroup>
          <hr />
          <fieldset className={`${prefix}--fieldset`}>
            <legend className={`${prefix}--label`}>Edit columns</legend>
            <Checkbox defaultChecked labelText="Name" id="checkbox-label-1" />
            <Checkbox defaultChecked labelText="Type" id="checkbox-label-2" />
            <Checkbox
              defaultChecked
              labelText="Location"
              id="checkbox-label-3"
            />
          </fieldset>
        </PopoverContent>
      </Popover>

      <Popover
        {...popoverProps}
        open={openTwo}
        isTabTip
        align={alignTwo}
        onRequestClose={() => handleRequestClose(setOpenTwo)}>
        <button
          aria-label="Settings"
          type="button"
          aria-expanded={openTwo}
          onClick={() => {
            setOpenTwo(!openTwo);
          }}>
          <Settings />
        </button>
        <PopoverContent className="p-3">
          <RadioButtonGroup
            style={{ alignItems: 'flex-start', flexDirection: 'column' }}
            legendText="Row height 2"
            name="radio-button-group-2"
            defaultSelected="small-2">
            <RadioButton labelText="Small" value="small-2" id="radio-small-2" />
            <RadioButton labelText="Large" value="large-2" id="radio-large-2" />
          </RadioButtonGroup>
          <hr />
          <fieldset className={`${prefix}--fieldset`}>
            <legend className={`${prefix}--label`}>Testing</legend>
            <Checkbox defaultChecked labelText="Name" id="checkbox-label-8" />
            <Checkbox defaultChecked labelText="Type" id="checkbox-label-9" />
            <Checkbox
              defaultChecked
              labelText="Location"
              id="checkbox-label-10"
            />
          </fieldset>
        </PopoverContent>
      </Popover>
    </div>
  );
};

TabTip.parameters = {
  controls: {
    include: tabTipControls,
  },
};
TabTip.args = {
  backgroundToken: 'layer',
  border: false,
  dropShadow: true,
  open: true,
};

Default.args = defaultArgs;
Default.parameters = {
  controls: {
    include: defaultControls,
  },
};

Default.story = {
  decorators: [
    (story) => <div className="mt-10 flex justify-center">{story()}</div>,
  ],
};

export const ExperimentalAutoAlign = (args) => {
  const { onRequestClose, open: openArg, ...popoverProps } = args;
  const [open, setOpen] = useOpenState(openArg);
  const ref = useRef();

  useEffect(() => {
    ref?.current?.scrollIntoView({ block: 'center', inline: 'center' });
  });

  return (
    <div style={{ width: '5000px', height: '5000px' }}>
      <div
        style={{
          position: 'absolute',
          top: '2500px',
          left: '2500px',
        }}>
        <Popover
          {...popoverProps}
          open={open}
          autoAlign
          ref={ref}
          onRequestClose={() => {
            onRequestClose?.();
            setOpen(false);
          }}>
          <button
            className="playground-trigger"
            aria-label="Checkbox"
            type="button"
            aria-expanded={open}
            onClick={() => {
              setOpen(!open);
            }}>
            <CheckboxIcon />
          </button>
          <PopoverContent className="p-3">
            <div>
              <p className="popover-title">This popover uses autoAlign</p>
              <p className="popover-details">
                Scroll the container up, down, left or right to observe how the
                popover will automatically change its position in attempt to
                stay within the viewport. This works on initial render in
                addition to on scroll.
              </p>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

ExperimentalAutoAlign.args = autoAlignArgs;
ExperimentalAutoAlign.parameters = {
  controls: {
    include: autoAlignControls,
  },
};
export const ExperimentalAutoAlignBoundary = (args) => {
  const { onRequestClose, open: openArg, ...popoverProps } = args;
  const [open, setOpen] = useOpenState(openArg);
  const ref = useRef();
  const [boundary, setBoundary] = useState();

  useEffect(() => {
    ref?.current?.scrollIntoView({ block: 'center', inline: 'center' });
  });

  return (
    <div
      style={{
        display: 'grid',
        placeItems: 'center',
        overflow: 'scroll',
        width: '800px',
        height: '500px',
        border: '1px',
        borderStyle: 'dashed',
        borderColor: 'var(--cds-border-strong, #8d8d8d)',
        margin: '0 auto',
      }}
      ref={setBoundary}>
      <div
        style={{
          width: '2100px',
          height: '1px',
          placeItems: 'center',
        }}
      />
      <div style={{ placeItems: 'center', height: '32px', width: '32px' }}>
        <Popover
          {...popoverProps}
          open={open}
          autoAlign
          autoAlignBoundary={boundary}
          onRequestClose={() => {
            onRequestClose?.();
            setOpen(false);
          }}
          ref={ref}>
          <button
            className="playground-trigger"
            aria-label="Checkbox"
            type="button"
            aria-expanded={open}
            onClick={() => {
              setOpen(!open);
            }}>
            <CheckboxIcon />
          </button>
          <PopoverContent className="p-3">
            <div>
              <p className="popover-title">This popover uses autoAlign</p>
              <p className="popover-details">
                Scroll the container up, down, left or right to observe how the
                popover will automatically change its position in attempt to
                stay within the viewport. This works on initial render in
                addition to on scroll.
              </p>
            </div>
          </PopoverContent>
        </Popover>
        <div
          style={{
            height: '1000px',
            width: '1px',
            placeItems: 'center',
          }}
        />
      </div>
    </div>
  );
};

ExperimentalAutoAlignBoundary.args = autoAlignArgs;
ExperimentalAutoAlignBoundary.parameters = {
  controls: {
    include: autoAlignControls,
  },
};

export const TabTipExperimentalAutoAlign = (args) => {
  const { onRequestClose, open: openArg, ...popoverProps } = args;
  const [open, setOpen] = useOpenState(openArg);
  const ref = useRef();

  useEffect(() => {
    ref?.current?.scrollIntoView({ block: 'center', inline: 'center' });
  });

  return (
    <div style={{ width: '5000px', height: '5000px' }}>
      <div
        style={{
          position: 'absolute',
          top: '2500px',
          left: '2500px',
        }}>
        <Popover
          {...popoverProps}
          open={open}
          autoAlign
          ref={ref}
          isTabTip
          onRequestClose={() => {
            onRequestClose?.();
            setOpen(false);
          }}>
          <button
            className="playground-trigger"
            aria-label="Checkbox"
            aria-expanded={open}
            type="button"
            onClick={() => {
              setOpen(!open);
            }}>
            <CheckboxIcon />
          </button>
          <PopoverContent className="p-3">
            <div>
              <p className="popover-title">
                This popover uses autoAlign with isTabTip
              </p>
              <p className="popover-details">
                Scroll the container up, down, left or right to observe how the
                popover will automatically change its position in attempt to
                stay within the viewport. This works on initial render in
                addition to on scroll.
              </p>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

TabTipExperimentalAutoAlign.args = {
  ...autoAlignArgs,
  align: 'bottom-end',
  caret: false,
};
TabTipExperimentalAutoAlign.parameters = {
  controls: {
    include: autoAlignControls.filter((control) => control !== 'caret'),
  },
};
