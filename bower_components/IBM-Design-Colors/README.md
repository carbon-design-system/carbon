IBM Design Language Color Palette
===================================

Use the [Color Palettes](http://www.ibm.com/design/language/resources/swatch-book.shtml) from the [IBM Design Language](http://www.ibm.com/design/language/index.shtml) based on its  [Color Guidelines](http://www.ibm.com/design/language/framework/visual/color.shtml) in your Sass project.

## Installation

The IBM Design Language Color Palette can be installed via [Bower](http://bower.io/). It will work with any Sass compiler compatible with Sass 3.3 or greater.

```bash
$ bower install ibm-colors --save-dev
```

Then import `ibm-colors`.

```scss
@import 'path/to/bower_components/ibm-colors/ibm-colors';
```

## Usage

With the color palette imported you will now have access to two functions:

### Color Palette

Returns the specified color from the specified color palette

#### `color($palette, [$tone: 'core'])`

```scss
//////////////////////////////////////////////////
//  ------------------------------------------  //
// | Options       | Type          | Required | //
// |---------------|---------------|----------| //
// | Color Palette | String        | Yes      | //
// | Color Tone    | String/Number | Optional | //
//  ------------------------------------------  //
//////////////////////////////////////////////////

background: color('blue', 80);     // #1d3649
background: color('blue', 8);      // #1d3649
background: color('blue', 'core'); // #4178be
background: color('blue');         // #4178be
```

### Color Tint

Returns a color the specified amount of steps lighter than the given color in the given color's color palette

#### `color-tint($color, $amount)`

```scss
//////////////////////////////////////////////////
//  ------------------------------------------  //
// | Options       | Type          | Required | //
// |---------------|---------------|----------| //
// | Color Palette | Color         | Yes      | //
// | Tint Amount   | Number        | Yes      | //
//  ------------------------------------------  //
//////////////////////////////////////////////////

background: color-tint(color('blue', 80), 20);     // #325c80
background: color-tint(color('blue', 80), 2);      // #325c80
background: color-tint(color('blue', 80), 23);     // #325c80
background: color-tint(color('blue', 80), 25);     // #4178be
background: color-tint(color('blue', 80), 100);    // #c0e6ff
```

### Color Shade

Returns a color the specified amount of steps darker than the given color in the given color's color palette

#### `color-shade($color, $amount)`

```scss
//////////////////////////////////////////////////
//  ------------------------------------------  //
// | Options       | Type          | Required | //
// |---------------|---------------|----------| //
// | Color Palette | Color         | Yes      | //
// | Shade Amount  | Number        | Yes      | //
//  ------------------------------------------  //
//////////////////////////////////////////////////

background: color-shade(color('blue', 30), 20);     // #4178be
background: color-shade(color('blue', 30), 2);      // #4178be
background: color-shade(color('blue', 30), 23);     // #4178be
background: color-shade(color('blue', 30), 25);     // #325c80
background: color-shade(color('blue', 30), 100);    // #010205
```

### Get Colors

Returns the list of available color palettes if no parameter is passed in, all palettes and all of their colors if `'all'` is passed in, and all colors of a given palette if one is specified.

#### `get-colors([$palette])`

```scss
///////////////////////////////////////////
//  -----------------------------------  //
// | Options       | Type   | Required | //
// |---------------|--------|----------| //
// | Color Palette | String | Optional | //
//  -----------------------------------  //
///////////////////////////////////////////

$color-keys: get-colors();
$all-blues: get-colors('blue');
$full-color-map: get-colors('all');

//////////////////////////////
// Example Usage
//////////////////////////////

// Generating a class for each color palette
@each $color in $color-keys {
  .color--#{$color} {
    content: #{$color} is available;
  }
}

// Generate a class for each color of a color palette
@each $tone, $color in $all-blues {
  .blue--tone-#{$tone} {
    background: $color;
  }
}

// Generate a class for each color of each color palette
@each $palette-name, $palette in $full-color-map {
  @each $tone, $color in $palette {
    .#{$palette-name}--tone-#{$tone} {
      background: $color;
    }
  }
}
```
