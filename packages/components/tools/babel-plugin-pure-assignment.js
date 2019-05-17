'use strict';

const regexPure = /^\s*[#@]__PURE__\s*$/;
const regexPureClassProperty = /^\s*[#@]__PURE_CLASS_PROPERTY__\s*$/;

/**
 * @param {Map} map The `Map` instanve.
 * @param {string} key The key in the given `map`.
 * @param createFn
 *   A function that returns the value for the new map item.
 *   Used when the given `map` does not have the given `key`.
 * @returns The existing map item or newly created map item.
 */
function mapGetOrCreate(map, key, createFn) {
  const existingItem = map.get(key);
  if (existingItem) {
    return existingItem;
  }
  const newItem = createFn(key);
  map.set(key, newItem);
  return newItem;
}

// In:
//
// ```
// var MyClass = /*#__PURE__*/ function () {
//   function TheClass() {}
//   return TheClass;
// }();
// MyClass.prop /* #__PURE_CLASS_PROPERTY__ */ = value;
// ```
//
// Out:
//
// ```
// var Accordion = /*#__PURE__*/ function () {
//   function TheClass() {}
//   TheClass.prop = value;
//   return TheClass;
// }();
// ```
module.exports = function convertPureAssignment(babel) {
  const t = babel.types;

  const pureAssignmentVisitor = {
    ExpressionStatement(path) {
      const { expression } = path.node;
      if (
        expression.type === 'AssignmentExpression' &&
        expression.operator === '='
      ) {
        const { left, computed, optional } = expression;
        const comment =
          left.trailingComments &&
          left.trailingComments.find(item =>
            regexPureClassProperty.test(item.value)
          );
        if (
          !computed &&
          !optional &&
          left &&
          left.type === 'MemberExpression' &&
          left.object.type === 'Identifier' &&
          comment
        ) {
          const binding = path.scope.getBinding(left.object.name);
          const { init } = binding.path.node;
          if (
            binding &&
            init.type === 'CallExpression' &&
            init.leadingComments &&
            init.leadingComments.some(item => regexPure.test(item.value))
          ) {
            const list = mapGetOrCreate(
              this.pureAssignmentsMap,
              binding,
              () => []
            );
            list.push(path.node);
            path.remove();
          }
        }
      }
    },
  };

  const toplevelVisitor = {
    Program(path) {
      this.pureAssignmentsState = {
        pureAssignmentsMap: new WeakMap(),
      };
      path.traverse(pureAssignmentVisitor, this.pureAssignmentsState);
    },

    VariableDeclarator(path) {
      const { name } = path.node.id;
      const binding = path.scope.getBinding(name);
      const pureAssignments = this.pureAssignmentsState.pureAssignmentsMap.get(
        binding
      );
      if (pureAssignments) {
        const declarator = t.cloneDeep(path.node);
        const { body } = declarator.init.callee.body;
        const index = body.findIndex(item => item.type === 'ReturnStatement');
        if (index >= 0) {
          const { argument } = body[index];
          if (argument.type === 'Identifier') {
            const assignmentsToInsert = pureAssignments.map(node => {
              const clone = t.cloneDeep(node);
              const { left, right } = clone.expression;
              left.object = t.cloneDeep(argument);
              left.trailingComments = left.trailingComments.filter(
                item => !regexPureClassProperty.test(item.value)
              );
              right.leadingComments = right.leadingComments.filter(
                item => !regexPureClassProperty.test(item.value)
              );
              return clone;
            });
            body.splice(index, 0, ...assignmentsToInsert);
          }
        }
        path.replaceWith(declarator);
        path.stop();
      }
    },
  };

  return {
    visitor: toplevelVisitor,
  };
};
