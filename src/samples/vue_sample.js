export default `<template>
  <div class="title">{{ text }}</div>
</template>

<script>
  export default {
    name: 'Test',
    data () {
      return {
        text: 'Hello world'
      }
    }
  }
</script>

<style>
  .title {
    width: fit-content;
    margin: 1rem auto;
    font-size: 1.2rem;
  }
</style>
`
