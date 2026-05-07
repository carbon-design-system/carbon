import React from 'react';
import { isComponentElement } from '../utils';

const TestComponent = ({ message }) => <div>{message}</div>;

describe('isComponentElement', () => {
  it('should return `true` for a valid element of the given component', () => {
    const element = <TestComponent message="hello" />;

    expect(isComponentElement(element, TestComponent)).toBe(true);
  });

  it('should return `false` for a valid element of a different component', () => {
    const OtherComponent = () => <span>Other</span>;
    const element = <OtherComponent />;

    expect(isComponentElement(element, TestComponent)).toBe(false);
  });

  it('should return `false` for non-elements', () => {
    const elements = [
      'brr',
      0,
      [],
      {},
      true,
      new Date(),
      function () {},
      class {},
      Symbol('symbol'),
      /regex/,
      new Map(),
      new WeakSet(),
      new ArrayBuffer(8),
      null,
      undefined,
    ];

    elements.forEach((element) => {
      expect(isComponentElement(element, element)).toBe(false);
    });
  });

  it('should return `false` for plain objects that look like elements', () => {
    const fakeElement = { type: TestComponent, props: { message: 'fake' } };

    expect(isComponentElement(fakeElement, fakeElement)).toBe(false);
  });

  it('should return `false` for components with identical structure but different references', () => {
    const ComponentA = () => <div>∞</div>;
    const ComponentB = () => <div>∞</div>;

    const element = <ComponentA />;

    expect(isComponentElement(element, ComponentB)).toBe(false);
    expect(isComponentElement(element, ComponentA)).toBe(true);
    expect(isComponentElement(ComponentA, ComponentA)).toBe(false);
    expect(isComponentElement(ComponentB, ComponentB)).toBe(false);
    expect(isComponentElement(ComponentA, ComponentB)).toBe(false);
  });

  it('should return `false` when `displayName` matches without fallback enabled', () => {
    const WrappedComponent = () => <div>wrapped</div>;

    TestComponent.displayName = 'TestComponent';
    WrappedComponent.displayName = 'TestComponent';

    const element = <WrappedComponent />;

    expect(isComponentElement(element, TestComponent)).toBe(false);
  });

  it('should return `true` when `displayName` matches and fallback is enabled', () => {
    const WrappedComponent = () => <div>wrapped</div>;

    TestComponent.displayName = 'TestComponent';
    WrappedComponent.displayName = 'TestComponent';

    const element = <WrappedComponent />;

    expect(
      isComponentElement(element, TestComponent, {
        allowDisplayNameFallback: true,
      })
    ).toBe(true);
  });

  it('should return `false` when only the compared component has `displayName`', () => {
    TestComponent.displayName = 'TestComponent';

    const OtherComponent = () => <div>other</div>;
    const element = <OtherComponent />;

    expect(isComponentElement(element, TestComponent)).toBe(false);
  });
});
