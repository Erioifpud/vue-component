# Dropdown

样式参考了bitsrc的输入框。

这是个能补全选项的下拉选择框，并不是输入框，所以没有自定义选项的功能。

数据的格式为：
```javascript
{
  name: String
}
```
通过`map`属性，可以将函数传入，用于改变已有`items`的结构，比如：
```javascript
// items中的元素结构，name属性存在于instance对象中
{
  instance: Object,
  props: Object
}

// 将此函数传入
(item) => item.instance

// 此时items依然没变化，但组件会根据这个函数计算出mappedItems，选择选项时会根据选项的index在items中找到map前的元素传递给父组件（如果不传入map函数，mappedItems将会引用items的内容）
```

data中的`searchMode`意为**是否需要根据输入的内容对选项进行筛选**，举个例子，在focus的时候要列出所有的选项，此时searchMode为false，在input后才需要根据内容进行筛选，此时searchMode为true，blur时需要将searchMode恢复成false。

`handleBlur`中使用了`setTimeout`，原因在于输入框的blur事件会比下拉框的click事件优先触发，结果会导致click事件失效(isFocus为false，下拉框收回)，所以这里设置了一个延迟执行的异步操作(目前没找到更合适的解决方案)。

