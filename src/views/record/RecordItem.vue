<template>
  <li class="pad15 bg-fff marb15" @click="direct(dataSource.in_id)">
		【{{ dataSource.type_txt }}】
		{{ dataSource.content }}
		<p class="font-12 mart15 quest-info">
			<span class="color-red">{{ dataSource.realname }}{{ dataSource.nick_name }}</span>
			<span class="pull-right color-999">{{ dataSource.add_time }}</span>
		</p>
	</li>
</template>
<script>
  export default {
    name: 'record-item',
    props: {
      dataSource: {
        type: Object,
        default: function () {
          return {}
        }
      },
			recordType: {
				validator (value) {
          return ['answer', 'complete']
        },
        default: 'answer'
			}
    },
    methods: {
			direct(ID){
				let { recordType } = this
				this.$router.push({ path: `/${ recordType }question/${ ID }` })
			}
    }
  }
</script>