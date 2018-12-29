<template>
  <div class="tab">
    <div class="tab__header" ref="tabHeader">
      <div class="tab__selected-bar" :style="barStyle"></div>
      <div
        v-for="(item, index) in tabs"
        :key="index"
        :class="{'tab__header-item_disabled': item.disabled}"
        @click="handleClick(item, index)"
        class="tab__header-item"
      >
        <i v-if="item.icon" class="fa-fw" :class="item.icon"></i>
        {{ item.title }}
        <span v-if="item.closable && !item.disabled" class="tab__item-close" @click.stop="handleClose(item)">×</span>
      </div>
    </div>
    <div class="tab__content" :style="contentStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import './main.scss'

export default {
  name: 'Tab',
  hide: true,
  provide () {
    return {
      tab: this
    }
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: String
    }
  },
  data () {
    return {
      tabs: [],
      // selected: 0,
      selectedKey: this.value,
      selectedBarWidth: 0,
      selectedBarOffset: 0,
      dragging: false
    }
  },
  watch: {
    selectedKey (newVal) {
      this.updateSelectedBar()
    }
  },
  computed: {
    contentStyle () {
      const index = this.getTabIndex(this.selectedKey)
      return {
        // transform: `translateX(-${this.selected}00%) translateZ(0px)`
        transform: `translateX(-${index}00%) translateZ(0px)`
      }
    },
    barStyle () {
      return {
        transform: `translate3d(${this.selectedBarOffset}px, 0px, 0px)`,
        width: `${this.selectedBarWidth}px`
      }
    }
  },
  methods: {
    getTabIndex (key) {
      return this.tabs.findIndex(elem => elem.uniqueKey === key)
    },
    getTab (key) {
      return this.tabs.find(elem => elem.uniqueKey === key)
    },
    handleClick (item, index) {
      if (item.disabled) {
        return
      }
      // this.selected = index
      this.selectedKey = item.uniqueKey
    },
    updateSelectedBar () {
      if (!this.tabs.length) {
        return
      }
      const tabItems = this.$refs.tabHeader.querySelectorAll('.tab__header-item')
      const index = this.getTabIndex(this.selectedKey)
      this.selectedBarWidth = tabItems[index].offsetWidth
      if (index > -1) {
        const offset = Array.from(tabItems).slice(0, index).reduce((a, b) => {
          return a + b.offsetWidth + 16
        }, 0)
        this.selectedBarOffset = offset
      } else {
        this.selectedBarOffset = 0
      }

      // const tabItems = this.$refs.tabHeader.querySelectorAll('.tab__header-item')
      // this.selectedBarWidth = tabItems[this.selected].offsetWidth
      // if (this.selected) {
      //   const offset = Array.from(tabItems).slice(0, this.selected).reduce((a, b) => {
      //     return a + b.offsetWidth + 16
      //   }, 0)
      //   this.selectedBarOffset = offset
      // } else {
      //   this.selectedBarOffset = 0
      // }
    },
    handleClose (item) {
      if (item.disabled) {
        return
      }

      if (item.uniqueKey === this.selectedKey) {
        this.resetSelectedTab(item)
      }
      // const flag = this.indexBeforeAfterSelected(item)
      // this.removeTabItem(item)
      this.$emit('tab-removed', item.uniqueKey)
      item.$destroy()
      // this.$nextTick(function () {
      //   if (flag) {
      //     this.selected -= 1
      //   }
      //   this.updateSelectedBar()
      // })
    },
    resetSelectedTab (item) {
      // const index = this.tabs.indexOf(item)
      const itemIndex = this.getTabIndex(item.uniqueKey)
      const beforeTabs = this.tabs.filter((elem, index) => !elem.disabled && index < itemIndex)
      const afterTabs = this.tabs.filter((elem, index) => !elem.disabled && index > itemIndex)
      let newKey = -1
      if (this.tabs.length) {
        if (afterTabs.length) {
          newKey = afterTabs[0].uniqueKey
        } else if (beforeTabs.length) {
          newKey = beforeTabs[beforeTabs.length - 1].uniqueKey
        } else {
          newKey = this.tabs[0].uniqueKey
        }
      }
      this.selectedKey = newKey
      this.$emit('change', newKey)
      // if (index < this.selected) {
      //   return true
      // } else {
      //   return false
      // }
    },
    removeTabItemFromTabs (item) {
      const index = this.getTabIndex(item.uniqueKey)
      if (index > -1) {
        this.tabs.splice(index, 1)
      }
    }
  },
  created () {
    this.$on('tab-init', function (instance) {
      this.tabs.push(instance)
    })
    this.$on('tab-destroy', function (instance) {
      this.removeTabItemFromTabs(instance)
    })
  },
  mounted () {
    this.$nextTick(function () {
      if (this.value === undefined) {
        this.selectedKey = this.tabs.length ? this.tabs[0].uniqueKey : ''
      }
      this.updateSelectedBar()
    })

    // this.$refs.tabHeader.onmousedown = (e) => {
    //   this.dragging = true
    //   const startX = e.offsetX
    //   this.$refs.tabHeader.onmousemove = (e) => {
    //     if (this.dragging) {
    //       let endX = e.offsetX
    //       let tmpX = endX - startX
    //       console.log(tmpX)
    //     }
    //   }

    //   this.$refs.tabHeader.onmouseup = () => {
    //     this.dragging = false
    //   }
    // }
  }
}
</script>
