/**
 * @jest-environment node
 */

/* global describe it expect */

// eslint-disable-next-line strict,lines-around-directive
'use strict';

const { JSDOM } = require('jsdom');
const Handlebars = require('handlebars');
const helpers = require('handlebars-helpers');
const { ChevronDownGlyph } = require('@carbon/icons');
const { getIconsPartialsElements } = require('../tools/partials/build');
const js2partial = require('../tools/partials/js2partial');
const registerPartials = require('../tools/partials/register');

const {
  ChevronDownGlyph: PartialChevronDownGlyph,
  ChevronDown16: PartialChevronDown16,
  ChevronDown32: PartialChevronDown32,
} = getIconsPartialsElements();

function MockHandlebars() {
  return Object.assign(new Map(), {
    registerPartial: Map.prototype.set,
  });
}

describe('js2partial', () => {
  it('should generate the right partial', () => {
    const handlebars = Handlebars.create();
    helpers({ handlebars });
    const partial = js2partial(ChevronDownGlyph);
    handlebars.registerPartial('carbon-icon-chevron-down', partial);
    const rendered = handlebars.compile(`{{> carbon-icon-chevron-down attr-class="foo" }}`)();
    const { document } = new JSDOM(`<!DOCTYPE html>${rendered}`).window;
    const svg = document.querySelector('svg');
    expect(svg.getAttribute('class')).toBe('foo');
    const path = svg.querySelector('path');
    expect(path.getAttribute('d')).toBe('M5 6L0 1 .7.3 5 4.6 9.3.3l.7.7z');
  });

  it('should copy aria-label value to <title>', () => {
    const handlebars = Handlebars.create();
    helpers({ handlebars });
    const partial = js2partial(ChevronDownGlyph);
    handlebars.registerPartial('carbon-icon-chevron-down', partial);
    const rendered = handlebars.compile(`{{> carbon-icon-chevron-down attr-aria-label="foo" }}`)();
    const { document } = new JSDOM(`<!DOCTYPE html>${rendered}`).window;
    const svg = document.querySelector('svg');
    expect(svg.getAttribute('aria-label')).toBe('foo');
    const path = svg.querySelector('title');
    expect(path.textContent).toBe('foo');
  });
});

describe('registerPartials', () => {
  it('should register sizeless variant with base name', () => {
    const mockHandlebars = new MockHandlebars();
    registerPartials(mockHandlebars, { PartialChevronDownGlyph });
    expect(mockHandlebars.get('carbon-icon-chevron-down')).toBe(PartialChevronDownGlyph.partial);
  });

  it('should register sized variant with base name and size', () => {
    const mockHandlebars = new MockHandlebars();
    registerPartials(mockHandlebars, { PartialChevronDown32 });
    expect(mockHandlebars.get('carbon-icon-chevron-down-32')).toBe(PartialChevronDown32.partial);
  });

  it('should register sized variant with base name if there is no sizeless one', () => {
    const mockHandlebars = new MockHandlebars();
    registerPartials(mockHandlebars, { PartialChevronDown32 });
    expect(mockHandlebars.get('carbon-icon-chevron-down')).toBe(PartialChevronDown32.partial);
  });

  it('should take sizeless one the precedence for choosing the one with the base name', () => {
    const mockHandlebars = new MockHandlebars();
    registerPartials(mockHandlebars, { PartialChevronDownGlyph, PartialChevronDown32 });
    expect(mockHandlebars.get('carbon-icon-chevron-down')).toBe(PartialChevronDownGlyph.partial);
    expect(mockHandlebars.get('carbon-icon-chevron-down-32')).toBe(PartialChevronDown32.partial);
  });

  it('should take smaller sized one the precedence for choosing the one with the base name', () => {
    const mockHandlebars = new MockHandlebars();
    registerPartials(mockHandlebars, { PartialChevronDown16, PartialChevronDown32 });
    expect(mockHandlebars.get('carbon-icon-chevron-down')).toBe(PartialChevronDown16.partial);
    expect(mockHandlebars.get('carbon-icon-chevron-down-16')).toBe(PartialChevronDown16.partial);
    expect(mockHandlebars.get('carbon-icon-chevron-down-32')).toBe(PartialChevronDown32.partial);
  });
});
