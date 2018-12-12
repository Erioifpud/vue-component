<template>
  <span class="nbt-icon" :style="spritePos"></span>
</template>

<script>
import './icon.scss'

export default {
  name: 'NBTIcon',
  props: {
    type: {
      type: String
    }
  },
  computed: {
    spritePos () {
      const type = this.type ? this.type.toUpperCase() : ''
      const prefix = (pos) => `background-position: ${pos}`
      switch (type) {
        case 'BYTE':
          return prefix('0px 0px')
        case 'SHORT':
          return prefix('-16px -16px')
        case 'INT':
          return prefix('-48px 0px')
        case 'LONG':
          return prefix('0px -16px')
        case 'FLOAT':
          return prefix('-32px 0px')
        case 'DOUBLE':
          return prefix('-16px 0px')
        case 'BYTE_ARRAY':
          return prefix('0px -32px')
        case 'STRING':
          return prefix('-32px -16px')
        case 'LIST':
          return prefix('-32px -32px')
        case 'COMPOUND':
          return prefix('-48px -16px')
        case 'INT_ARRAY':
          return prefix('-16px -32px')
        case 'LONG_ARRAY':
          return prefix('-16px -32px')
        default:
          return prefix('-48px -32px')
      }
    }
  }
}
</script>
