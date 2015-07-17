# Radio

The radio pattern is a standard HTML `<input type="radio">`, or "radio button" element.

Radio buttons always appear in groups of two or more.

These are used when only a single option can be selected.

# Basic use

*This is some text on basic use of this pattern*

# Example

A group of radio buttons to choose a credit card.

```html
<label class="bx-radio" for="visa">
  <input checked type="radio" id="visa" name="credit-cards" value="value1" class="bx-radio--input">
  <span class="bx-radio--name">Visa</span>
</label>
<label class="bx-radio" for="mastercard">
  <input type="radio" id="mastercard" name="credit-cards" value="value2" class="bx-radio--input">
  <span class="bx-radio--name">Mastercard</span>
</label>
<label class="bx-radio" for="amex">
  <input type="radio" id="amex" name="credit-cards" value="value3" class="bx-radio--input">
  <span class="bx-radio--name">American Express</span>
</label>
<label class="bx-radio" for="discover">
  <input type="radio" id="discover" name="credit-cards" value="value4" class="bx-radio--input">
  <span class="bx-radio--name">Discover</span>
</label>
```

# Classes

Pattern Library classes apply various predefined visual and behavioral requirements that allow for semantic and accessible radio buttons. The table below lists the available classes and their effects.

| Class | Effect | Remarks |
|-----------|--------|---------|
| `bx-radio` | Defines label and its containing elements as a radio component | Required on label element|
| `bx-radio--input` | Defines radio input | Required on input element for radio component |
| `bx-radio--name` | Defines the name of the radio component | Required on span element inside radio component |

# IDs and other Attributes

Radio buttons use a matching ID and for attribute to enable users to make selections on radio buttons through the `<label>` element and through the `<input>`.
