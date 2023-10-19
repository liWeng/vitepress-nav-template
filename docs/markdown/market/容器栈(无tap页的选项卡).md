##### mk-stackpanel

* 支持代码切换选项卡
* 切换触发切换事件
* 支持动态改变每页href
* 本选项卡切换到对应页签后才会加载
* 如果需要加载代码片段则iframe="false"
* :selected.sync="选中索引绑定的key"
* 加载本地代码片段 直接写入到 stackpage 中间即可 

``` html
	<body>
		
		<mk-stackpanel height="300" :selected.sync="test"  >
			<!-- 本地代码 -->
			<mk-stackpage index=0 header="抄表段管理1" >
				<mk-panel title="你好1"  height="200">
				</mk-panel>
			</mk-stackpage>
			<!-- 加载远程代码片段   iframe=false -->
			<mk-stackpage index=1 header="抄表段信息2" href="example/htmlcodes2.html" iframe="false" ></mk-stackpage>
			<mk-stackpage index=2 header="抄表段管理3" :href="testhref2" iframe="false" ></mk-tabpage>
			<mk-stackpage index=3 header="抄表段管理4" href="example/htmlcodes4.html" iframe="false" ></mk-stackpage>
			<!-- 加载远程完整页面 ,可以跨域   iframe=true -->
			<mk-stackpage index=4 header="抄表段管理7" :href="testhref" iframe="true"></mk-stackpage>
			<!-- 加载远程完整页面 ,可以跨域    iframe=true -->
			<mk-stackpage index=5 header="抄表段管理8" href="http://baidu.com" iframe="true"></mk-stackpage>
		</mk-stackpanel>
		
		<script>
		
			var vueBody=new Vue({
				el:"body",
				data:{
					test:2,//选中页的绑定属性
					testhref:"http://baidu.com",//href的绑定属性
					testhref2:"example/htmlcodes3.html"//href的绑定属性
				},
				events:{
					//监听选项卡切换事件
					stackPanelSelectedChange:function(val){
						
						if(val.index==3){
							
							this.test=1;
							
						}
						
						
					}
					
				}
			});
			
		</script>
	</body>
```