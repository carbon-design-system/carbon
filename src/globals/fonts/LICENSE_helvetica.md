# Terms of Use

The Helvetica Neue license includes unlimited usage for all IBM software, either on premise or Software as a Service (SaaS). This license allows you to use the fonts for _"IBM branded software products installed on customer workstations, servers, tablets and mobile devices"_. This includes _"all platforms that support font data installation"_, as well as _"IBM server based software products where the font remains on IBM servers"_ on an unlimited number of servers or CPUs.

All web properties are typically required to include a tracking code to count the number of page views the fonts are viewed on. If you choose not use the tracking code but want to use the fonts, you will need to track page views through another means, like IBM Customer Analytics, for example. If you count your own page views, in December of each calendar year, please email a numeric value of total annual page views to Daniel Kuehn: dkuehn@us.ibm.com, who will send the additional traffic numbers to Monotype.

For the Monotype agreement, web properties means ibm.com pages and other ibm operated sites (e.g. developerworks) - not SaaS offerings (IBM server based software products where the font remains on IBM servers). As for business partners, they need to get their own font licenses. To include the tracking code, add one of the following to each web page on which the fonts are used:

**Synchronous Tracking Code**

```css
<link rel="stylesheet" href="//fast.fonts.net/t/1.css?apiType=css&amp;projectid=d7ff268f-904d-48ea-8974-3addd9b84405">
```

**Asynchronous Tracking Code**

```javascript
window.MTIProjectId = 'd7ff268f-904d-48ea-8974-3addd9b84405';
(function() {
  var mtiTracking = document.createElement('script');
  mtiTracking.type = 'text/javascript';
  mtiTracking.async = 'true';
  mtiTracking.src = ('https:' == document.location.protocol ? 'https:' : 'http:') + '//fast.fonts.net/t/trackingCode.js';
  (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(mtiTracking);
})();
```
