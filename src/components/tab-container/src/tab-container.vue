<template>
  <div class="ft-tab-container">
    <div class="ft-tab-container-wrap">
      <slot></slot>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'ft-tab-container',
    props: {
      value: [String, Number]
    },
    data () {
      return {
        currentActive: this.value
      }
    },
    watch: {
      value (val) {
        this.currentActive = val
      },
      currentActive (val, oldVal) {
        this.$emit('input', val)
      }
    }
  }
</script>