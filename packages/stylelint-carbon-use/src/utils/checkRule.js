import { utils } from 'stylelint';
import {
  declarationValueIndex,
  checkProp,
  isVariable,
  normaliseVariableName,
  parseToRegexOrString,
  testItem,
  tokenizeValue,
  TOKEN_TYPES,
  parseRangeValue,
} from './';

const checkAcceptValues = (item, acceptedValues = []) => {
  // Simply check raw values, improve later
  let result = false;

  if (item) {
    result = acceptedValues.some((acceptedValue) => {
      // regex or string
      const testValue = parseToRegexOrString(acceptedValue);

      return (
        (testValue.test && testValue.test(item.raw)) || testValue === item.raw
      );
    });
  }

  return result;
};

export default function checkRule(
  root,
  result,
  ruleName,
  options,
  messages,
  getRuleInfo
) {
  const checkItem = (decl, item, propSpec, ruleInfo, knownVariables) => {
    // Expects to be passed an item containing either a token { raw, type, value} or
    // one of the types with children Math, Function or Bracketed content { raw, type, items: [] }

    if (!checkAcceptValues(item, options.acceptValues)) {
      const testResult = testItem(item, ruleInfo, options, knownVariables);
      let message;

      if (!testResult.accepted) {
        if (item === undefined) {
          message = messages.rejectedUndefinedRange(
            decl.prop,
            item,
            propSpec.range
          );
        } else if (testResult.isCalc) {
          message = messages.rejectedMaths(decl.prop, item.raw);
        } else if (testResult.isVariable) {
          message = messages.rejectedVariable(
            decl.prop,
            item.raw,
            testResult.variableValue
          );
        } else {
          message = messages.rejected(decl.prop, decl.value);
        }

        // adjust position for multipart value
        const offsetValue =
          item !== undefined ? decl.value.indexOf(item.raw) : 0;

        utils.report({
          ruleName,
          result,
          message,
          index: declarationValueIndex(decl) + offsetValue,
          node: decl,
        });
      }
    }

    return false;
  };

  const checkItems = (items, decl, propSpec, ruleInfo, knownVariables) => {
    // expects to be passed an items array containing tokens
    let itemsToCheck;

    if (propSpec.range) {
      // for the range select only the values to check
      // 1 = first value, -1 = last value
      let [start, end] = propSpec.range.split(' ');

      itemsToCheck = [];

      start = parseRangeValue(start, items.length);
      end = parseRangeValue(end, items.length);

      if (end) {
        itemsToCheck.push(...items.slice(start, end + 1)); // +1 as slice end is not inclusive
      } else {
        itemsToCheck.push(items[start]);
      }
    } else {
      // check all items in list
      itemsToCheck = items;
    }

    // look at propSpec.valueCheck
    if (propSpec.valueCheck) {
      itemsToCheck = itemsToCheck.filter((item) => {
        if (typeof propSpec.valueCheck === 'object') {
          return propSpec.valueCheck.test(item.raw);
        } else {
          return propSpec.valueCheck === item.raw;
        }
      });
    }

    for (const item of itemsToCheck) {
      checkItem(decl, item, propSpec, ruleInfo, knownVariables);
    }
  };

  const knownVariables = {}; // used to contain variable declarations

  root.walkDecls((decl) => {
    const tokenizedValue = tokenizeValue(decl.value);

    if (tokenizedValue && tokenizedValue.error) {
      // eslint-disable-next-line no-console
      console.warn(
        `Unexpected syntax in decl: ${JSON.stringify(
          decl
        )}. \n\n HELP. If you see this message PLEASE copy the contents of the message above and raise a github issue. Thankyou in advance for helping us to improve the tool.`
      );
    } else {
      if (isVariable(decl.prop)) {
        // add to variable declarations
        // expects all variables to appear before use
        // expects all variables to be simple (not map or list)
        knownVariables[normaliseVariableName(decl.prop)] =
          tokenizedValue.items[0];
      }

      // read the prop spec
      const propSpec = checkProp(decl.prop, options.includeProps);

      if (propSpec) {
        // is supported prop
        // Some color properties have
        // variable parameters lists where color is not at a fixed position

        const ruleInfo = getRuleInfo(options);

        if (tokenizedValue.type === TOKEN_TYPES.LIST) {
          for (const listItem of tokenizedValue.items) {
            checkItems(
              listItem.items,
              decl,
              propSpec,
              ruleInfo,
              knownVariables
            );
          }
        } else {
          checkItems(
            tokenizedValue.items,
            decl,
            propSpec,
            ruleInfo,
            knownVariables
          );
        }
      }
    }
  });
}
