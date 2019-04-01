<template>
  <button :class="classes">
    <slot></slot>
  </button>
</template>
<script>
  import classNames from 'classnames'
  export default {
    name: 'ft-button',
    props: {
      disabled: {
        type: Boolean,
        default: false
      },
      size: {
        validator (value) {
          return ['mini', 'normal'].indexOf(value) > -1
        },
        default: 'normal'
      },
      loading: {
        type: Boolean,
        default: false
      },
      ghost: Boolean,
      type: {
        validator (value) {
          return ['primary', 'default', 'warn']
        },
        default: 'primary'
      }
    },
    computed: {
      classes () {
        return classNames({
          'ft-btn': true,
          [`ft-btn_${this.ghost ? 'ghost-' : ''}${this.type}`]: true,
          'ft-btn_mini': this.size === 'mini',
          'ft-btn_loading': this.loading,
          [`ft-btn_${this.ghost ? 'ghost-' : ''}disabled`]: this.disabled
        })
      }
    }
  }
</script>