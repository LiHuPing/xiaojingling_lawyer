<template>
  <transition name="slide-up">
    <div class="board-panel" v-if="show" @touchstart.stop.prevent="() => {}" @click.stop.prevent="() => {}">
      <div class="board-display">
        <span @touchstart="$emit('clean')">清空</span>
        
        <span @touchstart="$emit('close', false)" style="color: #20C272">确定</span>
      </div>
      <div class="board-keys">
				<div v-if="active == 1">
					<div class="board-row" style="padding-top: .05rem;">
						<ft-vkey v-for="(key, i) in preRow1" :text="key.value" :key="i" @press="onPressKey(key)" :style="{width: stdKeyWidth*1.25 +'px'}"/>
					</div>
					<div class="board-row">
						<ft-vkey v-for="(key, i) in preRow2" :text="key.value" :key="i" @press="onPressKey(key)" :style="{width: stdKeyWidth*1.25 +'px'}" />
					</div>
					<div class="board-row">
						<ft-vkey v-for="(key, i) in preRow3" :text="key.value" :key="i" @press="onPressKey(key)" :style="{width: stdKeyWidth*1.25 +'px'}" />
					</div>
					<div class="board-row">
						<ft-vkey v-for="(key, i) in preRow4" :text="key.value" :key="i" @press="onPressKey(key)" :style="{width: stdKeyWidth*1.25 +'px'}" />
					</div>
				</div>
				<div v-if="active == 2">
					<div class="board-row" style="padding-top: .05rem;">
						<ft-vkey v-for="(key, i) in keyRow1" :text="key.value" :key="i" @press="onPressKey(key)" :style="{width: stdKeyWidth +'px'}" />
					</div>
					<div class="board-row">
						<ft-vkey v-for="(key, i) in keyRow2" :text="key.value" :key="i" @press="onPressKey(key)" :style="{width: stdKeyWidth +'px'}" :class="{'board-key-disabled': key.disabled}"/>
					</div>
					<div class="board-row">
						<ft-vkey v-for="(key, i) in keyRow3" :text="key.value" :key="i" @press="onPressKey(key)" :style="{width: stdKeyWidth +'px'}" :class="{'board-key-disabled': key.disabled}"/>
					</div>
					<div class="board-row">
						<ft-vkey v-for="(key, i) in keyRow4" :text="key.value" :key="i" @press="onPressKey(key)" :style="{width: stdKeyWidth +'px'}" :class="{'board-key-disabled': key.disabled}"/>
					</div>
				</div>
        <div class="board-row">
          <ft-vkey :text="active == 1 ? '123 / En' : '省 / 市 / 自治区简称'" :style="{width: '50%'}" @press="switchSurface" />
          <ft-vkey class="board-primary-key board-key-del" :style="{width: bigKeyWidth +'px'}" style="flex: 1" @press="onPressKey({value: 'delete'})"/>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  import Key from './key'
  export default {
    name: 'ft-carplate-board',
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
      },
			switchSurface(){
				this.active = this.active == 1 ? 2 : 1
				const province = this.value.slice(0, 1)
				
				this.value.length && /[^0-9A-Z]/g.test(province) ?
				this.addLimit() :
				this.cancelLimit()
			},
			addLimit(){
				const province = this.value.slice(0, 1)
				for(let i = 4; i > 0; i--){
					const L1 = this[`preRow${ i }`].length
					for(let j = 0; j < L1; j++){
						if( this[`preRow${ i }`][j].value == province ){
							const limit = this[`preRow${ i }`][j].types
							const L2 = limit.length
							
							for(let k = 4; k > 1; k--){
								const L3 = this[`keyRow${ k }`].length
								for(let l = 0; l < L3; l++){
									let result = limit.indexOf(this[`keyRow${ k }`][l].value) > -1 ? false : true
									this.$set(this[`keyRow${ k }`][l], 'disabled', result)
								}
							}
							
							break
						}
					}
				}
			},
			cancelLimit(){
				for(let k = 4; k > 1; k--){
					const L3 = this[`keyRow${ k }`].length
					for(let l = 0; l < L3; l++){
						this.$set(this[`keyRow${ k }`][l], 'disabled', false)
					}
				}
			}
    },
    watch: {
      value: { 
				handler(val, oldVal) {
					if (val !== oldVal) {
						if (val.length > 0) {
							this.limittips = '已输入' + val.length + '位车牌号，还差' + (7 - val.length) + '位'
							val.length > 1 ? this.cancelLimit() : this.addLimit()
						} else {
							this.limittips = '请输入车牌号'
							this.active = 1
						}
					}
				},
				deep: true
			}
    },
    data () {
      return {
				active: 1,
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
            value: 'Q'
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
            value: 'I'
          },
          {
            key: 'O',
            value: 'O'
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
				preRow1: [
          {
            key: '京',
            value: '京',
						types: [ 'A', 'B', 'C', 'E', 'F', 'G', 'O' ]
          },
          {
            key: '津',
            value: '津',
						types: [ 'A', 'B', 'C', 'E' ]
          },
          {
            key: '冀',
            value: '冀',
						types: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'R', 'T' ]
          },
          {
            key: '晋',
            value: '晋',
						types: [ 'A', 'B', 'C', 'D', 'E', 'F', 'H', 'J', 'K', 'L', 'M' ]
          },
          {
            key: '蒙',
            value: '蒙',
						types: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L' ]
          },
          {
            key: '辽',
            value: '辽',
						types: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'V' ]
          },
          {
            key: '吉',
            value: '吉',
						types: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ]
          },
          {
            key: '黑',
            value: '黑',
						types: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P' ]
          }
        ],
				preRow2: [
					{
            key: '沪',
            value: '沪',
						types: [ 'A', 'B', 'C', 'D' ]
          },
          {
            key: '苏',
            value: '苏',
						types: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N' ]
          },
          {
            key: '浙',
            value: '浙',
						types: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L' ]
          },
          {
            key: '皖',
            value: '皖',
						types: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R' ]
          },
          {
            key: '闽',
            value: '闽',
						types: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K' ]
          },
          {
            key: '赣',
            value: '赣',
						types: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L' ]
          },
          {
            key: '鲁',
            value: '鲁',
						types: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'U' ]
          },
          {
            key: '豫',
            value: '豫',
						types: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'U' ]
          }
        ],
				preRow3: [
					{
            key: '鄂',
            value: '鄂',
						types: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q' ]
          },
          {
            key: '湘',
            value: '湘',
						types: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P' ]
          },
          {
            key: '粤',
            value: '粤',
						types: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y' ]
          },
					{
            key: '桂',
            value: '桂',
						types: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P' ]
          },
          {
            key: '琼',
            value: '琼',
						types: [ 'A', 'B', 'C' ]
          },
          {
            key: '川',
            value: '川',
						types: [ 'A', 'B', 'C', 'D', 'E', 'F', 'H', 'J', 'K', 'L', 'R', 'Q', 'S', 'T', 'U', 'V', 'W', 'Z' ]
          },
          {
            key: '贵',
            value: '贵',
						types: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J' ]
          },
          {
            key: '云',
            value: '云',
						types: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S' ]
          }
        ],
				preRow4: [
					{
            key: '渝',
            value: '渝',
						types: [ 'A', 'B', 'C', 'F', 'G', 'H' ]
          },
          {
            key: '藏',
            value: '藏',
						types: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G' ]
          },
          {
            key: '陕',
            value: '陕',
						types: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'U' ]
          },
					{
            key: '甘',
            value: '甘',
						types: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P' ]
          },
          {
            key: '青',
            value: '青'
          },
          {
            key: '宁',
            value: '宁',
						types: [ 'A', 'B', 'C', 'D' ]
          },
          {
						key: '新',
						value: '新',
						types: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R' ]
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
        limittips: '请输入车牌号',
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