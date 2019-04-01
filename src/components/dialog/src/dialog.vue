<template>
  <transition name="fade">
    <div class="dialog" v-if="show">
      <ft-mask v-model="show"></ft-mask>
      <div class="ft-dialog">
        <div :class="{'ft-dialog_hd': true, 'has-title': !!title }">
          <strong class="ft-dialog_title">{{title}}</strong>
					<span class="ft-dialog-close" @click="handleCancel">
						<img width="12" height="12" :src="require('@/assets/icon_guanbi@2x.png')" />
					</span>
        </div>
        <div class="ft-dialog_bd">
          <p>{{message}}</p>
          <slot></slot>
        </div>
        <div class="ft-dialog_ft">
          <a class="ft-dialog_btn ft-dialog_btn_default" v-if="showCancel" @click="handleCancel">取消</a>
          <a class="ft-dialog_btn ft-dialog_btn_primary" v-if="showConfirm" @click="handleOk">确认</a>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { Mask } from '../../mask'
export default {
  name: 'ft-dialog',
  props: {
    title: String,
    message: String,
    show: Boolean,
    showCancel: {
      type: Boolean,
      default: false
    },
		showConfirm: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleOk () {
      this.$emit('on-confirm')
    },
    handleCancel () {
      this.$emit('on-cancel')
    }
  },
  components: {
    [Mask.name]: Mask
  }
}
</script>
<style lang="less">
  .dialog{
    z-index: 1000;
    position: absolute;
  }
</style>