<!--
@license

Copyright IBM Corp. 2019

This source code is licensed under the Apache-2.0 license found in the
LICENSE file in the root directory of this source tree.
-->

<template>
  <bx-dropdown trigger-content="Select an item">
    <bx-dropdown-item value="all">Option 1</bx-dropdown-item>
    <bx-dropdown-item value="cloudFoundry">Option 2</bx-dropdown-item>
    <bx-dropdown-item value="staging">Option 3</bx-dropdown-item>
    <bx-dropdown-item value="dea">Option 4</bx-dropdown-item>
    <bx-dropdown-item value="router">Option 5</bx-dropdown-item>
  </bx-dropdown>
</template>

<script>
import 'carbon-web-components/es/components/dropdown/dropdown';
import 'carbon-web-components/es/components/dropdown/dropdown-item';

export default {
  name: 'HelloWorld',
};
</script>
