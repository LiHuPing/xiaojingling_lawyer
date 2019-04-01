<template>
  <div class="ft-agree">
    <label>
      <input 
        type="checkbox" 
        class="ft-agree_checkbox"
        @change="handleInput"
        :checked="currentValue" />
    </label>
    <span class="ft-agree_text">
      <slot></slot>
    </span>
  </div>
</template>
<script>
  export default {
    name: 'ft-agree',
    data () {
      return {
        currentValue: this.value
      }
    },
    props: {
      value: Boolean
    },
    methods: {
      handleInput (e) {
        this.currentValue = e.target.checked
        this.$emit('input', this.currentValue)
      }
    },
    watch: {
      value (val) {
        this.currentValue = val
      }
    }
  }
</script>
