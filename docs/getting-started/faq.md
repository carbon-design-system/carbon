# FAQ

#### Sass errors in `_extends.scss`
```
Error in plugin 'sass'
Message:
   bower_components/bluemix-components/base-elements/lists/_partials/_extends.scss
Error: "%table-section" failed to @extend "%helvetica-normal".
      The selector "%helvetica-normal" was not found.
      Use "@extend %helvetica-normal !optional" if the extend should be able to fail.
       on line 3 of bower_components/bluemix-components/base-elements/lists/_partials/_extends.scss
@extend %helvetica-normal;
```

The error is caused by a couple of things: `gulp-sass` by way of `node-sass` has become more strict about what SCSS will compile to CSS. This also exposed that in older versions; Bluemix Components was improperly using `@extend %placeholder` by either:
* extending a non-existent `%placeholder`
* using `@extend` within a `@media` query; both are not allowed.

We have since patched various earlier versions to deprecate these properties, we are also using `@mixin` exclusively.

**How to fix this**

You have a few options:

* Use `node-sass@3.4.2`, *this exact version*.
* Update to one of our patches appropriate to your version.
  * `5.x.x` update to `5.0.3-alpha`
  * `4.7.x` you're good
  * `4.6.x` update to `4.6.2-alpha`
  * `4.0.x` or older, update to `4.1.2-alpha`
  * Or update to `latest` stable version, see [releases](https://github.ibm.com/Bluemix/bluemix-components/releases)


## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).
