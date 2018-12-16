<template>
  <tree :data="data" :icon="NbtIcon" iconKey="type"></tree>
</template>

<script>
import Tree from '@/components/Tree'
import NbtIcon from '@/components/NBTIcon'

export default {
  name: 'NBTTree',
  components: {
    Tree
  },
  data () {
    return {
      NbtIcon
    }
  },
  props: {
    data: {
      type: Object
    }
  }
}
</script>
