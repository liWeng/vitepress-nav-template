#### 示例源码
***

``` html
<su-textbox type="text" @su-click="click" @su-change="click" @su-focus="click" @su-blur="click"></su-textbox>
<su-textbox type="text" label="名称:" :data.sync="msg" disabled="disabled"></su-textbox>
<su-textbox type="text" label="名称:" :data.sync="msg" placeholder="请输入名称..."></su-textbox>
<su-textbox type="number" label="收银:" :addon="addonleft"></su-textbox>
<su-textbox type="number" label="美元" :addon="addonboth"></su-textbox>
<su-textbox type="number" label="路程:" :addon="addonright"></su-textbox>
<su-textbox label="数量:" id="number" name="number" type="number" placeholder="请输入数量"></su-textbox>
<su-textbox type="color" label="颜色:" :data.sync="msg"></su-textbox>
<su-textbox type="url" label="网址:" placeholder="请输入网址..."  :data.sync="msg"></su-textbox>
<su-textbox label="邮箱:" id="email" name="email" type="email" placeholder="请输入邮箱"></su-textbox>
<su-textbox label="手机:" id="tel" name="tel" type="tel" placeholder="请输入手机号"></su-textbox>
<su-textbox label="用户名:" id="tel" name="tel" type="text" placeholder="请输入长度为6-20字符的用户名" ></su-textbox>
<su-textbox label="密码" id="password" :data.sync="pwd" placeholder="请输入由数字、字母、下划线组成的密码" name="password" type="password"></su-textbox>
<su-textbox label="确认密码" :data.sync="pwd2" placeholder="请再次输入密码"  id="confirm_password" name="confirm_password" type="password"></su-textbox>
<su-textbox label="姓名" help_info="请输入用户名" id="username" name="username"></su-textbox>
<script>
    new Vue({
    el: 'body',
    data: {
      msg: '',
      addonleft: {
        show: true,
        leftcontent: '￥',
      },
      addonright: {
        show: true,
        rightcontent: '公里',
      },
      addonboth: {
        show: true,
        leftcontent: '$',
        rightcontent: '.00',
      },
      pwd:'',
      pwd2:'',
    },
    methods: {
      validatorfun: function (val) {
        //console.log('validate start'+val);
        var reg = /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/;
        if(!reg.test(val)){
            return false;
        }else{
          console.log(11);
          return true;
        }
      },
      confirmPwd: function(val){
        if(this.pwd==this.pwd2){
          return true;
        }else{
          return false;
        }
      },
      click: function(data){
        console.log(data);
        console.log("11")
      }
    }  
    });
  </script>  
```

#### 属性
*****
|属性名|类别|参数|默认值|描述|
|------|----|----|------|----|
|id|`String`|-|-|设置id|
|name|`String`|-|-|设置name|
|type|`String`|text,password,email,tel,url,number,hidden,color|`text`|input类型，默认为text，根据type类型做相应的验证|
|class|`String`|-|-|inpu自定义样式|
|label|`String`|-|-|标签名称|
|help_info|`String`|-|-|提示帮助信息|
|help_show|`Boolean`|-|`true`|提示帮助信息开关|
|placeholder|`String`|-|-|input占位符|
|data|`String`|-|-|表单值|
|addon|`Object`|show,leftcontent,rightcontent|-|输入框左右添加项
          show: 是否添加左右添加项；
          leftcontent: 输入框左侧添加项；
          rightcontent: 输入框右侧添加项； |

#### 事件
*****
|事件名|参数|默认值|描述|
|------|----|------|----|
|su-click|-|-|点击事件|
|su-change|data|-|data值改变事件|
|su-focus|-|-|聚焦事件|
|su-blur|-|-|失焦事件|