<template>
  <ul>
    <tree-wrapped :data="example"/>
  </ul>
</template>

<script>
import './main.scss'
import TreeWrapped from './Wrapped'
import example from './data.js'

export default {
  name: 'NBTTree',
  components: {
    TreeWrapped
  },
  data () {
    return {
      example
    }
  },
  props: {
    data: {
      type: Object
    }
  }
}
</script>
