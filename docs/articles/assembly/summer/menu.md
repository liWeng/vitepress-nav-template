## 基本使用示例：

``` html
<su-menu 
  :name="menuname"
  :addclass="menustyle"
  :menulist:sync="datalist" >
</su-menu>
<script> 
  export default {
    data() {
      return {    
        datalist:[
          { name: '菜单一',url:'/url'},
          { name: '菜单二',url:'/url' },
          { name: '',url:''divider:'divider'},
          { name: '菜单三',url:'/#' }
        ]
      }
    }
  }
</script>
<su-menu :name="menuname" :class="menustyle">      
  <ul class="dropdown-menu">
    <li><a href="#">菜单一</a></li>
    <li><a href="#">菜单二</a></li>
    <li class="divider"></li>
    <li><a href="#">菜单三</a></li>
  </ul>
</su-menu>
```
## 属性：
  * `name` 菜单名称，字符串
  * `class` 自定义样式
  * `menulist:sync` 菜单列表绑定数据 `[{name:'name',url:'/url',divider:'true',addclass:'style'}]`
  * `divider` 分割线，开启时name为空。
