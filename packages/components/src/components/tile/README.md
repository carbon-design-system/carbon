### SCSS

#### Modifiers

Use these modifiers with `.bx--tile` class.

| Selector                | Description                                                              |
| ----------------------- | ------------------------------------------------------------------------ |
| `.bx--tile--clickable`  | Adds specific styles and custom focus/hover states for a clickable tile  |
| `.bx--tile--expandable` | Adds specific styles and custom focus/hover states for a expandable tile |
| `.bx--tile--selectable` | Adds specific styles and custom focus/hover states for a selectable tile |

### Javascript

#### Options

| Option                 | Default Selector         | Description                                                                    |
| ---------------------- | ------------------------ | ------------------------------------------------------------------------------ |
| `selectorInit`         | `[data-tile]`            | The selector to find the Tile element.                                         |
| `selectorAboveTheFold` | `[data-tile-atf]`        | The selector to find the above the fold content for a expandable Tile element. |
| `selectorTileInput`    | `[data-tile-input]`      | The selector to find the input field in a selectable Tile element.             |
| `classExpandedTile`    | `.bx--tile--is-expanded` | The CSS modifier class triggered when a tile is expanded                       |
| `classClickableTile`   | `.bx--tile--is-clicked`  | The CSS modifier class triggered when a tile is clicked                        |
| `classSelectableTile`  | `.bx--tile--is-selected` | The CSS modifier class triggered when a tile is selected                       |

### Tile types

#### Expandable Tiles

The expandable tile consists of two content container, one for the above the
fold content and one for the below the fold content. Place the content you want
to be displayed in the tile before it is expanded in the above the fold
container, and the content that is to be revealed when a tile is expnaded in the
below the fold container. The JavaScript attached to the expandable tile will
automatically calculate the height needed to display both containers.

```html
<div data-tile="expandable" class="bx--tile bx--tile--expandable" tabindex="0">
  <button class="bx--tile__chevron">
    <svg width="12" height="8" viewBox="0 0 12 8" fill-rule="evenodd">
      <path d="M10.6 0L6 4.7 1.4 0 0 1.4l6 6.1 6-6.1z"></path>
    </svg>
  </button>
  <div class="bx--tile-content">
    <span data-tile-atf class="bx--tile-content__above-the-fold">
      <!-- Above the fold content here -->
    </span>
    <span class="bx--tile-content__below-the-fold">
      <!-- Rest of the content here -->
    </span>
  </div>
</div>
```

#### Selectable Tiles

The selectable tile includes a hidden checkbox input element, and the value of
the selected tile can be obtained using the same method as with any other
checkbox element.

#### Clickable Tiles

The clickable tile is an anchor tag.
