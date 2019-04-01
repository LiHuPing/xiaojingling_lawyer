<template>
  <div class="font-15 color-111 pad15 bg-fff">
		<p><b>问题类型：</b>{{ send_first_list.type_txt || '--' }}</p>
		<p><b>问题状态：</b>{{ send_first_list.status_txt || '--' }}</p>
		<p><b>审核意见：</b>{{ send_first_list.remarks || '--' }}</p>
		<p><b>问题内容：</b>{{ send_first_list.content || '--' }}</p>
		<div v-if="!!send_first_list.answer">
			<b>问题答案：</b>
			<div v-html="send_first_list.answer || '--'"></div>
		</div>
		<div v-if="!!send_second_list.in_id" class="anther-quest">
			<p><b>问题类型：</b>{{ send_second_list.type_txt || '--' }}</p>
			<p><b>问题状态：</b>{{ send_second_list.status_txt || '--' }}</p>
			<p><b>审核意见：</b>{{ send_second_list.remarks || '--' }}</p>
			<p><b>问题内容：</b>{{ send_second_list.content || '--' }}</p>
		</div>
		<div>
			<b>问题答案：</b>
			<textarea v-model="answer" class="quest-record marb15 font-15" placeholder="请输入该问题的答案">
			
			</textarea>
		</div>
		<ft-button type="primary" @click.native="submitHandle">提交</ft-button>
  </div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import { Button } from '@/components'

	export default {
		name: 'AnswerQuestion',
		data () {
			return {
				answer: ""
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
			},
			
			submitHandle(){
				let { answer } = this
				let { in_id } = this.$route.params
				
				if( !answer ){
					this.toastError('请填写回答内容')
					return
				}
				
				this.$vux.loading.show({
					text: '提交中'
				})
				this.fetchCommon({
					url: '/inquiry/answer/',
					data: { in_id, answer },
					onSuccess: (res) => {
						this.$vux.loading.hide()
						this.toastInfo('提交成功')
						setTimeout(() => {
							this.$router.push({ path: '/' })
						}, 1500)
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
			document.title = '待答问题'
		},
		components: {
      [Button.name]: Button
    }
	}
</script>

<style scoped>
	
</style>
