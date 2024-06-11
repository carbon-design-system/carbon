<!--
@license

Copyright IBM Corp. 2019

This source code is licensed under the Apache-2.0 license found in the
LICENSE file in the root directory of this source tree.
-->

<template>
  <div id="app">
    <h1>Hello World! 👋</h1>
    <HelloWorld />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',
  components: {
    HelloWorld
  }
};
</script>

<style>
#app {
  font-family: 'IBM Plex Sans', Helvetica, Arial, sans-serif;
}
</style>
