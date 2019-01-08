<template>
  <div>
    <er-button v-ripple="'rgba(0, 0, 0, 0.3)'" full>Ripple</er-button>
  </div>
</template>

<script>
import ErButton from '@/components/ErButton'
import ripple from '@/directives/ripple'

export default {
  name: 'RippleExample',
  directives: {
    ripple
  },
  components: {
    ErButton
  }
}
</script>

<style>

</style>
