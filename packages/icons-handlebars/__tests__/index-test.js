/**
 * @jest-environment node
 */

'use strict';

const CarbonIcons = require('@carbon/icons');
const handlebars = require('handlebars');
const helper = require('../');

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

  test.each(Object.keys(CarbonIcons))('%s should compile', name => {
    expect(() => {
      hbs.compile(`{{ carbon-icon "${name}" }}`)();
      hbs.compile(
        `{{ carbon-icon "${name}" aria-label="accessibility label" }}`
      )();
    }).not.toThrow();
  });
});
