/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { storiesOf } from '@storybook/react';
import React, { useState } from 'react';
import { useAnnouncer, usePoliteAnnouncer, useAssertiveAnnouncer } from './';

storiesOf('useAnnouncer', module)
  .add('default', () => {
    function DemoComponent() {
      const [mode, updateMode] = useState('polite');
      const [announcement, updateAnnouncement] = useState('test message');
      const announce = useAnnouncer();

      function onModeChange(event) {
        updateMode(event.target.value);
      }

      function onAnnouncementChange(event) {
        updateAnnouncement(event.target.value);
      }

      return (
        <>
          <div>
            <label htmlFor="mode">Mode</label>
            <select
              id="mode"
              value={mode}
              onChange={onModeChange}
              onBlur={onModeChange}>
              <option>polite</option>
              <option>assertive</option>
            </select>
          </div>
          <div>
            <label htmlFor="announcement">Announcement</label>
            <input
              type="text"
              value={announcement}
              onChange={onAnnouncementChange}
            />
          </div>
          <button onClick={() => announce(mode, announcement)}>Announce</button>
        </>
      );
    }
    return <DemoComponent />;
  })
  .add('polite announcer', () => {
    function DemoComponent() {
      const announce = usePoliteAnnouncer();
      const [count, setCount] = useState(1);
      function onClick() {
        setCount(count + 1);
        announce(`Polite message ${count}`);
      }
      return <button onClick={onClick}>Send polite alert</button>;
    }
    return <DemoComponent />;
  })
  .add('assertive announcer', () => {
    function DemoComponent() {
      const announce = useAssertiveAnnouncer();
      const [count, setCount] = useState(1);
      function onClick() {
        setCount(count + 1);
        announce(`Assertive message ${count}`);
      }
      return <button onClick={onClick}>Send assertive alert</button>;
    }
    return <DemoComponent />;
  })
  .add('multiple announcers', () => {
    function DemoComponent() {
      return (
        <>
          <Assertive />
          <Polite />
        </>
      );
    }

    function Assertive() {
      const announce = useAnnouncer();
      const [count, setCount] = useState(1);
      function onClick() {
        setCount(count + 1);
        announce('assertive', `Assertive message ${count}`);
      }
      return <button onClick={onClick}>Send assertive alert</button>;
    }

    function Polite() {
      const announce = useAnnouncer();
      const [count, setCount] = useState(1);
      function onClick() {
        setCount(count + 1);
        announce('polite', `Polite message ${count}`);
      }
      return <button onClick={onClick}>Send polite alert</button>;
    }

    return <DemoComponent />;
  });
