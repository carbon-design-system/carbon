/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './Disclosure-story.scss';

import React, { useState } from 'react';
import { Disclosure, DisclosureButton } from './index';

export default {
  title: 'Experimental/unstable_Disclosure',
};

export const Uncontrolled = () => (
  <Disclosure>
    <DisclosureButton>Toggle</DisclosureButton>
    <div style={{ padding: '1rem' }}>
      <p>
        Sit sit cumque a maxime quis veritatis at laboriosam, odio? Magnam porro
        provident omnis illo qui explicabo minus? Totam perspiciatis accusamus
        rem voluptatibus quo. Tenetur repudiandae eligendi harum rerum esse
      </p>
    </div>
  </Disclosure>
);

export const Controlled = () => {
  function ControlledExample() {
    const [open, setOpen] = useState(true);
    return (
      <Disclosure open={open}>
        <DisclosureButton
          onClick={(event) => {
            event.preventDefault();
            setOpen(!open);
          }}
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              setOpen(false);
            }
          }}>
          Toggle
        </DisclosureButton>
        <div style={{ padding: '1rem' }}>
          <p>
            Sit sit cumque a maxime quis veritatis at laboriosam, odio? Magnam
            porro provident omnis illo qui explicabo minus? Totam perspiciatis
            accusamus rem voluptatibus quo. Tenetur repudiandae eligendi harum
            rerum esse
          </p>
        </div>
      </Disclosure>
    );
  }

  return <ControlledExample />;
};
