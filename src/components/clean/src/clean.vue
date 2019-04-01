<template>
  <i class="ft-icon-cancel ft-clean" @click="handleClick"></i>
</template>
<script>
  export default {
    name: 'ft-clean',
    methods: {
      handleClick() {
        this.$emit('click')
      }
    }
  }
</script>
<style lang="less">
  .ft-clean{
    color: #aaa;
    font-size: 22px;
  }
</style>
