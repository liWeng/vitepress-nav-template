import{_ as s,o as n,c as a,a as l}from"./app.4690b2e6.js";const m=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[{"level":3,"title":"1.mk选项卡组件","slug":"_1-mk选项卡组件","link":"#_1-mk选项卡组件","children":[]},{"level":3,"title":"2.mo选项卡","slug":"_2-mo选项卡","link":"#_2-mo选项卡","children":[]},{"level":3,"title":"3.tree组件","slug":"_3-tree组件","link":"#_3-tree组件","children":[]},{"level":3,"title":"4.echarts组件 需引入mk-echarts.js","slug":"_4-echarts组件-需引入mk-echarts-js","link":"#_4-echarts组件-需引入mk-echarts-js","children":[]}],"relativePath":"articles/assembly/market/选项卡local.md","lastUpdated":1697707960000}'),e={name:"articles/assembly/market/选项卡local.md"},p=l(`<h3 id="_1-mk选项卡组件" tabindex="-1">1.mk选项卡组件 <a class="header-anchor" href="#_1-mk选项卡组件" aria-hidden="true">#</a></h3><h4 id="属性" tabindex="-1">属性 <a class="header-anchor" href="#属性" aria-hidden="true">#</a></h4><ul><li>selected.sync 当前选中的选项卡</li><li>index 选项卡序号</li><li>herder 选项卡标题</li></ul><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">&lt;mk-local-tabpanel :selected.sync=&quot;selectedNum&quot; style=&quot;height:100%&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">		&lt;mk-local-tabpage index=0 header=&quot;基本信息&quot; &gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">		&lt;/mk-local-tabpage &gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">		&lt;mk-local-tabpage index=1 header=&quot;联系人&quot; &gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">		&lt;/mk-local-tabpage &gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/mk-local-tabpanel&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;"> new Vue({</span></span>
<span class="line"><span style="color:#A6ACCD;">    el: &#39;#app&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    data:{    </span></span>
<span class="line"><span style="color:#A6ACCD;">       selectedNum:1//选项卡默认选择的选项卡</span></span>
<span class="line"><span style="color:#A6ACCD;">    },</span></span>
<span class="line"><span style="color:#A6ACCD;">    events:{</span></span>
<span class="line"><span style="color:#A6ACCD;">	   //监听选项卡切换之前事件</span></span>
<span class="line"><span style="color:#A6ACCD;">     	selectedChangeBefor:function(val){   		</span></span>
<span class="line"><span style="color:#A6ACCD;">     		var me=this;</span></span>
<span class="line"><span style="color:#A6ACCD;">     		if(val.index==&quot;1&quot;){</span></span>
<span class="line"><span style="color:#A6ACCD;">         	   alert(&quot;选中基本信息&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">         	}else if(val.index==&quot;2&quot;){</span></span>
<span class="line"><span style="color:#A6ACCD;">         	   alert(&quot;选中联系人&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">         	} </span></span>
<span class="line"><span style="color:#A6ACCD;">     	},</span></span>
<span class="line"><span style="color:#A6ACCD;">     	//监听选项卡切换事件</span></span>
<span class="line"><span style="color:#A6ACCD;">        selectedChange:function(val){</span></span>
<span class="line"><span style="color:#A6ACCD;">           if(val.index==&quot;1&quot;){</span></span>
<span class="line"><span style="color:#A6ACCD;">        	  </span></span>
<span class="line"><span style="color:#A6ACCD;">        	}else if(val.index==&quot;2&quot;){</span></span>
<span class="line"><span style="color:#A6ACCD;">        	  </span></span>
<span class="line"><span style="color:#A6ACCD;">        	} </span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">     },</span></span>
<span class="line"><span style="color:#A6ACCD;">    ready:function(){</span></span>
<span class="line"><span style="color:#A6ACCD;">				</span></span>
<span class="line"><span style="color:#A6ACCD;">     },</span></span>
<span class="line"><span style="color:#A6ACCD;"> })	</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br></div></div><h3 id="_2-mo选项卡" tabindex="-1">2.mo选项卡 <a class="header-anchor" href="#_2-mo选项卡" aria-hidden="true">#</a></h3><h4 id="属性-1" tabindex="-1">属性 <a class="header-anchor" href="#属性-1" aria-hidden="true">#</a></h4><ul><li>selected 当前选中的选项卡</li><li>index 选项卡序号</li><li>herder 选项卡标题</li></ul><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">&lt;mo-local-tabpanel selected=&quot;0&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">	&lt;mo-local-tabpage header=&quot;测试&quot; index=&quot;0&quot; &gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">		sss</span></span>
<span class="line"><span style="color:#A6ACCD;">	&lt;/mo-local-tabpage&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span></span>
<span class="line"><span style="color:#A6ACCD;">	&lt;mo-local-tabpage header=&quot;测试2&quot; index=&quot;1&quot; &gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">		sddff</span></span>
<span class="line"><span style="color:#A6ACCD;">	&lt;/mo-local-tabpage&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/mo-local-tabpanel&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;"> new Vue({</span></span>
<span class="line"><span style="color:#A6ACCD;">    el: &#39;#app&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    data:{    </span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    },</span></span>
<span class="line"><span style="color:#A6ACCD;">    events:{</span></span>
<span class="line"><span style="color:#A6ACCD;">        //监听选项卡切换事件</span></span>
<span class="line"><span style="color:#A6ACCD;">		 change:function(val){</span></span>
<span class="line"><span style="color:#A6ACCD;">			 var me=this;</span></span>
<span class="line"><span style="color:#A6ACCD;">        	if(val.index==1){</span></span>
<span class="line"><span style="color:#A6ACCD;">               //me.chart3();</span></span>
<span class="line"><span style="color:#A6ACCD;">              // me.chart4();</span></span>
<span class="line"><span style="color:#A6ACCD;">        	}</span></span>
<span class="line"><span style="color:#A6ACCD;">	     }</span></span>
<span class="line"><span style="color:#A6ACCD;">    },</span></span>
<span class="line"><span style="color:#A6ACCD;">    ready:function(){</span></span>
<span class="line"><span style="color:#A6ACCD;">				</span></span>
<span class="line"><span style="color:#A6ACCD;">     },</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"> })</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><h3 id="_3-tree组件" tabindex="-1">3.tree组件 <a class="header-anchor" href="#_3-tree组件" aria-hidden="true">#</a></h3><ul><li>@node-click 树节点点击事件</li><li>@load-success 树加载完成后事件</li></ul><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;"> &lt;mo-areatree-panel v-ref:areatree @node-click=&quot;treeNodeClick&quot;  @load-success=&quot;loadSuccess&quot;&gt;&lt;/mo-areatree-panel&gt; </span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;"> new Vue({</span></span>
<span class="line"><span style="color:#A6ACCD;">    el: &#39;#app&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    data:{    </span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    },</span></span>
<span class="line"><span style="color:#A6ACCD;">    methods:{</span></span>
<span class="line"><span style="color:#A6ACCD;">		 //点击树节点事件</span></span>
<span class="line"><span style="color:#A6ACCD;">		treeNodeClick:function(node){</span></span>
<span class="line"><span style="color:#A6ACCD;">			</span></span>
<span class="line"><span style="color:#A6ACCD;">	    },</span></span>
<span class="line"><span style="color:#A6ACCD;">		//树加载成功后的事件</span></span>
<span class="line"><span style="color:#A6ACCD;">		loadSuccess:function(data,roots){</span></span>
<span class="line"><span style="color:#A6ACCD;">			var root=null;</span></span>
<span class="line"><span style="color:#A6ACCD;">			if(roots.length&gt;0){</span></span>
<span class="line"><span style="color:#A6ACCD;">				root=roots[0];</span></span>
<span class="line"><span style="color:#A6ACCD;">				this.treeNodeClick(root);//选中跟节点				</span></span>
<span class="line"><span style="color:#A6ACCD;">			}</span></span>
<span class="line"><span style="color:#A6ACCD;">			</span></span>
<span class="line"><span style="color:#A6ACCD;">		},</span></span>
<span class="line"><span style="color:#A6ACCD;">	},</span></span>
<span class="line"><span style="color:#A6ACCD;">    ready:function(){</span></span>
<span class="line"><span style="color:#A6ACCD;">				</span></span>
<span class="line"><span style="color:#A6ACCD;">     },</span></span>
<span class="line"><span style="color:#A6ACCD;">  })</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><h3 id="_4-echarts组件-需引入mk-echarts-js" tabindex="-1">4.echarts组件 需引入mk-echarts.js <a class="header-anchor" href="#_4-echarts组件-需引入mk-echarts-js" aria-hidden="true">#</a></h3><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">&lt;!--柱状图--&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;mo-bar-chart v-ref:bchart title-field=&quot;time&quot; title=&quot;测试&quot; :series=&quot;barSeries&quot;&gt; &lt;/mo-bar-chart&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;!--堆叠图--&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;mo-heap-chart v-ref:hchart title-field=&quot;time&quot; title=&quot;99&quot;  &gt;&lt;/mo-heap-chart&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;!--折线图--&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;mo-line-chart v-ref:lchart  title-field=&quot;time&quot; title=&quot;测试&quot; :series=&quot;lineSeries&quot;&gt;&lt;/mo-line-chart&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;!--横着的柱状图--&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;mo-hbar-chart v-ref:hbchart title-field=&quot;time&quot; title=&quot;测试&quot; :series=&quot;hbarSeries&quot;&gt;&lt;/mo-hbar-chart&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;!--饼状图--&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;mo-pie-chart v-ref:pchart title-field=&quot;time&quot; legend-show=&quot;true&quot; label-show=&quot;true&quot; value-field=&quot;a&quot;&gt;&lt;/mo-pie-chart&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;!--旭日图--&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;mo-sunburst2-chart v-ref:schart2  title=&quot;测试&quot; &gt;&lt;/mo-sunburst2-chart&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h4 id="除了饼状图属性说明" tabindex="-1">除了饼状图属性说明： <a class="header-anchor" href="#除了饼状图属性说明" aria-hidden="true">#</a></h4><ul><li>title-field 填写横坐标的属性名称</li><li>v-ref 图表的引用名称</li><li>series为数据名称对应关系</li></ul><h4 id="饼状图属性说明" tabindex="-1">饼状图属性说明: <a class="header-anchor" href="#饼状图属性说明" aria-hidden="true">#</a></h4><ul><li>title-field填写横坐标的属性名称</li><li>value-field为数据属性名称</li><li>legend-show=&quot;true&quot;是否显示图例,默认显示</li><li>label-show=&quot;true&quot;是否显示label,默认不显示</li></ul><h4 id="旭日图属性说明" tabindex="-1">旭日图属性说明: <a class="header-anchor" href="#旭日图属性说明" aria-hidden="true">#</a></h4><ul><li>数据为树状</li></ul><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">如:</span></span>
<span class="line"><span style="color:#A6ACCD;">    {</span></span>
<span class="line"><span style="color:#A6ACCD;">		&quot;name&quot;: &quot;国银大厦&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">		&quot;value&quot;: &quot;8&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">		&quot;children&quot;: [{</span></span>
<span class="line"><span style="color:#A6ACCD;">			&quot;name&quot;: &quot;一层&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">			&quot;value&quot;: &quot;6&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">			&quot;children&quot;: [{</span></span>
<span class="line"><span style="color:#A6ACCD;">				&quot;name&quot;: &quot;一层一户&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">				&quot;value&quot;: &quot;5&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">				&quot;children&quot;: []</span></span>
<span class="line"><span style="color:#A6ACCD;">			}]</span></span>
<span class="line"><span style="color:#A6ACCD;">		}]</span></span>
<span class="line"><span style="color:#A6ACCD;">	}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">var vueObject=new Vue({</span></span>
<span class="line"><span style="color:#A6ACCD;">			el:&quot;body&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">			data:{</span></span>
<span class="line"><span style="color:#A6ACCD;">				lineSeries:[{name:&#39;A相电压&#39;,field:&#39;a&#39;},{name:&#39;B相电压&#39;,field:&#39;b&#39;},{name:&#39;C相电压&#39;,field:&#39;c&#39;}],/</span></span>
<span class="line"><span style="color:#A6ACCD;">				barSeries:[{name:&#39;电量&#39;,field:&#39;a1&#39;}],</span></span>
<span class="line"><span style="color:#A6ACCD;">				hbarSeries:[{name:&#39;A相电压&#39;,field:&#39;a&#39;}],</span></span>
<span class="line"><span style="color:#A6ACCD;">				helpSeries:[{name:&#39;峰999&#39;,field:&#39;a&#39;}],</span></span>
<span class="line"><span style="color:#A6ACCD;">				datas:[</span></span>
<span class="line"><span style="color:#A6ACCD;">					{time:&quot;周一&quot;,a:130,b:105,c:120},</span></span>
<span class="line"><span style="color:#A6ACCD;">					{time:&quot;周二&quot;,a:160,b:105,c:120},</span></span>
<span class="line"><span style="color:#A6ACCD;">					{time:&quot;周三&quot;,a:110,b:105,c:120},</span></span>
<span class="line"><span style="color:#A6ACCD;">					{time:&quot;周四&quot;,a:170,b:105,c:120},</span></span>
<span class="line"><span style="color:#A6ACCD;">					{time:&quot;周五&quot;,a:100,b:105,c:120},</span></span>
<span class="line"><span style="color:#A6ACCD;">					{time:&quot;周六&quot;,a:100,b:105,c:120},</span></span>
<span class="line"><span style="color:#A6ACCD;">					{time:&quot;周日1&quot;,a:100,b:105,c:120},</span></span>
<span class="line"><span style="color:#A6ACCD;">					{time:&quot;周日2&quot;,a:100,b:105,c:120},</span></span>
<span class="line"><span style="color:#A6ACCD;">					{time:&quot;周日3&quot;,a:100,b:105,c:120},</span></span>
<span class="line"><span style="color:#A6ACCD;">					{time:&quot;周日4&quot;,a:100,b:105,c:120}</span></span>
<span class="line"><span style="color:#A6ACCD;">					],</span></span>
<span class="line"><span style="color:#A6ACCD;">				datas2:[{time:&#39;供电量&#39;,a1:200},{time:&#39;用电量&#39;,a1:300},],</span></span>
<span class="line"><span style="color:#A6ACCD;">				sundata: {</span></span>
<span class="line"><span style="color:#A6ACCD;">							&quot;name&quot;: &quot;国银大厦&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">							&quot;value&quot;: &quot;8&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">							&quot;children&quot;: [{</span></span>
<span class="line"><span style="color:#A6ACCD;">								&quot;name&quot;: &quot;一层&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">								&quot;value&quot;: &quot;6&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">								&quot;children&quot;: [{</span></span>
<span class="line"><span style="color:#A6ACCD;">									&quot;name&quot;: &quot;一层一户&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">									&quot;value&quot;: &quot;5&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">									&quot;children&quot;: []</span></span>
<span class="line"><span style="color:#A6ACCD;">								}]</span></span>
<span class="line"><span style="color:#A6ACCD;">							}]</span></span>
<span class="line"><span style="color:#A6ACCD;">						}</span></span>
<span class="line"><span style="color:#A6ACCD;">			},</span></span>
<span class="line"><span style="color:#A6ACCD;">			methods:{</span></span>
<span class="line"><span style="color:#A6ACCD;">				resize:function(){</span></span>
<span class="line"><span style="color:#A6ACCD;">					</span></span>
<span class="line"><span style="color:#A6ACCD;">					console.log(&quot;111111&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">					</span></span>
<span class="line"><span style="color:#A6ACCD;">				},</span></span>
<span class="line"><span style="color:#A6ACCD;">				test2:function(){</span></span>
<span class="line"><span style="color:#A6ACCD;">					</span></span>
<span class="line"><span style="color:#A6ACCD;">					</span></span>
<span class="line"><span style="color:#A6ACCD;">					this.$refs.hchart.series=[{name:&#39;峰998&#39;,field:&#39;b&#39;},{name:&#39;峰996&#39;,field:&#39;a&#39;}];</span></span>
<span class="line"><span style="color:#A6ACCD;">					this.$refs.hchart.setData(this.datas);</span></span>
<span class="line"><span style="color:#A6ACCD;">				},</span></span>
<span class="line"><span style="color:#A6ACCD;">				test:function(){</span></span>
<span class="line"><span style="color:#A6ACCD;">					</span></span>
<span class="line"><span style="color:#A6ACCD;">					//动态设置属性对应关系</span></span>
<span class="line"><span style="color:#A6ACCD;">					this.$refs.hchart.series=[{name:&#39;峰999&#39;,field:&#39;a&#39;}];</span></span>
<span class="line"><span style="color:#A6ACCD;">					this.$refs.hchart.setData(this.datas);</span></span>
<span class="line"><span style="color:#A6ACCD;">					//传入echarts数据</span></span>
<span class="line"><span style="color:#A6ACCD;">					this.$refs.pchart.setData(this.datas);</span></span>
<span class="line"><span style="color:#A6ACCD;">					this.$refs.lchart.setData(this.datas);</span></span>
<span class="line"><span style="color:#A6ACCD;">					this.$refs.hbchart.setData(this.datas);</span></span>
<span class="line"><span style="color:#A6ACCD;">					this.$refs.schart2.setData(this.sundata);</span></span>
<span class="line"><span style="color:#A6ACCD;">				}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">			},</span></span>
<span class="line"><span style="color:#A6ACCD;">			ready:function(){</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">				this.test();</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">			}</span></span>
<span class="line"><span style="color:#A6ACCD;">});</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br></div></div>`,24),t=[p];function r(c,i,o,b,u,C){return n(),a("div",null,t)}const d=s(e,[["render",r]]);export{m as __pageData,d as default};
