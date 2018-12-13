# Dropdown

样式参考了bitsrc的输入框。

这是个能补全选项的下拉选择框，并不是输入框，所以没有自定义选项的功能。

data中的`searchMode`意为**是否需要根据输入的内容对选项进行筛选**，举个例子，在focus的时候要列出所有的选项，此时searchMode为false，在input后才需要根据内容进行筛选，此时searchMode为true，blur时需要将searchMode恢复成false。

`handleBlur`中使用了`setTimeout`，原因在于输入框的blur事件会比下拉框的click事件优先触发，结果会导致click事件失效(isFocus为false，下拉框收回)，所以这里设置了一个延迟执行的异步操作(目前没找到更合适的解决方案)。

