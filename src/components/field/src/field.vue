<template>
  <div :class="classes">
    <div class="ft-cell_hd">
      <slot name="header"></slot>
      <label v-if="label" class="ft-label">{{label}}</label>
    </div>
    <div class="ft-cell_bd">
      <slot name="body"></slot>
      <input 
        @change="$emit('change', currentValue)"
        @blur="$emit('blur')"
        @focus="$emit('focus')"
        class="ft-input"
        ref="input"
        :type="type"
        :maxLength="max"
        :disabled="disabled"
				:readonly="readonly"
        v-model="currentValue"
        :placeholder="placeholder">
    </div>
    <div class="ft-cell_ft">
      <ft-clean v-if="clean && currentValue !== ''" @click="handleClean"/>
      <slot name="foot"></slot>
    </div>
  </div>
</template>
<script>
  import { Clean } from '../../clean'
  import classNames from 'classnames'
  export default {
    name: 'ft-field',
    created () {
      this.currentValue = (this.value === undefined || this.value === null) ? '' : (this.format ? this.formatValue(this.value) : this.value)
    },
    data () {
      return {
        active: false,
        currentValue: this.value
      }
    },
    props: {
      label: String,
      type: {
        type: String,
        default: 'text'
      },
      placeholder: String,
      readonly: Boolean,
      disabled: Boolean,
      value: String | Number,
      max: Number | String,
      clean: {
        type: Boolean,
        default: true
      },
      format: String
    },
    computed: {
      classes () {
        return classNames({
          'ft-cell': true
        })
      }
    },
    methods: {
      handleClean () {
        this.currentValue = ''
        this.$emit('clean')
      },
      // handleInput (e) {
      //   if (this.type === 'number' && this.format) {
      //     if (/\./.test(this.currentValue) && e.key === '.') {
      //       e.preventDefault()
      //     }
      //     if (!/[0-9]/.test(e.key) && !/Backspace/.test(e.key) && !/\./.test(e.key)) {
      //       e.preventDefault()
      //     }
      //   }
      //   // console.log(e)
      // },
      formatValue (val) {
        let _val
        if (this.format) {
          const patt = new RegExp(this.format)
          const fl = val.match(patt)
          if (fl) {
            _val = fl[0]
          } else {
            _val = val
          }
        } else {
          _val = val
        }
        return _val
      }
    },
    watch: {
      value (val, oldVal) {
        this.currentValue = this.formatValue(val)
      },
      currentValue (val) {
        this.$emit('input', val)
      }
    },
    components: {
      [Clean.name]: Clean
    }
  }
</script>