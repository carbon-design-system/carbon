/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Filter16 from '@carbon/icons-react/es/filter/16';
// Below path will be there when an application installs `carbon-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import BXBtn from 'carbon-web-components/es/components-react/button/button';
// @ts-ignore
import BXTooltip from 'carbon-web-components/es/components-react/tooltip/tooltip';
// @ts-ignore
import BXTooltipBody from 'carbon-web-components/es/components-react/tooltip/tooltip-body';
// @ts-ignore
import BXTooltipFooter from 'carbon-web-components/es/components-react/tooltip/tooltip-footer';
// @ts-ignore
import BXTooltipDefinition from 'carbon-web-components/es/components-react/tooltip/tooltip-definition';
// @ts-ignore
import BXTooltipIcon from 'carbon-web-components/es/components-react/tooltip/tooltip-icon';
import { Default as baseDefault, definition as baseDefinition, icon as baseIcon } from './tooltip-story';
import styles from './tooltip-story.scss';

export { default } from './tooltip-story';

export const Default = args => {
  const { open, direction } = args?.['bx-tooltip'];
  return (
    <>
      <style>{styles.cssText}</style>
      <BXTooltip open={open}>
        <BXTooltipBody direction={direction}>
          <p>
            This is some tooltip text. This box shows the maximum amount of text that should appear inside. If more room is needed
            please use a modal instead.
          </p>
          <BXTooltipFooter>
            <a href="#" className="bx--link">
              Learn More
            </a>
            <BXBtn kind="primary">Create</BXBtn>
          </BXTooltipFooter>
        </BXTooltipBody>
      </BXTooltip>
    </>
  );
};

Object.assign(Default, baseDefault);

export const definition = args => {
  const { alignment, bodyText, direction } = args?.['bx-tooltip-definition'];
  return (
    <BXTooltipDefinition alignment={alignment} bodyText={bodyText} direction={direction}>
      Definition Tooltip
    </BXTooltipDefinition>
  );
};

Object.assign(definition, baseDefinition);

export const icon = args => {
  const { alignment, bodyText, direction } = args?.['bx-tooltip-icon'];
  return (
    <BXTooltipIcon alignment={alignment} bodyText={bodyText} direction={direction}>
      <Filter16 />
    </BXTooltipIcon>
  );
};

Object.assign(icon, baseIcon);
