## 基本使用示例：

``` html
<su-tree 
  :class="tree" 
  :model="treeData" 
  :click-node="clickNode" 
  v-ref:xxx >
</su-tree>
<script> 
  export default {
    data() {
      return {
      	treeData:{},
      }
    },
    clickNode:function(){      
      this.$refs.xxx.fun()
    },
  }
</script>  
```
## 属性：
  * `class` 自定义css样式
  * `model` 绑定数据
  * `click-node` 节点点击事件 `Function`
  * `v-ref:` 子组件索引，一般用来调用父组件的方法 `Function`
