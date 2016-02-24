# Card

## Card Styles
### Card (base)
* Use this as a base card to build your own custom card

![card](https://uploads.github.ibm.com/github-enterprise-assets/0000/0076/0000/7892/bc96f910-c43d-11e5-9a64-f9f12d8af4a9.png)

### App

![app](https://uploads.github.ibm.com/github-enterprise-assets/0000/0076/0000/7894/bc9a57a4-c43d-11e5-8c3b-6c9b7c4518d0.png)

### Container

![container](https://uploads.github.ibm.com/github-enterprise-assets/0000/0076/0000/7889/bc785d8e-c43d-11e5-8bb5-f4dd0b6d47ca.png)

### Quota

![quota](https://uploads.github.ibm.com/github-enterprise-assets/0000/0076/0000/7891/bc95bb90-c43d-11e5-9cd8-f5b3e2732a9e.png)

### Service

![service](https://uploads.github.ibm.com/github-enterprise-assets/0000/0076/0000/7890/bc94a322-c43d-11e5-89af-6e82d4a2874b.png)

### Virtual Server

![virtual-server](https://uploads.github.ibm.com/github-enterprise-assets/0000/0076/0000/7893/bc97536a-c43d-11e5-9038-58fdb6740be3.png)

## Configuration

### Change Status in Footer

When there's a card that shows status in its footer,
**toggle the `active` classname to show the appropriate status.**

```markup
<!-- app status -->
<div class="card-footer__app-status">
  <div class="card-footer__app-status--running active">
    Running
  </div>
  <div class="card-footer__app-status--not-running">
    Not Running
  </div>
  <div class="card-footer__app-status--stopped">
    Stopped
  </div>
  <div class="card-footer__app-status--limited">
    Limited
  </div>
</div>
```
