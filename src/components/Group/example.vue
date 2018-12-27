<template>
  <div>
    <group v-model="selected1">
      <p class="title">Normal</p>
      <er-input type="check" placeholder="abc"></er-input>
      <er-input type="check" placeholder="123"></er-input>
      <p>model: {{ selected1 }}</p>
    </group>
    <group v-model="selected2">
      <p class="title">With Default Value</p>
      <er-input type="switch" placeholder="abc"></er-input>
      <er-input type="switch" placeholder="123"></er-input>
      <p>model: {{ selected2 }}</p>
    </group>
    <group v-model="selected3">
      <p class="title">
        Dynamic
        <button @click="handleAdd">Add</button>
        <button @click="handleRemove">Remove</button>
      </p>
      <er-input type="switch" placeholder="abc"></er-input>
      <er-input type="switch" placeholder="123"></er-input>
      <er-input
        v-for="(name, i) in inputs"
        :key="i"
        type="switch"
        :placeholder="name"
      />
      <p>model: {{ selected3 }}</p>
    </group>
  </div>
</template>

<script>
import Group from '@/components/Group'
import ErInput from '@/components/ErInput'

export default {
  name: 'GroupExample',
  components: {
    Group,
    ErInput
  },
  data () {
    return {
      selected1: '',
      selected2: '123',
      selected3: '',
      inputs: []
    }
  },
  methods: {
    handleAdd () {
      this.inputs.push(Math.random().toString(36).substring(7))
    },
    handleRemove () {
      this.inputs.pop()
    }
  }
}
</script>

<style scoped>
  .title {
    text-align: center;
  }
</style>
