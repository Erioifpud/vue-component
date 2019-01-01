<template>
  <div class="editor">
    <div class="editor__header">
      <button class="editor__toggle-button" @click="previewMode = !previewMode">{{ previewMode ? 'Edit' : 'Preview' }}</button>
    </div>
    <codemirror v-show="!previewMode" v-model="code" :options="cmOptions"></codemirror>
    <render v-show="previewMode" :vue="code"></render>
  </div>
</template>

<script>
import { codemirror } from 'vue-codemirror'
import Render from '@/components/Render'
import './main.scss'
import 'codemirror/lib/codemirror.css'
import './one-dark.css'
import 'codemirror/mode/vue/vue.js'

export default {
  name: 'Editor',
  components: {
    codemirror,
    Render
  },
  data () {
    return {
      code: '',
      previewMode: false,
      cmOptions: {
        tabSize: 2,
        mode: 'text/x-vue',
        theme: 'one-dark',
        lineNumbers: true,
        line: true
      }
    }
  },
  mounted () {
    this.code = require('@/samples/vue_sample.js').default
  }
}
</script>
