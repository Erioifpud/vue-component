<template>
  <div class="render"></div>
</template>

<script>
import Vue from 'vue'
import './main.scss'

export default {
  name: 'Render',
  props: {
    vue: {
      type: String
    }
  },
  data () {
    return {
      component: undefined,
      id: ''
    }
  },
  methods: {
    getContent (vue, tag) {
      const startRegex = new RegExp(`<${tag}[^>]*>`)
      // const endRegex = new RegExp(`</${tag}>`)
      let startTag = vue.match(startRegex)
      if (!startTag) {
        return ''
      }
      startTag = startTag[0]
      const startPos = vue.indexOf(startTag)
      return vue.slice(startPos + startTag.length, vue.indexOf(`</${tag}>`))
    },
    generateComponent () {
      if (!this.template || !this.script) {
        return
      }
      const options = new Function(`${this.script.replace('export default', 'return ')}`)()
      options.template = this.template
      // options.template = '<div class="title">{{ text }}</div>'
      const Component = Vue.extend(options)
      const component = new Component().$mount()
      this.component = component
      this.$el.appendChild(this.component.$el)

      if (this.style) {
        const elem = document.createElement('style')
        elem.type = 'text/css'
        this.id = Math.random().toString(36).substring(7)
        elem.id = this.id
        elem.innerHTML = this.style
        document.head.appendChild(elem)
      }
    },
    destroyComponent () {
      if (this.component) {
        this.$el.removeChild(this.component.$el)
        this.component.$destroy()
        this.component = undefined
      }
      if (this.id) {
        const styleTag = document.querySelector(`#${this.id}`)
        if (!styleTag) {
          return
        }
        styleTag.parentNode.removeChild(styleTag)
        this.id = ''
      }
    }
  },
  watch: {
    vue (newVal) {
      this.generateComponent()
    }
  },
  computed: {
    template () {
      return '<div id="app">' + this.getContent(this.vue, 'template') + '</div>'
    },
    script () {
      return this.getContent(this.vue, 'script')
    },
    style () {
      return this.getContent(this.vue, 'style')
    }
  },
  mounted () {
    this.destroyComponent()
    this.generateComponent()
  },
  beforeDestroy () {
    this.destroyComponent()
  }
}
</script>
