<template>
  <li>
    <div @click="toggleOpen" class="tree__name" :class="{tree__directory: isContainer, tree__directory_open: isOpen}">
      <!-- <nbt-icon :type="data.type" /> -->
      <component v-if="icon" :is="icon" v-bind="{[iconKey]: data.type}"></component>
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
      <tree-wrapped
        v-for="(node, index) in data.value"
        :data="node"
        :key="node.name || index"
        :icon="icon"
        :iconKey="iconKey"
      />
    </ul>
  </li>
</template>

<script>
import './main.scss'

export default {
  name: 'TreeWrapped',
  hide: true,
  data () {
    return {
      isOpen: false
    }
  },
  props: {
    data: {
      type: Object,
      required: true
    },
    icon: {
      type: Object
    },
    iconKey: {
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
