# Data Modules

- create modules within a `module-section`

```html
<section class="data-section">
  <div class="data-module--full">
    //...
  </div>
</section>
```

Classes for base module containers:

- `data--one-third`
- `data--two-third`
- `data--half`
- `data--full`

Classes for internal modules (within the containing ones):

- `.full`
- `.half`

![screen shot 2016-02-12 at 3 02 07 pm](https://uploads.github.ibm.com/github-enterprise-assets/0000/0078/0001/0513/1ec9a934-d19a-11e5-8896-c826996c75cf.png)
![screen shot 2016-02-12 at 3 01 58 pm](https://uploads.github.ibm.com/github-enterprise-assets/0000/0078/0001/0514/21e4eb38-d19a-11e5-861c-f15185eed35d.png)


# Components required

```scss
@import 'bluemix-components/core/colors/colors';

@import 'bluemix-components/components/modules/modules';
```
