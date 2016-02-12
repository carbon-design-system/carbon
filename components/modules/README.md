# Modules


Basic usage

![Module](https://uploads.github.ibm.com/github-enterprise-assets/0000/1346/0000/8757/eeb59346-c999-11e5-93cc-8bc145bb0b09.png)

- create modules within a `module-section`

```html
<section class="module-section">
  <div class="module--full">
    <div class="module__body">Basic module</div>
  </div>
</section>
```

Classes for base module containers:

- `module--one-third`
- `module--two-third`
- `module--half`
- `module--full`

Classes for internal modules (within the containing ones):

- `.full`
- `.half`

![Module Options](https://uploads.github.ibm.com/github-enterprise-assets/0000/0078/0001/0521/71f81f2a-d19d-11e5-8cfe-145d2c712a9c.png)

Header and footer blocks are optional:

![With header and footer](https://uploads.github.ibm.com/github-enterprise-assets/0000/1346/0000/8756/9ca8d82e-c999-11e5-985f-f1d93a70bbd9.png)

```html
<div class="module--half">
  <div class="module__header">Header</div>
  <div class="module__body">Panel Body</div>
  <div class="module__footer">Footer</div>
</div>
```

# Components required

```scss
@import 'bluemix-components/core/colors/colors';

@import 'bluemix-components/components/modules/modules';
```
