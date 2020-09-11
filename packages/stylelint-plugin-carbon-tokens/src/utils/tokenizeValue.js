/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const TOKEN_TYPES = {
  NUMERIC_LITERAL: 'Numeric literal',
  SCSS_VAR: 'scss variable',
  OPERATOR: 'operator',
  SEPARATOR: 'separator',
  FUNCTION: 'function',
  LEFT_BR: 'Left bracket',
  RIGHT_BR: 'Right bracket',
  BRACKETED_CONTENT: 'Content of brackets',
  QUOTED_LITERAL: 'Quoted literal',
  TEXT_LITERAL: 'Text Literal',
  COLOR_LITERAL: 'Color Literal',
  MATH: 'Math',
  LIST: 'Comma sepaarted list',
  LIST_ITEM: 'Item in list',
  UNKNOWN: 'Unknown',
};

const getTokenList = (inStr) => {
  // match (single quoted string) or (double quoted string) or (numeric with or without units)
  // or (scss var with optional - prefix) or (css var or literal, could be function) or ( or ) or , or operator
  // single quoted string
  // ('[^']*')
  // or double quoted string
  // |("[^"]*")|
  // or numeric with or without units
  // ((-{0,1}[0-9.]+)([\w%]*))
  // or scss var with optional - prefix
  // |(-{0,1}\$[\w-]+)
  // or css var or literal at least 2 if with - to prevent match with operator could be function with opening (
  // |(([\w-#]{2,}|\w*)
  // or ( or ) or ,
  // |(\()|(\))|(,)
  // or operator
  // |([^\w$ (),#])
  // or space
  // |( )*
  const tokenRegex = /('[^']*')|("[^"]*")|((-{0,1}[0-9.]+)([\w%]*))|(-{0,1}\$[\w-]+)|(([\w-#]{2,}|\w+)(\(*))|(\()|(\))|(,)|([^\w\n (),#])|( )/g;

  // TODO: While the above regex is technically entertaining swap out for a simple character walk and state engine.

  // regex parts
  const RP_SQ_STR = 1;
  const RP_DQ_STR = 2;
  const RP_NUM = 4;
  const RP_UNIT = 5;
  const RP_SCSS_VAR = 6;
  const RP_LITERAL = 8;
  const RP_FUNCTION = 9;
  const RP_LEFT_BR = 10;
  const RP_RIGHT_BR = 11;
  const RP_COMMA = 12;
  const RP_OPERATOR = 13;
  const RP_SPACE = 14;

  let token = tokenRegex.exec(inStr);
  const results = [];

  while (token) {
    if (token[RP_SCSS_VAR]) {
      results.push({
        type: TOKEN_TYPES.SCSS_VAR,
        value: token[RP_SCSS_VAR],
      });
    } else if (token[RP_FUNCTION]) {
      results.push({
        type: TOKEN_TYPES.FUNCTION,
        value: token[RP_LITERAL],
      });
      results.push({
        type: TOKEN_TYPES.LEFT_BR,
        value: token[RP_FUNCTION],
      });
    } else if (token[RP_OPERATOR]) {
      results.push({
        type: TOKEN_TYPES.OPERATOR,
        value: token[RP_OPERATOR],
      });
    } else if (token[RP_LITERAL]) {
      results.push({
        type: TOKEN_TYPES.TEXT_LITERAL,
        value: token[RP_LITERAL],
      });
    } else if (token[RP_LEFT_BR]) {
      results.push({
        type: TOKEN_TYPES.LEFT_BR,
        value: token[RP_LEFT_BR],
      });
    } else if (token[RP_RIGHT_BR]) {
      results.push({
        type: TOKEN_TYPES.RIGHT_BR,
        value: token[RP_RIGHT_BR],
      });
    } else if (token[RP_COMMA]) {
      results.push({
        type: TOKEN_TYPES.SEPARATOR,
        value: token[RP_COMMA],
      });
    } else if (token[RP_SQ_STR] || token[RP_DQ_STR]) {
      results.push({
        type: TOKEN_TYPES.QUOTED_LITERAL,
        value: token[RP_SQ_STR] || token[RP_DQ_STR],
      });
    } else if (token[RP_NUM]) {
      results.push({
        type: TOKEN_TYPES.NUMERIC_LITERAL,
        value: token[RP_NUM],
        units: token[RP_UNIT],
      });
    } else if (token[RP_SPACE]) {
      if (results.length) {
        results[results.length - 1].spaceAfter = true;
      }
      // } else {
      // ignore unknown
      //   results.push({
      //     type: TOKEN_TYPES.UNKNOWN,
      //     value: token,
      //   });
    }

    token = tokenRegex.exec(inStr);
  }

  return results;
};

const addToCurrent = (current, value) => {
  let target;
  let host = current;

  if (
    current.type === TOKEN_TYPES.FUNCTION ||
    current.type === TOKEN_TYPES.BRACKETED_CONTENT
  ) {
    // may have one or more items
    host =
      current.items.length && current.items[0].type === TOKEN_TYPES.LIST
        ? current.items[0]
        : current;

    if (host.type === TOKEN_TYPES.LIST) {
      host.raw = `${host.raw}, ${value.raw}${value.spaceAfter ? ' ' : ''}`;
    }
  } else {
    host = current;
  }

  if (host.type === TOKEN_TYPES.LIST) {
    target = host.items[host.items.length - 1];
    target.raw = `${target.raw || ''}${value.raw}${
      value.spaceAfter ? ' ' : ''
    }`;
  } else {
    target = host;
  }

  target.items.push(value);
};

const maybeMathEnd = (type) => {
  return type !== TOKEN_TYPES.OPERATOR && type !== TOKEN_TYPES.LEFT_BR;
};

const doEndMath = (current) => {
  const newCurrent = current.parent;

  delete current.parent;
  addToCurrent(newCurrent, current);

  newCurrent.raw = `${newCurrent.raw || ''}${current.raw}`;

  return newCurrent;
};

// tokenizeValue generates a output that looks like the following
// { items: [T], raw: 'R' } where [T] is an array tokens and R is the string value
// Each T is an object of the form
// {
//   items, // undefined or array of type T
//   type, // type of the item e.g. "Quoted literal",
//   value, // undefined or value e.g. matches raw for simple types,
//          // otherwise undefined except for type functions where it contains the name,
//   raw, // string value representing the whole item
// }
// where T.type = MATH, T.items contains maths (an array of T)
// where T.type = LIST, T.itmes is an array of { type: LIST_ITEM, items: [T], raw: 'raw value' }
// where T.type = BRACKETED_CONTENT, T.items contains array of T
// where T.type = FUNCTION, T.items contains an array of T representing the parameters

const tokenizeValueInner = (value) => {
  const tokenList = getTokenList(value);
  const result = { items: [] };
  let current = result;
  let lastToken = {};

  for (const token of tokenList) {
    const endsMath =
      current.type === TOKEN_TYPES.MATH &&
      maybeMathEnd(lastToken.type) &&
      maybeMathEnd(token.type);

    token.raw = token.units ? `${token.value}${token.units}` : `${token.value}`;
    const space = token.spaceAfter ? ' ' : '';

    if (endsMath) {
      current = doEndMath(current);
    }

    if (
      token.type !== TOKEN_TYPES.LEFT_BR &&
      token.type !== TOKEN_TYPES.FUNCTION &&
      token.type !== TOKEN_TYPES.SEPARATOR
    ) {
      current.raw = `${current.raw || ''}${token.raw}${space}`;
    }

    if (token.type === TOKEN_TYPES.FUNCTION) {
      const item = {
        items: [],
        type: token.type,
        value: token.value,
        parent: current,
        creatingFunction: true,
        isCalc: token.value === 'calc',
        raw: `${token.value}(`,
      };

      current = item;
    } else if (token.type === TOKEN_TYPES.LEFT_BR) {
      if (current.creatingFunction) {
        delete current.creatingFunction;
      } else {
        const item = {
          items: [],
          type: TOKEN_TYPES.BRACKETED_CONTENT,
          parent: current,
          raw: '(',
        };

        current = item;
      }
    } else if (token.type === TOKEN_TYPES.RIGHT_BR && current.parent) {
      const item = current;

      current = item.parent;
      delete item.parent;
      addToCurrent(current, item); //do we need right bracket
      current.raw = `${current.raw || ''}${item.raw}`;
    } else if (token.type === TOKEN_TYPES.OPERATOR) {
      // is Math ends with litreal followed by non-operator
      const prev = current.items.pop(); // maths starts with previuos item
      const item = {
        items: [prev],
        parent: current,
        type: TOKEN_TYPES.MATH,
        raw: `${prev.raw}${lastToken.spaceAfter ? ' ' : ''}${
          token.raw
        }${space}`,
      };

      current.raw = current.raw.substring(0, current.raw.indexOf(prev.raw));

      current = item;
      addToCurrent(current, token); // add operator
    } else if (token.type === TOKEN_TYPES.SEPARATOR) {
      // list all the way to end of function or value

      if (current.type !== TOKEN_TYPES.LIST) {
        if (
          current.type === TOKEN_TYPES.FUNCTION ||
          current.type === TOKEN_TYPES.BRACKETED_CONTENT
        ) {
          const item = {
            items: [
              {
                type: TOKEN_TYPES.LIST_ITEM,
                items: current.items,
                raw: lastToken.raw,
              },
              { type: TOKEN_TYPES.LIST_ITEM, items: [], raw: '' },
            ],
            type: TOKEN_TYPES.LIST,
            raw: lastToken.raw,
          };

          current.items = [item];
        } else {
          current.type = TOKEN_TYPES.LIST;
          current.items = [
            {
              type: TOKEN_TYPES.LIST_ITEM,
              items: current.items,
              raw: current.raw,
            },
            { type: TOKEN_TYPES.LIST_ITEM, items: [], raw: '' },
          ];
        }
      } else {
        current.items.push({ type: TOKEN_TYPES.LIST_ITEM, items: [], raw: '' });
      }

      current.raw = `${current.raw || ''}${token.raw}${space}`;
    } else {
      addToCurrent(current, token);
    }

    lastToken = token;
  }

  while (current.parent) {
    // attempt to tidy up if not back at result
    if (current.type === TOKEN_TYPES.MATH) {
      current = doEndMath(current);
    } else {
      const item = current;

      current = item.parent;
      delete item.parent;

      addToCurrent(current, item);
    }
  }

  return result;
};

const tokenizeValue = (value) => {
  let result;

  try {
    result = tokenizeValueInner(value);
  } catch (error) {
    result = { items: [], raw: value, error, message: 'Failed to parse value' };
  }

  return result;
};

export { tokenizeValue, TOKEN_TYPES };
