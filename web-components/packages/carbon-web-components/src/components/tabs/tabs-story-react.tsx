/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
// Below path will be there when an application installs `carbon-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import BXTabs from 'carbon-web-components/es/components-react/tabs/tabs';
// @ts-ignore
import BXTab from 'carbon-web-components/es/components-react/tabs/tab';
// @ts-ignore
import BXTabsSkeleton from 'carbon-web-components/es/components-react/tabs/tabs-skeleton';
// @ts-ignore
import BXTabSkeleton from 'carbon-web-components/es/components-react/tabs/tab-skeleton';
import { Default as baseDefault } from './tabs-story';
import styles from './tabs-story.scss';

export { default } from './tabs-story';

export const Default = args => {
  const { colorScheme, triggerContent, type, value, disableSelection, onBeforeSelect, onSelect } = args?.['bx-tabs'];
  const handleBeforeSelected = (event: CustomEvent) => {
    onBeforeSelect(event);
    if (disableSelection) {
      event.preventDefault();
    }
  };
  return (
    <>
      <style type="text/css">{styles.cssText}</style>
      <BXTabs
        colorScheme={colorScheme}
        triggerContent={triggerContent}
        type={type}
        value={value}
        onBeforeSelect={handleBeforeSelected}
        onSelect={onSelect}>
        <BXTab id="tab-all" target="panel-all" value="all">
          Option 1
        </BXTab>
        <BXTab id="tab-cloudFoundry" target="panel-cloudFoundry" value="cloudFoundry" disabled>
          Option 2
        </BXTab>
        <BXTab id="tab-staging" target="panel-staging" value="staging">
          Option 3
        </BXTab>
        <BXTab id="tab-dea" target="panel-dea" value="dea">
          Option 4
        </BXTab>
        <BXTab id="tab-router" target="panel-router" value="router">
          Option 5
        </BXTab>
      </BXTabs>
      <div className="bx-ce-demo-devenv--tab-panels">
        <div id="panel-all" role="tabpanel" aria-labelledby="tab-all" hidden>
          <h1>Content for option 1</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
        <div id="panel-cloudFoundry" role="tabpanel" aria-labelledby="tab-cloudFoundry" hidden>
          <h1>Content for option 2</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
        <div id="panel-staging" role="tabpanel" aria-labelledby="tab-staging" hidden>
          <h1>Content for option 3</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
        <div id="panel-dea" role="tabpanel" aria-labelledby="tab-dea" hidden>
          <h1>Content for option 4</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
        <div id="panel-router" role="tabpanel" aria-labelledby="tab-router" hidden>
          <h1>Content for option 5</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
      </div>
    </>
  );
};

Object.assign(Default, baseDefault);

export const skeleton = () => (
  <BXTabsSkeleton>
    <BXTabSkeleton />
    <BXTabSkeleton />
    <BXTabSkeleton />
    <BXTabSkeleton />
    <BXTabSkeleton />
  </BXTabsSkeleton>
);
