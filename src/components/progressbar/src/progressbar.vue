<template>
  <div class="scroll-bar" ref="bar">
		<div class="scroll-track" ref="track"></div>
		<div class="scroll-thumb" ref="thumb" @touchstart="operating = true" @touchmove="moving" @touchend="ending"></div>
	</div>
</template>

<script>
  export default {
    name: 'ft-progress-bar',
		data(){
			return {
				value: this.dataValue,
				maxValue: this.dataMax,
				operating: false
			}
		},
    props: {
			dataValue: {
				type: Number,
				default: 0
			},
			dataMax: {
				type: Number,
				default: 100
			},
			change: {
				type: Function,
				default: () => {}
			}
    },
    methods: {
			moving(event) {
				if ( !this.operating ) return
				let scrollBar = this.$refs.bar,
				scrollThumb = this.$refs.thumb,
				scrollTrack = this.$refs.track,
				changeX = event.changedTouches[0].clientX,
				currentX = changeX - scrollBar.offsetLeft
				scrollThumb.style.marginLeft = currentX - 10 + 'px'
				scrollTrack.style.width = currentX + 'px'
				
				if( currentX + 20 >= scrollBar.offsetWidth ){
					scrollThumb.style.marginLeft = scrollBar.offsetWidth - 20 + 'px'
					scrollTrack.style.width = scrollBar.offsetWidth + 'px'
					this.value = this.maxValue
				}
				else if( currentX <= 0 ){
					scrollThumb.style.marginLeft = '0'
					scrollTrack.style.width = '0'
					this.value = 0
				}
				else {
					this.value = Math.round(this.maxValue * ( currentX / scrollBar.offsetWidth ))
				}
				this.$emit('change', this.value)
			},
			ending() {
				let scrollBar = this.$refs.bar,
				changeX = event.changedTouches[0].clientX,
				currentX = changeX - scrollBar.offsetLeft
				
				this.value = Math.round(this.maxValue * ( currentX / scrollBar.offsetWidth ))
				this.operating = false
				if (this.value >= this.maxValue) this.value = this.maxValue
				if (this.value <= 0) this.value = 0
			}
			
    },
		mounted(){
			if (this.value > this.maxValue) {
				console.error("给定当前值大于了最大值")
				return
			}
			let scrollBar = this.$refs.bar,
			scrollThumb = this.$refs.thumb,
			scrollTrack = this.$refs.track,
			currentX = scrollBar.offsetWidth * ( this.value / this.maxValue )
			
			scrollTrack.style.width = currentX + 'px'
			scrollThumb.style.marginLeft = currentX - 10 + 'px'
		}
  }
</script>

<style lang="less" scoped>
	*{box-sizing:border-box;}
	.scroll-bar{width:80%;height:3px;background-color:#ddd;border-radius:2px;cursor:pointer;margin:0 auto;}
	.scroll-track{width:0;height:3px;background-color:#20C272;border-radius:2px;}
	.scroll-thumb{height:20px;width:20px;background-color:#E3FAEF;border-radius:10px;border:3px solid #20C272;position:absolute;margin-top:-12px;cursor:pointer;}
</style>