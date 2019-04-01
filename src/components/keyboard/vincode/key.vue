<template>
  <a v-text="text"
      @touchstart.stop.prevent="onFocus"
      @touchmove="onBlur"
      @touchend="onBlur"
      @touchcancel="onBlur"
     class="board-key"
     :class="className"></a>
</template>
<script>
  export default {
    name: 'ft-vkey',
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
        this.active = true
        this.$emit('press', this.text)
      },
      onBlur () {
        this.active = false
      }
    }
  }
</script>