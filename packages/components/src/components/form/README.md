### SCSS

#### Modifiers

Modifiers are used with various form-related classes.

| Selector               | Description                         |
| ---------------------- | ----------------------------------- |
| `.bx--label--disabled` | Applies disabled styles for a label |

### FAQ

#### Using Form Requirement

Carbon Components provide HTML attributes and CSS to enable form validation for
each input or control.

For example, here's a **Form Item** with a required text input.

```html
<div class="bx--form-item">
  <label for="text1" class="bx--label">Username</label>
  <input
    required
    id="text1"
    type="text"
    class="bx--text__input"
    placeholder="Enter username here"
  />
  <div class="bx--form-requirement">Username is taken.</div>
</div>
```

The `bx--form-requirement` element will be hidden until `data-invalid` attribute
gets added to the `input`. Validate the text input on your own and then use
JavaScript to add the attribute if the input value is invalid.

```html
<div class="bx--form-item">
  <label for="text1" class="bx--label">Username</label>
  <input
    data-invalid
    required
    id="text1"
    type="text"
    class="bx--text__input"
    placeholder="Enter username here"
  />
  <div class="bx--form-requirement">Username is taken.</div>
</div>
```

Now that `data-invalid` is added to the `input`, the `bx--form-requirement` will
appear.

#### HTML

Carbon Components provides inputs (checkboxes, text-inputs, etc.) and some
default styles for forms:

- `.bx--form-item`
- `.bx--fieldset`
- `.bx--label`
- `.bx--form-requirement`

Make use of HTML to compose and structure forms appropriate to your project's
needs.

For example, here's a simple form for a login page that uses a mix of HTML and
Carbon Components.

```html
<form>
  <section>
    <div class="bx--form-item">
      <label for="text1" class="bx--label">Username</label>
      <input
        data-invalid
        id="your-username-id"
        type="text"
        class="bx--text__input"
        placeholder="Enter username here"
      />
      <div class="bx--form-requirement">Username is taken.</div>
    </div>
    <div class="bx--form-item">
      <label for="text1" class="bx--label">Password</label>
      <input
        data-invalid
        id="your-password-id"
        type="password"
        class="bx--text__input"
        placeholder="Enter username here"
      />
      <div class="bx--form-requirement">Password must rhyme with Batman.</div>
    </div>
  </section>
  <fieldset>
    <legend>Click Register when you're ready!</legend>
    <button class="bx--btn bx--btn--primary" type="submit">Register</button>
  </fieldset>
</form>
```

You can use any appropriate HTML for structuring and grouping your forms. If you
want, those `<section>` elements could be `<div>` elements. Or you can change
the `<fieldset>` element to be a `<section>` if that's what you want.

#### Fieldset and Legend

It's best practice to wrap any groups of checkboxes or radio inputs with
`<fieldset>` and use `<legend>` to label the group. This best practice applies
mainly to composing forms where users are submitting data.

Here's an example from
[MDN](https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/How_to_structure_an_HTML_form)
that explains why this is a best practice.

> The `<legend>` element formally describes the purpose of the `<fieldset>`
> element. Many assistive technologies will use the `<legend>` element as if it
> is a part of the label of each widget inside the corresponding `<fieldset>`
> element.
>
> ```html
> <form>
>   <fieldset>
>     <legend>Fruit juice size</legend>
>     <p>
>       <input type="radio" name="size" id="size_1" value="small" />
>       <label for="size_1">Small</label>
>     </p>
>     <p>
>       <input type="radio" name="size" id="size_2" value="medium" />
>       <label for="size_2">Medium</label>
>     </p>
>     <p>
>       <input type="radio" name="size" id="size_3" value="large" />
>       <label for="size_3">Large</label>
>     </p>
>   </fieldset>
> </form>
> ```
>
> With this example, a screen reader will pronounce "Fruit juice size small" for
> the first widget, "Fruit juice size medium" for the second, and "Fruit juice
> size large" for the third.
