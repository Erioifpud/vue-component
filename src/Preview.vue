<template>
  <div>
    <div>
      <dropdown
        placeholder="Select component"
        :items="components"
        :map="e => e.instance"
        @change="selected = arguments[0]"
      />
      <er-button
        icon="fas fa-broom"
        type="primary"
        :outline="true"
        @click="handleClear"
        style="margin-right: 0.5rem;"
      >
        Clear
      </er-button>
      <er-button
        icon="fas fa-sync-alt"
        type="warning"
        :outline="true"
        @click="handleReloadState"
        style="margin-right: 0.5rem;"
      >
        Reload
      </er-button>
      <er-button
        icon="fas fa-arrow-right"
        :outline="true"
        @click="handleToSandbox"
      >
        Sandbox
      </er-button>
    </div>
    <template v-if="selected">
      <panel v-if="selectedBinding" title="Binding" :border="true">
        <component :is="selectedInstance" v-bind="selectedBinding">
          <!-- <template v-if="selectedSlot">
            <render :slot="xxx"></render>
          </template> -->
          <template v-if="selectedSlot">{{ selectedSlot }}</template>
        </component>
      </panel>
      <panel v-if="selectedModel" :title="`Model: ${selectedModel.value}`" :border="true">
        <component :is="selectedInstance" v-model="selectedModel.value" v-bind="selectedModel.binding || {}">
          <template v-if="selectedSlot">{{ selectedSlot }}</template>
        </component>
      </panel>
      <panel v-if="selectedState" :title="`State: ${getState().length}`">
        <panel v-for="(state, index) in getState()" :key="index" :title="formatObj(state)" :border="true">
          <component :is="selectedInstance"  v-bind="state" >
            <template v-if="selectedSlot">{{ selectedSlot }}</template>
          </component>
        </panel>
      </panel>
      <panel v-if="!(selectedBinding || selectedModel || selectedState)" title="Vanilla" :border="true">
        <component :is="selectedInstance"></component>
      </panel>
    </template>
  </div>
</template>

<script>
import Dropdown from '@/components/Dropdown'
import Panel from '@/components/Panel'
import ErButton from '@/components/ErButton'

export default {
  components: {
    Dropdown,
    Panel,
    ErButton
  },
  data () {
    return {
      components: [],
      selected: undefined
    }
  },
  computed: {
    selectedInstance () {
      return this.selected ? this.selected.instance : undefined
    },
    selectedData () {
      return this.selected ? this.selected.data : undefined
    },
    selectedBinding () {
      return this.selectedData ? this.selectedData.binding : undefined
    },
    selectedModel () {
      return this.selectedData ? this.selectedData.model : undefined
    },
    selectedState () {
      return this.selectedData ? this.selectedData.state : undefined
    },
    selectedSlot () {
      return this.selectedData ? this.selectedData.slot : undefined
    }
  },
  methods: {
    formatObj (obj) {
      return Object.entries(obj).map(([k, v]) => `${k}: ${v}`).join(', ')
    },
    getState () {
      return typeof this.selectedState === 'function' ? this.selectedState() : this.selectedState
    },
    handleClear () {
      console.clear()
    },
    handleReloadState () {
      const temp = this.selected
      this.selected = null
      this.selected = temp
    },
    handleToSandbox () {
      this.$router.push('/sandbox')
    }
  },
  mounted () {
    const component = require.context('./components', true, /\.vue$/)
    const requireAll = context => context.keys().map((item) => {
      return {
        module: context(item),
        data: item.replace(/^\./, './components').replace(/\.vue$/, '.data.js')
      }
    })
    // requireAll(component).forEach((item) => {
    //   if (!item.module.default.hide) {
    //     this.components.push({
    //       instance: item.module.default,
    //       props: require(item.props)
    //     })
    //   }
    // })

    this.components = requireAll(component).filter(item => !item.module.default.hide).map(item => {
      const obj = {
        instance: item.module.default
      }
      try {
        // fail: item.props
        // success: `${item.props}`
        // ???
        obj.data = require(`${item.data}`).default
      } catch (error) {
        obj.data = {}
      }
      return obj
    })
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.playground {
  border: 1px solid #e4e0e0;
  border-radius: 0.5rem;
  margin: 0.5rem;
  height: 100%;
  box-sizing: border-box;
}
</style>
