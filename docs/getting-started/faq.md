# FAQ

#### "I have a question to ask you, when will you respond to my Slack/emails/sametime?"

We do our best to respond to all questions and direct messages when they're asked.

But for the **best results**, we rely on GitHub [issues](https://github.ibm.com/Bluemix/bluemix-components/issues) to answer questions and discuss problems **openly** and **on-the-record**.

I encourage you to search the [issues](https://github.ibm.com/Bluemix/bluemix-components/issues) on our repo; it's possible we may have already answered your question or addressed it in a previous issue.

If not, [make an issue](https://github.ibm.com/Bluemix/bluemix-components/issues/new) and ask your question. You'll have the benefit of many IBM Bluemix devs ready to jump in and help you out.

#### "I need help now...this won't take long, do I really need to make an issue?"

Ask us on Slack.
If the problem gets resolved quickly. Great!
But it's not guaranteed that you'll get a response immediately or when you need it.
It's also not guaranteed that we can resolve your issue in that particular Slack conversation.

Again, the **best way to get help** with Bluemix Components is to [make an issue](https://github.ibm.com/Bluemix/bluemix-components/issues/new).

#### "I'm getting Sass errors in `_extends.scss`"
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
