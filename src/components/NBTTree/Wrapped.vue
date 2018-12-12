<template>
  <li>
    <div @click="toggleOpen" class="tree__name" :class="{tree__directory: isContainer, tree__directory_open: isOpen}">
      <nbt-icon :type="data.type" />
      {{data.name}}
      <span v-if="isContainer" class="tree__value">
        <!-- [{{isOpen && '-' || '+'}}] -->
        <i v-show="isOpen" class="fas fa-caret-down"></i>
        <i v-show="!isOpen" class="fas fa-caret-right"></i>
      </span>
      <span v-else class="tree__value">
        {{data.value}}
      </span>
    </div>
    <ul v-if="isContainer" v-show="isOpen">
      <tree-wrapped v-for="(node, index) in data.value" :data="node" :key="node.name || index" />
    </ul>
  </li>
</template>

<script>
import './main.scss'
import NbtIcon from './NbtIcon'

export default {
  name: 'TreeWrapped',
  data () {
    return {
      isOpen: false
    }
  },
  components: {
    NbtIcon
  },
  props: {
    data: {
      type: Object
    },
    iconTypeKey: {
      type: String
    }
  },
  computed: {
    isContainer () {
      return this.data.value && this.data.value instanceof Array
    }
  },
  methods: {
    toggleOpen () {
      if (this.isContainer) {
        this.isOpen = !this.isOpen
      }
    }
  }
}
</script>
