/**
 * Interface for JavaScript components.
 * All components in bluemix-components should implement this interface.
 * @interface Component
 * @implements Handle
 */

/**
 * The DOM element this component is of.
 * @member {HTMLElement} Component#element
 */

/**
 * Releases this component's instance from the associated element.
 * @function Component#release
 */

/**
 * Instantiates this component's instances in the given element.
 * If the given element indicates that it's of this component, instantiates this components for the given element.
 * Otherwise, instantiates this component by the following methods, depending on the type of this component.
 *
 *   * Searching for elements of this component
 *   * Upon certain events
 * @function Component.init
 * @param {Node} target The DOM node to instantiate components in. Should be a document or an element.
 * @returns {Handle} An handle to remove the event listener, if this component is meant to be instantiated upon certain events.
 */

/**
 * Creates an instance of this component, of the given element.
 * @function Component.create
 * @param {HTMLElement} element The element.
 */

/**
 * The map associating DOM element and this component's instance.
 * @member {WeakMap} Component.components
 */
