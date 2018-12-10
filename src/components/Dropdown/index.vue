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
    <div v-show="isFocus && showingItems.length" class="dropdown__items">
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

<style lang="scss" scoped>
$main-color: #5a4ba3;
// $main-color: #64b587;

.dropdown {
  display: inline-block;
  position: relative;
  margin: 0.5rem;
  box-sizing: border-box;
  font-size: 1rem;
  transition: all .15s ease-out;

  .dropdown__search {
    font-size: inherit;
    background-color: #f4f4f4;
    color: #404040;
    text-indent: 1rem;
    height: 2.5rem;
    border: 1px solid #e4e0e0;
    border-radius: 0.5rem;
    outline: none;
    transition: inherit;

    &:focus {
      border-color: $main-color;
    }

    &:hover {
      border-color: $main-color;
    }

    &:focus {
      box-shadow: inset 0 3px 5px 0 rgba(91, 73, 150,.2);
    }
  }

  .dropdown__items {
    position: absolute;
    text-indent: 1rem;
    top: calc(100% + 0.2rem);
    width: 100%;
    border-radius: 0.5rem;
    border: 1px solid $main-color;
    max-height: 9rem;
    overflow: auto;
    box-sizing: border-box;
    transition: inherit;

    // &:focus {
    //   border-color: $main-color;
    // }

    // &:hover {
    //   border-color: $main-color;
    // }

    .dropdown__item {
      height: 2rem;
      line-height: 2rem;
      overflow-x: hidden;
      transition: background-color .15s ease-out;

      &:not(:last-of-type) {
        border-bottom: 1px solid #e4e0e0;
      }

      &:hover {
        background-color: $main-color;
        color: #fff;
      }
    }
  }
}
</style>
