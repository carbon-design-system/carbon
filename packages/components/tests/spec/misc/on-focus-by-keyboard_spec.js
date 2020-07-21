import onFocusByKeyboard from '../../../src/globals/js/misc/on-focus-by-keyboard';

describe('onFocusByKeyboard', function () {
  let input1;
  let input2;
  let container;
  let spy;
  let eventHandler;

  beforeAll(function () {
    input1 = document.createElement('input');
    input2 = document.createElement('input');
    input1.type = 'text';
    input2.type = 'text';
    container = document.createElement('div');
    container.appendChild(input1);
    container.appendChild(input2);
    document.body.appendChild(container);
  });

  it('should call event handler with keyboard based focus', function () {
    spy = jasmine.createSpy('focus');
    eventHandler = onFocusByKeyboard(container, 'focus', spy);
    container.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
    expect(spy.calls.count()).toEqual(1);
  });

  it('should call event handler with keyboard based blur', function () {
    spy = jasmine.createSpy('blur');
    eventHandler = onFocusByKeyboard(container, 'blur', spy);
    container.dispatchEvent(new FocusEvent('blur', { bubbles: true }));
    expect(spy.calls.count()).toEqual(1);
  });

  it('should handle unsupported events', function () {
    spy = jasmine.createSpy('blur');
    eventHandler = onFocusByKeyboard(container, 'blur', spy);
    container.dispatchEvent(new CustomEvent('unknown', { bubbles: true }));
    expect(spy).not.toHaveBeenCalled();
  });

  it('should throw an error on unsupported events', function () {
    expect(() => onFocusByKeyboard(container, 'click', () => {})).toThrow();
  });

  it('should detect focus events caused by mouse', function () {
    spy = jasmine.createSpy('focus');
    eventHandler = onFocusByKeyboard(container, 'focus', spy);
    container.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    container.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
    expect(spy).not.toHaveBeenCalled();
  });

  it('should detect blur events caused by mouse', function () {
    spy = jasmine.createSpy('blur');
    eventHandler = onFocusByKeyboard(container, 'blur', spy);
    container.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    container.dispatchEvent(new FocusEvent('blur', { bubbles: true }));
    expect(spy).not.toHaveBeenCalled();
  });

  afterEach(function () {
    if (eventHandler) {
      eventHandler.release();
    }
    eventHandler = null;
  });

  afterAll(function () {
    document.body.removeChild(container);
  });
});
