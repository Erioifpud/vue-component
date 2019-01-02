<template>
  <div class="editor">
    <div class="editor__header">
      <button class="editor__button" @click="$router.back()">Back</button>
      <button class="editor__button editor__button-toggle" @click="previewMode = !previewMode">{{ previewMode ? 'Edit' : 'Preview' }}</button>
    </div>

    <div class="editor__content" :style="style">
      <div class="editor__content-item">
        <codemirror v-model="code" :options="cmOptions"></codemirror>
      </div>
      <div class="editor__content-item">
        <render :vue="code"></render>
      </div>
    </div>

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
  computed: {
    style () {
      return {
        transform: `translateX(-${+this.previewMode}00%) translateZ(0px)`
      }
    }
  },
  mounted () {
    this.code = require('@/samples/vue_sample.js').default
  }
}
</script>
