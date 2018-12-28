<template>
  <tab value="tab1" @tab-removed="handleRemoved">
    <tab-item v-if="tab1" title="Tab 1" uniqueKey="tab1">
      <div class="tab-content pt">
        This is Tab 1
      </div>
    </tab-item>
    <tab-item v-if="tab2" title="Tab 2" icon="fab fa-500px" uniqueKey="tab2">
      <div class="tab-content">
        <er-input value="" placeholder="This is Tab 2"></er-input>
      </div>
    </tab-item>
    <tab-item title="Tab ?????" icon="fab fa-alipay" uniqueKey="tab?">
      <div class="tab-content pt">
        ?????
      </div>
    </tab-item>
    <tab-item title="disabled" disabled closable uniqueKey="tabd"></tab-item>

    <tab-item v-if="tab3" title="Tab 3" uniqueKey="tab3" closable>333</tab-item>
    <tab-item v-if="tab4" title="Tab 4" uniqueKey="tab4" closable>444</tab-item>
    <tab-item v-if="tab5" title="Tab 5" uniqueKey="tab5" closable>555</tab-item>
  </tab>
</template>

<script>
import Tab from '@/components/Tab'
import TabItem from '@/components/Tab/TabItem'
import ErInput from '@/components/ErInput'

export default {
  name: 'TabExample',
  components: {
    Tab,
    TabItem,
    ErInput
  },
  data () {
    return {
      tab1: true,
      tab2: true,
      tab3: true,
      tab4: true,
      tab5: true
    }
  },
  methods: {
    handleRemoved (name) {
      console.log(name)
      this[`${name}`] = false
    }
  }
}
</script>

<style scoped>
  .tab-content {
    height: 3rem;
    color: #5a4ba3;
    text-align: center;
  }
  .pt {
    padding-top: 1rem;
  }
</style>
