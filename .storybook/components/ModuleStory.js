import React from 'react';
import { storiesOf } from '@kadira/storybook';
import ModulesContainer from '../../components/ModulesContainer';
import Module from '../../components/Module';
import ModuleHeader from '../../components/ModuleHeader';
import ModuleBody from '../../components/ModuleBody';
import ModuleFooter from '../../components/ModuleFooter';
import UnderReviewDecorator from '../UnderReviewDecorator';

storiesOf('Module', module)
  .addDecorator(UnderReviewDecorator)
  .addWithInfo(
    '',
    `
      Modules are used to organize content in a structural manner.

      Modules are separated into different components. The ModulesContainer is the
      outer container that holds the Module components. Module components can be
      'full', 'half', 'one-third', or 'two-third' widths with the default as 'full'.

      ModuleHeader, ModuleBody, and ModuleFooter components hold the content of the
      Module
    `,
    () => (
      <ModulesContainer>
        <Module className="some-class" width="half">
          <ModuleHeader>Module Example</ModuleHeader>
          <ModuleBody>
            <p>Lorem Ipsum is dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the
            1500s, when an unknown printer took a galley of type and scrambled it
            to make a type specimen book.</p>
            <p>It has survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged.</p>
          </ModuleBody>
          <ModuleFooter>Module Footer</ModuleFooter>
        </Module>

        <Module className="some-class" width="half">
          <ModuleHeader>Module Example</ModuleHeader>
          <ModuleBody>
            <p>Lorem Ipsum is dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the
            1500s, when an unknown printer took a galley of type and scrambled it
            to make a type specimen book.</p>
            <p>It has survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged.</p>
          </ModuleBody>
          <ModuleFooter>Module Footer</ModuleFooter>
        </Module>
      </ModulesContainer>
  ));
