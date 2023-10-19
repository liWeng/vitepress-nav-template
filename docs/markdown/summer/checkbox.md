#### 示例源码
***

``` html
<su-checkbox :data.sync="checkData" label="苹果" value="1"></su-checkbox>
<su-checkbox :data.sync="checkData" label="香蕉" value="2" checked="true" @su-click="click"></su-checkbox>
<su-checkbox :data.sync="checkData" label="梨" value="3" @su-click="click"></su-checkbox>
<su-checkbox :data.sync="checkData" label="葡萄" value="4" disabled="true" @su-click="click"></su-checkbox>
<hr><p>选择的水果：<span v-for="v in checkData">{{v}} </span></p>
<script>
  new Vue({
  el: 'body',
  data() {
      return{
        checkData:[],
      }
  },
  methods: {
    click:function(data){
      console.log(data)
    }
  }
});
</script>
```

#### 属性：
****
|属性名|类别|参数|默认值|描述|
|------|----|----|------|----|
|id|String|-|-|-复选框id|
|class|String|-|-|-复选框class|
|name|String|-|-|-复选框name|
|value|String|-|-|-复选框value|
|label|String|-|-|-复选框文字|
|disabled|String|-|-|-复选框是否可用|
|checked|Array| -| | 复选框默认选中|
|data|String|-|-|-  复选框选中值|
|su-click|Function| data| |@su-click="function" 点击事件|