import svgToggleClass from '../../../src/globals/js/misc/svg-toggle-class';

describe('Test toggling class for <svg>', function() {
  const svg = document.createElement('svg');

  it('Should add class for toggling', function() {
    svg.setAttribute('class', 'foo bar');
    svgToggleClass(svg, 'baz');
    expect(svg.getAttribute('class')).toBe('foo bar baz');
  });

  it('Should remove class for toggling', function() {
    svg.setAttribute('class', 'foo bar');
    svgToggleClass(svg, 'foo');
    expect(svg.getAttribute('class')).toBe('bar');
  });

  it('Should add class if specified', function() {
    svg.setAttribute('class', 'foo bar');
    svgToggleClass(svg, 'baz', true);
    expect(svg.getAttribute('class')).toBe('foo bar baz');
  });

  it('Should remove class if specified', function() {
    svg.setAttribute('class', 'foo bar');
    svgToggleClass(svg, 'foo', false);
    expect(svg.getAttribute('class')).toBe('bar');
  });

  it('Should sanitize upon edit', function() {
    svg.setAttribute('class', ' foo bar  foo ');
    svgToggleClass(svg, 'baz', true);
    expect(svg.getAttribute('class')).toBe('foo bar baz');
  });

  it('Should keep class attribute intact if there is no edit', function() {
    svg.setAttribute('class', ' foo bar  foo ');
    svgToggleClass(svg, 'baz', false);
    expect(svg.getAttribute('class')).toBe(' foo bar  foo ');
  });
});
