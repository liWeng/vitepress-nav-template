##  基本使用示例：

``` html
  <su-dialog 
    :class="dialog"
    :header="对话框" 
    :show.sync="show" 
    :ok="okclick" 
    :cancel="cancelclick" 
    :valid="!$validation.valid" >
    <div>内容</div>
    <div>内容</div>
    <div>内容</div>
  <su-dialog>
```
## 属性：
  * `class` 自定义css样式
  * `header`  对话框标题
  * `show.sync` 显示隐藏对话框开关
  * `ok` 对话框按钮提交事件, `Function`
  * `cancel` 对话框按钮取消事件 `Function`
  * `valid` 验证对话框form，验证通过按钮可点击
