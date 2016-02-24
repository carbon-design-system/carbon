# Detail Page Header

![detail-page-header](https://uploads.github.ibm.com/github-enterprise-assets/0000/0076/0000/8659/20b8e8f8-c93f-11e5-8f9d-bcead0902eca.png)

## Dependencies:

```scss
// Path to bower_components
// (edit according to your file structure)
$path: 'bower_components/bluemix-components';

// Global
@import '#{path}/global/global';         // variables

// Components
@import '#{path}/components/tabs-nav/tabs-nav';
@import '#{path}/components/detail-page-header/detail-page-header';
```

## Variations

### no-tabs

![no-tabs](https://uploads.github.ibm.com/github-enterprise-assets/0000/0076/0000/8660/fd0f4662-c93f-11e5-89f8-421902330d21.png)


```html
<header class="detail-page-header--no-tabs">
  <a href="#" class="detail-page-header--no-tabs__link-wrapper">
    <svg class="arrow">
      <use xlink:href="https://dev-console.stage1.ng.bluemix.net/api/v4/img/sprite.svg#service--back"></use>
    </svg>
  </a>
  <p class="info-title">Detail Page Header</p>
</header>
```

### With Tabs

![xs-small](https://uploads.github.ibm.com/github-enterprise-assets/0000/0076/0000/8844/1f1fb48c-c9c0-11e5-909b-7ad7c9186249.png)

![small](https://uploads.github.ibm.com/github-enterprise-assets/0000/0076/0000/8846/5aaf85ea-c9c0-11e5-86f5-2f30b1c92e65.png)

![tabs-expanded](https://uploads.github.ibm.com/github-enterprise-assets/0000/0076/0000/8845/5aaf890a-c9c0-11e5-8433-8880ec8d6bde.png)

```html
<header class="detail-page-header--with-tabs">
  <div class="detail-page-header--with-tabs__container">
    <div class="detail-page-header--with-tabs__breadcrumb">
      <a href="#" class="link-wrapper">
        <svg class="arrow">
          <use xlink:href="https://dev-console.stage1.ng.bluemix.net/api/v4/img/sprite.svg#service--back"></use>
        </svg>
        <p class="breadcrumb-title">breadcrumb title</p>
      </a>
    </div>
    <div class="detail-page-header--with-tabs__info">
      <p class="info-title">Detail Page Header</p>
    </div>
  </div>
  <div class="detail-page-header--with-tabs__tabs-container">
    <nav class="tabs">
      <div class="tabs__trigger"><p class="trigger__text"></p>
        <?xml version="1.0" encoding="utf-8"?>
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 7.5 3.8" enable-background="new 0 0 7.5 3.8" xml:space="preserve">
          <polygon points="0,0 7.5,0 3.8,3.8"/>
        </svg>
        </div>
      <ul class="tabs__nav tabs--hidden">
        <li class="nav__item selected"><a class="item__link" href="#">Overview</a></li>
        <li class="nav__item"><a class="item__link" href="#">Containers Files</a></li>
        <li class="nav__item"><a class="item__link" href="#">Connected Objects</a></li>
        <li class="nav__item"><a class="item__link" href="#">Manage</a></li>
      </ul>
    </nav>
  </div>
</header>
```
