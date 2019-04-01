<template>
  <a :class="classes" :href="href">
    <div class="ft-cell_hd">
      <slot name="header"></slot>
    </div>
    <div class="ft-cell_bd">
      <p v-if="title" :class="titleStyle">{{title}} <span v-if="button" class="span-bt">{{button}}</span></p>
      <p v-if="label" class="ft-cell_label" :class="labelStyle">{{label}}</p>
      <slot name="body"></slot>
    </div>
    <div class="ft-cell_ft">
      <p v-if="value" class="ft-cell_value" :class="valueStyle">{{value}}</p>
      <slot name="foot"></slot>
    </div>
  </a>
</template>
<script>
  import classNames from 'classnames'
  export default {
    name: 'ft-cell',
    props: {
      to: [String, Object],
      islink: Boolean,
      title: {
        type: String,
        default: ''
      },
      titleStyle: {
        type: String | Object
      },
      value: {
        type: String | Number,
        default: ''
      },
      valueStyle: {
        type: String | Object
      },
      label: {
        type: String,
        default: ''
      },
      labelStyle: {
        type: String | Object
      },
      button: {
        type: String,
        default: ''
      },
      buttonStyle: {
        type: String | Object
      }
    },
    computed: {
      classes () {
        return classNames({
          'ft-cell': true,
          'ft-cell_access': this.islink
        })
      },
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
