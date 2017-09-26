import on from '../misc/on';

export default function(ToMix) {
  class TrackBlur extends ToMix {
    /**
     * Mix-in class to add an handler for losing focus.
     * @param {HTMLElement} element The element working as this component.
     * @param {Object} [options] The component options.
     */
    constructor(element, options) {
      super(element, options);
      const hasFocusin = 'onfocusin' in window;
      const focusinEventName = hasFocusin ? 'focusin' : 'focus';
      this.hFocusIn = on(
        this.element.ownerDocument,
        focusinEventName,
        event => {
          if (!this.element.contains(event.target)) {
            this.handleBlur(event);
          }
        },
        !hasFocusin
      );
    }

    /**
     * The method called when this component loses focus.
     * @abstract
     */
    handleBlur() {
      throw new Error('Components inheriting TrackBlur mix-in must implement handleBlur() method.');
    }

    release() {
      if (this.hFocusIn) {
        this.hFocusIn = this.hFocusIn.release();
      }
      super.release();
    }
  }

  return TrackBlur;
}
