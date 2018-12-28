# Group

配合ErInput组件中的`check`或`switch`使用，能实现单选的功能。

为了实现Group组件，我对ErInput的数据模型做了修改，原本是以`value`和`change`事件作为`v-model`的，但这时候的`value`并不属于ErInput，而是外界传入的，不能通过ErInput实例操作`value`，只能修改数据源。

所以我加了一个`model`作为ErInput自带的属性，判断Group组件存在时，使用`model`作为当前的状态，否则使用传入的`value`。


Group和ErInput使用了`provide`与`inject`特性，Group中通过`provide`将自身的实例传递下去，ErInput通过`inject`接收，以此判断Group是否存在，并且在**挂载阶段**将自身传递给Group中的`children`项。

除此之外，ErInput向Group传递信息也是通过`group`完成的（Group于`created`阶段设置`$on`回调），如果使用`this.$emit`来触发事件，则在Group中需要使用`v-on`来进行监听，这里会发生**顺序上的问题**，比如说`group-init`事件触发时，ErInput正处于**挂载阶段**，此时Group还没有进行**挂载**，模版中的`v-on`是无效的。

单选的逻辑很简单，ErInput的状态改变时，会触发`group-check-trigger`事件，Group中判断事件状态为`false`时重设组件状态，因为单选只能选择，不能取消选择；事件状态为`true`时遍历`children`中其他元素，将他们的状态都设为`false`。