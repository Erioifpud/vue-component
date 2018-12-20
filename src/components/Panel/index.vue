<template>
  <div class="panel">
    <div class="panel__header">
      {{title}}
    </div>
    <div class="panel__content">
      <div :class="{ panel__content_border: border }">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import './main.scss'

export default {
  name: 'Panel',
  props: {
    title: {
      type: String
    },
    border: {
      type: Boolean
    }
  }
}
</script>
