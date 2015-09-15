# Navigation

A navigation pattern that uses the `<nav>` element in combination with other markup.
Navigation patterns are components that contain all the main navigational elements that allow users to navigate throughout the views of Atlas.

# Basic use

*This is some text on basic use of this pattern*

## Examples

### Atlas Global Header

The HTML for **Atlas Global Header** is made of these distinct parts:
- **Logo**
- **Nav**
  - Global Menu
  - Links List
- **Account**

The HTML will also change depending on these following states:
- authenticated
- unauthenticated

Full HTML for Atlas Global Header:

```html
<header class="global-header">
  <!-- Logo -->
  <a href="/" class="global-header__logo">
    <img src="..." alt="..." class="icon--atlas-logo">
    <h1 class="logo__wordmark">IBM <span>Cloud</span></h1>
  </a>
  <!-- Nav -->
  <nav class="global-header__nav" role="navigation">
    <button type="button" class="nav__dropdown-btn" id="global-menu-toggle">
      All Objects &or;
    </button>
    <!-- Global Menu -->
    <ul class="nav__global-menu">
      <li class="global-menu__item">
        <a href="/console/compute" class="global-menu__link">All Objects</a>
      </li>
      <li class="global-menu__item">
        <a href="/console/compute" class="global-menu__link">Compute <p class="global-menu__count">1</p></a>
      </li>
      <li class="global-menu__item">
        <a href="/console/network" class="global-menu__link">
          Network
          <p class="global-menu__count">2</p>
        </a>
      </li>
      <!-- more li.global-menu__items here -->
    </ul>
    <!-- Links List -->
    <ul class="nav__links-list">
      <li class="links-list__item"><a href="#" class="links-list__link active">manage</a></li>
      <li class="links-list__item"><a href="#" class="links-list__link">learn</a></li>
    </ul>
  </nav>
  <!-- Account -->
  <div class="global-header__account">
    <button class="btn--avatar"></button>
    <ul class="account__menu">
      <li class="account__menu-item"><a href="#" class="account__menu-link">menu link</a></li>
    </ul>
  </div>
</header>
```

## Classes

### Atlas Global Header

| Class | Effect | Remarks |
|-----------|--------|---------|
|`global-header`| Defines the Atlas Global Header | - |
|`global-header__logo` | Defines a block of HTML for Atlas logo and wordmark | - |
|`icon--atlas-logo` | Defines a reusable atlas logo | - |
|`logo__wordmark` | Defines the wordmark | -|
|`global-header__nav` | Defines the navigation region for Atlas Global Header | Contains all major navigation elements for Atlas. |
|`nav__dropdown-btn` | Button exclusive to Atlas Global Header | Used to toggle `nav__global-menu`  |
|`nav__global-menu` | Defines the Global Menu | Contains links to a user's different objects (compute, network, etc.) |
|`global-menu__item` | A list-item inside `nav__global-menu` | - |
|`global-menu__link` | A link inside `nav__global-menu` | - |
|`global-menu__count` | Quantity for number of objects | - |
|`nav__links-list` | Defines a block of navigational links for Atlas | - |
|`links-list__item` | A list-item inside `nav__links-list` | - |
|`links-list__link` | A link inside `nav__links-list` | - |
|`active` | A class that's toggled for any interactive elements | `active` class gets added and toggled on `links-list__link` |
|`global-header__account` | Defines a block for account related links | - |
|`btn--avatar` | A reusable avatar button | - |
|`account__menu` | Account menu | - |
|`account__menu-item` | A list-item inside `account__menu` | - |
|`account__menu-link` | A link inside `account__menu` | - |

## Attributes

### Atlas Global Header

| Attribute | Effect | Remarks |
|-----------|--------|---------|
|`role="navigation"` | Accessibility attribute for older browsers | Recommended to use on `<nav>` elements. For older browsers that don't use HTML5, the `role` attribute will tell screen-readers and other assistive technologies that this block is for navigation |
