<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>
<script>
  import classNames from 'classnames'
  export default {
    name: 'ft-tabbar',
    props: {
      fixed: Boolean,
      value: String
    },
    computed: {
      classes () {
        return classNames({
          'ft-tabbar': true,
          'ft-tabbar_fixed': this.fixed
        })
      }
    }
  }
</script>