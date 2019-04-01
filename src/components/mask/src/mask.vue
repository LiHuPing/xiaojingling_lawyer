<template>
  <transition name="fade">
    <div class="ft-mask" v-if="show"><slot></slot></div>
  </transition>
</template>
<script>
export default {
  name: 'ft-mask',
  data () {
    return {
      show: this.value
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    value (val) {
      this.show = val
    }
  }
}
</script>
