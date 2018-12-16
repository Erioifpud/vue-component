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
    <div v-show="selected" class="playground">
      <component v-show="selected" :is="selectedInstance" v-bind="selectedProps"></component>
    </div>
  </div>
</template>

<script>
import Dropdown from '@/components/Dropdown'

export default {
  components: {
    Dropdown
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
    selectedProps () {
      return this.selected ? this.selected.props : {}
    }
  },
  mounted () {
    const component = require.context('./components', true, /\.vue$/)
    const requireAll = context => context.keys().map((item) => {
      return {
        module: context(item),
        props: item.replace(/^\./, './components').replace(/\.vue$/, '.props.js')
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
        obj.props = require(`${item.props}`).default
      } catch (error) {
        obj.props = {}
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
