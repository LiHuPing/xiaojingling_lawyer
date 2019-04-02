<template>
  <div class="font-15 color-111 pad15 bg-fff">
		<p><b>问题类型：</b>{{ send_first_list.type_txt || '--' }}</p>
		<p><b>问题状态：</b>{{ send_first_list.status_txt || '--' }}</p>
		<p><b>审核意见：</b>{{ send_first_list.remarks || '--' }}</p>
		<p><b>问题内容：</b>{{ send_first_list.content || '--' }}</p>
		<div v-if="!!send_first_list.answer">
			<b>问题答案：</b>
			<div class="html-container" v-html="send_first_list.answer || '--'"></div>
		</div>
		<div v-if="!!send_second_list.in_id" class="anther-quest">
			<p><b>问题类型：</b>{{ send_second_list.type_txt || '--' }}</p>
			<p><b>问题状态：</b>{{ send_second_list.status_txt || '--' }}</p>
			<p><b>审核意见：</b>{{ send_second_list.remarks || '--' }}</p>
			<p><b>问题内容：</b>{{ send_second_list.content || '--' }}</p>
		</div>
		<div>
			<b>问题答案：</b>
			<quill-editor-qiniu :token="qiniuToken" v-model="answer" :domain="qiniuUploadUrl" :uploadUrl="qiniuUploadUrl"></quill-editor-qiniu>
		</div>
		<ft-button type="primary" @click.native="submitHandle">提交</ft-button>
  </div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import { Button, QuillEditorQiniu } from '@/components'
	import config from '@/config/config'
	import md5 from 'md5'

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
			},
			
			getQiniuToken(){
				this.fetchCommon({
					url: '/sysset/token7nu/',
					data: { 
						token: md5('XJL_CRM_API'),
						authType: 'pub'
					},
					sign: 'qiniuToken',
					onSuccess: res => {
						
					},
					onFail: error => {
						console.log(error.msg)
					}
				})
			}
		},
		computed: {
			...mapState({
        inquiryDetail (state) {
          return state.common['inquiryDetail']
        },
			
				qiniuToken(state){
					return state.common.qiniuToken['token_7niu_up']
				}
      }),
			
			send_first_list(){
				return this.inquiryDetail['send_first_list']
			},
			
			send_second_list(){
				return this.inquiryDetail['send_second_list']
			},
			
			qiniuUploadUrl(){
				return config.qiniuUploadUrl
			}
		},
		watch: {
      
    },
		created(){
			this.getDetail()
			this.getQiniuToken()
		},
		mounted(){
			document.title = '待答问题'
		},
		components: {
      [Button.name]: Button,
			QuillEditorQiniu
    }
	}
</script>

<style scoped>
	
</style>
