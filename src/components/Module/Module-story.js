import React from 'react';
import { storiesOf } from '@storybook/react';
import { Module, ModuleHeader, ModuleBody } from '../Module';

storiesOf('Module', module)
  .addWithInfo(
    'Single',
    `
      Modules are used to organize content in a structural manner.


      Modules are separated into different components. Module components can be
      'single' or 'double' with the default as 'double'.


      ModuleHeader and ModuleBody components hold the content of the
      Module
    `,
    () => (
      <Module className="some-class" size="single">
        <ModuleHeader>Module Example</ModuleHeader>
        <ModuleBody>
          <p>
            Lorem Ipsum is dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since
            the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book.
          </p>
          <p>
            It has survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged.
          </p>
        </ModuleBody>
      </Module>
    )
  )
  .addWithInfo(
    'Double',
    `
      Modules are used to organize content in a structural manner.

      Modules are separated into different components. Module components can be
      'single' or 'double' with the default as 'double'.

      ModuleHeader and ModuleBody components hold the content of the
      Module
    `,
    () => (
      <Module className="some-class">
        <ModuleHeader>Module Example</ModuleHeader>
        <ModuleBody>
          <p>
            Lorem Ipsum is dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since
            the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book.
          </p>
          <p>
            It has survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged.
          </p>
        </ModuleBody>
      </Module>
    )
  )
  .addWithInfo(
    'No Header',
    `
      Modules are used to organize content in a structural manner.

      Modules are separated into different components. Module components can be
      'single' or 'double' with the default as 'double'.

      ModuleHeader and ModuleBody components hold the content of the
      Module
    `,
    () => (
      <Module className="some-class" size="single">
        <ModuleBody>
          <p>
            It has survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged.
          </p>
        </ModuleBody>
      </Module>
    )
  )
  .addWithInfo(
    'No Header - Centered Content',
    `
      Modules are used to organize content in a structural manner.

      Modules are separated into different components. Module components can be
      'single' or 'double' with the default as 'double'.

      ModuleHeader and ModuleBody components hold the content of the
      Module
    `,
    () => (
      <Module className="some-class" size="single">
        <ModuleBody centered>
          <p>
            Lorem Ipsum is dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since
            the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book.
          </p>
          <p>
            It has survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged.
          </p>
        </ModuleBody>
      </Module>
    )
  );
