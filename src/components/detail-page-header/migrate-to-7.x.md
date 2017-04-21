### HTML

Detail Page Header now includes Overflow Menu and Breadcrumb.
A lot of classes have been removed, see SCSS for more details.

### SCSS

The `_detail-page-header.scss` file is now located at `src/components/detail-page-header/_detail-page-header.scss`. You will need to update any `@import` statements for this file to reflect this change.

**New**: 
```scss
@import 'path_to_node_modules/carbon-components/src/components/detail-page-header/detail-page-header';
```

**Old**: 
```scss
@import 'path_to_node_modules/@console/bluemix-components/src/components/detail-page-header/detail-page-header';
```

A lot of classes have been changed and consolidated.
There are no direct 1:1 class name changes, but a lot of classes have been removed.

| Old Class                                             | New Class | Note    |
|-------------------------------------------------------|-----------|---------|
| .bx--detail-page-header--no-tabs__link-wrapper        |           | Removed |
| .bx--detail-page-header--no-tabs__link-text           |           | Removed |
| .bx--detail-page-header--no-tabs__arrow               |           | Removed |
| .bx--detail-page-header--no-tabs__info-title          |           | Removed |
| .bx--detail-page-header--with-tabs--animated          |           | Removed |
| .bx--detail-page-header--with-tabs--animated-slide-up |           | Removed |
| .bx--detail-page-header--with-tabs__container         |           | Removed |
| .bx--detail-page-header--with-tabs__container         |           | Removed |
| .bx--detail-page-header--with-tabs__breadcrumb        |           | Removed |
| .bx--detail-page-header--with-tabs__breadcrumb-title  |           | Removed |
| .bx--detail-page-header--with-tabs__link-wrapper      |           | Removed |
| .bx--detail-page-header--with-tabs__arrow             |           | Removed |
| .bx--detail-page-header--with-tabs__info              |           | Removed |
| .bx--detail-page-header--with-tabs__info--title       |           | Removed |
| .bx--detail-page-header--with-tabs__tabs-container    |           | Removed |


### JavaScript

The `handleScroll` method has been renamed to `_handleScroll` to indicate that it is a private method now.
