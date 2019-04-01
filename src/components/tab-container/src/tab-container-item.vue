<template>
  <div class="ft-tab-container-item" v-if="id === $parent.currentActive">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'ft-tab-container-item',
    props: ['id']
  }
</script>