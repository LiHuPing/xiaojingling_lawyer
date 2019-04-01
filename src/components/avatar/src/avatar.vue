<template>
  <div :class="classes" @click="linkTo">
		<div class="avatar-box">
			<img :src="image" />
		</div>
    <i class="icon-verify" v-if="this.verify"></i>
  </div>
</template>

<script>
  import classNames from 'classnames'
  export default {
    name: 'ft-avatar',
    props: {
      size: {
				validator (value) {
          return ['mini', 'normal'].indexOf(value) > -1
        },
        default: 'normal'
      },
      verify: {
        type: Boolean,
        default: false
      },
      image: {
				type: String,
        default: ""
			},
			link: {
				type: String,
        default: ""
			}
    },
		methods: {
			linkTo(){
				if( this.link ) this.$router.push({ path: this.link })
			}
		},
    computed: {
      classes () {
        return classNames({
          'head-avatar': true,
          'mini': this.size === 'mini'
        })
      }
    }
  }
</script>

<style scoped>
	.head-avatar{width:.6rem;height:.6rem;position:relative;}
	.icon-verify{width:.16rem;height:.16rem;border-radius:.08rem;background:url(../../../assets/icon_verify.png) center / 100% no-repeat;bottom:0;right:0;position:absolute;}
	.mini > .icon-verify{transform:scale(.5);transform-origin:right bottom;}
	.head-avatar.mini{margin:0;width:.32rem;height:.32rem;border-radius:.16rem;}
	.avatar-box{width:100%;height:100%;border-radius:50%;background:#ccc;overflow:hidden;}
	.avatar-box > img{width:100%;height:100%;}
</style>