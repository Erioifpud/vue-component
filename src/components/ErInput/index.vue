<template>
  <div class="er-input">
    <input v-if="type === 'text'" :value="getText" @input="handleChange('text', $event.target.value)" :placeholder="placeholder" :disabled="disabled" class="er-input__text" type="text">
    <input v-if="type === 'pass'" :value="getText" @input="handleChange('pass', $event.target.value)" :placeholder="placeholder" :disabled="disabled" class="er-input__text" type="password">
    <template v-if="type === 'check'">
      <input :checked="getBool" @change="handleChange('check', $event.target.value)" :disabled="disabled" class="er-input__check" type="checkbox" :id="uniqueId">
      <label :for="uniqueId" class="er-input__check-tips">{{placeholder}}</label>
    </template>
    <template v-if="type === 'switch'">
      <input :checked="getBool" @change="handleChange('check', $event.target.value)" :disabled="disabled" class="er-input__switch" type="checkbox" :id="uniqueId">
      <label :for="uniqueId" class="er-input__switch-tips">{{placeholder}}</label>
    </template>
  </div>
</template>

<script>
import './main.scss'

export default {
  name: 'ErInput',
  props: {
    type: {
      type: String,
      default: 'text'
    },
    disabled: {
      type: Boolean
    },
    placeholder: {
      type: String
    },
    required: {
      type: Boolean
    },
    value: {
      type: [String, Boolean]
    }
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  computed: {
    getText () {
      return this.value.toString()
    },
    getBool () {
      return Boolean(this.value)
    }
  },
  methods: {
    handleChange (type, val) {
      console.log(val)
      if (type === 'text') {
        this.$emit('change', val)
      } else if (type === 'check') {
        this.$emit('change', !this.getBool)
      }
    }
  }
}
</script>

<style>

</style>
