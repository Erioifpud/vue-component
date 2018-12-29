<template>
  <div class="dropdown">
    <input
      @focus="isFocus = true"
      @blur="handleBlur"
      v-model="value"
      @input="searchMode = true"
      :placeholder="placeholder"
      type="text"
      class="dropdown__search"
    >
    <div v-show="isFocus && showingItems && showingItems.length" class="dropdown__items">
      <div
        v-for="(item, index) in showingItems"
        :key="item.name || item.toString()"
        @mousedown="handleItemClick(item, index)"
        class="dropdown__item"
      >
        {{item.name}}
      </div>
    </div>
  </div>
</template>

<script>
import './main.scss'

export default {
  name: 'Dropdown',
  data () {
    return {
      isFocus: false,
      value: '',
      searchMode: false
    }
  },
  computed: {
    filteredItems () {
      return this.mappedItems.filter(item => (item.name || item.toString()).startsWith(this.value))
    },
    showingItems () {
      return this.searchMode ? this.filteredItems : this.mappedItems
    },
    mappedItems () {
      return this.map ? this.items.map(this.map) : this.items
    }
  },
  // watch: {
  //   value (val, old) {
  //     if (val !== old) {
  //       this.searchMode = true
  //     }
  //   }
  // },
  methods: {
    handleBlur () {
      this.isFocus = false
      this.searchMode = false
    },
    handleItemClick (item, index) {
      this.value = item.name || item.toString()
      this.$emit('change', this.items[index])
    }
  },
  props: {
    placeholder: {
      type: String
    },
    items: {
      type: Array,
      required: true
    },
    map: {
      type: Function
    }
  }
}
</script>
