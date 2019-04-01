<<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>
<script>
  import classNames from 'classnames'
  export default {
    name: 'ft-cells-bar',
    props: {
      type: String
    },
    computed: {
      classes () {
        return classNames({
          'ft-cells_title': this.type === 'title',
          'ft-cells_tips': this.type === 'tips'
        })
      }
    }
  }
</script>