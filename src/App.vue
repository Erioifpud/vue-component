<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/> -->
    <dropdown
      placeholder="select component"
      :items="components"
      :map="e => e.instance"
      @change="selected = arguments[0]"
    />
    <template v-if="selected">
      <panel v-if="selectedBinding" title="Binding" :border="true">
        <component :is="selectedInstance" v-bind="selectedBinding"></component>
      </panel>
      <panel v-if="selectedModel" :title="`Model: ${selectedModel.value}`" :border="true">
        <component :is="selectedInstance" v-model="selectedModel.value" v-bind="selectedModel.binding || {}"></component>
      </panel>
      <panel v-if="selectedState" :title="`State: ${selectedState.length}`" :border="true">
        <component :is="selectedInstance" v-for="(state, index) in selectedState" v-bind="state" :key="index"></component>
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

export default {
  components: {
    Dropdown,
    Panel
  },
  data () {
    return {
      components: [],
      selected: undefined,
      defaultModel: 'abcd'
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
