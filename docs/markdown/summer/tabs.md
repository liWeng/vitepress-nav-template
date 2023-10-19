## 基本使用示例：

``` html
<su-tabs :active="0">
  <su-tab header="one">
      onecontent
  </su-tab>
  <su-tab header="two">
      twocontent
  </su-tab>
  <su-tab header="three" disabled>
      three
  </su-tab>
</su-tabs>
```
## 属性：
  * `header` 标签标题,字符串 `String`
  * `disabled` 禁用状态，默认为true `"true" "false"`
  * `active` 激活索引选项卡，值为数字。 类型`Number`
