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
        v-for="item in showingItems"
        :key="item.name || item.toString()"
        @click.prevent="handleItemClick(item)"
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
      return this.items.filter(item => (item.name || item.toString()).startsWith(this.value))
    },
    showingItems () {
      return this.searchMode ? this.filteredItems : this.items
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
      setTimeout(() => {
        this.isFocus = false
        this.searchMode = false
      }, 150)
    },
    handleItemClick (item) {
      this.value = item.name || item.toString()
      this.$emit('change', item)
    }
  },
  props: {
    placeholder: {
      type: String
    },
    items: {
      type: Array
    }
  }
}
</script>
