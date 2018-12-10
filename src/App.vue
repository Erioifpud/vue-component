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
      @change="selected = arguments[0]"
    />
    <div class="playground">
      <component v-show="selected" :is="selected"></component>
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
  mounted () {
    const component = require.context('./components', true, /\.vue$/)
    const requireAll = context => context.keys().map(context)
    requireAll(component).forEach((item) => {
      // const name = (item.name || /(\S+\/)(\S+)\.vue/.exec(item.hotID)[2]).toLowerCase()
      // this.components.push(item)
      console.log(item)
      this.components.push(item.default)
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
</style>
