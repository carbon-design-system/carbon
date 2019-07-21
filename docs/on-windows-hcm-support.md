**Carbon Component supports High Contrast mode for Windows 10 on Chrome, Edge,
and Internet Explorer.** Notable by it's absence is Firefox. For background on
why you need to understand Windows High Contrast Mode and how the three browser
manufacturers choose to handle it.

### What is Windows High Contrast Mode

Windows High Contrast Mode (WHCM) is an accessibility feature in Windows 10 that
enables users to select one of four built in themes (two dark and two light) or
specify their own custom colors to create a theme of their own. This makes it
impossible to predict how your content will appear to a user with WHCM enabled.
To mitigate this Microsoft have a proprietary CSS extension which when used as a
media query allows you to detect WHCM and set a CSS system color as a fallback
should your visual design lose some amount of usability with this accessibility
affordance enabled.

```
@media screen and (-ms-high-contrast: active) {
  /* All high contrast styling rules */

}
@media screen and (-ms-high-contrast: black-on-white) {
  div { background-image: url('image-bw.png');  }

}
@media screen and (-ms-high-contrast: white-on-black) {
  div { background-image: url('image-wb.png');  }

}
```

[From the MDN on -ms-high-contrast](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/-ms-high-contrast#Example)

### Edge/Internet Explorer

Microsoft's browsers Edge and Internet Explorer obviously have ideal support for
WHCM applying a users chosen theme wholesale to the web content and allowing
developers to target problematic CSS generated graphics or SVGs via their
extension and set safe fallbacks using CSS system colors.

### Chrome

Chrome does not support WHCM instead prompting the user to install a
[Google created High Contrast extension](https://chrome.google.com/webstore/detail/high-contrast/djcfdncoelnlbldjfhinnjlhdjlikmph?hl=en)
into their browser. This extension has no interoperability with WHCM or a user's
custom themes; instead users must select from one of six pre-programmed color
schemes. The schemes filter a site's content and are generally much more
forgiving on graphics heavy designs.

### Firefox

Firefox has full support and interoperability with WHCM allowing web content to
be displayed in a user's custom theme. They do not however support Microsoft's
CSS extension. This makes reliably targetting inaccessible or unusable graphics
and setting safe fallbacks very difficult and error prone due to the infinte
customizability of WHCM.
[There is an open proposal](https://bugzilla.mozilla.org/show_bug.cgi?id=1506364)
for a `prefers-contrast` media query which we will be monitoring.

### Carbon support for WHCM moving forward

After raising the issue and conferring with our colleagues in IBM Accessibility,
we've made the decision to support WHCM in Edge, Internet Explorer, and Chrome
moving forward. We want Carbon components to be accessible to all our users. And
we can be confident that WHCM users will have a better overall experience on one
of those browsers.
