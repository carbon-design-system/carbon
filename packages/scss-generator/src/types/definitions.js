/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const {
  assertAny,
  assertOneOf,
  assertType,
  assertValueType,
  arrayOf,
} = require('./assert');
const { defineType } = require('./type');

//-------------------------------------------------------------------------------
// Comments
//-------------------------------------------------------------------------------
const Comment = defineType('Comment', {
  fields: {
    value: {
      validate: assertValueType('string'),
    },
  },
  generate(printer, node) {
    const lines = node.value.split('\n');
    for (let i = 0; i < lines.length; i++) {
      printer.token('//');
      printer.token(lines[i]);
      if (i !== lines.length - 1) {
        printer.newline();
      }
    }
  },
});

//-------------------------------------------------------------------------------
// Identifier
//-------------------------------------------------------------------------------
const Identifier = defineType('Identifier', {
  fields: {
    name: {
      validate: assertValueType('string'),
    },
  },
  generate(printer, node, parent) {
    if (
      parent &&
      (parent.type === Assignment.type ||
        parent.type === AssignmentPattern.type ||
        parent.type === CallExpression.type ||
        parent.type === LogicalExpression.type ||
        parent.type === SassMixin.type ||
        parent.type === SassList.type ||
        parent.type === RestPattern.type ||
        parent.type === SassFunction.type)
    ) {
      printer.token('$');
    }
    printer.token(node.name);
  },
});

//-------------------------------------------------------------------------------
// Blocks
//-------------------------------------------------------------------------------
const BlockStatement = defineType('BlockStatement', {
  fields: {
    body: {
      validate: arrayOf(assertAny),
    },
  },
  generate(printer, node) {
    printer.blockStart();
    for (let i = 0; i < node.body.length; i++) {
      printer.print(node.body[i], node);
      if (i !== node.body.length - 1) {
        printer.newline();
      }
    }
    printer.blockEnd();
  },
});

//-------------------------------------------------------------------------------
// Values
//-------------------------------------------------------------------------------
const SassBoolean = defineType('SassBoolean', {
  fields: {
    value: {
      validate: assertValueType('boolean'),
    },
  },
  generate(printer, node) {
    printer.token(node.value);
  },
});

const SassColor = defineType('SassColor', {
  fields: {
    value: {
      validate: assertValueType('string'),
    },
  },
  generate(printer, node) {
    printer.token(node.value);
  },
});

const SassFunction = defineType('SassFunction', {
  fields: {
    id: {
      validate: assertType(Identifier),
    },
    params: {
      optional: true,
      validate: () =>
        arrayOf(
          assertOneOf([assertType(AssignmentPattern), assertType(Identifier)])
        ),
    },
    body: {
      validate: () => assertType(BlockStatement),
    },
  },
  generate(printer, node, parent) {
    printer.token('@function');
    printer.space();
    printer.print(node.id, parent);
    printer.token('(');

    if (Array.isArray(node.params)) {
      for (let i = 0; i < node.params.length; i++) {
        printer.print(node.params[i], node);
        if (i !== node.params.length - 1) {
          printer.token(',');
          printer.space();
        }
      }
    }

    printer.token(')');
    printer.space();
    printer.print(node.body, parent);
  },
});

const SassList = defineType('SassList', {
  fields: {
    elements: {
      validate: () =>
        arrayOf(
          assertOneOf([
            assertType(SassBoolean),
            assertType(SassList),
            assertType(SassMap),
            assertType(SassNumber),
            assertType(SassString),
            assertType(Identifier),
          ])
        ),
    },
  },
  generate(printer, node) {
    printer.token('(');
    for (let i = 0; i < node.elements.length; i++) {
      printer.print(node.elements[i], node);
      if (i !== node.elements.length - 1) {
        printer.token(',');
        printer.space();
      }
    }
    printer.token(')');
  },
});

const SassMap = defineType('SassMap', {
  fields: {
    properties: {
      validate: () => arrayOf(assertType(SassMapProperty)),
    },
  },
  generate(printer, node) {
    printer.blockStart('(');
    for (let i = 0; i < node.properties.length; i++) {
      printer.print(node.properties[i]);
      if (i !== node.properties.length - 1) {
        printer.token(',');
        printer.newline();
      }
    }
    printer.blockEnd(')');
  },
});

const SassMapProperty = defineType('SassMapProperty', {
  fields: {
    key: {
      validate: assertType(Identifier),
    },
    value: {
      validate: () =>
        assertOneOf([SassBoolean, SassNumber, SassString, SassList, SassMap]),
    },
    quoted: {
      optional: true,
      validate: assertValueType('boolean'),
    },
  },
  generate(printer, node) {
    if (node.quoted) {
      printer.token(`'`);
      printer.print(node.key, node);
      printer.token(`'`);
    } else {
      printer.print(node.key, node);
    }
    printer.token(':');
    printer.space();
    printer.print(node.value, node);
  },
});

const SassMixin = defineType('SassMixin', {
  fields: {
    id: {
      validate: assertType(Identifier),
    },
    params: {
      optional: true,
      validate: () =>
        arrayOf(
          assertOneOf([assertType(AssignmentPattern), assertType(Identifier)])
        ),
    },
    body: {
      validate: assertType(BlockStatement),
    },
  },
  generate(printer, node, parent) {
    printer.token('@mixin');
    printer.space();
    printer.print(node.id, parent);
    printer.token('(');

    if (Array.isArray(node.params)) {
      for (let i = 0; i < node.params.length; i++) {
        printer.print(node.params[i], node);
        if (i !== node.params.length - 1) {
          printer.token(',');
          printer.space();
        }
      }
    }

    printer.token(')');
    printer.space();
    printer.print(node.body, parent);
  },
});

const SassNumber = defineType('SassNumber', {
  fields: {
    value: {
      validate: assertValueType('number'),
    },
  },
  generate(printer, node) {
    printer.token(node.value);
  },
});

const SassString = defineType('SassString', {
  fields: {
    value: {
      validate: assertValueType('string'),
    },
  },
  generate(printer, node) {
    printer.token(`'${node.value}'`);
  },
});

// Allow ability to shortcircuit AST builder limitations and embed raw values
// into the Sass source code
const SassValue = defineType('SassValue', {
  fields: {
    value: {
      validate: assertAny,
    },
  },
  generate(printer, node) {
    printer.token(node.value);
  },
});

//-------------------------------------------------------------------------------
// Calls
//-------------------------------------------------------------------------------
const SassFunctionCall = defineType('SassFunctionCall', {
  fields: {
    id: {
      validate: assertType(Identifier),
    },
    params: {
      optional: true,
      validate: () =>
        arrayOf(
          assertOneOf([
            assertType(Identifier),
            assertType(SassBoolean),
            assertType(SassList),
            assertType(SassMap),
            assertType(SassNumber),
            assertType(SassString),
          ])
        ),
    },
  },
  generate(printer, node) {
    printer.space();
    printer.print(node.id);
    printer.token('(');
    if (Array.isArray(node.params)) {
      for (let i = 0; i < node.params.length; i++) {
        const param = node.params[i];
        if (param.type === Identifier.type) {
          printer.token('$');
        }
        printer.print(param, node);
        if (i !== node.params.length - 1) {
          printer.token(',');
          printer.space();
        }
      }
    }
    printer.token(')');
  },
});

const SassMixinCall = defineType('SassMixinCall', {
  fields: {
    id: {
      validate: assertType(Identifier),
    },
    params: {
      optional: true,
      validate: () =>
        arrayOf(
          assertOneOf([
            assertType(Identifier),
            assertType(SassBoolean),
            assertType(SassList),
            assertType(SassMap),
            assertType(SassNumber),
            assertType(SassString),
          ])
        ),
    },
    body: {
      optional: true,
      validate: assertType(BlockStatement),
    },
  },
  generate(printer, node) {
    printer.token('@include');
    printer.space();
    printer.print(node.id);

    printer.token('(');
    if (Array.isArray(node.params)) {
      for (let i = 0; i < node.params.length; i++) {
        const param = node.params[i];

        if (param.type === Identifier.type) {
          printer.token('$');
        }

        printer.print(param, node);
        if (i !== node.params.length - 1) {
          printer.token(',');
          printer.space();
        }
      }
    }
    printer.token(')');

    if (node.body) {
      printer.print(node.body, node);
    }

    printer.token(';');
  },
});

//-------------------------------------------------------------------------------
// Rules
//-------------------------------------------------------------------------------
const Rule = defineType('Rule', {
  fields: {
    declarations: {
      validate: () => arrayOf(assertType(Declaration)),
    },
    selectors: {
      validate: arrayOf(assertValueType('string')),
    },
  },
  generate(printer, node) {
    printer.token(node.selectors.join(', '));
    printer.space();
    printer.blockStart();

    for (let i = 0; i < node.declarations.length; i++) {
      const declaration = node.declarations[i];

      printer.print(declaration, node);

      if (i !== node.declarations.length - 1) {
        printer.newline();
      }
    }

    printer.blockEnd();
  },
});

const Declaration = defineType('Declaration', {
  fields: {
    property: {
      validate: assertValueType('string'),
    },
    value: {
      validate: () =>
        assertOneOf([assertValueType('string'), assertType(CallExpression)]),
    },
  },
  generate(printer, node) {
    printer.token(node.property);
    printer.token(':');
    printer.space();
    if (typeof node.value === 'string') {
      printer.token(node.value);
    } else {
      printer.print(node.value);
    }
    printer.token(';');
  },
});

//-------------------------------------------------------------------------------
// At-Rules and directives
//-------------------------------------------------------------------------------
const AtRule = defineType('AtRule', {
  fields: {
    name: {
      validate: assertValueType('string'),
    },
    media: {
      validate: assertValueType('string'),
    },
    children: {
      validate: arrayOf(assertOneOf([assertType(Rule)])),
    },
  },
  generate(printer, node) {
    printer.token(`@${node.name}`);
    printer.space();
    printer.token(node.media);
    printer.space();
    printer.blockStart();
    for (let i = 0; i < node.children.length; i++) {
      printer.print(node.children[i], node);
      if (i !== node.children.length - 1) {
        printer.newline();
      }
    }
    printer.blockEnd();
  },
});

const AtContent = defineType('AtContent', {
  fields: {},
  generate(printer, node, parent) {
    if (parent.body.indexOf(node) !== 0) {
      printer.maybeNewline();
    }
    printer.token('@content;');
  },
});

const AtReturn = defineType('AtReturn', {
  fields: {
    argument: {
      validate: assertAny,
    },
  },
  generate(printer, node, parent) {
    if (parent.body.indexOf(node) !== 0) {
      printer.maybeNewline();
    }
    printer.token('@return');
    printer.space();
    printer.print(node.argument, node);
    printer.token(';');
  },
});

//-------------------------------------------------------------------------------
// Assignment
//-------------------------------------------------------------------------------
const Assignment = defineType('Assignment', {
  fields: {
    id: {
      validate: assertType(Identifier),
    },
    init: {
      validate: () =>
        assertOneOf([
          assertType(CallExpression),
          assertType(SassBoolean),
          assertType(SassColor),
          assertType(SassList),
          assertType(SassMap),
          assertType(SassNumber),
          assertType(SassString),
          assertType(SassFunctionCall),
        ]),
    },
    default: {
      optional: true,
      validate: assertValueType('boolean'),
    },
    global: {
      optional: true,
      validate: assertValueType('boolean'),
    },
  },
  generate(printer, node, parent) {
    printer.print(node.id, node);
    printer.token(':');
    printer.space();
    printer.print(node.init, node);

    if (node.default) {
      printer.space();
      printer.token('!default');

      if (node.global) {
        printer.space();
      }
    }

    if (node.global) {
      printer.token('!global');
    }

    printer.token(';');

    if (parent) {
      // We have a couple of options for the block we may be operating in, in
      // this case we'll check for children or body and check if the collection
      // exists
      const collection = parent.children || parent.body;

      // If we have a collection, and there are more than one element in the
      // collection, then we can safely determine if we need to apply a newline
      // after an assignment
      if (collection && collection.length > 1) {
        const assignments = collection.filter(
          node => node.type === Assignment.type
        );
        if (
          assignments.length === 1 ||
          assignments.indexOf(node) === assignments.length - 1
        ) {
          printer.newline();
        }
      }
    }
  },
});

const AssignmentPattern = defineType('AssignmentPattern', {
  fields: {
    left: {
      validate: assertType(Identifier),
    },
    right: {
      validate: assertAny,
    },
  },
  generate(printer, node) {
    printer.print(node.left, node);
    printer.token(':');
    printer.space();
    printer.print(node.right, node);
  },
});

const RestPattern = defineType('RestPattern', {
  fields: {
    id: {
      validate: assertType(Identifier),
    },
  },
  generate(printer, node, parent) {
    printer.print(node.id, parent);
    printer.token('...');
  },
});

//-------------------------------------------------------------------------------
// Imports
//-------------------------------------------------------------------------------
const SassImport = defineType('SassImport', {
  fields: {
    path: {
      validate: assertValueType('string'),
    },
  },
  generate(printer, node) {
    printer.token('@import');
    printer.space();
    printer.token(`'${node.path}'`);
    printer.token(';');
  },
});

//-------------------------------------------------------------------------------
// Control structures
//-------------------------------------------------------------------------------
const IfStatement = defineType('IfStatement', {
  fields: {
    test: {
      validate: assertAny,
    },
    consequent: {
      optional: true,
      validate: assertType(BlockStatement),
    },
    alternate: {
      optional: true,
      validate: () =>
        assertOneOf([assertType(IfStatement), assertType(BlockStatement)]),
    },
  },
  generate(printer, node, parent) {
    if (parent && parent.type === IfStatement.type) {
      printer.space();
      printer.token('if');
    } else {
      printer.token('@if');
    }

    printer.space();
    printer.print(node.test, node);
    printer.print(node.consequent, node);

    if (node.alternate) {
      printer.token('@else');
      printer.print(node.alternate, node);
    }
  },
});

//-------------------------------------------------------------------------------
// Logical expressions
//-------------------------------------------------------------------------------
const LogicalExpression = defineType('LogicalExpression', {
  fields: {
    left: {
      validate: assertAny,
    },
    operator: {
      validate: assertValueType('string'),
    },
    right: {
      validate: assertAny,
    },
  },
  generate(printer, node) {
    printer.print(node.left, node);
    printer.space();
    printer.token(node.operator);
    printer.space();
    printer.print(node.right, node);
  },
});

//-------------------------------------------------------------------------------
// Call expressions
//-------------------------------------------------------------------------------
const CallExpression = defineType('CallExpression', {
  fields: {
    callee: {
      validate: assertType(Identifier),
    },
    arguments: {
      optional: true,
      validate: arrayOf(assertAny),
    },
  },
  generate(printer, node) {
    printer.print(node.callee);
    printer.token('(');
    if (Array.isArray(node.arguments)) {
      for (let i = 0; i < node.arguments.length; i++) {
        printer.print(node.arguments[i], node);
        if (i !== node.arguments.length - 1) {
          printer.token(',');
          printer.space();
        }
      }
    }
    printer.token(')');
  },
});

//-------------------------------------------------------------------------------
// StyleSheet
//-------------------------------------------------------------------------------
const StyleSheet = defineType('StyleSheet', {
  fields: {
    children: {
      validate: () =>
        arrayOf(
          assertOneOf([
            assertType(Assignment),
            assertType(AtRule),
            assertType(Comment),
            assertType(IfStatement),
            assertType(Rule),
            assertType(SassFunction),
            assertType(SassImport),
            assertType(SassMixin),
            assertType(SassMixinCall),
            assertType(Newline),
          ])
        ),
    },
  },
  generate(printer, node) {
    // TODO: print leading comments
    for (let i = 0; i < node.children.length; i++) {
      printer.print(node.children[i], node);
      if (i !== node.children.length - 1) {
        printer.newline();
      }
    }
  },
});

//-------------------------------------------------------------------------------
// Formatting
//-------------------------------------------------------------------------------
const Newline = defineType('Newline', {
  generate(printer) {
    printer.newline();
  },
});

module.exports = {
  Assignment,
  AssignmentPattern,
  AtContent,
  AtReturn,
  AtRule,
  BlockStatement,
  CallExpression,
  Comment,
  Declaration,
  IfStatement,
  Identifier,
  LogicalExpression,
  RestPattern,
  Rule,
  SassBoolean,
  SassColor,
  SassFunction,
  SassFunctionCall,
  SassImport,
  SassNumber,
  SassString,
  SassList,
  SassMap,
  SassMapProperty,
  SassValue,
  SassMixin,
  SassMixinCall,
  StyleSheet,

  // Formatting
  Newline,
};
