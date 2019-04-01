<template>
  <div class="font-15 color-111">
		<ft-navbar v-model="active" style="position:fixed;top:0;padding:0 .3rem">
			<ft-navbar-item id="wait">待答问题</ft-navbar-item>
			<ft-navbar-item id="done">我已回答</ft-navbar-item>
		</ft-navbar>
		<ft-tab-container v-model="active" style="margin-top:.57rem;">
			<ft-tab-container-item id="wait">
				<scroller :on-infinite="loadMore">
					<ul style="padding-bottom:.3rem;">
						<record-item v-for="(item, index) in waitList" :key="index" :dataSource="item" recordType="answer" />
					</ul>
					<p v-if="waitList.length == 0" class="font-12 color-999 text-center pad15">暂无记录</p>
				</scroller>
			</ft-tab-container-item>
			<ft-tab-container-item id="done">
				<scroller :on-infinite="loadMore">
					<ul style="padding-bottom:.3rem;">
						<record-item v-for="(item, index) in doneList" :key="index" :dataSource="item" recordType="complete" />
					</ul>
					<p v-if="doneList.length == 0" class="font-12 color-999 text-center pad15">暂无记录</p>
				</scroller>
			</ft-tab-container-item>
		</ft-tab-container>
  </div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import { Navbar, NavbarItem, TabContainer, TabContainerItem } from '@/components'
	import Recorditem from './record/RecordItem'

	export default {
		name: 'Index',
		data () {
			return {
				active: "wait",
				waitList: [],
				waitCurrentPage: 1,
        doneList: [],
				doneCurrentPage: 1
			}
		},
		methods: {
			...mapActions([
				'fetchRecord'
			]),
			
			buildParams (active) {
        let url, sign
        if( active === 'wait' ){
          url = '/inquiry/search/'
          sign = 'waitRecord'
        }
				else if( active === 'done' ){
          url = '/inquiry/searchlaw/'
          sign = 'doneRecord'
        }
				return { url, sign }
      },
			
			refresh(){
				this.$vux.loading.show({
					text: '获取中'
				})
				let postData = { current_page: 1 }
				if( this.active == 'wait' ) postData['in_status'] = '1'
				
				this.fetchRecord({
					...this.buildParams(this.active),
					data: postData,
					onSuccess: (res) => {
						this.$vux.loading.hide()
						this[`${ this.active }CurrentPage`] = 1
            this[`${ this.active }List`] = this[`${ this.active }RecordData`]
					},
					onFail: (error) => {
						this.$vux.loading.hide()
						this.$vux.toast.show({
							time: 2000,
							type: 'text',
							text: error.msg
						})
					}
				})
			},
			
			loadMore(){
				this.$vux.loading.show({
					text: '获取中'
				})
				let postData = { current_page: this[`${ this.active }CurrentPage`] + 1 }
				if( this.active == 'wait' ) postData['in_status'] = '1'
				
				this.fetchRecord({
					...this.buildParams(this.active),
					data: postData,
					onSuccess: (res) => {
						this.$vux.loading.hide()
						let { list } = res.data
						if( list.length > 0 ){
							this[`${ this.active }CurrentPage`] += 1
							this[`${ this.active }List`] = this[`${ this.active }List`].concat(list)
						}
						else{
							if( this[`${ this.active }CurrentPage`] > 2 ) this.$vux.toast.show({
								time: 2000,
								type: 'text',
								text: '没有更多消息了'
							})
						}
					},
					onFail: (error) => {
						this.$vux.loading.hide()
						this.$vux.toast.show({
							time: 2000,
							type: 'text',
							text: error.msg
						})
					}
				})
			}
		},
		computed: {
			...mapState({
        waitRecord (state) {
          return state.record['waitRecord']
        },
				waitRecordData () {
					return this.waitRecord['list']
				},
				doneRecord (state) {
          return state.record['doneRecord']
        },
				doneRecordData () {
          return this.doneRecord['list']
        }
      })
		},
		watch: {
      active (val, oldVal) {
        if (val !== oldVal) {
          this.refresh()
        }
      }
    },
		created(){
			this.refresh()
		},
		mounted(){
			document.title = '小经灵'
		},
		components: {
      [Navbar.name]: Navbar,
      [NavbarItem.name]: NavbarItem,
      [TabContainer.name]: TabContainer,
      [TabContainerItem.name]: TabContainerItem,
			[Recorditem.name]: Recorditem
    }
	}
</script>

<style scoped>
	
</style>
