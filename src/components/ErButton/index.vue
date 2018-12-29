<template>
  <button class="er-button" :class="classes" @click="handleClick">
    <i v-if="icon" class="fa-fw" :class="icon"></i>
    <slot></slot>
  </button>
</template>

<script>
import './main.scss'

export default {
  name: 'ErButton',
  props: {
    type: {
      type: String,
      default: 'normal',
      validator (val) {
        return ['primary', 'info', 'success', 'warning', 'error', 'normal'].find(elem => elem === val)
      }
    },
    full: {
      type: Boolean
    },
    icon: {
      type: String
    },
    disabled: {
      type: Boolean
    },
    outline: {
      type: Boolean
    },
    round: {
      type: Boolean
    }
  },
  computed: {
    classes () {
      return [
        `er-button_${this.type}`,
        {
          'er-button_full': this.full,
          'er-button_round': this.round,
          'er-button_outline': this.outline,
          'er-button_disabled': this.disabled
        }
      ]
    }
  },
  methods: {
    handleClick () {
      this.$emit('click')
    }
  }
}
</script>

<style>

</style>
