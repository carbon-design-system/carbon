/**
 * @jest-environment node
 */

'use strict';

const handlebars = require('handlebars');
const CarbonIcons = require('../../packages/icons');
const helper = require('../../packages/icons-handlebars');

describe('icons-handlebars', () => {
  let hbs;

  beforeEach(() => {
    hbs = handlebars.create();
    helper({ handlebars: hbs });
  });

  it('should throw if trying to compile an icon that does not exist', () => {
    expect(() => {
      hbs.compile(`{{ carbon-icon "DoesNotExist" }}`)();
    }).toThrow();
  });

  test.each(Object.keys(CarbonIcons))('%s should compile', (name) => {
    expect(() => {
      hbs.compile(`{{ carbon-icon "${name}" }}`)();
      hbs.compile(
        `{{ carbon-icon "${name}" aria-label="accessibility label" }}`
      )();
    }).not.toThrow();
  });
});
