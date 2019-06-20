### FAQ

The Time Picker consists of a mandatory input field and two optional
[Inline Select](http://carbondesignsystem.com/components/select/code)
components. The Inline Select components are only used when the user is required
to select either a time zone and/or when specifying AM/PM is required.

The Time Picker uses form validation, and the valid pattern should be specified
in the pattern attribute of the input field. You can read more about patterns
[here](https://www.w3schools.com/tags/att_input_pattern.asp).

Here are some examples:

#### 24-hour military time

`<input type="text" class="bx--time-picker__input-field" pattern="[01]?[0-9]|2[0-3]):[0-5][0-9]" placeholder="hh:mm" maxlength="5" />`

#### 12-hour am-pm clock

`<input type="text" class="bx--time-picker__input-field" pattern="(1[012]|[1-9]):[0-5][0-9](\\s)?" placeholder="hh:mm" maxlength="5" />`

#### Localization

In order for the component to be localized, please make sure you update the
validation pattern, the AM/PM select component (if it is needed), and the time
zone select component (if it is needed).
