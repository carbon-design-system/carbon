/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { default: template } = require('@babel/template');
const { createMetadataVisitor } = require('./babel-plugin-create-react-custom-element-type');

const regexEvent = /^event/;
const regexMagicComment = /The name of the custom event/g;
const magicCommentForReact = 'The event handler for the custom event';

module.exports = function generateCreateReactCustomElementType(api) {
  const { types: t } = api;
  const metadataVisitor = createMetadataVisitor(api);

  const types = {
    Boolean: 'boolean',
    Number: 'number',
  };

  return {
    name: 'create-react-custom-element-type-def',
    visitor: {
      Program(path, { file }) {
        const declaredProps = {};
        const customEvents = {};
        const namedExportsSources = {};
        const context = { file, declaredProps, customEvents, namedExportsSources };
        // Gathers metadata of custom element properties and events, into `context`
        path.traverse(metadataVisitor, context);

        const { className, classComments = [], parentDescriptorSource } = context;
        const props = Object.keys(declaredProps).reduce((acc, key) => {
          const { comments = [], type } = declaredProps[key];
          return [...acc, comments.map(({ value }) => `/*${value}*/`).join('\n'), `${key}?: ${types[type] || 'string'};`];
        }, []);
        const events = Object.keys(customEvents).reduce((acc, key) => {
          const { comments = [] } = customEvents[key];
          return [
            ...acc,
            comments.map(({ value }) => `/*${value.replace(regexMagicComment, magicCommentForReact)}*/`).join('\n'),
            `${key.replace(regexEvent, 'on')}?: (event: CustomEvent) => void;`,
          ];
        }, []);

        const build = template(
          `
             import { Component } from 'react';
             ${
               !parentDescriptorSource
                 ? ''
                 : `import { ComponentProps as ParentComponentProps } from '${parentDescriptorSource}';`
             }
             export interface ComponentProps${!parentDescriptorSource ? '' : ' extends ParentComponentProps'} {
               ${props.join('\n')}
               ${events.join('\n')}
               ${parentDescriptorSource ? '' : '[prop: string]: unknown;'}
             }
             ${classComments.map(({ value }) => `/*${value}*/`).join('\n')}
             declare class ${className} extends Component<ComponentProps> {}
             export default ${className};
           `,
          {
            plugins: ['typescript'],
            preserveComments: true,
            sourceType: 'module',
          }
        );

        const body = build();
        path.replaceWith(t.program(body));
        path.stop();
      },
    },
  };
};
