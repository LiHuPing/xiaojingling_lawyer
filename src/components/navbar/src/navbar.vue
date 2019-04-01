<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>
<script>
  import classNames from 'classnames'
  export default {
    name: 'ft-navbar',
    props: {
      fixed: Boolean,
      value: [String, Number]
    },
    computed: {
      classes () {
        return classNames({
          'ft-navbar': true,
          'ft-navbar_fixed': this.fixed
        })
      }
    }
  }
</script>