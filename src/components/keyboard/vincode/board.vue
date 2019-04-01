<template>
  <transition name="slide-up">
    <div class="board-panel" v-if="show" @touchstart.stop.prevent="() => {}" @click.stop.prevent="() => {}">
      <div class="board-display">
        <span @touchstart="$emit('clean')">清空</span>
        <span v-if="!tips" ref="inputText">{{value.length > 0 ? value : '请输入VIN码'}}</span>
        <span v-else>{{tips}}</span>
        <span @touchstart="$emit('close', false)" style="color: #20C272">确定</span>
      </div>
      <div class="board-keys">
        <div class="board-row" style="padding-top: .05rem;">
          <ft-vkey v-for="(key, i) in keyRow1" :text="key.value" :key="i" @press="onPressKey(key)" :style="{width: stdKeyWidth +'px'}"/>
        </div>
        <div class="board-row">
          <ft-vkey v-for="(key, i) in keyRow2" :text="key.value" :key="i" @press="onPressKey(key)" :style="{width: stdKeyWidth +'px'}" :class="{'board-key-disabled': key.disabled}"/>
        </div>
        <div class="board-row">
          <ft-vkey v-for="(key, i) in keyRow3" :text="key.value" :key="i" @press="onPressKey(key)" :style="{width: stdKeyWidth +'px'}" />
        </div>
        <div class="board-row">
          <ft-vkey v-for="(key, i) in keyRow4" :text="key.value" :key="i" @press="onPressKey(key)" :style="{width: stdKeyWidth +'px'}" />
        </div>
        <div class="board-row">
          <span class="board-key" style="flex: 4">{{limittips}}</span>
          <ft-vkey class="board-primary-key board-key-del" :style="{width: bigKeyWidth +'px'}" style="flex: 1" @press="onPressKey({value: 'delete'})"/>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  import Key from './key'
  export default {
    name: 'ft-vincode-board',
    props: {
      value: {
        type: String,
        default: ''
      },
      show: {
        type: Boolean,
        default: false
      },
      hideOnClickOutside: {
        type: Boolean,
        default: true
      }
    },
    mounted() {
      this.initKeySize()
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
      initKeySize () {
        let viewHeight, viewWidth
        if (window.innerHeight) {
          viewHeight = window.innerHeight
        } else if ((document.body) && (document.body.clientHeight)) {
          viewHeight = document.body.clientHeight
        }
        if (window.innerWidth) {
          viewWidth = window.innerWidth
        } else if ((document.body) && (document.body.clientHeight)) {
          viewWidth = document.body.clientWidth
        }
        this.viewHeight = viewHeight
        this.viewWidth = viewWidth
        this.stdKeyWidth = (viewWidth - 44) / 10
        this.midKeyWidth = (viewWidth - 40 - this.stdKeyWidth * 7) / 2
        this.bigKeyWidth = this.midKeyWidth + this.stdKeyWidth
        this.lgKeyWidth = viewWidth - this.midKeyWidth - this.bigKeyWidth - 16
      },
      onPressKey (key) {
        if (key.disabled) {
          return
        }
        if (key.value === 'delete') {
          this.$emit('delete')
        } else if (key.value === this.closeButtonText) {
          this.onBlur()
        } else {
          this.$emit('input', key.value)
        }
      },
      onBlur () {
        this.$emit('close', false)
      }
    },
    watch: {
      value (val, oldVal) {
        if (val !== oldVal) {
          if (val.length > 0) {
            this.limittips = '已输入' + val.length + '位VIN码，还差' + (17 - val.length) + '位'
          } else {
            this.limittips = '请输入VIN码'
          }
        }
      }
    },
    data () {
      return {
        keyRow1: [
          {
            key: '1',
            value: '1'
          },
          {
            key: '2',
            value: '2'
          },
          {
            key: '3',
            value: '3'
          },
          {
            key: '4',
            value: '4'
          },
          {
            key: '5',
            value: '5'
          },
          {
            key: '6',
            value: '6'
          },
          {
            key: '7',
            value: '7'
          },
          {
            key: '8',
            value: '8'
          },
          {
            key: '9',
            value: '9'
          },
          {
            key: '0',
            value: '0'
          }
        ],
        keyRow2: [
          {
            key: 'Q',
            value: 'Q',
            disabled: true
          },
          {
            key: 'W',
            value: 'W'
          },
          {
            key: 'E',
            value: 'E'
          },
          {
            key: 'R',
            value: 'R'
          },
          {
            key: 'T',
            value: 'T'
          },
          {
            key: 'Y',
            value: 'Y'
          },
          {
            key: 'U',
            value: 'U'
          },
          {
            key: 'I',
            value: 'I',
            disabled: true
          },
          {
            key: 'O',
            value: 'O',
            disabled: true
          },
          {
            key: 'P',
            value: 'P'
          }
        ],
        keyRow3: [
          {
            key: 'A',
            value: 'A'
          },
          {
            key: 'S',
            value: 'S'
          },
          {
            key: 'D',
            value: 'D'
          },
          {
            key: 'F',
            value: 'F'
          },
          {
            key: 'G',
            value: 'G'
          },
          {
            key: 'H',
            value: 'H'
          },
          {
            key: 'J',
            value: 'J'
          },
          {
            key: 'K',
            value: 'K'
          },
          {
            key: 'L',
            value: 'L'
          }
        ],
        keyRow4: [
          {
            key: 'Z',
            value: 'Z'
          },
          {
            key: 'X',
            value: 'X'
          },
          {
            key: 'C',
            value: 'C'
          },
          {
            key: 'V',
            value: 'V'
          },
          {
            key: 'B',
            value: 'B'
          },
          {
            key: 'N',
            value: 'N'
          },
          {
            key: 'M',
            value: 'M'
          }
        ],
        currentValue: this.value,
        viewHeight: 0,
        viewWidth: 0,
        stdKeyHeight: 40,
        stdKeyWidth: 32,
        midKeyHeight: 40,
        midKeyWidth: 51,
        bigKeyHeight: 40,
        bigKeyWidth: 87,
        lgKeyHeight: 40,
        lgKeyWidth: 215,
        limittips: '请输入VIN码',
        clipboard: null,
        tips: ''
      }
    },
    components: {
      [Key.name]: Key
    }
  }
</script>
<style lang="less">

</style>