<template>
  <transition name="slide-up">
    <div class="ft-keyboard" v-if="show" @click.stop.prevent="() => {}">
        <div class="ft-keyboard-content">
          <div class="ft-keyboard-title" @click="onBlur">
            <svg version="1.1"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#b2b2b2" width="18" viewBox="0 50 200 100">
            <path d="M184.9,56.8c4.8,0,9.4,2.3,12.3,6.6c4.5,6.8,2.7,15.9-4.1,20.4l-86.1,57.4c-5,3.3-11.4,3.3-16.3,0l-83.7-58
              c-6.8-4.5-8.6-13.7-4.1-20.4c4.5-6.8,13.6-8.6,20.4-4.1l75.6,52.5l78-52C179.3,57.6,182.1,56.8,184.9,56.8L184.9,56.8z"/>
            </svg>
          </div>
          <ul class="ft-keyboard-numbers">
            <li v-for="i, k in 4" :key="k">
              <ft-key v-for="n, a in numsArr.slice((i - 1) * 3, i * 3)" @press="onPreessKey(n)" :text="n" :key="a"/>
              <ft-key v-if="i == 4" @press="onPreessKey('delete')" :type="['gray','delete']" />
            </li>
          </ul>
        </div>
    </div>
  </transition>
</template>
<script>
  import Key from './key'
  export default {
    name: 'ft-idcard-keyboard',
    data () {
      return {
        nums: this.value,
        numsArr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 'X', 0]
      }
    },
    props: {
      show: {
        type: Boolean,
        default: false
      },
      value: {
        type: String,
        default: ''
      },
      hideOnClickOutside: {
        type: Boolean,
        default: true
      }
    },
    mounted() {
      this.handler(true)
    },
    destroyed() {
      this.handler(false)
    },
    activated() {
      this.handler(true)
    },
    deactivated() {
      this.handler(false)
    },
    methods: {
      handler (action) {
        if (action !== this.handlerStatus && this.hideOnClickOutside) {
          this.handlerStatus = action
          document.body[(action ? 'add' : 'remove') + 'EventListener']('touchstart', this.onBlur)
          document.body[(action ? 'add' : 'remove') + 'EventListener']('click', this.onBlur)
        }
      },
      onBlur () {
        this.$emit('close', false)
      },
      onPreessKey(text) {
        if (text === '') {
          return
        }
        if (text === 'delete') {
          this.$emit('delete')
        } else if (text === this.closeButtonText) {
          this.onBlur()
        } else {
          this.$emit('input', text)
        }
      }
    },
    watch: {
      nums (val, oldVal) {
        if (val !== oldVal) {
          this.$emit('input', val)
        }
      },
      value (val, oldVal) {
        if (val !== oldVal) {
          this.nums = val
        }
      }
    },
    components: {
      [Key.name]: Key
    }
  }
</script>
<style lang="less">
  .ft-keyboard{
    -moz-user-select:none; /*火狐*/
    -webkit-user-select:none; /*webkit浏览器*/
    -ms-user-select:none; /*IE10*/
    -khtml-user-select:none; /*早期浏览器*/
    user-select:none;
    &-title:active{
      background-color: #e2e2e2;
    }
  }
</style>