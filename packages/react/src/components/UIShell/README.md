# UI Shell

> **Experimental** components for building a product shell when using the Carbon
> Design System

## Components

- `Header`: used to render the top bar in your application
  - `HeaderMenuButton`: used to display the trigger for a menu
  - `HeaderName`: used to display the name of the product
  - `HeaderGlobalBar`: used to display global actions
    - `HeaderGlobalAction`: used to display a global action
  - `HeaderMenubar`: used to display nav links
    - `HeaderMenu`: used to display a menu in the nav
    - `HeaderMenuItem`: used to display a menu item, often a link
- `SideNav`: used to render the container for the side navigation of a page
  - `SideNavHeader`: used to render the top bar in the side navigation
    - `SideNavDetails`: renders the title for the side nav
      - `SideNavSwitcher`: provides an optional tool to handle switching at the
        top-level
  - `SideNavItems`: used for rendering items in the sub nav
    - `SideNavLink`: renders a link in the side nav
    - `SideNavMenu`: renders a collapsible menu in the side nav
      - `SideNavMenuItem`: renders a link in a side nav menu
