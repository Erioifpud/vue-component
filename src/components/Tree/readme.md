# Tree

树型列表，使用递归组件实现，Wrapped是本体。

能接收自定义的图标组件，`icon`对应图标组件，`iconKey`对应控制图标类型的属性名称(比如nbt icon是通过type属性来决定图标的)。

图标是可选的，但是数据data必须得有，格式为：
```javascript
{
  name: String,
  type: String,
  value: Object
}
```
在有图标的时候，此处type的值会作为iconKey的值传给icon，无图标的时候type可忽略。
value的值为Array的时候，会被认为是“目录”，也就是点击后可展开的，其他情况下会被转换为字符串显示在name后方。