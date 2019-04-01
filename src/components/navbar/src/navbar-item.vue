<template>
  <div :class="classes"
      @click="$parent.$emit('input', id)">
    <slot></slot>
  </div>
</template>
<script>
  import classNames from 'classnames'
  export default {
    name: 'ft-navbar-item',
    props: ['id'],
    computed: {
      classes () {
        return classNames({
          'ft-navbar_item': true,
          'ft-navbar_item_on': this.id === this.$parent.value
        })
      }
    }
  }
</script>