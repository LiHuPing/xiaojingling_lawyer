<template>
  <div class="ft-collapse" @click="handleToggle">
    <div class="ft-collapse-cell" :class="{'ft-collapse-open': showContent}" style="padding-right: 40px;">
      <span>{{data.question}}</span>
    </div>
    <p v-show="showContent" class="ft-collapse-content" v-html="parseText(data.answer)"></p>
  </div>
</template>
<script>
  export default {
    name: 'ft-collapse',
    data () {
      return {
        showContent: false
      }
    },
    props: {
      data: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },
    methods: {
      handleToggle () {
        this.showContent = !this.showContent
      },
      parseText (text) {
        return text.replace(/\n/g, '<br />')
      }
    }
  }
</script>