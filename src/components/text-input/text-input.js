import settings from '../../globals/js/settings';
import mixin from '../../globals/js/misc/mixin';
import createComponent from '../../globals/js/mixins/create-component';
import initComponentBySearch from '../../globals/js/mixins/init-component-by-search';
import handles from '../../globals/js/mixins/handles';
import eventMatches from '../../globals/js/misc/event-matches';
import on from '../../globals/js/misc/on';

export default class TextInput extends mixin(createComponent, initComponentBySearch, handles) {
  /**
   * Text Input.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @extends Handles
   * @param {HTMLElement} element - The element functioning as a text field.
   */
  constructor(element, options) {
    super(element, options);
    this.manage(
      on(this.element, 'click', event => {
        const toggleVisibilityButton = eventMatches(event, this.options.selectorPasswordVisibilityButton);
        if (toggleVisibilityButton) {
          this._toggle({ element, button: toggleVisibilityButton });
        }
      })
    );
  }

  /**
   * Toggles the visibility of the password in the input field
   * @param {Object} obj - The elements that can change in the component
   * @param {HTMLElement} obj.element - The element functioning as a text field
   * @param {HTMLElement} obj.button - The button toggling password visibility
   */
  _toggle({ element, button }) {
    /* eslint-disable max-len */
    const iconVisibilityOn =
      '<svg width="16" height="11" viewBox="0 0 16 11"><path d="M8 7.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 1c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z"></path><path d="M8 10c2.8 0 5.1-1.5 6.9-4.6C13.1 2.5 10.8 1 8 1 5.2 1 3 2.4 1.2 5.4 2.9 8.6 5.2 10 8 10zM8 0c3.3 0 6 1.8 8.1 5.4C14 9.2 11.3 11 8 11S2 9.2 0 5.5C2 1.9 4.6 0 8 0z"></path></svg>';
    const iconVisibilityOff =
      '<svg width="16" height="16" viewBox="0 0 16 16"><path d="M11.846 3.45L15.293.007 16 .714l-3.284 3.281c1.261.902 2.377 2.212 3.347 3.93C14.02 11.642 11.333 13.5 8 13.5c-1.392 0-2.667-.324-3.822-.973L.703 16l-.706-.708 3.323-3.32C2.071 11.042.976 9.694.035 7.924 2.012 4.308 4.667 2.5 8 2.5c1.395 0 2.677.317 3.846.95zm-6.928 8.338c.944.477 1.97.712 3.082.712 2.795 0 5.076-1.483 6.907-4.568-.866-1.417-1.833-2.486-2.91-3.219l-1.55 1.55a3 3 0 0 1-4.185 4.182l-1.344 1.343zm-.882-.533l1.518-1.517A3 3 0 0 1 9.74 5.556l1.364-1.363A7.02 7.02 0 0 0 8 3.5c-2.798 0-5.047 1.439-6.819 4.432.842 1.465 1.792 2.568 2.855 3.323zm2.948-1.532a2 2 0 0 0 2.74-2.738l-2.74 2.738zm-.707-.707l2.74-2.738a2 2 0 0 0-2.74 2.738z"></path></svg>';
    /* eslint-enable max-len */
    element.classList.toggle(this.options.passwordIsVisible);
    const passwordIsVisible = element.classList.contains(this.options.passwordIsVisible);
    if (passwordIsVisible) {
      button.innerHTML = iconVisibilityOff;
      element.querySelector(this.options.selectorPasswordField).type = 'text';
    } else {
      button.innerHTML = iconVisibilityOn;
      element.querySelector(this.options.selectorPasswordField).type = 'password';
    }
  }

  /**
   * The component options.
   *
   * If `options` is specified in the constructor,
   * {@linkcode NumberInput.create .create()},
   * or {@linkcode NumberInput.init .init()},
   * properties in this object are overriden for the instance being
   * created and how {@linkcode NumberInput.init .init()} works.
   * @property {string} selectorInit The CSS selector to find text input UIs.
   */
  static get options() {
    const { prefix } = settings;
    return {
      selectorInit: '[data-text-input]',
      selectorPasswordField: `.${prefix}--text-input[data-toggle-password-visibility]`,
      selectorPasswordVisibilityButton: `.${prefix}--text-input--password__visibility`,
      passwordIsVisible: `${prefix}--text-input--password-visible`,
    };
  }

  /**
   * The map associating DOM element and text input UI instance.
   * @type {WeakMap}
   */
  static components = new WeakMap();
}
