<template>
  <div class="font-15 color-111">
		<div class="text-center login-top">
			<img :src="require('@/assets/xjl_application.png')" />
			<p class="font-20">小经灵律师端</p>
		</div>
		<div class="pad15 bg-fff">
			<ft-cells style="margin-top:.05rem;">
				<ft-field placeholder="请输入律师登录名" class="field-cell" :clean="false" v-model="user_name_reg"></ft-field>
				<ft-field placeholder="请输入登录密码" class="field-cell" :max="16" :clean="false" v-model="password"></ft-field>
			</ft-cells>
		</div>
		<div class="btn-wrap">
			<ft-button type="primary" :disabled="loading" @click.native="submitData">登录</ft-button>
		</div>
  </div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import { Cells, Field, Button } from '@/components'
	import md5 from 'md5'
	import config from '@/config/config'

	export default {
		name: 'Login',
		data () {
			return {
				loading: false,
				user_name_reg: "",
				password: ""
			}
		},
		methods: {
			...mapActions([
				'fetchAuthorize'
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
			
			submitData(){
				let { user_name_reg, password } = this
				if( !user_name_reg ){
					this.toastError('请填写律师登录名')
					return
				}
				else if( !password ){
					this.toastError('请填写密码')
					return
				}
				
				this.loading = true
				this.fetchAuthorize({
					data: { user_name_reg, password },
					onSuccess: (res) => {
						this.loading = false
						this.toastInfo('登陆成功')
						setTimeout(() => {
							this.$router.push({ path: '/' })
						}, 1500)
					},
					onFail: (error) => {
						this.loading = false
						this.$vux.loading.hide()
						this.toastError(error.data)
					}
				})
			}
		},
		computed: {
			...mapState({
        
      })
		},
		created(){
		
		},
		watch: {
     
    },
		mounted(){
			document.title = '小经灵'
		},
		components: {
      [Field.name]: Field,
      [Cells.name]: Cells,
			[Button.name]: Button
    }
	}
</script>

<style scoped>
	
</style>
