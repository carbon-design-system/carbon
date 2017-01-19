import '../../demo/polyfills/object-assign';

describe('Test object-assign', function () {
  it(`Should cope with undefined arg`, function () {
    const o = { foo: 'Foo' };
    expect(Object.assign({}, undefined, o)).to.deep.equal(o);
  });

  it(`Should cope with null arg`, function () {
    const o = { foo: 'Foo' };
    expect(Object.assign({}, null, o)).to.deep.equal(o);
  });
});
