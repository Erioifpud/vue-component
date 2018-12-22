# vue-component

这是一个Vue组件的测试场地，会自己搜索并且加载组件，启动项目后在左上角的下拉列表中找到要预览的组件，选择后就能展示了。

这里面有很多我写的组件，不想留可以删除，但是别删Dropdown和Panel，不然你得自己去弄一个select来代替主页的下拉列表和展示框。

展示框也是有分类的，Vanilla是最普通的展示框，仅仅是将组件显示出来，不关联数据。
要预览带数据的组件，可以在组件的同一目录下新建`同名.data.js`文件，文件中默认导出一个对象，对象的结构如下：

```javascript
{
  binding: Object,
  model: {
    binding: Object,
    value: Object
  },
  state: Array
}
```

这三个属性都是可选的，既然新建了文件，那还是选一个吧。

- `binding`中存放的是展示中要传入的`props`和对应的值，编写好就能在主页中展示了，展示框的标题将会是`Binding`。
- `model`中存放的是`props`和`v-model`，value对应`v-model`绑定的数据，展示框的标题为`Model: 当前value的值`。（可以参考ErInput组件）
- `state`中存放的是列表，列表中存放的是组件的`props`对象，遍历这个列表，将每一个状态都对应一个组件展示出来，展示框的标题为`State: 状态数量`。（可以参考NBTIcon组件）


## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
