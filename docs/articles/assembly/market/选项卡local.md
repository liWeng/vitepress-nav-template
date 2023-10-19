	  
### 1.mk选项卡组件
#### 属性
* selected.sync 当前选中的选项卡
* index 选项卡序号
* herder 选项卡标题
```
<mk-local-tabpanel :selected.sync="selectedNum" style="height:100%">
		<mk-local-tabpage index=0 header="基本信息" >
		</mk-local-tabpage >
		<mk-local-tabpage index=1 header="联系人" >
		</mk-local-tabpage >
</mk-local-tabpanel>
```
```
 new Vue({
    el: '#app',
    data:{    
       selectedNum:1//选项卡默认选择的选项卡
    },
    events:{
	   //监听选项卡切换之前事件
     	selectedChangeBefor:function(val){   		
     		var me=this;
     		if(val.index=="1"){
         	   alert("选中基本信息");
         	}else if(val.index=="2"){
         	   alert("选中联系人");
         	} 
     	},
     	//监听选项卡切换事件
        selectedChange:function(val){
           if(val.index=="1"){
        	  
        	}else if(val.index=="2"){
        	  
        	} 
        }
     },
    ready:function(){
				
     },
 })	
```

### 2.mo选项卡
#### 属性
*  selected 当前选中的选项卡
*  index 选项卡序号
*  herder 选项卡标题

```
<mo-local-tabpanel selected="0">
	<mo-local-tabpage header="测试" index="0" >
		sss
	</mo-local-tabpage>
	
	<mo-local-tabpage header="测试2" index="1" >
		sddff
	</mo-local-tabpage>
	
</mo-local-tabpanel>
```

```
 new Vue({
    el: '#app',
    data:{    

    },
    events:{
        //监听选项卡切换事件
		 change:function(val){
			 var me=this;
        	if(val.index==1){
               //me.chart3();
              // me.chart4();
        	}
	     }
    },
    ready:function(){
				
     },

 })
```

### 3.tree组件
* @node-click 树节点点击事件
* @load-success 树加载完成后事件
```
 <mo-areatree-panel v-ref:areatree @node-click="treeNodeClick"  @load-success="loadSuccess"></mo-areatree-panel> 
```
```
 new Vue({
    el: '#app',
    data:{    

    },
    methods:{
		 //点击树节点事件
		treeNodeClick:function(node){
			
	    },
		//树加载成功后的事件
		loadSuccess:function(data,roots){
			var root=null;
			if(roots.length>0){
				root=roots[0];
				this.treeNodeClick(root);//选中跟节点				
			}
			
		},
	},
    ready:function(){
				
     },
  })
```

### 4.echarts组件 需引入mk-echarts.js

```
<!--柱状图-->
<mo-bar-chart v-ref:bchart title-field="time" title="测试" :series="barSeries"> </mo-bar-chart>
<!--堆叠图-->
<mo-heap-chart v-ref:hchart title-field="time" title="99"  ></mo-heap-chart>
<!--折线图-->
<mo-line-chart v-ref:lchart  title-field="time" title="测试" :series="lineSeries"></mo-line-chart>
<!--横着的柱状图-->
<mo-hbar-chart v-ref:hbchart title-field="time" title="测试" :series="hbarSeries"></mo-hbar-chart>
<!--饼状图-->
<mo-pie-chart v-ref:pchart title-field="time" legend-show="true" label-show="true" value-field="a"></mo-pie-chart>
<!--旭日图-->
<mo-sunburst2-chart v-ref:schart2  title="测试" ></mo-sunburst2-chart>
```

#### 除了饼状图属性说明：
* title-field 填写横坐标的属性名称 
* v-ref 图表的引用名称 
* series为数据名称对应关系

#### 饼状图属性说明:
* title-field填写横坐标的属性名称 
* value-field为数据属性名称 
* legend-show="true"是否显示图例,默认显示 
* label-show="true"是否显示label,默认不显示
#### 旭日图属性说明:
* 数据为树状

```
如:
    {
		"name": "国银大厦",
		"value": "8",
		"children": [{
			"name": "一层",
			"value": "6",
			"children": [{
				"name": "一层一户",
				"value": "5",
				"children": []
			}]
		}]
	}
```

```         
var vueObject=new Vue({
			el:"body",
			data:{
				lineSeries:[{name:'A相电压',field:'a'},{name:'B相电压',field:'b'},{name:'C相电压',field:'c'}],/
				barSeries:[{name:'电量',field:'a1'}],
				hbarSeries:[{name:'A相电压',field:'a'}],
				helpSeries:[{name:'峰999',field:'a'}],
				datas:[
					{time:"周一",a:130,b:105,c:120},
					{time:"周二",a:160,b:105,c:120},
					{time:"周三",a:110,b:105,c:120},
					{time:"周四",a:170,b:105,c:120},
					{time:"周五",a:100,b:105,c:120},
					{time:"周六",a:100,b:105,c:120},
					{time:"周日1",a:100,b:105,c:120},
					{time:"周日2",a:100,b:105,c:120},
					{time:"周日3",a:100,b:105,c:120},
					{time:"周日4",a:100,b:105,c:120}
					],
				datas2:[{time:'供电量',a1:200},{time:'用电量',a1:300},],
				sundata: {
							"name": "国银大厦",
							"value": "8",
							"children": [{
								"name": "一层",
								"value": "6",
								"children": [{
									"name": "一层一户",
									"value": "5",
									"children": []
								}]
							}]
						}
			},
			methods:{
				resize:function(){
					
					console.log("111111");
					
				},
				test2:function(){
					
					
					this.$refs.hchart.series=[{name:'峰998',field:'b'},{name:'峰996',field:'a'}];
					this.$refs.hchart.setData(this.datas);
				},
				test:function(){
					
					//动态设置属性对应关系
					this.$refs.hchart.series=[{name:'峰999',field:'a'}];
					this.$refs.hchart.setData(this.datas);
					//传入echarts数据
					this.$refs.pchart.setData(this.datas);
					this.$refs.lchart.setData(this.datas);
					this.$refs.hbchart.setData(this.datas);
					this.$refs.schart2.setData(this.sundata);
				}

			},
			ready:function(){

				this.test();

			}
});
```
 
 