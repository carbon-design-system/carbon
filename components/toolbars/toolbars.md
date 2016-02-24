# Toolbars

## Toolbar style: Icons

![Toolbar: Icons](https://uploads.github.ibm.com/github-enterprise-assets/0000/2212/0000/9454/c85087bc-cbfe-11e5-9136-f7f17976210c.png)

#### After clicking the search icon
![toolbar-search-2](https://uploads.github.ibm.com/github-enterprise-assets/0000/2212/0000/9477/a8901c8c-cc10-11e5-9807-3eb5cb107cba.gif)

### Configuration

Each icon can also exist by itself, so if you only need for example the search and grid icon you can remove/comment out the code for the sort icon. See example below:

<img width="120" alt="screen shot 2016-02-05 at 1 53 39 pm" src="https://uploads.github.ibm.com/github-enterprise-assets/0000/2212/0000/9473/ee0d5a5a-cc0f-11e5-8cb7-d6e62c0fb24b.png">

```html
<div class="toolbar-icons">

  <!-- Slide out search field -->
  <div class="slide-out-search">
    <input type="search" class="search-field" data-list-icons-search-field placeholder="Start typing to filter results..">
  </div>

  <!-- Icon list -->
  <ul class="toolbar-icons__icons">
    <li data-list-icons-search-action-target="[data-list-icons-search-field]" data-id="search-action" class="icons__tool">
      <svg class="tool-icon">
        <use xlink:href="../../images/sprite.svg#common--search"></use>
      </svg>
    </li>
    <!-- Comment out a list item if it's not needed
    <li data-id="sort-action" class="icons__tool">
      <a href="#">
        <svg class="tool-icon">
          <use xlink:href="../../images/sprite.svg#common--arrows"></use>
        </svg>
      </a>
    </li>
    -->
    <li class="icons__tool">
      <a href="#">
        <svg class="tool-icon">
          <use xlink:href="../../images/sprite.svg#common--grid"></use>
        </svg>
      </a>
    </li>
  </ul>

</div>
```

#### Testing the slide out search field

In order to test the slide out search field on the overview page of ```bluemix-components```, make sure you uncomment the first line of the class ```toolbar-icons```:

```css
.toolbar-icons {
  // Uncomment the line below to test the slide-out search field
  // margin-left: 25em;
  display: flex;
}
```
