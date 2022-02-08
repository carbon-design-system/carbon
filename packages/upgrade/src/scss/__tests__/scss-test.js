/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as scss from '../';

describe('scss', () => {
  describe('parse', () => {
    it('should transform the given input into an AST', () => {
      const input = `
        .selector {
          display: block;
        }
      `;
      const ast = scss.parse(input);
      expect(ast).toBeInstanceOf(scss.types.Root);
    });
  });

  describe('visit', () => {
    it('should call visitors when the given node is visited in the AST', () => {
      const input = `
        .selector {
          display: block;
        }
      `;
      const visitors = {
        Comment: jest.fn(),
        Declaration: jest.fn(),
        Rule: jest.fn(),
      };
      scss.visit(scss.parse(input), visitors);

      expect(visitors.Comment).not.toHaveBeenCalled();
      expect(visitors.Declaration).toHaveBeenCalled();
      expect(visitors.Rule).toHaveBeenCalled();
    });
  });

  describe('Collection', () => {
    test('finding a node in the AST', () => {
      const input = `
        .selector {
          display: block;
        }
      `;
      const ast = scss.parse(input);
      const collection = scss.Collection.create(ast);
      const declarations = collection.find(scss.types.Declaration);

      expect(declarations.size()).toBe(1);
    });

    test.todo('filter');
    test.todo('forEach');
    test.todo('map');
    test.todo('toSource');
  });

  describe('NodePath', () => {
    test.todo('replace');
    test.todo('insertBefore');
    test.todo('insertAfter');
    test.todo('remove');
  });
});
