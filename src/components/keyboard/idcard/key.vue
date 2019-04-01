<template>
  <i v-text="text"
      @touchstart.stop.prevent="onFocus"
      @touchmove="onBlur"
      @touchend="onBlur"
      @touchcancel="onBlur"
      class="ft-key"
      :class="className">
  </i>
</template>
<script>
  export default {
    name: 'ft-key',
    props: {
      text: [String, Number],
      type: {
        type: Array,
        default: () => []
      }
    },
    data () {
      return {
        active: false
      }
    },
    computed: {
      className () {
        const types = this.type.slice(0)
        this.active && types.push('active')
        return types.map(type => `ft-key-${type}`)
      }
    },
    methods: {
      onFocus () {
        this.vibrate(30)
        this.active = true
        this.$emit('press', this.text)
      },
      onBlur () {
        this.active = false
      },
      vibrate (s) {
        navigator.vibrate = window.navigator.vibrate || window.navigator.webkitVibrate ||
                            window.navigator.mozVibrate || window.navigator.msVibrate
        if (navigator.vibrate) {
          navigator.vibrate(s)
        }
      }
    }
  }
</script>