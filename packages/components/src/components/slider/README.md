### SCSS

#### Modifiers

Use these modifiers with `.bx--slider` class.

| Selector              | Description                                                         |
| --------------------- | ------------------------------------------------------------------- |
| .bx--slider--disabled | Applies disabled styling and prevents JS from running on user input |

### Javascript

#### Options

| Option                         | Default Selector             | Description                                                               |
| ------------------------------ | ---------------------------- | ------------------------------------------------------------------------- |
| `selectorInit`                 | `[data-slider]`              | The selector to find the Slider element.                                  |
| `selectorTrack`                | `.bx--slider__track`         | The selector to find the Slider track element.                            |
| `selectorFilledTrack`          | `.bx--slider__filled-track`  | The selector to find the Slider filled track element.                     |
| `selectorThumb`                | `.bx--slider__thumb`         | The selector to find the Slider thumb element.                            |
| `selectorInput`                | `.bx--slider__input`         | The selector to find the Slider input element.                            |
| `eventBeforeSliderValueChange` | `slider-before-value-change` | The event emitted before the Slider value changes.                        |
| `eventAfterSliderValueChange`  | `slider-after-value-change`  | The event emitted when the Slider value changes.                          |
| `stepMultiplier`               | `4`                          | The multiplier applied to arrow key inputs when the shift key is pressed. |

### FAQ

#### Keydown event

Once `Slider` instance is initialized a user can use the following keys to
control the slider.

- `up` and `right` arrow keys increase the slider value by one step
- `down` and `left` arrow keys decrease the slider value by one step
- Pressing `shift` while changing the value of the slider will multiple the
  change by `Slider.options.stepMultiplier` (the default is 4)
