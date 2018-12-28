<template>
  <div class="tab-item">
    <slot></slot>
  </div>
</template>

<script>
import './main.scss'

export default {
  name: 'TabItem',
  hide: true,
  inject: {
    tab: {
      default: undefined
    }
  },
  props: {
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String
    },
    closable: {
      type: Boolean
    },
    disabled: {
      type: Boolean
    },
    uniqueKey: {
      type: String,
      required: true
    }
  },
  mounted () {
    if (this.tab) {
      this.tab.$emit('tab-init', this)
    }
  },
  beforeDestroy () {
    if (this.tab) {
      this.tab.$emit('tab-destroy', this)
    }
  }
}
</script>
