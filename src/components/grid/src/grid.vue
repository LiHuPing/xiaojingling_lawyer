<template>
  <a class="ft-grid" :href="href">
    <slot></slot>
    <template v-if="type === 'icon'">
      <div class="ft-grid_icon">
        <img :src="icon" />
      </div>
      <p class="ft-grid_label">{{label}}</p>
    </template>
  </a>
</template>
<script>
  export default {
    name: 'ft-grid',
    props: {
      to: [String, Object],
      icon: {},
      label: String,
      type: String
    },
    computed: {
      href () {
        if (this.to && !this.added && this.$router) {
          const resolved = this.$router.match(this.to)
          if (!resolved.matched.length) return this.to

          this.$nextTick(() => {
            this.added = true
            this.$el.addEventListener('click', this.handleClick)
          })

          return resolved.fullPath || resolved.path
        }
      }
    },
    methods: {
      handleClick ($event) {
        $event.preventDefault()
        this.$router.push(this.href)
      }
    }
  }
</script>