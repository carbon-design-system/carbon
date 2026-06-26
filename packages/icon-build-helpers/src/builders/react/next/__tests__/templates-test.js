/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { default: generate } = require('@babel/generator');
const t = require('@babel/types');
const { annotateAsPure } = require('../pure');
const templates = require('../templates');

describe('react next templates', () => {
  it('should mark generated icon components as pure for tree shaking', () => {
    const nodes = annotateAsPure(
      templates.component({
        moduleName: t.identifier('Add'),
        defaultSize: t.numericLiteral(16),
        statements: [t.returnStatement(t.nullLiteral())],
      })
    );

    const code = generate(t.file(t.program(nodes))).code;

    expect(code).toContain('const Add = /*#__PURE__*/React.forwardRef(');
  });
});
