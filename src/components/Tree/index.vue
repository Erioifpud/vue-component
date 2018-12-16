<template>
  <ul>
    <tree-wrapped :data="data" :icon="icon" :iconKey="iconKey" />
  </ul>
</template>

<script>
import './main.scss'
import TreeWrapped from './Wrapped'

export default {
  name: 'Tree',
  components: {
    TreeWrapped
  },
  props: {
    data: {
      type: Object
    },
    icon: {
      type: Object
    },
    iconKey: {
      type: String
    }
  }
}
</script>
