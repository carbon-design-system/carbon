import { Loading } from './path_to/bluemix-components/consumables/js/es2015/index';

// Instantiate Loading elements
Loading.init();

// Select all elements with `data-loading` attribute
[... document.querySelectorAll('data-loading')].forEach((element) => {
  // Attempt to access instance for WeakMap with given element
  const instance = Loading.components.get(element);

  // If instance, set to false when a process is finished (like a network request) or failed
  if (instance) {
    promiseNetworkRequest.then(() => instance.set(false), () => instance.set(false));
  }
});
