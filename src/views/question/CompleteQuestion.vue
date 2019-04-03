<template>
  <div class="font-15 color-111 pad15 bg-fff">
		<p><b>问题类型：</b>{{ send_first_list.type_txt || '--' }}</p>
		<p><b>问题状态：</b>{{ send_first_list.status_txt || '--' }}</p>
		<p><b>审核意见：</b>{{ send_first_list.remarks || '--' }}</p>
		<p><b>是否发布：</b>{{ send_first_list.is_release_txt || '--' }}</p>
		<p><b>问题内容：</b>{{ send_first_list.content || '--' }}</p>
		<div v-if="!!send_first_list.answer">
			<b>问题答案：</b>
			<div class="html-container" v-html="send_first_list.answer || '--'"></div>
		</div>
		<div v-if="!!send_second_list.in_id" class="anther-quest">
			<p><b>问题类型：</b>{{ send_second_list.type_txt || '--' }}</p>
			<p><b>问题状态：</b>{{ send_second_list.status_txt || '--' }}</p>
			<p><b>审核意见：</b>{{ send_second_list.remarks || '--' }}</p>
			<p><b>是否发布：</b>{{ send_second_list.is_release_txt || '--' }}</p>
			<p><b>问题内容：</b>{{ send_second_list.content || '--' }}</p>
			<div v-if="!!send_second_list.answer">
				<b>问题答案：</b>
				<div class="html-container" v-html="send_second_list.answer || '--'"></div>
			</div>
		</div>
		<ft-button type="default" @click.native="$router.push({ path: '/?select=done' })" class="mart15">返 回</ft-button>
  </div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import { Button } from '@/components'

	export default {
		name: 'CompleteQuestion',
		data () {
			return {
				
			}
		},
		methods: {
			...mapActions([
				'fetchCommon'
			]),
			
			toastError(text){
				this.$vux.toast.show({
					width: 'auto',
					type: 'cancel',
					text: text
				})
			},
			
			toastInfo(text){
				this.$vux.toast.show({
					width: 'auto',
					type: 'text',
					text: text
				})
			},
			
			getDetail(){
				let { in_id } = this.$route.params
				
				this.$vux.loading.show({
					text: '获取中'
				})
				this.fetchCommon({
					url: '/inquiry/detail/',
					sign: 'inquiryDetail',
					data: { in_id },
					onSuccess: (res) => {
						this.$vux.loading.hide()
					},
					onFail: (error) => {
						this.$vux.loading.hide()
						this.toastError(error.msg)
					},
					router: this.$router
				})
			}
		},
		computed: {
			...mapState({
        inquiryDetail (state) {
          return state.common['inquiryDetail']
        }
      }),
			
			send_first_list(){
				return this.inquiryDetail['send_first_list']
			},
			
			send_second_list(){
				return this.inquiryDetail['send_second_list']
			}
		},
		watch: {
      
    },
		created(){
			this.getDetail()
		},
		mounted(){
			document.title = '我已回答'
		},
		components: {
      [Button.name]: Button
    }
	}
</script>

<style scoped>
	
</style>
