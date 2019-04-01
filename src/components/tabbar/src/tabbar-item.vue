<template>
  <a :class="classes" @click="$parent.$emit('input', id )">
    <div style="padding: .02rem 0">
      <img :src="icon" style="width: 26px; height: 26px;" />
    </div>
    <p class="ft-tabbar_label"><slot></slot></p>
  </a>
</template>
<script>
  import classNames from 'classnames'
  export default {
    name: 'ft-tabbar-item',
    props: ['id', 'icon'],
    computed: {
      classes () {
        return classNames({
          'ft-tabbar_item': true,
          'ft-tabbar_item_on': this.id === this.$parent.value
        })
      }
    }
  }
</script>