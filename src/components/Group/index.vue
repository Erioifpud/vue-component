<template>
  <div class="group">
    <slot></slot>
  </div>
</template>

<script>
import './main.scss'

export default {
  name: 'Group',
  hide: true,
  provide () {
    return {
      group: this
    }
  },
  data () {
    return {
      children: []
      // selected: ''
    }
  },
  props: {
    selected: {
      type: String,
      default: ''
    }
  },
  model: {
    prop: 'selected',
    event: 'change'
  },
  created () {
    this.$on('group-init', function (instance) {
      this.children.push(instance)
    })
    this.$on('group-destroy', function (instance) {
      const index = this.children.indexOf(instance)
      if (index !== -1) {
        this.children.splice(index, 1)
        this.$emit('change', '')
      }
    })
    this.$on('group-check-trigger', function (instance) {
      // this.selected = instance.placeholder
      this.$emit('change', instance.placeholder)
      if (!instance.model) {
        instance.model = true
      }
      const otherInstances = this.children.filter(item => item !== instance)
      otherInstances.forEach(item => {
        item.model = false
      })
    })
  },
  mounted () {
    if (this.selected) {
      this.children.find(item => item.placeholder === this.selected).model = true
    }
  }
}
</script>
