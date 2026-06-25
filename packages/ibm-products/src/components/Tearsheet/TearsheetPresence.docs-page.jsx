/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { StoryDocsPage } from '../../global/js/utils/StoryDocsPage';

import * as stories from './TearsheetPresence.stories';

const DocsPage = () => (
  <StoryDocsPage
    blocks={[
      {
        title: 'Tearsheet',
        story: stories.tearsheet,
        description: `
Tearsheet supports the \`enable-presence\` feature flag. When enabled, Tearsheet will not mount until it's opened and unmount when it's closed. This helps to stay in sync with the React lifecycle.

This means that:

- The DOM no longer includes Tearsheet and its children in the closed state
- Tearsheet, all of its children and their hooks will mount/unmount on open/close
- Enter & exit animations change from CSS transitions to CSS animations

Note: Only Tearsheet and its children are unmounted/mounted. Use TearsheetPresence or withTearsheetPresence to shift the presence boundary to a higher level, if necessary.

Note: If your animation appears to be interrupted, this is likely caused by the Tearsheet portal target’s current limitations, which can trigger a re-mount after the initial render. As a workaround, explicitly set the \`portalTarget\` for your Tearsheet.`,
        source: {
          language: 'jsx',
          code: `
// Option A: opt-in via feature flag
<FeatureFlags enablePresence>
    <Tearsheet {...args} open={open} />
</FeatureFlags>

// Option B: opt-in via tearsheet presence
<TearsheetPresence open={open}>
    <MyTearsheet {...args} />
</TearsheetPresence>

// Option C: opt-in via higher-order function
const MyTearsheet = withTearsheetPresence(({ onSubmit }) => {
  const [foo, setFoo] = useState();
  return <Tearsheet
  {...args}
  actions={[{
    kind: 'primary',
    label: 'Submit',
    onClick: () => {
      onSubmit(foo);
    }
  }]}
  />;
})

<MyTearsheet open={open} />
`,
        },
      },
    ]}
  />
);

export default DocsPage;
